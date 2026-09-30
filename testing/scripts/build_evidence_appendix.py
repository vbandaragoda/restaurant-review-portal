"""Builds the evidence appendix for the QA report from EXISTING evidence files only.

* Figures: cropped/downscaled copies of screenshots taken during the final exclusive Playwright run
  (originals are untouched and referenced by their EVID id in evidence-index.csv).
* API/security excerpts: taken verbatim (truncated) from the per-test JSON evidence written by the harness.
* DB excerpts: lines copied from the before/after SQL snapshots.
Writes testing/report-evidence-appendix.md and testing/report-figures/*.jpg.
"""
import csv, json, os, re
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
EV = os.path.join(ROOT, "evidence")
FIG = os.path.join(ROOT, "report-figures")
os.makedirs(FIG, exist_ok=True)
EVID = {r["File"]: r["Evidence ID"] for r in csv.DictReader(open(os.path.join(ROOT, "evidence-index.csv"), encoding="utf-8-sig"))}


def evid(rel):
    e = EVID.get(rel)
    if not e:
        raise SystemExit(f"not in evidence index: {rel}")
    return e


def figure(rel, test, proves, max_ratio=1.25):
    src = os.path.join(ROOT, rel)
    im = Image.open(src).convert("RGB")
    w, h = im.size
    cropped = h > w * max_ratio
    if cropped:
        im = im.crop((0, 0, w, int(w * max_ratio)))
    if im.width > 1100:
        im = im.resize((1100, int(im.height * 1100 / im.width)), Image.LANCZOS)
    name = os.path.splitext(os.path.basename(rel))[0] + ".jpg"
    im.save(os.path.join(FIG, name), "JPEG", quality=82)
    note = " (top of full-page screenshot shown)" if cropped else ""
    return f"![{evid(rel)} · {test} · {proves}{note} — source: {rel}](report-figures/{name})\n"


def api(rel, test):
    d = json.load(open(os.path.join(ROOT, rel), encoding="utf-8"))
    req, res = d["request"], d["response"]
    body = json.dumps(req["body"], ensure_ascii=False) if isinstance(req["body"], (dict, list)) else (req["body"] or "")
    rbody = json.dumps(res["body"], ensure_ascii=False) if isinstance(res["body"], (dict, list)) else (res["body"] or "")
    auth = req["headers"].get("Authorization", "none")
    trunc = lambda s, n: s if len(s) <= n else s[:n] + " …(truncated)"
    return (f"**{evid(rel)} · {test} — {d['title']}** · executed {d['executedAt']} · verdict **{d['verdict']}**\n\n"
            "```\n"
            f"{req['method']} {req['url']}\n"
            f"Authorization: {auth}\n"
            + (f"Request body: {trunc(body, 300)}\n" if body else "")
            + f"→ HTTP {res['status']} ({res['elapsedMs']} ms)  Content-Length: {res['headers'].get('Content-Length', '-')}\n"
            f"Response body: {trunc(rbody, 420) if rbody else '(empty)'}\n"
            f"Expected: {d['expected']}\n"
            f"Actual:   {d['actual']}\n"
            "```\n")


def excerpt(rel, pattern, title, maxlines=14):
    lines = [l.rstrip() for l in open(os.path.join(ROOT, rel), encoding="utf-8", errors="replace") if re.search(pattern, l)]
    return f"**{evid(rel)} · {title}** — source: {rel}\n\n```\n" + "\n".join(lines[:maxlines]) + "\n```\n"


md = ["## Appendix A — Evidence",
      "All items below are reproduced from the evidence files catalogued in `evidence-index.csv`. Screenshots come from the final exclusive "
      "Playwright run (Microsoft Edge 154, 1440×900 unless stated); they are downscaled copies, and very tall pages are cropped to their top "
      "portion. API excerpts are the recorded request/response of the executed test (passwords and tokens redacted at capture time).", ""]

md += ["### A.1 Baseline black-box tests (BB)", ""]
for rel, t, p in [
    ("evidence/ui/BB-01-registration-success-profile.png", "BB-01 PASS", "new account lands on profile showing name and e-mail"),
    ("evidence/ui/BB-02a-registration-password-mismatch.png", "BB-02 PASS", "mismatched passwords rejected with message"),
    ("evidence/ui/BB-02b-registration-duplicate-email.png", "BB-02 PASS", "duplicate e-mail rejected with message"),
    ("evidence/ui/BB-04-login-invalid-password.png", "BB-04 PASS", "wrong password rejected: 'Invalid email or password.'"),
    ("evidence/ui/BB-05-profile.png", "BB-03/BB-05 PASS", "authenticated profile with reviews and saved sections"),
    ("evidence/ui/BB-07-search-crab.png", "BB-07 PASS", "search 'crab' returns 1 matching restaurant"),
    ("evidence/ui/BB-08a-filter-kandy-vegan.png", "BB-08a PASS", "Kandy + Vegan filter returns 2 restaurants"),
    ("evidence/ui/BB-08c-cuisine-link-seafood.png", "BB-08c FAIL (DEF-009)", "cuisine=Seafood link still lists all restaurants"),
    ("evidence/ui/BB-09a-restaurant-details-menu.png", "BB-09 PASS", "restaurant details and menu"),
    ("evidence/ui/BB-09b-dish-details.png", "BB-09 PASS", "dish details: price LKR 9,500, spice Hot"),
    ("evidence/ui/BB-10-review-submitted.png", "BB-10 PASS", "review accepted, pending moderation"),
    ("evidence/ui/BB-11a-review-too-short.png", "BB-11 PASS", "review text under 10 characters blocked"),
    ("evidence/ui/BB-12-own-reviews-pending.png", "BB-12 PASS", "own review listed with PENDING status"),
    ("evidence/ui/BB-13b-moderation-approved-tab.png", "BB-13 PASS", "approved review moves to APPROVED tab"),
    ("evidence/ui/BB-13c-public-page-shows-only-approved.png", "BB-13 PASS", "public page shows the approved review only"),
    ("evidence/security/BB-14a-customer-denied-admin-ui.png", "BB-14 PASS", "customer redirected away from /admin"),
    ("evidence/security/BB-14c-forged-client-role-no-data.png", "BB-14 PASS", "role forged in browser storage: API refuses admin data"),
    ("evidence/ui/BB-15a-restaurant-created.png", "BB-15 PASS", "admin created restaurant listed"),
    ("evidence/ui/BB-15b-restaurant-updated.png", "BB-15 PASS", "admin update (rename, Galle) reflected"),
    ("evidence/ui/BB-16b-dish-updated-visible-on-menu.png", "BB-16 PASS", "admin-created dish appears on public menu"),
    ("evidence/ui/responsive/BB-18-mobile-home.png", "BB-18 mobile PASS", "375 px home, no horizontal overflow"),
    ("evidence/ui/responsive/BB-18-tablet-restaurants.png", "BB-18 tablet FAIL (DEF-013)", "768 px listing: collapsed cards, 153 px overflow"),
    ("evidence/ui/responsive/BB-18c-mobile-restaurants-no-filters.png", "BB-18c FAIL (DEF-012)", "375 px listing without any filter controls"),
    ("evidence/ui/BB-19a-sinhala-tamil-reviews.png", "BB-19a PASS", "approved Sinhala and Tamil reviews rendered"),
    ("evidence/ui/BB-20c-focus-indicator-login-button.png", "BB-20c PASS", "visible focus on Log In button"),
]:
    md += [figure(rel, t, p)]

axe = json.load(open(os.path.join(EV, "ui", "BB-20a-axe-violations.json"), encoding="utf-8"))
md += [f"**{evid('evidence/ui/BB-20a-axe-violations.json')} · BB-20a FAIL (DEF-017, DEF-018) — axe-core WCAG 2.1 A/AA results**", "",
       "| Page | Rule | Impact | Nodes | Example element |", "|---|---|---|---|---|"]
md += [f"| {v['page']} | {v['id']} | {v['impact']} | {v['nodes']} | `{(v['sample'] or '')[:60]}` |" for v in axe] + [""]
md += [excerpt("evidence/database/TC-DATA-db-snapshot-before-restart.txt", r"nuga-gama|seafood-kottu|snapshot_time|\d{4}-\d\d-\d\d", "BB-17 / TC-DATA-002 — database BEFORE API restart (admin edit applied, seeded dish deleted)")]
md += [excerpt("evidence/database/TC-DATA-db-snapshot-after-restart.txt", r"nuga-gama|seafood-kottu|snapshot_time|\d{4}-\d\d-\d\d", "BB-17 / TC-DATA-002/003 FAIL (DEF-008) — database AFTER restart (edit reverted, dish re-created as id 10)")]

md += ["### A.2 Dry runs (DR)", ""]
for rel, t, p in [
    ("evidence/dry-runs/DR-01-step5-restaurant-details.png", "DR-01 PASS", "new user reaches restaurant details after search/filter"),
    ("evidence/dry-runs/DR-02-step6-review-public.png", "DR-02 PASS", "review approved by admin is publicly visible (4 stars)"),
    ("evidence/dry-runs/DR-03-step4-profile-saved.png", "DR-03 PASS", "saved restaurant shown on profile"),
    ("evidence/dry-runs/DR-04-step4-updated-public-page.png", "DR-04 PASS", "admin price update visible on public page"),
    ("evidence/dry-runs/DR-05-step4-dish-updated.png", "DR-05 PASS", "admin dish price update visible (LKR 1,250)"),
    ("evidence/dry-runs/DR-06-step4-author-profile-statuses.png", "DR-06 PASS", "author sees APPROVED and REJECTED outcomes"),
    ("evidence/dry-runs/DR-07-step4-si-ta-reviews-rendered.png", "DR-07 PASS", "Sinhala/Tamil content readable"),
]:
    md += [figure(rel, t, p)]
md += [excerpt("evidence/ui/ui-step-log.txt", r"\tDR-0\d\t", "Dry-run step log (timestamps from the final run)", 30)]

md += ["### A.3 API and security evidence", ""]
for rel, t in [
    ("evidence/api/TC-AUTH-001.json", "TC-AUTH-001 PASS"),
    ("evidence/api/TC-AUTH-003.json", "TC-AUTH-003 FAIL (DEF-001)"),
    ("evidence/api/TC-AUTH-014.json", "TC-AUTH-014 FAIL (DEF-001)"),
    ("evidence/api/TC-ADM-003.json", "TC-ADM-003 FAIL (DEF-001) — as ADMIN"),
    ("evidence/security/TC-SEC-001.json", "TC-SEC-001 FAIL (DEF-002)"),
    ("evidence/security/TC-SEC-005.json", "TC-SEC-005 FAIL (DEF-003, Critical)"),
    ("evidence/security/TC-SEC-010.json", "TC-SEC-010 PASS"),
    ("evidence/security/TC-SEC-020.json", "TC-SEC-020 PASS"),
    ("evidence/security/TC-SEC-021.json", "TC-SEC-021 PASS"),
    ("evidence/security/TC-SEC-041.json", "TC-SEC-041 PASS"),
    ("evidence/api/TC-MOD-012.json", "TC-MOD-012 FAIL (DEF-004)"),
    ("evidence/api/TC-ADM-007.json", "TC-ADM-007 FAIL (DEF-005)"),
    ("evidence/api/TC-ADM-011.json", "TC-ADM-011 FAIL (DEF-006)"),
    ("evidence/api/TC-ADM-037.json", "TC-ADM-037 FAIL (DEF-007)"),
    ("evidence/database/TC-DATA-002.json", "TC-DATA-002 FAIL (DEF-008)"),
]:
    md += [api(rel, t)]
md += [excerpt("evidence/logs/backend-run-1.log", r"Resolved \[org.springframework.web.bind.MethodArgumentNotValidException", "Backend log — correct 400-class exceptions were raised for requests the client received as 403 (DEF-001)", 3)]
md += [excerpt("evidence/logs/backend-run-1.log", r"Duplicate entry|Cannot delete or update a parent row", "Backend log — unhandled exceptions behind the masked 403s (DEF-006, DEF-007)", 6)]
md += [figure("evidence/security/TC-SEC-031-xss-rendered-as-text.png", "TC-SEC-031 PASS", "stored XSS payload rendered as plain text, no script executed")]

md += ["### A.4 Additional UI defects", ""]
for rel, t, p in [
    ("evidence/ui/TC-UI-006-review-without-restaurant.png", "TC-UI-006 FAIL (DEF-014)", "home 'Write a Review': no restaurant selector, generic error"),
    ("evidence/ui/TC-UI-008-saved-state-after-reload.png", "TC-UI-008 FAIL (DEF-015)", "already-saved restaurant shows 'Save'"),
    ("evidence/ui/TC-ADM-UI-002-delete-restaurant-with-reviews.png", "TC-ADM-UI-002 FAIL (DEF-007)", "'Remove its menu and reviews first' — no way to remove reviews"),
    ("evidence/ui/TC-UI-013-home-location-ignored.png", "TC-UI-013 FAIL (DEF-010)", "home location selector ignored"),
    ("evidence/ui/TC-ADM-UI-001-admin-dashboard.png", "TC-ADM-UI-001 PASS", "admin dashboard with live metrics"),
]:
    md += [figure(rel, t, p)]

md += ["### A.5 Automated test evidence", ""]
md += [excerpt("evidence/automated/AUTO-006-junit-qa-suite-final.log", r"Tests run:|BUILD", "JUnit final run — per-class summary", 12)]
md += [excerpt("evidence/ui/playwright-final-console.txt", r"^\s+\d+ (passed|failed)|^\s+x ", "Playwright final exclusive run — failures and totals", 20)]

open(os.path.join(ROOT, "report-evidence-appendix.md"), "w", encoding="utf-8").write("\n".join(md) + "\n")
print("appendix written;", len(os.listdir(FIG)), "figures")
