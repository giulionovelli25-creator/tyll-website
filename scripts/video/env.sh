# Shared by the video scripts: run from the repository, with the project's Node, ffmpeg and ffprobe
cd "$(dirname "${BASH_SOURCE[0]}")/../.."
export PATH="$HOME/.local/share/node-lts/bin:$PATH"
FF=${FFMPEG:-$(node -p 'require("ffmpeg-static")')}
FP=${FFPROBE:-$(node -p 'require("@ffprobe-installer/ffprobe").path')}
frames_in() { "$FP" -v error -select_streams v:0 -count_packets -show_entries stream=nb_read_packets -of csv=p=0 "$1"; }
seconds_in() { "$FP" -v error -show_entries format=duration -of csv=p=0 "$1"; }
