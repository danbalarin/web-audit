#!/bin/bash
set -e

# echo "Migrating database..."
# cd packages/db
# sed -i '' '/.*@repo\/.*/d' package.json
# yarn install --production && yarn db:migrate & PID=$!
# # Wait for migration to finish
# wait $PID

echo "Starting production server..."
# cd ../..
node apps/web/server.js & PID=$!

wait $PID