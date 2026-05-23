#!/usr/bin/env sh
# Führt alle Seeds in alphabetischer Reihenfolge aus.
# Seeds nutzen ON CONFLICT DO NOTHING / DO UPDATE und sind somit idempotent.
set -e
cd "$(dirname "$0")/.."

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL nicht gesetzt"; exit 1
fi

for f in seeds/*.sql; do
  echo "==> Seed: $f"
  psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$f"
done

echo "Seeds abgeschlossen."
