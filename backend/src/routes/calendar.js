import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';
import { authRequired } from '../middleware/auth.js';
import { nextRecoveryTime, workoutKcalSum } from '../services/recovery_time.js';

const r = Router();

function icsDate(d) {
  // UTC-Format YYYYMMDDTHHMMSSZ
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
}

function escapeIcs(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

// Token-basierter Endpoint, damit Kalender-Apps die Datei ohne Auth-Header laden können.
// Erzeugt einen Einmal-Token via Auth-Endpoint /api/calendar/next.ics?token=...
r.get('/token', authRequired, (req, res) => {
  const tok = jwt.sign({ uid: req.user.id, scope: 'ics' }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token: tok });
});

r.get('/next.ics', async (req, res) => {
  let userId;
  try {
    const payload = jwt.verify(req.query.token || '', process.env.JWT_SECRET);
    if (payload.scope !== 'ics') throw new Error();
    userId = payload.uid;
  } catch {
    return res.status(401).type('text').send('unauthorized');
  }

  const recoveredAt = await nextRecoveryTime(userId);
  // Wenn keine Daten: heute abends als Default-Vorschlag
  const start = recoveredAt && recoveredAt > new Date()
    ? recoveredAt
    : new Date(Date.now() + 24 * 3600 * 1000);
  const end = new Date(start.getTime() + 60 * 60 * 1000);   // 60 min

  // Letztes Workout für kcal-Info
  const lastWk = await query(
    `SELECT id FROM workouts WHERE user_id = $1 AND ended_at IS NOT NULL ORDER BY started_at DESC LIMIT 1`,
    [userId]);
  let lastKcal = 0;
  if (lastWk.rowCount > 0) lastKcal = await workoutKcalSum(lastWk.rows[0].id);

  const body =
    `Nächste empfohlene Trainingseinheit für Fitness Buddy.\n` +
    (lastKcal > 0
      ? `Im letzten Training: ${lastKcal.toFixed(0)} kcal verbrannt.\n` +
        `Deine Muskulatur sollte bis ${start.toLocaleString('de-DE')} ausreichend regeneriert sein.\n`
      : '') +
    `Plane ca. 60 Minuten.\n`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Fitness Buddy//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:fitness-buddy-${userId}-${start.getTime()}@fitness-buddy`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${escapeIcs('Fitness Buddy – nächste Einheit')}`,
    `DESCRIPTION:${escapeIcs(body)}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder',
    'TRIGGER:-PT30M',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="fitness-buddy-next.ics"');
  res.send(ics);
});

export default r;
