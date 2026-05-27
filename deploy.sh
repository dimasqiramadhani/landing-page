#!/bin/bash
# =============================================================
# deploy.sh — Auto deploy script for Landing Page
# Usage: bash deploy.sh
# =============================================================

set -e

SITE_DIR="/home/dimr9945/public_html"

echo "======================================"
echo "  Landing Page Deploy Script"
echo "======================================"

cd "$SITE_DIR"

echo ""
echo "[1/2] Pulling latest code from GitHub..."
git fetch origin
git reset --hard origin/main

echo ""
echo "[2/2] Done!"

echo ""
echo "======================================"
echo "  Deploy complete!"
echo "======================================"