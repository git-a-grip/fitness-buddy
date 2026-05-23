import { Router } from 'express';
import { query } from '../db.js';

const r = Router();

r.get('/', async (_req, res) => {
  const { rows } = await query(
    `SELECT slug, title_key, body_key, category, position
     FROM knowledge_articles ORDER BY category, position`);
  res.json(rows);
});

export default r;
