// The visitor's cookie choice. Stored in localStorage as "tyll-consent" (described in the privacy policy),
// kept for twelve months, then asked again. Nothing optional runs until a choice says so.

export type Choice = { analytics: boolean; marketing: boolean };
type Stored = Choice & { v: number; date: string };

const KEY = 'tyll-consent';
const VERSION = 1;
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export function readConsent(): Choice | null {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Stored | null;
    if (!s || s.v !== VERSION || Date.now() - Date.parse(s.date) > MAX_AGE_MS) return null;
    return { analytics: !!s.analytics, marketing: !!s.marketing };
  } catch {
    return null;
  }
}

export function saveConsent(choice: Choice) {
  const stored: Stored = { v: VERSION, date: new Date().toISOString(), ...choice };
  try {
    localStorage.setItem(KEY, JSON.stringify(stored));
  } catch {
    // Private mode or blocked storage: the choice still applies for this page view.
  }
  document.dispatchEvent(new CustomEvent<Choice>('tyll:consent', { detail: choice }));
}

export function onConsent(cb: (c: Choice) => void) {
  document.addEventListener('tyll:consent', (e) => cb((e as CustomEvent<Choice>).detail));
}
