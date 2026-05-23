# Fitness Buddy

Mobile-first Trainings-Tracker mit anatomischer Muskelvisualisierung und sportmedizinisch fundierter Regenerationsanzeige.

## Features (Phase 1)

- **Auth**: E-Mail + Passwort, Self-Service-Registrierung (bcrypt + JWT)
- **Muskel-Map**: Interaktives SVG (vorne/hinten), grau → rot bei Belastung, abklingt nach Halbwertszeit
- **Übungs-Logger**: z.B. „Bench Press 3×8×60kg" → automatisch beteiligte Muskeln einfärben
- **Geräte-Pakete**: Technogym Selection/Excite (~70 Geräte) + Cardio-Free; weitere Hersteller per Paket nachladbar
- **Eigene Übungen**: Nutzer können individuelle Übungen anlegen
- **Trainingspakete**: Nutzer baut eigene „Push Day", „Cardio Light" etc.
- **Vorschläge**: Antagonisten-Logik, vernachlässigte Muskelgruppen, gelbe Umrandung bei Übertraining
- **kcal**: MET-basiert (Compendium of Physical Activities)
- **Statistik**: Verlauf, Volumen, kcal, vernachlässigte Muskeln
- **Wissensseite**: ATP-Zyklus, aerob/anaerob, Energiesysteme, Regeneration – mit SVG-Diagrammen
- **i18n**: Alle Texte über Sprachschlüssel in DB (DE initial, EN/ES vorbereitet)

## Phase 2 (geplant)

- ICS-Kalenderexport für nächstes Training
- Web-Push-Reminder
- Dehnprogramm-Empfehlung am Trainingsende
- Einnahme-Tracking (Eiweiß-Shake, Kreatin)

## Stack

- **Frontend**: React 18 + Vite, kein UI-Framework, dunkles Theme via CSS-Variablen
- **Backend**: Node.js + Express, `pg` (raw SQL, kein ORM)
- **DB**: PostgreSQL 16
- **Deployment**: Docker Compose auf Synology NAS

## Setup lokal (Mac)

```bash
cp .env.example .env
docker compose up -d
docker compose exec app sh scripts/run-migrations.sh
docker compose exec app sh scripts/run-seeds.sh
```

App: <http://localhost:8088>

## Deployment NAS

Branch-Strategie: `dev` und `prod`.

```bash
sudo ./deploy.sh dev
sudo ./deploy.sh prod
```

Ports (NAS):

- dev:  App `8088`, DB `5438`
- prod: App `8087`, DB `5437`

## DB-Verwaltung

DBeaver gegen Host-Port (5437 / 5438).

## Repo

<https://github.com/git-a-grip/fitness-buddy>
