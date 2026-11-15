# Video brief: the hotel film, before and after Tyll

Written 8 Nov 2026 for the homepage section "Three places your hotel loses money" (`src/components/home/HotelStory.astro`,
`src/scripts/film.ts`): one full-screen film, scrubbed by scroll, that stops on four holds. This brief is the one record
of that film: the story, the rules, every still and clip with the exact prompt and model that made it, what each cost,
the edit, and how one clip is remade without touching the others. `scripts/video/` reads the clips and the edit below,
so nothing is pasted by hand. It replaces the first film of the same day (a Paris-style hotel at night), which the
owner rejected.

## The story

A grand city hotel on a busy square in the manner of the Mandarin Oriental Savoy, Zurich (since 9 Nov 2026): clean cream stone, crisp black ironwork, modern charcoal awnings, plain flags, a curving tram line, its neighbours touching it, the entrance under a black glass canopy in the right third. Nothing rustic or fairytale.
The camera starts on the square, goes inside to the two places money leaks (the dry store's stock, the bar's
glassware), and comes back out to the same square, now thriving. One continuous camera, no cuts.

| Hold | Film time | What is on screen | Copy on the page |
| --- | --- | --- | --- |
| 1 The tired hotel | 0 to 1.25 s | Overcast after rain, the square almost empty, one tram crossing, the doorman alone, the café terrace closed | the section title, Revenue and Reconciliation |
| 2 The dry store | 9.29 to 10.79 s | The chef counting stock on a tablet at the metal shelving, a delivery trolley beside him | Stock and Waste |
| 3 The bar | 18.21 to 19.07 s | The bartender counting the glasses on the back bar against his tablet, an open case of new glasses | Purchasing |
| 4 The thriving hotel | 25.3 to 27.17 s | A sunny late morning from the same angle: the terrace full, a family at the door, cyclists, taxis, a blue and white tram arriving, flags lifting | the result: three callouts joined to the Tyll mark, Book a demo |

Between the holds the camera moves: across the square to the door, along the service corridor into the dry store, out
through its door and along the corridor into the bar, past the bar's window to the sunlit door, and out onto the square,
pulling back to the wide view. The page maps each hold to a long stretch of scroll where the frame barely advances, and
each move to a shorter one.

## Rules for every frame

- One hotel: the overcast still H1 is the source of every exterior (H4, D1 and D6 are edits of it or of H4, so the
  building never changes); the interiors take its light and lens.
- No readable text, names, logos or signage; blank plaques, blank number plates, plain cream flags.
- No alcohol: the bar holds glassware, water and juice only; one film serves all four languages, Arabic included.
- Photographic, not rendered: the style line and negative list below go into every prompt, and every frame needs at
  least four real-world imperfections (wet cobbles and puddles, wear on stone and brass, uneven window light, people
  mid-motion).
- Reject a clip with warping, floating or duplicated people, melting hands, flicker, a cut or a dissolve between rooms.
  Joins are made only inside moves, at a doorway or a dark or bright frame, with a 0.4 s crossfade; never during a hold.

## The edit

24 fps. Each row is a run of frames from one clip (counted from 0), in film order. "Into the next" is how many frames
the piece overlaps the next one: 10 (0.4 s) where the camera passes a doorway, 3 where two clips meet on the same hold
frame, 1 where a retake starts on the very next frame of the clip it replaces. A retake comes out about 1% darker than
the frame it started from (about 2.4 levels of 255, measured on the join frame), so its brightness match adds 2 video
levels to its luma.
`scripts/video/stitch.sh` builds the film from this table, then applies the grade.

Smoothness fixes (8 Nov 2026, late): B starts at its frame 30, because its first second creeps from a standstill and
the camera seemed to stall right after the walk across the square (A2 ends 10 frames earlier so the dissolve still
falls at the opening door); D ends 3 frames early and blends into E over 6 frames, so the camera settles on hold 3
instead of stopping dead. The upscaled master was cut the same way from its previous version (no new upscale).

| Piece | Clip | Frames | Brightness match | Into the next |
| --- | --- | --- | --- | --- |
| 1 | A | 0–140 | | 10 frames at the hotel door, into the service corridor |
| 3 | B | 30–120 | | 3 frames, both on hold 2's frame |
| 4 | C | 0–57 | | 1 frame: C2 starts on C's frame 58 |
| 5 | C2 | 0–51 | +2 | 10 frames in the dry store's doorway, into the corridor to the bar |
| 6 | D | 0–117 | | 6 frames as the camera comes to rest on hold 3's frame |
| 7 | E | 3–31 | | 1 frame: E2 starts on E's frame 32 |
| 8 | E2 | 0–96 | +2 | 10 frames in the sunlit doorway, out onto the square |
| 9 | F | 60–120 | | 3 frames, both on hold 4's frame |
| 10 | G | 0–48 | | end |

The grade, over the whole film once: a gentle S curve (`curves=all='0/0 0.25/0.24 0.5/0.5 0.75/0.76 1/1'`) and 6% less
saturation (`eq=saturation=0.94`). Nothing else: no blur, no vignette, no denoise.

## The stills

Made on fal.ai on 8 Nov 2026, 2752 x 1536 PNG, kept locally in `assets/video/city/` (git-ignored, like the raw clips; every one is also on fal's CDN at the address given). Nano Banana Pro costs $0.15 a picture; FLUX.2 [pro] $0.03 a processed megapixel. Every exterior is an edit of the façade, so the building never changes; the interiors take the façade's light and lens.

### Façade · `facade-wide.png`

The approved hotel on its square, the wide view every exterior is edited from. Cost $0.60 (4 × $0.15) + the two FLUX takes. Final picture: https://v3b.fal.media/files/b/0ab1aecc/ddhlkBPBqKG8CHrFGgecX_GACe79xn.png

- text to image, 16:9, 2K (two FLUX.2 [pro] takes of the same prompt, seeds 5101 and 5102, were rejected) [`fal-ai/nano-banana-pro`, request `01a1bcb7-5db4-76a2-a484-f2f47f629e49`]:

```text
A grand 19th-century hotel on a busy European city square, seen from across the square at standing height, the camera at a slight angle to the façade and not centred on it. The hotel: five storeys of cream and ochre stone with real weathering and dark streaks under the cornices, tall arched windows on the ground floor, wrought-iron balconies on the upper floors, a heavy cornice and a slate roof line. The entrance is a pair of tall wood-and-glass doors under a dark canopy, and it sits in the right third of the frame; above it, two plain cream flags with no emblem hang from short poles, and beside the door a small brass plaque far too small to read. Left of the entrance, dark green canvas awnings shade a small café terrace of metal tables and chairs. Neighbouring buildings touch the hotel on both sides: an older grey stone building at the left edge of the frame and a narrow painted townhouse at the right edge. Behind and above the rooftops, a church tower and chimneys. In front, the cobbled square: two tram tracks curve across the foreground, overhead tram wires are strung across the upper part of the frame, there is a drain and a shallow puddle on the cobbles, a few bikes lean against a wall, a white delivery van with no markings is parked at the right edge, and a few people walk across, one carrying shopping bags. Soft neutral daylight, a pale sky with light clouds, uneven window brightness and one curtain half drawn. The lower left of the frame is open cobbled square with the tram tracks. Editorial architectural photograph, shot on a full frame camera, 35 mm lens, f/5.6, natural light only with real practical lamps, accurate perspective with slight lens distortion at the edges, subtle film grain, real weather: wet reflections, dust in sunbeams, slightly uneven window brightness, dirt and wear on stone and brass, people mid motion with motion blur on a passing tram or cyclist, candid not posed, no symmetry, no HDR, no glow, no bloom, no oversaturation, no perfect cleanliness, no CGI render look, no stock photo lighting. Avoid: 3D render, CGI, video game, illustration, HDR, bloom, glow, oversharpened, plastic skin, symmetrical, floating objects, duplicated people, extra fingers, text, watermark, logo.
```

- lettering removed [`fal-ai/nano-banana-pro/edit`, request `01a1bcb8-ec62-7db1-84b5-65e7838b387e`, from https://v3b.fal.media/files/b/0ab1aead/-UdIYmnce7wqNzxhtS8Dr_MGHmfhav.png]:

```text
Remove every piece of lettering from this photograph and change nothing else. The white van's number plate becomes a plain blank plate and the small badge on its rear door disappears. The brass plaque beside the hotel entrance becomes plain polished brass with no engraving. The two chalkboards on the café terrace become plain dark boards with a faint chalk smudge and no writing. Remove the small blue street-name sign on the corner and the poster board on the far left of the square. The two flags above the entrance are plain cream fabric with no emblem or print. Keep the building, the neighbouring buildings, the church tower, the tram, the people, the café terrace, the bikes, the cobbles, the tram tracks, the overhead wires, the light, the colours and the framing exactly as they are. Photorealistic editorial photograph, no text anywhere.
```

- asked to step back; it kept nearly the same framing, so it was not used [`fal-ai/nano-banana-pro/edit`, request `01a1bcba-8a94-7a61-ac46-ea392cbd182f`, from https://v3b.fal.media/files/b/0ab1aeb8/xIeHBI7YiBuz_fdwhUXks_Lj3yzRHV.png]:

```text
The same photograph taken from a few steps further back across the square, with the camera at the same height and angle: the same hotel, the same neighbouring buildings, church tower, tram, flags, green awnings, café terrace, bikes and van, only smaller in the frame and a little higher, so that much more of the cobbled square shows in the foreground. The hotel's entrance doors now sit between 40% and 58% of the image height, still in the right third of the frame. The lower 38% of the frame is open cobbled square: curving tram tracks, a shallow puddle reflecting the grey sky, a drain, worn and stained cobbles, a dropped newspaper, a pigeon. Overhead tram wires still cross the sky. Editorial architectural photograph, full frame camera, 35 mm lens, f/5.6, natural light, slight lens distortion at the edges, subtle film grain, no symmetry, no HDR, no glow, no text, no logo.
```

- the lettering-free picture padded with grey and the square painted in around it: this is the façade [`fal-ai/nano-banana-pro/edit`, request `01a1bcbc-17f7-7111-8c34-8eb20e569615`, from https://v3b.fal.media/files/b/0ab1aeca/jWeCDSMGY45Lvlt_MX4nq_facade-padded.png]:

```text
Complete this photograph by filling the flat grey areas at the bottom and on both sides, and change nothing in the existing photograph. The grey area at the bottom becomes more of the same cobbled city square running toward the camera: the curving tram tracks continue down and out of the frame, worn and stained cobbles, a shallow puddle reflecting the grey sky, a drain cover, a dropped newspaper, a pigeon. The grey strips at the left and right continue the neighbouring buildings, the pavement, the overhead tram wires and the sky exactly as they are at the edges of the photograph. Seamless, the same light, perspective, lens, colour and film grain; one continuous editorial architectural photograph taken with a 35 mm lens at f/5.6. No text, no logo, no signage.
```

### H1 · `H1.png`

Hold 1, the tired hotel (9 Nov 2026, the owner's pick of three, candidate 2; the first city façade, weathered and rustic, was replaced, and its stills are in `assets/video/city/v1-old/`). Overcast late afternoon after rain, wet granite setts, a man with an umbrella, the doorman alone, the terrace chairs stacked, a few dark windows. Cost $0.15. Final picture: https://v3b.fal.media/files/b/0ab1c6db/aeShFOP6moPnhjMYmG1ly_bljvLG1h.png (`assets/video/city/v2/B2.png`; the other candidates are `B1`, `B3` and their sunny edits `A1`, `A3`; the sheet the owner chose from is `assets/review/exterior-candidates.jpg`)

- text to image, 16:9, 2K [`fal-ai/nano-banana-pro`, request `01a1c067-ec7f-7232-9165-de1948404ce6`]:

```text
A candid street photograph across a wide city square in Zurich towards a refined five-storey grand hotel like the Mandarin Oriental Savoy: smooth cream sandstone, crisp black iron balconies on the first and fifth floors, modern dark grey retractable awnings over a ground-floor brasserie, plain pale flags on short poles above the entrance, and the entrance itself with a slim black steel-and-glass canopy in the right third of the frame. The hotel is part of a continuous block, its neighbours touching it: a pale grey stone office building on the left, a later stone building on the right. A tram line with overhead wires curves through the foreground over grey granite setts. Overcast late afternoon, soft grey sky, the setts still wet, few people: a man with an umbrella walking out of frame, a doorman under the canopy, the terrace closed, several windows unlit. Camera at eye height from the far side of the square, slightly angled. Shot on a full frame camera, 35 mm lens, f/5.6, natural light, slight edge distortion, fine film grain, real wear, candid people mid motion, no HDR, no glow, no CGI, no symmetry. No text, lettering, signage, logos or readable numbers anywhere. No weathered or rustic stone, no countryside, no gables, towers or fairytale roofs.
```

### H2 · `H2.png`

Hold 2, the dry store: the chef counting stock on a tablet. Cost $0.45 + the FLUX take. Final picture: https://v3b.fal.media/files/b/0ab1aefa/Vvgvmf1gB6Znn5DxUu2xr_i4EFPMIM.png

- a new view, the façade used only for light and lens (FLUX.2 [pro] edit, seed 6201, rejected) [`fal-ai/nano-banana-pro/edit`, request `01a1bcbf-beff-7d52-821a-c990fa38df31`, from https://v3b.fal.media/files/b/0ab1aecc/ddhlkBPBqKG8CHrFGgecX_GACe79xn.png]:

```text
Use the reference photograph only for its light, colour grade, lens and level of realism; do not show the building. A new photograph inside this hotel's dry store: a narrow room of scuffed metal shelving holding cardboard cases with tape labels, plastic crates of vegetables, vacuum-packed meat and cheese, sacks of flour and rice, a few cases sweating with condensation beside the heavy door of the walk-in cooler, which stands ajar at the side; a steel delivery trolley stacked with cases with a paper delivery note clipped on top. One chef in a white jacket with a towel over his shoulder stands side-on to the shelf, right of the centre of the frame, one hand resting on a case, a tablet in his other hand pointed at the shelf, clearly mid-count. Framed from a little further back, waist-up or wider, so his hands are small in the frame. No oven, no stove, no plated food, no decorative tray. Cool fluorescent light mixed with a warm lamp from the corridor. The marker notes on the tape labels are too small and soft to read. The lower left of the frame is a calm, slightly darker shelf end and floor. Editorial architectural photograph, shot on a full frame camera, 35 mm lens, f/5.6, natural light only with real practical lamps, accurate perspective with slight lens distortion at the edges, subtle film grain, real weather: wet reflections, dust in sunbeams, slightly uneven window brightness, dirt and wear on stone and brass, people mid motion with motion blur on a passing tram or cyclist, candid not posed, no symmetry, no HDR, no glow, no bloom, no oversaturation, no perfect cleanliness, no CGI render look, no stock photo lighting. Avoid: 3D render, CGI, video game, illustration, HDR, bloom, glow, oversharpened, plastic skin, symmetrical, floating objects, duplicated people, extra fingers, text, watermark, logo.
```

- every printed word and logo removed [`fal-ai/nano-banana-pro/edit`, request `01a1bcc1-ce3f-72a1-82e8-b9dd98d9045e`, from https://v3b.fal.media/files/b/0ab1aee5/V7t6rJaCirazjrBA9QOiH_RNiT42Z0.png]:

```text
Keep this exact photograph and change only the printing: every printed word and logo disappears. The flour and rice sacks become plain brown kraft paper sacks with a simple red band and no letters; the white box labels become blank white labels or strips of masking tape with faint illegible pencil marks; the paper delivery note on the trolley shows only faint unreadable lines. Keep the chef, his pose, the tablet, the towel, the shelving, the vacuum-packed meat and cheese, the crates, the walk-in cooler door, the trolley, the light and the colours exactly as they are. Photorealistic, no readable text anywhere, no logo.
```

- the chef moved fully into frame [`fal-ai/nano-banana-pro/edit`, request `01a1bcc2-f9d5-75c2-968f-44dd6b4ad38e`, from https://v3b.fal.media/files/b/0ab1aef2/hhUWUKx478tC77PItmzOU_kpYc41ym.png]:

```text
The same dry store, the same shelving, cases, crates, plain sacks, vacuum-packed goods, trolley with its delivery note, walk-in cooler door and light, exactly as they are. Only the chef changes position: he now stands fully inside the frame at about two thirds of the way across, between the shelving and the trolley, side-on to the shelf, one hand resting on a cardboard case on the shelf, the tablet held in his other hand and angled toward the shelf as he counts, his eyes on the case; a towel over his shoulder, white jacket, dark trousers. Framed waist-up or wider so his hands are small in the frame; nothing of him is cut off by the edge of the picture. Editorial photograph, 35 mm lens, f/5.6, natural light with the fluorescent tube and a warm lamp, subtle film grain, real skin, natural posture, no HDR, no glow, no text, no logo.
```

### H3 · `H3.png`

Hold 3, the bar: the bartender counting glassware; water and juice only. Cost $0.45 + the FLUX take. Final picture: https://v3b.fal.media/files/b/0ab1af0d/-eErVK_rNIHcxJjbmsJ9__wKpIEwiR.png

- a new view, the façade used only for light and lens (FLUX.2 [pro] edit, seed 6301, rejected) [`fal-ai/nano-banana-pro/edit`, request `01a1bcbf-bf0c-7123-accf-349355dbe5e4`, from https://v3b.fal.media/files/b/0ab1aecc/ddhlkBPBqKG8CHrFGgecX_GACe79xn.png]:

```text
Use the reference photograph only for its light, colour grade, lens and level of realism; do not show the building. A new photograph inside this hotel's bar in the early evening, before guests arrive: a dark wood back bar with mirrored shelves of glassware, rows of tumblers, highball glasses, wine glasses and coupes, some with water spots. One bartender in a white shirt and dark waistcoat with a cloth over his shoulder stands facing the back bar, seen from behind at a three-quarter angle, right of the centre of the frame, one hand resting on a row of glasses on the shelf, a tablet in his other hand, counting. On the bar counter: an open cardboard case of new glasses with paper packing, and one broken glass set aside on a folded cloth. On a lower shelf, worn bottles of sparkling water, fruit juices and syrups with plain unprinted labels; no alcohol. Nobody else in the room and no other person in the mirrors. A scratched brass rail, worn wood edges, a ring stain on the counter, warm practical lamps. The lower left of the frame is the calm dark end of the bar counter. Editorial architectural photograph, shot on a full frame camera, 35 mm lens, f/5.6, natural light only with real practical lamps, accurate perspective with slight lens distortion at the edges, subtle film grain, real weather: wet reflections, dust in sunbeams, slightly uneven window brightness, dirt and wear on stone and brass, people mid motion with motion blur on a passing tram or cyclist, candid not posed, no symmetry, no HDR, no glow, no bloom, no oversaturation, no perfect cleanliness, no CGI render look, no stock photo lighting. Avoid: 3D render, CGI, video game, illustration, HDR, bloom, glow, oversharpened, plastic skin, symmetrical, floating objects, duplicated people, extra fingers, text, watermark, logo.
```

- branded bottles made plain [`fal-ai/nano-banana-pro/edit`, request `01a1bcc1-ce40-7c41-9029-bc05034c4752`, from https://v3b.fal.media/files/b/0ab1aee5/m5ZQbX_835l4qVpE82JT__KMX6ZfS2.png]:

```text
Keep this exact photograph and change only these things: the green branded water bottles on the lower shelf become plain clear glass bottles of sparkling water with blank white labels; the juice bottles keep their colour but their labels become plain with no words or pictures; the dark amber and red bottles at the right of that shelf become clear bottles of still water with blank labels, so nothing on the shelf could be mistaken for alcohol; remove the person walking past outside the window so the street outside is empty. Keep the bartender, his pose, his hand on the glasses, the tablet, the back bar and its glassware, the open case of new glasses, the broken glass on its cloth, the brass rail, the worn counter, the light and the colours exactly as they are. Photorealistic, no text anywhere, no logo, no alcohol.
```

- dark bottles on the lowest shelf replaced with cloths and a glass rack [`fal-ai/nano-banana-pro/edit`, request `01a1bcc5-fbe5-7a83-9a5b-2dd1c7a455ee`, from https://v3b.fal.media/files/b/0ab1aef2/SQPPrxcnAEhz3HGl0ZJDs_F1HnV0pN.png]:

```text
Keep this exact photograph and change only the lowest shelf at the bottom left, below the row of water and juice bottles: remove the dark bottles there and put neat stacks of folded white bar cloths and a grey plastic rack of clean upturned glasses in their place. Keep the bartender, his pose, the tablet, the back bar and its glassware, the row of water and juice bottles with blank labels, the open case of new glasses, the broken glass on its cloth, the brass rail, the worn counter, the window, the light and the colours exactly as they are. Photorealistic, no text, no logo, no alcohol.
```

### H4 · `H4.png`

Hold 4, the thriving hotel: H1 turned sunny and busy (9 Nov 2026). Cost $0.15. Final picture: https://v3b.fal.media/files/b/0ab1c6e2/zxVbpufiEupOMqAMqDev0_FmEyO9D9.png (`assets/video/city/v2/A2.png`)

- an edit of H1 [`fal-ai/nano-banana-pro/edit`, request `01a1c068-e02b-74b0-a11c-64d8c7ba04f6`]:

```text
The same photograph from exactly the same camera position, lens and framing, with the same building, neighbours, tram tracks and square, now on a bright sunny late morning: clear blue sky with a few soft clouds, warm sunlight from the left raking across the cream facade with crisp shadows under the balconies, the paving dry. The square is busy and thriving: the brasserie terrace is full of guests at small tables with coffee cups and water glasses, a family walking into the entrance while the doorman holds the door, two plain dark taxis with no lettering waiting near the entrance, two cyclists mid pedal crossing the square, a tram passing along the curved tracks with slight motion blur, the flags lifting in a light breeze, people walking mid stride. Remove all lettering, names, signs and logos everywhere. No alcohol, no bottles. Keep it a real photograph: full frame camera, 35 mm lens, f/5.6, natural light, slight edge distortion, fine film grain, real wear, candid people mid motion, no HDR, no glow, no CGI, no symmetry.
```

### D1 · `D1.png`

The hotel door from a few steps away, the doorman opening it (end of the walk across the square). Cost $0.15. Final picture: https://v3b.fal.media/files/b/0ab1c6ef/Q8wL9PDQT9t0G4uzmGF_P_iECDCUWX.png

- a new view of H1 [`fal-ai/nano-banana-pro/edit`, request `01a1c06a-caf4-7313-b470-b419bc135a04`]:

```text
Using this photograph as the reference for the building, the entrance, the doorman, the weather and the light, show a new view: the camera now stands a few steps in front of the hotel's main entrance, at standing height, slightly off-axis, facing the tall dark glass-and-bronze doors under the slim black steel-and-glass canopy, which fill the centre of the frame, the cream limestone around them. Overcast late afternoon just after rain, wet paving, cool flat light. The doorman in his dark coat holds one door open; through the open door the lobby inside is dim with one warm lamp. A potted plant beside the door, a plain brass plate with no engraving. Editorial architectural photograph, shot on a full frame camera, 35 mm lens, f/5.6, natural light, slight edge distortion, fine film grain, real wear on stone and brass, candid not posed, no HDR, no glow, no CGI, no symmetry. No text, lettering, signage, numbers or logos anywhere.
```

### D2 · `D2.png`

The service corridor to the dry store (start of the walk to hold 2). Cost $0.30. Final picture: https://v3b.fal.media/files/b/0ab1af41/HnHX_aWsjeoUBZBT0hqRs_MAHtb6Dc.png

- a new view of H2 [`fal-ai/nano-banana-pro/edit`, request `01a1bccc-47eb-7ee1-96d4-d9c519dec2b8`, from https://v3b.fal.media/files/b/0ab1aefa/Vvgvmf1gB6Znn5DxUu2xr_i4EFPMIM.png]:

```text
Using this photograph as the reference for the hotel's back-of-house style, colours and light, show a new view: a narrow dim service corridor in the same hotel, plain painted walls with scuffs, a worn floor, and at the far end of the corridor the dry store's door standing half open with cool fluorescent light spilling out across the floor; the rest of the corridor in deep shadow. Camera at standing height looking straight down the corridor, the door in the centre of the frame, most of the frame dark. No people. Editorial architectural photograph, shot on a full frame camera, 35 mm lens, f/5.6, natural light only with real practical lamps, accurate perspective with slight lens distortion at the edges, subtle film grain, real weather: wet reflections, dust in sunbeams, slightly uneven window brightness, dirt and wear on stone and brass, people mid motion with motion blur on a passing tram or cyclist, candid not posed, no symmetry, no HDR, no glow, no bloom, no oversaturation, no perfect cleanliness, no CGI render look, no stock photo lighting. Avoid: 3D render, CGI, video game, illustration, HDR, bloom, glow, oversharpened, plastic skin, symmetrical, floating objects, duplicated people, extra fingers, text, watermark, logo.
```

- the lettered sign on the door removed [`fal-ai/nano-banana-pro/edit`, request `01a1bccd-d69f-70e3-a459-f678af6ef4b1`, from https://v3b.fal.media/files/b/0ab1af36/_deEbUPPiFqzsGmyN6m1G_Y0iAgkgM.png]:

```text
Keep this exact photograph and remove only the small sign with lettering on the dry store's door, so the door is plain painted metal with a few scuffs. Keep the corridor, the light spilling from the dry store, the shelves inside, the walls, the floor, the colours and the framing exactly as they are. Photorealistic, no text anywhere, no logo.
```

### D3 · `D3.png`

The wood-panelled corridor to the bar (start of the walk to hold 3). Cost $0.15. Final picture: https://v3b.fal.media/files/b/0ab1af37/DMrthaK1SS3Ruaff9KsSq_EZxyDDm3.png

- a new view of H3 [`fal-ai/nano-banana-pro/edit`, request `01a1bccc-480c-7323-8bb3-059e647d384b`, from https://v3b.fal.media/files/b/0ab1af0d/-eErVK_rNIHcxJjbmsJ9__wKpIEwiR.png]:

```text
Using this photograph as the reference for the hotel bar's style, colours and light, show a new view: a dim wood-panelled service corridor in the same hotel that leads to the bar. At its far end an open doorway glows with warm lamplight, and through it the dark wood back bar with rows of clean glasses is just visible. The corridor itself is mostly in shadow, its floor worn. Camera at standing height looking straight down the corridor, the doorway in the centre of the frame. No people, no bottles. Editorial architectural photograph, shot on a full frame camera, 35 mm lens, f/5.6, natural light only with real practical lamps, accurate perspective with slight lens distortion at the edges, subtle film grain, real weather: wet reflections, dust in sunbeams, slightly uneven window brightness, dirt and wear on stone and brass, people mid motion with motion blur on a passing tram or cyclist, candid not posed, no symmetry, no HDR, no glow, no bloom, no oversaturation, no perfect cleanliness, no CGI render look, no stock photo lighting. Avoid: 3D render, CGI, video game, illustration, HDR, bloom, glow, oversharpened, plastic skin, symmetrical, floating objects, duplicated people, extra fingers, text, watermark, logo.
```

### D5 · `D5.png`

The lobby doors in bright sunlight (the end of clip E, which is not in the film). Cost $0.15. Final picture: https://v3b.fal.media/files/b/0ab1af37/T_k6RNz6Agj8hl6sCZx69_JeJUCwPx.png

- H3 and H4 as references [`fal-ai/nano-banana-pro/edit`, request `01a1bccc-47f6-7561-95d3-f92eeda29c43`, from https://v3b.fal.media/files/b/0ab1af0d/-eErVK_rNIHcxJjbmsJ9__wKpIEwiR.png, https://v3b.fal.media/files/b/0ab1aef2/iF4X72hq55AHpWfxxzCEb_EEsu3tyo.png]:

```text
Image 1 is the reference for the hotel's interior style, wood, brass and light; image 2 shows the hotel's tall wood-and-glass front doors with the arched window above. Show a new view from inside the hotel lobby: the camera stands a few steps from the front doors at standing height, facing them, the doors in the centre of the frame. Bright late-morning sunlight floods in through the glass; the sunny square outside is overexposed and almost white; the light falls in long bright shapes across a worn marble floor. The lobby around the doors is dim by contrast. No people. Editorial architectural photograph, shot on a full frame camera, 35 mm lens, f/5.6, natural light only with real practical lamps, accurate perspective with slight lens distortion at the edges, subtle film grain, real weather: wet reflections, dust in sunbeams, slightly uneven window brightness, dirt and wear on stone and brass, people mid motion with motion blur on a passing tram or cyclist, candid not posed, no symmetry, no HDR, no glow, no bloom, no oversaturation, no perfect cleanliness, no CGI render look, no stock photo lighting. Avoid: 3D render, CGI, video game, illustration, HDR, bloom, glow, oversharpened, plastic skin, symmetrical, floating objects, duplicated people, extra fingers, text, watermark, logo.
```

### D6 · `D6.png`

A few steps from the sunny entrance, the doorman welcoming a family (start of the pull back to hold 4; only the second half of that clip is in the film). Cost $0.15. Final picture: https://v3b.fal.media/files/b/0ab1c6ef/rCXfd5R8pz3tSNcZcd1c8_lIeKzKJX.png

- a new view of H4 [`fal-ai/nano-banana-pro/edit`, request `01a1c06a-cb30-7e01-bd8f-f6364d955e54`]:

```text
Using this photograph as the reference for the building, the entrance, the people, the weather and the light, show a new view: the camera now stands a few steps in front of the hotel's main entrance on the sunny square, at standing height, slightly off-axis, facing the tall dark glass-and-bronze doors under the slim black steel-and-glass canopy, which fill the centre of the frame, the cream limestone around them warm in the sun. Bright late morning, crisp shadows. The doorman in his dark coat welcomes a family with two children at the open door; the plain pale flags lift above; at the left edge, guests at the busy terrace under the charcoal awnings with coffee cups. A plain brass plate with no engraving. Editorial architectural photograph, shot on a full frame camera, 35 mm lens, f/5.6, natural light, slight edge distortion, fine film grain, real wear on stone and brass, candid people mid motion, no HDR, no glow, no CGI, no symmetry. No text, lettering, signage, numbers or logos anywhere. No alcohol.
```

## The clips

Kling O3 Pro on fal (`fal-ai/kling-video/o3/pro/image-to-video`, $0.14 a second, no sound, `shot_type` customize), 1928 x 1072 at 24 fps. Each prompt is sent as the scene text below, then the style line, then "Avoid: " and the negative list (Kling O3 has no negative-prompt field), exactly as `scenePrompt()` in `scripts/video/brief.ts` builds it. Frame paths are under `assets/video/city/`.

### A · The tired square, then the walk to the door

- File: `assets/video/raw/city/A.mp4`
- Generate: 6 s, $0.84
- Start frame: `assets/video/city/H1.png`
- End frame: `assets/video/city/D1.png`
- fal request: `01a1c06c-1357-7970-895e-3f7eb55c48ec`, result https://v3b.fal.media/files/b/0ab1c709/a_J3xpP3I_WORygqcUUzW_output.mp4
- In the film: Frames 0 to 140: hold 1, then one clean walk to the door (9 Nov 2026; it replaced the first city's A and its retake A2, kept in `assets/video/raw/city/v1-old/`).

```text
One continuous shot. For the first two seconds the camera holds perfectly still on the quiet, rain-wet square in front of the grand hotel: the man with the umbrella walks slowly out of frame at the left and the doorman shifts his weight beside the entrance. Then the camera starts a slow, steady walk across the wet paving, over the curving tram tracks, toward the hotel's entrance under the black glass canopy; every building stays solid and sharp with natural parallax; as it arrives the doorman opens one of the tall dark glass doors onto the dim lobby. No cuts, no dissolves.
```

### B · The service corridor into the dry store

- File: `assets/video/raw/city/B.mp4`
- Generate: 5 s, $0.70
- Start frame: `assets/video/city/D2.png`
- End frame: `assets/video/city/H2.png`
- fal request: `01a1bcce-706b-79c1-9ede-59ffdc0593ab`, result https://v3b.fal.media/files/b/0ab1af5e/dnPf4JlE777mtcpxLSZNE_output.mp4
- In the film: In the film whole; it lands on H2 still moving slightly, and C holds from there.

```text
One continuous shot. The camera walks slowly down the dim service corridor toward the half-open dry store door, passes through it into the dry store and comes to rest facing the chef, who stands at the metal shelving counting stock on his tablet, one hand on a case. For the last second the camera holds still while he counts.
```

### C · Hold 2, then out of the dry store

- File: `assets/video/raw/city/C.mp4`
- Generate: 5 s, $0.70
- Start frame: `assets/video/city/H2.png`
- End frame: `assets/video/city/D3.png`
- fal request: `01a1bccd-d6bb-7ba0-b863-c1afbf25f84a`, result https://v3b.fal.media/files/b/0ab1af5b/lu08zafswpHIkqOhnBZJE_output.mp4
- In the film: Frames 0 to 57 are in the film: hold 2, the chef counting. After that it dissolved the dry store into the corridor instead of moving, so C2 replaces it from frame 58.

```text
One continuous shot. For the first two seconds the camera holds perfectly still in the dry store while the chef taps his tablet and moves his hand to the next case, counting. Then the camera turns slowly away and walks out of the dry store into a dim wood-panelled corridor, toward a doorway glowing with warm lamplight at its far end.
```

### C2 · Backing out through the dry store door (retake)

- File: `assets/video/raw/city/C2.mp4`
- Generate: 4 s, $0.56
- Start frame: `assets/video/city/starts/C2-start.png`
- End frame: none
- fal request: `01a1bcde-888a-70d3-889c-92f82733d1dc`, result https://v3b.fal.media/files/b/0ab1afb8/9u67od_WjMnGfyefdz8u3_output.mp4
- In the film: Starts on frame 58 of C, no end frame. Frames 0 to 51 are in the film; the crossfade into D happens as the door frame passes (the clip goes on into a side street, which is not used).

```text
One continuous shot. The chef keeps counting stock on his tablet beside the trolley while the camera glides slowly backwards out of the dry store and through its doorway into the dim service corridor; the door frame passes close on both sides and the lit dry store shrinks to a bright rectangle in the dark. No cuts, no dissolves.
```

### D · The corridor into the bar

- File: `assets/video/raw/city/D.mp4`
- Generate: 5 s, $0.70
- Start frame: `assets/video/city/D3.png`
- End frame: `assets/video/city/H3.png`
- fal request: `01a1bccd-d712-79b3-a005-5e9d6f88a786`, result https://v3b.fal.media/files/b/0ab1af59/mNOWX0O6F9kY3Qzxl4HpO_output.mp4
- In the film: In the film whole; it lands on H3 still moving slightly, and E holds from there.

```text
One continuous shot. The camera walks slowly along the dim wood-panelled corridor toward the warmly lit doorway, passes through it into the hotel bar and comes to rest facing the back bar, where the bartender counts the rows of clean glasses, one hand on a row, his tablet in the other. For the last second the camera holds still.
```

### E · Hold 3, then toward the light

- File: `assets/video/raw/city/E.mp4`
- Generate: 5 s, $0.70
- Start frame: `assets/video/city/H3.png`
- End frame: `assets/video/city/D5.png`
- fal request: `01a1bccd-d6f3-7062-b115-560b676fcb66`, result https://v3b.fal.media/files/b/0ab1af5a/fYnpwW1rL6mcak5p4FjWv_output.mp4
- In the film: Frames 0 to 31 are in the film: hold 3, the bartender counting. At 1.46 s it cut hard to the lobby doors, so E2 replaces it from frame 32.

```text
One continuous shot. For the first two seconds the camera holds perfectly still in the bar while the bartender touches the glasses in a row and taps the count into his tablet. Then the camera turns slowly away and walks through the lobby toward the tall front doors, bright late-morning sunlight flooding in through the glass.
```

### E2 · From the bar to the sunlit door (retake)

- File: `assets/video/raw/city/E2.mp4`
- Generate: 4 s, $0.56
- Start frame: `assets/video/city/starts/E2-start.png`
- End frame: none
- fal request: `01a1bcde-88a0-7031-b733-f630259b73eb`, result https://v3b.fal.media/files/b/0ab1afb8/yWKo3xgQTpC2HY0zQLThB_output.mp4
- In the film: Starts on frame 32 of E, no end frame. In the film whole; the crossfade into F happens in the sunlight at its end.

```text
One continuous shot. The bartender keeps counting the glasses on his tablet while the camera turns slowly to the right, away from the bar, toward the tall window and glass door flooded with bright late-morning sunlight, and walks toward it until the bright daylight fills the whole frame. No cuts, no dissolves.
```

### F · The pull back across the sunny square

- File: `assets/video/raw/city/F.mp4`
- Generate: 5 s, $0.70
- Start frame: `assets/video/city/D6.png`
- End frame: `assets/video/city/H4.png`
- fal request: `01a1c06c-1369-7fe2-b496-9fa1418f653c`, result https://v3b.fal.media/files/b/0ab1c707/xJq-HndzLtPh5cytkDC8h_output.mp4
- In the film: Frames 60 to 120. Around frames 52 to 58 it morphs the close view of the door into the wide square, so the film enters it at frame 60, crossfading from the sunlit doorway's white frame.

```text
One continuous shot. The camera starts close to the sunny hotel entrance, where the doorman welcomes a family with two children, and glides slowly and steadily backwards across the square, revealing the whole cream stone hotel, the full terrace under the charcoal awnings, two cyclists crossing, a blue and white tram passing on the curved tracks at the left, the pale flags lifting in the breeze; every building stays solid and sharp. For the last second it holds still on the wide view. No cuts, no dissolves.
```

### G · Hold 4, the thriving square

- File: `assets/video/raw/city/G.mp4`
- Generate: 4 s, $0.56
- Start frame: `assets/video/city/H4.png`
- End frame: none
- fal request: `01a1c06c-134d-7a51-8d56-00d41ca29084`, result https://v3b.fal.media/files/b/0ab1c6ff/zyDv2WjMi4A-U7Vkinq5h_output.mp4
- In the film: Frames 0 to 48, the camera locked off. After 2 s the tram covers the terrace and its nose shows the operator's badge, so the rest is not used.

```text
One continuous shot, the camera locked off and perfectly still. Life on the sunny square at a natural pace: guests at the busy terrace talk and lift their coffee cups, more guests sit down at the tables, the family walks into the hotel past the doorman, two cyclists ride across, the blue and white tram slides slowly along the tracks at the left, the two dark taxis wait, the pale flags lift gently in the breeze. No cuts.
```

### Style for every prompt

```text
Editorial architectural photograph, shot on a full frame camera, 35 mm lens, f/5.6, natural light only with real practical lamps, accurate perspective with slight lens distortion at the edges, subtle film grain, real weather: wet reflections, dust in sunbeams, slightly uneven window brightness, dirt and wear on stone and brass, people mid motion with motion blur on a passing tram or cyclist, candid not posed, no symmetry, no HDR, no glow, no bloom, no oversaturation, no perfect cleanliness, no CGI render look, no stock photo lighting.
```

### Negative list

```text
3D render, CGI, video game, illustration, HDR, bloom, glow, oversharpened, plastic skin, symmetrical, floating objects, duplicated people, extra fingers, text, watermark, logo.
```

## After the edit

- The grade of 9 Nov 2026 (`scripts/video/grade.sh`, no regeneration): the owner asked for a cleaner, more contemporary bar
  without changing the room or the bartender. On the upscaled master (`master-16x9-4k-ungraded.mp4` kept): the bar
  stretch (13.25 s to 23.12 s, pieces D, E and E2) about 400 K cooler, shadows lifted a little, reds and yellows 20%
  less saturated, contrast up 6%; the whole film at half that, so the bar does not stand out; eased in and out over
  0.42 s at the doorway cross-fades. Before and after: `assets/review/six-fixes/bar-grade-before-after.jpg`.

- The one upscale: Topaz on fal (`fal-ai/topaz/upscale/video`, Proteus, 2x, H.264), request
  `01a1bcee-792b-7073-b45b-eaf5aaef9d78`, from the 1080p master to `assets/video/master-16x9-4k.mp4` (3840 x 2160).
  The hold pictures on the page keep 71 to 90% of their approved stills' sharpness (Laplacian variance, same size).
- The holds are measured on the master with `scripts/video/motion.mjs`, the phone track is set by eye on the hold
  frames, and the frames are cut by `scripts/video/portrait.sh` and `frames.sh` (`scripts/video/README.md`).
- Sharpness (`scripts/video/sharpness.mjs`, on the frames used): the spec's raw rule, 40% below the sharpest clip,
  passes only the exteriors (A's hold, F, G) and fails A2 (49%) and every interior (B, C, C2, D, E, E2 at 8 to 37%).
  The rule measures content as much as focus: a dim room of flat walls scores far below a sunny square of cobbles,
  and like for like (each clip's hold frame against its own approved still) the interiors keep as much of their still
  as the exteriors (21 to 24% before the upscale, against 17 to 22%).

## Costs (fal, 9 Nov 2026, the new exteriors)

| What | Cost |
| --- | --- |
| Six exterior candidates (three overcast pictures and a sunny edit of each): 6 Nano Banana Pro pictures | $0.90 |
| Doorway stills D1 and D6 | $0.30 |
| Clips A (6 s), F (5 s) and G (4 s) on Kling O3 Pro | $2.10 |
| Total | $3.30 |

The fal account ran out of credits before the Topaz upscale, so `master-16x9-4k.mp4` was assembled locally: the
interiors (new frames 141 to 544) are the previous Topaz master's frames 148 to 551, unchanged, and the new exterior
pieces (frames 0 to 140 and 545 to 651) are the 1080p master scaled 2x with Lanczos. The previous upscale is kept as
`master-16x9-4k-v1-city.mp4`. Desktop frames are 1600 px wide, so only the phone cut of holds 1 and 4 is softer than
it would be after Topaz; a Topaz pass of the 1080p master ($0.27) replaces it once credits are added.

## Costs (fal, 8 Nov 2026, the first city)

| What | Cost |
| --- | --- |
| Façade and hold stills (approved before the clips): 14 Nano Banana Pro pictures at $0.15, and 6 FLUX.2 [pro] pictures at $0.03 a megapixel, all rejected | $2.10 + the FLUX pictures |
| Doorway stills D1, D2, D3, D5, D6, and the D2 sign fix: 6 Nano Banana Pro pictures | $0.90 |
| Clips A to G: 34 s of Kling O3 Pro | $4.76 |
| Retakes A2, C2, E2: 13 s of Kling O3 Pro | $1.82 |
| Topaz upscale: 34 s | $0.34 |
| The round the owner approved up to $8 (doorways, clips, retakes, upscale) | $7.82 |

## Remaking one clip

Remake it from its entry above (same start frame, end frame, length and prompt, sent as `scenePrompt()` builds it),
check it the same way, and rebuild from the edit: `scripts/video/README.md`, One bad clip. A clip that starts from
another clip's frame (A2, C2, E2) needs that frame, which is kept in `assets/video/city/starts/`.

