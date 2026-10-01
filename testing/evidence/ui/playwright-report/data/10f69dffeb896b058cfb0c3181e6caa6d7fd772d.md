# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: customer.spec.ts >> TC-UI-006 'Write a Review' from home page (no restaurant selected) lets the user pick a restaurant
- Location: specs\customer.spec.ts:230:5

# Error details

```
Error: a restaurant selector should be offered

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - button "Open Next.js Dev Tools" [ref=f1e7] [cursor=pointer]
  - alert [ref=f1e11]: Write a Review
  - generic [ref=f1e12]:
    - banner [ref=f1e13]:
      - link "TasteLanka home" [ref=f1e14] [cursor=pointer]:
        - /url: /
        - generic [ref=f1e16]:
          - strong [ref=f1e17]: TasteLanka
          - generic [ref=f1e18]: Discover • Dine • Review
      - navigation "Main navigation" [ref=f1e19]:
        - link "Home" [ref=f1e20] [cursor=pointer]:
          - /url: /
        - link "Restaurants" [ref=f1e21] [cursor=pointer]:
          - /url: /restaurants
        - link "Cuisines" [ref=f1e22] [cursor=pointer]:
          - /url: /cuisines
        - link "About" [ref=f1e23] [cursor=pointer]:
          - /url: /about
      - link "Profile" [ref=f1e25] [cursor=pointer]:
        - /url: /profile
    - main [ref=f1e26]:
      - link "‹ Back" [ref=f1e27] [cursor=pointer]:
        - /url: /restaurants
      - heading "Write a Review" [level=1] [ref=f1e28]
      - paragraph [ref=f1e29]: Share your dining experience
      - generic [ref=f1e30]: The review could not be submitted. Please check all fields and try again.
      - generic [ref=f1e32]:
        - group "Food quality" [ref=f1e33]:
          - 'generic "Food quality: 5 out of 5" [ref=f1e35]':
            - button "★" [ref=f1e36]
            - button "★" [ref=f1e37]
            - button "★" [ref=f1e38]
            - button "★" [ref=f1e39]
            - button "★" [ref=f1e40]
        - group "Customer service" [ref=f1e41]:
          - 'generic "Customer service: 5 out of 5" [ref=f1e43]':
            - button "★" [ref=f1e44]
            - button "★" [ref=f1e45]
            - button "★" [ref=f1e46]
            - button "★" [ref=f1e47]
            - button "★" [ref=f1e48]
        - group "Overall experience" [ref=f1e49]:
          - 'generic "Overall experience: 5 out of 5" [ref=f1e51]':
            - button "★" [ref=f1e52]
            - button "★" [ref=f1e53]
            - button "★" [ref=f1e54]
            - button "★" [ref=f1e55]
            - button "★" [ref=f1e56]
        - group "Language" [ref=f1e57]:
          - generic [ref=f1e59]:
            - button "English" [ref=f1e60]
            - button "සිංහල" [ref=f1e61]
            - button "தமிழ்" [ref=f1e62]
        - generic [ref=f1e63]:
          - text: Review
          - textbox "Review" [ref=f1e64]:
            - /placeholder: Share your dining experience…
            - text: QA review submitted without choosing a restaurant.
        - generic [ref=f1e65]: Review is published only after moderator approval.
        - generic [ref=f1e66]:
          - link "Cancel" [ref=f1e67] [cursor=pointer]:
            - /url: /restaurants
          - button "Submit Review" [ref=f1e68]
```

# Test source

```ts
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
  174 |   expect(priceControl + priceCheckboxes).toBeGreaterThan(0);
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
> 241 |   expect(pickers, "a restaurant selector should be offered").toBeGreaterThan(0);
      |                                                              ^ Error: a restaurant selector should be offered
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
  337 |   expect(afterChip, "clicking a filter chip should apply a filter").not.toBe("http://localhost:3000/");
  338 |   expect(names.every((n) => n === "Pedlar’s Inn"), "location Galle should restrict results").toBe(true);
  339 | });
  340 | 
```