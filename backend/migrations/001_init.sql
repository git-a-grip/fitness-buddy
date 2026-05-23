-- Users
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name  VARCHAR(120),
  weight_kg     NUMERIC(5,2),
  height_cm     INTEGER,
  birth_year    INTEGER,
  sex           VARCHAR(1) CHECK (sex IN ('m','f','d')),
  locale        VARCHAR(8) NOT NULL DEFAULT 'de',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- i18n translation keys
CREATE TABLE IF NOT EXISTS i18n (
  id      SERIAL PRIMARY KEY,
  key     VARCHAR(160) NOT NULL,
  locale  VARCHAR(8)   NOT NULL,
  value   TEXT         NOT NULL,
  UNIQUE (key, locale)
);
CREATE INDEX IF NOT EXISTS idx_i18n_key ON i18n(key);

-- Muscles (anatomic catalog)
CREATE TABLE IF NOT EXISTS muscles (
  id                  SERIAL PRIMARY KEY,
  slug                VARCHAR(64) UNIQUE NOT NULL,            -- e.g. 'pectoralis_major'
  name_la             VARCHAR(160) NOT NULL,                  -- latin (canonical)
  name_key            VARCHAR(160) NOT NULL,                  -- i18n key, e.g. 'muscle.pectoralis_major'
  region              VARCHAR(32) NOT NULL,                   -- chest, back, shoulder, arm, core, leg
  side                VARCHAR(8)  NOT NULL CHECK (side IN ('front','back','both')),
  size_class          VARCHAR(8)  NOT NULL CHECK (size_class IN ('large','medium','small')),
  -- Base recovery half-life in hours (Mike Israetel / Schoenfeld scaled)
  base_half_life_h    NUMERIC(5,1) NOT NULL,
  antagonist_slug     VARCHAR(64)                             -- nullable
);

-- Manufacturers (Technogym, Life Fitness, Hammer Strength, ...)
CREATE TABLE IF NOT EXISTS manufacturers (
  id        SERIAL PRIMARY KEY,
  slug      VARCHAR(64) UNIQUE NOT NULL,
  name      VARCHAR(120) NOT NULL,
  is_builtin BOOLEAN NOT NULL DEFAULT FALSE
);

-- Equipment / exercise packages (Technogym Selection, Cardio-Free, custom)
CREATE TABLE IF NOT EXISTS packages (
  id              SERIAL PRIMARY KEY,
  slug            VARCHAR(64) UNIQUE NOT NULL,
  name_key        VARCHAR(160) NOT NULL,
  manufacturer_id INTEGER REFERENCES manufacturers(id) ON DELETE SET NULL,
  is_default      BOOLEAN NOT NULL DEFAULT FALSE,             -- installed by default
  is_builtin      BOOLEAN NOT NULL DEFAULT TRUE
);

-- A user's installed packages
CREATE TABLE IF NOT EXISTS user_packages (
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  package_id INTEGER NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  installed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, package_id)
);

-- Exercises (catalog – Technogym Chest Press, Treadmill, ...)
CREATE TABLE IF NOT EXISTS exercises (
  id           SERIAL PRIMARY KEY,
  slug         VARCHAR(96) UNIQUE NOT NULL,
  package_id   INTEGER REFERENCES packages(id) ON DELETE CASCADE,
  name_key     VARCHAR(160) NOT NULL,                          -- i18n key
  category     VARCHAR(24) NOT NULL,                           -- strength | cardio | mobility
  modality     VARCHAR(24) NOT NULL,                           -- machine | freeweight | bodyweight | cardio
  met_value    NUMERIC(4,1) NOT NULL,                          -- Compendium MET
  default_intensity NUMERIC(4,2),                              -- multiplier for kcal at moderate effort
  is_custom    BOOLEAN NOT NULL DEFAULT FALSE,
  owner_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE -- NULL if catalog
);

-- exercise <-> muscle (M:N with involvement level)
CREATE TABLE IF NOT EXISTS exercise_muscles (
  exercise_id  INTEGER NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  muscle_id    INTEGER NOT NULL REFERENCES muscles(id) ON DELETE CASCADE,
  involvement  VARCHAR(12) NOT NULL CHECK (involvement IN ('primary','secondary','stabilizer')),
  PRIMARY KEY (exercise_id, muscle_id)
);

-- Workouts (a session)
CREATE TABLE IF NOT EXISTS workouts (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  started_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at    TIMESTAMPTZ,
  notes       TEXT
);

-- Sets / cardio bouts within a workout
CREATE TABLE IF NOT EXISTS workout_sets (
  id           SERIAL PRIMARY KEY,
  workout_id   INTEGER NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  exercise_id  INTEGER NOT NULL REFERENCES exercises(id) ON DELETE RESTRICT,
  performed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sets         INTEGER,           -- strength: number of sets
  reps         INTEGER,           -- strength: reps per set
  weight_kg    NUMERIC(6,2),      -- strength
  duration_s   INTEGER,           -- cardio
  distance_m   INTEGER,           -- cardio (optional)
  rpe          NUMERIC(3,1),      -- subjective effort 1-10 (optional)
  kcal         NUMERIC(7,2)       -- computed and stored
);
CREATE INDEX IF NOT EXISTS idx_sets_workout ON workout_sets(workout_id);
CREATE INDEX IF NOT EXISTS idx_sets_user_time ON workout_sets(performed_at);

-- Personal training plans / custom packages
CREATE TABLE IF NOT EXISTS training_plans (
  id        SERIAL PRIMARY KEY,
  user_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name      VARCHAR(120) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS training_plan_items (
  id          SERIAL PRIMARY KEY,
  plan_id     INTEGER NOT NULL REFERENCES training_plans(id) ON DELETE CASCADE,
  exercise_id INTEGER NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  position    INTEGER NOT NULL DEFAULT 0,
  target_sets INTEGER,
  target_reps INTEGER,
  target_weight_kg NUMERIC(6,2),
  target_duration_s INTEGER
);

-- Knowledge articles (Wissensseite)
CREATE TABLE IF NOT EXISTS knowledge_articles (
  id          SERIAL PRIMARY KEY,
  slug        VARCHAR(64) UNIQUE NOT NULL,
  title_key   VARCHAR(160) NOT NULL,
  body_key    VARCHAR(160) NOT NULL,
  category    VARCHAR(32) NOT NULL,                 -- metabolism | recovery | basics
  position    INTEGER NOT NULL DEFAULT 0
);
