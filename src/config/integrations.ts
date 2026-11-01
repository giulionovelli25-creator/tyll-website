// The point-of-sale systems Tyll works with: the "Works with your existing systems" row on the homepage and the
// POS list in the free report form read from here. Add or remove entries freely.
// `logo` is optional. Until an official logo file is added (import it from src/assets/logos/ and set `logo`),
// the system's name is shown as text in the same place. Use only logos you are allowed to show.
import type { ImageMetadata } from 'astro';

export type Integration = { name: string; logo?: ImageMetadata };

export const integrations: Integration[] = [
  { name: 'Lightspeed' }, // TODO: official logo
  { name: 'Oracle MICROS' }, // TODO: official logo
];
