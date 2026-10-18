// Everything that differs between environments comes from PUBLIC_* variables (see .env.example).
// Unset values are undefined, and the components that use them hide themselves instead of linking nowhere.
// The public addresses the owner has approved are built in as defaults, so a build without a .env file (for
// example one made on another computer for Railway) still has the booking calendar, the demo and LinkedIn.
const DEFAULTS = {
  demo: 'https://demo.tyll.ai',
  calendly: 'https://calendly.com/besher-asfari-code/new-meeting',
  linkedin: 'https://www.linkedin.com/company/tyll.ai/',
};

const env = import.meta.env;
const value = (v: string | undefined) => (v && v.trim()) || undefined;

const isLocal = (url: string) => /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:|\/|$)/i.test(url);

// A localhost demo link is fine while developing, never on the public site.
const demoUrl = value(env.PUBLIC_DEMO_URL) ?? DEFAULTS.demo;
if (demoUrl && env.PROD && isLocal(demoUrl)) {
  console.warn('[tyll] PUBLIC_DEMO_URL points to localhost; demo buttons are hidden in this build.');
}

export const site = {
  url: value(env.PUBLIC_SITE_URL) ?? 'https://tyll.ai',
  /** True only for the production deployment (see astro.config.mjs). Everything else is noindex. */
  indexable: env.DEPLOY_ENV === 'production',
  email: 'info@tyll.ai',
  demoUrl: demoUrl && !(env.PROD && isLocal(demoUrl)) ? demoUrl : undefined,
  calendlyUrl: value(env.PUBLIC_CALENDLY_URL) ?? DEFAULTS.calendly,
  social: {
    linkedin: value(env.PUBLIC_LINKEDIN_URL) ?? DEFAULTS.linkedin,
    instagram: value(env.PUBLIC_INSTAGRAM_URL),
  },
  analytics: {
    provider: value(env.PUBLIC_ANALYTICS_PROVIDER) as 'plausible' | 'ga4' | undefined,
    id: value(env.PUBLIC_ANALYTICS_ID),
  },
  metaPixelId: value(env.PUBLIC_META_PIXEL_ID),
};
