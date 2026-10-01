import { expect, Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

if (!process.env.QA_OUT) throw new Error("Set QA_OUT to the cycle folder (e.g. testing/cycles/cycle 2)");
export const EVIDENCE = path.resolve(process.env.QA_OUT, "evidence");
export const API = "http://localhost:8080/api/v1";
export const PASSWORD = "QaUser#2026pw"; // test value used for accounts created by QA
export const RUN = process.env.QA_RUN as string;

/** Reads the QA admin test credentials from testing/qa.env (test values, never printed). */
export function adminCredentials() {
  const env = fs.readFileSync(path.resolve(__dirname, "../../qa.env"), "utf8");
  const get = (k: string) => (env.match(new RegExp(`export ${k}=(.*)`))?.[1] ?? "").replace(/"/g, "").trim();
  return { email: get("ADMIN_EMAIL"), password: get("ADMIN_PASSWORD") };
}

export async function shot(page: Page, folder: string, name: string, fullPage = true) {
  const dir = path.join(EVIDENCE, folder);
  fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, `${name}.png`), fullPage, timeout: 60_000 });
}

export async function signup(page: Page, name: string, email: string) {
  await page.goto("/signup");
  await page.getByLabel("Full name").fill(name);
  await page.getByLabel("Email").fill(email);
  // Cycle 2 maintenance: password fields gained a Show/Hide toggle (eed62c2), so getByLabel('Password') now matches 2 elements.
  await page.getByRole("textbox", { name: /^Password/ }).fill(PASSWORD);
  await page.getByRole("textbox", { name: /^Confirm password/ }).fill(PASSWORD);
  await page.getByRole("button", { name: "Create Account" }).click();
}

export async function login(page: Page, email: string, password = PASSWORD) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  // Cycle 2 maintenance: password fields gained a Show/Hide toggle (eed62c2), so getByLabel('Password') now matches 2 elements.
  await page.getByRole("textbox", { name: /^Password/ }).fill(password);
  await page.getByRole("button", { name: "Log In" }).click();
}

/** Logs in and waits until the app has stored the session and redirected (successful login expected). */
export async function loginOk(page: Page, email: string, password = PASSWORD) {
  await login(page, email, password);
  await page.waitForURL((url) => !url.pathname.startsWith("/login"));
  await expect.poll(() => page.evaluate(() => localStorage.getItem("tastelanka.token"))).not.toBeNull();
}

export async function loginAdmin(page: Page) {
  const { email, password } = adminCredentials();
  await loginOk(page, email, password);
  await expect(page).toHaveURL(/\/admin$/);
  await expect(page.getByRole("heading", { name: "Admin Dashboard" })).toBeVisible();
}

export async function apiToken(email: string, password = PASSWORD) {
  const r = await fetch(`${API}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
  return (await r.json()).token as string;
}

export async function apiRegister(name: string, email: string) {
  const r = await fetch(`${API}/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fullName: name, email, password: PASSWORD }) });
  return (await r.json()).token as string;
}

/** Appends a line to the UI step log (evidence of what was checked, with timestamps). */
export function log(testId: string, message: string) {
  fs.mkdirSync(path.join(EVIDENCE, "ui"), { recursive: true });
  fs.appendFileSync(path.join(EVIDENCE, "ui", "ui-step-log.txt"), `${new Date().toISOString()}\t${testId}\t${message}\n`);
}
