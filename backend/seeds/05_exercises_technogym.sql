-- Technogym Selection & Excite – Geräte und Muskel-Mappings
-- MET-Werte gem. Compendium of Physical Activities (Ainsworth et al. 2011)

WITH pkg AS (SELECT id FROM packages WHERE slug='technogym_selection_excite')
INSERT INTO exercises (slug, package_id, name_key, category, modality, met_value, default_intensity)
SELECT s, (SELECT id FROM pkg), k, c, m, mv, di
FROM (VALUES
  -- Brust
  ('tg_chest_press',         'exercise.tg_chest_press',         'strength','machine',    6.0, 1.00),
  ('tg_incline_chest_press', 'exercise.tg_incline_chest_press', 'strength','machine',    6.0, 1.00),
  ('tg_decline_chest_press', 'exercise.tg_decline_chest_press', 'strength','machine',    6.0, 1.00),
  ('tg_pectoral_machine',    'exercise.tg_pectoral_machine',    'strength','machine',    5.0, 0.90),
  ('tg_cable_crossover',     'exercise.tg_cable_crossover',     'strength','machine',    5.0, 0.90),
  -- Rücken / Latissimus
  ('tg_lat_machine',         'exercise.tg_lat_machine',         'strength','machine',    6.0, 1.00),
  ('tg_vertical_traction',   'exercise.tg_vertical_traction',   'strength','machine',    6.0, 1.00),
  ('tg_pulldown',            'exercise.tg_pulldown',            'strength','machine',    6.0, 1.00),
  ('tg_low_row',             'exercise.tg_low_row',             'strength','machine',    6.0, 1.00),
  ('tg_mid_row',             'exercise.tg_mid_row',             'strength','machine',    6.0, 1.00),
  ('tg_assisted_pullup',     'exercise.tg_assisted_pullup',     'strength','machine',    6.0, 1.00),
  ('tg_lower_back',          'exercise.tg_lower_back',          'strength','machine',    5.0, 0.90),
  ('tg_back_extension',      'exercise.tg_back_extension',      'strength','machine',    4.5, 0.85),
  ('tg_reverse_pec_deck',    'exercise.tg_reverse_pec_deck',    'strength','machine',    5.0, 0.90),
  -- Schultern
  ('tg_shoulder_press',      'exercise.tg_shoulder_press',      'strength','machine',    6.0, 1.00),
  ('tg_lateral_raise',       'exercise.tg_lateral_raise',       'strength','machine',    5.0, 0.90),
  ('tg_shrug',               'exercise.tg_shrug',               'strength','machine',    5.0, 0.90),
  -- Arme
  ('tg_arm_curl',            'exercise.tg_arm_curl',            'strength','machine',    5.0, 0.90),
  ('tg_arm_extension',       'exercise.tg_arm_extension',       'strength','machine',    5.0, 0.90),
  ('tg_biceps_machine',      'exercise.tg_biceps_machine',      'strength','machine',    5.0, 0.90),
  ('tg_triceps_press',       'exercise.tg_triceps_press',       'strength','machine',    5.0, 0.90),
  ('tg_triceps_pushdown',    'exercise.tg_triceps_pushdown',    'strength','machine',    5.0, 0.90),
  -- Beine
  ('tg_leg_press',           'exercise.tg_leg_press',           'strength','machine',    6.5, 1.10),
  ('tg_hack_squat',          'exercise.tg_hack_squat',          'strength','machine',    6.5, 1.10),
  ('tg_leg_extension',       'exercise.tg_leg_extension',       'strength','machine',    5.5, 0.95),
  ('tg_leg_curl_lying',      'exercise.tg_leg_curl_lying',      'strength','machine',    5.5, 0.95),
  ('tg_leg_curl_seated',     'exercise.tg_leg_curl_seated',     'strength','machine',    5.5, 0.95),
  ('tg_abductor',            'exercise.tg_abductor',            'strength','machine',    4.5, 0.85),
  ('tg_adductor',            'exercise.tg_adductor',            'strength','machine',    4.5, 0.85),
  ('tg_glute',               'exercise.tg_glute',               'strength','machine',    6.0, 1.00),
  ('tg_glute_drive',         'exercise.tg_glute_drive',         'strength','machine',    6.5, 1.10),
  ('tg_multi_hip',           'exercise.tg_multi_hip',           'strength','machine',    5.5, 0.95),
  ('tg_calf_standing',       'exercise.tg_calf_standing',       'strength','machine',    5.0, 0.90),
  ('tg_calf_seated',         'exercise.tg_calf_seated',         'strength','machine',    4.5, 0.85),
  -- Core
  ('tg_ab_crunch',           'exercise.tg_ab_crunch',           'strength','machine',    4.5, 0.85),
  ('tg_rotary_torso',        'exercise.tg_rotary_torso',        'strength','machine',    4.5, 0.85),
  -- Smith / Hantelbank
  ('tg_smith_bench_press',   'exercise.tg_smith_bench_press',   'strength','freeweight', 6.0, 1.00),
  ('tg_smith_squat',         'exercise.tg_smith_squat',         'strength','freeweight', 6.5, 1.10),
  ('tg_smith_deadlift',      'exercise.tg_smith_deadlift',      'strength','freeweight', 7.0, 1.15),
  -- Excite Cardio
  ('tg_treadmill_run',       'exercise.tg_treadmill_run',       'cardio',  'cardio',     9.8, 1.00),
  ('tg_treadmill_walk',      'exercise.tg_treadmill_walk',      'cardio',  'cardio',     4.3, 1.00),
  ('tg_recline_bike',        'exercise.tg_recline_bike',        'cardio',  'cardio',     6.8, 1.00),
  ('tg_upright_bike',        'exercise.tg_upright_bike',        'cardio',  'cardio',     7.0, 1.00),
  ('tg_synchro_elliptical',  'exercise.tg_synchro_elliptical',  'cardio',  'cardio',     5.0, 1.00),
  ('tg_skillrow',            'exercise.tg_skillrow',            'cardio',  'cardio',     7.0, 1.00),
  ('tg_climb',               'exercise.tg_climb',               'cardio',  'cardio',     9.0, 1.00),
  ('tg_skillmill',           'exercise.tg_skillmill',           'cardio',  'cardio',     9.5, 1.00),
  ('tg_wave',                'exercise.tg_wave',                'cardio',  'cardio',     5.5, 1.00),
  ('tg_arc_trainer',         'exercise.tg_arc_trainer',         'cardio',  'cardio',     6.5, 1.00)
) AS x(s, k, c, m, mv, di)
ON CONFLICT (slug) DO NOTHING;

-- Deutsche Namen
INSERT INTO i18n (key, locale, value) VALUES
('exercise.tg_chest_press',         'de', 'Chest Press'),
('exercise.tg_incline_chest_press', 'de', 'Schrägbankdrücken (Maschine)'),
('exercise.tg_decline_chest_press', 'de', 'Negativbankdrücken (Maschine)'),
('exercise.tg_pectoral_machine',    'de', 'Butterfly (Pec Deck)'),
('exercise.tg_cable_crossover',     'de', 'Cable Crossover'),
('exercise.tg_lat_machine',         'de', 'Latzug breit'),
('exercise.tg_vertical_traction',   'de', 'Vertikalzug eng'),
('exercise.tg_pulldown',            'de', 'Pulldown'),
('exercise.tg_low_row',             'de', 'Tiefes Rudern'),
('exercise.tg_mid_row',             'de', 'Rudern mittel'),
('exercise.tg_assisted_pullup',     'de', 'Klimmzug-Maschine'),
('exercise.tg_lower_back',          'de', 'Unterer Rücken'),
('exercise.tg_back_extension',      'de', 'Rückenstrecker'),
('exercise.tg_reverse_pec_deck',    'de', 'Reverse Butterfly'),
('exercise.tg_shoulder_press',      'de', 'Schulterdrücken'),
('exercise.tg_lateral_raise',       'de', 'Seitheben (Maschine)'),
('exercise.tg_shrug',               'de', 'Nackenheben'),
('exercise.tg_arm_curl',            'de', 'Bizeps-Curl-Maschine'),
('exercise.tg_arm_extension',       'de', 'Trizeps-Strecker'),
('exercise.tg_biceps_machine',      'de', 'Bizeps-Maschine (Scott)'),
('exercise.tg_triceps_press',       'de', 'Trizeps-Press'),
('exercise.tg_triceps_pushdown',    'de', 'Trizeps-Drücken (Kabel)'),
('exercise.tg_leg_press',           'de', 'Beinpresse'),
('exercise.tg_hack_squat',          'de', 'Hackenschmidt-Kniebeuge'),
('exercise.tg_leg_extension',       'de', 'Beinstrecker'),
('exercise.tg_leg_curl_lying',      'de', 'Beinbeuger liegend'),
('exercise.tg_leg_curl_seated',     'de', 'Beinbeuger sitzend'),
('exercise.tg_abductor',            'de', 'Abduktorenmaschine'),
('exercise.tg_adductor',            'de', 'Adduktorenmaschine'),
('exercise.tg_glute',               'de', 'Glute-Maschine'),
('exercise.tg_glute_drive',         'de', 'Hip Thrust (Glute Drive)'),
('exercise.tg_multi_hip',           'de', 'Multi-Hip'),
('exercise.tg_calf_standing',       'de', 'Wadenheben stehend'),
('exercise.tg_calf_seated',         'de', 'Wadenheben sitzend'),
('exercise.tg_ab_crunch',           'de', 'Bauchpresse'),
('exercise.tg_rotary_torso',        'de', 'Rumpfdrehen'),
('exercise.tg_smith_bench_press',   'de', 'Bankdrücken (Smith)'),
('exercise.tg_smith_squat',         'de', 'Kniebeuge (Smith)'),
('exercise.tg_smith_deadlift',      'de', 'Kreuzheben (Smith)'),
('exercise.tg_treadmill_run',       'de', 'Laufband (Joggen)'),
('exercise.tg_treadmill_walk',      'de', 'Laufband (Gehen)'),
('exercise.tg_recline_bike',        'de', 'Liege-Ergometer'),
('exercise.tg_upright_bike',        'de', 'Aufrecht-Ergometer'),
('exercise.tg_synchro_elliptical',  'de', 'Crosstrainer (Synchro)'),
('exercise.tg_skillrow',            'de', 'Rudergerät (Skillrow)'),
('exercise.tg_climb',               'de', 'Stair Climber'),
('exercise.tg_skillmill',           'de', 'Skillmill (kurv. Laufband)'),
('exercise.tg_wave',                'de', 'Wave Trainer'),
('exercise.tg_arc_trainer',         'de', 'Arc Trainer')
ON CONFLICT (key, locale) DO UPDATE SET value = EXCLUDED.value;

-- Muskel-Mappings: (exercise_slug, muscle_slug, involvement)
INSERT INTO exercise_muscles (exercise_id, muscle_id, involvement)
SELECT (SELECT id FROM exercises WHERE slug=e), (SELECT id FROM muscles WHERE slug=m), inv
FROM (VALUES
  -- Chest Press
  ('tg_chest_press','pectoralis_major','primary'),
  ('tg_chest_press','triceps_brachii','secondary'),
  ('tg_chest_press','deltoideus_anterior','secondary'),
  ('tg_chest_press','serratus_anterior','stabilizer'),
  -- Incline Chest Press
  ('tg_incline_chest_press','pectoralis_major','primary'),
  ('tg_incline_chest_press','deltoideus_anterior','primary'),
  ('tg_incline_chest_press','triceps_brachii','secondary'),
  -- Decline Chest Press
  ('tg_decline_chest_press','pectoralis_major','primary'),
  ('tg_decline_chest_press','triceps_brachii','secondary'),
  -- Pectoral Machine (Butterfly)
  ('tg_pectoral_machine','pectoralis_major','primary'),
  ('tg_pectoral_machine','pectoralis_minor','secondary'),
  ('tg_pectoral_machine','deltoideus_anterior','stabilizer'),
  -- Cable Crossover
  ('tg_cable_crossover','pectoralis_major','primary'),
  ('tg_cable_crossover','deltoideus_anterior','secondary'),
  -- Lat Machine (Latzug breit)
  ('tg_lat_machine','latissimus_dorsi','primary'),
  ('tg_lat_machine','teres_major','secondary'),
  ('tg_lat_machine','biceps_brachii','secondary'),
  ('tg_lat_machine','rhomboideus','secondary'),
  ('tg_lat_machine','trapezius_lower','stabilizer'),
  -- Vertical Traction
  ('tg_vertical_traction','latissimus_dorsi','primary'),
  ('tg_vertical_traction','biceps_brachii','secondary'),
  ('tg_vertical_traction','rhomboideus','secondary'),
  -- Pulldown
  ('tg_pulldown','latissimus_dorsi','primary'),
  ('tg_pulldown','biceps_brachii','secondary'),
  ('tg_pulldown','teres_major','secondary'),
  -- Low Row
  ('tg_low_row','latissimus_dorsi','primary'),
  ('tg_low_row','rhomboideus','primary'),
  ('tg_low_row','trapezius_middle','secondary'),
  ('tg_low_row','biceps_brachii','secondary'),
  ('tg_low_row','deltoideus_posterior','secondary'),
  -- Mid Row
  ('tg_mid_row','rhomboideus','primary'),
  ('tg_mid_row','latissimus_dorsi','primary'),
  ('tg_mid_row','trapezius_middle','secondary'),
  ('tg_mid_row','biceps_brachii','secondary'),
  -- Assisted Pullup
  ('tg_assisted_pullup','latissimus_dorsi','primary'),
  ('tg_assisted_pullup','biceps_brachii','secondary'),
  ('tg_assisted_pullup','teres_major','secondary'),
  ('tg_assisted_pullup','rhomboideus','stabilizer'),
  -- Lower Back
  ('tg_lower_back','erector_spinae','primary'),
  ('tg_lower_back','gluteus_maximus','secondary'),
  -- Back Extension
  ('tg_back_extension','erector_spinae','primary'),
  ('tg_back_extension','gluteus_maximus','secondary'),
  ('tg_back_extension','biceps_femoris','secondary'),
  -- Reverse Pec Deck
  ('tg_reverse_pec_deck','deltoideus_posterior','primary'),
  ('tg_reverse_pec_deck','rhomboideus','primary'),
  ('tg_reverse_pec_deck','trapezius_middle','secondary'),
  ('tg_reverse_pec_deck','infraspinatus','secondary'),
  -- Shoulder Press
  ('tg_shoulder_press','deltoideus_anterior','primary'),
  ('tg_shoulder_press','deltoideus_lateralis','primary'),
  ('tg_shoulder_press','triceps_brachii','secondary'),
  ('tg_shoulder_press','trapezius_upper','stabilizer'),
  -- Lateral Raise
  ('tg_lateral_raise','deltoideus_lateralis','primary'),
  ('tg_lateral_raise','supraspinatus','secondary'),
  -- Shrug
  ('tg_shrug','trapezius_upper','primary'),
  ('tg_shrug','trapezius_middle','secondary'),
  -- Arm Curl
  ('tg_arm_curl','biceps_brachii','primary'),
  ('tg_arm_curl','brachialis','secondary'),
  ('tg_arm_curl','brachioradialis','secondary'),
  -- Arm Extension
  ('tg_arm_extension','triceps_brachii','primary'),
  -- Biceps Machine
  ('tg_biceps_machine','biceps_brachii','primary'),
  ('tg_biceps_machine','brachialis','secondary'),
  -- Triceps Press
  ('tg_triceps_press','triceps_brachii','primary'),
  -- Triceps Pushdown
  ('tg_triceps_pushdown','triceps_brachii','primary'),
  -- Leg Press
  ('tg_leg_press','rectus_femoris','primary'),
  ('tg_leg_press','vastus_lateralis','primary'),
  ('tg_leg_press','vastus_medialis','primary'),
  ('tg_leg_press','vastus_intermedius','primary'),
  ('tg_leg_press','gluteus_maximus','secondary'),
  ('tg_leg_press','biceps_femoris','secondary'),
  ('tg_leg_press','adductor_longus','secondary'),
  -- Hack Squat
  ('tg_hack_squat','rectus_femoris','primary'),
  ('tg_hack_squat','vastus_lateralis','primary'),
  ('tg_hack_squat','vastus_medialis','primary'),
  ('tg_hack_squat','gluteus_maximus','primary'),
  ('tg_hack_squat','erector_spinae','stabilizer'),
  -- Leg Extension
  ('tg_leg_extension','rectus_femoris','primary'),
  ('tg_leg_extension','vastus_lateralis','primary'),
  ('tg_leg_extension','vastus_medialis','primary'),
  ('tg_leg_extension','vastus_intermedius','primary'),
  -- Leg Curl lying
  ('tg_leg_curl_lying','biceps_femoris','primary'),
  ('tg_leg_curl_lying','semitendinosus','primary'),
  ('tg_leg_curl_lying','semimembranosus','primary'),
  ('tg_leg_curl_lying','gastrocnemius','secondary'),
  -- Leg Curl seated
  ('tg_leg_curl_seated','biceps_femoris','primary'),
  ('tg_leg_curl_seated','semitendinosus','primary'),
  ('tg_leg_curl_seated','semimembranosus','primary'),
  -- Abductor
  ('tg_abductor','gluteus_medius','primary'),
  ('tg_abductor','gluteus_maximus','secondary'),
  -- Adductor
  ('tg_adductor','adductor_longus','primary'),
  -- Glute
  ('tg_glute','gluteus_maximus','primary'),
  ('tg_glute','biceps_femoris','secondary'),
  -- Glute Drive (Hip Thrust)
  ('tg_glute_drive','gluteus_maximus','primary'),
  ('tg_glute_drive','biceps_femoris','secondary'),
  ('tg_glute_drive','semitendinosus','secondary'),
  -- Multi Hip
  ('tg_multi_hip','gluteus_maximus','primary'),
  ('tg_multi_hip','gluteus_medius','secondary'),
  ('tg_multi_hip','iliopsoas','secondary'),
  -- Calf standing
  ('tg_calf_standing','gastrocnemius','primary'),
  ('tg_calf_standing','soleus','secondary'),
  -- Calf seated
  ('tg_calf_seated','soleus','primary'),
  ('tg_calf_seated','gastrocnemius','secondary'),
  -- Ab Crunch
  ('tg_ab_crunch','rectus_abdominis','primary'),
  ('tg_ab_crunch','obliquus_externus','secondary'),
  -- Rotary Torso
  ('tg_rotary_torso','obliquus_externus','primary'),
  ('tg_rotary_torso','obliquus_internus','primary'),
  ('tg_rotary_torso','rectus_abdominis','secondary'),
  -- Smith Bench Press
  ('tg_smith_bench_press','pectoralis_major','primary'),
  ('tg_smith_bench_press','triceps_brachii','secondary'),
  ('tg_smith_bench_press','deltoideus_anterior','secondary'),
  -- Smith Squat
  ('tg_smith_squat','rectus_femoris','primary'),
  ('tg_smith_squat','vastus_lateralis','primary'),
  ('tg_smith_squat','vastus_medialis','primary'),
  ('tg_smith_squat','gluteus_maximus','primary'),
  ('tg_smith_squat','erector_spinae','secondary'),
  ('tg_smith_squat','biceps_femoris','secondary'),
  -- Smith Deadlift
  ('tg_smith_deadlift','erector_spinae','primary'),
  ('tg_smith_deadlift','gluteus_maximus','primary'),
  ('tg_smith_deadlift','biceps_femoris','primary'),
  ('tg_smith_deadlift','semitendinosus','primary'),
  ('tg_smith_deadlift','trapezius_middle','secondary'),
  ('tg_smith_deadlift','latissimus_dorsi','secondary'),
  ('tg_smith_deadlift','flexor_carpi','stabilizer'),
  -- Treadmill Run
  ('tg_treadmill_run','rectus_femoris','primary'),
  ('tg_treadmill_run','biceps_femoris','primary'),
  ('tg_treadmill_run','gastrocnemius','primary'),
  ('tg_treadmill_run','soleus','primary'),
  ('tg_treadmill_run','gluteus_maximus','secondary'),
  ('tg_treadmill_run','tibialis_anterior','secondary'),
  -- Treadmill Walk
  ('tg_treadmill_walk','gastrocnemius','primary'),
  ('tg_treadmill_walk','soleus','primary'),
  ('tg_treadmill_walk','rectus_femoris','secondary'),
  ('tg_treadmill_walk','biceps_femoris','secondary'),
  -- Bikes
  ('tg_recline_bike','rectus_femoris','primary'),
  ('tg_recline_bike','vastus_lateralis','primary'),
  ('tg_recline_bike','gluteus_maximus','secondary'),
  ('tg_recline_bike','gastrocnemius','secondary'),
  ('tg_upright_bike','rectus_femoris','primary'),
  ('tg_upright_bike','vastus_lateralis','primary'),
  ('tg_upright_bike','gluteus_maximus','secondary'),
  ('tg_upright_bike','gastrocnemius','secondary'),
  -- Elliptical / Synchro
  ('tg_synchro_elliptical','rectus_femoris','primary'),
  ('tg_synchro_elliptical','biceps_femoris','primary'),
  ('tg_synchro_elliptical','gluteus_maximus','secondary'),
  ('tg_synchro_elliptical','gastrocnemius','secondary'),
  ('tg_synchro_elliptical','pectoralis_major','secondary'),
  ('tg_synchro_elliptical','latissimus_dorsi','secondary'),
  ('tg_synchro_elliptical','deltoideus_anterior','secondary'),
  -- Skillrow
  ('tg_skillrow','latissimus_dorsi','primary'),
  ('tg_skillrow','rhomboideus','primary'),
  ('tg_skillrow','biceps_femoris','primary'),
  ('tg_skillrow','rectus_femoris','primary'),
  ('tg_skillrow','gluteus_maximus','primary'),
  ('tg_skillrow','erector_spinae','secondary'),
  ('tg_skillrow','biceps_brachii','secondary'),
  ('tg_skillrow','trapezius_middle','secondary'),
  -- Climb
  ('tg_climb','gluteus_maximus','primary'),
  ('tg_climb','rectus_femoris','primary'),
  ('tg_climb','biceps_femoris','primary'),
  ('tg_climb','gastrocnemius','secondary'),
  ('tg_climb','soleus','secondary'),
  -- Skillmill
  ('tg_skillmill','rectus_femoris','primary'),
  ('tg_skillmill','biceps_femoris','primary'),
  ('tg_skillmill','gluteus_maximus','primary'),
  ('tg_skillmill','gastrocnemius','primary'),
  -- Wave
  ('tg_wave','gluteus_medius','primary'),
  ('tg_wave','gluteus_maximus','primary'),
  ('tg_wave','adductor_longus','secondary'),
  -- Arc Trainer
  ('tg_arc_trainer','rectus_femoris','primary'),
  ('tg_arc_trainer','gluteus_maximus','primary'),
  ('tg_arc_trainer','biceps_femoris','secondary'),
  ('tg_arc_trainer','gastrocnemius','secondary')
) AS m(e, m, inv)
ON CONFLICT (exercise_id, muscle_id) DO NOTHING;
