import { Router } from 'express';
import { query } from '../db.js';
import { authRequired } from '../middleware/auth.js';
import { vapidPublicKey, sendToUser } from '../services/push.js';

const r = Router();

r.get('/vapid_public_key', (_req, res) => {
  res.json({ key: vapidPublicKey() });
});

r.post('/subscribe', authRequired, async (req, res) => {
  const { endpoint, keys, user_agent } = req.body || {};
  if (!endpoint || !keys?.p256dh || !keys?.auth) {
    return res.status(400).json({ error: 'invalid_subscription' });
  }
  await query(`
    INSERT INTO push_subscriptions (user_id, endpoint, p256dh, auth, user_agent)
    VALUES ($1,$2,$3,$4,$5)
    ON CONFLICT (user_id, endpoint) DO UPDATE
      SET p256dh = EXCLUDED.p256dh, auth = EXCLUDED.auth`,
    [req.user.id, endpoint, keys.p256dh, keys.auth, user_agent || null]);
  res.json({ ok: true });
});

r.post('/unsubscribe', authRequired, async (req, res) => {
  const { endpoint } = req.body || {};
  await query(`DELETE FROM push_subscriptions WHERE user_id = $1 AND endpoint = $2`,
    [req.user.id, endpoint]);
  res.json({ ok: true });
});

r.post('/test', authRequired, async (req, res) => {
  const r = await sendToUser(req.user.id, {
    title: 'Fitness Buddy',
    body: 'Test-Benachrichtigung – alles funktioniert!',
  });
  res.json(r);
});

export default r;
