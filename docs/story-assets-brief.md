# Assets for the realistic hotel section and the two-numbers card

Written 7 Nov 2026, before any code change. The redesign of "Three places your hotel loses money", "Why it matters, in two
numbers" and the connected-systems diagram needs four raster images that this computer cannot produce: there is no image
generation tool in this session, and the reference mock-up (1536 × 1024, with callout cards over the façade) is too small
and too covered to cut the hotel out cleanly. Once these files are in place, run the redesign brief again.

## Formats, once and for all

Give me one master file per image: PNG, or JPG saved at quality 95 or higher. The site builds AVIF and WebP itself, with
the original as the fallback, through Astro's `<Picture>` (1x and 2x come from the `widths` list), so no WebP is needed.
No transparent backgrounds and no layers: the page feathers the hotel's left edge with a CSS mask, the stage callouts are
HTML overlays positioned in percentages on top of one base image, and the stage-4 glow on the entrance is CSS.

## The four images

| # | File | Use | Size (px) | Aspect |
| --- | --- | --- | --- | --- |
| 1 | `src/assets/story/hotel-dusk.png` | the hotel, right half of the section, bleeding to the edge | 3000 × 2000 | 3:2 |
| 2 | `src/assets/story/scene-stock.jpg` | stage 2, Stock and Waste: inset card beside its callout | 1600 × 1200 | 4:3 |
| 3 | `src/assets/story/scene-purchasing.jpg` | stage 3, Purchasing: inset card beside its callout | 1600 × 1200 | 4:3 |
| 4 | `src/assets/photos/why-plate.jpg` | the $7 card, right side, bleeding to the card edge | 2000 × 1600 | 5:4 |

Composition rules that the layout depends on:

- **1, hotel:** the building fills the right two thirds of the frame, seen from the front left at a slight angle like the
  reference. The left third is open forecourt and a pale, warm, even sky with nothing in it, so it can fade into the page.
  The roof ridge sits a little below the top edge, not cut off. Windows lit, dusk, wet forecourt with soft reflections.
  No people, no cars, no flags, no legible text other than an optional small serif HOTEL sign on the canopy. Nothing
  alcoholic anywhere (Gulf market).
- **2 and 3:** no bottles of wine or spirits, no brand names, no legible labels. Same warm, muted palette as the hotel.
- **4, plate:** the plate sits in the right two thirds; the left third is plain marble, so the card background can fade
  into it. No glassware, no cutlery brands, no text.

## Where they go in the code

```astro
// src/components/home/HotelStory.astro
import hotel from '../../assets/story/hotel-dusk.png';
import sceneStock from '../../assets/story/scene-stock.jpg';
import scenePurchasing from '../../assets/story/scene-purchasing.jpg';
<Picture src={hotel} formats={['avif', 'webp']} fallbackFormat="png" widths={[720, 1080, 1440, 2160]} sizes="(max-width: 900px) 100vw, 56vw" alt="" />

// src/components/home/WhyItMatters.astro
import plate from '../../assets/photos/why-plate.jpg';
<Picture src={plate} formats={['avif', 'webp']} fallbackFormat="jpg" widths={[560, 840, 1120]} sizes="(max-width: 960px) 100vw, 30vw" alt="" />
```

Each file also gets a line in `src/assets/photos/CREDITS.md` (tool and prompt, or the stock-site URL and licence).

## How to produce them

Best: Midjourney v7 (`--style raw`), Flux 1.1 Pro or Flux Kontext (fal.ai, Replicate), or ChatGPT's image model, which
is strong on architecture. Or add the full ElevenLabs connector in Claude's Settings → Connectors → Add custom connector
(`https://api.elevenlabs.io/v1/mcp`); its image models would let Claude generate and iterate on these in the session.

For 2, 3 and 4 a real photo from Pexels or Unsplash is also fine (free licence, no attribution) if it meets the rules
above. The hotel should be generated: a real hotel's façade and name would suggest a customer Tyll does not have.

### Prompts (Midjourney form; drop the flags for other tools and state the size instead)

**1. Hotel**

> Grand European luxury hotel exterior at dusk, five-storey Haussmann-style limestone façade with a dark slate mansard
> roof and dormer windows, tall French windows with wrought-iron balconies, warm light glowing from every window, a black
> entrance canopy with a small serif sign reading HOTEL, clipped trees in planters flanking the entrance, a wet stone
> forecourt with soft reflections, mature trees on the right. The building fills the right two thirds of the frame, seen
> from the front left at a slight angle; the left third is open forecourt under a pale warm overcast sky fading to near
> white, with nothing in it. No people, no cars, no flags, no other text. Architectural visualisation, photorealistic,
> soft shadows, muted warm neutral palette, editorial hospitality photography --ar 3:2 --style raw --v 7 --q 2

**2. Stock and Waste scene**

> Interior of a luxury hotel kitchen dry store, tall stainless-steel shelving stocked with glass jars of grains and
> spices, sacks of flour and rice, wooden crates of fresh vegetables and herbs, a chef in a white jacket and blue gloves
> counting stock on a tablet, warm soft overhead light, shallow depth of field, photorealistic, no alcohol bottles, no
> legible text, muted warm neutral palette --ar 4:3 --style raw --v 7

**3. Purchasing scene**

> A morning delivery at the goods entrance of a luxury hotel, stacked wooden crates of fresh produce on a steel trolley,
> a kitchen manager in a white jacket checking the delivery on a tablet, soft side light through a doorway, limestone
> wall, photorealistic, shallow depth of field, no alcohol, no legible text, muted warm neutral palette --ar 4:3
> --style raw --v 7

**4. Plate**

> A fine-dining plate on a white marble counter in a luxury hotel restaurant, a composed dish with a herb garnish on a
> white porcelain plate placed in the right two thirds of the frame, the left third plain marble, soft window light,
> warm neutral palette, blurred brass and cream interior behind, photorealistic food photography, no glassware, no
> cutlery, no text --ar 5:4 --style raw --v 7
