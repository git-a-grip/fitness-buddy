-- Wissensseite: sportmedizinische Artikel
-- body_key referenziert i18n; im Frontend wird Markdown gerendert und ggf. SVG eingeblendet (via Marker [[svg:atp]] etc.)

INSERT INTO knowledge_articles (slug, title_key, body_key, category, position) VALUES
('atp_zyklus',           'kn.atp.title',          'kn.atp.body',          'metabolism', 10),
('energiesysteme',       'kn.energy.title',       'kn.energy.body',       'metabolism', 20),
('aerob_anaerob',        'kn.aeroanaero.title',   'kn.aeroanaero.body',   'metabolism', 30),
('laktat',               'kn.lactate.title',      'kn.lactate.body',      'metabolism', 40),
('epoc',                 'kn.epoc.title',         'kn.epoc.body',         'metabolism', 50),
('regeneration',         'kn.recovery.title',     'kn.recovery.body',     'recovery',   10),
('proteinsynthese',      'kn.protein.title',      'kn.protein.body',      'recovery',   20),
('kreatin',              'kn.creatine.title',     'kn.creatine.body',     'recovery',   30),
('dehnen',               'kn.stretch.title',      'kn.stretch.body',      'recovery',   40),
('hypertrophie',         'kn.hyper.title',        'kn.hyper.body',        'basics',     10),
('antagonisten',         'kn.antagonist.title',   'kn.antagonist.body',   'basics',     20),
('volumen_intensitaet',  'kn.volume.title',       'kn.volume.body',       'basics',     30)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO i18n (key, locale, value) VALUES
('kn.atp.title', 'de', 'Der ATP-Zyklus – die Energiewährung der Zelle'),
('kn.atp.body',  'de',
'Adenosintriphosphat (ATP) ist die universelle Energiewährung jeder Muskelzelle. Beim Muskelkontraktion wird ATP zu ADP (Adenosindiphosphat) und einem freien Phosphatrest gespalten. Dabei werden ca. **30,5 kJ/mol** Energie frei – genau diese Energie nutzt das Aktin-Myosin-Filament für die Verkürzung.

[[svg:atp_cycle]]

Da die Muskelzelle nur ATP für etwa **2–3 Sekunden** maximaler Belastung speichert, muss es kontinuierlich resynthetisiert werden. Dafür stehen drei Systeme bereit, die je nach Intensität und Dauer ineinander übergehen.

**Kurz gesagt:**
- ATP → ADP + P + Energie (für Muskelarbeit)
- ADP + P → ATP (Wiederaufbau aus Kreatinphosphat, Glukose oder Fettsäuren)
- Pro Tag schleust ein Sportler **70–100 kg** ATP durch diesen Kreislauf.'),

('kn.energy.title', 'de', 'Die drei Energiesysteme'),
('kn.energy.body',  'de',
'Der Körper deckt seinen ATP-Bedarf über drei aufeinander abgestimmte Systeme:

[[svg:energy_systems]]

**1. Phosphagen-System (anaerob alaktazid) – 0 bis 10 Sekunden**
Kreatinphosphat (KP) gibt sein Phosphat direkt an ADP ab. Sehr schnell, kein Sauerstoff nötig, keine Laktatbildung. Für maximale Kraftleistungen (1RM, Sprint, Wurf). Erschöpft nach ca. 6–10 s.

**2. Anaerobe Glykolyse (anaerob laktazid) – 10 Sekunden bis 2 Minuten**
Glukose wird ohne Sauerstoff zu Pyruvat abgebaut und – wenn O₂ fehlt – zu **Laktat**. Liefert ATP für intensive Belastungen wie 400-m-Lauf, Hypertrophie-Sätze (8–15 WH). Limitierender Faktor: Übersäuerung (Protonen, nicht das Laktat selbst).

**3. Aerobe Oxidation – ab ca. 90 Sekunden, dauerhaft**
Pyruvat oder Fettsäuren werden in den Mitochondrien im **Citratzyklus** und in der **Atmungskette** vollständig zu CO₂ und H₂O oxidiert. Pro Glukose-Molekül entstehen 30–32 ATP (gegenüber nur 2 ATP anaerob). Langsam zu starten, aber praktisch unbegrenzt verfügbar.

**Faustregel zur ATP-Ausbeute pro Glukose:**
- anaerobe Glykolyse: 2 ATP
- aerobe Verbrennung: 30–32 ATP – etwa **15-mal effizienter**'),

('kn.aeroanaero.title', 'de', 'Aerob vs. anaerob – der entscheidende Unterschied'),
('kn.aeroanaero.body',  'de',
'„Aerob" bedeutet **mit Sauerstoff**, „anaerob" **ohne Sauerstoff**. Der Übergang ist fließend und wird durch die **Laktatschwelle** markiert.

[[svg:aero_anaero]]

**Aerob (z.B. lockerer Dauerlauf, Radfahren bei 60–75 % HFmax):**
- Hauptbrennstoff: Fettsäuren + Glukose
- Sauerstoffversorgung deckt den Bedarf
- Laktatspiegel stabil < 2 mmol/L
- Trainiert: Kapillarisierung, Mitochondriendichte, Herzauswurfvolumen
- Trainingsziel: Grundlagenausdauer, Fettstoffwechsel, Erholung

**Anaerob (z.B. Sprint, Hypertrophie-Satz, Intervalle bei > 85 % HFmax):**
- Hauptbrennstoff: Kreatinphosphat + Glukose
- Sauerstoff reicht nicht – Glukose wird zu Laktat
- Laktatspiegel > 4 mmol/L („anaerobe Schwelle")
- Trainiert: Maximalkraft, Schnellkraft, glykolytische Enzyme, Pufferkapazität
- Trainingsziel: Kraft, Hypertrophie, Schnelligkeit

**Warum beides wichtig ist:** Aerobe Basis sorgt für schnellere Regeneration zwischen anaeroben Sätzen und tieferen Schlaf. Anaerobes Training erhöht Kraft und Muskelmasse – auch bei Ausdauersportlern ein Schutz vor Verletzungen.'),

('kn.lactate.title', 'de', 'Laktat – missverstandenes Stoffwechselprodukt'),
('kn.lactate.body',  'de',
'Lange galt Laktat als „Abfallstoff" und Ursache des Muskelkaters. Das ist überholt. Laktat ist ein wichtiges **Stoffwechselsubstrat**:

- Es wird von der Leber per **Cori-Zyklus** wieder zu Glukose umgewandelt.
- Das Herz und langsam zuckende Muskelfasern verbrennen Laktat direkt als Brennstoff.
- Laktat selbst ist nicht sauer – die **freigesetzten H⁺-Ionen** senken den pH und verursachen das Brennen.

**Muskelkater** entsteht nicht durch Laktat (das ist nach 30–60 min abgebaut), sondern durch **mikroskopische Mikroverletzungen** des Z-Streifens nach exzentrischen Belastungen (DOMS – Delayed Onset Muscle Soreness).'),

('kn.epoc.title', 'de', 'EPOC – der Nachbrenneffekt'),
('kn.epoc.body',  'de',
'Nach einem intensiven Training bleibt der Sauerstoffverbrauch erhöht – manchmal **bis zu 24 Stunden**. Das nennt man **EPOC** (Excess Post-exercise Oxygen Consumption).

[[svg:epoc]]

Während dieser Zeit verbrennt der Körper zusätzliche Energie für:
- Auffüllen von Kreatinphosphat und Glykogen
- Abbau von Laktat über die Leber
- Reparatur von Muskelproteinen
- erhöhte Körpertemperatur und Atemarbeit
- hormonelle Anpassungen (Cortisol, Wachstumshormon)

**Größe des Effekts:** Bei intensivem Krafttraining oder HIIT zusätzlich ca. **6–15 % der Trainingskalorien**. Bei lockerem Ausdauertraining ist EPOC gering.

Praktisch bedeutet das: Ein hartes 45-min-Training kann über 24 h mehr Energie verbrennen als 60 min entspannte Cardio-Einheit.'),

('kn.recovery.title', 'de', 'Muskelregeneration – warum Pausen Pflicht sind'),
('kn.recovery.body',  'de',
'Während des Trainings wird die Muskulatur **abgebaut**. Aufgebaut wird sie ausschließlich in der **Erholungsphase** durch Proteinbiosynthese. Die wichtigsten Phasen:

[[svg:recovery_curve]]

1. **0–2 h:** Auffüllen von ATP und Kreatinphosphat. Hormone (Wachstumshormon, IGF-1) steigen an.
2. **2–24 h:** Glykogenresynthese in den Muskeln (Kohlenhydrat-Bedarf!). Mikrorisse werden mit Entzündungszellen markiert.
3. **24–48 h:** Höhepunkt der **Myofibrillen-Proteinsynthese**. Hier baut der Muskel auf.
4. **48–72 h:** Vollständige strukturelle Anpassung (Hypertrophie, neuronale Adaption).

**Halbwertszeit pro Muskelgruppe** (Faustwerte aus Schoenfeld 2016, Israetel):
- Große Gruppen (Quadrizeps, Glutes, Latissimus, Brust): **48–72 h**
- Mittlere Gruppen (Schultern, Bizeps, Trizeps, Waden, Bauch): **36–48 h**
- Kleine Gruppen (Unterarme, Rotatorenmanschette): **24–36 h**

Diese App nutzt diese Werte, um zu berechnen, wann eine Muskelgruppe wieder voll belastbar ist. Erneutes Training **vor abgeschlossener Regeneration** kann zu Übertraining und Leistungseinbruch führen.'),

('kn.protein.title', 'de', 'Proteinsynthese und Eiweißzufuhr'),
('kn.protein.body',  'de',
'Muskelaufbau ist eine Bilanz: **Muskelproteinsynthese (MPS) > Muskelproteinabbau (MPB)**. Krafttraining hebt die MPS für 24–48 h an, Eiweiß-Zufuhr ist der Trigger.

**Tagesbedarf (aktuelle Studienlage, Phillips/Schoenfeld 2018):**
- Erwachsene aktiv: 1,2–1,6 g pro kg Körpergewicht
- Kraftsportler in Aufbauphase: 1,6–2,2 g/kg
- in Diät: bis 2,4 g/kg (Schutz vor Muskelabbau)

**Verteilung:** 3–5 Mahlzeiten mit jeweils **20–40 g hochwertigem Eiweiß** alle 3–4 h. Das maximiert MPS – mehr als 40 g pro Mahlzeit bringt kaum Zusatznutzen für die Synthese.

**Eiweiß-Shake nach dem Training?** Nicht zwingend nötig, aber praktisch. Ein „anaboles Fenster" von nur 30 min ist Mythos – relevant ist die **Tages-Gesamtmenge**. Diese App merkt vor, wann du einen Shake genommen hast, damit du deine Verteilung im Blick behältst.'),

('kn.creatine.title', 'de', 'Kreatin – das am besten untersuchte Supplement'),
('kn.creatine.body',  'de',
'Kreatin-Monohydrat ist eines der wenigen Supplemente mit **starker, vielfach replizierter Evidenz**:

- Erhöht den **Kreatinphosphat-Speicher** im Muskel um ~20 %.
- Steigert Maximalkraft und Wiederholungen um **5–15 %**.
- Begünstigt Hypertrophie über erhöhtes Trainingsvolumen.
- Mögliche kognitive Effekte (Aufmerksamkeit unter Schlafmangel).

**Dosierung:** 3–5 g pro Tag, dauerhaft. „Ladephase" (20 g/Tag für 5–7 Tage) ist optional, beschleunigt nur die Sättigung.

**Sicherheit:** Über 1000 Studien, keine relevanten Nebenwirkungen bei Gesunden. **Wassereinlagerung im Muskel** (ca. 1–2 kg) ist erwünscht, nicht „Fett".

**Einnahmezeitpunkt egal**, Hauptsache regelmäßig. Diese App speichert Einnahmen, um deine Dosierungs-Konstanz zu visualisieren.'),

('kn.stretch.title', 'de', 'Dehnen – wann hilft was?'),
('kn.stretch.body',  'de',
'**Vor dem Training: dynamisches Aufwärmen.** Bein-Pendeln, Armkreisen, leichte Kniebeugen. **Statisches Dehnen vor Krafttraining ist eher kontraproduktiv** – kurzfristig sinkende Maximalkraft (Behm 2016).

**Nach dem Training: leichtes statisches Dehnen** (15–30 s je Position) zur Wiederherstellung der ROM, nicht zur Verletzungsprävention. Es lindert kaum Muskelkater.

**Eigenständige Mobilitätssessions:** 2–3× pro Woche, 10–20 min, gezielt auf verkürzte Strukturen (Hüftbeuger, Brust, Waden bei Sitzenden).

**Empfohlene Routine am Trainingsende (5 min):**
1. Brust-Türrahmen-Dehnung (2× 20 s je Seite)
2. Hüftbeuger-Ausfallschritt (2× 30 s je Seite)
3. Hamstrings im Sitzen (2× 20 s je Seite)
4. Latissimus an der Wand (2× 20 s je Seite)
5. Wade an der Stufe (2× 30 s je Seite)'),

('kn.hyper.title', 'de', 'Mechanismen der Hypertrophie'),
('kn.hyper.body',  'de',
'Drei Hauptmechanismen treiben Muskelwachstum (Schoenfeld 2010):

1. **Mechanische Spannung** – schwere Lasten, nahe Muskelversagen. Wichtigster Reiz für Maximalkraft und Hypertrophie.
2. **Metabolischer Stress** – „Pump", Laktatansammlung, Hormonausschüttung. Effekt bei 8–15 WH mit kurzer Pause.
3. **Muskelschaden** – Mikrorisse, v.a. bei exzentrischen Phasen. Auslöser für Reparatur und Anpassung, aber kein zwingend nötiger Faktor.

**Volumen-Empfehlung pro Muskelgruppe und Woche:**
- Anfänger: 10–12 Arbeitssätze
- Fortgeschritten: 12–20 Sätze
- Fortgeschritten plus: bis 25 Sätze (mit ausreichend Regeneration)

**Wiederholungsbereich:** 5–30 WH bauen alle Muskelmasse – entscheidend ist die **Nähe zum Versagen** (RIR 0–3, „Reps in Reserve").'),

('kn.antagonist.title', 'de', 'Antagonisten – warum Balance entscheidend ist'),
('kn.antagonist.body',  'de',
'Zu jedem Muskel gibt es einen **Gegenspieler (Antagonist)**:

- Brust ↔ Rücken (Latissimus / Rhomboideus)
- Bizeps ↔ Trizeps
- Quadrizeps ↔ Hamstrings
- Vorderer Deltoideus ↔ Hinterer Deltoideus
- Bauch ↔ Rückenstrecker

**Warum balancieren?**
- Verkürzte Brust + schwacher Rücken → vorgezogene Schultern, Nackenschmerzen.
- Starker Quadrizeps + schwache Hamstrings → erhöhtes Kreuzbandrisiko.
- Bei Bauchübergewicht ohne Rückenstrecker → Bandscheibenprobleme.

Diese App schlägt **Antagonisten-Übungen** vor, sobald eine Seite überdurchschnittlich oft trainiert wurde – und markiert vernachlässigte Gegenspieler in der Statistik.'),

('kn.volume.title', 'de', 'Volumen, Intensität und Frequenz'),
('kn.volume.body',  'de',
'Drei Stellschrauben jedes Trainings:

- **Intensität** = Last in % des 1RM (oder RIR – Reps in Reserve).
- **Volumen** = Sätze × Wiederholungen × Last.
- **Frequenz** = Trainings pro Muskelgruppe / Woche.

[[svg:volume_intensity]]

**Faustregeln:**
- Maximalkraft: 1–5 WH, 85–100 % 1RM, 3–5 min Pause.
- Hypertrophie: 6–15 WH, 65–85 % 1RM, 1–3 min Pause.
- Kraftausdauer: 15–30 WH, 50–65 % 1RM, 30–60 s Pause.

**Frequenz:** 2× pro Woche pro Muskelgruppe ist effektiver als 1× (Schoenfeld 2016). Diese App rechnet anhand der Halbwertszeit aus, wann der nächste Reiz sinnvoll ist.

**Kalorienverbrauch (MET-basiert):**
`kcal = MET × Körpergewicht (kg) × Dauer (h)`
Beispiel: 75 kg, 30 min Beinpresse (MET 6,5) → 6,5 × 75 × 0,5 = **244 kcal**.')
ON CONFLICT (key, locale) DO UPDATE SET value = EXCLUDED.value;
