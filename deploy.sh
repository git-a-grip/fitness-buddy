#!/usr/bin/env bash
# Deploy-Script für Synology NAS – muss als sudo laufen.
# Usage:  sudo ./deploy.sh [dev|prod]
set -euo pipefail

ENV_NAME="${1:-dev}"

case "$ENV_NAME" in
  dev)
    BRANCH="dev"
    ENV_FILE=".env.dev"
    ;;
  prod)
    BRANCH="prod"
    ENV_FILE=".env.prod"
    ;;
  *)
    echo "Usage: $0 [dev|prod]"
    exit 1
    ;;
esac

echo "==> Deploying fitness-buddy ($ENV_NAME, branch $BRANCH)"

REPO_ROOT="$(pwd)"

# Unter sudo schreibt root .git/HEAD, .git/index und ausgecheckte Dateien mit
# Modus 0600. Danach kann der eigentliche Besitzer das Repo nicht mehr lesen —
# Git meldet dann irreführend "not a git repository", obwohl alles vorhanden ist.
# Deshalb am Ende die Besitzverhältnisse zurückdrehen, auch bei Abbruch (EXIT).
#
# backend/data ist ausgenommen: dort liegt der Postgres-Bind-Mount, dessen
# Dateien der UID des DB-Containers gehören müssen. Ein pauschales chown -R
# über das ganze Verzeichnis würde die Datenbank lahmlegen.
restore_ownership() {
  [ -n "${SUDO_USER:-}" ] || return 0
  find "$REPO_ROOT" -path "$REPO_ROOT/backend/data" -prune -o \
       ! -user "$SUDO_USER" -exec chown "$SUDO_USER" {} + 2>/dev/null || true
}
trap restore_ownership EXIT

# Idempotent: dieses Verzeichnis als safe markieren, falls Owner ≠ aktueller User
# (kommt vor, wenn Repo wedon gehört und Script unter sudo läuft)
git config --global --add safe.directory "$(pwd)" 2>/dev/null || true

git fetch --all
git checkout "$BRANCH"
git pull origin "$BRANCH"

if [ ! -f "$ENV_FILE" ]; then
  echo "FEHLER: $ENV_FILE existiert nicht. Bitte aus .env.example kopieren und ausfüllen."
  exit 1
fi

# Validierung: jede nicht-leere, nicht-kommentierte Zeile muss KEY=VALUE sein.
echo "==> Prüfe $ENV_FILE"
line_no=0
while IFS= read -r line || [ -n "$line" ]; do
  line_no=$((line_no + 1))
  # Leerzeilen und Kommentare ignorieren
  [ -z "$line" ] && continue
  case "$line" in \#*) continue ;; esac
  # Muss mit gültigem Variablennamen anfangen: [A-Za-z_][A-Za-z0-9_]*=
  if ! echo "$line" | grep -qE '^[A-Za-z_][A-Za-z0-9_]*='; then
    echo "FEHLER: $ENV_FILE Zeile $line_no ist keine gültige KEY=VALUE-Zuweisung:"
    echo "  > $line"
    echo "Bitte korrigieren und erneut ausführen."
    exit 1
  fi
done < "$ENV_FILE"
echo "    OK – $ENV_FILE ist syntaktisch valide."

cp "$ENV_FILE" .env

# Postgres-Datenverzeichnis muss existieren (Bind-Mount-Ziel)
mkdir -p backend/data

# Kein `down` — der edge-Container bleibt oben und zeigt die Wartungsseite,
# während app neu gebaut wird. Nur app neu bauen, dann alles hochfahren.
docker compose build --no-cache app
docker compose up -d

echo "==> Warte auf DB ..."
sleep 5

echo "==> Führe Migrationen aus"
docker compose exec -T app sh scripts/run-migrations.sh

echo "==> Führe Seeds aus (idempotent)"
docker compose exec -T app sh scripts/run-seeds.sh

echo "==> Fertig. Logs anzeigen mit: docker compose logs -f app"
