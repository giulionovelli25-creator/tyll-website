#!/bin/zsh
export PATH="$HOME/.local/share/node-lts/bin:$PATH"
SP=/private/tmp/claude-501/-Users-giulionovelli-tyll-website/2c5653ff-0afc-42e6-91e7-ae8789545d43/scratchpad
export FF=$SP/ff/node_modules/ffmpeg-static/ffmpeg; D=$SP/demo-current
restart(){ pid=$(lsof -nP -iTCP:3299 -sTCP:LISTEN -t | head -1); [ -n "$pid" ] && [ "$(lsof -a -p $pid -d cwd -Fn | tail -1 | cut -c2-)" = "$D" ] && kill $pid; sleep 2; (cd "$D" && TYLL_PUBLIC_DEMO=on nohup npx next dev -p 3299 > $SP/demo-next.log 2>&1 &); for i in $(seq 1 40); do curl -s -o /dev/null -m 20 http://localhost:3299/welcome && break; sleep 3; done; }
for lang in ${=1}; do for m in desk phone; do restart; node tests/tmp/film-rec.mjs $m waste,stock,forecasting,revenue,finance,pour $lang 2>&1 | grep -E "MISS|rror|$lang " | cut -c1-110; done; done
pid=$(lsof -nP -iTCP:3299 -sTCP:LISTEN -t | head -1); [ -n "$pid" ] && [ "$(lsof -a -p $pid -d cwd -Fn | tail -1 | cut -c2-)" = "$D" ] && kill $pid
echo finished
