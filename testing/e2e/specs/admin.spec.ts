import { expect, Page, test } from "@playwright/test";
import { API, apiRegister, log, loginAdmin, loginOk, RUN, shot } from "./helpers";

const slug = `qa-ui-rest-${RUN}`;
const dishSlug = `qa-ui-dish-${RUN}`;

function acceptDialogs(page: Page) {
  page.on("dialog", (d) => void d.accept());
}

test("TC-ADM-UI-001 admin login opens dashboard with live metrics", async ({ page }) => {
  await loginAdmin(page);
  const stats = await page.evaluate(async (api) => {
    const r = await fetch(`${api}/admin/dashboard`, { headers: { Authorization: `Bearer ${localStorage.getItem("tastelanka.token")}` } });
    return r.json();
  }, API);
  const card = page.getByRole("link").filter({ hasText: "Restaurants" }).filter({ hasText: "View details" });
  await expect(card).toContainText(String(stats.restaurants));
  await expect(page.getByRole("link").filter({ hasText: "Pending reviews" })).toContainText(String(stats.pendingReviews));
  log("TC-ADM-UI-001", `dashboard stats ${JSON.stringify(stats)}`);
  await shot(page, "ui", "TC-ADM-UI-001-admin-dashboard");
});

test("BB-14a customer is denied the admin UI (redirected to login)", async ({ page }) => {
  const email = `qa.ui.noadmin.${RUN}@tastelanka.test`;
  await apiRegister("QA Not Admin", email);
  await loginOk(page, email);
  await page.goto("/admin/restaurants");
  await expect(page).toHaveURL(/\/login\?next=\/admin/);
  await shot(page, "security", "BB-14a-customer-denied-admin-ui", false);
});

test("BB-14b anonymous visitor is denied the admin UI", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/login\?next=\/admin/);
});

test("BB-14c customer who forges role=ADMIN in localStorage sees no admin data (API enforces role)", async ({ page }) => {
  const email = `qa.ui.forge.${RUN}@tastelanka.test`;
  await apiRegister("QA Forger", email);
  await loginOk(page, email);
  await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem("tastelanka.session")!);
    s.role = "ADMIN";
    localStorage.setItem("tastelanka.session", JSON.stringify(s));
  });
  await page.goto("/admin");
  await expect(page.getByText("Dashboard metrics could not be loaded.")).toBeVisible();
  await expect(page.getByRole("link").filter({ hasText: "Restaurants" }).filter({ hasText: "View details" })).toContainText("–");
  await shot(page, "security", "BB-14c-forged-client-role-no-data");
});

test("BB-15 admin creates, updates and deletes a restaurant through the UI", async ({ page }) => {
  acceptDialogs(page);
  await loginAdmin(page);
  await page.getByRole("link", { name: "Restaurants", exact: true }).last().click();
  await expect(page.getByRole("heading", { name: "Restaurant Management" })).toBeVisible();
  await page.getByLabel("Name", { exact: true }).fill("QA UI Tea House");
  await page.getByLabel("Slug").fill(slug);
  await page.getByLabel("Cuisine").fill("Sri Lankan · Tea");
  await page.getByLabel("Location").fill("Kandy");
  await page.getByLabel("Minimum price").fill("800");
  await page.getByLabel("Maximum price").fill("1600");
  await page.getByLabel("Description").fill("Created through the admin UI by QA.");
  await page.getByRole("checkbox", { name: "vegetarian" }).check();
  await page.getByRole("button", { name: "Save Restaurant" }).click();
  await expect(page.getByText("Restaurant saved.")).toBeVisible();
  const row = page.getByRole("article").filter({ hasText: "QA UI Tea House" });
  await expect(row).toBeVisible();
  await shot(page, "ui", "BB-15a-restaurant-created");
  const pub = await (await fetch(`${API}/restaurants/${slug}`)).json();
  expect(pub.name).toBe("QA UI Tea House");

  await row.getByRole("button", { name: "Edit" }).click();
  await expect(page.getByRole("heading", { name: "Edit restaurant" })).toBeVisible();
  await page.getByLabel("Name", { exact: true }).fill("QA UI Tea House Renamed");
  await page.getByLabel("Location").fill("Galle");
  await page.getByRole("button", { name: "Save Restaurant" }).click();
  await expect(page.getByText("Restaurant saved.")).toBeVisible();
  await expect(page.getByRole("article").filter({ hasText: "QA UI Tea House Renamed" })).toContainText("Galle");
  await shot(page, "ui", "BB-15b-restaurant-updated");
  const upd = await (await fetch(`${API}/restaurants/${slug}`)).json();
  expect([upd.name, upd.location]).toEqual(["QA UI Tea House Renamed", "Galle"]);

  await page.getByRole("article").filter({ hasText: "QA UI Tea House Renamed" }).getByRole("button", { name: "Delete" }).click();
  await expect(page.getByRole("article").filter({ hasText: "QA UI Tea House Renamed" })).toHaveCount(0);
  await shot(page, "ui", "BB-15c-restaurant-deleted");
  const gone = await fetch(`${API}/restaurants/${slug}`);
  log("BB-15", `after UI delete, GET /restaurants/${slug} -> ${gone.status}`);
  expect(gone.ok).toBe(false);
});

test("TC-ADM-UI-002 admin sees a clear message when a restaurant with reviews cannot be deleted", async ({ page }) => {
  acceptDialogs(page);
  await loginAdmin(page);
  await page.goto("/admin/restaurants");
  const row = page.getByRole("article").filter({ hasText: "QA Reviewed Cafe" });
  await expect(row).toBeVisible();
  await row.getByRole("button", { name: "Delete" }).click();
  // Cycle 2 (retest of DEF-007): expected result = deletion refused with a clear message, no impossible instruction.
  const msg = page.getByText(/cannot be deleted|could not be deleted/);
  await expect(msg).toBeVisible();
  log("TC-ADM-UI-002", `message shown: ${await msg.textContent()}`);
  await shot(page, "ui", "TC-ADM-UI-002-delete-restaurant-with-reviews");
  const text = (await msg.textContent()) ?? "";
  expect(text, "message must not instruct an action the admin cannot perform").not.toMatch(/remove its menu and reviews first/i);
  await expect(page.getByRole("article").filter({ hasText: "QA Reviewed Cafe" })).toBeVisible();
});

test("BB-16 admin creates, updates and deletes a dish through the UI", async ({ page }) => {
  acceptDialogs(page);
  await loginAdmin(page);
  await page.goto("/admin/menu");
  await expect(page.getByRole("heading", { name: "Menu Management" })).toBeVisible();
  await page.getByLabel("Restaurant").selectOption("nuga-gama");
  await page.getByLabel("Dish name").fill("QA UI Kiribath");
  await page.getByLabel("Slug").fill(dishSlug);
  await page.getByLabel("Price").fill("650");
  await page.getByLabel("Spice").selectOption("Mild");
  await page.getByLabel("Description").fill("Milk rice with lunu miris.");
  await page.getByRole("checkbox", { name: "Vegetarian" }).check();
  await page.getByRole("button", { name: "Save Dish" }).click();
  await expect(page.getByText("Menu item saved.")).toBeVisible();
  const card = page.getByRole("article").filter({ hasText: "QA UI Kiribath" });
  await expect(card).toContainText("Nuga Gama • LKR 650");
  await shot(page, "ui", "BB-16a-dish-created");

  await card.getByRole("button", { name: "Edit" }).click();
  await page.getByLabel("Price").fill("700");
  await page.getByLabel("Spice").selectOption("Medium");
  await page.getByRole("button", { name: "Save Dish" }).click();
  await expect(page.getByText("Menu item saved.")).toBeVisible();
  await expect(page.getByRole("article").filter({ hasText: "QA UI Kiribath" })).toContainText("LKR 700");
  const d = await (await fetch(`${API}/dishes/${dishSlug}`)).json();
  expect([d.price, d.spiceLevel, d.restaurantSlug]).toEqual([700, "Medium", "nuga-gama"]);
  await page.goto("/restaurants/nuga-gama");
  await expect(page.getByRole("heading", { name: "QA UI Kiribath" })).toBeVisible();
  await shot(page, "ui", "BB-16b-dish-updated-visible-on-menu");

  await page.goto("/admin/menu");
  await page.getByRole("article").filter({ hasText: "QA UI Kiribath" }).getByRole("button", { name: "Delete" }).click();
  await expect(page.getByRole("article").filter({ hasText: "QA UI Kiribath" })).toHaveCount(0);
  await shot(page, "ui", "BB-16c-dish-deleted");
});

test("TC-ADM-UI-003 invalid restaurant input shows validation feedback", async ({ page }) => {
  await loginAdmin(page);
  await page.goto("/admin/restaurants");
  await page.getByLabel("Name", { exact: true }).fill("Bad");
  await page.getByLabel("Slug").fill("Bad Slug!");
  await page.getByRole("button", { name: "Save Restaurant" }).click();
  const msg = await page.getByLabel("Slug").evaluate((el: HTMLInputElement) => el.validationMessage);
  log("TC-ADM-UI-003", `slug validation message: "${msg}"`);
  expect(msg).not.toBe("");
  await shot(page, "ui", "TC-ADM-UI-003-invalid-slug", false);
});

test("BB-13 admin approves and rejects pending reviews; public visibility follows status", async ({ page }) => {
  // arrange: two fresh pending reviews from a new customer
  const email = `qa.ui.modcust.${RUN}@tastelanka.test`;
  const token = await apiRegister("QA Moderation Customer", email);
  for (const text of [`QA-MOD-APPROVE ${RUN} excellent hoppers`, `QA-MOD-REJECT ${RUN} spam content here`]) {
    const r = await fetch(`${API}/reviews`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ restaurantSlug: "the-empire-cafe", foodRating: 5, serviceRating: 4, overallRating: 5, language: "en", reviewText: text }) });
    expect(r.status).toBe(201);
  }
  await loginAdmin(page);
  await page.goto("/admin/reviews");
  await expect(page.getByRole("heading", { name: "Review Moderation" })).toBeVisible();
  const approve = page.getByRole("article").filter({ hasText: `QA-MOD-APPROVE ${RUN}` });
  const reject = page.getByRole("article").filter({ hasText: `QA-MOD-REJECT ${RUN}` });
  await expect(approve).toBeVisible();
  await shot(page, "ui", "BB-13a-moderation-pending-queue");
  await approve.getByRole("button", { name: "Approve" }).click();
  await expect(page.getByText("Review approved.")).toBeVisible();
  // Cycle 2 maintenance: a rejection reason is now required (eed62c2, DEF-020 fix). First check it is enforced, then give one.
  await reject.getByRole("button", { name: "Reject" }).click();
  await expect(page.getByText("Add a reason before rejecting a review.")).toBeVisible();
  await reject.getByLabel(/Moderation note/).fill("Spam / not a genuine dining experience");
  await reject.getByRole("button", { name: "Reject" }).click();
  await expect(page.getByText("Review rejected.")).toBeVisible();
  await page.getByRole("button", { name: "APPROVED" }).click();
  await expect(page.getByRole("article").filter({ hasText: `QA-MOD-APPROVE ${RUN}` })).toBeVisible();
  await shot(page, "ui", "BB-13b-moderation-approved-tab");
  await page.getByRole("button", { name: "REJECTED" }).click();
  await expect(page.getByRole("article").filter({ hasText: `QA-MOD-REJECT ${RUN}` })).toBeVisible();
  await page.goto("/restaurants/the-empire-cafe");
  await expect(page.getByText(`QA-MOD-APPROVE ${RUN}`)).toBeVisible();
  await expect(page.getByText(`QA-MOD-REJECT ${RUN}`)).toHaveCount(0);
  await shot(page, "ui", "BB-13c-public-page-shows-only-approved");
  // author sees outcome
  await loginOk(page, email);
  await expect(page.getByRole("article").filter({ hasText: `QA-MOD-REJECT ${RUN}` }).getByText("REJECTED")).toBeVisible();
  await shot(page, "ui", "BB-13d-author-sees-moderation-outcome");
});

test("TC-ADM-UI-004 moderator can enter a moderation note / reason when rejecting", async ({ page }) => {
  await loginAdmin(page);
  await page.goto("/admin/reviews");
  // Cycle 2 test fix: wait for the review list before counting (the count previously ran before rendering).
  // (the empty-state text shows briefly before loading, so wait for the review cards themselves; QA data guarantees pending reviews)
  await expect(page.getByRole("article").first()).toBeVisible();
  const noteFields = await page.locator("textarea, input[type=text]").count();
  log("TC-ADM-UI-004", `note/reason inputs in moderation UI: ${noteFields}`);
  expect(noteFields, "moderation UI should allow recording a reason (API supports 'note')").toBeGreaterThan(0);
});
