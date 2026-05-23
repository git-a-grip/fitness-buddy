#!/usr/bin/env sh
# Führt alle Migrations in alphabetischer Reihenfolge aus (idempotent durch IF NOT EXISTS).
set -e
cd "$(dirname "$0")/.."

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL nicht gesetzt"; exit 1
fi

for f in migrations/*.sql; do
  echo "==> Migration: $f"
  psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$f"
done

echo "Migrationen abgeschlossen."
