import { defineConfig } from 'astro/config';

// Search engines may index only the real production deployment. On Railway, set DEPLOY_ENV=production as a
// variable of the live service (it is read at build time); preview, staging and local builds leave it unset and
// get noindex everywhere plus a robots.txt that disallows crawling. (VERCEL_ENV is still honoured on Vercel.)
const deployEnv = process.env.DEPLOY_ENV || process.env.VERCEL_ENV || 'development';
// The legal pages' "Last updated" date is the day the site is built and deployed
const buildDate = new Date().toISOString().slice(0, 10);

export default defineConfig({
  vite: {
    define: { 'import.meta.env.DEPLOY_ENV': JSON.stringify(deployEnv), 'import.meta.env.BUILD_DATE': JSON.stringify(buildDate) },
  },
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
