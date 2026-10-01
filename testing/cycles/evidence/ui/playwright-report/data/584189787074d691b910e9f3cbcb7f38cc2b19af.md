# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: customer.spec.ts >> BB-08d price and spice filters are available on restaurant search
- Location: specs\customer.spec.ts:169:5

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
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
  74  | test("BB-05 profile shows the user's name, email, reviews and saved sections", async ({ page }) => {
  75  |   await loginOk(page, email("cust"));
  76  |   await expect(page.getByRole("heading", { name: "QA UI Customer" })).toBeVisible();
  77  |   await expect(page.getByText(email("cust"))).toBeVisible();
  78  |   await expect(page.getByRole("heading", { name: "Saved Restaurants" })).toBeVisible();
  79  |   await shot(page, "ui", "BB-05-profile");
  80  | });
  81  | 
  82  | test("TC-UI-002 logout clears the session and protects the profile route", async ({ page }) => {
  83  |   await apiRegister("QA Logout", email("logout")); // self-contained: does not depend on BB-01
  84  |   await loginOk(page, email("logout"));
  85  |   await page.getByRole("button", { name: "Log Out" }).click();
  86  |   await expect(page).toHaveURL("http://localhost:3000/");
  87  |   expect(await page.evaluate(() => localStorage.getItem("tastelanka.token"))).toBeNull();
  88  |   await page.goto("/profile");
  89  |   await expect(page).toHaveURL(/\/login\?next=\/profile/);
  90  |   await shot(page, "ui", "TC-UI-002-logout-profile-redirect", false);
  91  | });
  92  | 
  93  | test("BB-06 restaurant listing displays available restaurants", async ({ page }) => {
  94  |   await page.goto("/restaurants");
  95  |   await expect(page.getByText(/\d+ restaurants found/)).toBeVisible();
  96  |   await expect(page.getByRole("heading", { name: "Ministry of Crab" })).toBeVisible();
  97  |   const count = await page.getByRole("link", { name: "View Details" }).count();
  98  |   log("BB-06", `listing shows ${count} restaurants`);
  99  |   expect(count).toBeGreaterThanOrEqual(5);
  100 |   await shot(page, "ui", "BB-06-restaurant-listing");
  101 | });
  102 | 
  103 | test("BB-07 search returns matching restaurants", async ({ page }) => {
  104 |   await page.goto("/restaurants");
  105 |   await page.getByPlaceholder("restaurants, dishes or cuisines...").fill("crab");
  106 |   await page.getByRole("button", { name: "Search" }).click();
  107 |   await expect(page.getByText("1 restaurants found")).toBeVisible();
  108 |   await expect(page.getByRole("heading", { name: "Ministry of Crab" })).toBeVisible();
  109 |   await shot(page, "ui", "BB-07-search-crab");
  110 | });
  111 | 
  112 | test("TC-UI-003 search with no matches shows an empty-state message", async ({ page }) => {
  113 |   await page.goto("/restaurants?q=zzqqxx");
  114 |   await expect(page.getByText("No restaurants match these filters.")).toBeVisible();
  115 |   await shot(page, "ui", "TC-UI-003-search-no-results", false);
  116 | });
  117 | 
  118 | test("TC-UI-004 home page search submits to results page", async ({ page }) => {
  119 |   await page.goto("/");
  120 |   await page.locator("#desktop-search").fill("galle");
  121 |   await page.getByRole("button", { name: "Search" }).click();
  122 |   await expect(page).toHaveURL(/\/restaurants\?q=galle/);
  123 |   await expect(page.getByRole("heading", { name: "Pedlar’s Inn" })).toBeVisible();
  124 | });
  125 | 
  126 | test("BB-08a filter by location and dietary options reflects criteria", async ({ page }) => {
  127 |   await page.goto("/restaurants");
  128 |   await expect(page.getByText(/\d+ restaurants found/)).toBeVisible();
  129 |   await page.getByRole("checkbox", { name: "Kandy" }).check();
  130 |   await page.getByRole("checkbox", { name: "Vegan" }).check();
  131 |   await page.getByRole("button", { name: "Apply Filters" }).click();
  132 |   await expect(page.getByText("2 restaurants found")).toBeVisible();
  133 |   await expect(page.getByRole("heading", { name: "Ministry of Crab" })).toHaveCount(0);
  134 |   await shot(page, "ui", "BB-08a-filter-kandy-vegan");
  135 | });
  136 | 
  137 | test("BB-08b 'Clear all' resets filters and results", async ({ page }) => {
  138 |   await page.goto("/restaurants");
  139 |   await expect(page.getByText("Loading restaurants…")).toHaveCount(0);
  140 |   await expect(page.getByRole("link", { name: "View Details" }).first()).toBeVisible();
  141 |   const all = Number((await page.getByText(/\d+ restaurants found/).textContent())?.match(/\d+/)?.[0]);
  142 |   await page.getByRole("checkbox", { name: "Galle" }).check();
  143 |   await page.getByRole("button", { name: "Apply Filters" }).click();
  144 |   await expect(page.getByText(`${all} restaurants found`)).toHaveCount(0);
  145 |   const galle = Number((await page.getByText(/\d+ restaurants found/).textContent())?.match(/\d+/)?.[0]);
  146 |   const locs = await page.locator("article p.text-muted").filter({ hasText: " · " }).allTextContents();
  147 |   expect(locs.every((t) => t.endsWith("Galle"))).toBe(true);
  148 |   log("BB-08b", `all=${all}; Galle filter=${galle}`);
  149 |   await page.getByRole("button", { name: "Clear all" }).click();
  150 |   await expect(page.getByRole("checkbox", { name: "Galle" })).not.toBeChecked();
  151 |   await page.waitForTimeout(1500);
  152 |   const text = await page.getByText(/\d+ restaurants found/).textContent();
  153 |   log("BB-08b", `after Clear all (no Apply clicked) results text: ${text}`);
  154 |   await shot(page, "ui", "BB-08b-clear-all");
  155 |   expect(Number(text?.match(/\d+/)?.[0]), "results should reset to the unfiltered count after Clear all").toBe(all);
  156 | });
  157 | 
  158 | test("BB-08c cuisine category link filters the listing", async ({ page }) => {
  159 |   await page.goto("/cuisines");
  160 |   await page.getByRole("link", { name: "Seafood" }).click();
  161 |   await expect(page).toHaveURL(/cuisine=Seafood/);
  162 |   await expect(page.getByText(/\d+ restaurants found/)).toBeVisible();
  163 |   const names = await page.locator("article h3").allTextContents();
  164 |   log("BB-08c", `cuisine=Seafood listing shows: ${names.join(", ")}`);
  165 |   await shot(page, "ui", "BB-08c-cuisine-link-seafood");
  166 |   expect(names).toEqual(["Ministry of Crab"]);
  167 | });
  168 | 
  169 | test("BB-08d price and spice filters are available on restaurant search", async ({ page }) => {
  170 |   await page.goto("/restaurants");
  171 |   const priceControl = await page.getByText(/price/i).filter({ has: page.locator("input,select") }).count();
  172 |   const priceCheckboxes = await page.getByRole("checkbox", { name: /LKR|price|budget/i }).count();
  173 |   log("BB-08d", `price filter controls found: ${priceControl + priceCheckboxes}`);
> 174 |   expect(priceControl + priceCheckboxes).toBeGreaterThan(0);
      |                                          ^ Error: expect(received).toBeGreaterThan(expected)
  175 | });
  176 | 
  177 | test("BB-09 restaurant details show info, menu and dish details", async ({ page }) => {
  178 |   await page.goto("/restaurants");
  179 |   await page.getByRole("article").filter({ hasText: "Ministry of Crab" }).getByRole("link", { name: "View Details" }).click();
  180 |   await expect(page).toHaveURL(/\/restaurants\/ministry-of-crab/);
  181 |   await expect(page.getByRole("heading", { name: "About this restaurant" })).toBeVisible();
  182 |   await expect(page.getByRole("heading", { name: "Chilli Crab" })).toBeVisible();
  183 |   await shot(page, "ui", "BB-09a-restaurant-details-menu");
  184 |   await page.getByRole("article").filter({ hasText: "Chilli Crab" }).getByRole("link", { name: "View Dish" }).click();
  185 |   await expect(page).toHaveURL(/\/dishes\/chilli-crab/);
  186 |   await expect(page.getByText("LKR 9,500")).toBeVisible();
  187 |   await expect(page.getByText("Hot", { exact: true })).toBeVisible();
  188 |   await shot(page, "ui", "BB-09b-dish-details");
  189 | });
  190 | 
  191 | test("TC-UI-005 unknown restaurant slug shows an error state", async ({ page }) => {
  192 |   await page.goto("/restaurants/does-not-exist");
  193 |   await expect(page.getByText(/could not be loaded/)).toBeVisible();
  194 |   await shot(page, "ui", "TC-UI-005-unknown-restaurant", false);
  195 | });
  196 | 
  197 | test("BB-10 authenticated user submits a valid review (stored for moderation)", async ({ page }) => {
  198 |   await loginOk(page, email("cust"));
  199 |   await page.goto("/restaurants/green-leaf-kitchen");
  200 |   await page.getByRole("link", { name: "Write a Review" }).click();
  201 |   await expect(page).toHaveURL(/\/reviews\/new\?restaurant=green-leaf-kitchen/);
  202 |   await expect(page.getByText("Green Leaf Kitchen")).toBeVisible();
  203 |   await page.getByLabel("Review").fill(`QA UI review ${RUN}: lovely vegetarian curry, attentive staff.`);
  204 |   await page.getByRole("button", { name: "Submit Review" }).click();
  205 |   await expect(page.getByText("Thank you. Your review is pending moderator approval.")).toBeVisible();
  206 |   await shot(page, "ui", "BB-10-review-submitted");
  207 | });
  208 | 
  209 | test("BB-11a review with text shorter than 10 characters is blocked", async ({ page }) => {
  210 |   await loginOk(page, email("cust"));
  211 |   await page.goto("/reviews/new?restaurant=green-leaf-kitchen");
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
```