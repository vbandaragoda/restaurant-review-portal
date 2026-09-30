import AxeBuilder from "@axe-core/playwright";
import { expect, Page, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { apiRegister, EVIDENCE, log, loginAdmin, loginOk, RUN, shot } from "./helpers";

const viewports = { mobile: { width: 375, height: 812 }, tablet: { width: 768, height: 1024 }, desktop: { width: 1440, height: 900 } };
const pages = [
  ["home", "/"], ["restaurants", "/restaurants"], ["restaurant-details", "/restaurants/ministry-of-crab"],
  ["dish-details", "/dishes/chilli-crab"], ["login", "/login"], ["signup", "/signup"],
] as const;

async function settle(page: Page) {
  await page.waitForLoadState("networkidle");
  await expect(page.getByText(/Loading/)).toHaveCount(0);
}

async function overflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
}

// ------------------------------------------------------------------------------------------------ responsive (BB-18)
for (const [vpName, vp] of Object.entries(viewports)) {
  test(`BB-18 responsive layout at ${vpName} ${vp.width}x${vp.height}: no horizontal overflow, content visible`, async ({ page }) => {
    await page.setViewportSize(vp);
    const results: string[] = [];
    for (const [name, url] of pages) {
      await page.goto(url);
      await settle(page);
      const ov = await overflow(page);
      await expect(page.locator("h1").filter({ visible: true }).first()).toBeVisible();
      results.push(`${name}: horizontal overflow=${ov}px`);
      await shot(page, "ui/responsive", `BB-18-${vpName}-${name}`);
      expect.soft(ov, `${name} must not scroll horizontally at ${vpName}`).toBeLessThanOrEqual(0);
    }
    log(`BB-18-${vpName}`, results.join("; "));
  });
}

test("BB-18b mobile: bottom navigation is present and search works", async ({ page }) => {
  await page.setViewportSize(viewports.mobile);
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(nav).toBeVisible();
  await page.locator("#mobile-search").fill("kandy");
  await page.locator("#mobile-search").press("Enter");
  await expect(page).toHaveURL(/\/restaurants\?q=kandy/);
  await expect(page.getByText("2 restaurants found").or(page.getByText(/\d+ restaurants found/))).toBeVisible();
});

test("BB-18c mobile: restaurant filters are available", async ({ page }) => {
  await page.setViewportSize(viewports.mobile);
  await page.goto("/restaurants");
  await settle(page);
  const visibleFilterControls = await page.getByRole("checkbox").filter({ visible: true }).count();
  const applyVisible = await page.getByRole("button", { name: "Apply Filters" }).isVisible();
  log("BB-18c", `mobile visible filter checkboxes=${visibleFilterControls}; Apply Filters visible=${applyVisible}`);
  await shot(page, "ui/responsive", "BB-18c-mobile-restaurants-no-filters", false);
  expect(visibleFilterControls + (applyVisible ? 1 : 0), "dietary/location filters should be usable on mobile").toBeGreaterThan(0);
});

test("BB-18d mobile: profile, review form and admin remain usable", async ({ page }) => {
  await page.setViewportSize(viewports.mobile);
  const email = `qa.ui.mobile.${RUN}@tastelanka.test`;
  await apiRegister("QA Mobile", email);
  await loginOk(page, email);
  await settle(page);
  expect(await overflow(page)).toBeLessThanOrEqual(0);
  await shot(page, "ui/responsive", "BB-18d-mobile-profile");
  await page.goto("/reviews/new?restaurant=nuga-gama");
  await settle(page);
  await expect(page.getByRole("button", { name: "Submit Review" })).toBeVisible();
  expect(await overflow(page)).toBeLessThanOrEqual(0);
  await shot(page, "ui/responsive", "BB-18d-mobile-review-form");
  await page.evaluate(() => localStorage.clear());
  await loginAdmin(page);
  await page.goto("/admin/restaurants");
  await settle(page);
  const ov = await overflow(page);
  await shot(page, "ui/responsive", "BB-18d-mobile-admin-restaurants");
  log("BB-18d", `mobile admin restaurants overflow=${ov}px`);
  expect(ov).toBeLessThanOrEqual(0);
});

// ------------------------------------------------------------------------------------------------ accessibility (BB-20)
const a11yPages = [...pages, ["review-form", "/reviews/new?restaurant=nuga-gama"], ["profile", "/profile"], ["admin-dashboard", "/admin"], ["admin-reviews", "/admin/reviews"]] as const;

test("BB-20a automated accessibility scan (axe-core, WCAG 2.1 A/AA) of key pages", async ({ page }) => {
  const summary: Record<string, unknown>[] = [];
  const email = `qa.ui.a11y.${RUN}@tastelanka.test`;
  await apiRegister("QA A11y", email);
  for (const [name, url] of a11yPages) {
    if (name === "review-form") await loginOk(page, email);
    if (name === "admin-dashboard") { await page.evaluate(() => localStorage.clear()); await loginAdmin(page); }
    await page.goto(url);
    await settle(page);
    const res = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    for (const v of res.violations) summary.push({ page: name, id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length, sample: v.nodes[0]?.target.join(" ") });
  }
  fs.writeFileSync(path.join(EVIDENCE, "ui", "BB-20a-axe-violations.json"), JSON.stringify(summary, null, 2));
  const serious = summary.filter((v) => v.impact === "serious" || v.impact === "critical");
  log("BB-20a", `axe violations total=${summary.length}; serious/critical=${serious.length}; rules=${[...new Set(summary.map((v) => `${v.id}(${v.impact})`))].join(", ")}`);
  expect(serious, "no serious/critical WCAG A/AA violations").toEqual([]);
});

test("BB-20b keyboard-only login: fields reachable by Tab and form submits with Enter", async ({ page }) => {
  const email = `qa.ui.kbd.${RUN}@tastelanka.test`;
  await apiRegister("QA Keyboard", email);
  await page.goto("/login");
  const order: string[] = [];
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Tab");
    order.push(await page.evaluate(() => { const el = document.activeElement as HTMLElement; return `${el.tagName}:${el.getAttribute("type") ?? ""}:${(el.textContent || el.getAttribute("placeholder") || "").trim().slice(0, 20)}`; }));
  }
  log("BB-20b", `tab order: ${order.join(" | ")}`);
  await page.getByLabel("Email").focus();
  await page.keyboard.type(email);
  await page.keyboard.press("Tab");
  await page.keyboard.type("QaUser#2026pw");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/profile/);
  expect(order.some((o) => o.startsWith("INPUT:email"))).toBe(true);
  expect(order.some((o) => o.startsWith("INPUT:password"))).toBe(true);
});

test("BB-20c focus is visibly indicated on interactive elements", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").focus();
  const inputStyle = await page.getByLabel("Email").evaluate((el) => { const s = getComputedStyle(el); return `${s.borderColor}|${s.outlineStyle}|${s.boxShadow}`; });
  await page.getByRole("button", { name: "Log In" }).focus();
  const btn = await page.getByRole("button", { name: "Log In" }).evaluate((el) => { const s = getComputedStyle(el); return `${s.outlineStyle}|${s.outlineWidth}|${s.boxShadow}`; });
  log("BB-20c", `focused email input: ${inputStyle}; focused Log In button: ${btn}`);
  await shot(page, "ui", "BB-20c-focus-indicator-login-button", false);
  expect(btn.startsWith("none|") && btn.endsWith("none"), "focused button must show an outline or ring").toBe(false);
});

test("BB-20d rating star buttons expose accessible names and selected state", async ({ page }) => {
  const email = `qa.ui.stars.${RUN}@tastelanka.test`;
  await apiRegister("QA Stars", email);
  await loginOk(page, email);
  await page.goto("/reviews/new?restaurant=nuga-gama");
  await settle(page);
  const names = await page.locator("fieldset").first().getByRole("button").evaluateAll((els) =>
    els.map((e) => `${e.getAttribute("aria-label") ?? e.textContent}|pressed=${e.getAttribute("aria-pressed")}`));
  log("BB-20d", `food-quality star buttons: ${names.join(", ")}`);
  expect(names.every((n) => /[1-5]/.test(n.split("|")[0])), "each star should be announced with its value").toBe(true);
});

test("BB-20e search and filter inputs have programmatic labels", async ({ page }) => {
  await page.goto("/restaurants");
  await settle(page);
  const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input:not([type=hidden]), select, textarea")]
    .filter((el) => !(el as HTMLInputElement).labels?.length && !el.getAttribute("aria-label") && !el.getAttribute("aria-labelledby"))
    .map((el) => `${el.tagName.toLowerCase()}[${el.getAttribute("placeholder") ?? el.getAttribute("type") ?? ""}]`));
  log("BB-20e", `unlabeled controls on /restaurants: ${unlabeled.join(", ") || "none"}`);
  expect(unlabeled).toEqual([]);
});

// ------------------------------------------------------------------------------------------------ multilingual (BB-19)
test("BB-19a approved Sinhala and Tamil reviews display correctly with Unicode fonts", async ({ page }) => {
  await page.goto("/restaurants/ministry-of-crab");
  await settle(page);
  const si = page.getByText("රසවත් කකුළුවන් කෑම. සේවය ඉතා හොඳයි.");
  const ta = page.getByText("மிகவும் சுவையான உணவு. சேவை நன்றாக இருந்தது.");
  await expect(si).toBeVisible();
  await expect(ta).toBeVisible();
  await si.scrollIntoViewIfNeeded();
  const fonts = await si.evaluate((el) => getComputedStyle(el).fontFamily);
  const glyphs = await page.evaluate(async () => ({ si: document.fonts.check("16px 'Noto Sans Sinhala'", "ක"), loaded: [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family) }));
  log("BB-19a", `font-family=${fonts}; loaded fonts=${[...new Set(glyphs.loaded)].join(", ")}`);
  await shot(page, "ui", "BB-19a-sinhala-tamil-reviews");
  expect(fonts.toLowerCase()).toContain("sinhala");
});

test("BB-19b customer can write a review in Sinhala and in Tamil via the language selector", async ({ page }) => {
  const email = `qa.ui.lang.${RUN}@tastelanka.test`;
  await apiRegister("QA Language", email);
  await loginOk(page, email);
  for (const [button, text] of [["සිංහල", "ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි."], ["தமிழ்", "அருமையான உணவு, மீண்டும் வருவேன்."]] as const) {
    await page.goto("/reviews/new?restaurant=nuga-gama");
    await settle(page);
    await page.getByRole("button", { name: button }).click();
    await page.getByLabel("Review").fill(text);
    await page.getByRole("button", { name: "Submit Review" }).click();
    await expect(page.getByText("Thank you. Your review is pending moderator approval.")).toBeVisible();
  }
  await page.goto("/profile");
  await expect(page.getByText("ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි.")).toBeVisible();
  await expect(page.getByText("அருமையான உணவு, மீண்டும் வருவேன்.")).toBeVisible();
  await shot(page, "ui", "BB-19b-sinhala-tamil-reviews-submitted-profile");
});

test("BB-19c interface language can be switched to Sinhala / Tamil", async ({ page }) => {
  await page.goto("/");
  await settle(page);
  const switcher = await page.locator("select, button, a").filter({ hasText: /^(සිංහල|தமிழ்|SI|TA|Language)$/ }).count();
  const htmlLang = await page.evaluate(() => document.documentElement.lang);
  log("BB-19c", `language switch controls on home page=${switcher}; <html lang>=${htmlLang}`);
  expect(switcher, "a UI language selector (EN/SI/TA)").toBeGreaterThan(0);
});

// ------------------------------------------------------------------------------------------------ UI performance (dev server)
test("PERF-UI page load timings (Next.js dev server; indicative only)", async ({ page }) => {
  const rows: string[] = ["page,url,domContentLoadedMs,loadMs,contentReadyMs"];
  for (const [name, url] of [["home", "/"], ["restaurants", "/restaurants"], ["restaurant-details", "/restaurants/ministry-of-crab"], ["search", "/restaurants?q=crab"]] as const) {
    await page.goto(url); await settle(page); // warm (dev compile)
    const t0 = Date.now();
    await page.goto(url);
    await expect(page.locator("h1").first()).toBeVisible();
    await settle(page);
    const ready = Date.now() - t0;
    const nav = await page.evaluate(() => { const n = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming; return [Math.round(n.domContentLoadedEventEnd), Math.round(n.loadEventEnd)]; });
    rows.push(`${name},${url},${nav[0]},${nav[1]},${ready}`);
  }
  fs.mkdirSync(path.join(EVIDENCE, "performance"), { recursive: true });
  fs.writeFileSync(path.join(EVIDENCE, "performance", "PERF-UI-page-load.csv"), rows.join("\n") + "\n");
  log("PERF-UI", rows.join(" ; "));
});
