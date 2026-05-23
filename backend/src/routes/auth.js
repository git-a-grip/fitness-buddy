import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';

const r = Router();

r.post('/register', async (req, res) => {
  const { email, password, display_name, weight_kg, height_cm, birth_year, sex, locale } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'missing_fields' });
  if (password.length < 8) return res.status(400).json({ error: 'password_too_short' });

  const exists = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
  if (exists.rowCount > 0) return res.status(409).json({ error: 'email_taken' });

  const hash = await bcrypt.hash(password, 10);
  const ins = await query(
    `INSERT INTO users (email, password_hash, display_name, weight_kg, height_cm, birth_year, sex, locale)
     VALUES ($1,$2,$3,$4,$5,$6,$7,COALESCE($8,'de')) RETURNING id, email, display_name, locale, weight_kg`,
    [email.toLowerCase(), hash, display_name || null, weight_kg || null, height_cm || null, birth_year || null, sex || null, locale]
  );
  const user = ins.rows[0];

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
    'SELECT id, email, password_hash, display_name, locale, weight_kg FROM users WHERE email = $1',
    [email.toLowerCase()]
  );
  if (u.rowCount === 0) return res.status(401).json({ error: 'invalid_credentials' });
  const ok = await bcrypt.compare(password, u.rows[0].password_hash);
  if (!ok) return res.status(401).json({ error: 'invalid_credentials' });
  const token = jwt.sign({ uid: u.rows[0].id, email: u.rows[0].email }, process.env.JWT_SECRET, { expiresIn: '60d' });
  const { password_hash, ...user } = u.rows[0];
  res.json({ token, user });
});

export default r;
