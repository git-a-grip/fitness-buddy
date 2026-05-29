-- Wissensartikel: Maximalkraft / 1RM-Schätzung
INSERT INTO knowledge_articles (slug, title_key, body_key, category, position) VALUES
('maximalkraft_1rm', 'kn.1rm.title', 'kn.1rm.body', 'basics', 15)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO i18n (key, locale, value) VALUES
('kn.1rm.title', 'de', 'Maximalkraft (1RM) aus dem letzten Satz ableiten'),
('kn.1rm.body',  'de',
'Die **Maximalkraft (1RM – One Repetition Maximum)** ist das höchste Gewicht, das du bei einer Übung genau einmal korrekt bewegen kannst. Sie ist die Referenzgröße für Trainingsintensität.

**Warum nicht direkt testen?**
Ein echter 1RM-Test ist belastend, verletzungsanfällig und erfordert einen erfahrenen Spotter. Deshalb schätzt man den 1RM aus einem submaximal Satz – also z.B. aus 8 Wiederholungen mit 80 kg.

**Die zwei bekanntesten Formeln:**

**Epley-Formel** (1985, am weitesten verbreitet):
`1RM = Gewicht × (1 + Wiederholungen / 30)`

**Brzycki-Formel** (1993, bei weniger WH etwas genauer):
`1RM = Gewicht / (1.0278 − 0.0278 × Wiederholungen)`

Beide Formeln liefern für 1–10 Wiederholungen sehr ähnliche Ergebnisse. Ab 12+ WH wird die Schätzung ungenauer, weil Ausdauerfaktoren reinspielen.

**Beispiel:** Benchpress 3 × 8 × 80 kg
→ Epley: 80 × (1 + 8/30) = **101 kg**
→ Brzycki: 80 / (1.0278 − 0.0278 × 8) = **102 kg**

**Wozu den 1RM kennen?**
- **Kraftzuwachs tracken** ohne maximale Belastung
- **Trainingsintensität planen:** Hypertrophie = 65–85 % 1RM, Maximalkraft = 85–100 % 1RM
- **Progression steuern:** Wenn dein geschätzter 1RM steigt, wirst du stärker

[[calculator:1rm]]

**Genauigkeit:** ± 5–10 % gegenüber einem echten 1RM-Test. Je näher an 1–5 WH, desto präziser. Bei 15+ WH nur noch Richtwert.

**Quellen:** Epley B (1985); Brzycki M (1993) Strength & Conditioning Journal; Mayhew JL et al. (1992) J Sports Med Phys Fitness.'),

('kn.1rm.title', 'en', 'Estimating your 1RM (one-rep max) from a submaximal set'),
('kn.1rm.body',  'en',
'Your **1RM (One Repetition Maximum)** is the heaviest weight you can lift for exactly one correct rep. It is the reference point for training intensity.

**Why not test it directly?**
A true 1RM test is taxing, injury-prone, and requires an experienced spotter. Instead, you estimate your 1RM from a submaximal set – e.g., 8 reps at 80 kg.

**The two most common formulas:**

**Epley formula** (1985, most widely used):
`1RM = weight × (1 + reps / 30)`

**Brzycki formula** (1993, slightly more accurate for low reps):
`1RM = weight / (1.0278 − 0.0278 × reps)`

Both formulas produce very similar results for 1–10 reps. Beyond 12 reps the estimate becomes less reliable as endurance factors increase.

**Example:** Bench press 3 × 8 × 80 kg
→ Epley: 80 × (1 + 8/30) = **101 kg**
→ Brzycki: 80 / (1.0278 − 0.0278 × 8) = **102 kg**

**Why know your 1RM?**
- **Track strength gains** without maximal loading
- **Plan intensity:** hypertrophy = 65–85 % 1RM, maximal strength = 85–100 % 1RM
- **Drive progression:** if your estimated 1RM rises, you are getting stronger

[[calculator:1rm]]

**Accuracy:** ± 5–10 % versus a true 1RM test. The closer to 1–5 reps, the more precise. Above 15 reps, treat it as a rough guideline.

**Sources:** Epley B (1985); Brzycki M (1993) Strength & Conditioning Journal; Mayhew JL et al. (1992) J Sports Med Phys Fitness.')
ON CONFLICT (key, locale) DO UPDATE SET value = EXCLUDED.value;

-- UI-Strings für den Rechner
INSERT INTO i18n (key, locale, value) VALUES
('calc.1rm.title',         'de', '1RM-Rechner'),
('calc.1rm.weight',        'de', 'Gewicht (kg)'),
('calc.1rm.reps',          'de', 'Wiederholungen'),
('calc.1rm.calculate',     'de', 'Berechnen'),
('calc.1rm.result_epley',  'de', 'Epley'),
('calc.1rm.result_brzycki','de', 'Brzycki'),
('calc.1rm.average',       'de', 'Durchschnitt'),
('calc.1rm.load_last',     'de', 'Letzten Satz laden'),
('calc.1rm.no_sets',       'de', 'Noch keine Kraft-Sätze geloggt.'),
('calc.1rm.loaded_from',   'de', 'Übernommen von:'),
('calc.1rm.training_zones','de', 'Trainingszonen'),
('calc.1rm.zone.max',      'de', 'Maximalkraft (85–100 %)'),
('calc.1rm.zone.hyper',    'de', 'Hypertrophie (65–85 %)'),
('calc.1rm.zone.endurance','de', 'Kraftausdauer (50–65 %)'),

('calc.1rm.title',         'en', '1RM Calculator'),
('calc.1rm.weight',        'en', 'Weight (kg)'),
('calc.1rm.reps',          'en', 'Reps'),
('calc.1rm.calculate',     'en', 'Calculate'),
('calc.1rm.result_epley',  'en', 'Epley'),
('calc.1rm.result_brzycki','en', 'Brzycki'),
('calc.1rm.average',       'en', 'Average'),
('calc.1rm.load_last',     'en', 'Load last set'),
('calc.1rm.no_sets',       'en', 'No strength sets logged yet.'),
('calc.1rm.loaded_from',   'en', 'Loaded from:'),
('calc.1rm.training_zones','en', 'Training zones'),
('calc.1rm.zone.max',      'en', 'Maximal strength (85–100 %)'),
('calc.1rm.zone.hyper',    'en', 'Hypertrophy (65–85 %)'),
('calc.1rm.zone.endurance','en', 'Strength endurance (50–65 %)')
ON CONFLICT (key, locale) DO UPDATE SET value = EXCLUDED.value;
