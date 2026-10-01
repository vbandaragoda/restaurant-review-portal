import { expect, Page, test } from "@playwright/test";
import { API, log, loginAdmin, loginOk, RUN, shot, signup } from "./helpers";

// Dry runs start from a known state: a brand-new customer account per run and the seeded catalogue.
const D = "dry-runs";
const customer = (n: string) => `qa.dr.${n}.${RUN}@tastelanka.test`;
const accept = (page: Page) => page.on("dialog", (d) => void d.accept());
const step = (id: string, s: string) => log(id, s);

test("DR-01 new user journey: register -> login -> browse -> search/filter -> view restaurant", async ({ page }) => {
  await signup(page, "DR One", customer("one"));
  await expect(page).toHaveURL(/\/profile/); step("DR-01", "1 registered and landed on profile");
  await page.getByRole("button", { name: "Log Out" }).click();
  await loginOk(page, customer("one")); step("DR-01", "2 logged in again");
  await page.goto("/restaurants");
  await expect(page.getByText(/\d+ restaurants found/)).toBeVisible(); step("DR-01", "3 browsed listing");
  await page.getByPlaceholder("restaurants, dishes or cuisines...").fill("Sri Lankan");
  await page.getByRole("button", { name: "Search" }).click();
  await page.getByRole("checkbox", { name: "Colombo" }).check();
  await page.getByRole("button", { name: "Apply Filters" }).click();
  await expect(page.getByRole("heading", { name: "Nuga Gama" })).toBeVisible();
  await shot(page, D, "DR-01-step4-search-filter"); step("DR-01", "4 searched 'Sri Lankan' + Colombo filter -> Nuga Gama listed");
  await page.getByRole("article").filter({ hasText: "Nuga Gama" }).getByRole("link", { name: "View Details" }).click();
  await expect(page.getByRole("heading", { name: "About this restaurant" })).toBeVisible();
  await shot(page, D, "DR-01-step5-restaurant-details"); step("DR-01", "5 restaurant details displayed — journey complete");
});

test("DR-02 review journey: login -> select restaurant -> submit review -> admin moderates -> visible", async ({ browser }) => {
  const text = `DR-02 ${RUN} the lamprais was superb and service quick`;
  const cust = await browser.newPage();
  await signup(cust, "DR Two", customer("two"));
  await expect(cust).toHaveURL(/\/profile/);
  await cust.goto("/restaurants/pedlars-inn");
  await cust.getByRole("link", { name: "Write a Review" }).click();
  await cust.getByRole("fieldset").or(cust.locator("fieldset")).filter({ hasText: "Overall experience" }).getByRole("button").nth(3).click();
  await cust.getByLabel("Review").fill(text);
  await cust.getByRole("button", { name: "Submit Review" }).click();
  await expect(cust.getByText("Thank you. Your review is pending moderator approval.")).toBeVisible();
  await shot(cust, D, "DR-02-step3-review-submitted"); step("DR-02", "3 review submitted (overall 4 stars) -> pending message");
  await cust.goto("/restaurants/pedlars-inn");
  await expect(cust.getByText(text)).toHaveCount(0); step("DR-02", "4 review not public while pending");
  const admin = await browser.newPage();
  await loginAdmin(admin);
  await admin.goto("/admin/reviews");
  await admin.getByRole("article").filter({ hasText: text }).getByRole("button", { name: "Approve" }).click();
  await expect(admin.getByText("Review approved.")).toBeVisible();
  await shot(admin, D, "DR-02-step5-admin-approved"); step("DR-02", "5 admin approved");
  await cust.goto("/restaurants/pedlars-inn");
  const card = cust.getByRole("article").filter({ hasText: text });
  await expect(card).toBeVisible();
  await expect(card).toContainText("★★★★☆");
  await shot(cust, D, "DR-02-step6-review-public"); step("DR-02", "6 approved review visible publicly with 4 stars");
  const r = await (await fetch(`${API}/restaurants/pedlars-inn`)).json();
  step("DR-02", `7 restaurant aggregate after approval: rating=${r.rating} reviewCount=${r.reviewCount} (seed values 4.5/490)`);
});

test("DR-03 saved restaurant journey: login -> select -> save -> profile -> view -> remove", async ({ page }) => {
  await signup(page, "DR Three", customer("three"));
  await expect(page).toHaveURL(/\/profile/);
  await page.goto("/restaurants/the-empire-cafe");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("button", { name: "Saved" })).toBeVisible(); step("DR-03", "3 saved The Empire Cafe");
  await page.goto("/profile");
  const item = page.getByRole("article").filter({ hasText: "The Empire Cafe • Kandy" });
  await expect(item).toBeVisible();
  await shot(page, D, "DR-03-step4-profile-saved"); step("DR-03", "4 profile lists saved restaurant");
  await item.getByRole("link").click();
  await expect(page).toHaveURL(/\/restaurants\/the-empire-cafe/); step("DR-03", "5 opened saved restaurant from profile");
  await page.goto("/profile");
  await page.getByRole("article").filter({ hasText: "The Empire Cafe • Kandy" }).getByRole("button", { name: "Remove" }).click();
  await page.reload();
  await expect(page.getByText("No saved restaurants yet.")).toBeVisible();
  await shot(page, D, "DR-03-step6-removed"); step("DR-03", "6 removed; profile shows empty state after reload");
});

test("DR-04 administrator restaurant workflow: login -> dashboard -> create/update/delete restaurant", async ({ page }) => {
  accept(page);
  const slug = `dr-rest-${RUN}`;
  await loginAdmin(page);
  await shot(page, D, "DR-04-step2-dashboard"); step("DR-04", "2 dashboard shown");
  await page.goto("/admin/restaurants");
  const fill = async (label: string, v: string) => page.getByLabel(label, { exact: true }).fill(v);
  await fill("Name", "DR Spice Garden"); await fill("Slug", slug); await fill("Cuisine", "Sri Lankan"); await fill("Location", "Colombo");
  await fill("Minimum price", "1200"); await fill("Maximum price", "2400");
  await page.getByRole("button", { name: "Save Restaurant" }).click();
  await expect(page.getByText("Restaurant saved.")).toBeVisible(); step("DR-04", "3 created");
  await page.getByRole("article").filter({ hasText: "DR Spice Garden" }).getByRole("button", { name: "Edit" }).click();
  await fill("Maximum price", "2600");
  await page.getByRole("button", { name: "Save Restaurant" }).click();
  await expect(page.getByText("Restaurant saved.")).toBeVisible();
  await page.goto(`/restaurants/${slug}`);
  await expect(page.getByText("LKR 1,200–2,600")).toBeVisible();
  await shot(page, D, "DR-04-step4-updated-public-page"); step("DR-04", "4 updated; public page shows LKR 1,200–2,600");
  await page.goto("/admin/restaurants");
  await page.getByRole("article").filter({ hasText: "DR Spice Garden" }).getByRole("button", { name: "Delete" }).click();
  await expect(page.getByRole("article").filter({ hasText: "DR Spice Garden" })).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole("article").filter({ hasText: "DR Spice Garden" })).toHaveCount(0);
  step("DR-04", "5 deleted; absent after reload");
});

test("DR-05 administrator dish workflow: login -> manage dishes -> create/update/delete dish", async ({ page }) => {
  accept(page);
  const slug = `dr-dish-${RUN}`;
  await loginAdmin(page);
  await page.goto("/admin/menu");
  await page.getByLabel("Restaurant").selectOption("green-leaf-kitchen");
  await page.getByLabel("Dish name").fill("DR Jackfruit Curry");
  await page.getByLabel("Slug").fill(slug);
  await page.getByLabel("Price").fill("1100");
  await page.getByRole("button", { name: "Save Dish" }).click();
  await expect(page.getByText("Menu item saved.")).toBeVisible(); step("DR-05", "3 dish created for Green Leaf Kitchen");
  await page.getByRole("article").filter({ hasText: "DR Jackfruit Curry" }).getByRole("button", { name: "Edit" }).click();
  await page.getByLabel("Price").fill("1250");
  await page.getByRole("button", { name: "Save Dish" }).click();
  await expect(page.getByRole("article").filter({ hasText: "DR Jackfruit Curry" })).toContainText("LKR 1250");
  await page.goto(`/dishes/${slug}`);
  await expect(page.getByText("LKR 1,250")).toBeVisible();
  await shot(page, D, "DR-05-step4-dish-updated"); step("DR-05", "4 updated; dish page shows LKR 1,250");
  await page.goto("/admin/menu");
  await page.getByRole("article").filter({ hasText: "DR Jackfruit Curry" }).getByRole("button", { name: "Delete" }).click();
  await expect(page.getByRole("article").filter({ hasText: "DR Jackfruit Curry" })).toHaveCount(0);
  await page.goto("/restaurants/green-leaf-kitchen");
  await expect(page.getByRole("heading", { name: "DR Jackfruit Curry" })).toHaveCount(0);
  step("DR-05", "5 deleted; not on restaurant menu");
});

test("DR-06 administrator moderation workflow: review pending -> approve/reject -> visibility correct", async ({ browser }) => {
  const cust = await browser.newPage();
  await signup(cust, "DR Six", customer("six"));
  await expect(cust).toHaveURL(/\/profile/);
  const texts = { ok: `DR-06 ${RUN} approve me: tasty kottu`, bad: `DR-06 ${RUN} reject me: off-topic` };
  for (const t of Object.values(texts)) {
    await cust.goto("/reviews/new?restaurant=nuga-gama");
    await cust.getByLabel("Review").fill(t);
    await cust.getByRole("button", { name: "Submit Review" }).click();
    await expect(cust.getByText("Thank you. Your review is pending moderator approval.")).toBeVisible();
  }
  const admin = await browser.newPage();
  await loginAdmin(admin);
  await admin.goto("/admin/reviews");
  await admin.getByRole("article").filter({ hasText: texts.ok }).getByRole("button", { name: "Approve" }).click();
  await expect(admin.getByText("Review approved.")).toBeVisible();
  // Cycle 2 maintenance: rejection reason now required (eed62c2).
  await admin.getByRole("article").filter({ hasText: texts.bad }).getByLabel(/Moderation note/).fill("Off-topic content");
  await admin.getByRole("article").filter({ hasText: texts.bad }).getByRole("button", { name: "Reject" }).click();
  await expect(admin.getByText("Review rejected.")).toBeVisible();
  await shot(admin, D, "DR-06-step3-after-moderation"); step("DR-06", "3 approved one, rejected one");
  await cust.goto("/restaurants/nuga-gama");
  await expect(cust.getByText(texts.ok)).toBeVisible();
  await expect(cust.getByText(texts.bad)).toHaveCount(0);
  await cust.goto("/profile");
  await expect(cust.getByRole("article").filter({ hasText: texts.ok })).toContainText("APPROVED");
  await expect(cust.getByRole("article").filter({ hasText: texts.bad })).toContainText("REJECTED");
  await shot(cust, D, "DR-06-step4-author-profile-statuses"); step("DR-06", "4 public shows approved only; author sees APPROVED/REJECTED");
});

test("DR-07 language journey: English, Sinhala and Tamil content readable and consistent", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("English · සිංහල · தமிழ்")).toBeVisible();
  await page.goto("/signup");
  await expect(page.getByText("English, Sinhala and Tamil review text supported.")).toBeVisible();
  await signup(page, "ශානි ප්‍රනාන්දු", customer("seven"));
  await expect(page.getByRole("heading", { name: "ශානි ප්‍රනාන්දු" })).toBeVisible();
  await shot(page, D, "DR-07-step2-sinhala-name-profile"); step("DR-07", "2 Sinhala full name registered and shown on profile");
  await page.goto("/reviews/new?restaurant=ministry-of-crab");
  await page.getByRole("button", { name: "தமிழ்" }).click();
  await page.getByLabel("Review").fill("நண்டு கறி மிகவும் சுவையாக இருந்தது.");
  await page.getByRole("button", { name: "Submit Review" }).click();
  await expect(page.getByText("Thank you. Your review is pending moderator approval.")).toBeVisible();
  await page.goto("/restaurants/ministry-of-crab");
  await expect(page.getByText("රසවත් කකුළුවන් කෑම. සේවය ඉතා හොඳයි.")).toBeVisible();
  await expect(page.getByText("மிகவும் சுவையான உணவு. சேவை நன்றாக இருந்தது.")).toBeVisible();
  await shot(page, D, "DR-07-step4-si-ta-reviews-rendered"); step("DR-07", "4 Sinhala and Tamil approved reviews rendered; Tamil review submitted; UI chrome remains English (no UI translation)");
});
