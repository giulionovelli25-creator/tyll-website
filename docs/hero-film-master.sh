#!/bin/sh
# Builds the hero film: a wide cut (1920x1080) and an upright cut (720x960, for phones and upright tablets), each with
# its own framing, as webm and mp4 under 2 MB, plus a poster of the first frame.
# Run from a folder holding the three source clips (see src/assets/photos/CREDITS.md): sh hero-film-master.sh path/to/ffmpeg
#
# Four scenes of 3.6 s joined by 0.5 s dissolves: a gloved hand checking stock on a shelf (first, so the poster says what
# Tyll does), a pen writing the count in a stock book, the reception bell, the kitchen. The two stock scenes are close
# framings of one 4K clip, with no face in shot. The film ends by dissolving back into its first frame, so it loops
# without a cut and there is never a black frame. Every scene gets the same grade; a small gamma evens out their levels.
# Bottles and signage stay out of frame: the kitchen crop stops before the far shelf.
FF="$1"
GRADE="eq=saturation=0.74:contrast=1.02,curves=master='0/0 0.25/0.2 0.5/0.43 0.75/0.67 1/0.86',vignette=angle=PI/4.6"

build() { # shape width height shelf book bell plate
  NORM="scale=$2:$3:flags=lanczos,format=yuv420p,setsar=1"
  "$FF" -y -v error \
    -ss 8 -t 3.6 -i stock.mp4 -ss 2.2 -t 3.6 -i stock.mp4 -ss 0 -t 3.6 -i bell.mp4 -ss 2 -t 3.6 -i plating.mp4 \
    -filter_complex "
      [0:v]$4,$NORM,fps=25,eq=gamma=0.84,split[a1][a2];
      [a1]trim=0:0.5,setpts=PTS-STARTPTS[head];
      [a2]trim=0.5:3.6,setpts=PTS-STARTPTS[body];
      [1:v]$5,$NORM,fps=25,eq=gamma=0.84[k];
      [2:v]$6,hflip,$NORM,fps=25,eq=gamma=0.92[b];
      [3:v]$7,$NORM,fps=25,eq=gamma=1.5,vignette=angle=PI/4:x0=w*0.46:y0=h*0.62[c];
      [body][k]xfade=transition=fade:duration=0.5:offset=2.6[ak];
      [ak][b]xfade=transition=fade:duration=0.5:offset=5.7[ab];
      [ab][c]xfade=transition=fade:duration=0.5:offset=8.8[abc];
      [abc][head]xfade=transition=fade:duration=0.5:offset=11.9,$GRADE[out]" \
    -map "[out]" -an -c:v libx264 -preset slow -crf 12 -pix_fmt yuv420p "master-$1.mp4"
}

# stock.mp4 is the 3840 x 2160 source
build wide 1920 1080 crop=2250:1266:60:0 crop=1800:1012:1700:1148 crop=2560:1440:172:0 crop=2080:1170:0:130
build upright 720 960 crop=1125:1500:1250:0 crop=862:1150:2300:1010 crop=1080:1440:498:0 crop=1020:1360:850:44

encode() { # master output crf-h264 crf-vp9 [scale]
  "$FF" -y -v error -i "$1" ${5:+-vf "$5"} -an -c:v libx264 -preset veryslow -crf "$3" -pix_fmt yuv420p -movflags +faststart "$2.mp4"
  "$FF" -y -v error -i "$1" ${5:+-vf "$5"} -an -c:v libvpx-vp9 -crf "$4" -b:v 0 -row-mt 1 -cpu-used 1 -pix_fmt yuv420p "$2.webm"
}
encode master-wide.mp4 hero-film-1080 25 34
encode master-wide.mp4 hero-film-720 25 34 scale=1280:720:flags=lanczos
encode master-upright.mp4 hero-film-phone 25 35
"$FF" -y -v error -i master-wide.mp4 -frames:v 1 -q:v 2 hero-film.jpg
"$FF" -y -v error -i master-upright.mp4 -frames:v 1 -q:v 2 hero-film-phone.jpg
