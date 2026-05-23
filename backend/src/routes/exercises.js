import { Router } from 'express';
import { query } from '../db.js';
import { authRequired } from '../middleware/auth.js';

const r = Router();

// Alle für den Nutzer verfügbaren Übungen (aus installierten Paketen + eigene)
r.get('/', authRequired, async (req, res) => {
  const { rows } = await query(`
    SELECT e.id, e.slug, e.name_key, e.category, e.modality, e.met_value,
           p.slug AS package_slug, e.is_custom,
           COALESCE(
             json_agg(json_build_object(
               'muscle_slug', m.slug,
               'name_key',    m.name_key,
               'involvement', em.involvement
             )) FILTER (WHERE m.id IS NOT NULL), '[]'
           ) AS muscles
    FROM exercises e
    LEFT JOIN packages p          ON p.id = e.package_id
    LEFT JOIN exercise_muscles em ON em.exercise_id = e.id
    LEFT JOIN muscles m           ON m.id = em.muscle_id
    WHERE
      (e.package_id IN (SELECT package_id FROM user_packages WHERE user_id = $1))
      OR (e.is_custom = TRUE AND e.owner_user_id = $1)
    GROUP BY e.id, p.slug
    ORDER BY p.slug, e.name_key
  `, [req.user.id]);
  res.json(rows);
});

// Eigene Übung anlegen
r.post('/custom', authRequired, async (req, res) => {
  const { slug, name_de, category, modality, met_value, muscles } = req.body || {};
  if (!slug || !name_de || !category || !met_value) {
    return res.status(400).json({ error: 'missing_fields' });
  }
  const fullSlug = `custom_${req.user.id}_${slug}`;
  const nameKey = `exercise.${fullSlug}`;
  const ins = await query(
    `INSERT INTO exercises (slug, name_key, category, modality, met_value, default_intensity, is_custom, owner_user_id)
     VALUES ($1,$2,$3,$4,$5,1.0,TRUE,$6)
     RETURNING id`,
    [fullSlug, nameKey, category, modality || 'machine', met_value, req.user.id]
  );
  const exId = ins.rows[0].id;

  await query(`INSERT INTO i18n (key, locale, value) VALUES ($1,'de',$2)
               ON CONFLICT (key, locale) DO UPDATE SET value = EXCLUDED.value`,
    [nameKey, name_de]);

  if (Array.isArray(muscles)) {
    for (const m of muscles) {
      await query(`INSERT INTO exercise_muscles (exercise_id, muscle_id, involvement)
                   SELECT $1, id, $3 FROM muscles WHERE slug = $2
                   ON CONFLICT DO NOTHING`,
        [exId, m.muscle_slug, m.involvement || 'primary']);
    }
  }
  res.json({ id: exId, slug: fullSlug });
});

export default r;
