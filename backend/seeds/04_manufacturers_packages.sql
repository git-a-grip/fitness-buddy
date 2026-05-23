INSERT INTO manufacturers (slug, name, is_builtin) VALUES
('technogym', 'Technogym', TRUE),
('generic',   'Generisch', TRUE)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO packages (slug, name_key, manufacturer_id, is_default, is_builtin) VALUES
('technogym_selection_excite',
 'package.technogym_selection_excite',
 (SELECT id FROM manufacturers WHERE slug='technogym'),
 TRUE, TRUE),
('cardio_free',
 'package.cardio_free',
 (SELECT id FROM manufacturers WHERE slug='generic'),
 TRUE, TRUE)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO i18n (key, locale, value) VALUES
('package.technogym_selection_excite', 'de', 'Technogym Selection & Excite'),
('package.cardio_free',                'de', 'Cardio & Free-Workouts')
ON CONFLICT (key, locale) DO UPDATE SET value = EXCLUDED.value;
