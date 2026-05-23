import { Router } from 'express';
import { query } from '../db.js';
import { authRequired } from '../middleware/auth.js';

const r = Router();

r.get('/', authRequired, async (req, res) => {
  const { rows } = await query(`
    SELECT p.id, p.slug, p.name_key, p.is_default, p.is_builtin,
           m.slug AS manufacturer_slug, m.name AS manufacturer_name,
           up.user_id IS NOT NULL AS installed,
           (SELECT COUNT(*) FROM exercises e WHERE e.package_id = p.id) AS exercise_count
    FROM packages p
    LEFT JOIN manufacturers m ON m.id = p.manufacturer_id
    LEFT JOIN user_packages up ON up.package_id = p.id AND up.user_id = $1
    ORDER BY p.is_default DESC, p.slug
  `, [req.user.id]);
  res.json(rows);
});

r.post('/:id/install', authRequired, async (req, res) => {
  await query(`INSERT INTO user_packages (user_id, package_id) VALUES ($1,$2)
               ON CONFLICT DO NOTHING`, [req.user.id, req.params.id]);
  res.json({ ok: true });
});

r.post('/:id/uninstall', authRequired, async (req, res) => {
  await query(`DELETE FROM user_packages WHERE user_id = $1 AND package_id = $2`,
    [req.user.id, req.params.id]);
  res.json({ ok: true });
});

export default r;
