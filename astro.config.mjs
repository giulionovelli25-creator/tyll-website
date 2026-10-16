import { defineConfig } from 'astro/config';

// Search engines may index only the real production deployment. Vercel sets VERCEL_ENV; elsewhere set
// DEPLOY_ENV=production for the live build. Local and preview builds get noindex everywhere.
const deployEnv = process.env.VERCEL_ENV || process.env.DEPLOY_ENV || 'development';

export default defineConfig({
  vite: { define: { 'import.meta.env.DEPLOY_ENV': JSON.stringify(deployEnv) } },
  site: process.env.PUBLIC_SITE_URL || 'https://tyll.ai',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  build: { format: 'directory' },
  i18n: {
    locales: ['en', 'de', 'ar', 'it'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
});
