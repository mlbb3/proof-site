#!/bin/bash
set -euo pipefail
INPUT=$(cat)
CWD=$(echo "$INPUT" | grep -o '"cwd":"[^"]*"' | head -1 | cut -d'"' -f4)
SESSION_ID=$(echo "$INPUT" | grep -o '"session_id":"[^"]*"' | head -1 | cut -d'"' -f4)
if [ -z "$CWD" ]; then CWD="${CLAUDE_PROJECT_DIR:-.}"; fi
LOG="$CWD/.session-log.md"
if ! git -C "$CWD" rev-parse --git-dir >/dev/null 2>&1; then
  cat > "$LOG" <<EOF
# Session log
- **Started**: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
- **Session**: ${SESSION_ID:-unknown}
- **Directory**: $CWD
- **Git**: not a git repository
---
EOF
  exit 0
fi
HEAD_REF=$(git -C "$CWD" rev-parse HEAD 2>/dev/null || echo "no-commits")
BRANCH=$(git -C "$CWD" branch --show-current 2>/dev/null || echo "detached")
REMOTE=$(git -C "$CWD" remote get-url origin 2>/dev/null || echo "no-remote")
PROJECT=$(basename "$REMOTE" .git 2>/dev/null || basename "$CWD")
cat > "$LOG" <<EOF
# Session log
- **Started**: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
- **Session**: ${SESSION_ID:-unknown}
- **Project**: $PROJECT
- **Branch**: $BRANCH
- **Snapshot**: $HEAD_REF
- **Remote**: $REMOTE
---
EOF
