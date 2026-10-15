// Everything that differs between environments comes from PUBLIC_* variables (see .env.example).
// Unset values are undefined, and the components that use them hide themselves instead of linking nowhere.

const env = import.meta.env;
const value = (v: string | undefined) => (v && v.trim()) || undefined;

const isLocal = (url: string) => /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:|\/|$)/i.test(url);

// A localhost demo link is fine while developing, never on the public site.
const demoUrl = value(env.PUBLIC_DEMO_URL);
if (demoUrl && env.PROD && isLocal(demoUrl)) {
  console.warn('[tyll] PUBLIC_DEMO_URL points to localhost; demo buttons are hidden in this build.');
}

export const site = {
  url: value(env.PUBLIC_SITE_URL) ?? 'https://tyll.ai',
  /** True only for the production deployment (see astro.config.mjs). Everything else is noindex. */
  indexable: env.DEPLOY_ENV === 'production',
  email: 'info@tyll.ai',
  demoUrl: demoUrl && !(env.PROD && isLocal(demoUrl)) ? demoUrl : undefined,
  calendlyUrl: value(env.PUBLIC_CALENDLY_URL),
  social: {
    linkedin: value(env.PUBLIC_LINKEDIN_URL),
    instagram: value(env.PUBLIC_INSTAGRAM_URL),
  },
  analytics: {
    provider: value(env.PUBLIC_ANALYTICS_PROVIDER) as 'plausible' | 'ga4' | undefined,
    id: value(env.PUBLIC_ANALYTICS_ID),
  },
  metaPixelId: value(env.PUBLIC_META_PIXEL_ID),
};
