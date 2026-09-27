#!/bin/zsh
# Build public/images/og.jpg (1200x630), the preview shown when the link is
# shared on WhatsApp, Facebook or TikTok. Requires ImageMagick 7 and the
# macOS Avenir Next font; the white logo comes from assets-src/, which is not
# committed, so run this from a machine that has the original assets.
set -e
R=${0:a:h:h}
T=$(mktemp -d)
trap 'rm -rf "$T"' EXIT
PANEL='#16323f'

# Bus photo: the AYCO Cosmopolitan (former hero, same 4:3 ratio), scaled to 630px
# tall, keeping the whole unit in a 700px slice.
magick "$R/public/images/uso-personal-2.webp" -resize x630 -crop 700x630+120+0 +repage "$T/bus.png"
# Fade the photo's left edge into the panel color.
magick -size 630x220 gradient:"rgba(22,50,63,1)"-"rgba(22,50,63,0)" -rotate -90 "$T/fade.png"

# White version of the logo.
magick "$R/assets-src/logo-no-background.png" -trim +repage -fill white -colorize 100 -resize 300x "$T/logo.png"

# Circular portrait with a white ring.
magick "$R/public/images/retrato-mariana.webp" -gravity north -crop 560x560+0+10 +repage -resize 104x104 -alpha set \
  \( -size 104x104 xc:none -fill white -draw "circle 52,52 52,0" \) -compose DstIn -composite "$T/face.png"
magick -size 112x112 xc:none -fill white -draw "circle 56,56 56,0" "$T/face.png" -geometry +4+4 -composite "$T/face-ring.png"

magick -size 1200x630 xc:"$PANEL" \
  "$T/bus.png" -geometry +500+0 -composite \
  "$T/fade.png" -geometry +500+0 -composite \
  "$T/logo.png" -geometry +60+58 -composite \
  -font Avenir-Next-Bold -fill white -pointsize 58 -annotate +58+236 'Autobuses' -annotate +58+302 'Mercedes-Benz' \
  -font Avenir-Next-Medium -fill '#b9cbd2' -pointsize 25 -annotate +60+354 'Urbano · Personal · Escolar · Turismo' \
  "$T/face-ring.png" -geometry +56+456 -composite \
  -font Avenir-Next-Bold -fill white -pointsize 26 -annotate +186+492 'Asesora de ventas' \
  -font Avenir-Next-Medium -fill '#b9cbd2' -pointsize 20 -annotate +187+524 'Zapata Camiones · más de 15 años' \
  -font Avenir-Next-Demi-Bold -fill white -pointsize 20 -annotate +187+556 '+52 55 5007 1752 · CDMX y Edomex' \
  -strip -quality 86 -sampling-factor 4:2:0 "$R/public/images/og.jpg"

echo "Wrote $R/public/images/og.jpg"
