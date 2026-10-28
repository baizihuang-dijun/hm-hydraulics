#!/bin/sh
set -eu
cd "$(dirname "$0")/.."

if ! command -v node >/dev/null 2>&1; then
  echo "node not found" >&2
  exit 1
fi

if ! command -v pnpm >/dev/null 2>&1; then
  corepack enable >/dev/null 2>&1 || true
  corepack prepare pnpm@9 --activate >/dev/null 2>&1 || true
fi

if command -v pnpm >/dev/null 2>&1; then
  pnpm install --frozen-lockfile
  pnpm next build
else
  npm install --no-audit --no-fund --ignore-scripts
  npx next build
fi
