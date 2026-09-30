import { expect, test } from "@playwright/test";
import { apiRegister, log, login, loginOk, PASSWORD, RUN, shot, signup } from "./helpers";

const email = (tag: string) => `qa.ui.${tag}.${RUN}@tastelanka.test`;

test("TC-UI-001 home page renders hero, search and navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Find Great Food/ }).first()).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
  await shot(page, "ui", "TC-UI-001-home-desktop");
});

test("BB-01 registration with valid data creates account and opens profile", async ({ page }) => {
  await signup(page, "QA UI Customer", email("cust"));
  await expect(page).toHaveURL(/\/profile/);
  await expect(page.getByRole("heading", { name: "QA UI Customer" })).toBeVisible();
  await expect(page.getByText(email("cust"))).toBeVisible();
  await shot(page, "ui", "BB-01-registration-success-profile");
  log("BB-01", `registered ${email("cust")}; redirected to /profile showing name and email`);
});

test("BB-02a registration rejected when passwords do not match", async ({ page }) => {
  await page.goto("/signup");
  await page.getByLabel("Full name").fill("Mismatch");
  await page.getByLabel("Email").fill(email("mismatch"));
  await page.getByLabel("Password", { exact: true }).fill(PASSWORD);
  await page.getByLabel("Confirm password").fill(PASSWORD + "x");
  await page.getByRole("button", { name: "Create Account" }).click();
  await expect(page.getByText("Passwords do not match.")).toBeVisible();
  await shot(page, "ui", "BB-02a-registration-password-mismatch");
});

test("BB-02b registration rejected for duplicate email with feedback", async ({ page }) => {
  await signup(page, "Duplicate", email("cust"));
  await expect(page.getByText(/could not be created/)).toBeVisible();
  await expect(page).toHaveURL(/\/signup/);
  await shot(page, "ui", "BB-02b-registration-duplicate-email");
});

test("BB-02c registration blocked client-side for empty fields and short password", async ({ page }) => {
  await page.goto("/signup");
  await page.getByRole("button", { name: "Create Account" }).click();
  const nameValid = await page.getByLabel("Full name").evaluate((el: HTMLInputElement) => el.validity.valid);
  await page.getByLabel("Full name").fill("Short");
  await page.getByLabel("Email").fill("not-an-email");
  await page.getByLabel("Password", { exact: true }).fill("short");
  const emailMsg = await page.getByLabel("Email").evaluate((el: HTMLInputElement) => el.validationMessage);
  const pwMsg = await page.getByLabel("Password", { exact: true }).evaluate((el: HTMLInputElement) => el.validationMessage);
  log("BB-02c", `empty name valid=${nameValid}; email message="${emailMsg}"; password message="${pwMsg}"`);
  expect(nameValid).toBe(false);
  expect(emailMsg).not.toBe("");
  expect(pwMsg).not.toBe("");
  await expect(page).toHaveURL(/\/signup/);
  await page.getByRole("button", { name: "Create Account" }).click();
  await shot(page, "ui", "BB-02c-registration-client-validation", false);
});

test("BB-03 valid login authenticates and grants access to profile", async ({ page }) => {
  await loginOk(page, email("cust"));
  await expect(page).toHaveURL(/\/profile/);
  await expect(page.getByRole("heading", { name: "My Reviews" })).toBeVisible();
  const stored = await page.evaluate(() => Boolean(localStorage.getItem("tastelanka.token")));
  expect(stored).toBe(true);
  await shot(page, "ui", "BB-03-login-success");
});

test("BB-04 invalid password is rejected with an error message", async ({ page }) => {
  await login(page, email("cust"), "WrongPass#1");
  await expect(page.getByText("Invalid email or password.")).toBeVisible();
  await expect(page).toHaveURL(/\/login/);
  await shot(page, "ui", "BB-04-login-invalid-password");
});

test("BB-05 profile shows the user's name, email, reviews and saved sections", async ({ page }) => {
  await loginOk(page, email("cust"));
  await expect(page.getByRole("heading", { name: "QA UI Customer" })).toBeVisible();
  await expect(page.getByText(email("cust"))).toBeVisible();
  await expect(page.getByRole("heading", { name: "Saved Restaurants" })).toBeVisible();
  await shot(page, "ui", "BB-05-profile");
});

test("TC-UI-002 logout clears the session and protects the profile route", async ({ page }) => {
  await apiRegister("QA Logout", email("logout")); // self-contained: does not depend on BB-01
  await loginOk(page, email("logout"));
  await page.getByRole("button", { name: "Log Out" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");
  expect(await page.evaluate(() => localStorage.getItem("tastelanka.token"))).toBeNull();
  await page.goto("/profile");
  await expect(page).toHaveURL(/\/login\?next=\/profile/);
  await shot(page, "ui", "TC-UI-002-logout-profile-redirect", false);
});

test("BB-06 restaurant listing displays available restaurants", async ({ page }) => {
  await page.goto("/restaurants");
  await expect(page.getByText(/\d+ restaurants found/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Ministry of Crab" })).toBeVisible();
  const count = await page.getByRole("link", { name: "View Details" }).count();
  log("BB-06", `listing shows ${count} restaurants`);
  expect(count).toBeGreaterThanOrEqual(5);
  await shot(page, "ui", "BB-06-restaurant-listing");
});

test("BB-07 search returns matching restaurants", async ({ page }) => {
  await page.goto("/restaurants");
  await page.getByPlaceholder("restaurants, dishes or cuisines...").fill("crab");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("1 restaurants found")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Ministry of Crab" })).toBeVisible();
  await shot(page, "ui", "BB-07-search-crab");
});

test("TC-UI-003 search with no matches shows an empty-state message", async ({ page }) => {
  await page.goto("/restaurants?q=zzqqxx");
  await expect(page.getByText("No restaurants match these filters.")).toBeVisible();
  await shot(page, "ui", "TC-UI-003-search-no-results", false);
});

test("TC-UI-004 home page search submits to results page", async ({ page }) => {
  await page.goto("/");
  await page.locator("#desktop-search").fill("galle");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page).toHaveURL(/\/restaurants\?q=galle/);
  await expect(page.getByRole("heading", { name: "Pedlar’s Inn" })).toBeVisible();
});

test("BB-08a filter by location and dietary options reflects criteria", async ({ page }) => {
  await page.goto("/restaurants");
  await expect(page.getByText(/\d+ restaurants found/)).toBeVisible();
  await page.getByRole("checkbox", { name: "Kandy" }).check();
  await page.getByRole("checkbox", { name: "Vegan" }).check();
  await page.getByRole("button", { name: "Apply Filters" }).click();
  await expect(page.getByText("2 restaurants found")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Ministry of Crab" })).toHaveCount(0);
  await shot(page, "ui", "BB-08a-filter-kandy-vegan");
});

test("BB-08b 'Clear all' resets filters and results", async ({ page }) => {
  await page.goto("/restaurants");
  await expect(page.getByText("Loading restaurants…")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "View Details" }).first()).toBeVisible();
  const all = Number((await page.getByText(/\d+ restaurants found/).textContent())?.match(/\d+/)?.[0]);
  await page.getByRole("checkbox", { name: "Galle" }).check();
  await page.getByRole("button", { name: "Apply Filters" }).click();
  await expect(page.getByText(`${all} restaurants found`)).toHaveCount(0);
  const galle = Number((await page.getByText(/\d+ restaurants found/).textContent())?.match(/\d+/)?.[0]);
  const locs = await page.locator("article p.text-muted").filter({ hasText: " · " }).allTextContents();
  expect(locs.every((t) => t.endsWith("Galle"))).toBe(true);
  log("BB-08b", `all=${all}; Galle filter=${galle}`);
  await page.getByRole("button", { name: "Clear all" }).click();
  await expect(page.getByRole("checkbox", { name: "Galle" })).not.toBeChecked();
  await page.waitForTimeout(1500);
  const text = await page.getByText(/\d+ restaurants found/).textContent();
  log("BB-08b", `after Clear all (no Apply clicked) results text: ${text}`);
  await shot(page, "ui", "BB-08b-clear-all");
  expect(Number(text?.match(/\d+/)?.[0]), "results should reset to the unfiltered count after Clear all").toBe(all);
});

test("BB-08c cuisine category link filters the listing", async ({ page }) => {
  await page.goto("/cuisines");
  await page.getByRole("link", { name: "Seafood" }).click();
  await expect(page).toHaveURL(/cuisine=Seafood/);
  await expect(page.getByText(/\d+ restaurants found/)).toBeVisible();
  const names = await page.locator("article h3").allTextContents();
  log("BB-08c", `cuisine=Seafood listing shows: ${names.join(", ")}`);
  await shot(page, "ui", "BB-08c-cuisine-link-seafood");
  expect(names).toEqual(["Ministry of Crab"]);
});

test("BB-08d price and spice filters are available on restaurant search", async ({ page }) => {
  await page.goto("/restaurants");
  const priceControl = await page.getByText(/price/i).filter({ has: page.locator("input,select") }).count();
  const priceCheckboxes = await page.getByRole("checkbox", { name: /LKR|price|budget/i }).count();
  log("BB-08d", `price filter controls found: ${priceControl + priceCheckboxes}`);
  expect(priceControl + priceCheckboxes).toBeGreaterThan(0);
});

test("BB-09 restaurant details show info, menu and dish details", async ({ page }) => {
  await page.goto("/restaurants");
  await page.getByRole("article").filter({ hasText: "Ministry of Crab" }).getByRole("link", { name: "View Details" }).click();
  await expect(page).toHaveURL(/\/restaurants\/ministry-of-crab/);
  await expect(page.getByRole("heading", { name: "About this restaurant" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Chilli Crab" })).toBeVisible();
  await shot(page, "ui", "BB-09a-restaurant-details-menu");
  await page.getByRole("article").filter({ hasText: "Chilli Crab" }).getByRole("link", { name: "View Dish" }).click();
  await expect(page).toHaveURL(/\/dishes\/chilli-crab/);
  await expect(page.getByText("LKR 9,500")).toBeVisible();
  await expect(page.getByText("Hot", { exact: true })).toBeVisible();
  await shot(page, "ui", "BB-09b-dish-details");
});

test("TC-UI-005 unknown restaurant slug shows an error state", async ({ page }) => {
  await page.goto("/restaurants/does-not-exist");
  await expect(page.getByText(/could not be loaded/)).toBeVisible();
  await shot(page, "ui", "TC-UI-005-unknown-restaurant", false);
});

test("BB-10 authenticated user submits a valid review (stored for moderation)", async ({ page }) => {
  await loginOk(page, email("cust"));
  await page.goto("/restaurants/green-leaf-kitchen");
  await page.getByRole("link", { name: "Write a Review" }).click();
  await expect(page).toHaveURL(/\/reviews\/new\?restaurant=green-leaf-kitchen/);
  await expect(page.getByText("Green Leaf Kitchen")).toBeVisible();
  await page.getByLabel("Review").fill(`QA UI review ${RUN}: lovely vegetarian curry, attentive staff.`);
  await page.getByRole("button", { name: "Submit Review" }).click();
  await expect(page.getByText("Thank you. Your review is pending moderator approval.")).toBeVisible();
  await shot(page, "ui", "BB-10-review-submitted");
});

test("BB-11a review with text shorter than 10 characters is blocked", async ({ page }) => {
  await loginOk(page, email("cust"));
  await page.goto("/reviews/new?restaurant=green-leaf-kitchen");
  await page.getByLabel("Review").fill("short");
  await page.getByRole("button", { name: "Submit Review" }).click();
  const msg = await page.getByLabel("Review").evaluate((el: HTMLTextAreaElement) => el.validationMessage);
  log("BB-11a", `textarea validationMessage="${msg}"`);
  expect(msg).not.toBe("");
  await expect(page.getByText("Thank you.")).toHaveCount(0);
  await shot(page, "ui", "BB-11a-review-too-short", false);
});

test("BB-11b rating outside 1-5 cannot be entered in the UI (star control limits range)", async ({ page }) => {
  await loginOk(page, email("cust"));
  await page.goto("/reviews/new?restaurant=green-leaf-kitchen");
  const stars = page.getByRole("group", { name: /Food quality/ }).or(page.locator("fieldset").filter({ hasText: "Food quality" }));
  const count = await stars.first().getByRole("button").count();
  log("BB-11b", `food-quality star buttons = ${count}`);
  expect(count).toBe(5);
});

test("TC-UI-006 'Write a Review' from home page (no restaurant selected) lets the user pick a restaurant", async ({ page }) => {
  await loginOk(page, email("cust"));
  await page.goto("/");
  await page.getByRole("link", { name: "Write a Review" }).click();
  await expect(page).toHaveURL(/\/reviews\/new$/);
  const pickers = await page.locator("select, input[list], [role=combobox]").count();
  await page.getByLabel("Review").fill("QA review submitted without choosing a restaurant.");
  await page.getByRole("button", { name: "Submit Review" }).click();
  await page.waitForTimeout(1500);
  await shot(page, "ui", "TC-UI-006-review-without-restaurant");
  log("TC-UI-006", `restaurant picker controls=${pickers}`);
  expect(pickers, "a restaurant selector should be offered").toBeGreaterThan(0);
});

test("BB-12 user sees own submitted reviews with status", async ({ page }) => {
  await loginOk(page, email("cust"));
  const card = page.getByRole("article").filter({ hasText: `QA UI review ${RUN}` });
  await expect(card).toBeVisible();
  await expect(card.getByText("PENDING")).toBeVisible();
  await shot(page, "ui", "BB-12-own-reviews-pending");
});

test("TC-UI-007 saved restaurant: save, view on profile, remove", async ({ page }) => {
  await loginOk(page, email("cust"));
  await page.goto("/restaurants/pedlars-inn");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("button", { name: "Saved" })).toBeVisible();
  await shot(page, "ui", "TC-UI-007a-restaurant-saved", false);
  await page.goto("/profile");
  const saved = page.getByRole("article").filter({ hasText: "Pedlar’s Inn • Galle" });
  await expect(saved).toBeVisible();
  await shot(page, "ui", "TC-UI-007b-profile-saved-list");
  await saved.getByRole("button", { name: "Remove" }).click();
  await expect(saved).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole("article").filter({ hasText: "Pedlar’s Inn • Galle" })).toHaveCount(0);
  await shot(page, "ui", "TC-UI-007c-profile-saved-removed");
});

test("TC-UI-008 saved state is shown when revisiting an already-saved restaurant", async ({ page }) => {
  await loginOk(page, email("cust"));
  await page.goto("/restaurants/nuga-gama");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("button", { name: "Saved" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "Nuga Gama" })).toBeVisible();
  const label = await page.getByRole("button", { name: /^Save/ }).textContent();
  log("TC-UI-008", `button label after reload of saved restaurant: ${label}`);
  await shot(page, "ui", "TC-UI-008-saved-state-after-reload", false);
  expect(label).toBe("Saved");
});

test("TC-UI-009 unauthenticated 'Save' redirects to login", async ({ page }) => {
  await page.goto("/restaurants/nuga-gama");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page).toHaveURL(/\/login\?next=%2Frestaurants%2Fnuga-gama/);
});

test("TC-UI-010 unauthenticated review form redirects to login", async ({ page }) => {
  await page.goto("/reviews/new?restaurant=nuga-gama");
  await expect(page).toHaveURL(/\/login\?next=/);
});

test("TC-SEC-031 stored XSS payload in an approved review is rendered as text (no script execution)", async ({ page }) => {
  const dialogs: string[] = [];
  page.on("dialog", async (d) => { dialogs.push(d.message()); await d.dismiss(); });
  await page.goto("/restaurants/nuga-gama");
  await expect(page.getByText("QA XSS probe", { exact: false })).toBeVisible();
  const injected = await page.locator("script:has-text('xss-qa'), img[onerror]").count();
  await page.waitForTimeout(1500);
  await shot(page, "security", "TC-SEC-031-xss-rendered-as-text");
  log("TC-SEC-031", `dialogs fired=${dialogs.length}; injected elements=${injected}`);
  expect(dialogs).toEqual([]);
  expect(injected).toBe(0);
});

test("TC-UI-011 home 'Top Rated' section reflects API data", async ({ page }) => {
  const api = await (await fetch("http://localhost:8080/api/v1/restaurants/the-empire-cafe")).json();
  await page.goto("/");
  const card = page.getByRole("link").filter({ hasText: "The Empire Cafe" }).first();
  const text = await card.textContent();
  log("TC-UI-011", `home card: "${text}"; API reviewCount=${api.reviewCount}`);
  expect(text).toContain(`(${api.reviewCount} reviews)`);
});

test("TC-UI-012 customer created via API sees customer header state (Profile, not Dashboard)", async ({ page }) => {
  await apiRegister("QA Header", email("header"));
  await loginOk(page, email("header"));
  await expect(page).toHaveURL(/\/profile/);
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Profile" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Dashboard" })).toHaveCount(0);
});

test("TC-UI-013 home page filter chips and location selector affect results", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Vegan", exact: true }).click();
  await page.waitForTimeout(1000);
  const afterChip = page.url();
  await page.locator("#location").selectOption("Galle");
  await page.locator("#desktop-search").fill("cafe");
  await page.getByRole("button", { name: "Search" }).click();
  await page.waitForURL(/\/restaurants/);
  await expect(page.getByText(/\d+ restaurants found/)).toBeVisible();
  const names = await page.locator("article h3").allTextContents();
  log("TC-UI-013", `URL after clicking 'Vegan' chip: ${afterChip}; search 'cafe' + location Galle -> URL ${page.url()} results: ${names.join(", ")}`);
  await shot(page, "ui", "TC-UI-013-home-location-ignored");
  expect(afterChip, "clicking a filter chip should apply a filter").not.toBe("http://localhost:3000/");
  expect(names.every((n) => n === "Pedlar’s Inn"), "location Galle should restrict results").toBe(true);
});
