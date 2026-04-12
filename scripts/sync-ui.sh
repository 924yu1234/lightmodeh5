#!/bin/bash
# Sync UI/theme/style between dg-ued and dg-trade-fe
#
# Usage:
#   ./scripts/sync-ui.sh --to-trade    # UED → trade-fe
#   ./scripts/sync-ui.sh --from-trade   # trade-fe → UED
#   ./scripts/sync-ui.sh --diff         # Show diff only

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
UED_DIR="$(dirname "$SCRIPT_DIR")"
TRADE_DIR="$(dirname "$UED_DIR")/dg-trade-fe"

if [ ! -d "$TRADE_DIR" ]; then
  echo "Error: dg-trade-fe not found at $TRADE_DIR"
  exit 1
fi

SYNC_PATHS=(
  "src/UI/"
  "src/theme.tsx"
  "src/style/"
)

case "$1" in
  --to-trade)
    echo "Syncing: dg-ued → dg-trade-fe"
    echo "Files to sync:"
    for p in "${SYNC_PATHS[@]}"; do
      echo "  $p"
    done
    echo ""
    read -p "Continue? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      rsync -av "$UED_DIR/src/UI/" "$TRADE_DIR/src/UI/"
      cp "$UED_DIR/src/theme.tsx" "$TRADE_DIR/src/theme.tsx"
      rsync -av "$UED_DIR/src/style/" "$TRADE_DIR/src/style/"
      echo "Done. Run 'npm run typecheck' in trade-fe to verify."
    fi
    ;;
  --from-trade)
    echo "Syncing: dg-trade-fe → dg-ued"
    echo "Files to sync:"
    for p in "${SYNC_PATHS[@]}"; do
      echo "  $p"
    done
    echo ""
    read -p "Continue? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      rsync -av "$TRADE_DIR/src/UI/" "$UED_DIR/src/UI/"
      cp "$TRADE_DIR/src/theme.tsx" "$UED_DIR/src/theme.tsx"
      rsync -av "$TRADE_DIR/src/style/" "$UED_DIR/src/style/"
      echo "Done."
    fi
    ;;
  --diff)
    echo "=== Diff: src/UI/ ==="
    diff -rq "$UED_DIR/src/UI/" "$TRADE_DIR/src/UI/" 2>/dev/null | head -30
    echo ""
    echo "=== Diff: src/theme.tsx ==="
    diff "$UED_DIR/src/theme.tsx" "$TRADE_DIR/src/theme.tsx" 2>/dev/null | head -20
    echo ""
    echo "=== Diff: src/style/ ==="
    diff -rq "$UED_DIR/src/style/" "$TRADE_DIR/src/style/" 2>/dev/null | head -20
    ;;
  *)
    echo "Usage: $0 [--to-trade | --from-trade | --diff]"
    echo "  --to-trade   Sync from dg-ued to dg-trade-fe"
    echo "  --from-trade Sync from dg-trade-fe to dg-ued"
    echo "  --diff       Show differences"
    exit 1
    ;;
esac
