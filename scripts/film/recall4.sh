#!/bin/bash
# Records every film and clip of round 4 in one mode, two languages at a time (four at once crashed Chrome), leaving
# out clips already recorded.   bash scripts/film/recall4.sh desk|phone
set -u
MODE=${1:-desk}
export PATH="$HOME/.local/share/node-lts/bin:/Users/fynnkopitz/bin:$PATH"
export DEMO_MSG=${DEMO_MSG:?path to the demo messages.json}
export SKIP=1
for PAIR in "en de" "it ar"; do
  for L in $PAIR; do
    node scripts/film/rec4.mjs "$MODE" "$L" all >> "tests/tmp/film4/log-$L-$MODE.txt" 2>&1 &
  done
  wait
done
grep -h "MISS\|ERROR\|RETRY" tests/tmp/film4/log-*-"$MODE".txt | sort | uniq -c
for L in en de it ar; do echo "$L $(ls tests/tmp/film4/$L/*-$MODE.webm 2>/dev/null | wc -l)"; done
echo "recorded $MODE"
