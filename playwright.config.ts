// The site's browser tests (tests/site.spec.ts), run against the dev server on http://localhost:4321.
// Chromium and WebKit, each at 375 × 812, 768 × 1024, 1280 × 720, 1440 × 900 and 1920 × 1080 (round 4). The Chromium
// runs use the installed Google Chrome (`channel: 'chrome'`), because Playwright's own Chromium cannot play H.264.
//   npx playwright test                 all ten
//   npx playwright test --project=chromium-1280
import { defineConfig, devices } from '@playwright/test';

const sizes = [
  [375, 812],
  [768, 1024],
  [1280, 720],
  [1440, 900],
  [1920, 1080],
] as const;
const browsers = [
  { name: 'chromium', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
];

export default defineConfig({
  testDir: 'tests',
  testMatch: /.*\.spec\.ts/,
  globalSetup: './tests/global-setup.ts',
  timeout: 90_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  workers: 4,
  reporter: [['list'], ['json', { outputFile: 'test-results/results.json' }]],
  use: { baseURL: 'http://localhost:4321', trace: 'retain-on-failure' },
  webServer: { command: 'npm run dev', url: 'http://localhost:4321/en/', reuseExistingServer: true, timeout: 120_000 },
  projects: browsers.flatMap((b) =>
    sizes.map(([w, h]) => ({
      name: `${b.name}-${w}`,
      use: { ...b.use, viewport: { width: w, height: h }, isMobile: false, hasTouch: w < 600 },
      metadata: { width: w, height: h },
    })),
  ),
});
