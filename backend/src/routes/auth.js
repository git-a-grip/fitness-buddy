import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';
import { authRequired } from '../middleware/auth.js';

const r = Router();

// Referenzwerte für Untrainierte (ACSM/Gallagher 2000)
const DEFAULT_COMPOSITION = {
  m: { body_fat_pct: 22.0, muscle_pct: 38.0 },
  f: { body_fat_pct: 30.0, muscle_pct: 31.0 },
  d: { body_fat_pct: 26.0, muscle_pct: 34.5 },
};

function applyDefaults(user) {
  const sex = user.sex || 'd';
  const ref = DEFAULT_COMPOSITION[sex] || DEFAULT_COMPOSITION.d;
  return {
    ...user,
    body_fat_pct:        user.body_fat_pct == null ? ref.body_fat_pct : user.body_fat_pct,
    muscle_pct:          user.muscle_pct   == null ? ref.muscle_pct   : user.muscle_pct,
    body_fat_pct_source: user.body_fat_pct == null ? 'default'        : 'user',
    muscle_pct_source:   user.muscle_pct   == null ? 'default'        : 'user',
  };
}

r.post('/register', async (req, res) => {
  const { email, password, display_name, weight_kg, height_cm, birth_year, sex, locale, body_fat_pct, muscle_pct } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'missing_fields' });
  if (password.length < 8) return res.status(400).json({ error: 'password_too_short' });

  const exists = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
  if (exists.rowCount > 0) return res.status(409).json({ error: 'email_taken' });

  const hash = await bcrypt.hash(password, 10);
  const ins = await query(
    `INSERT INTO users (email, password_hash, display_name, weight_kg, height_cm, birth_year, sex, locale, body_fat_pct, muscle_pct)
     VALUES ($1,$2,$3,$4,$5,$6,$7,COALESCE($8,'de'),$9,$10)
     RETURNING id, email, display_name, locale, weight_kg, height_cm, birth_year, sex, body_fat_pct, muscle_pct`,
    [email.toLowerCase(), hash, display_name || null, weight_kg || null, height_cm || null,
     birth_year || null, sex || null, locale, body_fat_pct || null, muscle_pct || null]
  );
  const user = applyDefaults(ins.rows[0]);

  // Standardpakete installieren
  await query(
    `INSERT INTO user_packages (user_id, package_id)
     SELECT $1, id FROM packages WHERE is_default = TRUE
     ON CONFLICT DO NOTHING`,
    [user.id]
  );

  const token = jwt.sign({ uid: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '60d' });
  res.json({ token, user });
});

r.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'missing_fields' });
  const u = await query(
    `SELECT id, email, password_hash, display_name, locale, weight_kg, height_cm,
            birth_year, sex, body_fat_pct, muscle_pct
     FROM users WHERE email = $1`,
    [email.toLowerCase()]
  );
  if (u.rowCount === 0) return res.status(401).json({ error: 'invalid_credentials' });
  const ok = await bcrypt.compare(password, u.rows[0].password_hash);
  if (!ok) return res.status(401).json({ error: 'invalid_credentials' });
  const token = jwt.sign({ uid: u.rows[0].id, email: u.rows[0].email }, process.env.JWT_SECRET, { expiresIn: '60d' });
  const { password_hash, ...rest } = u.rows[0];
  res.json({ token, user: applyDefaults(rest) });
});

// Aktuelles Profil (mit Defaults aufgefüllt)
r.get('/me', authRequired, async (req, res) => {
  const { rows } = await query(
    `SELECT id, email, display_name, locale, weight_kg, height_cm,
            birth_year, sex, body_fat_pct, muscle_pct
     FROM users WHERE id = $1`, [req.user.id]);
  if (rows.length === 0) return res.status(404).json({ error: 'not_found' });
  res.json(applyDefaults(rows[0]));
});

// Profil aktualisieren (nur die übergebenen Felder, sonst unverändert)
r.patch('/me', authRequired, async (req, res) => {
  const allowed = ['display_name', 'weight_kg', 'height_cm', 'birth_year', 'sex',
                   'locale', 'body_fat_pct', 'muscle_pct'];
  const updates = {};
  for (const key of allowed) {
    if (key in req.body) updates[key] = req.body[key] === '' ? null : req.body[key];
  }
  if (Object.keys(updates).length === 0) return res.status(400).json({ error: 'no_fields' });

  // Validierung: Prozent zwischen 0..100
  for (const pctKey of ['body_fat_pct', 'muscle_pct']) {
    if (updates[pctKey] != null) {
      const v = Number(updates[pctKey]);
      if (Number.isNaN(v) || v < 0 || v > 100) {
        return res.status(400).json({ error: `invalid_${pctKey}` });
      }
    }
  }

  const setParts = [];
  const values = [];
  let i = 1;
  for (const [k, v] of Object.entries(updates)) {
    setParts.push(`${k} = $${i++}`);
    values.push(v);
  }
  values.push(req.user.id);

  const { rows } = await query(
    `UPDATE users SET ${setParts.join(', ')} WHERE id = $${i}
     RETURNING id, email, display_name, locale, weight_kg, height_cm,
               birth_year, sex, body_fat_pct, muscle_pct`,
    values
  );
  res.json(applyDefaults(rows[0]));
});

export default r;
