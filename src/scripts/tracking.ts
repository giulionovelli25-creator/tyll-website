// Analytics and Meta Pixel, both strictly behind consent.
// - Nothing is requested from Google, Plausible or Meta until the matching consent exists.
// - Withdrawing consent stops further sending at once and removes the provider's cookies.
// - Events carry only where a click happened and the page language: never names, emails or form content.
//
// Events: book_call_click, explore_demo_click, booking_calendar_opened, booking_started, booking_confirmed,
// language_changed, video_play, video_pause, faq_opened, email_click.
// They come from [data-track] clicks or from `tyll:track` events dispatched by components.

import { site } from '../config/site';
import { readConsent, onConsent, type Choice } from './consent';

type Params = Record<string, string>;
type Fbq = ((...a: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue: unknown[]; push?: unknown; loaded?: boolean; version?: string };
type Win = Window & {
  dataLayer?: unknown[];
  gtag?: (...a: unknown[]) => void;
  plausible?: ((name: string, opts?: { props?: Params }) => void) & { q?: unknown[] };
  fbq?: Fbq;
  _fbq?: unknown;
  [key: `ga-disable-${string}`]: boolean;
};
const w = window as unknown as Win;

const analyticsId = site.analytics.provider && site.analytics.id ? site.analytics.id : undefined;
const provider = analyticsId ? site.analytics.provider : undefined;
const pixelId = site.metaPixelId;

let analyticsOn = false;
let pixelOn = false;

const addScript = (src: string, attrs: Record<string, string> = {}) => {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  document.head.append(s);
};

const deleteCookies = (test: RegExp) => {
  const host = location.hostname;
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (!test.test(name)) return;
    domains.forEach((d) => (document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`));
  });
};

function startAnalytics() {
  if (analyticsOn || !analyticsId) return;
  analyticsOn = true;
  if (provider === 'ga4') {
    w[`ga-disable-${analyticsId}`] = false;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
    w.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    w.gtag('js', new Date());
    w.gtag('config', analyticsId);
    addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`);
  } else if (provider === 'plausible') {
    w.plausible = w.plausible || Object.assign((...a: unknown[]) => (w.plausible!.q = w.plausible!.q || []).push(a), {});
    addScript('https://plausible.io/js/script.tagged-events.js', { 'data-domain': analyticsId });
  }
}

function stopAnalytics() {
  if (!analyticsId) return;
  analyticsOn = false;
  if (provider === 'ga4') {
    w[`ga-disable-${analyticsId}`] = true;
    w.gtag?.('consent', 'update', { analytics_storage: 'denied' });
    deleteCookies(/^_ga/);
  }
}

function startPixel() {
  if (pixelOn || !pixelId) return;
  pixelOn = true;
  if (!w.fbq) {
    const fbq = ((...a: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...a);
      else fbq.queue.push(a);
    }) as Fbq;
    fbq.queue = [];
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    w.fbq = fbq;
    w._fbq = fbq;
    addScript('https://connect.facebook.net/en_US/fbevents.js');
    w.fbq('init', pixelId);
  } else {
    w.fbq('consent', 'grant');
  }
  // One page view per page load
  w.fbq('track', 'PageView');
}

function stopPixel() {
  if (!pixelId) return;
  pixelOn = false;
  w.fbq?.('consent', 'revoke');
  deleteCookies(/^_fb[pc]$/);
}

function apply(c: Choice) {
  if (c.analytics) startAnalytics();
  else stopAnalytics();
  if (c.marketing) startPixel();
  else stopPixel();
}

/** Send one event to whichever consented services are running. */
export function track(name: string, params: Params = {}) {
  const p = { language: document.documentElement.lang, ...params };
  if (analyticsOn) {
    if (provider === 'ga4') w.gtag?.('event', name, p);
    else if (provider === 'plausible') w.plausible?.(name, { props: p });
  }
  // Meta receives only the confirmed booking, as its standard "Schedule" conversion
  if (pixelOn && name === 'booking_confirmed') w.fbq?.('track', 'Schedule');
}

let started = false;

export function initTracking() {
  if (started) return;
  started = true;

  const c = readConsent();
  if (c) apply(c);
  onConsent(apply);

  document.addEventListener('click', (e) => {
    const el = (e.target as Element).closest<HTMLElement>('[data-track]');
    if (!el) return;
    const params: Params = {};
    if (el.dataset.trackFrom) params.location = el.dataset.trackFrom;
    if (el.dataset.trackTo) params.target_language = el.dataset.trackTo;
    track(el.dataset.track!, params);
  });
  document.addEventListener('tyll:track', (e) => {
    const { event, ...rest } = (e as CustomEvent<{ event: string } & Params>).detail;
    track(event, rest);
  });
}
