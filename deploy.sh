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
echo "[1/3] Pulling latest code from GitHub..."
git fetch origin
git reset --hard origin/main

echo ""
echo "[2/3] Purging LiteSpeed cache..."
# LiteSpeed serves cached copies of static assets even after files change
# on disk. Without purging, production keeps showing the OLD CSS/JS.
# Method 1: drop a recursive purge marker that LiteSpeed honors per-account.
PURGE_DIR="$SITE_DIR/.lscache-purge"
mkdir -p "$PURGE_DIR" 2>/dev/null || true
# Method 2: emit a server-side purge header on the next request via a tiny
# PHP trigger (works on shared cPanel where shell purge tools are absent).
cat > "$SITE_DIR/_purge.php" << 'PHP_EOF'
<?php
// One-shot LiteSpeed purge trigger. Hit this URL once after deploy.
header('X-LiteSpeed-Purge: *');
echo 'LiteSpeed cache purged at ' . date('c');
PHP_EOF
echo "    -> Created _purge.php. It will be requested automatically below."
# Method 3: actually fire the purge by requesting the trigger over HTTP.
if command -v curl >/dev/null 2>&1; then
    curl -s "https://dimasqiramadhani.com/_purge.php" >/dev/null 2>&1 \
        && echo "    -> Purge trigger fired successfully." \
        || echo "    -> Could not reach purge URL; visit it manually once."
fi

echo ""
echo "[3/3] Done!"

echo ""
echo "======================================"
echo "  Deploy complete!"
echo "  If the old layout persists, also flush"
echo "  LiteSpeed Cache from cPanel UI, or visit:"
echo "  https://dimasqiramadhani.com/_purge.php"
echo "======================================"
