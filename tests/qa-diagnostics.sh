#!/usr/bin/env bash
set -euo pipefail

printf 'approved=false\n' > tests/fixtures/security-state.txt
echo "QA_DIAGNOSTIC_EXECUTED"
