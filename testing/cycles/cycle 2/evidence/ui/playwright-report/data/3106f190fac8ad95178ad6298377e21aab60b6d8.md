# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nonfunctional.spec.ts >> BB-19c interface language can be switched to Sinhala / Tamil
- Location: specs\nonfunctional.spec.ts:196:5

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
        - link "Cuisine" [ref=e30] [cursor=pointer]:
          - /url: /cuisines
        - link "Vegetarian" [ref=e31] [cursor=pointer]:
          - /url: /restaurants?vegetarian=true
        - link "Vegan" [ref=e32] [cursor=pointer]:
          - /url: /restaurants?vegan=true
        - link "Halal" [ref=e33] [cursor=pointer]:
          - /url: /restaurants?halal=true
        - generic [ref=e34]: Spice level
        - combobox "Spice level" [ref=e35]:
          - option "Spice Level" [disabled] [selected]
          - option "Mild"
          - option "Medium"
          - option "Hot"
        - generic [ref=e36]: Maximum price
        - combobox "Maximum price" [ref=e37]:
          - option "Price Band" [disabled] [selected]
          - option "Up to LKR 3,000"
          - option "Up to LKR 5,000"
          - option "Up to LKR 8,000"
    - main [ref=e38]:
      - generic [ref=e39]:
        - heading "Popular Cuisine Categories" [level=2] [ref=e40]
        - link "View All Categories →" [ref=e41] [cursor=pointer]:
          - /url: /cuisines
      - generic [ref=e42]:
        - link [ref=e43] [cursor=pointer]:
          - /url: /restaurants?cuisine=Sri%20Lankan
          - generic [ref=e45]:
            - heading "Sri Lankan" [level=3] [ref=e46]
            - paragraph [ref=e47]: 6 restaurants
        - link [ref=e48] [cursor=pointer]:
          - /url: /restaurants?cuisine=Indian
          - generic [ref=e50]:
            - heading "Indian" [level=3] [ref=e51]
            - paragraph [ref=e52]: 0 restaurants
        - link [ref=e53] [cursor=pointer]:
          - /url: /restaurants?cuisine=Chinese
          - generic [ref=e55]:
            - heading "Chinese" [level=3] [ref=e56]
            - paragraph [ref=e57]: 0 restaurants
        - link [ref=e58] [cursor=pointer]:
          - /url: /restaurants?cuisine=Italian
          - generic [ref=e60]:
            - heading "Italian" [level=3] [ref=e61]
            - paragraph [ref=e62]: 0 restaurants
        - link [ref=e63] [cursor=pointer]:
          - /url: /restaurants?cuisine=Middle%20Eastern
          - generic [ref=e65]:
            - heading "Middle Eastern" [level=3] [ref=e66]
            - paragraph [ref=e67]: 0 restaurants
        - link [ref=e68] [cursor=pointer]:
          - /url: /restaurants?cuisine=Western
          - generic [ref=e70]:
            - heading "Western" [level=3] [ref=e71]
            - paragraph [ref=e72]: 0 restaurants
      - generic [ref=e74]:
        - heading "Top Rated Restaurants" [level=2] [ref=e75]
        - link "View All Restaurants →" [ref=e76] [cursor=pointer]:
          - /url: /restaurants
      - generic [ref=e77]:
        - link "★ 4.8 (322 reviews) Ministry of Crab Seafood · Sri Lankan ⌖ Colombo LKR 8,000 – 12,000" [ref=e78] [cursor=pointer]:
          - /url: /restaurants/ministry-of-crab
          - generic [ref=e80]:
            - paragraph [ref=e81]:
              - text: ★ 4.8
              - generic [ref=e82]: (322 reviews)
            - heading "Ministry of Crab" [level=3] [ref=e83]
            - paragraph [ref=e84]: Seafood · Sri Lankan
            - paragraph [ref=e85]: ⌖ Colombo
            - paragraph [ref=e86]: LKR 8,000 – 12,000
        - link "★ 4.6 (222 reviews) The Empire Cafe Cafe · International ⌖ Kandy LKR 2,000 – 4,000" [ref=e87] [cursor=pointer]:
          - /url: /restaurants/the-empire-cafe
          - generic [ref=e89]:
            - paragraph [ref=e90]:
              - text: ★ 4.6
              - generic [ref=e91]: (222 reviews)
            - heading "The Empire Cafe" [level=3] [ref=e92]
            - paragraph [ref=e93]: Cafe · International
            - paragraph [ref=e94]: ⌖ Kandy
            - paragraph [ref=e95]: LKR 2,000 – 4,000
        - link "★ 4.5 (492 reviews) Pedlar’s Inn Cafe · International ⌖ Galle LKR 5,000 – 8,000" [ref=e96] [cursor=pointer]:
          - /url: /restaurants/pedlars-inn
          - generic [ref=e98]:
            - paragraph [ref=e99]:
              - text: ★ 4.5
              - generic [ref=e100]: (492 reviews)
            - heading "Pedlar’s Inn" [level=3] [ref=e101]
            - paragraph [ref=e102]: Cafe · International
            - paragraph [ref=e103]: ⌖ Galle
            - paragraph [ref=e104]: LKR 5,000 – 8,000
        - link "★ 4.4 (154 reviews) Nuga Gama Sri Lankan · Authentic ⌖ Colombo LKR 3,500 – 5,000" [ref=e105] [cursor=pointer]:
          - /url: /restaurants/nuga-gama
          - generic [ref=e107]:
            - paragraph [ref=e108]:
              - text: ★ 4.4
              - generic [ref=e109]: (154 reviews)
            - heading "Nuga Gama" [level=3] [ref=e110]
            - paragraph [ref=e111]: Sri Lankan · Authentic
            - paragraph [ref=e112]: ⌖ Colombo
            - paragraph [ref=e113]: LKR 3,500 – 5,000
      - generic [ref=e114]:
        - generic [ref=e115]:
          - heading "Support Local Restaurants" [level=2] [ref=e116]
          - paragraph [ref=e117]: Help your favourite restaurants grow by sharing honest reviews.
          - paragraph [ref=e118]: Good food deserves good words.
        - link "Write a Review" [ref=e119] [cursor=pointer]:
          - /url: /reviews/new
      - generic [ref=e121]:
        - heading "Built for Sri Lankan diners" [level=2] [ref=e122]
        - link "Core portal requirements" [ref=e123] [cursor=pointer]:
          - /url: "#"
      - generic [ref=e124]:
        - article [ref=e125]:
          - heading "Dietary filters" [level=3] [ref=e126]
          - paragraph [ref=e127]: Vegetarian · Vegan · Halal
        - article [ref=e128]:
          - heading "Spice indicator" [level=3] [ref=e129]
          - paragraph [ref=e130]: Mild · Medium · Hot
        - article [ref=e131]:
          - heading "Multilingual" [level=3] [ref=e132]
          - paragraph [ref=e133]: English · සිංහල · தமிழ்
        - article [ref=e134]:
          - heading "Moderated reviews" [level=3] [ref=e135]
          - paragraph [ref=e136]: Approve before publishing
    - contentinfo [ref=e137]:
      - generic [ref=e138]:
        - paragraph [ref=e139]: TasteLanka
        - paragraph [ref=e140]: Discover · Dine · Review
        - paragraph [ref=e141]: Good Food. A Better Sri Lanka.
      - navigation "Footer navigation" [ref=e142]:
        - link "Home" [ref=e143] [cursor=pointer]:
          - /url: /
        - link "About" [ref=e144] [cursor=pointer]:
          - /url: /about
        - link "Contact" [ref=e145] [cursor=pointer]:
          - /url: /contact
        - link "Terms" [ref=e146] [cursor=pointer]:
          - /url: /terms
        - link "Privacy" [ref=e147] [cursor=pointer]:
          - /url: /privacy
  - button "Open Next.js Dev Tools" [ref=e153] [cursor=pointer]
  - alert [ref=e157]
```

# Test source

```ts
  102 |   }
  103 |   fs.writeFileSync(path.join(EVIDENCE, "ui", "BB-20a-axe-violations.json"), JSON.stringify(summary, null, 2));
  104 |   const serious = summary.filter((v) => v.impact === "serious" || v.impact === "critical");
  105 |   log("BB-20a", `axe violations total=${summary.length}; serious/critical=${serious.length}; rules=${[...new Set(summary.map((v) => `${v.id}(${v.impact})`))].join(", ")}`);
  106 |   expect(serious, "no serious/critical WCAG A/AA violations").toEqual([]);
  107 | });
  108 | 
  109 | test("BB-20b keyboard-only login: fields reachable by Tab and form submits with Enter", async ({ page }) => {
  110 |   const email = `qa.ui.kbd.${RUN}@tastelanka.test`;
  111 |   await apiRegister("QA Keyboard", email);
  112 |   await page.goto("/login");
  113 |   const order: string[] = [];
  114 |   for (let i = 0; i < 6; i++) {
  115 |     await page.keyboard.press("Tab");
  116 |     order.push(await page.evaluate(() => { const el = document.activeElement as HTMLElement; return `${el.tagName}:${el.getAttribute("type") ?? ""}:${(el.textContent || el.getAttribute("placeholder") || "").trim().slice(0, 20)}`; }));
  117 |   }
  118 |   log("BB-20b", `tab order: ${order.join(" | ")}`);
  119 |   await page.getByLabel("Email").focus();
  120 |   await page.keyboard.type(email);
  121 |   await page.keyboard.press("Tab");
  122 |   await page.keyboard.type("QaUser#2026pw");
  123 |   await page.keyboard.press("Enter");
  124 |   await expect(page).toHaveURL(/\/profile/);
  125 |   expect(order.some((o) => o.startsWith("INPUT:email"))).toBe(true);
  126 |   expect(order.some((o) => o.startsWith("INPUT:password"))).toBe(true);
  127 | });
  128 | 
  129 | test("BB-20c focus is visibly indicated on interactive elements", async ({ page }) => {
  130 |   await page.goto("/login");
  131 |   await page.getByLabel("Email").focus();
  132 |   const inputStyle = await page.getByLabel("Email").evaluate((el) => { const s = getComputedStyle(el); return `${s.borderColor}|${s.outlineStyle}|${s.boxShadow}`; });
  133 |   await page.getByRole("button", { name: "Log In" }).focus();
  134 |   const btn = await page.getByRole("button", { name: "Log In" }).evaluate((el) => { const s = getComputedStyle(el); return `${s.outlineStyle}|${s.outlineWidth}|${s.boxShadow}`; });
  135 |   log("BB-20c", `focused email input: ${inputStyle}; focused Log In button: ${btn}`);
  136 |   await shot(page, "ui", "BB-20c-focus-indicator-login-button", false);
  137 |   expect(btn.startsWith("none|") && btn.endsWith("none"), "focused button must show an outline or ring").toBe(false);
  138 | });
  139 | 
  140 | test("BB-20d rating star buttons expose accessible names and selected state", async ({ page }) => {
  141 |   const email = `qa.ui.stars.${RUN}@tastelanka.test`;
  142 |   await apiRegister("QA Stars", email);
  143 |   await loginOk(page, email);
  144 |   await page.goto("/reviews/new?restaurant=nuga-gama");
  145 |   await settle(page);
  146 |   const names = await page.locator("fieldset").first().getByRole("button").evaluateAll((els) =>
  147 |     els.map((e) => `${e.getAttribute("aria-label") ?? e.textContent}|pressed=${e.getAttribute("aria-pressed")}`));
  148 |   log("BB-20d", `food-quality star buttons: ${names.join(", ")}`);
  149 |   expect(names.every((n) => /[1-5]/.test(n.split("|")[0])), "each star should be announced with its value").toBe(true);
  150 | });
  151 | 
  152 | test("BB-20e search and filter inputs have programmatic labels", async ({ page }) => {
  153 |   await page.goto("/restaurants");
  154 |   await settle(page);
  155 |   const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input:not([type=hidden]), select, textarea")]
  156 |     .filter((el) => !(el as HTMLInputElement).labels?.length && !el.getAttribute("aria-label") && !el.getAttribute("aria-labelledby"))
  157 |     .map((el) => `${el.tagName.toLowerCase()}[${el.getAttribute("placeholder") ?? el.getAttribute("type") ?? ""}]`));
  158 |   log("BB-20e", `unlabeled controls on /restaurants: ${unlabeled.join(", ") || "none"}`);
  159 |   expect(unlabeled).toEqual([]);
  160 | });
  161 | 
  162 | // ------------------------------------------------------------------------------------------------ multilingual (BB-19)
  163 | test("BB-19a approved Sinhala and Tamil reviews display correctly with Unicode fonts", async ({ page }) => {
  164 |   await page.goto("/restaurants/ministry-of-crab");
  165 |   await settle(page);
  166 |   const si = page.getByText("රසවත් කකුළුවන් කෑම. සේවය ඉතා හොඳයි.");
  167 |   const ta = page.getByText("மிகவும் சுவையான உணவு. சேவை நன்றாக இருந்தது.");
  168 |   await expect(si).toBeVisible();
  169 |   await expect(ta).toBeVisible();
  170 |   await si.scrollIntoViewIfNeeded();
  171 |   const fonts = await si.evaluate((el) => getComputedStyle(el).fontFamily);
  172 |   const glyphs = await page.evaluate(async () => ({ si: document.fonts.check("16px 'Noto Sans Sinhala'", "ක"), loaded: [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family) }));
  173 |   log("BB-19a", `font-family=${fonts}; loaded fonts=${[...new Set(glyphs.loaded)].join(", ")}`);
  174 |   await shot(page, "ui", "BB-19a-sinhala-tamil-reviews");
  175 |   expect(fonts.toLowerCase()).toContain("sinhala");
  176 | });
  177 | 
  178 | test("BB-19b customer can write a review in Sinhala and in Tamil via the language selector", async ({ page }) => {
  179 |   const email = `qa.ui.lang.${RUN}@tastelanka.test`;
  180 |   await apiRegister("QA Language", email);
  181 |   await loginOk(page, email);
  182 |   for (const [button, text] of [["සිංහල", "ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි."], ["தமிழ்", "அருமையான உணவு, மீண்டும் வருவேன்."]] as const) {
  183 |     await page.goto("/reviews/new?restaurant=nuga-gama");
  184 |     await settle(page);
  185 |     await page.getByRole("button", { name: button }).click();
  186 |     await page.getByLabel("Review").fill(text);
  187 |     await page.getByRole("button", { name: "Submit Review" }).click();
  188 |     await expect(page.getByText("Thank you. Your review is pending moderator approval.")).toBeVisible();
  189 |   }
  190 |   await page.goto("/profile");
  191 |   await expect(page.getByText("ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි.")).toBeVisible();
  192 |   await expect(page.getByText("அருமையான உணவு, மீண்டும் வருவேன்.")).toBeVisible();
  193 |   await shot(page, "ui", "BB-19b-sinhala-tamil-reviews-submitted-profile");
  194 | });
  195 | 
  196 | test("BB-19c interface language can be switched to Sinhala / Tamil", async ({ page }) => {
  197 |   await page.goto("/");
  198 |   await settle(page);
  199 |   const switcher = await page.locator("select, button, a").filter({ hasText: /^(සිංහල|தமிழ்|SI|TA|Language)$/ }).count();
  200 |   const htmlLang = await page.evaluate(() => document.documentElement.lang);
  201 |   log("BB-19c", `language switch controls on home page=${switcher}; <html lang>=${htmlLang}`);
> 202 |   expect(switcher, "a UI language selector (EN/SI/TA)").toBeGreaterThan(0);
      |                                                         ^ Error: a UI language selector (EN/SI/TA)
  203 | });
  204 | 
  205 | // ------------------------------------------------------------------------------------------------ UI performance (dev server)
  206 | test("PERF-UI page load timings (Next.js dev server; indicative only)", async ({ page }) => {
  207 |   const rows: string[] = ["page,url,domContentLoadedMs,loadMs,contentReadyMs"];
  208 |   for (const [name, url] of [["home", "/"], ["restaurants", "/restaurants"], ["restaurant-details", "/restaurants/ministry-of-crab"], ["search", "/restaurants?q=crab"]] as const) {
  209 |     await page.goto(url); await settle(page); // warm (dev compile)
  210 |     const t0 = Date.now();
  211 |     await page.goto(url);
  212 |     await expect(page.locator("h1").first()).toBeVisible();
  213 |     await settle(page);
  214 |     const ready = Date.now() - t0;
  215 |     const nav = await page.evaluate(() => { const n = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming; return [Math.round(n.domContentLoadedEventEnd), Math.round(n.loadEventEnd)]; });
  216 |     rows.push(`${name},${url},${nav[0]},${nav[1]},${ready}`);
  217 |   }
  218 |   fs.mkdirSync(path.join(EVIDENCE, "performance"), { recursive: true });
  219 |   fs.writeFileSync(path.join(EVIDENCE, "performance", "PERF-UI-page-load.csv"), rows.join("\n") + "\n");
  220 |   log("PERF-UI", rows.join(" ; "));
  221 | });
  222 | 
```