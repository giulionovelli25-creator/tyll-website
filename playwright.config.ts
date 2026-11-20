// The site's browser tests (tests/site.spec.ts), run against the dev server on http://localhost:4321.
// Chromium and WebKit, each at 375, 768 and 1280 px wide. The Chromium runs use the installed Google Chrome
// (`channel: 'chrome'`), because Playwright's own Chromium cannot play the H.264 films.
//   npx playwright test                 all six
//   npx playwright test --project=chromium-1280
import { defineConfig, devices } from '@playwright/test';

const widths = [375, 768, 1280] as const;
const browsers = [
  { name: 'chromium', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
];

export default defineConfig({
  testDir: 'tests',
  testMatch: /.*\.spec\.ts/,
  timeout: 90_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  workers: 4,
  reporter: [['list'], ['json', { outputFile: 'test-results/results.json' }]],
  use: { baseURL: 'http://localhost:4321', trace: 'retain-on-failure' },
  webServer: { command: 'npm run dev', url: 'http://localhost:4321/en/', reuseExistingServer: true, timeout: 120_000 },
  projects: browsers.flatMap((b) =>
    widths.map((w) => ({
      name: `${b.name}-${w}`,
      use: { ...b.use, viewport: { width: w, height: w < 600 ? 812 : 900 }, isMobile: false, hasTouch: w < 600 },
      metadata: { width: w },
    })),
  ),
});
