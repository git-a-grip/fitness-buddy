-- Anatomischer Muskelkatalog
-- base_half_life_h: sportmedizinisch motiviert
--   Große Muskeln (Quads, Glutes, Lats, Pecs): 60–72 h (Schoenfeld 2016; Israetel/RP)
--   Mittlere (Delts, Traps, Biceps, Triceps, Calves, Abs): 36–48 h
--   Kleine/Stabilisatoren: 24–36 h
-- Quellen: Schoenfeld BJ (2016) Strength & Conditioning Journal; ACSM Position Stand 2009.

INSERT INTO muscles (slug, name_la, name_key, region, side, size_class, base_half_life_h, antagonist_slug) VALUES
-- Brust
('pectoralis_major',      'Musculus pectoralis major',      'muscle.pectoralis_major',      'chest',    'front', 'large',  60.0, 'latissimus_dorsi'),
('pectoralis_minor',      'Musculus pectoralis minor',      'muscle.pectoralis_minor',      'chest',    'front', 'small',  42.0, NULL),
('serratus_anterior',     'Musculus serratus anterior',     'muscle.serratus_anterior',     'chest',    'front', 'small',  36.0, NULL),
-- Schulter
('deltoideus_anterior',   'Musculus deltoideus (pars clavicularis)','muscle.deltoideus_anterior',   'shoulder','front', 'medium', 36.0, 'deltoideus_posterior'),
('deltoideus_lateralis',  'Musculus deltoideus (pars acromialis)',  'muscle.deltoideus_lateralis',  'shoulder','both',  'medium', 36.0, NULL),
('deltoideus_posterior',  'Musculus deltoideus (pars spinalis)',    'muscle.deltoideus_posterior',  'shoulder','back',  'medium', 36.0, 'deltoideus_anterior'),
('supraspinatus',         'Musculus supraspinatus',         'muscle.supraspinatus',         'shoulder', 'back',  'small',  30.0, NULL),
('infraspinatus',         'Musculus infraspinatus',         'muscle.infraspinatus',         'shoulder', 'back',  'small',  30.0, NULL),
('teres_minor',           'Musculus teres minor',           'muscle.teres_minor',           'shoulder', 'back',  'small',  30.0, NULL),
('teres_major',           'Musculus teres major',           'muscle.teres_major',           'back',     'back',  'small',  36.0, NULL),
-- Arme
('biceps_brachii',        'Musculus biceps brachii',        'muscle.biceps_brachii',        'arm',      'front', 'medium', 36.0, 'triceps_brachii'),
('brachialis',            'Musculus brachialis',            'muscle.brachialis',            'arm',      'front', 'small',  30.0, NULL),
('brachioradialis',       'Musculus brachioradialis',       'muscle.brachioradialis',       'arm',      'front', 'small',  30.0, NULL),
('triceps_brachii',       'Musculus triceps brachii',       'muscle.triceps_brachii',       'arm',      'back',  'medium', 42.0, 'biceps_brachii'),
('flexor_carpi',          'Musculi flexores antebrachii',   'muscle.flexor_carpi',          'arm',      'front', 'small',  24.0, 'extensor_carpi'),
('extensor_carpi',        'Musculi extensores antebrachii', 'muscle.extensor_carpi',        'arm',      'back',  'small',  24.0, 'flexor_carpi'),
-- Rücken
('trapezius_upper',       'Musculus trapezius (pars descendens)',  'muscle.trapezius_upper',  'back', 'back', 'medium', 36.0, NULL),
('trapezius_middle',      'Musculus trapezius (pars transversa)',  'muscle.trapezius_middle', 'back', 'back', 'medium', 42.0, NULL),
('trapezius_lower',       'Musculus trapezius (pars ascendens)',   'muscle.trapezius_lower',  'back', 'back', 'medium', 42.0, NULL),
('latissimus_dorsi',      'Musculus latissimus dorsi',      'muscle.latissimus_dorsi',      'back',     'back',  'large',  60.0, 'pectoralis_major'),
('rhomboideus',           'Musculi rhomboidei',             'muscle.rhomboideus',           'back',     'back',  'medium', 42.0, 'pectoralis_major'),
('erector_spinae',        'Musculi erectores spinae',       'muscle.erector_spinae',        'back',     'back',  'large',  60.0, 'rectus_abdominis'),
-- Core
('rectus_abdominis',      'Musculus rectus abdominis',      'muscle.rectus_abdominis',      'core',     'front', 'medium', 36.0, 'erector_spinae'),
('obliquus_externus',     'Musculus obliquus externus abdominis',  'muscle.obliquus_externus',  'core', 'front', 'medium', 36.0, NULL),
('obliquus_internus',     'Musculus obliquus internus abdominis',  'muscle.obliquus_internus',  'core', 'front', 'small',  36.0, NULL),
('transversus_abdominis', 'Musculus transversus abdominis', 'muscle.transversus_abdominis', 'core',     'front', 'small',  30.0, NULL),
-- Gesäß & Hüfte
('gluteus_maximus',       'Musculus gluteus maximus',       'muscle.gluteus_maximus',       'leg',      'back',  'large',  72.0, 'iliopsoas'),
('gluteus_medius',        'Musculus gluteus medius',        'muscle.gluteus_medius',        'leg',      'back',  'medium', 48.0, NULL),
('iliopsoas',             'Musculus iliopsoas',             'muscle.iliopsoas',             'leg',      'front', 'medium', 42.0, 'gluteus_maximus'),
-- Oberschenkel vorne
('rectus_femoris',        'Musculus rectus femoris',        'muscle.rectus_femoris',        'leg',      'front', 'large',  60.0, 'biceps_femoris'),
('vastus_lateralis',      'Musculus vastus lateralis',      'muscle.vastus_lateralis',      'leg',      'front', 'large',  60.0, NULL),
('vastus_medialis',       'Musculus vastus medialis',       'muscle.vastus_medialis',       'leg',      'front', 'large',  60.0, NULL),
('vastus_intermedius',    'Musculus vastus intermedius',    'muscle.vastus_intermedius',    'leg',      'front', 'large',  60.0, NULL),
('sartorius',             'Musculus sartorius',             'muscle.sartorius',             'leg',      'front', 'small',  36.0, NULL),
('adductor_longus',       'Musculi adductores',             'muscle.adductor_longus',       'leg',      'front', 'medium', 42.0, NULL),
-- Oberschenkel hinten
('biceps_femoris',        'Musculus biceps femoris',        'muscle.biceps_femoris',        'leg',      'back',  'large',  60.0, 'rectus_femoris'),
('semitendinosus',        'Musculus semitendinosus',        'muscle.semitendinosus',        'leg',      'back',  'large',  60.0, NULL),
('semimembranosus',       'Musculus semimembranosus',       'muscle.semimembranosus',       'leg',      'back',  'large',  60.0, NULL),
-- Unterschenkel
('gastrocnemius',         'Musculus gastrocnemius',         'muscle.gastrocnemius',         'leg',      'back',  'medium', 42.0, 'tibialis_anterior'),
('soleus',                'Musculus soleus',                'muscle.soleus',                'leg',      'back',  'medium', 42.0, NULL),
('tibialis_anterior',     'Musculus tibialis anterior',     'muscle.tibialis_anterior',     'leg',      'front', 'small',  30.0, 'gastrocnemius')
ON CONFLICT (slug) DO NOTHING;
