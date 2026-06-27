-- =====================================================================
-- i18n: Haltung & Technik (App-Bereich /haltung)
-- Keys: nav.posture, posture.intro, posture.tip1–5.{title,body,cue}
-- Sprachen: DE (spiegelt die Inline-Fallbacks), EN, ES
-- Idempotent über ON CONFLICT.
-- =====================================================================

INSERT INTO i18n (key, locale, value) VALUES

-- ── Deutsch ──────────────────────────────────────────────────────────
('nav.posture',        'de', 'Haltung'),
('posture.intro',      'de', 'Die fünf wichtigsten Technik-Grundlagen für sicheres, effektives Krafttraining. Verinnerliche sie – sie gelten für fast jede Übung.'),

('posture.tip1.title', 'de', 'Neutrale Wirbelsäule'),
('posture.tip1.body',  'de', 'Halte den Rücken über die gesamte Bewegung gerade – weder rund noch ins Hohlkreuz. Die Kraft kommt aus der Hüfte (Hip Hinge), nicht aus dem unteren Rücken. Besonders wichtig bei Kreuzheben, Kniebeuge und Rudern.'),
('posture.tip1.cue',   'de', 'Brust raus, Blick nach vorn-unten, Hüfte nach hinten schieben.'),

('posture.tip2.title', 'de', 'Rumpf anspannen'),
('posture.tip2.body',  'de', 'Spanne vor jedem schweren Satz bewusst Bauch- und Rumpfmuskulatur an, als würdest du einen Schlag erwarten. Diese „Bracing"-Spannung stabilisiert die Wirbelsäule und überträgt deine Kraft effizienter ins Gewicht.'),
('posture.tip2.cue',   'de', 'Tief in den Bauch einatmen, Bauch fest machen, dann erst heben.'),

('posture.tip3.title', 'de', 'Schulterblätter zurück & unten'),
('posture.tip3.body',  'de', 'Ziehe die Schulterblätter zusammen und nach unten, die Brust hebt sich. So sitzt die Schulter sicher im Gelenk – entscheidend bei Bankdrücken, Rudern und Überkopfdrücken und schützt vor Schulterverletzungen.'),
('posture.tip3.cue',   'de', 'Schulterblätter „in die Gesäßtaschen" ziehen, Brust raus.'),

('posture.tip4.title', 'de', 'Knie folgen den Zehen'),
('posture.tip4.body',  'de', 'Lass die Knie in Richtung der Fußspitzen wandern – niemals nach innen einknicken. Bei Kniebeuge und Ausfallschritt sorgt das für eine gesunde Belastung von Knie und Hüfte.'),
('posture.tip4.cue',   'de', 'Knie aktiv nach außen drücken, Füße fest am Boden verwurzeln.'),

('posture.tip5.title', 'de', 'Kontrolliert bewegen & ausatmen'),
('posture.tip5.body',  'de', 'Bewege das Gewicht langsam und kontrolliert, vor allem beim Absenken (exzentrische Phase). Atme bei der Anstrengung aus, beim Zurückführen ein. Kontrolle bringt mehr Trainingsreiz als Schwung.'),
('posture.tip5.cue',   'de', '2 Sekunden heben, 3 Sekunden senken, beim Drücken ausatmen.'),

-- ── English ──────────────────────────────────────────────────────────
('nav.posture',        'en', 'Form'),
('posture.intro',      'en', 'The five most important technique fundamentals for safe, effective strength training. Master them – they apply to almost every exercise.'),

('posture.tip1.title', 'en', 'Neutral spine'),
('posture.tip1.body',  'en', 'Keep your back straight throughout the movement – neither rounded nor overarched. The power comes from the hips (hip hinge), not from your lower back. Especially important for deadlifts, squats and rows.'),
('posture.tip1.cue',   'en', 'Chest up, gaze forward-down, push your hips back.'),

('posture.tip2.title', 'en', 'Brace your core'),
('posture.tip2.body',  'en', 'Before every heavy set, deliberately tense your abdominal and core muscles as if bracing for a punch. This bracing pressure stabilizes the spine and transfers your strength more efficiently into the weight.'),
('posture.tip2.cue',   'en', 'Breathe deep into your belly, make it firm, then lift.'),

('posture.tip3.title', 'en', 'Shoulder blades back & down'),
('posture.tip3.body',  'en', 'Pull your shoulder blades together and down so the chest lifts. This seats the shoulder safely in the joint – crucial for bench press, rows and overhead press, and protects against shoulder injuries.'),
('posture.tip3.cue',   'en', 'Tuck your shoulder blades into your back pockets, chest up.'),

('posture.tip4.title', 'en', 'Knees track over toes'),
('posture.tip4.body',  'en', 'Let your knees travel toward your toes – never let them cave inward. In squats and lunges this keeps the load on knees and hips healthy.'),
('posture.tip4.cue',   'en', 'Actively push your knees out, root your feet into the floor.'),

('posture.tip5.title', 'en', 'Move with control & exhale'),
('posture.tip5.body',  'en', 'Move the weight slowly and under control, especially while lowering (the eccentric phase). Exhale during the effort, inhale on the way back. Control delivers more training stimulus than momentum.'),
('posture.tip5.cue',   'en', 'Lift for 2 seconds, lower for 3, exhale as you press.'),

-- ── Español ──────────────────────────────────────────────────────────
('nav.posture',        'es', 'Técnica'),
('posture.intro',      'es', 'Los cinco fundamentos técnicos más importantes para un entrenamiento de fuerza seguro y eficaz. Interiorízalos: se aplican a casi todos los ejercicios.'),

('posture.tip1.title', 'es', 'Columna neutra'),
('posture.tip1.body',  'es', 'Mantén la espalda recta durante todo el movimiento, ni redondeada ni arqueada en exceso. La fuerza viene de la cadera (bisagra de cadera), no de la zona lumbar. Especialmente importante en peso muerto, sentadilla y remo.'),
('posture.tip1.cue',   'es', 'Pecho afuera, mirada al frente y abajo, empuja la cadera hacia atrás.'),

('posture.tip2.title', 'es', 'Activa el core'),
('posture.tip2.body',  'es', 'Antes de cada serie pesada, tensa de forma consciente los músculos abdominales y del tronco, como si esperaras un golpe. Esa presión de „bracing" estabiliza la columna y transmite tu fuerza con más eficacia.'),
('posture.tip2.cue',   'es', 'Respira hondo hacia el abdomen, ténsalo y entonces levanta.'),

('posture.tip3.title', 'es', 'Escápulas atrás y abajo'),
('posture.tip3.body',  'es', 'Junta las escápulas y bájalas, el pecho se eleva. Así el hombro queda firme en la articulación: clave en press de banca, remo y press por encima de la cabeza, y protege de lesiones de hombro.'),
('posture.tip3.cue',   'es', 'Lleva las escápulas „a los bolsillos traseros", pecho afuera.'),

('posture.tip4.title', 'es', 'Las rodillas siguen a los dedos'),
('posture.tip4.body',  'es', 'Deja que las rodillas avancen hacia la punta de los pies, sin hundirse nunca hacia dentro. En sentadilla y zancada esto mantiene sana la carga en rodillas y cadera.'),
('posture.tip4.cue',   'es', 'Empuja las rodillas activamente hacia fuera, fija bien los pies en el suelo.'),

('posture.tip5.title', 'es', 'Movimiento controlado y exhala'),
('posture.tip5.body',  'es', 'Mueve el peso despacio y con control, sobre todo al bajar (fase excéntrica). Exhala durante el esfuerzo e inhala al volver. El control genera más estímulo que el impulso.'),
('posture.tip5.cue',   'es', 'Sube en 2 segundos, baja en 3, exhala al empujar.')

ON CONFLICT (key, locale) DO UPDATE SET value = EXCLUDED.value;
