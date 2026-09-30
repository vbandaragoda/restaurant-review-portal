# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nonfunctional.spec.ts >> BB-19c interface language can be switched to Sinhala / Tamil
- Location: specs\nonfunctional.spec.ts:193:5

# Error details

```
Error: a UI language selector (EN/SI/TA)

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - link "TasteLanka home" [ref=e3] [cursor=pointer]:
      - /url: /
      - generic [ref=e5]:
        - strong [ref=e6]: TasteLanka
        - generic [ref=e7]: Discover • Dine • Review
    - navigation "Main navigation" [ref=e8]:
      - link "Home" [ref=e9] [cursor=pointer]:
        - /url: /
      - link "Restaurants" [ref=e10] [cursor=pointer]:
        - /url: /restaurants
      - link "Cuisines" [ref=e11] [cursor=pointer]:
        - /url: /cuisines
      - link "About" [ref=e12] [cursor=pointer]:
        - /url: /about
    - generic [ref=e13]:
      - link "Log In" [ref=e14] [cursor=pointer]:
        - /url: /login
      - link "Sign Up" [ref=e15] [cursor=pointer]:
        - /url: /signup
  - generic [ref=e16]:
    - generic [ref=e17]:
      - paragraph [ref=e18]: HERO PHOTO PLACEHOLDER · Sri Lankan coastal dining
      - paragraph [ref=e19]: EXPLORE. TASTE. SHARE.
      - heading "Find Great Food in Colombo, Kandy & Galle" [level=1] [ref=e20]: Find Great Foodin Colombo, Kandy & Galle
      - paragraph [ref=e21]: Discover restaurants, explore menus, read real reviewsand share your dining experiences.
      - generic [ref=e23]:
        - generic [ref=e24]: Search restaurants, dishes or cuisines
        - textbox "Search restaurants, dishes or cuisines" [ref=e25]:
          - /placeholder: Search for restaurants, dishes or cuisines…
        - generic [ref=e26]: Location
        - combobox "Location" [ref=e27]:
          - option "All Locations" [selected]
          - option "Colombo"
          - option "Kandy"
          - option "Galle"
        - button "Search" [ref=e28]
      - generic [ref=e29]:
        - button "Cuisine ▾" [ref=e30]
        - button "Vegetarian" [ref=e31]
        - button "Vegan" [ref=e32]
        - button "Halal" [ref=e33]
        - button "Spice Level ▾" [ref=e34]
        - button "Price Band ▾" [ref=e35]
    - main [ref=e36]:
      - generic [ref=e37]:
        - heading "Popular Cuisine Categories" [level=2] [ref=e38]
        - link "View All Categories →" [ref=e39] [cursor=pointer]:
          - /url: /cuisines
      - generic [ref=e40]:
        - link [ref=e41] [cursor=pointer]:
          - /url: /restaurants?cuisine=Sri%20Lankan
          - generic [ref=e43]:
            - heading "Sri Lankan" [level=3] [ref=e44]
            - paragraph [ref=e45]: 120+ Restaurants
        - link [ref=e46] [cursor=pointer]:
          - /url: /restaurants?cuisine=Indian
          - generic [ref=e48]:
            - heading "Indian" [level=3] [ref=e49]
            - paragraph [ref=e50]: 95+ Restaurants
        - link [ref=e51] [cursor=pointer]:
          - /url: /restaurants?cuisine=Chinese
          - generic [ref=e53]:
            - heading "Chinese" [level=3] [ref=e54]
            - paragraph [ref=e55]: 60+ Restaurants
        - link [ref=e56] [cursor=pointer]:
          - /url: /restaurants?cuisine=Italian
          - generic [ref=e58]:
            - heading "Italian" [level=3] [ref=e59]
            - paragraph [ref=e60]: 45+ Restaurants
        - link [ref=e61] [cursor=pointer]:
          - /url: /restaurants?cuisine=Middle%20Eastern
          - generic [ref=e63]:
            - heading "Middle Eastern" [level=3] [ref=e64]
            - paragraph [ref=e65]: 40+ Restaurants
        - link [ref=e66] [cursor=pointer]:
          - /url: /restaurants?cuisine=Western
          - generic [ref=e68]:
            - heading "Western" [level=3] [ref=e69]
            - paragraph [ref=e70]: 70+ Restaurants
      - generic [ref=e72]:
        - heading "Top Rated Restaurants" [level=2] [ref=e73]
        - link "View All Restaurants →" [ref=e74] [cursor=pointer]:
          - /url: /restaurants
      - generic [ref=e75]:
        - link "★ 4.8 (320 reviews) Ministry of Crab Seafood · Sri Lankan ⌖ Colombo LKR 8,000 – 12,000" [ref=e76] [cursor=pointer]:
          - /url: /restaurants/ministry-of-crab
          - generic [ref=e78]:
            - paragraph [ref=e79]:
              - text: ★ 4.8
              - generic [ref=e80]: (320 reviews)
            - heading "Ministry of Crab" [level=3] [ref=e81]
            - paragraph [ref=e82]: Seafood · Sri Lankan
            - paragraph [ref=e83]: ⌖ Colombo
            - paragraph [ref=e84]: LKR 8,000 – 12,000
        - link "★ 4.6 (210 reviews) The Empire Cafe Cafe · International ⌖ Kandy LKR 2,000 – 4,000" [ref=e85] [cursor=pointer]:
          - /url: /restaurants/the-empire-cafe
          - generic [ref=e87]:
            - paragraph [ref=e88]:
              - text: ★ 4.6
              - generic [ref=e89]: (210 reviews)
            - heading "The Empire Cafe" [level=3] [ref=e90]
            - paragraph [ref=e91]: Cafe · International
            - paragraph [ref=e92]: ⌖ Kandy
            - paragraph [ref=e93]: LKR 2,000 – 4,000
        - link "★ 4.5 (180 reviews) Pedlar’s Inn Seafood · International ⌖ Galle LKR 5,000 – 8,000" [ref=e94] [cursor=pointer]:
          - /url: /restaurants/pedlars-inn
          - generic [ref=e96]:
            - paragraph [ref=e97]:
              - text: ★ 4.5
              - generic [ref=e98]: (180 reviews)
            - heading "Pedlar’s Inn" [level=3] [ref=e99]
            - paragraph [ref=e100]: Seafood · International
            - paragraph [ref=e101]: ⌖ Galle
            - paragraph [ref=e102]: LKR 5,000 – 8,000
        - link "★ 4.4 (150 reviews) Nuga Gama Sri Lankan · Authentic ⌖ Colombo LKR 3,000 – 5,000" [ref=e103] [cursor=pointer]:
          - /url: /restaurants/nuga-gama
          - generic [ref=e105]:
            - paragraph [ref=e106]:
              - text: ★ 4.4
              - generic [ref=e107]: (150 reviews)
            - heading "Nuga Gama" [level=3] [ref=e108]
            - paragraph [ref=e109]: Sri Lankan · Authentic
            - paragraph [ref=e110]: ⌖ Colombo
            - paragraph [ref=e111]: LKR 3,000 – 5,000
      - generic [ref=e112]:
        - generic [ref=e113]:
          - heading "Support Local Restaurants" [level=2] [ref=e114]
          - paragraph [ref=e115]: Help your favourite restaurants grow by sharing honest reviews.
          - paragraph [ref=e116]: Good food deserves good words.
        - link "Write a Review" [ref=e117] [cursor=pointer]:
          - /url: /reviews/new
      - generic [ref=e119]:
        - heading "Built for Sri Lankan diners" [level=2] [ref=e120]
        - link "Core portal requirements" [ref=e121] [cursor=pointer]:
          - /url: "#"
      - generic [ref=e122]:
        - article [ref=e123]:
          - heading "Dietary filters" [level=3] [ref=e124]
          - paragraph [ref=e125]: Vegetarian · Vegan · Halal
        - article [ref=e126]:
          - heading "Spice indicator" [level=3] [ref=e127]
          - paragraph [ref=e128]: Mild · Medium · Hot
        - article [ref=e129]:
          - heading "Multilingual" [level=3] [ref=e130]
          - paragraph [ref=e131]: English · සිංහල · தமிழ்
        - article [ref=e132]:
          - heading "Moderated reviews" [level=3] [ref=e133]
          - paragraph [ref=e134]: Approve before publishing
    - contentinfo [ref=e135]:
      - generic [ref=e136]:
        - paragraph [ref=e137]: TasteLanka
        - paragraph [ref=e138]: Discover · Dine · Review
        - paragraph [ref=e139]: Good Food. A Better Sri Lanka.
      - navigation "Footer navigation" [ref=e140]:
        - link "Home" [ref=e141] [cursor=pointer]:
          - /url: /
        - link "About" [ref=e142] [cursor=pointer]:
          - /url: /about
        - link "Contact" [ref=e143] [cursor=pointer]:
          - /url: /contact
        - link "Terms" [ref=e144] [cursor=pointer]:
          - /url: /terms
        - link "Privacy" [ref=e145] [cursor=pointer]:
          - /url: /privacy
  - button "Open Next.js Dev Tools" [ref=e151] [cursor=pointer]
  - alert [ref=e155]
```

# Test source

```ts
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
> 199 |   expect(switcher, "a UI language selector (EN/SI/TA)").toBeGreaterThan(0);
      |                                                         ^ Error: a UI language selector (EN/SI/TA)
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