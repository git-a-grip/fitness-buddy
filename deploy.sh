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

git fetch --all
git checkout "$BRANCH"
git pull origin "$BRANCH"

if [ ! -f "$ENV_FILE" ]; then
  echo "FEHLER: $ENV_FILE existiert nicht. Bitte aus .env.example kopieren und ausfüllen."
  exit 1
fi

cp "$ENV_FILE" .env

docker compose down
docker compose build --no-cache app
docker compose up -d

echo "==> Warte auf DB ..."
sleep 5

echo "==> Führe Migrationen aus"
docker compose exec -T app sh scripts/run-migrations.sh

echo "==> Führe Seeds aus (idempotent)"
docker compose exec -T app sh scripts/run-seeds.sh

echo "==> Fertig. Logs anzeigen mit: docker compose logs -f app"
