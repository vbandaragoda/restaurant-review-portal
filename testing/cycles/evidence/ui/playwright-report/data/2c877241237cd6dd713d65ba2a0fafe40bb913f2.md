# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: customer.spec.ts >> TC-UI-013 home page filter chips and location selector affect results
- Location: specs\customer.spec.ts:324:5

# Error details

```
Error: clicking a filter chip should apply a filter

expect(received).not.toBe(expected) // Object.is equality

Expected: not "http://localhost:3000/"
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
      - generic [ref=f1e14]:
        - link "Log In" [ref=f1e15] [cursor=pointer]:
          - /url: /login
        - link "Sign Up" [ref=f1e16] [cursor=pointer]:
          - /url: /signup
    - generic [ref=f1e17]:
      - heading "Find restaurants" [level=1] [ref=f1e18]
      - paragraph [ref=f1e19]: Search and filter restaurants across Colombo, Kandy and Galle.
      - generic [ref=f1e20]:
        - textbox "restaurants, dishes or cuisines..." [ref=f1e21]: cafe
        - combobox [ref=f1e22]:
          - option "All Locations" [selected]
          - option "Colombo"
          - option "Kandy"
          - option "Galle"
        - button "Search" [ref=f1e23]
    - main [ref=f1e24]:
      - complementary [ref=f1e25]:
        - generic [ref=f1e26]:
          - heading "Filters" [level=2] [ref=f1e27]
          - button "Clear all" [ref=f1e28]
        - generic [ref=f1e29]:
          - heading "Location" [level=3] [ref=f1e30]
          - generic [ref=f1e31]:
            - generic [ref=f1e32]:
              - checkbox "Colombo" [ref=f1e33]
              - text: Colombo
            - generic [ref=f1e34]:
              - checkbox "Kandy" [ref=f1e35]
              - text: Kandy
            - generic [ref=f1e36]:
              - checkbox "Galle" [ref=f1e37]
              - text: Galle
        - generic [ref=f1e38]:
          - heading "Cuisine" [level=3] [ref=f1e39]
          - generic [ref=f1e40]:
            - generic [ref=f1e41]:
              - checkbox "Sri Lankan" [ref=f1e42]
              - text: Sri Lankan
            - generic [ref=f1e43]:
              - checkbox "Indian" [ref=f1e44]
              - text: Indian
            - generic [ref=f1e45]:
              - checkbox "Chinese" [ref=f1e46]
              - text: Chinese
            - generic [ref=f1e47]:
              - checkbox "Italian" [ref=f1e48]
              - text: Italian
            - generic [ref=f1e49]:
              - checkbox "Middle Eastern" [ref=f1e50]
              - text: Middle Eastern
            - generic [ref=f1e51]:
              - checkbox "Western" [ref=f1e52]
              - text: Western
        - generic [ref=f1e53]:
          - heading "Dietary" [level=3] [ref=f1e54]
          - generic [ref=f1e55]:
            - checkbox "Vegetarian" [ref=f1e56]
            - text: Vegetarian
          - generic [ref=f1e57]:
            - checkbox "Vegan" [ref=f1e58]
            - text: Vegan
          - generic [ref=f1e59]:
            - checkbox "Halal" [ref=f1e60]
            - text: Halal
        - button "Apply Filters" [ref=f1e61]
      - generic [ref=f1e62]:
        - generic [ref=f1e63]:
          - generic [ref=f1e64]:
            - heading "Restaurants" [level=2] [ref=f1e65]
            - paragraph [ref=f1e66]: 3 restaurants found
          - combobox [ref=f1e67]:
            - 'option "Sort: Top Rated" [selected]'
        - generic [ref=f1e68]:
          - article [ref=f1e69]:
            - generic [ref=f1e71]:
              - heading "The Empire Cafe" [level=3] [ref=f1e72]
              - paragraph [ref=f1e73]:
                - text: ★ 4.6
                - generic [ref=f1e74]: (220 reviews)
              - paragraph [ref=f1e75]: Cafe · International · Kandy
              - paragraph [ref=f1e76]: LKR 2,000 – 4,000
              - paragraph [ref=f1e77]: Casual dining with local and international favourites.
              - generic [ref=f1e78]:
                - generic [ref=f1e79]: Cafe
                - generic [ref=f1e80]: Kandy
                - link "View Details" [ref=f1e81] [cursor=pointer]:
                  - /url: /restaurants/the-empire-cafe
          - article [ref=f1e82]:
            - generic [ref=f1e84]:
              - heading "Pedlar’s Inn" [level=3] [ref=f1e85]
              - paragraph [ref=f1e86]:
                - text: ★ 4.5
                - generic [ref=f1e87]: (490 reviews)
              - paragraph [ref=f1e88]: Cafe · International · Galle
              - paragraph [ref=f1e89]: LKR 5,000 – 8,000
              - paragraph [ref=f1e90]: Relaxed cafe-style dining in the Galle area.
              - generic [ref=f1e91]:
                - generic [ref=f1e92]: Cafe
                - generic [ref=f1e93]: Galle
                - link "View Details" [ref=f1e94] [cursor=pointer]:
                  - /url: /restaurants/pedlars-inn
          - article [ref=f1e95]:
            - generic [ref=f1e97]:
              - heading "QA Reviewed Cafe" [level=3] [ref=f1e98]
              - paragraph [ref=f1e99]:
                - text: ★ 0
                - generic [ref=f1e100]: (0 reviews)
              - paragraph [ref=f1e101]: Sri Lankan · Fusion · Galle
              - paragraph [ref=f1e102]: LKR 1,000 – 2,500
              - paragraph [ref=f1e103]: Created by QA API test.
              - generic [ref=f1e104]:
                - generic [ref=f1e105]: Sri Lankan
                - generic [ref=f1e106]: Galle
                - link "View Details" [ref=f1e107] [cursor=pointer]:
                  - /url: /restaurants/qa-rest2-190512
    - contentinfo [ref=f1e108]:
      - generic [ref=f1e109]:
        - paragraph [ref=f1e110]: TasteLanka
        - paragraph [ref=f1e111]: Discover • Dine • Review
        - paragraph [ref=f1e112]: Good Food. A Better Sri Lanka.
      - navigation "Footer navigation" [ref=f1e113]:
        - link "Home" [ref=f1e114] [cursor=pointer]:
          - /url: /
        - link "About" [ref=f1e115] [cursor=pointer]:
          - /url: /about
        - link "Contact" [ref=f1e116] [cursor=pointer]:
          - /url: /contact
        - link "Terms" [ref=f1e117] [cursor=pointer]:
          - /url: /terms
        - link "Privacy" [ref=f1e118] [cursor=pointer]:
          - /url: /privacy
  - button "Open Next.js Dev Tools" [ref=f1e124] [cursor=pointer]
  - alert [ref=f1e128]
```

# Test source

```ts
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
  312 |   expect(text).toContain(`(${api.reviewCount} reviews)`);
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
> 337 |   expect(afterChip, "clicking a filter chip should apply a filter").not.toBe("http://localhost:3000/");
      |                                                                         ^ Error: clicking a filter chip should apply a filter
  338 |   expect(names.every((n) => n === "Pedlar’s Inn"), "location Galle should restrict results").toBe(true);
  339 | });
  340 | 
```