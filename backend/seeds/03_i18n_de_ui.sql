-- Deutsche UI-Texte
INSERT INTO i18n (key, locale, value) VALUES
-- Navigation
('nav.home',           'de', 'Start'),
('nav.workout',        'de', 'Training'),
('nav.stats',          'de', 'Statistik'),
('nav.knowledge',      'de', 'Wissen'),
('nav.settings',       'de', 'Einstellungen'),
('nav.plans',          'de', 'Trainingspläne'),
('nav.logout',         'de', 'Abmelden'),

-- Auth
('auth.login',         'de', 'Anmelden'),
('auth.register',      'de', 'Registrieren'),
('auth.email',         'de', 'E-Mail'),
('auth.password',      'de', 'Passwort'),
('auth.display_name',  'de', 'Anzeigename'),
('auth.weight',        'de', 'Gewicht (kg)'),
('auth.height',        'de', 'Größe (cm)'),
('auth.birth_year',    'de', 'Geburtsjahr'),
('auth.sex',           'de', 'Geschlecht'),
('auth.sex.m',         'de', 'männlich'),
('auth.sex.f',         'de', 'weiblich'),
('auth.sex.d',         'de', 'divers'),
('auth.body_fat',      'de', 'Körperfett (%)'),
('auth.muscle_pct',    'de', 'Muskelanteil (%)'),
('auth.body_fat_hint', 'de', 'optional – sonst Referenzwerte für Untrainierte'),
('auth.no_account',    'de', 'Noch kein Konto?'),
('auth.have_account',  'de', 'Bereits ein Konto?'),

-- Home / Muskelkarte
('home.title',         'de', 'Dein Körper'),
('home.front',         'de', 'Vorderseite'),
('home.back',          'de', 'Rückseite'),
('home.recovery_state','de', 'Regenerationsstatus'),
('home.fresh',         'de', 'erholt'),
('home.recovering',    'de', 'in Regeneration'),
('home.fatigued',      'de', 'stark belastet'),
('home.suggest',       'de', 'Vorschlag: nächste Übung'),
('home.start_workout', 'de', 'Training starten'),
('home.specialize',    'de', 'Spezial-Training für {muscle}'),
('home.specialize.cta','de', 'Übungen für {muscle} zeigen'),
('home.muscle_click_hint','de','Tipp: Tippe einen Muskel an, um gezielt Übungen dafür zu sehen.'),
('home.end_workout',   'de', 'Training beenden'),
('home.active_workout','de', 'Laufendes Training'),

-- Workout
('workout.add_set',    'de', 'Satz hinzufügen'),
('workout.exercise',   'de', 'Übung'),
('workout.sets',       'de', 'Sätze'),
('workout.reps',       'de', 'Wiederholungen'),
('workout.weight',     'de', 'Gewicht (kg)'),
('workout.duration',   'de', 'Dauer (min)'),
('workout.distance',   'de', 'Strecke (m)'),
('workout.rpe',        'de', 'Anstrengung (1–10)'),
('workout.kcal',       'de', 'verbrannte kcal'),
('workout.summary',    'de', 'Trainingszusammenfassung'),
('workout.total_kcal', 'de', 'Gesamt-kcal'),
('workout.recovered_at','de','Erholung voraussichtlich bis'),
('workout.no_active',  'de', 'Kein aktives Training. Tippe auf „Training starten"'),
('workout.search_exercise','de', 'Übung suchen oder (Muskel)…'),
('workout.muscle_filter',  'de', 'Muskelfilter aktiv:'),
('workout.muscle_filter_clear','de','Filter aufheben'),
('workout.sorted_by_eff',  'de', 'sortiert nach Effektivität'),
('involvement.primary.short',   'de','primär'),
('involvement.secondary.short', 'de','sekundär'),
('involvement.stabilizer.short','de','stabilisierend'),

-- Stats
('stats.title',        'de', 'Statistik'),
('stats.last_7d',      'de', 'Letzte 7 Tage'),
('stats.last_30d',     'de', 'Letzte 30 Tage'),
('stats.workouts',     'de', 'Trainings'),
('stats.total_volume', 'de', 'Gesamtvolumen'),
('stats.total_kcal',   'de', 'Verbrannte kcal'),
('stats.neglected',    'de', 'Vernachlässigte Muskulatur'),
('stats.neglected_hint','de','Diese Muskelgruppen wurden in den letzten 14 Tagen nicht trainiert. Antagonistisches Training ist wichtig, um muskuläre Dysbalancen zu vermeiden.'),
('stats.overtrained',  'de', 'Mehrfachbelastung'),
('stats.overtrained_hint','de','Diese Muskeln wurden mehrfach in kurzer Zeit belastet – plane ausreichend Regeneration.'),

-- Knowledge categories
('knowledge.title',          'de', 'Sportmedizinisches Wissen'),
('knowledge.cat.metabolism', 'de', 'Stoffwechsel & Energiesysteme'),
('knowledge.cat.recovery',   'de', 'Regeneration & Anpassung'),
('knowledge.cat.basics',     'de', 'Grundlagen Krafttraining'),

-- Settings
('settings.title',        'de', 'Einstellungen'),
('settings.profile',      'de', 'Profil'),
('settings.profile.edit', 'de', 'Profil bearbeiten'),
('settings.profile.saved','de', 'Gespeichert'),
('settings.composition_defaults','de','Standardwerte für Untrainierte werden verwendet, wenn leer gelassen'),
('settings.packages',     'de', 'Geräte-Pakete'),
('settings.installed',    'de', 'installiert'),
('settings.install',      'de', 'installieren'),
('settings.uninstall',    'de', 'deinstallieren'),
('settings.custom_exercises','de','Eigene Übungen'),
('settings.add_custom',   'de', 'Eigene Übung anlegen'),
('settings.language',     'de', 'Sprache'),

-- Knowledge Navigation
('knowledge.prev',  'de', 'vorheriger'),
('knowledge.next',  'de', 'nächster'),

-- Common
('common.save',     'de', 'Speichern'),
('common.cancel',   'de', 'Abbrechen'),
('common.delete',   'de', 'Löschen'),
('common.edit',     'de', 'Bearbeiten'),
('common.add',      'de', 'Hinzufügen'),
('common.back',     'de', 'Zurück'),
('common.loading',  'de', 'Lädt…'),
('common.error',    'de', 'Fehler'),

-- Involvement
('involvement.primary',    'de', 'Hauptmuskel'),
('involvement.secondary',  'de', 'unterstützend'),
('involvement.stabilizer', 'de', 'Stabilisator')

ON CONFLICT (key, locale) DO UPDATE SET value = EXCLUDED.value;
