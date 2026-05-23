import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { suggestNextExercises } from '../services/suggestions.js';

const r = Router();

r.get('/next', authRequired, async (req, res) => {
  const limit = Math.min(10, Number(req.query.limit) || 5);
  const out = await suggestNextExercises(req.user.id, limit);
  res.json(out);
});

export default r;
