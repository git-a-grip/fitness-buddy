-- =====================================================================
-- English language pack
-- Mirrors every key from the German seeds.
-- File prefix 10_ ensures this runs after all DE seeds (alphabetical).
-- =====================================================================

-- ---------------------------------------------------------------------
-- Muscles
-- ---------------------------------------------------------------------
INSERT INTO i18n (key, locale, value) VALUES
('muscle.pectoralis_major',      'en', 'Pectoralis major (chest)'),
('muscle.pectoralis_minor',      'en', 'Pectoralis minor'),
('muscle.serratus_anterior',     'en', 'Serratus anterior'),
('muscle.deltoideus_anterior',   'en', 'Anterior deltoid'),
('muscle.deltoideus_lateralis',  'en', 'Lateral deltoid'),
('muscle.deltoideus_posterior',  'en', 'Posterior deltoid'),
('muscle.supraspinatus',         'en', 'Supraspinatus'),
('muscle.infraspinatus',         'en', 'Infraspinatus'),
('muscle.teres_minor',           'en', 'Teres minor'),
('muscle.teres_major',           'en', 'Teres major'),
('muscle.biceps_brachii',        'en', 'Biceps brachii'),
('muscle.brachialis',            'en', 'Brachialis'),
('muscle.brachioradialis',       'en', 'Brachioradialis'),
('muscle.triceps_brachii',       'en', 'Triceps brachii'),
('muscle.flexor_carpi',          'en', 'Wrist flexors'),
('muscle.extensor_carpi',        'en', 'Wrist extensors'),
('muscle.trapezius_upper',       'en', 'Upper trapezius'),
('muscle.trapezius_middle',      'en', 'Middle trapezius'),
('muscle.trapezius_lower',       'en', 'Lower trapezius'),
('muscle.latissimus_dorsi',      'en', 'Latissimus dorsi'),
('muscle.rhomboideus',           'en', 'Rhomboids'),
('muscle.erector_spinae',        'en', 'Erector spinae'),
('muscle.rectus_abdominis',      'en', 'Rectus abdominis (abs)'),
('muscle.obliquus_externus',     'en', 'External obliques'),
('muscle.obliquus_internus',     'en', 'Internal obliques'),
('muscle.transversus_abdominis', 'en', 'Transverse abdominis'),
('muscle.gluteus_maximus',       'en', 'Gluteus maximus'),
('muscle.gluteus_medius',        'en', 'Gluteus medius'),
('muscle.iliopsoas',             'en', 'Hip flexors (iliopsoas)'),
('muscle.rectus_femoris',        'en', 'Rectus femoris'),
('muscle.vastus_lateralis',      'en', 'Vastus lateralis'),
('muscle.vastus_medialis',       'en', 'Vastus medialis'),
('muscle.vastus_intermedius',    'en', 'Vastus intermedius'),
('muscle.sartorius',             'en', 'Sartorius'),
('muscle.adductor_longus',       'en', 'Adductors'),
('muscle.biceps_femoris',        'en', 'Biceps femoris (hamstring)'),
('muscle.semitendinosus',        'en', 'Semitendinosus'),
('muscle.semimembranosus',       'en', 'Semimembranosus'),
('muscle.gastrocnemius',         'en', 'Gastrocnemius (calf)'),
('muscle.soleus',                'en', 'Soleus'),
('muscle.tibialis_anterior',     'en', 'Tibialis anterior (shin)')
ON CONFLICT (key, locale) DO UPDATE SET value = EXCLUDED.value;

-- ---------------------------------------------------------------------
-- UI strings
-- ---------------------------------------------------------------------
INSERT INTO i18n (key, locale, value) VALUES
-- Navigation
('nav.home',           'en', 'Home'),
('nav.workout',        'en', 'Workout'),
('nav.stats',          'en', 'Stats'),
('nav.knowledge',      'en', 'Knowledge'),
('nav.settings',       'en', 'Settings'),
('nav.plans',          'en', 'Training plans'),
('nav.logout',         'en', 'Log out'),

-- Auth
('auth.login',         'en', 'Log in'),
('auth.register',      'en', 'Sign up'),
('auth.email',         'en', 'Email'),
('auth.password',      'en', 'Password'),
('auth.display_name',  'en', 'Display name'),
('auth.weight',        'en', 'Weight (kg)'),
('auth.height',        'en', 'Height (cm)'),
('auth.birth_year',    'en', 'Year of birth'),
('auth.sex',           'en', 'Sex'),
('auth.sex.m',         'en', 'male'),
('auth.sex.f',         'en', 'female'),
('auth.sex.d',         'en', 'other'),
('auth.body_fat',      'en', 'Body fat (%)'),
('auth.muscle_pct',    'en', 'Muscle mass (%)'),
('auth.body_fat_hint', 'en', 'optional – defaults to untrained reference values'),
('auth.no_account',    'en', 'No account yet?'),
('auth.have_account',  'en', 'Already have an account?'),

-- Home / Muscle map
('home.title',         'en', 'Your body'),
('home.front',         'en', 'Front'),
('home.back',          'en', 'Back'),
('home.recovery_state','en', 'Recovery status'),
('home.fresh',         'en', 'fresh'),
('home.recovering',    'en', 'recovering'),
('home.fatigued',      'en', 'fatigued'),
('home.suggest',       'en', 'Suggested next exercises'),
('home.start_workout', 'en', 'Start workout'),
('home.end_workout',   'en', 'end'),
('home.active_workout','en', 'Active workout'),
('home.specialize',    'en', 'Targeted training for {muscle}'),
('home.specialize.cta','en', 'Show exercises for {muscle}'),
('home.muscle_click_hint','en','Tip: tap a muscle to see targeted exercises for it.'),

-- Workout
('workout.add_set',    'en', 'Add set'),
('workout.exercise',   'en', 'Exercise'),
('workout.sets',       'en', 'Sets'),
('workout.reps',       'en', 'Reps'),
('workout.weight',     'en', 'Weight (kg)'),
('workout.duration',   'en', 'Duration (min)'),
('workout.distance',   'en', 'Distance (m)'),
('workout.rpe',        'en', 'Effort (RPE 1–10)'),
('workout.kcal',       'en', 'calories burned'),
('workout.summary',    'en', 'Workout summary'),
('workout.total_kcal', 'en', 'Total calories'),
('workout.recovered_at','en','Estimated recovery by'),
('workout.no_active',  'en', 'No active workout. Tap "Start workout".'),
('workout.search_exercise','en','Search exercise or (muscle)…'),
('workout.muscle_filter',  'en', 'Muscle filter:'),
('workout.muscle_filter_clear','en','Clear filter'),
('workout.sorted_by_eff',  'en', 'sorted by effectiveness'),
('involvement.primary.short',   'en','primary'),
('involvement.secondary.short', 'en','secondary'),
('involvement.stabilizer.short','en','stabilizer'),

-- Stats
('stats.title',        'en', 'Statistics'),
('stats.last_7d',      'en', 'Last 7 days'),
('stats.last_30d',     'en', 'Last 30 days'),
('stats.workouts',     'en', 'Workouts'),
('stats.total_volume', 'en', 'Total volume'),
('stats.total_kcal',   'en', 'Calories burned'),
('stats.neglected',    'en', 'Neglected muscles'),
('stats.neglected_hint','en','These muscle groups have not been trained in the last 14 days. Training antagonists is important to avoid muscular imbalances.'),
('stats.overtrained',  'en', 'Repeated load'),
('stats.overtrained_hint','en','These muscles have been loaded multiple times in a short window – plan enough recovery.'),

-- Knowledge categories
('knowledge.title',          'en', 'Sports medicine reference'),
('knowledge.cat.metabolism', 'en', 'Metabolism & energy systems'),
('knowledge.cat.recovery',   'en', 'Recovery & adaptation'),
('knowledge.cat.basics',     'en', 'Strength training basics'),
('knowledge.prev',           'en', 'previous'),
('knowledge.next',           'en', 'next'),

-- Settings
('settings.title',        'en', 'Settings'),
('settings.profile',      'en', 'Profile'),
('settings.profile.edit', 'en', 'Edit profile'),
('settings.profile.saved','en', 'Saved'),
('settings.composition_defaults','en','Untrained reference values are used when fields are left empty.'),
('settings.packages',     'en', 'Equipment packages'),
('settings.installed',    'en', 'installed'),
('settings.install',      'en', 'install'),
('settings.uninstall',    'en', 'uninstall'),
('settings.custom_exercises','en','Custom exercises'),
('settings.add_custom',   'en', 'Add custom exercise'),
('settings.language',     'en', 'Language'),

-- Common
('common.save',     'en', 'Save'),
('common.cancel',   'en', 'Cancel'),
('common.delete',   'en', 'Delete'),
('common.edit',     'en', 'Edit'),
('common.add',      'en', 'Add'),
('common.back',     'en', 'Back'),
('common.loading',  'en', 'Loading…'),
('common.error',    'en', 'Error'),

-- Involvement
('involvement.primary',    'en', 'primary mover'),
('involvement.secondary',  'en', 'assisting'),
('involvement.stabilizer', 'en', 'stabilizer')
ON CONFLICT (key, locale) DO UPDATE SET value = EXCLUDED.value;

-- ---------------------------------------------------------------------
-- Packages
-- ---------------------------------------------------------------------
INSERT INTO i18n (key, locale, value) VALUES
('package.technogym_selection_excite', 'en', 'Technogym Selection & Excite'),
('package.cardio_free',                'en', 'Cardio & Free workouts')
ON CONFLICT (key, locale) DO UPDATE SET value = EXCLUDED.value;

-- ---------------------------------------------------------------------
-- Technogym exercises
-- ---------------------------------------------------------------------
INSERT INTO i18n (key, locale, value) VALUES
('exercise.tg_chest_press',         'en', 'Chest Press'),
('exercise.tg_incline_chest_press', 'en', 'Incline Chest Press (machine)'),
('exercise.tg_decline_chest_press', 'en', 'Decline Chest Press (machine)'),
('exercise.tg_pectoral_machine',    'en', 'Pec Deck (butterfly)'),
('exercise.tg_cable_crossover',     'en', 'Cable Crossover'),
('exercise.tg_lat_machine',         'en', 'Wide Lat Pulldown'),
('exercise.tg_vertical_traction',   'en', 'Close-Grip Vertical Traction'),
('exercise.tg_pulldown',            'en', 'Pulldown'),
('exercise.tg_low_row',             'en', 'Low Row'),
('exercise.tg_mid_row',             'en', 'Mid Row'),
('exercise.tg_assisted_pullup',     'en', 'Assisted Pull-Up'),
('exercise.tg_lower_back',          'en', 'Lower Back'),
('exercise.tg_back_extension',      'en', 'Back Extension'),
('exercise.tg_reverse_pec_deck',    'en', 'Reverse Pec Deck'),
('exercise.tg_shoulder_press',      'en', 'Shoulder Press'),
('exercise.tg_lateral_raise',       'en', 'Lateral Raise (machine)'),
('exercise.tg_shrug',               'en', 'Shrug'),
('exercise.tg_arm_curl',            'en', 'Biceps Curl Machine'),
('exercise.tg_arm_extension',       'en', 'Triceps Extension'),
('exercise.tg_biceps_machine',      'en', 'Biceps Machine (Scott)'),
('exercise.tg_triceps_press',       'en', 'Triceps Press'),
('exercise.tg_triceps_pushdown',    'en', 'Triceps Pushdown (cable)'),
('exercise.tg_leg_press',           'en', 'Leg Press'),
('exercise.tg_hack_squat',          'en', 'Hack Squat'),
('exercise.tg_leg_extension',       'en', 'Leg Extension'),
('exercise.tg_leg_curl_lying',      'en', 'Lying Leg Curl'),
('exercise.tg_leg_curl_seated',     'en', 'Seated Leg Curl'),
('exercise.tg_abductor',            'en', 'Hip Abductor'),
('exercise.tg_adductor',            'en', 'Hip Adductor'),
('exercise.tg_glute',               'en', 'Glute Machine'),
('exercise.tg_glute_drive',         'en', 'Glute Drive (Hip Thrust)'),
('exercise.tg_multi_hip',           'en', 'Multi-Hip'),
('exercise.tg_calf_standing',       'en', 'Standing Calf Raise'),
('exercise.tg_calf_seated',         'en', 'Seated Calf Raise'),
('exercise.tg_ab_crunch',           'en', 'Ab Crunch Machine'),
('exercise.tg_rotary_torso',        'en', 'Rotary Torso'),
('exercise.tg_smith_bench_press',   'en', 'Smith Bench Press'),
('exercise.tg_smith_squat',         'en', 'Smith Squat'),
('exercise.tg_smith_deadlift',      'en', 'Smith Deadlift'),
('exercise.tg_treadmill_run',       'en', 'Treadmill Running'),
('exercise.tg_treadmill_walk',      'en', 'Treadmill Walking'),
('exercise.tg_recline_bike',        'en', 'Recumbent Bike'),
('exercise.tg_upright_bike',        'en', 'Upright Bike'),
('exercise.tg_synchro_elliptical',  'en', 'Synchro Elliptical'),
('exercise.tg_skillrow',            'en', 'Rower (Skillrow)'),
('exercise.tg_climb',               'en', 'Stair Climber'),
('exercise.tg_skillmill',           'en', 'Skillmill (curved treadmill)'),
('exercise.tg_wave',                'en', 'Wave Trainer'),
('exercise.tg_arc_trainer',         'en', 'Arc Trainer')
ON CONFLICT (key, locale) DO UPDATE SET value = EXCLUDED.value;

-- ---------------------------------------------------------------------
-- Cardio & Free exercises
-- ---------------------------------------------------------------------
INSERT INTO i18n (key, locale, value) VALUES
('exercise.cf_running_outdoor',  'en', 'Outdoor Running'),
('exercise.cf_cycling_outdoor',  'en', 'Outdoor Cycling'),
('exercise.cf_swimming',         'en', 'Swimming'),
('exercise.cf_jump_rope',        'en', 'Jump Rope'),
('exercise.cf_burpees',          'en', 'Burpees'),
('exercise.cf_jumping_jacks',    'en', 'Jumping Jacks'),
('exercise.cf_pushup',           'en', 'Push-Up'),
('exercise.cf_pullup',           'en', 'Pull-Up'),
('exercise.cf_dip',              'en', 'Dip'),
('exercise.cf_bodyweight_squat', 'en', 'Bodyweight Squat'),
('exercise.cf_lunge',            'en', 'Lunge'),
('exercise.cf_plank',            'en', 'Plank'),
('exercise.cf_situp',            'en', 'Sit-Up'),
('exercise.cf_kettlebell_swing', 'en', 'Kettlebell Swing'),
('exercise.cf_db_bench_press',   'en', 'Dumbbell Bench Press'),
('exercise.cf_db_row',           'en', 'Dumbbell Row'),
('exercise.cf_db_curl',          'en', 'Dumbbell Curl'),
('exercise.cf_barbell_squat',    'en', 'Barbell Back Squat'),
('exercise.cf_barbell_deadlift', 'en', 'Barbell Deadlift'),
('exercise.cf_overhead_press',   'en', 'Overhead Press (barbell)'),
('exercise.cf_stretching',       'en', 'Stretching')
ON CONFLICT (key, locale) DO UPDATE SET value = EXCLUDED.value;

-- ---------------------------------------------------------------------
-- Knowledge articles (titles + bodies)
-- ---------------------------------------------------------------------
INSERT INTO i18n (key, locale, value) VALUES
('kn.atp.title', 'en', 'The ATP cycle – cellular energy currency'),
('kn.atp.body',  'en',
'Adenosine triphosphate (ATP) is the universal energy currency of every muscle cell. During muscle contraction, ATP is split into ADP (adenosine diphosphate) and a free phosphate group. This releases about **30.5 kJ/mol** – exactly the energy the actin-myosin filaments need to shorten.

[[svg:atp_cycle]]

Since the muscle cell only stores enough ATP for roughly **2–3 seconds** of maximum effort, it must be constantly resynthesized. Three systems handle this, blending into each other based on intensity and duration.

**In short:**
- ATP → ADP + P + energy (used for muscle work)
- ADP + P → ATP (rebuilt from creatine phosphate, glucose, or fatty acids)
- An athlete cycles **70–100 kg** of ATP through this loop every day.'),

('kn.energy.title', 'en', 'The three energy systems'),
('kn.energy.body',  'en',
'Your body covers its ATP demand through three coordinated systems:

[[svg:energy_systems]]

**1. Phosphagen system (anaerobic alactic) – 0 to 10 seconds**
Creatine phosphate (CP) donates its phosphate directly to ADP. Extremely fast, no oxygen needed, no lactate produced. Powers maximum strength efforts (1RM, sprints, throws). Depleted after roughly 6–10 s.

**2. Anaerobic glycolysis (anaerobic lactic) – 10 seconds to 2 minutes**
Glucose is broken down to pyruvate without oxygen and – when O₂ is lacking – further to **lactate**. Supplies ATP for intense efforts like a 400 m sprint or hypertrophy sets (8–15 reps). Limiting factor: acidosis (protons, not lactate itself).

**3. Aerobic oxidation – from about 90 seconds, indefinitely**
Pyruvate or fatty acids are fully oxidized inside the mitochondria via the **citric acid cycle** and the **electron transport chain**, yielding CO₂ and H₂O. Each glucose molecule produces 30–32 ATP (versus only 2 ATP anaerobically). Slow to ramp up but virtually unlimited in capacity.

**Rule of thumb – ATP yield per glucose molecule:**
- anaerobic glycolysis: 2 ATP
- aerobic oxidation: 30–32 ATP – roughly **15× more efficient**'),

('kn.aeroanaero.title', 'en', 'Aerobic vs. anaerobic – the key difference'),
('kn.aeroanaero.body',  'en',
'"Aerobic" means **with oxygen**, "anaerobic" means **without oxygen**. The transition is gradual and is marked by the **lactate threshold**.

[[svg:aero_anaero]]

**Aerobic (e.g. easy distance running, cycling at 60–75 % HRmax):**
- Main fuel: fatty acids + glucose
- Oxygen supply meets demand
- Blood lactate stays below 2 mmol/L
- Adaptations: capillary density, mitochondrial density, cardiac output
- Goal: aerobic base, fat metabolism, recovery

**Anaerobic (e.g. sprinting, hypertrophy sets, intervals above 85 % HRmax):**
- Main fuel: creatine phosphate + glucose
- Oxygen supply lags – glucose is shunted to lactate
- Blood lactate above 4 mmol/L ("anaerobic threshold")
- Adaptations: maximal strength, power, glycolytic enzymes, buffering capacity
- Goal: strength, hypertrophy, speed

**Why both matter:** An aerobic base speeds recovery between anaerobic sets and deepens sleep. Anaerobic training builds strength and muscle mass – important for endurance athletes too, as protection against injury.'),

('kn.lactate.title', 'en', 'Lactate – a misunderstood metabolite'),
('kn.lactate.body',  'en',
'For decades lactate was treated as a "waste product" responsible for muscle soreness. That view is outdated. Lactate is actually an important **metabolic substrate**:

- The liver converts it back into glucose via the **Cori cycle**.
- The heart and slow-twitch muscle fibers burn lactate directly as fuel.
- Lactate itself is not acidic – the **released H⁺ ions** lower pH and cause the burning sensation.

**Delayed-onset muscle soreness (DOMS)** is not caused by lactate (which is cleared within 30–60 min after exercise) but by **microscopic damage** to the Z-disc following eccentric loading.'),

('kn.epoc.title', 'en', 'EPOC – the afterburn effect'),
('kn.epoc.body',  'en',
'After intense training, oxygen consumption stays elevated – sometimes for up to **24 hours**. This is called **EPOC** (Excess Post-exercise Oxygen Consumption).

[[svg:epoc]]

During this window the body burns extra energy to:
- Refill creatine phosphate and glycogen stores
- Clear lactate via the liver
- Repair muscle proteins
- Maintain elevated body temperature and breathing
- Adjust hormone levels (cortisol, growth hormone)

**Magnitude:** Intense resistance training or HIIT adds roughly **6–15 %** to the workout''s calorie expenditure. Easy aerobic work produces minimal EPOC.

In practice: a hard 45-minute session can burn more total energy across 24 hours than a relaxed 60-minute cardio session.'),

('kn.recovery.title', 'en', 'Muscle recovery – why rest is mandatory'),
('kn.recovery.body',  'en',
'Training **breaks muscle down**. It is rebuilt **only during recovery**, through protein synthesis. The key phases:

[[svg:recovery_curve]]

1. **0–2 h:** ATP and creatine phosphate are restored. Hormones (growth hormone, IGF-1) rise.
2. **2–24 h:** Muscle glycogen is resynthesized (carbohydrate need!). Inflammatory cells tag micro-tears.
3. **24–48 h:** **Myofibrillar protein synthesis** peaks. This is when muscle is built.
4. **48–72 h:** Full structural adaptation (hypertrophy, neural adaptation).

**Recovery half-life by muscle group** (working values from Schoenfeld 2016, Israetel):
- Large groups (quadriceps, glutes, latissimus, chest): **48–72 h**
- Medium groups (shoulders, biceps, triceps, calves, abs): **36–48 h**
- Small groups (forearms, rotator cuff): **24–36 h**

This app uses these values to estimate when a muscle group is ready for full loading again. Re-training a muscle **before recovery is complete** can lead to overtraining and performance loss.'),

('kn.protein.title', 'en', 'Protein synthesis and intake'),
('kn.protein.body',  'en',
'Muscle growth is a balance: **muscle protein synthesis (MPS) > muscle protein breakdown (MPB)**. Resistance training elevates MPS for 24–48 h; protein intake triggers it.

**Daily intake (current evidence, Phillips/Schoenfeld 2018):**
- Active adults: 1.2–1.6 g per kg body weight
- Strength athletes in a building phase: 1.6–2.2 g/kg
- During a cut: up to 2.4 g/kg (protects muscle mass)

**Distribution:** 3–5 meals with **20–40 g of high-quality protein** spaced 3–4 h apart maximize MPS – more than 40 g per meal adds little additional synthesis.

**Post-workout shake?** Not strictly necessary, but convenient. The "anabolic window" of 30 minutes is a myth – what matters is the **daily total**. This app logs your shakes so you can monitor distribution.'),

('kn.creatine.title', 'en', 'Creatine – the most studied supplement'),
('kn.creatine.body',  'en',
'Creatine monohydrate is one of the few supplements with **strong, repeatedly replicated evidence**:

- Increases muscle **creatine phosphate stores** by ~20 %.
- Boosts maximal strength and reps by **5–15 %**.
- Supports hypertrophy via increased training volume.
- Possible cognitive effects (attention under sleep deprivation).

**Dosing:** 3–5 g per day, ongoing. A "loading phase" (20 g/day for 5–7 days) is optional and only speeds saturation.

**Safety:** Over 1000 studies, no relevant side effects in healthy adults. The **muscle water retention** (about 1–2 kg) is desirable, not "fat".

**Timing does not matter** – consistency does. This app tracks your intake so you can see how steady your dosing is.'),

('kn.stretch.title', 'en', 'Stretching – when does it help?'),
('kn.stretch.body',  'en',
'**Before training: dynamic warm-up.** Leg swings, arm circles, easy squats. **Static stretching before strength work is counter-productive** – it temporarily reduces maximal strength (Behm 2016).

**After training: light static stretching** (15–30 s per position) to restore range of motion – not to prevent injury. It barely reduces soreness.

**Stand-alone mobility sessions:** 2–3× per week, 10–20 minutes, targeting tight structures (hip flexors, chest, calves for desk workers).

**Recommended end-of-workout routine (5 min):**
1. Doorway chest stretch (2× 20 s per side)
2. Lunging hip flexor stretch (2× 30 s per side)
3. Seated hamstring stretch (2× 20 s per side)
4. Wall latissimus stretch (2× 20 s per side)
5. Step calf stretch (2× 30 s per side)'),

('kn.hyper.title', 'en', 'Mechanisms of hypertrophy'),
('kn.hyper.body',  'en',
'Three primary mechanisms drive muscle growth (Schoenfeld 2010):

1. **Mechanical tension** – heavy loads taken close to failure. The most important stimulus for strength and hypertrophy.
2. **Metabolic stress** – the "pump", lactate accumulation, hormone response. Most prominent with 8–15 reps and short rest.
3. **Muscle damage** – micro-tears, especially in the eccentric phase. Triggers repair and adaptation, but not strictly required.

**Volume guideline per muscle group, per week:**
- Beginner: 10–12 working sets
- Intermediate: 12–20 sets
- Advanced: up to 25 sets (with adequate recovery)

**Rep range:** 5–30 reps all build muscle – proximity to failure (RIR 0–3, "reps in reserve") is the deciding factor.'),

('kn.antagonist.title', 'en', 'Antagonists – why balance matters'),
('kn.antagonist.body',  'en',
'Every muscle has an **antagonist (opposite mover)**:

- Chest ↔ back (latissimus / rhomboids)
- Biceps ↔ triceps
- Quadriceps ↔ hamstrings
- Anterior deltoid ↔ posterior deltoid
- Abs ↔ erector spinae

**Why balance them?**
- Tight chest + weak upper back → rounded shoulders, neck pain.
- Strong quads + weak hamstrings → elevated ACL injury risk.
- Strong abs without erector spinae → disc problems.

This app suggests **antagonist exercises** when one side has been trained disproportionately, and highlights neglected opposites in the statistics.'),

('kn.volume.title', 'en', 'Volume, intensity, and frequency'),
('kn.volume.body',  'en',
'Three knobs of every training plan:

- **Intensity** = load as % of 1RM (or RIR – reps in reserve).
- **Volume** = sets × reps × load.
- **Frequency** = sessions per muscle group per week.

[[svg:volume_intensity]]

**Working ranges:**
- Maximal strength: 1–5 reps, 85–100 % 1RM, 3–5 min rest.
- Hypertrophy: 6–15 reps, 65–85 % 1RM, 1–3 min rest.
- Strength endurance: 15–30 reps, 50–65 % 1RM, 30–60 s rest.

**Frequency:** training a muscle 2× per week is more effective than 1× (Schoenfeld 2016). Based on the recovery half-life, this app estimates the optimal next stimulus.

**Calorie burn (MET-based):**
`kcal = MET × body weight (kg) × duration (h)`
Example: 75 kg, 30 min leg press (MET 6.5) → 6.5 × 75 × 0.5 = **244 kcal**.')
ON CONFLICT (key, locale) DO UPDATE SET value = EXCLUDED.value;

-- ---------------------------------------------------------------------
-- Phase 2 strings (push, calendar, stretching, intakes)
-- ---------------------------------------------------------------------
INSERT INTO i18n (key, locale, value) VALUES
('phase2.next_workout.title',     'en', 'Fitness Buddy – next session'),
('phase2.next_workout.body',      'en', 'Your muscles are recovered – time for the next workout!'),
('phase2.stretch.title',          'en', 'Cooldown – stretching'),
('phase2.stretch.intro',          'en', 'These stretches support your recovery. Hold each position 15–30 seconds, both sides.'),
('phase2.stretch.skip',           'en', 'Skip'),
('phase2.stretch.done',           'en', 'Done'),
('phase2.intake.title',           'en', 'Intakes'),
('phase2.intake.protein_shake',   'en', 'Protein shake'),
('phase2.intake.creatine',        'en', 'Creatine'),
('phase2.intake.water',           'en', 'Water'),
('phase2.intake.add',             'en', 'Log intake'),
('phase2.intake.amount',          'en', 'Amount'),
('phase2.calendar.download',      'en', 'Download next session (.ics)'),
('phase2.push.enable',            'en', 'Enable push notifications'),
('phase2.push.enabled',           'en', 'Notifications enabled'),
('phase2.push.denied',            'en', 'Blocked by browser – please allow notifications in your browser settings.'),
('phase2.recovered_in',           'en', 'Recovered by'),
('phase2.calorie_summary',        'en', 'Burned: {kcal} kcal'),

-- Stretch names
('stretch.chest_doorway',  'en', 'Doorway chest stretch'),
('stretch.hipflexor',      'en', 'Lunging hip flexor stretch'),
('stretch.hamstring_sit',  'en', 'Seated hamstring stretch'),
('stretch.lat_wall',       'en', 'Wall latissimus stretch'),
('stretch.calf_step',      'en', 'Step calf stretch'),
('stretch.quad_standing',  'en', 'Standing quadriceps stretch'),
('stretch.glute_pigeon',   'en', 'Pigeon glute stretch'),
('stretch.tricep_overhead','en', 'Overhead triceps stretch'),
('stretch.shoulder_cross', 'en', 'Cross-body shoulder stretch'),
('stretch.cat_cow',        'en', 'Cat-Cow (spine mobility)')
ON CONFLICT (key, locale) DO UPDATE SET value = EXCLUDED.value;
