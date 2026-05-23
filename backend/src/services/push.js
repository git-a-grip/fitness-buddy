import webpush from 'web-push';
import { query } from '../db.js';

let configured = false;
function configure() {
  if (configured) return;
  const pub = process.env.VAPID_PUBLIC_KEY;
  const priv = process.env.VAPID_PRIVATE_KEY;
  const subj = process.env.VAPID_SUBJECT || 'mailto:admin@example.com';
  if (pub && priv) {
    webpush.setVapidDetails(subj, pub, priv);
    configured = true;
  }
}

export function vapidPublicKey() {
  return process.env.VAPID_PUBLIC_KEY || null;
}

export async function sendToUser(userId, payload) {
  configure();
  if (!configured) return { sent: 0, failed: 0, skipped: true };

  const { rows } = await query(
    `SELECT id, endpoint, p256dh, auth FROM push_subscriptions WHERE user_id = $1`,
    [userId]
  );
  let sent = 0, failed = 0;
  for (const sub of rows) {
    try {
      await webpush.sendNotification({
        endpoint: sub.endpoint,
        keys: { p256dh: sub.p256dh, auth: sub.auth },
      }, JSON.stringify(payload));
      sent++;
    } catch (e) {
      failed++;
      // Tot abonnierte Endpoints entfernen
      if (e.statusCode === 404 || e.statusCode === 410) {
        await query(`DELETE FROM push_subscriptions WHERE id = $1`, [sub.id]);
      }
    }
  }
  return { sent, failed };
}

// Loop: alle 60s nach fälligen Remindern suchen
let timer = null;
export function startReminderLoop() {
  if (timer) return;
  timer = setInterval(processReminders, 60_000);
  // Beim Start einmal sofort prüfen
  processReminders().catch(() => {});
}

async function processReminders() {
  const { rows } = await query(`
    SELECT id, user_id, title, body, payload
    FROM scheduled_reminders
    WHERE sent_at IS NULL AND send_at <= NOW()
    LIMIT 50`);
  for (const r of rows) {
    try {
      await sendToUser(r.user_id, {
        title: r.title,
        body: r.body,
        data: r.payload || {},
      });
    } catch {}
    await query(`UPDATE scheduled_reminders SET sent_at = NOW() WHERE id = $1`, [r.id]);
  }
}
