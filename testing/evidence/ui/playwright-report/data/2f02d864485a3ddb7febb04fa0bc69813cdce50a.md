# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: customer.spec.ts >> TC-UI-011 home 'Top Rated' section reflects API data
- Location: specs\customer.spec.ts:306:5

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "(220 reviews)"
Received string:    "★ 4.6 (210 reviews)The Empire CafeCafe · International⌖  KandyLKR 2,000 – 4,000"
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
  212 |   await page.getByLabel("Review").fill("short");
  213 |   await page.getByRole("button", { name: "Submit Review" }).click();
  214 |   const msg = await page.getByLabel("Review").evaluate((el: HTMLTextAreaElement) => el.validationMessage);
  215 |   log("BB-11a", `textarea validationMessage="${msg}"`);
  216 |   expect(msg).not.toBe("");
  217 |   await expect(page.getByText("Thank you.")).toHaveCount(0);
  218 |   await shot(page, "ui", "BB-11a-review-too-short", false);
  219 | });
  220 | 
  221 | test("BB-11b rating outside 1-5 cannot be entered in the UI (star control limits range)", async ({ page }) => {
  222 |   await loginOk(page, email("cust"));
  223 |   await page.goto("/reviews/new?restaurant=green-leaf-kitchen");
  224 |   const stars = page.getByRole("group", { name: /Food quality/ }).or(page.locator("fieldset").filter({ hasText: "Food quality" }));
  225 |   const count = await stars.first().getByRole("button").count();
  226 |   log("BB-11b", `food-quality star buttons = ${count}`);
  227 |   expect(count).toBe(5);
  228 | });
  229 | 
  230 | test("TC-UI-006 'Write a Review' from home page (no restaurant selected) lets the user pick a restaurant", async ({ page }) => {
  231 |   await loginOk(page, email("cust"));
  232 |   await page.goto("/");
  233 |   await page.getByRole("link", { name: "Write a Review" }).click();
  234 |   await expect(page).toHaveURL(/\/reviews\/new$/);
  235 |   const pickers = await page.locator("select, input[list], [role=combobox]").count();
  236 |   await page.getByLabel("Review").fill("QA review submitted without choosing a restaurant.");
  237 |   await page.getByRole("button", { name: "Submit Review" }).click();
  238 |   await page.waitForTimeout(1500);
  239 |   await shot(page, "ui", "TC-UI-006-review-without-restaurant");
  240 |   log("TC-UI-006", `restaurant picker controls=${pickers}`);
  241 |   expect(pickers, "a restaurant selector should be offered").toBeGreaterThan(0);
  242 | });
  243 | 
  244 | test("BB-12 user sees own submitted reviews with status", async ({ page }) => {
  245 |   await loginOk(page, email("cust"));
  246 |   const card = page.getByRole("article").filter({ hasText: `QA UI review ${RUN}` });
  247 |   await expect(card).toBeVisible();
  248 |   await expect(card.getByText("PENDING")).toBeVisible();
  249 |   await shot(page, "ui", "BB-12-own-reviews-pending");
  250 | });
  251 | 
  252 | test("TC-UI-007 saved restaurant: save, view on profile, remove", async ({ page }) => {
  253 |   await loginOk(page, email("cust"));
  254 |   await page.goto("/restaurants/pedlars-inn");
  255 |   await page.getByRole("button", { name: "Save" }).click();
  256 |   await expect(page.getByRole("button", { name: "Saved" })).toBeVisible();
  257 |   await shot(page, "ui", "TC-UI-007a-restaurant-saved", false);
  258 |   await page.goto("/profile");
  259 |   const saved = page.getByRole("article").filter({ hasText: "Pedlar’s Inn • Galle" });
  260 |   await expect(saved).toBeVisible();
  261 |   await shot(page, "ui", "TC-UI-007b-profile-saved-list");
  262 |   await saved.getByRole("button", { name: "Remove" }).click();
  263 |   await expect(saved).toHaveCount(0);
  264 |   await page.reload();
  265 |   await expect(page.getByRole("article").filter({ hasText: "Pedlar’s Inn • Galle" })).toHaveCount(0);
  266 |   await shot(page, "ui", "TC-UI-007c-profile-saved-removed");
  267 | });
  268 | 
  269 | test("TC-UI-008 saved state is shown when revisiting an already-saved restaurant", async ({ page }) => {
  270 |   await loginOk(page, email("cust"));
  271 |   await page.goto("/restaurants/nuga-gama");
  272 |   await page.getByRole("button", { name: "Save" }).click();
  273 |   await expect(page.getByRole("button", { name: "Saved" })).toBeVisible();
  274 |   await page.reload();
  275 |   await expect(page.getByRole("heading", { name: "Nuga Gama" })).toBeVisible();
  276 |   const label = await page.getByRole("button", { name: /^Save/ }).textContent();
  277 |   log("TC-UI-008", `button label after reload of saved restaurant: ${label}`);
  278 |   await shot(page, "ui", "TC-UI-008-saved-state-after-reload", false);
  279 |   expect(label).toBe("Saved");
  280 | });
  281 | 
  282 | test("TC-UI-009 unauthenticated 'Save' redirects to login", async ({ page }) => {
  283 |   await page.goto("/restaurants/nuga-gama");
  284 |   await page.getByRole("button", { name: "Save" }).click();
  285 |   await expect(page).toHaveURL(/\/login\?next=%2Frestaurants%2Fnuga-gama/);
  286 | });
  287 | 
  288 | test("TC-UI-010 unauthenticated review form redirects to login", async ({ page }) => {
  289 |   await page.goto("/reviews/new?restaurant=nuga-gama");
  290 |   await expect(page).toHaveURL(/\/login\?next=/);
  291 | });
  292 | 
  293 | test("TC-SEC-031 stored XSS payload in an approved review is rendered as text (no script execution)", async ({ page }) => {
  294 |   const dialogs: string[] = [];
  295 |   page.on("dialog", async (d) => { dialogs.push(d.message()); await d.dismiss(); });
  296 |   await page.goto("/restaurants/nuga-gama");
  297 |   await expect(page.getByText("QA XSS probe", { exact: false })).toBeVisible();
  298 |   const injected = await page.locator("script:has-text('xss-qa'), img[onerror]").count();
  299 |   await page.waitForTimeout(1500);
  300 |   await shot(page, "security", "TC-SEC-031-xss-rendered-as-text");
  301 |   log("TC-SEC-031", `dialogs fired=${dialogs.length}; injected elements=${injected}`);
  302 |   expect(dialogs).toEqual([]);
  303 |   expect(injected).toBe(0);
  304 | });
  305 | 
  306 | test("TC-UI-011 home 'Top Rated' section reflects API data", async ({ page }) => {
  307 |   const api = await (await fetch("http://localhost:8080/api/v1/restaurants/the-empire-cafe")).json();
  308 |   await page.goto("/");
  309 |   const card = page.getByRole("link").filter({ hasText: "The Empire Cafe" }).first();
  310 |   const text = await card.textContent();
  311 |   log("TC-UI-011", `home card: "${text}"; API reviewCount=${api.reviewCount}`);
> 312 |   expect(text).toContain(`(${api.reviewCount} reviews)`);
      |                ^ Error: expect(received).toContain(expected) // indexOf
  313 | });
  314 | 
  315 | test("TC-UI-012 customer created via API sees customer header state (Profile, not Dashboard)", async ({ page }) => {
  316 |   await apiRegister("QA Header", email("header"));
  317 |   await loginOk(page, email("header"));
  318 |   await expect(page).toHaveURL(/\/profile/);
  319 |   await page.goto("/");
  320 |   await expect(page.getByRole("link", { name: "Profile" }).first()).toBeVisible();
  321 |   await expect(page.getByRole("link", { name: "Dashboard" })).toHaveCount(0);
  322 | });
  323 | 
  324 | test("TC-UI-013 home page filter chips and location selector affect results", async ({ page }) => {
  325 |   await page.goto("/");
  326 |   await page.getByRole("button", { name: "Vegan", exact: true }).click();
  327 |   await page.waitForTimeout(1000);
  328 |   const afterChip = page.url();
  329 |   await page.locator("#location").selectOption("Galle");
  330 |   await page.locator("#desktop-search").fill("cafe");
  331 |   await page.getByRole("button", { name: "Search" }).click();
  332 |   await page.waitForURL(/\/restaurants/);
  333 |   await expect(page.getByText(/\d+ restaurants found/)).toBeVisible();
  334 |   const names = await page.locator("article h3").allTextContents();
  335 |   log("TC-UI-013", `URL after clicking 'Vegan' chip: ${afterChip}; search 'cafe' + location Galle -> URL ${page.url()} results: ${names.join(", ")}`);
  336 |   await shot(page, "ui", "TC-UI-013-home-location-ignored");
  337 |   expect(afterChip, "clicking a filter chip should apply a filter").not.toBe("http://localhost:3000/");
  338 |   expect(names.every((n) => n === "Pedlar’s Inn"), "location Galle should restrict results").toBe(true);
  339 | });
  340 | 
```