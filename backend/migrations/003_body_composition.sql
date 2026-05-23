-- Körperzusammensetzung: optional. Wenn NULL → Standardwerte aus Untrainierte-Referenz.
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS body_fat_pct NUMERIC(4,1),
  ADD COLUMN IF NOT EXISTS muscle_pct   NUMERIC(4,1);
