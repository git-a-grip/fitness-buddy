import { Router } from 'express';
import { query } from '../db.js';
import { authRequired } from '../middleware/auth.js';
import { computeMuscleState } from '../services/regeneration.js';

const r = Router();

r.get('/', async (_req, res) => {
  const { rows } = await query(
    `SELECT id, slug, name_la, name_key, region, side, size_class, base_half_life_h, antagonist_slug
     FROM muscles ORDER BY id`
  );
  res.json(rows);
});

// User-spezifischer Zustand
r.get('/state', authRequired, async (req, res) => {
  const state = await computeMuscleState(req.user.id);
  res.json(state);
});

export default r;
