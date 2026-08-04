# Übergabe — Haltung-Bereich, Edge-Proxy, OpenRouter-Anbindung

Projekt: fitness-buddy
Repo: /Users/manuelwedemeier/Documents/Claude Projects/fitness-buddy
Remote: git@github.com:git-a-grip/fitness-buddy.git
Stand: 2026-08-04, Branch dev
Code-Stand der Verweise: Commit 698fe0f. `HEAD` ist neuer (25b5490 „docs: Übergabestand"),
enthält aber ausschließlich diese Übergabedatei und keinen Code — die Abweichung ist
erwartet, die Verweise unten bleiben gültig.
+ nicht committete Änderungen in 1 Datei (`frontend/package-lock.json`, untracked — bewusst nicht committet, entstand durch lokales `npm install`)

## Ziel

Fitness Buddy um einen Haltung-/Technik-Bereich erweitern, den Deploy gegen
Ausfallzeiten absichern (Edge-Proxy mit Wartungsseite) und OpenRouter als
KI-Backend für alle Apps nutzbar machen. Erfolg: die drei Commits auf `dev`
laufen auf der NAS und die Haltung-Seite ist in DE/EN/ES bedienbar.

## Stand

**Funktioniert (lokal verifiziert):**
- Haltung-Seite rendert im Mobile-Preview (375×812), alle 5 Karten, Bilder laden,
  6 Tabs passen in eine Zeile, keine Console-Fehler.
- Marketingseite `wu-consulting.com/fitnessbuddy` baut fehlerfrei (`npx astro build`,
  14 Seiten), Umlaute im gerenderten HTML korrekt.
- OpenRouter-Key funktioniert; 7 von 8 Free-Modellen antworten (Details unten).
- Bildgenerierung über `google/gemini-2.5-flash-image` liefert brauchbare Ergebnisse.

**Ungetestet / noch nicht live:**
- Edge-Proxy (Commit a52a9ae) wurde **nie auf der NAS ausgeführt**. Weder der
  `edge`-Container noch die Wartungsseite noch der geänderte `deploy.sh`-Ablauf
  (ohne `docker compose down`) sind real erprobt.
- Haltung-Seite und die posture-i18n-Seeds sind nicht deployed.
- Die neuen Ports/Container-Zuschnitte (`app` ohne Host-Port, `edge` auf `${APP_PORT}`)
  sind nur auf dem Papier geprüft.

**Bekannt unfertig:**
- Die 5 Bilder tragen eingebrannten englischen Text, eines mit Tippfehler
  („HINGHE"). Bewusst so belassen — siehe Entscheidungen.
- `dev` ist nicht nach `main`/`prod` gemerged.

## Relevante Stellen

- `frontend/src/pages/Haltung.jsx` → Konstante `TIPS` + `HaltungPage()` — die 5 Tipps
  mit Bildpfad, i18n-Key und deutschem Inline-Fallback.
- `frontend/src/App.jsx` → `Tabbar()` und die `<Routes>` — Route `/haltung` und der
  6. Tab; hier ansetzen, wenn ein weiterer Bereich dazukommt.
- `frontend/src/styles/global.css` → Regeln `.tabbar` / `.tabbar a` — steht auf
  `repeat(6, 1fr)`; ein 7. Tab erfordert erneut Anpassung von Spalten und Schriftgröße.
- `backend/seeds/12_i18n_posture.sql` — 17 Keys × DE/EN/ES. Erste spanischen Inhalte
  im Projekt überhaupt.
- `edge/nginx.conf` — Proxy auf `app:3000`, `error_page 502 504` → Wartungsseite.
  Der Docker-Resolver (`127.0.0.11`) plus Variable ist nötig, damit nginx startet,
  während `app` unten ist.
- `edge/maintenance.html` — Wartungsseite, Auto-Refresh alle 20 s.
- `deploy.sh` — der `docker compose down`-Aufruf wurde entfernt; genau das hält den
  edge-Container über den Rebuild hinweg oben.
- `docker-compose.yml` → Services `app` und `edge` — `app` hat **keinen** Host-Port
  mehr, `edge` belegt `${APP_PORT}`.
- Marketingseite (**anderes Projekt, ohne Git**):
  `/Users/manuelwedemeier/Documents/Claude Projects/wu-consulting-relaunch/src/pages/fitnessbuddy.astro`

## Entscheidungen

- **Edge-Proxy nach dem Muster der Taschengeld-App** (`edge/` + nginx:alpine) —
  Begründung: gleiche Lösung wie im Referenzprojekt, dadurch ein Muster statt zwei.
  Abweichung: fitness-buddy hat einen einzelnen `app`-Container (API + statisches
  Frontend), daher zeigt der Proxy auf `app:3000` statt auf `frontend:80`.
- **`docker compose down` aus deploy.sh entfernt** — Begründung: mit `down` wäre der
  edge-Container ebenfalls gestoppt und die Wartungsseite nie sichtbar. Das war der
  eigentliche Zweck der Übung.
- **Generierte Bilder mit englischem Text behalten** — Begründung: Nutzerentscheidung
  aus Kostengründen (Neugenerierung hätte nochmals ~20 ct gekostet). Die sauberen
  deutschen Texte stehen darunter in der UI.
- **i18n zweigleisig: DB-Seeds + Inline-Fallbacks im Code** — Begründung: die Seite
  funktioniert auch ohne eingespielte Seeds; `t(key, fallback)` unterstützt das nativ.
  DE-Seed spiegelt die Fallbacks wortgleich, damit Code und DB nicht auseinanderlaufen.
- **`nav.posture` bewusst nicht wörtlich übersetzt** — DE „Haltung", EN „Form",
  ES „Técnica". Begründung: „Posture" wäre im Fitnesskontext irreführend.
- **`frontend/package-lock.json` nicht committet** — Begründung: entstand als
  Nebenprodukt des lokalen `npm install` für den Preview, gehört nicht zum Feature.
  Bewusst offen gelassen, nicht vergessen.
- **Preview-Server als Root-Eintrag mit `--prefix`** in
  `/Users/manuelwedemeier/Documents/Claude Projects/.claude/launch.json`, Port 5180 —
  Begründung: siehe verworfene Ansätze.

## Verworfene Ansätze

### Typografische Anführungszeichen in .astro-Dateien

- **Ansatz:** Deutsche Anführungszeichen `„…"` direkt im Frontmatter-JS von
  `fitnessbuddy.astro` verwenden.
- **Befund:** Build bricht ab — `Expected identifier but found "„"` an der betroffenen
  Zeile (`npx astro build`). esbuild parst das Frontmatter als JavaScript.
- **Status:** ausgeschlossen.
- **Gültigkeitsgrenze:** gilt für JS-Kontext (Frontmatter, Objektliterale). Im
  HTML-Template-Teil der Datei sind die Zeichen unproblematisch.

### HTML-Entities per globalem Suchen-und-Ersetzen

- **Ansatz:** Die typografischen Quotes durch `&bdquo;` / `&ldquo;` ersetzen, per
  `replace_all` über die ganze Datei.
- **Befund:** Zerstört auch die syntaktischen Quotes — der Import wurde zu
  `import BaseLayout from &ldquo;@/layouts/BaseLayout.astro&ldquo;;`, Build:
  `Expected string but found "&"`. Datei musste komplett neu geschrieben werden.
- **Status:** ausgeschlossen.
- **Gültigkeitsgrenze:** gilt für globales Ersetzen von Zeichen, die zugleich Syntax
  sind. Gezieltes Ersetzen einzelner Vorkommen bleibt zulässig.

### Umlaute als ASCII umschreiben

- **Ansatz:** Umlaute im Astro-Frontmatter als `ue`/`oe`/`ae` schreiben, um
  Encoding-Probleme zu umgehen (`Sprachschluessel`, `Uebungs-Logger`).
- **Befund:** Vom Nutzer ausdrücklich zurückgewiesen. Echte UTF-8-Umlaute bauen
  fehlerfrei und erscheinen korrekt im gerenderten HTML (geprüft per grep in
  `dist/fitnessbuddy/index.html`).
- **Status:** ausgeschlossen.
- **Gültigkeitsgrenze:** dauerhaft — es gab nie ein Encoding-Problem, nur das
  Quote-Problem oben. Nicht erneut als „Workaround" anbieten.

### Bilder ohne eingebrannten Text neu generieren

- **Ansatz:** Die 5 Haltungsbilder mit explizitem „no text/words/captions" neu
  generieren, damit die Beschriftung ausschließlich aus der i18n-UI kommt.
- **Befund:** Nicht ausgeführt — Nutzer entschied gegen die zusätzlichen ~20 ct.
- **Status:** nicht weiterverfolgt.
- **Gültigkeitsgrenze:** hinfällig, sobald die App englischsprachige Nutzer bekommt
  oder mehr Budget bereitsteht; der Tippfehler „HINGHE" in `tip1.png` bleibt sonst.

### llama-nemotron-rerank-vl-1b-v2 als Rerank-Modell

- **Ansatz:** `nvidia/llama-nemotron-rerank-vl-1b-v2:free` für Relevanz-Ranking nutzen.
- **Befund:** OpenRouter antwortet mit `"Provider returned error"` (403-artig, ~318 ms).
  Das Modell fehlt zudem in der Antwort von `GET /api/v1/models`.
- **Status:** ausgeschlossen.
- **Gültigkeitsgrenze:** gilt, solange OpenRouter das Modell nicht ausliefert. Bei
  Bedarf erneut gegen die Modelliste prüfen, bevor es in eine Fallback-Kette kommt.

### Reasoning-Modelle mit kleinem max_tokens

- **Ansatz:** `cohere/north-mini-code:free` und `poolside/laguna-m.1:free` mit
  `max_tokens: 150` aufrufen.
- **Befund:** `message.content` ist `null`; der gesamte Output landet in
  `message.reasoning`. Die Modelle denken erst und antworten dann.
- **Status:** ausgeschlossen (für kleine Limits).
- **Gültigkeitsgrenze:** betrifft nur diese beiden Modelle; mit `max_tokens` ≥ 800
  sind sie normal nutzbar. Fallback-Code muss leeren `content` als Fehler behandeln.

### Kostenlose Bildgenerierung über OpenRouter

- **Ansatz:** Ein Free-Modell mit `image` in `output_modalities` suchen.
- **Befund:** 0 Treffer. Alle 9 Modelle mit Bild-Output sind kostenpflichtig
  (Google/OpenAI). Geprüft über `GET /api/v1/models` mit Filter auf
  `architecture.output_modalities`.
- **Status:** ausgeschlossen.
- **Gültigkeitsgrenze:** Momentaufnahme vom 2026-08-04; der Modellkatalog ändert sich.

### Preisannahme aus dem API-Feld `pricing.image`

- **Ansatz:** `pricing.image` (`0.0000003`) als Preis pro generiertem Bild lesen.
- **Befund:** Falsch. Tatsächlich abgerechnet wurden **$0,0388 pro Bild** (~3,9 ct),
  bestätigt über die Usage-Anzeige im OpenRouter-Dashboard. Das Feld beziffert
  Text-Token, nicht die Bilderzeugung.
- **Status:** ausgeschlossen.
- **Gültigkeitsgrenze:** dauerhaft für Modelle mit Bild-Output. Budget vor jeder
  Generierung gegenrechnen, nicht aus dem Pricing-Feld schätzen.

### launch.json im Unterordner des Projekts

- **Ansatz:** `fitness-buddy/frontend/.claude/launch.json` für den Preview-Server anlegen.
- **Befund:** Wird nicht gefunden — `preview_start` liest ausschließlich die
  launch.json im Workspace-Root und meldete nur die dort registrierten Server.
- **Status:** ausgeschlossen.
- **Gültigkeitsgrenze:** gilt, solange der Workspace-Root
  `/Users/manuelwedemeier/Documents/Claude Projects` ist. Lösung: Eintrag im Root mit
  `runtimeArgs: ["run","dev","--prefix","fitness-buddy/frontend","--","--port","5180"]`.
  Port 5173 war durch ChallengeMe belegt.

### Zeitmessung mit `date +%s%3N` in der Shell

- **Ansatz:** Laufzeiten der Modelltests per `date +%s%3N` messen.
- **Befund:** Unter zsh/macOS nicht unterstützt — `bad math expression: operator
  expected at 'N'`. Ersetzt durch `python3 -c "import time; print(int(time.time()*1000))"`.
- **Status:** ausgeschlossen.
- **Gültigkeitsgrenze:** macOS-spezifisch (BSD date); unter GNU/Linux funktioniert es.

### OpenRouter-Antworten direkt per json.load(stdin) parsen

- **Ansatz:** `curl … | python3 -c "json.load(sys.stdin)"` für die Testauswertung.
- **Befund:** Bricht ab — teils Steuerzeichen in Code-Antworten
  (`Invalid control character`), teils Whitespace-/Streaming-Präfix vor dem JSON.
  Tragfähig: Rohtext lesen, ab dem ersten `{` schneiden, dann parsen.
- **Status:** ausgeschlossen.
- **Gültigkeitsgrenze:** gilt für OpenRouter-Antworten mit Code oder Reasoning.

## Offene Punkte

- **NAS-Deploy steht komplett aus.** Drei Commits (a52a9ae, 1e7f7b8, 698fe0f) liegen
  ungetestet auf `dev`. Beim ersten Deploy zieht Docker `nginx:alpine` neu.
- **Marketingseite ist nicht veröffentlicht.** `dist/` ist gebaut, der FTP-Upload
  (`npm run deploy` in `wu-consulting-relaunch`) wurde nicht ausgeführt. Das Projekt
  ist **kein Git-Repo** — es gibt dort keinen Commit-Stand als Rückfallebene.
- `dev` → `main`/`prod` nicht gemerged.
- `frontend/package-lock.json` untracked (siehe Entscheidungen).
- **Architekturempfehlung, noch nicht umgesetzt:** Dev/Prod-Isolation. Aktuell
  blockieren sich beide Umgebungen gegenseitig — eine einzige `docker-compose.yml`,
  feste `container_name`, ein `${APP_PORT}`, und der Postgres-Bind-Mount
  `./backend/data` (Ursache der Ownership-Fehler in dieser Session). Vorschlag:
  Named Volumes plus getrennte `docker-compose.{dev,prod}.yml` nach dem Muster der
  Taschengeld-App.
- Kleinere Verbesserungen: Migrations-Tracking-Tabelle statt reinem `IF NOT EXISTS`
  (`backend/scripts/run-migrations.sh` führt jedes `.sql` bei jedem Deploy erneut aus)
  und ein Healthcheck für `app` in `docker-compose.yml`, um `sleep 5` in `deploy.sh`
  zu ersetzen.
- OpenRouter-Bildbudget: $1,00/Monat, Start 2026-08-04. Verbraucht: ~24 ct
  (1 Testbild + 5 Haltungsbilder). Vor jeder weiteren Generierung Rückfrage.

## Nächster Schritt

Auf der NAS `sudo ./deploy.sh dev` in `/volume1/homes/wedon/Drive/fitness-buddy-dev`
ausführen und dabei zwei Dinge belegen: dass der `edge`-Container startet und
`${APP_PORT}` übernimmt, und dass während des `app`-Rebuilds die Wartungsseite
ausgeliefert wird statt eines Verbindungsfehlers. Danach die Haltung-Seite unter
`/haltung` in DE, EN und ES aufrufen und prüfen, ob die Texte aus den Seeds kommen
(nicht aus den Inline-Fallbacks) — erkennbar am Tab-Label: EN „Form", ES „Técnica".
