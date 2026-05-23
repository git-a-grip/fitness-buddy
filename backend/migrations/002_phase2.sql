-- Phase 2: Web-Push, Reminder, Einnahmen (Eiweiß-Shake, Kreatin)

CREATE TABLE IF NOT EXISTS push_subscriptions (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  endpoint   TEXT NOT NULL,
  p256dh     TEXT NOT NULL,
  auth       TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, endpoint)
);

CREATE TABLE IF NOT EXISTS scheduled_reminders (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  send_at    TIMESTAMPTZ NOT NULL,
  title      VARCHAR(160) NOT NULL,
  body       TEXT NOT NULL,
  sent_at    TIMESTAMPTZ,
  workout_id INTEGER REFERENCES workouts(id) ON DELETE SET NULL,
  payload    JSONB
);
CREATE INDEX IF NOT EXISTS idx_reminders_pending ON scheduled_reminders(send_at) WHERE sent_at IS NULL;

CREATE TABLE IF NOT EXISTS intakes (
  id        SERIAL PRIMARY KEY,
  user_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind      VARCHAR(32) NOT NULL,           -- 'protein_shake' | 'creatine' | 'water' | ...
  taken_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  amount    NUMERIC(7,2),                   -- z.B. Gramm
  unit      VARCHAR(16),                    -- 'g' | 'ml'
  workout_id INTEGER REFERENCES workouts(id) ON DELETE SET NULL,
  notes     TEXT
);
CREATE INDEX IF NOT EXISTS idx_intakes_user_time ON intakes(user_id, taken_at);

-- Pro Workout merken, ob Dehnung gemacht wurde
CREATE TABLE IF NOT EXISTS workout_stretches (
  workout_id   INTEGER PRIMARY KEY REFERENCES workouts(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  duration_s   INTEGER
);
