# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nonfunctional.spec.ts >> BB-20e search and filter inputs have programmatic labels
- Location: specs\nonfunctional.spec.ts:149:5

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "input[restaurants, dishes or cuisines...]",
+   "select[]",
+   "select[]",
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - link "TasteLanka home" [ref=e4] [cursor=pointer]:
        - /url: /
        - generic [ref=e6]:
          - strong [ref=e7]: TasteLanka
          - generic [ref=e8]: Discover • Dine • Review
      - navigation "Main navigation" [ref=e9]:
        - link "Home" [ref=e10] [cursor=pointer]:
          - /url: /
        - link "Restaurants" [ref=e11] [cursor=pointer]:
          - /url: /restaurants
        - link "Cuisines" [ref=e12] [cursor=pointer]:
          - /url: /cuisines
        - link "About" [ref=e13] [cursor=pointer]:
          - /url: /about
      - generic [ref=e14]:
        - link "Log In" [ref=e15] [cursor=pointer]:
          - /url: /login
        - link "Sign Up" [ref=e16] [cursor=pointer]:
          - /url: /signup
    - generic [ref=e17]:
      - heading "Find restaurants" [level=1] [ref=e18]
      - paragraph [ref=e19]: Search and filter restaurants across Colombo, Kandy and Galle.
      - generic [ref=e20]:
        - textbox "restaurants, dishes or cuisines..." [ref=e21]
        - combobox [ref=e22]:
          - option "All Locations" [selected]
          - option "Colombo"
          - option "Kandy"
          - option "Galle"
        - button "Search" [ref=e23]
    - main [ref=e24]:
      - complementary [ref=e25]:
        - generic [ref=e26]:
          - heading "Filters" [level=2] [ref=e27]
          - button "Clear all" [ref=e28]
        - generic [ref=e29]:
          - heading "Location" [level=3] [ref=e30]
          - generic [ref=e31]:
            - generic [ref=e32]:
              - checkbox "Colombo" [ref=e33]
              - text: Colombo
            - generic [ref=e34]:
              - checkbox "Kandy" [ref=e35]
              - text: Kandy
            - generic [ref=e36]:
              - checkbox "Galle" [ref=e37]
              - text: Galle
        - generic [ref=e38]:
          - heading "Cuisine" [level=3] [ref=e39]
          - generic [ref=e40]:
            - generic [ref=e41]:
              - checkbox "Sri Lankan" [ref=e42]
              - text: Sri Lankan
            - generic [ref=e43]:
              - checkbox "Indian" [ref=e44]
              - text: Indian
            - generic [ref=e45]:
              - checkbox "Chinese" [ref=e46]
              - text: Chinese
            - generic [ref=e47]:
              - checkbox "Italian" [ref=e48]
              - text: Italian
            - generic [ref=e49]:
              - checkbox "Middle Eastern" [ref=e50]
              - text: Middle Eastern
            - generic [ref=e51]:
              - checkbox "Western" [ref=e52]
              - text: Western
        - generic [ref=e53]:
          - heading "Dietary" [level=3] [ref=e54]
          - generic [ref=e55]:
            - checkbox "Vegetarian" [ref=e56]
            - text: Vegetarian
          - generic [ref=e57]:
            - checkbox "Vegan" [ref=e58]
            - text: Vegan
          - generic [ref=e59]:
            - checkbox "Halal" [ref=e60]
            - text: Halal
        - button "Apply Filters" [ref=e61]
      - generic [ref=e62]:
        - generic [ref=e63]:
          - generic [ref=e64]:
            - heading "Restaurants" [level=2] [ref=e65]
            - paragraph [ref=e66]: 8 restaurants found
          - combobox [ref=e67]:
            - 'option "Sort: Top Rated" [selected]'
        - generic [ref=e68]:
          - article [ref=e69]:
            - generic [ref=e71]:
              - heading "Ministry of Crab" [level=3] [ref=e72]
              - paragraph [ref=e73]:
                - text: ★ 4.8
                - generic [ref=e74]: (320 reviews)
              - paragraph [ref=e75]: Seafood · Sri Lankan · Colombo
              - paragraph [ref=e76]: LKR 8,000 – 12,000
              - paragraph [ref=e77]: Popular seafood dining in Colombo. Browse menu items, prices and approved customer reviews.
              - generic [ref=e78]:
                - generic [ref=e79]: Seafood
                - generic [ref=e80]: Colombo
                - link "View Details" [ref=e81] [cursor=pointer]:
                  - /url: /restaurants/ministry-of-crab
          - article [ref=e82]:
            - generic [ref=e84]:
              - heading "The Empire Cafe" [level=3] [ref=e85]
              - paragraph [ref=e86]:
                - text: ★ 4.6
                - generic [ref=e87]: (220 reviews)
              - paragraph [ref=e88]: Cafe · International · Kandy
              - paragraph [ref=e89]: LKR 2,000 – 4,000
              - paragraph [ref=e90]: Casual dining with local and international favourites.
              - generic [ref=e91]:
                - generic [ref=e92]: Cafe
                - generic [ref=e93]: Kandy
                - link "View Details" [ref=e94] [cursor=pointer]:
                  - /url: /restaurants/the-empire-cafe
          - article [ref=e95]:
            - generic [ref=e97]:
              - heading "Pedlar’s Inn" [level=3] [ref=e98]
              - paragraph [ref=e99]:
                - text: ★ 4.5
                - generic [ref=e100]: (490 reviews)
              - paragraph [ref=e101]: Cafe · International · Galle
              - paragraph [ref=e102]: LKR 5,000 – 8,000
              - paragraph [ref=e103]: Relaxed cafe-style dining in the Galle area.
              - generic [ref=e104]:
                - generic [ref=e105]: Cafe
                - generic [ref=e106]: Galle
                - link "View Details" [ref=e107] [cursor=pointer]:
                  - /url: /restaurants/pedlars-inn
          - article [ref=e108]:
            - generic [ref=e110]:
              - heading "Nuga Gama" [level=3] [ref=e111]
              - paragraph [ref=e112]:
                - text: ★ 4.4
                - generic [ref=e113]: (150 reviews)
              - paragraph [ref=e114]: Sri Lankan · Authentic · Colombo
              - paragraph [ref=e115]: LKR 3,000 – 5,000
              - paragraph [ref=e116]: Traditional Sri Lankan dining with local cuisine options.
              - generic [ref=e117]:
                - generic [ref=e118]: Sri Lankan
                - generic [ref=e119]: Colombo
                - link "View Details" [ref=e120] [cursor=pointer]:
                  - /url: /restaurants/nuga-gama
          - article [ref=e121]:
            - generic [ref=e123]:
              - heading "Green Leaf Kitchen" [level=3] [ref=e124]
              - paragraph [ref=e125]:
                - text: ★ 4.3
                - generic [ref=e126]: (96 reviews)
              - paragraph [ref=e127]: Sri Lankan · Vegetarian · Kandy
              - paragraph [ref=e128]: LKR 1,500 – 3,000
              - paragraph [ref=e129]: Vegetarian-friendly local dishes with mild and medium spice options.
              - generic [ref=e130]:
                - generic [ref=e131]: Sri Lankan
                - generic [ref=e132]: Kandy
                - link "View Details" [ref=e133] [cursor=pointer]:
                  - /url: /restaurants/green-leaf-kitchen
          - article [ref=e134]:
            - generic [ref=e136]:
              - heading "QA Test Bistro" [level=3] [ref=e137]
              - paragraph [ref=e138]:
                - text: ★ 0
                - generic [ref=e139]: (0 reviews)
              - paragraph [ref=e140]: Sri Lankan · Fusion · Galle
              - paragraph [ref=e141]: LKR 9,000 – 100
              - paragraph [ref=e142]: Created by QA API test.
              - generic [ref=e143]:
                - generic [ref=e144]: Sri Lankan
                - generic [ref=e145]: Galle
                - link "View Details" [ref=e146] [cursor=pointer]:
                  - /url: /restaurants/qa-inverted-190512
          - article [ref=e147]:
            - generic [ref=e149]:
              - heading "QA Reviewed Cafe" [level=3] [ref=e150]
              - paragraph [ref=e151]:
                - text: ★ 0
                - generic [ref=e152]: (0 reviews)
              - paragraph [ref=e153]: Sri Lankan · Fusion · Galle
              - paragraph [ref=e154]: LKR 1,000 – 2,500
              - paragraph [ref=e155]: Created by QA API test.
              - generic [ref=e156]:
                - generic [ref=e157]: Sri Lankan
                - generic [ref=e158]: Galle
                - link "View Details" [ref=e159] [cursor=pointer]:
                  - /url: /restaurants/qa-rest2-190512
          - article [ref=e160]:
            - generic [ref=e162]:
              - heading "QA Persistence Diner" [level=3] [ref=e163]
              - paragraph [ref=e164]:
                - text: ★ 0
                - generic [ref=e165]: (0 reviews)
              - paragraph [ref=e166]: Sri Lankan · Colombo
              - paragraph [ref=e167]: LKR 500 – 900
              - paragraph [ref=e168]: persistence check
              - generic [ref=e169]:
                - generic [ref=e170]: Sri Lankan
                - generic [ref=e171]: Colombo
                - link "View Details" [ref=e172] [cursor=pointer]:
                  - /url: /restaurants/qa-persist-190512
    - contentinfo [ref=e173]:
      - generic [ref=e174]:
        - paragraph [ref=e175]: TasteLanka
        - paragraph [ref=e176]: Discover • Dine • Review
        - paragraph [ref=e177]: Good Food. A Better Sri Lanka.
      - navigation "Footer navigation" [ref=e178]:
        - link "Home" [ref=e179] [cursor=pointer]:
          - /url: /
        - link "About" [ref=e180] [cursor=pointer]:
          - /url: /about
        - link "Contact" [ref=e181] [cursor=pointer]:
          - /url: /contact
        - link "Terms" [ref=e182] [cursor=pointer]:
          - /url: /terms
        - link "Privacy" [ref=e183] [cursor=pointer]:
          - /url: /privacy
  - button "Open Next.js Dev Tools" [ref=e189] [cursor=pointer]
  - alert [ref=e193]
```

# Test source

```ts
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
> 156 |   expect(unlabeled).toEqual([]);
      |                     ^ Error: expect(received).toEqual(expected) // deep equality
  157 | });
  158 | 
  159 | // ------------------------------------------------------------------------------------------------ multilingual (BB-19)
  160 | test("BB-19a approved Sinhala and Tamil reviews display correctly with Unicode fonts", async ({ page }) => {
  161 |   await page.goto("/restaurants/ministry-of-crab");
  162 |   await settle(page);
  163 |   const si = page.getByText("රසවත් කකුළුවන් කෑම. සේවය ඉතා හොඳයි.");
  164 |   const ta = page.getByText("மிகவும் சுவையான உணவு. சேவை நன்றாக இருந்தது.");
  165 |   await expect(si).toBeVisible();
  166 |   await expect(ta).toBeVisible();
  167 |   await si.scrollIntoViewIfNeeded();
  168 |   const fonts = await si.evaluate((el) => getComputedStyle(el).fontFamily);
  169 |   const glyphs = await page.evaluate(async () => ({ si: document.fonts.check("16px 'Noto Sans Sinhala'", "ක"), loaded: [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family) }));
  170 |   log("BB-19a", `font-family=${fonts}; loaded fonts=${[...new Set(glyphs.loaded)].join(", ")}`);
  171 |   await shot(page, "ui", "BB-19a-sinhala-tamil-reviews");
  172 |   expect(fonts.toLowerCase()).toContain("sinhala");
  173 | });
  174 | 
  175 | test("BB-19b customer can write a review in Sinhala and in Tamil via the language selector", async ({ page }) => {
  176 |   const email = `qa.ui.lang.${RUN}@tastelanka.test`;
  177 |   await apiRegister("QA Language", email);
  178 |   await loginOk(page, email);
  179 |   for (const [button, text] of [["සිංහල", "ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි."], ["தமிழ்", "அருமையான உணவு, மீண்டும் வருவேன்."]] as const) {
  180 |     await page.goto("/reviews/new?restaurant=nuga-gama");
  181 |     await settle(page);
  182 |     await page.getByRole("button", { name: button }).click();
  183 |     await page.getByLabel("Review").fill(text);
  184 |     await page.getByRole("button", { name: "Submit Review" }).click();
  185 |     await expect(page.getByText("Thank you. Your review is pending moderator approval.")).toBeVisible();
  186 |   }
  187 |   await page.goto("/profile");
  188 |   await expect(page.getByText("ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි.")).toBeVisible();
  189 |   await expect(page.getByText("அருமையான உணவு, மீண்டும் வருவேன்.")).toBeVisible();
  190 |   await shot(page, "ui", "BB-19b-sinhala-tamil-reviews-submitted-profile");
  191 | });
  192 | 
  193 | test("BB-19c interface language can be switched to Sinhala / Tamil", async ({ page }) => {
  194 |   await page.goto("/");
  195 |   await settle(page);
  196 |   const switcher = await page.locator("select, button, a").filter({ hasText: /^(සිංහල|தமிழ்|SI|TA|Language)$/ }).count();
  197 |   const htmlLang = await page.evaluate(() => document.documentElement.lang);
  198 |   log("BB-19c", `language switch controls on home page=${switcher}; <html lang>=${htmlLang}`);
  199 |   expect(switcher, "a UI language selector (EN/SI/TA)").toBeGreaterThan(0);
  200 | });
  201 | 
  202 | // ------------------------------------------------------------------------------------------------ UI performance (dev server)
  203 | test("PERF-UI page load timings (Next.js dev server; indicative only)", async ({ page }) => {
  204 |   const rows: string[] = ["page,url,domContentLoadedMs,loadMs,contentReadyMs"];
  205 |   for (const [name, url] of [["home", "/"], ["restaurants", "/restaurants"], ["restaurant-details", "/restaurants/ministry-of-crab"], ["search", "/restaurants?q=crab"]] as const) {
  206 |     await page.goto(url); await settle(page); // warm (dev compile)
  207 |     const t0 = Date.now();
  208 |     await page.goto(url);
  209 |     await expect(page.locator("h1").first()).toBeVisible();
  210 |     await settle(page);
  211 |     const ready = Date.now() - t0;
  212 |     const nav = await page.evaluate(() => { const n = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming; return [Math.round(n.domContentLoadedEventEnd), Math.round(n.loadEventEnd)]; });
  213 |     rows.push(`${name},${url},${nav[0]},${nav[1]},${ready}`);
  214 |   }
  215 |   fs.mkdirSync(path.join(EVIDENCE, "performance"), { recursive: true });
  216 |   fs.writeFileSync(path.join(EVIDENCE, "performance", "PERF-UI-page-load.csv"), rows.join("\n") + "\n");
  217 |   log("PERF-UI", rows.join(" ; "));
  218 | });
  219 | 
```