import { Router } from 'express';
import { query } from '../db.js';

const r = Router();

// Alle Translations für ein Locale als flaches Objekt
r.get('/:locale', async (req, res) => {
  const locale = (req.params.locale || 'de').slice(0, 8);
  const { rows } = await query(
    `SELECT key, value FROM i18n WHERE locale = $1`, [locale]);
  const out = {};
  for (const row of rows) out[row.key] = row.value;
  res.json(out);
});

export default r;
