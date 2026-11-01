// The POS and PMS systems shown in the moving "Works with your existing systems" banner. Researched for the Gulf
// (Dubai), Singapore and Europe on 1 Nov 2026 from public vendor lists and market guides. Add or remove entries here.
// Listing a name says Tyll can connect to it, so keep this list to systems you are willing to connect for a customer.
// `featured` POS systems are also offered as quick choices in the free report form (with "Other").

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
