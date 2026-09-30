import { defineConfig } from "@playwright/test";

// One run id for the whole run: workers restart after a failure and must reuse the same test accounts.
process.env.QA_RUN ??= new Date().toISOString().replace(/\D/g, "").slice(8, 14);

// QA E2E configuration. The app must already be running (frontend :3000, API :8080) as documented in the README.
export default defineConfig({
  testDir: "./specs",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 90_000,
  expect: { timeout: 15_000 },
  outputDir: "../evidence/ui/playwright-artifacts",
  reporter: [
    ["list"],
    ["json", { outputFile: "../evidence/ui/playwright-results.json" }],
    ["html", { outputFolder: "../evidence/ui/playwright-report", open: "never" }],
  ],
  use: {
    baseURL: "http://localhost:3000",
    channel: "msedge",
    headless: true,
    viewport: { width: 1440, height: 900 },
    screenshot: "only-on-failure",
    trace: "off",
    actionTimeout: 15_000,
    navigationTimeout: 45_000,
  },
});
