# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nonfunctional.spec.ts >> BB-20d rating star buttons expose accessible names and selected state
- Location: specs\nonfunctional.spec.ts:137:5

# Error details

```
Error: each star should be announced with its value

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - generic [ref=f1e2]:
    - banner [ref=f1e3]:
      - link "TasteLanka home" [ref=f1e4] [cursor=pointer]:
        - /url: /
        - generic [ref=f1e6]:
          - strong [ref=f1e7]: TasteLanka
          - generic [ref=f1e8]: Discover • Dine • Review
      - navigation "Main navigation" [ref=f1e9]:
        - link "Home" [ref=f1e10] [cursor=pointer]:
          - /url: /
        - link "Restaurants" [ref=f1e11] [cursor=pointer]:
          - /url: /restaurants
        - link "Cuisines" [ref=f1e12] [cursor=pointer]:
          - /url: /cuisines
        - link "About" [ref=f1e13] [cursor=pointer]:
          - /url: /about
      - link "Profile" [ref=f1e15] [cursor=pointer]:
        - /url: /profile
    - main [ref=f1e16]:
      - link "‹ Back" [ref=f1e17] [cursor=pointer]:
        - /url: /restaurants/nuga-gama
      - heading "Write a Review" [level=1] [ref=f1e18]
      - paragraph [ref=f1e19]: Nuga Gama
      - generic [ref=f1e20]:
        - group "Food quality" [ref=f1e21]:
          - 'generic "Food quality: 5 out of 5" [ref=f1e23]':
            - button "★" [ref=f1e24]
            - button "★" [ref=f1e25]
            - button "★" [ref=f1e26]
            - button "★" [ref=f1e27]
            - button "★" [ref=f1e28]
        - group "Customer service" [ref=f1e29]:
          - 'generic "Customer service: 5 out of 5" [ref=f1e31]':
            - button "★" [ref=f1e32]
            - button "★" [ref=f1e33]
            - button "★" [ref=f1e34]
            - button "★" [ref=f1e35]
            - button "★" [ref=f1e36]
        - group "Overall experience" [ref=f1e37]:
          - 'generic "Overall experience: 5 out of 5" [ref=f1e39]':
            - button "★" [ref=f1e40]
            - button "★" [ref=f1e41]
            - button "★" [ref=f1e42]
            - button "★" [ref=f1e43]
            - button "★" [ref=f1e44]
        - group "Language" [ref=f1e45]:
          - generic [ref=f1e47]:
            - button "English" [ref=f1e48]
            - button "සිංහල" [ref=f1e49]
            - button "தமிழ்" [ref=f1e50]
        - generic [ref=f1e51]:
          - text: Review
          - textbox "Review" [ref=f1e52]:
            - /placeholder: Share your dining experience…
        - generic [ref=f1e53]: Review is published only after moderator approval.
        - generic [ref=f1e54]:
          - link "Cancel" [ref=f1e55] [cursor=pointer]:
            - /url: /restaurants/nuga-gama
          - button "Submit Review" [ref=f1e56]
  - button "Open Next.js Dev Tools" [ref=f1e62] [cursor=pointer]
  - alert [ref=f1e66]
```

# Test source

```ts
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
> 146 |   expect(names.every((n) => /[1-5]/.test(n.split("|")[0])), "each star should be announced with its value").toBe(true);
      |                                                                                                             ^ Error: each star should be announced with its value
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