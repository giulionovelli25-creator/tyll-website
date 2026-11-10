// The systems Tyll can read from: the logos in the homepage band, and the quick choices in the free report form.
// Listing a name says Tyll can connect to it, so keep this to systems you are willing to connect for a customer.

/** One logo in the homepage band. Files are the makers' own, untouched; sources are in public/logos/integrations/SOURCES.md. */
export type IntegrationLogo = {
  /** The full product name, used as the alt text */
  name: string;
  /** File in public/logos/integrations/ */
  file: string;
  category: 'pms' | 'pos' | 'payments';
  /** Height of the visible mark in px on desktop */
  height: number;
  /** Width divided by height of the whole file */
  aspect: number;
  /** Empty margin inside the file as fractions of its size: top, right, bottom, left */
  clear?: [number, number, number, number];
  /** Product name set in the site's type beside a company logo */
  text?: string;
  /** The maker publishes this one in white only */
  whiteFile?: boolean;
};

export const logos: IntegrationLogo[] = [
  { name: 'Oracle OPERA', file: 'oracle.svg', category: 'pms', height: 28, aspect: 231 / 30, text: 'OPERA' },
  { name: 'Oracle MICROS Simphony', file: 'oracle.svg', category: 'pos', height: 28, aspect: 231 / 30, text: 'MICROS Simphony' },
  { name: 'Mews', file: 'mews.svg', category: 'pms', height: 28, aspect: 1920 / 1080, clear: [0.4269, 0.2208, 0.4278, 0.2203] },
  { name: 'apaleo', file: 'apaleo.png', category: 'pms', height: 32, aspect: 829 / 210 },
  { name: 'Infor HMS', file: 'infor.svg', category: 'pms', height: 32, aspect: 83 / 32, text: 'HMS' },
  { name: 'IDS Next', file: 'ids-next.png', category: 'pms', height: 32, aspect: 1236 / 312 },
  { name: 'Shiji Infrasys', file: 'infrasys-pos.svg', category: 'pos', height: 34, aspect: 485 / 102, whiteFile: true },
  { name: 'Lightspeed', file: 'lightspeed.svg', category: 'pos', height: 32, aspect: 130 / 31, clear: [0, 0.0154, 0.0333, 0.0154] },
  { name: 'SumUp', file: 'sumup.svg', category: 'payments', height: 32, aspect: 1188 / 500, clear: [0.25, 0.06, 0.25, 0.105] },
  // Added 9 Nov 2026 at the owner's request: the other connected systems, from each maker's own website (SOURCES.md)
  { name: 'Cloudbeds', file: 'cloudbeds.svg', category: 'pms', height: 28, aspect: 240 / 35 },
  { name: 'Foodics', file: 'foodics.svg', category: 'pos', height: 24, aspect: 194 / 26 },
  { name: 'RoomRaccoon', file: 'roomraccoon.svg', category: 'pms', height: 34, aspect: 1514 / 216 },
  { name: 'NCR Aloha', file: 'ncr-voyix.svg', category: 'pos', height: 22, aspect: 142 / 20, text: 'Aloha', whiteFile: true },
  { name: 'Little Hotelier', file: 'little-hotelier.svg', category: 'pms', height: 38, aspect: 659 / 145 },
  { name: 'Syrve', file: 'syrve.svg', category: 'pos', height: 30, aspect: 86 / 26, whiteFile: true },
  { name: 'Zonal', file: 'zonal.svg', category: 'pos', height: 30, aspect: 567 / 170, clear: [0.0308, 0.0101, 0.0264, 0.0137] },
  { name: 'Eats365', file: 'eats365.svg', category: 'pos', height: 48, aspect: 90 / 46 },
  { name: 'Restroworks', file: 'restroworks.svg', category: 'pos', height: 28, aspect: 177 / 25 },
  { name: 'orderbird', file: 'orderbird.svg', category: 'pos', height: 32, aspect: 181 / 31, clear: [0, 0.0925, 0.0081, 0.0829] },
  { name: 'StoreHub', file: 'storehub.png', category: 'pos', height: 26, aspect: 1410 / 210 },
  { name: 'Qashier', file: 'qashier.webp', category: 'pos', height: 28, aspect: 2560 / 496, whiteFile: true },
];

/** The file's size and the negative margins that take its empty space out of the layout, in px on desktop. */
export function logoBox({ height, aspect, clear = [0, 0, 0, 0] }: IntegrationLogo) {
  const [top, right, bottom, left] = clear;
  const h = height / (1 - top - bottom);
  const w = h * aspect;
  const px = (n: number) => +n.toFixed(2);
  return { width: px(w), height: px(h), top: px(-top * h), right: px(-right * w), bottom: px(-bottom * h), left: px(-left * w) };
}

// `featured` POS systems are offered as quick choices in the free report form (with "Other"). Researched for the Gulf
// (Dubai), Singapore and Europe on 1 Nov 2026 from public vendor lists and market guides.

export type Integration = { name: string; type: 'pos' | 'pms'; featured?: boolean };

export const integrations: Integration[] = [
  // Global and enterprise hotels
  { name: 'Oracle MICROS', type: 'pos', featured: true },
  { name: 'Oracle OPERA', type: 'pms' },
  { name: 'Lightspeed', type: 'pos', featured: true },
  { name: 'Mews', type: 'pms' },
  // Gulf and Middle East
  { name: 'Foodics', type: 'pos', featured: true },
  { name: 'Cloudbeds', type: 'pms' },
  { name: 'Sapaad', type: 'pos' },
  { name: 'Infor HMS', type: 'pms' },
  { name: 'Syrve', type: 'pos' },
  { name: 'IDS Next', type: 'pms' },
  { name: 'Restroworks', type: 'pos' },
  // Singapore and Asia Pacific
  { name: 'Eats365', type: 'pos' },
  { name: 'Shiji', type: 'pms' },
  { name: 'Qashier', type: 'pos' },
  { name: 'eZee', type: 'pms' },
  { name: 'StoreHub', type: 'pos' },
  { name: 'Little Hotelier', type: 'pms' },
  // Europe
  { name: 'orderbird', type: 'pos' },
  { name: 'protel', type: 'pms' },
  { name: 'Zonal', type: 'pos' },
  { name: 'apaleo', type: 'pms' },
  { name: 'SumUp', type: 'pos' },
  { name: 'Guestline', type: 'pms' },
  { name: 'NCR Aloha', type: 'pos' },
  { name: 'RoomRaccoon', type: 'pms' },
];
