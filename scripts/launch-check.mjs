// Lists what still has to be supplied or confirmed before the site can go live.
// Reads the same settings the production build uses (.env plus the environment). Exits with 1 while anything
// required is missing, so it can gate a deploy.
import { createServer, loadEnv } from 'vite';

const mode = 'production';
Object.assign(process.env, loadEnv(mode, process.cwd(), 'PUBLIC_'), { ...process.env });

const vite = await createServer({ mode, envPrefix: 'PUBLIC_', logLevel: 'error', appType: 'custom', server: { middlewareMode: true } });
try {
  const { site } = await vite.ssrLoadModule('/src/config/site.ts');
  const { legalMissing } = await vite.ssrLoadModule('/src/config/legal.ts');

  const required = [
    ...legalMissing().map((m) => `Legal: ${m.en}`),
    !site.calendlyUrl && 'Booking: PUBLIC_CALENDLY_URL (the Calendly event to embed)',
    (!site.demoUrl || /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])/i.test(site.demoUrl)) &&
      'Demo: PUBLIC_DEMO_URL (a public demo address; localhost is ignored in production)',
  ].filter(Boolean);
  const optional = [
    !site.social.instagram && 'Footer: PUBLIC_INSTAGRAM_URL (left out of the footer until set)',
    !site.social.linkedin && 'Footer: PUBLIC_LINKEDIN_URL',
    !(site.analytics.provider && site.analytics.id) && 'Analytics: PUBLIC_ANALYTICS_PROVIDER and PUBLIC_ANALYTICS_ID (no statistics until set)',
    !site.metaPixelId && 'Advertising: PUBLIC_META_PIXEL_ID (Meta Pixel off until set)',
  ].filter(Boolean);

  const list = (title, items) => console.log(`\n${title}\n${items.length ? items.map((i) => `  - ${i}`).join('\n') : '  (none)'}`);
  list('Required before going live:', required);
  list('Optional, currently switched off:', optional);
  console.log('\nAlso needs a person: legal review of the Legal Notice and Privacy pages (all four languages), a native-speaker review of the Arabic and Italian text, and owner approval for the deploy.\n');
  process.exitCode = required.length ? 1 : 0;
} finally {
  await vite.close();
}
