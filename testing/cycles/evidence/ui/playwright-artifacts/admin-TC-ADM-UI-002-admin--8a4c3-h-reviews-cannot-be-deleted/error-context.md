# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> TC-ADM-UI-002 admin sees a clear message when a restaurant with reviews cannot be deleted
- Location: specs\admin.spec.ts:93:5

# Error details

```
Error: admin must have a way to act on the instruction 'Remove its menu and reviews first'

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [ref=f2e1]:
  - generic [ref=f2e2]:
    - banner [ref=f2e3]:
      - link "TasteLanka home" [ref=f2e4] [cursor=pointer]:
        - /url: /
        - generic [ref=f2e6]:
          - strong [ref=f2e7]: TasteLanka
          - generic [ref=f2e8]: Discover • Dine • Review
      - navigation "Main navigation" [ref=f2e9]:
        - link "Home" [ref=f2e10] [cursor=pointer]:
          - /url: /
        - link "Restaurants" [ref=f2e11] [cursor=pointer]:
          - /url: /restaurants
        - link "Cuisines" [ref=f2e12] [cursor=pointer]:
          - /url: /cuisines
        - link "About" [ref=f2e13] [cursor=pointer]:
          - /url: /about
      - link "Dashboard" [ref=f2e15] [cursor=pointer]:
        - /url: /admin
    - generic [ref=f2e16]:
      - complementary [ref=f2e17]:
        - paragraph [ref=f2e18]: ADMIN PORTAL
        - navigation [ref=f2e19]:
          - link "Dashboard" [ref=f2e20] [cursor=pointer]:
            - /url: /admin
          - link "Restaurants" [ref=f2e21] [cursor=pointer]:
            - /url: /admin/restaurants
          - link "Menu" [ref=f2e22] [cursor=pointer]:
            - /url: /admin/menu
          - link "Review Moderation" [ref=f2e23] [cursor=pointer]:
            - /url: /admin/reviews
      - main [ref=f2e24]:
        - heading "Review Moderation" [level=1] [ref=f2e25]
        - paragraph [ref=f2e26]: Approve or reject multilingual community reviews before publication.
        - generic [ref=f2e27]:
          - generic [ref=f2e28]:
            - button "PENDING" [ref=f2e29]
            - button "APPROVED" [active] [ref=f2e30]
            - button "REJECTED" [ref=f2e31]
          - generic [ref=f2e32]:
            - article [ref=f2e33]:
              - generic [ref=f2e34]:
                - heading "QA User A" [level=2] [ref=f2e35]
                - generic [ref=f2e36]: reviewed Nuga Gama
                - generic [ref=f2e37]: en
              - paragraph [ref=f2e38]: ★★★★☆
              - paragraph [ref=f2e39]: "QA review: tasty rice and curry, friendly staff."
              - paragraph [ref=f2e40]: Food 4 • Service 5 • Overall 4
            - article [ref=f2e41]:
              - generic [ref=f2e42]:
                - heading "QA User B" [level=2] [ref=f2e43]
                - generic [ref=f2e44]: reviewed Chilli Crab
                - generic [ref=f2e45]: si
              - paragraph [ref=f2e46]: ★★★★☆
              - paragraph [ref=f2e47]: රසවත් කකුළුවන් කෑම. සේවය ඉතා හොඳයි.
              - paragraph [ref=f2e48]: Food 4 • Service 5 • Overall 4
            - article [ref=f2e49]:
              - generic [ref=f2e50]:
                - heading "QA User B" [level=2] [ref=f2e51]
                - generic [ref=f2e52]: reviewed Ministry of Crab
                - generic [ref=f2e53]: ta
              - paragraph [ref=f2e54]: ★★★★☆
              - paragraph [ref=f2e55]: மிகவும் சுவையான உணவு. சேவை நன்றாக இருந்தது.
              - paragraph [ref=f2e56]: Food 4 • Service 5 • Overall 4
            - article [ref=f2e57]:
              - generic [ref=f2e58]:
                - heading "QA User B" [level=2] [ref=f2e59]
                - generic [ref=f2e60]: reviewed Nuga Gama
                - generic [ref=f2e61]: en
              - paragraph [ref=f2e62]: ★★★★☆
              - paragraph [ref=f2e63]: <script>alert('xss-qa')</script><img src=x onerror=alert('xss-img')> QA XSS probe
              - paragraph [ref=f2e64]: Food 4 • Service 5 • Overall 4
            - article [ref=f2e65]:
              - generic [ref=f2e66]:
                - heading "QA Moderation Customer" [level=2] [ref=f2e67]
                - generic [ref=f2e68]: reviewed The Empire Cafe
                - generic [ref=f2e69]: en
              - paragraph [ref=f2e70]: ★★★★★
              - paragraph [ref=f2e71]: QA-MOD-APPROVE 140148 excellent hoppers
              - paragraph [ref=f2e72]: Food 5 • Service 4 • Overall 5
            - article [ref=f2e73]:
              - generic [ref=f2e74]:
                - heading "DR Two" [level=2] [ref=f2e75]
                - generic [ref=f2e76]: reviewed Pedlar’s Inn
                - generic [ref=f2e77]: en
              - paragraph [ref=f2e78]: ★★★★☆
              - paragraph [ref=f2e79]: DR-02 140824 the lamprais was superb and service quick
              - paragraph [ref=f2e80]: Food 5 • Service 5 • Overall 4
            - article [ref=f2e81]:
              - generic [ref=f2e82]:
                - heading "DR Six" [level=2] [ref=f2e83]
                - generic [ref=f2e84]: reviewed Nuga Gama
                - generic [ref=f2e85]: en
              - paragraph [ref=f2e86]: ★★★★★
              - paragraph [ref=f2e87]: "DR-06 140824 approve me: tasty kottu"
              - paragraph [ref=f2e88]: Food 5 • Service 5 • Overall 5
            - article [ref=f2e89]:
              - generic [ref=f2e90]:
                - heading "QA Moderation Customer" [level=2] [ref=f2e91]
                - generic [ref=f2e92]: reviewed The Empire Cafe
                - generic [ref=f2e93]: en
              - paragraph [ref=f2e94]: ★★★★★
              - paragraph [ref=f2e95]: QA-MOD-APPROVE 141022 excellent hoppers
              - paragraph [ref=f2e96]: Food 5 • Service 4 • Overall 5
            - article [ref=f2e97]:
              - generic [ref=f2e98]:
                - heading "DR Two" [level=2] [ref=f2e99]
                - generic [ref=f2e100]: reviewed Pedlar’s Inn
                - generic [ref=f2e101]: en
              - paragraph [ref=f2e102]: ★★★★☆
              - paragraph [ref=f2e103]: DR-02 141022 the lamprais was superb and service quick
              - paragraph [ref=f2e104]: Food 5 • Service 5 • Overall 4
            - article [ref=f2e105]:
              - generic [ref=f2e106]:
                - heading "DR Six" [level=2] [ref=f2e107]
                - generic [ref=f2e108]: reviewed Nuga Gama
                - generic [ref=f2e109]: en
              - paragraph [ref=f2e110]: ★★★★★
              - paragraph [ref=f2e111]: "DR-06 141022 approve me: tasty kottu"
              - paragraph [ref=f2e112]: Food 5 • Service 5 • Overall 5
            - article [ref=f2e113]:
              - generic [ref=f2e114]:
                - heading "DR Six" [level=2] [ref=f2e115]
                - generic [ref=f2e116]: reviewed Nuga Gama
                - generic [ref=f2e117]: en
              - paragraph [ref=f2e118]: ★★★★★
              - paragraph [ref=f2e119]: "DR-06 141338 approve me: tasty kottu"
              - paragraph [ref=f2e120]: Food 5 • Service 5 • Overall 5
            - article [ref=f2e121]:
              - generic [ref=f2e122]:
                - heading "DR Two" [level=2] [ref=f2e123]
                - generic [ref=f2e124]: reviewed Pedlar’s Inn
                - generic [ref=f2e125]: en
              - paragraph [ref=f2e126]: ★★★★☆
              - paragraph [ref=f2e127]: DR-02 141925 the lamprais was superb and service quick
              - paragraph [ref=f2e128]: Food 5 • Service 5 • Overall 4
            - article [ref=f2e129]:
              - generic [ref=f2e130]:
                - heading "DR Six" [level=2] [ref=f2e131]
                - generic [ref=f2e132]: reviewed Nuga Gama
                - generic [ref=f2e133]: en
              - paragraph [ref=f2e134]: ★★★★★
              - paragraph [ref=f2e135]: "DR-06 141925 approve me: tasty kottu"
              - paragraph [ref=f2e136]: Food 5 • Service 5 • Overall 5
            - article [ref=f2e137]:
              - generic [ref=f2e138]:
                - heading "QA Moderation Customer" [level=2] [ref=f2e139]
                - generic [ref=f2e140]: reviewed The Empire Cafe
                - generic [ref=f2e141]: en
              - paragraph [ref=f2e142]: ★★★★★
              - paragraph [ref=f2e143]: QA-MOD-APPROVE 142944 excellent hoppers
              - paragraph [ref=f2e144]: Food 5 • Service 4 • Overall 5
            - article [ref=f2e145]:
              - generic [ref=f2e146]:
                - heading "DR Two" [level=2] [ref=f2e147]
                - generic [ref=f2e148]: reviewed Pedlar’s Inn
                - generic [ref=f2e149]: en
              - paragraph [ref=f2e150]: ★★★★☆
              - paragraph [ref=f2e151]: DR-02 142944 the lamprais was superb and service quick
              - paragraph [ref=f2e152]: Food 5 • Service 5 • Overall 4
            - article [ref=f2e153]:
              - generic [ref=f2e154]:
                - heading "QA Moderation Customer" [level=2] [ref=f2e155]
                - generic [ref=f2e156]: reviewed The Empire Cafe
                - generic [ref=f2e157]: en
              - paragraph [ref=f2e158]: ★★★★★
              - paragraph [ref=f2e159]: QA-MOD-APPROVE 143135 excellent hoppers
              - paragraph [ref=f2e160]: Food 5 • Service 4 • Overall 5
            - article [ref=f2e161]:
              - generic [ref=f2e162]:
                - heading "DR Two" [level=2] [ref=f2e163]
                - generic [ref=f2e164]: reviewed Pedlar’s Inn
                - generic [ref=f2e165]: en
              - paragraph [ref=f2e166]: ★★★★☆
              - paragraph [ref=f2e167]: DR-02 143135 the lamprais was superb and service quick
              - paragraph [ref=f2e168]: Food 5 • Service 5 • Overall 4
            - article [ref=f2e169]:
              - generic [ref=f2e170]:
                - heading "DR Six" [level=2] [ref=f2e171]
                - generic [ref=f2e172]: reviewed Nuga Gama
                - generic [ref=f2e173]: en
              - paragraph [ref=f2e174]: ★★★★★
              - paragraph [ref=f2e175]: "DR-06 143135 approve me: tasty kottu"
              - paragraph [ref=f2e176]: Food 5 • Service 5 • Overall 5
            - article [ref=f2e177]:
              - generic [ref=f2e178]:
                - heading "QA Moderation Customer" [level=2] [ref=f2e179]
                - generic [ref=f2e180]: reviewed The Empire Cafe
                - generic [ref=f2e181]: en
              - paragraph [ref=f2e182]: ★★★★★
              - paragraph [ref=f2e183]: QA-MOD-APPROVE 143146 excellent hoppers
              - paragraph [ref=f2e184]: Food 5 • Service 4 • Overall 5
            - article [ref=f2e185]:
              - generic [ref=f2e186]:
                - heading "DR Two" [level=2] [ref=f2e187]
                - generic [ref=f2e188]: reviewed Pedlar’s Inn
                - generic [ref=f2e189]: en
              - paragraph [ref=f2e190]: ★★★★☆
              - paragraph [ref=f2e191]: DR-02 143146 the lamprais was superb and service quick
              - paragraph [ref=f2e192]: Food 5 • Service 5 • Overall 4
            - article [ref=f2e193]:
              - generic [ref=f2e194]:
                - heading "DR Six" [level=2] [ref=f2e195]
                - generic [ref=f2e196]: reviewed Nuga Gama
                - generic [ref=f2e197]: en
              - paragraph [ref=f2e198]: ★★★★★
              - paragraph [ref=f2e199]: "DR-06 143146 approve me: tasty kottu"
              - paragraph [ref=f2e200]: Food 5 • Service 5 • Overall 5
            - article [ref=f2e201]:
              - generic [ref=f2e202]:
                - heading "QA Moderation Customer" [level=2] [ref=f2e203]
                - generic [ref=f2e204]: reviewed The Empire Cafe
                - generic [ref=f2e205]: en
              - paragraph [ref=f2e206]: ★★★★★
              - paragraph [ref=f2e207]: QA-MOD-APPROVE 200712 excellent hoppers
              - paragraph [ref=f2e208]: Food 5 • Service 4 • Overall 5
            - article [ref=f2e209]:
              - generic [ref=f2e210]:
                - heading "DR Two" [level=2] [ref=f2e211]
                - generic [ref=f2e212]: reviewed Pedlar’s Inn
                - generic [ref=f2e213]: en
              - paragraph [ref=f2e214]: ★★★★☆
              - paragraph [ref=f2e215]: DR-02 200712 the lamprais was superb and service quick
              - paragraph [ref=f2e216]: Food 5 • Service 5 • Overall 4
            - article [ref=f2e217]:
              - generic [ref=f2e218]:
                - heading "DR Six" [level=2] [ref=f2e219]
                - generic [ref=f2e220]: reviewed Nuga Gama
                - generic [ref=f2e221]: en
              - paragraph [ref=f2e222]: ★★★★★
              - paragraph [ref=f2e223]: "DR-06 200712 approve me: tasty kottu"
              - paragraph [ref=f2e224]: Food 5 • Service 5 • Overall 5
  - button "Open Next.js Dev Tools" [ref=f2e230] [cursor=pointer]
  - alert [ref=f2e234]
```

# Test source

```ts
  9   | }
  10  | 
  11  | test("TC-ADM-UI-001 admin login opens dashboard with live metrics", async ({ page }) => {
  12  |   await loginAdmin(page);
  13  |   const stats = await page.evaluate(async (api) => {
  14  |     const r = await fetch(`${api}/admin/dashboard`, { headers: { Authorization: `Bearer ${localStorage.getItem("tastelanka.token")}` } });
  15  |     return r.json();
  16  |   }, API);
  17  |   const card = page.getByRole("link").filter({ hasText: "Restaurants" }).filter({ hasText: "View details" });
  18  |   await expect(card).toContainText(String(stats.restaurants));
  19  |   await expect(page.getByRole("link").filter({ hasText: "Pending reviews" })).toContainText(String(stats.pendingReviews));
  20  |   log("TC-ADM-UI-001", `dashboard stats ${JSON.stringify(stats)}`);
  21  |   await shot(page, "ui", "TC-ADM-UI-001-admin-dashboard");
  22  | });
  23  | 
  24  | test("BB-14a customer is denied the admin UI (redirected to login)", async ({ page }) => {
  25  |   const email = `qa.ui.noadmin.${RUN}@tastelanka.test`;
  26  |   await apiRegister("QA Not Admin", email);
  27  |   await loginOk(page, email);
  28  |   await page.goto("/admin/restaurants");
  29  |   await expect(page).toHaveURL(/\/login\?next=\/admin/);
  30  |   await shot(page, "security", "BB-14a-customer-denied-admin-ui", false);
  31  | });
  32  | 
  33  | test("BB-14b anonymous visitor is denied the admin UI", async ({ page }) => {
  34  |   await page.goto("/admin");
  35  |   await expect(page).toHaveURL(/\/login\?next=\/admin/);
  36  | });
  37  | 
  38  | test("BB-14c customer who forges role=ADMIN in localStorage sees no admin data (API enforces role)", async ({ page }) => {
  39  |   const email = `qa.ui.forge.${RUN}@tastelanka.test`;
  40  |   await apiRegister("QA Forger", email);
  41  |   await loginOk(page, email);
  42  |   await page.evaluate(() => {
  43  |     const s = JSON.parse(localStorage.getItem("tastelanka.session")!);
  44  |     s.role = "ADMIN";
  45  |     localStorage.setItem("tastelanka.session", JSON.stringify(s));
  46  |   });
  47  |   await page.goto("/admin");
  48  |   await expect(page.getByText("Dashboard metrics could not be loaded.")).toBeVisible();
  49  |   await expect(page.getByRole("link").filter({ hasText: "Restaurants" }).filter({ hasText: "View details" })).toContainText("–");
  50  |   await shot(page, "security", "BB-14c-forged-client-role-no-data");
  51  | });
  52  | 
  53  | test("BB-15 admin creates, updates and deletes a restaurant through the UI", async ({ page }) => {
  54  |   acceptDialogs(page);
  55  |   await loginAdmin(page);
  56  |   await page.getByRole("link", { name: "Restaurants", exact: true }).last().click();
  57  |   await expect(page.getByRole("heading", { name: "Restaurant Management" })).toBeVisible();
  58  |   await page.getByLabel("Name", { exact: true }).fill("QA UI Tea House");
  59  |   await page.getByLabel("Slug").fill(slug);
  60  |   await page.getByLabel("Cuisine").fill("Sri Lankan · Tea");
  61  |   await page.getByLabel("Location").fill("Kandy");
  62  |   await page.getByLabel("Minimum price").fill("800");
  63  |   await page.getByLabel("Maximum price").fill("1600");
  64  |   await page.getByLabel("Description").fill("Created through the admin UI by QA.");
  65  |   await page.getByRole("checkbox", { name: "vegetarian" }).check();
  66  |   await page.getByRole("button", { name: "Save Restaurant" }).click();
  67  |   await expect(page.getByText("Restaurant saved.")).toBeVisible();
  68  |   const row = page.getByRole("article").filter({ hasText: "QA UI Tea House" });
  69  |   await expect(row).toBeVisible();
  70  |   await shot(page, "ui", "BB-15a-restaurant-created");
  71  |   const pub = await (await fetch(`${API}/restaurants/${slug}`)).json();
  72  |   expect(pub.name).toBe("QA UI Tea House");
  73  | 
  74  |   await row.getByRole("button", { name: "Edit" }).click();
  75  |   await expect(page.getByRole("heading", { name: "Edit restaurant" })).toBeVisible();
  76  |   await page.getByLabel("Name", { exact: true }).fill("QA UI Tea House Renamed");
  77  |   await page.getByLabel("Location").fill("Galle");
  78  |   await page.getByRole("button", { name: "Save Restaurant" }).click();
  79  |   await expect(page.getByText("Restaurant saved.")).toBeVisible();
  80  |   await expect(page.getByRole("article").filter({ hasText: "QA UI Tea House Renamed" })).toContainText("Galle");
  81  |   await shot(page, "ui", "BB-15b-restaurant-updated");
  82  |   const upd = await (await fetch(`${API}/restaurants/${slug}`)).json();
  83  |   expect([upd.name, upd.location]).toEqual(["QA UI Tea House Renamed", "Galle"]);
  84  | 
  85  |   await page.getByRole("article").filter({ hasText: "QA UI Tea House Renamed" }).getByRole("button", { name: "Delete" }).click();
  86  |   await expect(page.getByRole("article").filter({ hasText: "QA UI Tea House Renamed" })).toHaveCount(0);
  87  |   await shot(page, "ui", "BB-15c-restaurant-deleted");
  88  |   const gone = await fetch(`${API}/restaurants/${slug}`);
  89  |   log("BB-15", `after UI delete, GET /restaurants/${slug} -> ${gone.status}`);
  90  |   expect(gone.ok).toBe(false);
  91  | });
  92  | 
  93  | test("TC-ADM-UI-002 admin sees a clear message when a restaurant with reviews cannot be deleted", async ({ page }) => {
  94  |   acceptDialogs(page);
  95  |   await loginAdmin(page);
  96  |   await page.goto("/admin/restaurants");
  97  |   const row = page.getByRole("article").filter({ hasText: "QA Reviewed Cafe" });
  98  |   await expect(row).toBeVisible();
  99  |   await row.getByRole("button", { name: "Delete" }).click();
  100 |   const msg = page.getByText(/could not be deleted/);
  101 |   await expect(msg).toBeVisible();
  102 |   log("TC-ADM-UI-002", `message shown: ${await msg.textContent()}`);
  103 |   await shot(page, "ui", "TC-ADM-UI-002-delete-restaurant-with-reviews");
  104 |   // The message tells the admin to remove reviews first; check whether the admin UI offers any way to delete reviews.
  105 |   await page.goto("/admin/reviews");
  106 |   await page.getByRole("button", { name: "APPROVED" }).click();
  107 |   const deleteReviewButtons = await page.getByRole("button", { name: /delete/i }).count();
  108 |   log("TC-ADM-UI-002", `review delete controls available in moderation UI: ${deleteReviewButtons}`);
> 109 |   expect(deleteReviewButtons, "admin must have a way to act on the instruction 'Remove its menu and reviews first'").toBeGreaterThan(0);
      |                                                                                                                      ^ Error: admin must have a way to act on the instruction 'Remove its menu and reviews first'
  110 | });
  111 | 
  112 | test("BB-16 admin creates, updates and deletes a dish through the UI", async ({ page }) => {
  113 |   acceptDialogs(page);
  114 |   await loginAdmin(page);
  115 |   await page.goto("/admin/menu");
  116 |   await expect(page.getByRole("heading", { name: "Menu Management" })).toBeVisible();
  117 |   await page.getByLabel("Restaurant").selectOption("nuga-gama");
  118 |   await page.getByLabel("Dish name").fill("QA UI Kiribath");
  119 |   await page.getByLabel("Slug").fill(dishSlug);
  120 |   await page.getByLabel("Price").fill("650");
  121 |   await page.getByLabel("Spice").selectOption("Mild");
  122 |   await page.getByLabel("Description").fill("Milk rice with lunu miris.");
  123 |   await page.getByRole("checkbox", { name: "Vegetarian" }).check();
  124 |   await page.getByRole("button", { name: "Save Dish" }).click();
  125 |   await expect(page.getByText("Menu item saved.")).toBeVisible();
  126 |   const card = page.getByRole("article").filter({ hasText: "QA UI Kiribath" });
  127 |   await expect(card).toContainText("Nuga Gama • LKR 650");
  128 |   await shot(page, "ui", "BB-16a-dish-created");
  129 | 
  130 |   await card.getByRole("button", { name: "Edit" }).click();
  131 |   await page.getByLabel("Price").fill("700");
  132 |   await page.getByLabel("Spice").selectOption("Medium");
  133 |   await page.getByRole("button", { name: "Save Dish" }).click();
  134 |   await expect(page.getByText("Menu item saved.")).toBeVisible();
  135 |   await expect(page.getByRole("article").filter({ hasText: "QA UI Kiribath" })).toContainText("LKR 700");
  136 |   const d = await (await fetch(`${API}/dishes/${dishSlug}`)).json();
  137 |   expect([d.price, d.spiceLevel, d.restaurantSlug]).toEqual([700, "Medium", "nuga-gama"]);
  138 |   await page.goto("/restaurants/nuga-gama");
  139 |   await expect(page.getByRole("heading", { name: "QA UI Kiribath" })).toBeVisible();
  140 |   await shot(page, "ui", "BB-16b-dish-updated-visible-on-menu");
  141 | 
  142 |   await page.goto("/admin/menu");
  143 |   await page.getByRole("article").filter({ hasText: "QA UI Kiribath" }).getByRole("button", { name: "Delete" }).click();
  144 |   await expect(page.getByRole("article").filter({ hasText: "QA UI Kiribath" })).toHaveCount(0);
  145 |   await shot(page, "ui", "BB-16c-dish-deleted");
  146 | });
  147 | 
  148 | test("TC-ADM-UI-003 invalid restaurant input shows validation feedback", async ({ page }) => {
  149 |   await loginAdmin(page);
  150 |   await page.goto("/admin/restaurants");
  151 |   await page.getByLabel("Name", { exact: true }).fill("Bad");
  152 |   await page.getByLabel("Slug").fill("Bad Slug!");
  153 |   await page.getByRole("button", { name: "Save Restaurant" }).click();
  154 |   const msg = await page.getByLabel("Slug").evaluate((el: HTMLInputElement) => el.validationMessage);
  155 |   log("TC-ADM-UI-003", `slug validation message: "${msg}"`);
  156 |   expect(msg).not.toBe("");
  157 |   await shot(page, "ui", "TC-ADM-UI-003-invalid-slug", false);
  158 | });
  159 | 
  160 | test("BB-13 admin approves and rejects pending reviews; public visibility follows status", async ({ page }) => {
  161 |   // arrange: two fresh pending reviews from a new customer
  162 |   const email = `qa.ui.modcust.${RUN}@tastelanka.test`;
  163 |   const token = await apiRegister("QA Moderation Customer", email);
  164 |   for (const text of [`QA-MOD-APPROVE ${RUN} excellent hoppers`, `QA-MOD-REJECT ${RUN} spam content here`]) {
  165 |     const r = await fetch(`${API}/reviews`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  166 |       body: JSON.stringify({ restaurantSlug: "the-empire-cafe", foodRating: 5, serviceRating: 4, overallRating: 5, language: "en", reviewText: text }) });
  167 |     expect(r.status).toBe(201);
  168 |   }
  169 |   await loginAdmin(page);
  170 |   await page.goto("/admin/reviews");
  171 |   await expect(page.getByRole("heading", { name: "Review Moderation" })).toBeVisible();
  172 |   const approve = page.getByRole("article").filter({ hasText: `QA-MOD-APPROVE ${RUN}` });
  173 |   const reject = page.getByRole("article").filter({ hasText: `QA-MOD-REJECT ${RUN}` });
  174 |   await expect(approve).toBeVisible();
  175 |   await shot(page, "ui", "BB-13a-moderation-pending-queue");
  176 |   await approve.getByRole("button", { name: "Approve" }).click();
  177 |   await expect(page.getByText("Review approved.")).toBeVisible();
  178 |   await reject.getByRole("button", { name: "Reject" }).click();
  179 |   await expect(page.getByText("Review rejected.")).toBeVisible();
  180 |   await page.getByRole("button", { name: "APPROVED" }).click();
  181 |   await expect(page.getByRole("article").filter({ hasText: `QA-MOD-APPROVE ${RUN}` })).toBeVisible();
  182 |   await shot(page, "ui", "BB-13b-moderation-approved-tab");
  183 |   await page.getByRole("button", { name: "REJECTED" }).click();
  184 |   await expect(page.getByRole("article").filter({ hasText: `QA-MOD-REJECT ${RUN}` })).toBeVisible();
  185 |   await page.goto("/restaurants/the-empire-cafe");
  186 |   await expect(page.getByText(`QA-MOD-APPROVE ${RUN}`)).toBeVisible();
  187 |   await expect(page.getByText(`QA-MOD-REJECT ${RUN}`)).toHaveCount(0);
  188 |   await shot(page, "ui", "BB-13c-public-page-shows-only-approved");
  189 |   // author sees outcome
  190 |   await loginOk(page, email);
  191 |   await expect(page.getByRole("article").filter({ hasText: `QA-MOD-REJECT ${RUN}` }).getByText("REJECTED")).toBeVisible();
  192 |   await shot(page, "ui", "BB-13d-author-sees-moderation-outcome");
  193 | });
  194 | 
  195 | test("TC-ADM-UI-004 moderator can enter a moderation note / reason when rejecting", async ({ page }) => {
  196 |   await loginAdmin(page);
  197 |   await page.goto("/admin/reviews");
  198 |   const noteFields = await page.locator("textarea, input[type=text]").count();
  199 |   log("TC-ADM-UI-004", `note/reason inputs in moderation UI: ${noteFields}`);
  200 |   expect(noteFields, "moderation UI should allow recording a reason (API supports 'note')").toBeGreaterThan(0);
  201 | });
  202 | 
```