# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nonfunctional.spec.ts >> BB-18c mobile: restaurant filters are available
- Location: specs\nonfunctional.spec.ts:51:5

# Error details

```
Error: dietary/location filters should be usable on mobile

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - link "TasteLanka" [ref=e4] [cursor=pointer]:
        - /url: /
      - link "Log In" [ref=e5] [cursor=pointer]:
        - /url: /login
    - generic [ref=e6]:
      - heading "Find restaurants" [level=1] [ref=e7]
      - paragraph [ref=e8]: Search and filter restaurants across Colombo, Kandy and Galle.
      - generic [ref=e9]:
        - textbox "restaurants, dishes or cuisines..." [ref=e10]
        - combobox [ref=e11]:
          - option "All Locations" [selected]
          - option "Colombo"
          - option "Kandy"
          - option "Galle"
        - button "Search" [ref=e12]
    - main [ref=e13]:
      - generic [ref=e14]:
        - generic [ref=e16]:
          - heading "Restaurants" [level=2] [ref=e17]
          - paragraph [ref=e18]: 8 restaurants found
        - generic [ref=e19]:
          - article [ref=e20]:
            - generic [ref=e22]:
              - heading "Ministry of Crab" [level=3] [ref=e23]
              - paragraph [ref=e24]:
                - text: ★ 4.8
                - generic [ref=e25]: (320 reviews)
              - paragraph [ref=e26]: Seafood · Sri Lankan · Colombo
              - paragraph [ref=e27]: LKR 8,000 – 12,000
              - paragraph [ref=e28]: Popular seafood dining in Colombo. Browse menu items, prices and approved customer reviews.
              - generic [ref=e29]:
                - generic [ref=e30]: Seafood
                - generic [ref=e31]: Colombo
                - link "View Details" [ref=e32] [cursor=pointer]:
                  - /url: /restaurants/ministry-of-crab
          - article [ref=e33]:
            - generic [ref=e35]:
              - heading "The Empire Cafe" [level=3] [ref=e36]
              - paragraph [ref=e37]:
                - text: ★ 4.6
                - generic [ref=e38]: (220 reviews)
              - paragraph [ref=e39]: Cafe · International · Kandy
              - paragraph [ref=e40]: LKR 2,000 – 4,000
              - paragraph [ref=e41]: Casual dining with local and international favourites.
              - generic [ref=e42]:
                - generic [ref=e43]: Cafe
                - generic [ref=e44]: Kandy
                - link "View Details" [ref=e45] [cursor=pointer]:
                  - /url: /restaurants/the-empire-cafe
          - article [ref=e46]:
            - generic [ref=e48]:
              - heading "Pedlar’s Inn" [level=3] [ref=e49]
              - paragraph [ref=e50]:
                - text: ★ 4.5
                - generic [ref=e51]: (490 reviews)
              - paragraph [ref=e52]: Cafe · International · Galle
              - paragraph [ref=e53]: LKR 5,000 – 8,000
              - paragraph [ref=e54]: Relaxed cafe-style dining in the Galle area.
              - generic [ref=e55]:
                - generic [ref=e56]: Cafe
                - generic [ref=e57]: Galle
                - link "View Details" [ref=e58] [cursor=pointer]:
                  - /url: /restaurants/pedlars-inn
          - article [ref=e59]:
            - generic [ref=e61]:
              - heading "Nuga Gama" [level=3] [ref=e62]
              - paragraph [ref=e63]:
                - text: ★ 4.4
                - generic [ref=e64]: (150 reviews)
              - paragraph [ref=e65]: Sri Lankan · Authentic · Colombo
              - paragraph [ref=e66]: LKR 3,000 – 5,000
              - paragraph [ref=e67]: Traditional Sri Lankan dining with local cuisine options.
              - generic [ref=e68]:
                - generic [ref=e69]: Sri Lankan
                - generic [ref=e70]: Colombo
                - link "View Details" [ref=e71] [cursor=pointer]:
                  - /url: /restaurants/nuga-gama
          - article [ref=e72]:
            - generic [ref=e74]:
              - heading "Green Leaf Kitchen" [level=3] [ref=e75]
              - paragraph [ref=e76]:
                - text: ★ 4.3
                - generic [ref=e77]: (96 reviews)
              - paragraph [ref=e78]: Sri Lankan · Vegetarian · Kandy
              - paragraph [ref=e79]: LKR 1,500 – 3,000
              - paragraph [ref=e80]: Vegetarian-friendly local dishes with mild and medium spice options.
              - generic [ref=e81]:
                - generic [ref=e82]: Sri Lankan
                - generic [ref=e83]: Kandy
                - link "View Details" [ref=e84] [cursor=pointer]:
                  - /url: /restaurants/green-leaf-kitchen
          - article [ref=e85]:
            - generic [ref=e87]:
              - heading "QA Test Bistro" [level=3] [ref=e88]
              - paragraph [ref=e89]:
                - text: ★ 0
                - generic [ref=e90]: (0 reviews)
              - paragraph [ref=e91]: Sri Lankan · Fusion · Galle
              - paragraph [ref=e92]: LKR 9,000 – 100
              - paragraph [ref=e93]: Created by QA API test.
              - generic [ref=e94]:
                - generic [ref=e95]: Sri Lankan
                - generic [ref=e96]: Galle
                - link "View Details" [ref=e97] [cursor=pointer]:
                  - /url: /restaurants/qa-inverted-190512
          - article [ref=e98]:
            - generic [ref=e100]:
              - heading "QA Reviewed Cafe" [level=3] [ref=e101]
              - paragraph [ref=e102]:
                - text: ★ 0
                - generic [ref=e103]: (0 reviews)
              - paragraph [ref=e104]: Sri Lankan · Fusion · Galle
              - paragraph [ref=e105]: LKR 1,000 – 2,500
              - paragraph [ref=e106]: Created by QA API test.
              - generic [ref=e107]:
                - generic [ref=e108]: Sri Lankan
                - generic [ref=e109]: Galle
                - link "View Details" [ref=e110] [cursor=pointer]:
                  - /url: /restaurants/qa-rest2-190512
          - article [ref=e111]:
            - generic [ref=e113]:
              - heading "QA Persistence Diner" [level=3] [ref=e114]
              - paragraph [ref=e115]:
                - text: ★ 0
                - generic [ref=e116]: (0 reviews)
              - paragraph [ref=e117]: Sri Lankan · Colombo
              - paragraph [ref=e118]: LKR 500 – 900
              - paragraph [ref=e119]: persistence check
              - generic [ref=e120]:
                - generic [ref=e121]: Sri Lankan
                - generic [ref=e122]: Colombo
                - link "View Details" [ref=e123] [cursor=pointer]:
                  - /url: /restaurants/qa-persist-190512
    - navigation "Mobile navigation" [ref=e124]:
      - link "Home" [ref=e125] [cursor=pointer]:
        - /url: /
      - link "Search" [ref=e126] [cursor=pointer]:
        - /url: /restaurants
      - link "Reviews" [ref=e127] [cursor=pointer]:
        - /url: /profile#reviews
      - link "Profile" [ref=e128] [cursor=pointer]:
        - /url: /profile
  - button "Open Next.js Dev Tools" [ref=e134] [cursor=pointer]
  - alert [ref=e138]
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
  34  |       expect.soft(ov, `${name} must not scroll horizontally at ${vpName}`).toBeLessThanOrEqual(0);
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
> 59  |   expect(visibleFilterControls + (applyVisible ? 1 : 0), "dietary/location filters should be usable on mobile").toBeGreaterThan(0);
      |                                                                                                                 ^ Error: dietary/location filters should be usable on mobile
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
  135 | });
  136 | 
  137 | test("BB-20d rating star buttons expose accessible names and selected state", async ({ page }) => {
  138 |   const email = `qa.ui.stars.${RUN}@tastelanka.test`;
  139 |   await apiRegister("QA Stars", email);
  140 |   await loginOk(page, email);
  141 |   await page.goto("/reviews/new?restaurant=nuga-gama");
  142 |   await settle(page);
  143 |   const names = await page.locator("fieldset").first().getByRole("button").evaluateAll((els) =>
  144 |     els.map((e) => `${e.getAttribute("aria-label") ?? e.textContent}|pressed=${e.getAttribute("aria-pressed")}`));
  145 |   log("BB-20d", `food-quality star buttons: ${names.join(", ")}`);
  146 |   expect(names.every((n) => /[1-5]/.test(n.split("|")[0])), "each star should be announced with its value").toBe(true);
  147 | });
  148 | 
  149 | test("BB-20e search and filter inputs have programmatic labels", async ({ page }) => {
  150 |   await page.goto("/restaurants");
  151 |   await settle(page);
  152 |   const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input:not([type=hidden]), select, textarea")]
  153 |     .filter((el) => !(el as HTMLInputElement).labels?.length && !el.getAttribute("aria-label") && !el.getAttribute("aria-labelledby"))
  154 |     .map((el) => `${el.tagName.toLowerCase()}[${el.getAttribute("placeholder") ?? el.getAttribute("type") ?? ""}]`));
  155 |   log("BB-20e", `unlabeled controls on /restaurants: ${unlabeled.join(", ") || "none"}`);
  156 |   expect(unlabeled).toEqual([]);
  157 | });
  158 | 
  159 | // ------------------------------------------------------------------------------------------------ multilingual (BB-19)
```