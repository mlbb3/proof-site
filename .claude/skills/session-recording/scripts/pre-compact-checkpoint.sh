#!/bin/bash
set -euo pipefail
INPUT=$(cat)
CWD=$(echo "$INPUT" | grep -o '"cwd":"[^"]*"' | head -1 | cut -d'"' -f4)
if [ -z "$CWD" ]; then CWD="${CLAUDE_PROJECT_DIR:-.}"; fi
LOG="$CWD/.session-log.md"
if [ ! -f "$LOG" ]; then exit 0; fi
SNAPSHOT=$(grep '^\- \*\*Snapshot\*\*:' "$LOG" | head -1 | sed 's/.*: //')
if [ -z "$SNAPSHOT" ] || [ "$SNAPSHOT" = "no-commits" ]; then
  echo "" >> "$LOG"
  echo "## CHECKPOINT $(date -u +"%Y-%m-%dT%H:%M:%SZ") (pre-compaction)" >> "$LOG"
  echo "_No git snapshot to diff against._" >> "$LOG"
  exit 0
fi
{
  echo ""
  echo "## CHECKPOINT $(date -u +"%Y-%m-%dT%H:%M:%SZ") (pre-compaction)"
  echo ""
  COMMITS=$(git -C "$CWD" log --oneline "$SNAPSHOT..HEAD" 2>/dev/null || true)
  if [ -n "$COMMITS" ]; then
    echo "### Commits since session start"
    echo '```'
    echo "$COMMITS"
    echo '```'
    echo ""
  fi
  DIFFSTAT=$(git -C "$CWD" diff --stat "$SNAPSHOT..HEAD" 2>/dev/null || true)
  if [ -n "$DIFFSTAT" ]; then
    echo "### Changed files"
    echo '```'
    echo "$DIFFSTAT"
    echo '```'
    echo ""
  fi
  DIRTY=$(git -C "$CWD" diff --stat 2>/dev/null || true)
  STAGED=$(git -C "$CWD" diff --cached --stat 2>/dev/null || true)
  if [ -n "$DIRTY" ] || [ -n "$STAGED" ]; then
    echo "### Uncommitted work"
    if [ -n "$STAGED" ]; then
      echo "**Staged:**"
      echo '```'
      echo "$STAGED"
      echo '```'
    fi
    if [ -n "$DIRTY" ]; then
      echo "**Unstaged:**"
      echo '```'
      echo "$DIRTY"
      echo '```'
    fi
    echo ""
  fi
  echo "---"
} >> "$LOG"
