#!/bin/sh
# Builds the hero film: a wide cut (1920x1080) and an upright cut (720x960, for phones and upright tablets), each with
# its own framing, as webm and mp4 under 2 MB, plus a poster of the first frame.
# Run from a folder holding the three source clips (see src/assets/photos/CREDITS.md): sh hero-film-master.sh path/to/ffmpeg
#
# Three scenes of 4.5 s joined by 0.5 s dissolves. The film ends by dissolving back into its first frame, so it loops
# without a cut and there is never a black frame. Every scene gets the same grade; a small gamma evens out their levels.
# Bottles and signage stay out of frame: the kitchen crop stops before the far shelf, and only the first 1.9 s of the
# chandelier shot is used, slowed down, before the tilt reveals a sign and bottles below it.
FF="$1"
GRADE="eq=saturation=0.74:contrast=1.02,curves=master='0/0 0.25/0.2 0.5/0.43 0.75/0.67 1/0.86',vignette=angle=PI/4.6"

build() { # shape width height bell plate chandelier
  NORM="scale=$2:$3:flags=lanczos,format=yuv420p,setsar=1"
  # Slowing the chandelier shot needs motion smoothing, which is slow: done once and kept
  [ -f "chandelier-$1.mp4" ] || "$FF" -y -v error -ss 0 -t 1.9 -i chandelier.mp4 \
    -vf "$6,$NORM,setpts=PTS*2.37,minterpolate=fps=25:mi_mode=mci:mc_mode=aobmc:vsbmc=1,trim=0:4.5,setpts=PTS-STARTPTS" \
    -an -c:v libx264 -preset fast -crf 10 -pix_fmt yuv420p "chandelier-$1.mp4"
  "$FF" -y -v error \
    -ss 0 -t 4.5 -i bell.mp4 -ss 2 -t 4.5 -i plating.mp4 -i "chandelier-$1.mp4" \
    -filter_complex "
      [0:v]$4,hflip,$NORM,fps=25,eq=gamma=0.92,split[a1][a2];
      [a1]trim=0:0.5,setpts=PTS-STARTPTS[head];
      [a2]trim=0.5:4.5,setpts=PTS-STARTPTS[body];
      [1:v]$5,$NORM,fps=25,eq=gamma=1.5,vignette=angle=PI/4:x0=w*0.46:y0=h*0.62[b];
      [2:v]fps=25,eq=gamma=1.0[c];
      [body][b]xfade=transition=fade:duration=0.5:offset=3.5[ab];
      [ab][c]xfade=transition=fade:duration=0.5:offset=7.5[abc];
      [abc][head]xfade=transition=fade:duration=0.5:offset=11.5,$GRADE[out]" \
    -map "[out]" -an -c:v libx264 -preset slow -crf 12 -pix_fmt yuv420p "master-$1.mp4"
}

build wide 1920 1080 crop=2560:1440:172:0 crop=2080:1170:0:130 crop=2276:1280:0:0
build upright 720 960 crop=1080:1440:498:0 crop=1020:1360:850:44 crop=960:1280:885:0

encode() { # master output crf-h264 crf-vp9 [scale]
  "$FF" -y -v error -i "$1" ${5:+-vf "$5"} -an -c:v libx264 -preset veryslow -crf "$3" -pix_fmt yuv420p -movflags +faststart "$2.mp4"
  "$FF" -y -v error -i "$1" ${5:+-vf "$5"} -an -c:v libvpx-vp9 -crf "$4" -b:v 0 -row-mt 1 -cpu-used 1 -pix_fmt yuv420p "$2.webm"
}
encode master-wide.mp4 hero-film-1080 24 33
encode master-wide.mp4 hero-film-720 25 34 scale=1280:720:flags=lanczos
encode master-upright.mp4 hero-film-phone 25 35
"$FF" -y -v error -i master-wide.mp4 -frames:v 1 -q:v 2 hero-film.jpg
"$FF" -y -v error -i master-upright.mp4 -frames:v 1 -q:v 2 hero-film-phone.jpg
