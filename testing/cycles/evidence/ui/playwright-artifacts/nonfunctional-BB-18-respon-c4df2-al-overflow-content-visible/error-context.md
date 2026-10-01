# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nonfunctional.spec.ts >> BB-18 responsive layout at tablet 768x1024: no horizontal overflow, content visible
- Location: specs\nonfunctional.spec.ts:24:7

# Error details

```
Error: restaurants must not scroll horizontally at tablet

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 0
Received:    153
```

# Page snapshot

```yaml
- generic [active] [ref=f5e1]:
  - main [ref=f5e2]:
    - generic [ref=f5e3]:
      - generic [ref=f5e4]:
        - link "‹" [ref=f5e5] [cursor=pointer]:
          - /url: /login
        - heading "Create Account" [level=1] [ref=f5e6]
      - heading "Join TasteLanka" [level=2] [ref=f5e7]
      - paragraph [ref=f5e8]: Create an account to review and comment.
      - generic [ref=f5e9]:
        - generic [ref=f5e10]:
          - text: Full name
          - textbox "Full name" [ref=f5e11]:
            - /placeholder: Amal Perera
        - generic [ref=f5e12]:
          - text: Email
          - textbox "Email" [ref=f5e13]:
            - /placeholder: amal@example.com
        - generic [ref=f5e14]:
          - text: Password
          - textbox "Password" [ref=f5e15]:
            - /placeholder: ••••••••
        - generic [ref=f5e16]:
          - text: Confirm password
          - textbox "Confirm password" [ref=f5e17]:
            - /placeholder: ••••••••
        - button "Create Account" [ref=f5e18]
      - paragraph [ref=f5e19]:
        - text: Already have an account?
        - link "Log in" [ref=f5e20] [cursor=pointer]:
          - /url: /login
      - generic [ref=f5e21]: English, Sinhala and Tamil review text supported.
  - button "Open Next.js Dev Tools" [ref=f5e27] [cursor=pointer]
  - alert [ref=f5e31]
```

# Test source

```ts
  1   | import AxeBuilder from "@axe-core/playwright";
  2   | import { expect, Page, test } from "@playwright/test";
  3   | import fs from "node:fs";
  4   | import path from "node:path";
  5   | import { apiRegister, EVIDENCE, log, loginAdmin, loginOk, RUN, shot } from "./helpers";
  6   | 
  7   | const viewports = { mobile: { width: 375, height: 812 }, tablet: { width: 768, height: 1024 }, desktop: { width: 1440, height: 900 } };
  8   | const pages = [
  9   |   ["home", "/"], ["restaurants", "/restaurants"], ["restaurant-details", "/restaurants/ministry-of-crab"],
  10  |   ["dish-details", "/dishes/chilli-crab"], ["login", "/login"], ["signup", "/signup"],
  11  | ] as const;
  12  | 
  13  | async function settle(page: Page) {
  14  |   await page.waitForLoadState("networkidle");
  15  |   await expect(page.getByText(/Loading/)).toHaveCount(0);
  16  | }
  17  | 
  18  | async function overflow(page: Page) {
  19  |   return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  20  | }
  21  | 
  22  | // ------------------------------------------------------------------------------------------------ responsive (BB-18)
  23  | for (const [vpName, vp] of Object.entries(viewports)) {
  24  |   test(`BB-18 responsive layout at ${vpName} ${vp.width}x${vp.height}: no horizontal overflow, content visible`, async ({ page }) => {
  25  |     await page.setViewportSize(vp);
  26  |     const results: string[] = [];
  27  |     for (const [name, url] of pages) {
  28  |       await page.goto(url);
  29  |       await settle(page);
  30  |       const ov = await overflow(page);
  31  |       await expect(page.locator("h1").filter({ visible: true }).first()).toBeVisible();
  32  |       results.push(`${name}: horizontal overflow=${ov}px`);
  33  |       await shot(page, "ui/responsive", `BB-18-${vpName}-${name}`);
> 34  |       expect.soft(ov, `${name} must not scroll horizontally at ${vpName}`).toBeLessThanOrEqual(0);
      |                                                                            ^ Error: restaurants must not scroll horizontally at tablet
  35  |     }
  36  |     log(`BB-18-${vpName}`, results.join("; "));
  37  |   });
  38  | }
  39  | 
  40  | test("BB-18b mobile: bottom navigation is present and search works", async ({ page }) => {
  41  |   await page.setViewportSize(viewports.mobile);
  42  |   await page.goto("/");
  43  |   const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  44  |   await expect(nav).toBeVisible();
  45  |   await page.locator("#mobile-search").fill("kandy");
  46  |   await page.locator("#mobile-search").press("Enter");
  47  |   await expect(page).toHaveURL(/\/restaurants\?q=kandy/);
  48  |   await expect(page.getByText("2 restaurants found").or(page.getByText(/\d+ restaurants found/))).toBeVisible();
  49  | });
  50  | 
  51  | test("BB-18c mobile: restaurant filters are available", async ({ page }) => {
  52  |   await page.setViewportSize(viewports.mobile);
  53  |   await page.goto("/restaurants");
  54  |   await settle(page);
  55  |   const visibleFilterControls = await page.getByRole("checkbox").filter({ visible: true }).count();
  56  |   const applyVisible = await page.getByRole("button", { name: "Apply Filters" }).isVisible();
  57  |   log("BB-18c", `mobile visible filter checkboxes=${visibleFilterControls}; Apply Filters visible=${applyVisible}`);
  58  |   await shot(page, "ui/responsive", "BB-18c-mobile-restaurants-no-filters", false);
  59  |   expect(visibleFilterControls + (applyVisible ? 1 : 0), "dietary/location filters should be usable on mobile").toBeGreaterThan(0);
  60  | });
  61  | 
  62  | test("BB-18d mobile: profile, review form and admin remain usable", async ({ page }) => {
  63  |   await page.setViewportSize(viewports.mobile);
  64  |   const email = `qa.ui.mobile.${RUN}@tastelanka.test`;
  65  |   await apiRegister("QA Mobile", email);
  66  |   await loginOk(page, email);
  67  |   await settle(page);
  68  |   expect(await overflow(page)).toBeLessThanOrEqual(0);
  69  |   await shot(page, "ui/responsive", "BB-18d-mobile-profile");
  70  |   await page.goto("/reviews/new?restaurant=nuga-gama");
  71  |   await settle(page);
  72  |   await expect(page.getByRole("button", { name: "Submit Review" })).toBeVisible();
  73  |   expect(await overflow(page)).toBeLessThanOrEqual(0);
  74  |   await shot(page, "ui/responsive", "BB-18d-mobile-review-form");
  75  |   await page.evaluate(() => localStorage.clear());
  76  |   await loginAdmin(page);
  77  |   await page.goto("/admin/restaurants");
  78  |   await settle(page);
  79  |   const ov = await overflow(page);
  80  |   await shot(page, "ui/responsive", "BB-18d-mobile-admin-restaurants");
  81  |   log("BB-18d", `mobile admin restaurants overflow=${ov}px`);
  82  |   expect(ov).toBeLessThanOrEqual(0);
  83  | });
  84  | 
  85  | // ------------------------------------------------------------------------------------------------ accessibility (BB-20)
  86  | const a11yPages = [...pages, ["review-form", "/reviews/new?restaurant=nuga-gama"], ["profile", "/profile"], ["admin-dashboard", "/admin"], ["admin-reviews", "/admin/reviews"]] as const;
  87  | 
  88  | test("BB-20a automated accessibility scan (axe-core, WCAG 2.1 A/AA) of key pages", async ({ page }) => {
  89  |   const summary: Record<string, unknown>[] = [];
  90  |   const email = `qa.ui.a11y.${RUN}@tastelanka.test`;
  91  |   await apiRegister("QA A11y", email);
  92  |   for (const [name, url] of a11yPages) {
  93  |     if (name === "review-form") await loginOk(page, email);
  94  |     if (name === "admin-dashboard") { await page.evaluate(() => localStorage.clear()); await loginAdmin(page); }
  95  |     await page.goto(url);
  96  |     await settle(page);
  97  |     const res = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  98  |     for (const v of res.violations) summary.push({ page: name, id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length, sample: v.nodes[0]?.target.join(" ") });
  99  |   }
  100 |   fs.writeFileSync(path.join(EVIDENCE, "ui", "BB-20a-axe-violations.json"), JSON.stringify(summary, null, 2));
  101 |   const serious = summary.filter((v) => v.impact === "serious" || v.impact === "critical");
  102 |   log("BB-20a", `axe violations total=${summary.length}; serious/critical=${serious.length}; rules=${[...new Set(summary.map((v) => `${v.id}(${v.impact})`))].join(", ")}`);
  103 |   expect(serious, "no serious/critical WCAG A/AA violations").toEqual([]);
  104 | });
  105 | 
  106 | test("BB-20b keyboard-only login: fields reachable by Tab and form submits with Enter", async ({ page }) => {
  107 |   const email = `qa.ui.kbd.${RUN}@tastelanka.test`;
  108 |   await apiRegister("QA Keyboard", email);
  109 |   await page.goto("/login");
  110 |   const order: string[] = [];
  111 |   for (let i = 0; i < 6; i++) {
  112 |     await page.keyboard.press("Tab");
  113 |     order.push(await page.evaluate(() => { const el = document.activeElement as HTMLElement; return `${el.tagName}:${el.getAttribute("type") ?? ""}:${(el.textContent || el.getAttribute("placeholder") || "").trim().slice(0, 20)}`; }));
  114 |   }
  115 |   log("BB-20b", `tab order: ${order.join(" | ")}`);
  116 |   await page.getByLabel("Email").focus();
  117 |   await page.keyboard.type(email);
  118 |   await page.keyboard.press("Tab");
  119 |   await page.keyboard.type("QaUser#2026pw");
  120 |   await page.keyboard.press("Enter");
  121 |   await expect(page).toHaveURL(/\/profile/);
  122 |   expect(order.some((o) => o.startsWith("INPUT:email"))).toBe(true);
  123 |   expect(order.some((o) => o.startsWith("INPUT:password"))).toBe(true);
  124 | });
  125 | 
  126 | test("BB-20c focus is visibly indicated on interactive elements", async ({ page }) => {
  127 |   await page.goto("/login");
  128 |   await page.getByLabel("Email").focus();
  129 |   const inputStyle = await page.getByLabel("Email").evaluate((el) => { const s = getComputedStyle(el); return `${s.borderColor}|${s.outlineStyle}|${s.boxShadow}`; });
  130 |   await page.getByRole("button", { name: "Log In" }).focus();
  131 |   const btn = await page.getByRole("button", { name: "Log In" }).evaluate((el) => { const s = getComputedStyle(el); return `${s.outlineStyle}|${s.outlineWidth}|${s.boxShadow}`; });
  132 |   log("BB-20c", `focused email input: ${inputStyle}; focused Log In button: ${btn}`);
  133 |   await shot(page, "ui", "BB-20c-focus-indicator-login-button", false);
  134 |   expect(btn.startsWith("none|") && btn.endsWith("none"), "focused button must show an outline or ring").toBe(false);
```