"""Writes the cycle 2 narrative deliverables from the generated cycle-2 CSV/JSON outputs and raw evidence:
QA_OUT/QA-Retest-Report.md (with Appendix A before/after evidence), test-metrics.md, regression-results.md, cycle-info.md.
Run after build_cycle2_report.py. Figures go to QA_OUT/report-figures (downscaled copies of existing screenshots).
"""
import csv, json, os, re
from collections import Counter
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
TESTING = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT = os.path.abspath(os.environ["QA_OUT"])
C1DIR = os.path.join(TESTING, "cycles")            # cycle-1 evidence lives in cycles/evidence (moved by the team)
C1DOC = os.path.join(TESTING, "cycles", "cycle 1")
FIG = os.path.join(OUT, "report-figures"); os.makedirs(FIG, exist_ok=True)
rd = lambda p: list(csv.DictReader(open(p, encoding="utf-8-sig")))
M = json.load(open(os.path.join(OUT, "metrics.json")))
R = rd(os.path.join(OUT, "test-execution-results.csv")); by = {r["Test ID"]: r for r in R}
RT = rd(os.path.join(OUT, "retest-results.csv"))
DEF = rd(os.path.join(TESTING, "defects", "defect-register.csv"))
RTM = rd(os.path.join(OUT, "traceability-matrix.csv"))
CMP = rd(os.path.join(OUT, "regression-comparison.csv"))
EV2 = {r["File"]: r["Evidence ID"] for r in rd(os.path.join(OUT, "evidence-index.csv"))}
EV1 = {r["File"]: r["Evidence ID"] for r in rd(os.path.join(C1DOC, "evidence-index.csv"))}
M1 = json.load(open(os.path.join(C1DIR, "evidence", "metrics.json")))
PERF1 = {r["ID"]: r for r in rd(os.path.join(C1DIR, "evidence", "performance", "PERF-api-response-times.csv"))}
PERF2 = rd(os.path.join(OUT, "evidence", "performance", "PERF-api-response-times.csv"))
PW = json.load(open(os.path.join(OUT, "evidence", "ui", "playwright-results.json"), encoding="utf-8"))["stats"]
PW1 = json.load(open(os.path.join(OUT, "evidence", "ui", "C2-UI-run1-unchanged-specs-results.json"), encoding="utf-8"))["stats"]


def table(rows, cols, w=200):
    out = ["| " + " | ".join(cols) + " |", "|" + "---|" * len(cols)]
    for r in rows:
        out.append("| " + " | ".join(str(r.get(c, "")).replace("|", "/").replace("\n", " ")[:w] for c in cols) + " |")
    return "\n".join(out)


def figure(path, label, prefix, max_ratio=1.25):
    im = Image.open(path).convert("RGB"); w, h = im.size; cropped = h > w * max_ratio
    if cropped:
        im = im.crop((0, 0, w, int(w * max_ratio)))
    if im.width > 1100:
        im = im.resize((1100, int(im.height * 1100 / im.width)), Image.LANCZOS)
    name = f"{prefix}-{os.path.splitext(os.path.basename(path))[0]}.jpg"
    im.save(os.path.join(FIG, name), "JPEG", quality=82)
    return f"![{label}{' (top of page shown)' if cropped else ''}](report-figures/{name})\n"


def c1(relpath):  # relpath like evidence/ui/x.png (as recorded in cycle 1)
    return os.path.join(C1DIR, relpath.replace("/", os.sep)), EV1.get(relpath, "EVID-?")


def c2(relpath):
    return os.path.join(OUT, relpath.replace("/", os.sep)), EV2.get(relpath, "C2-EVID-?")


def api_excerpt(path, evid, cyc):
    d = json.load(open(path, encoding="utf-8"))
    req, res = d["request"], d["response"]
    body = json.dumps(res["body"], ensure_ascii=False) if isinstance(res["body"], (dict, list)) else (res["body"] or "")
    rq = json.dumps(req["body"], ensure_ascii=False) if isinstance(req["body"], (dict, list)) else (req["body"] or "")
    t = lambda s, n: s if len(s) <= n else s[:n] + " …(truncated)"
    return (f"**{cyc} · {evid} · {d['testId']}** — {d['title']} · verdict **{d['verdict']}**\n\n```\n{req['method']} {req['url']}\n"
            f"Authorization: {req['headers'].get('Authorization', 'none')}\n" + (f"Request body: {t(rq, 220)}\n" if rq else "")
            + f"→ HTTP {res['status']}  Content-Type: {res['headers'].get('Content-Type', '-')}\nResponse body: {t(body, 300) if body else '(empty)'}\n"
            f"Expected: {d['expected']}\nActual:   {d['actual']}\n```\n")


def excerpt(path, evid, title, pattern, n=8):
    lines = [l.rstrip() for l in open(path, encoding="utf-8", errors="replace") if re.search(pattern, l)][:n]
    return f"**{evid} · {title}**\n\n```\n" + "\n".join(x[:200] for x in lines) + "\n```\n"


lv = M["levels"]
lv1 = M1["levels"]
level_rows = [{"Level/Type": k, "Total": v[0], "Passed": v[1], "Failed": v[2], "Not executed": v[3], "Not applicable": v[4],
               "Cycle 1 (pass/fail)": (f"{lv1[k][1]}/{lv1[k][2]}" if k in lv1 else "new")} for k, v in lv.items()]
retest_tbl = [{"Defect": x["Defect ID"], "Sev.": x["Severity"], "Title": x["Title"][:90], "Retest result": x["Retest Result"],
               "Status now": next((d["Status"] for d in DEF if d["Defect ID"] == x["Defect ID"]), "")} for x in RT]
closed = [x for x in RT if x["Retest Result"] == "PASS"]
reopened = [x for x in RT if x["Retest Result"] == "FAIL"]
bb = [r for r in R if r["Level/Type"].startswith("Baseline black-box")]
dr = [r for r in R if r["Level/Type"].startswith("Dry run")]
reg_bad = [r for r in CMP if r["Change"] == "PASS→FAIL"]
perf_rows = [{"ID": r["ID"], "Operation": r["Operation"], "Cycle 1 median ms": PERF1.get(r["ID"], {}).get("Median ms", "-"),
              "Cycle 2 median ms": r["Median ms"], "Cycle 1 p95": PERF1.get(r["ID"], {}).get("P95 ms", "-"), "Cycle 2 p95": r["P95 ms"]} for r in PERF2]
open_now = [d for d in DEF if d["Status"] != "Closed"]
DELTAS = [float(r['Median ms']) - float(PERF1[r['ID']]['Median ms']) for r in PERF2 if r['ID'] in PERF1]
st = lambda i: by.get(i, {}).get("Status", "not run")

MAINT = [
    ("helpers.ts, customer.spec.ts", "Password fields located by role name (/^Password/, /^Confirm password/) instead of getByLabel('Password')",
     "Show/Hide toggle added to password fields; the old locator matched two elements (36 of 39 run-1 failures)"),
    ("admin.spec.ts BB-13, dry-runs.spec.ts DR-06", "Enter a moderation note before Reject; BB-13 also asserts the 'Add a reason' guard first",
     "Rejection reason is now mandatory (DEF-020 fix)"),
    ("admin.spec.ts TC-ADM-UI-002", "Assert a clear refusal message without the impossible 'remove reviews first' instruction",
     "Retest against DEF-007's expected result ('409 with a workable instruction'); the cycle-1 proxy check for review-delete buttons no longer reflects the fix design"),
    ("customer.spec.ts TC-UI-013", "Click the Vegan chip as a link; check every Galle result is in Galle",
     "Chips became links; cycle-1 assertion assumed one Galle cafe, but QA data adds 'QA Reviewed Cafe' in Galle"),
    ("customer.spec.ts TC-UI-006", "After the selector check, choose a restaurant and complete the submission",
     "Retest of DEF-014 – the journey can now be completed"),
    ("nonfunctional.spec.ts BB-18c", "Open the collapsible 'Filters' panel before counting controls", "Mobile filters now live in a <details> disclosure"),
    ("DomainModelTest (JUnit)", "Call Review.moderate(status, note, moderator) and assert moderator/time",
     "Production signature changed; committed test no longer compiled (DEF-021)"),
    ("RequestValidationTest TC-UNIT-VAL-010 (JUnit)", "Disabled with reason; result recorded as NOT APPLICABLE",
     "Premise (Bean Validation on the request record) obsolete – fix validates in the controller + DB constraint; behaviour verified by TC-INT-034, TC-ADM-007, TC-ADM-039"),
]
NEW_TESTS = ("API: TC-API-030…035 (price/spice filters), TC-API-040…046 (problem+json error bodies), TC-MOD-015…021 (rejection reason, "
             "audit fields, re-moderation, rating aggregation), TC-REV-021…027 (review deletion and its access rules), TC-ADM-038/039; "
             "start-up: TC-SEC-007/008; JUnit: TC-UNIT-JWT-006, TC-UNIT-DOM-006, TC-INT-023…026, TC-INT-042.")

report = f"""# QA Retest Report (Cycle 2) — TasteLanka Restaurant Review Portal

| | |
|---|---|
| Product / version | Commit `eed62c2` "bug fixes" (branch dev) — cycle 1 tested `fc1f1cc` |
| Cycle | Cycle 2 — defect retest and full regression, {M.get('date', '1 October 2026')} |
| Baseline | Test Plan (BB-01…BB-20, DR-01…DR-07, UT-01…UT-10) and the cycle 1 regression suites |
| Prepared by | QA (Claude Code) — every result from actual execution; evidence under `testing/cycles/cycle 2/evidence/` |

## 1. Executive Summary
All twenty cycle-1 defects were retested on commit `eed62c2` and the complete cycle-1 regression pack was re-executed, together with new tests for the changed behaviour. **{len(closed)} of {len(RT) - 1} cycle-1 defects pass their retest and are Closed**{('; ' + ', '.join(x['Defect ID'] for x in reopened) + ' still fail and are Reopened') if reopened else ''}. One new defect was found: **DEF-021 (Medium)** — the backend test suite as committed does not compile, so `./mvnw test`/`package` fail at this commit (fixed locally by QA, needs to be committed).

Counted tests: **{M['tot']}** — **{M['p']} passed, {M['f']} failed, {M['ne']} not executed** (usability sessions, no participants), **{M['na']} not applicable**. Pass rate = passed ÷ (passed + failed) = **{M['rate']}%** (cycle 1: {M1['rate']}%). Baseline: **{M['bb']['PASS']}/20 BB pass** (BB-19 is a partial pass – interface language switching is not implemented; cycle 1: {M1['bb_p']}/20); **{M['dr']['PASS']}/7 dry runs pass**. Regression: **{M['regression'].get('PASS→FAIL', 0)} test(s) changed from PASS to FAIL**; {M['regression'].get('FAIL→PASS', 0)} changed from FAIL to PASS.

Remaining failures are: {', '.join(sorted({r['Test ID'] for r in R if r['Status'] == 'FAIL' and r['Level/Type'] != 'Baseline sub-test (UI)'}))}.

## 2. Scope of Cycle 2
* **Retest** of DEF-001…DEF-020 against their original expected results.
* **Regression** — re-execution of every cycle-1 suite: backend JUnit (existing + QA), Python API/security/data harness (151 original API tests), persistence across restart, moderator scope, performance, Playwright UI/E2E (BB, DR, responsive, accessibility, multilingual).
* **New behaviour introduced by the fix commit** — tested with new cases: {NEW_TESTS}
* Out of scope (unchanged): FR-11/FR-12 (not implemented), usability sessions (no participants), load testing.

## 3. Test Environment
Same machine and tools as cycle 1 (Windows 11 10.0.26200, JDK 17.0.12, Maven 3.9.16, Node 22.21.0, MySQL 8.0.45 on port 3307, Edge 154 via Playwright 1.63.0, axe-core 4.13.0, Python 3.9.12). Differences:
* Commit under test `eed62c2`. The working tree also contained an **uncommitted local change to `application.yml`** (datasource defaults → localhost:3307 root/root); it was overridden by `DB_URL`/`DB_USERNAME`/`DB_PASSWORD` in every run and does not affect results.
* Fresh schemas **`tastelanka_qa_c2`** and **`tastelanka_junit_c2`** created from the *updated* `database/schema/001_schema.sql` (price-range CHECK, `moderated_by`/`moderated_at`) and the seed script.
* Per the updated README a **private `JWT_SECRET`** (64 random URL-safe characters, test value in `testing/qa.env`) was set for the API.
* All cycle-2 outputs written to `testing/cycles/cycle 2/` (scripts now require `QA_OUT`, so cycle 1 evidence cannot be overwritten).

## 4. Approach and Test Maintenance
Each defect's retest uses the tests that failed in cycle 1 plus targeted new tests; the whole cycle-1 pack is then re-run as regression. Where the fix commit **intentionally** changed the UI or an API signature, the affected tests were updated (never to hide a product failure). The UI suite was first run **unchanged** (run 1: {PW1['expected']} passed, {PW1['unexpected']} failed — evidence `evidence/ui/C2-UI-run1-unchanged-specs-*`), then with the maintained specs (final run: {PW['expected']} passed, {PW['unexpected']} failed).

{table([{'Where': a, 'Change': b, 'Reason': c} for a, b, c in MAINT], ['Where', 'Change', 'Reason'], 260)}

## 5. Test Execution Summary
{table(level_rows, ['Level/Type', 'Total', 'Passed', 'Failed', 'Not executed', 'Not applicable', 'Cycle 1 (pass/fail)'])}

Not counted: {M['setup']} setup steps and {M['info']} informational observations (TC-SEC-006, TC-SEC-060, TC-SEC-071/072). Static checks: ESLint, `next build` and `tsc` pass; `./mvnw test` as committed fails to compile (C2-AUTO-001, DEF-021); after the test update the backend suite runs 76 tests: 75 passed, 1 not applicable (C2-AUTO-002, final run C2-AUTO-003: BUILD SUCCESS).

## 6. Defect Retest Results
{table(retest_tbl, ['Defect', 'Sev.', 'Title', 'Retest result', 'Status now'], 120)}

Per-defect retest test IDs, statuses and evidence: `retest-results.csv`. The live register `testing/defects/defect-register.csv` has been updated (Status, Fix Version, Retest Result); the pre-retest copy is `defect-register-before-retest.csv`.

## 7. Regression Results
Comparison of every counted test with its cycle-1 status (`regression-comparison.csv`): {', '.join(f'{k}: {v}' for k, v in M['regression'].items() if v)}.
{('Tests that regressed (PASS → FAIL): ' + ', '.join(r['Test ID'] for r in reg_bad) + '.') if reg_bad else '**No test that passed in cycle 1 fails in cycle 2.**'}

## 8. Functional (Baseline) Results
{table([{'Test ID': r['Test ID'], 'Requirement': r['Requirement'], 'Cycle 1': r['Cycle 1 Status'], 'Cycle 2': r['Status'], 'Defect': r['Defect ID']} for r in bb], ['Test ID', 'Requirement', 'Cycle 1', 'Cycle 2', 'Defect'])}

## 9. Dry Runs
{table([{'Test ID': r['Test ID'], 'Cycle 1': r['Cycle 1 Status'], 'Cycle 2': r['Status'], 'Notes': r['Actual Result'][:120]} for r in dr], ['Test ID', 'Cycle 1', 'Cycle 2', 'Notes'])}

## 10. API and Security Results
* Original API/security suite: {sum(1 for r in R if r['Level/Type'].startswith('API') and r['Cycle 1 Status'] not in ('NEW', '') and r['Status'] == 'PASS')} passed / {sum(1 for r in R if r['Level/Type'].startswith('API') and r['Cycle 1 Status'] not in ('NEW', '') and r['Status'] == 'FAIL')} failed (cycle 1: 82 / 70).
* Errors now return the correct status with an RFC 7807 `application/problem+json` body (e.g. 400 `fullName: must not be blank`, 409 `Restaurant has customer reviews and cannot be deleted`); unauthenticated requests get 401.
* Token forged with the old default secret: **{st('TC-SEC-005')}** (rejected). API start-up without `JWT_SECRET`: **{st('TC-SEC-007')}**; with the `.env.example` placeholder: **{st('TC-SEC-008')}**.
* Review deletion: author only (another customer 403, admin token 403, anonymous 401, missing 404); deleting an approved review updates the rating.
* Observations unchanged from cycle 1 (not defects): no login throttling after 10 failures (TC-SEC-060); a JWT stays valid until expiry after logout (TC-SEC-006); MODERATOR can create/delete restaurants (TC-SEC-071/072).

## 11. Non-Functional Results
**Performance (NFR-01)** — measured only (no thresholds defined):

{table(perf_rows, ['ID', 'Operation', 'Cycle 1 median ms', 'Cycle 2 median ms', 'Cycle 1 p95', 'Cycle 2 p95'])}

Median change per operation: {min(d for d in DELTAS):+.1f} to {max(d for d in DELTAS):+.1f} ms (single client, local; indicative). The listing query now also evaluates the spice-level sub-query.

**Responsiveness** — mobile {st('BB-18-mobile')}, tablet {st('BB-18-tablet')} (cycle 1 FAIL, 153 px overflow), desktop {st('BB-18-desktop')}; mobile filters {st('BB-18c')}.
**Accessibility** — axe WCAG 2.1 A/AA {st('BB-20a')}; star buttons {st('BB-20d')}; form labels {st('BB-20e')}; keyboard login {st('BB-20b')}; focus {st('BB-20c')}. Observation: the password input's accessible name is now "Password Show password" because the new toggle button sits inside the label (minor; not logged as a defect).
**Multilingual** — Sinhala/Tamil content {st('BB-19a')}/{st('BB-19b')}; UI language switch {st('BB-19c')} (not implemented – change-management item, as in cycle 1).

## 12. New Defects and Observations
* **DEF-021 (Medium / High priority)** — backend test sources do not compile at `eed62c2`; QA updated `DomainModelTest` in the working tree (uncommitted). Status *Fixed*, to be closed once committed and the build passes on the committed code.
* Observation — seeded restaurants keep their demo rating/review counts and approved reviews are added on top (e.g. Ministry of Crab 320 → 322); expected for demo seed data, but the seeded numbers are not real reviews.
* Observation — password-field accessible name (see §11).
* Observation — at 768 px (tablet portrait) the header logo text "TasteLanka" touches the "Home" link (no overflow; cosmetic, also visible in cycle 1) — see the cycle-2 tablet figure in Appendix A.3.

## 13. Requirements Traceability (summary)
{table([{k: x[k] for k in ('Requirement', 'Purpose', 'Execution Status', 'Result', 'Coverage Status')} for x in RTM], ['Requirement', 'Purpose', 'Execution Status', 'Result', 'Coverage Status'], 90)}

Full matrix (test IDs, evidence, defects): `traceability-matrix.csv`.

## 14. Test Metrics
See `test-metrics.md`. Retest pass rate: **{M['retest_pass']}/{M['retest_total']}** defects ({round(100 * M['retest_pass'] / M['retest_total'], 1)}%). Defects: {', '.join(f'{k} {v}' for k, v in M['def_status'].items() if v)}; open by severity: {', '.join(f'{k} {v}' for k, v in M['open_sev'].items() if v) or 'none'}.

## 15. Evidence Index
{M['evid']} cycle-2 evidence items catalogued as C2-EVID-001…C2-EVID-{M['evid']:03d} in `evidence-index.csv`. Appendix A shows the key before/after evidence; cycle-1 items keep their cycle-1 IDs (EVID-nnn, `testing/cycles/cycle 1/evidence-index.csv`).

## 16. Outstanding Risks / Issues
* DEF-021 must be committed, otherwise CI and packaging fail on the dev branch.
* {('Reopened defects: ' + ', '.join(x['Defect ID'] for x in reopened) + '.') if reopened else 'No reopened defects.'}
* Not implemented: FR-11 review comments, FR-12 restaurant responses, interface language switching (FR-15 partial).
* Unchanged observations: no login throttling, JWT not revocable on logout, MODERATOR has full catalogue rights.
* Usability (NFR-02) still unevidenced — UT-01…UT-10 need participants.
* `testing/qa.env` holds local test credentials and the test JWT secret and is tracked by git; keep it out of shared repositories.

## 17. Final QA Assessment
Based on executed tests, the fix commit resolves the defects listed as Closed above, including the Critical token-forgery issue (DEF-003) and both High defects (DEF-001, DEF-008), and introduced no regression in previously passing tests. Before the build can be accepted, DEF-021 must be committed (the committed code does not pass `./mvnw test`){(' and ' + ', '.join(x['Defect ID'] for x in reopened) + ' must be fixed') if reopened else ''}. FR-11, FR-12 and UI translation remain not implemented, and usability testing with participants is still outstanding.
"""

# ------------------------------------------------------------------ Appendix A: before / after evidence
A = ["## Appendix A — Retest Evidence (before / after)",
     "Cycle 1 items are from `testing/cycles/evidence/` (IDs EVID-nnn); cycle 2 items from `testing/cycles/cycle 2/evidence/` (IDs C2-EVID-nnn). "
     "Screenshots are downscaled copies; very tall pages are cropped to the top.", ""]
A += ["### A.1 API and security (same test, cycle 1 vs cycle 2)", ""]
for cat, tid, did in [("api", "TC-AUTH-003", "DEF-001"), ("api", "TC-ADM-003", "DEF-001"), ("security", "TC-SEC-001", "DEF-002"),
                      ("security", "TC-SEC-005", "DEF-003"), ("api", "TC-MOD-012", "DEF-004"), ("api", "TC-ADM-007", "DEF-005"),
                      ("api", "TC-ADM-011", "DEF-006"), ("api", "TC-ADM-037", "DEF-007"), ("database", "TC-DATA-002", "DEF-008")]:
    p1, e1 = c1(f"evidence/{cat}/{tid}.json"); p2, e2 = c2(f"evidence/{cat}/{tid}.json")
    A += [f"#### {did} — {tid}", ""]
    if os.path.exists(p1): A += [api_excerpt(p1, e1, "Cycle 1")]
    if os.path.exists(p2): A += [api_excerpt(p2, e2, "Cycle 2")]
A += ["### A.2 New tests for the fixes", ""]
for cat, tid in [("api", "TC-API-030"), ("api", "TC-API-031"), ("api", "TC-MOD-015"), ("api", "TC-MOD-018"), ("api", "TC-MOD-021"),
                 ("api", "TC-REV-021"), ("security", "TC-REV-022"), ("api", "TC-API-040")]:
    p2, e2 = c2(f"evidence/{cat}/{tid}.json")
    if os.path.exists(p2): A += [api_excerpt(p2, e2, "Cycle 2")]
for log_, tid, pat in [("evidence/security/TC-SEC-007-startup-without-jwt-secret.log", "TC-SEC-007 — API start-up without JWT_SECRET (DEF-003)", r"JWT_SECRET|BUILD|exit="),
                       ("evidence/security/TC-SEC-008-startup-with-placeholder-secret.log", "TC-SEC-008 — start-up with the .env.example placeholder (DEF-003)", r"JWT_SECRET must be set|BUILD|exit="),
                       ("evidence/automated/C2-AUTO-001-backend-test-as-committed.log", "C2-AUTO-001 — ./mvnw test as committed (DEF-021)", r"COMPILATION ERROR|cannot be applied|BUILD|exit="),
                       ("evidence/automated/C2-AUTO-002-junit-full-suite.log", "C2-AUTO-002 — backend suite after test update", r"Tests run:.*in com|Tests run: \d+, F[^-]*$")]:
    p2, e2 = c2(log_)
    if os.path.exists(p2): A += [excerpt(p2, e2, tid, pat, 10)]
p1, e1 = c1("evidence/database/TC-DATA-db-snapshot-after-restart.txt"); p2, e2 = c2("evidence/database/TC-DATA-db-snapshot-after-restart.txt")
A += [excerpt(p1, e1, "Cycle 1 — database after API restart (DEF-008: edit reverted, deleted dish re-created)", r"nuga-gama|seafood-kottu|snapshot"),
      excerpt(p2, e2, "Cycle 2 — database after API restart (edit kept, deleted dish stays deleted)", r"nuga-gama|seafood-kottu|snapshot")]
p2, e2 = c2("evidence/database/TC-DATA-010-relationship-integrity.txt")
A += [excerpt(p2, e2, "Cycle 2 — integrity and moderation-audit checks (DEF-005, DEF-020)", r"\| [a-z].*\| +\d+ \||moderated|REJECTED", 16)]
A += ["### A.3 UI (cycle 1 vs cycle 2)", ""]
for rel1, rel2, did, cap in [
    ("evidence/ui/BB-08c-cuisine-link-seafood.png", "evidence/ui/BB-08c-cuisine-link-seafood.png", "DEF-009", "cuisine link Seafood"),
    ("evidence/ui/TC-UI-006-review-without-restaurant.png", "evidence/ui/TC-UI-006-review-without-restaurant.png", "DEF-014", "review from the home page"),
    ("evidence/ui/responsive/BB-18-tablet-restaurants.png", "evidence/ui/responsive/BB-18-tablet-restaurants.png", "DEF-013", "restaurant list at 768 px"),
    ("evidence/ui/responsive/BB-18c-mobile-restaurants-no-filters.png", "evidence/ui/responsive/BB-18c-mobile-restaurants-no-filters.png", "DEF-012", "filters on a phone"),
    ("evidence/ui/TC-UI-008-saved-state-after-reload.png", "evidence/ui/TC-UI-008-saved-state-after-reload.png", "DEF-015", "saved state after reload"),
    ("evidence/ui/TC-ADM-UI-002-delete-restaurant-with-reviews.png", "evidence/ui/TC-ADM-UI-002-delete-restaurant-with-reviews.png", "DEF-007", "deleting a reviewed restaurant"),
    ("evidence/ui/TC-UI-001-home-desktop.png", "evidence/ui/TC-UI-001-home-desktop.png", "DEF-016", "home page Top Rated"),
    ("evidence/ui/BB-13b-moderation-approved-tab.png", "evidence/ui/BB-13b-moderation-approved-tab.png", "DEF-020", "moderation audit details")]:
    p1, e1 = c1(rel1); p2, e2 = c2(rel2)
    A += [f"#### {did} — {cap}", ""]
    if os.path.exists(p1): A += [figure(p1, f"Cycle 1 · {e1} · {did} — {cap} — source: cycles/{rel1}", "C1")]
    if os.path.exists(p2): A += [figure(p2, f"Cycle 2 · {e2} · {did} — {cap} — source: cycle 2/{rel2}", "C2")]
axe = os.path.join(OUT, "evidence", "ui", "BB-20a-axe-violations.json")
if os.path.exists(axe):
    v = json.load(open(axe, encoding="utf-8"))
    A += [f"**{EV2.get('evidence/ui/BB-20a-axe-violations.json', 'C2-EVID-?')} · BB-20a — axe-core results, cycle 2 (DEF-017, DEF-018)**", ""]
    A += [table([{"Page": x["page"], "Rule": x["id"], "Impact": x["impact"], "Nodes": x["nodes"]} for x in v], ["Page", "Rule", "Impact", "Nodes"])
          if v else "No WCAG 2.1 A/AA violations reported on the 10 scanned pages.", ""]
open(os.path.join(OUT, "QA-Retest-Report.md"), "w", encoding="utf-8").write(report + "\n" + "\n".join(A) + "\n")

metrics = f"""# Test Metrics — Cycle 2 (from actual execution)

Pass-rate denominator: executed tests with PASS or FAIL (setup steps, informational observations, BB sub-tests, NOT EXECUTED and NOT APPLICABLE excluded).

| Metric | Cycle 2 | Cycle 1 |
|---|---|---|
| Total test cases (counted) | {M['tot']} | {M1['tot']} |
| Executed (PASS + FAIL) | {M['p'] + M['f']} | {M1['p'] + M1['f']} |
| Passed | {M['p']} | {M1['p']} |
| Failed | {M['f']} | {M1['f']} |
| Blocked | {M['b']} | {M1['b']} |
| Not executed | {M['ne']} | {M1['ne']} |
| Not applicable | {M['na']} | 0 |
| **Pass rate** | **{M['rate']}%** | {M1['rate']}% |
| Baseline BB pass / fail | {M['bb']['PASS']} / {M['bb']['FAIL']} | {M1['bb_p']} / {M1['bb_f']} |
| Dry runs pass / fail | {M['dr']['PASS']} / {M['dr']['FAIL']} | {M1['dr_p']} / {M1['dr_f']} |
| Defects retested / passed | {M['retest_total']} / {M['retest_pass']} | – |
| Retest pass rate | {round(100 * M['retest_pass'] / M['retest_total'], 1)}% | – |
| Defect status | {', '.join(f'{k} {v}' for k, v in M['def_status'].items() if v)} | Open 20 |
| Open defects by severity | {', '.join(f'{k} {v}' for k, v in M['open_sev'].items() if v) or 'none'} | Critical 1, High 2, Medium 13, Low 4 |
| Regression (vs cycle 1) | {', '.join(f'{k} {v}' for k, v in M['regression'].items() if v)} | – |
| Requirements Covered / Partial / Not Implemented / Not Evidenced | {M['cov']['Covered']} / {M['cov']['Partially Covered']} / {M['cov']['Not Implemented']} / {M['cov']['Not Evidenced']} | {M1['cov']['Covered']} / {M1['cov']['Partially Covered']} / {M1['cov']['Not Implemented']} / {M1['cov']['Not Evidenced']} |
| Evidence items | {M['evid']} | {M1['evid']} |
"""
open(os.path.join(OUT, "test-metrics.md"), "w", encoding="utf-8").write(metrics)

reg = f"""# Retest & Regression Results — Cycle 2

## Retest
{table([{k: x[k] for k in ('Defect ID', 'Severity', 'Original Result (cycle 1)', 'Fix', 'Retest Tests', 'Retest Result')} for x in RT], ['Defect ID', 'Severity', 'Original Result (cycle 1)', 'Fix', 'Retest Tests', 'Retest Result'], 160)}

## Regression
| Suite | Command | Result (cycle 2) | Cycle 1 |
|---|---|---|---|
| Backend JUnit as committed | `./mvnw test` | compilation error (DEF-021) | 69 run, 57 passed, 12 failed |
| Backend JUnit after test update (C2-AUTO-002) | `./mvnw test` (DB_URL→tastelanka_junit_c2, JWT_SECRET set) | 76 run, 75 passed, 1 failed (TC-UNIT-VAL-010 – obsolete premise) | – |
| Backend JUnit final (C2-AUTO-003) | same, TC-UNIT-VAL-010 disabled with reason | 76 run, 75 passed, 0 failed, 1 skipped (not applicable) – BUILD SUCCESS | 69 run, 57 passed, 12 failed |
| API/security/data – original suite | `python testing/scripts/api_security_tests.py` | 151 passed, 0 failed | 83 passed, 68 failed |
| API – cycle 2 additions | `python testing/scripts/api_cycle2_tests.py` | all passed (see results CSV) | new |
| Persistence across restart | `persistence_tests.py pre/post` | 17 passed, 0 failed | 15 passed, 2 failed |
| UI/E2E – unchanged specs (run 1) | `npx playwright test` | {PW1['expected']} passed, {PW1['unexpected']} failed (test maintenance needed) | 49 passed, 15 failed |
| UI/E2E – maintained specs (final) | `npx playwright test` | {PW['expected']} passed, {PW['unexpected']} failed | 49 passed, 15 failed |

Status change of every counted test against cycle 1: {', '.join(f'{k}: {v}' for k, v in M['regression'].items() if v)}. {('PASS→FAIL: ' + ', '.join(r['Test ID'] for r in reg_bad)) if reg_bad else 'No previously passing test fails.'}
Per-test comparison: `regression-comparison.csv`.
"""
open(os.path.join(OUT, "regression-results.md"), "w", encoding="utf-8").write(reg)

info = f"""# Cycle 2 — Retest after bug fixes

| | |
|---|---|
| Date | 1 October 2026 |
| Commit tested | `eed62c2` "bug fixes" (Vimukthi Bandaragoda, 08:30) on branch `dev`; cycle 1 tested `fc1f1cc` |
| Local, uncommitted changes present | `backend/src/main/resources/application.yml` datasource defaults (overridden by environment in all runs); QA test updates in `backend/src/test/.../qa/` |
| Databases | `tastelanka_qa_c2`, `tastelanka_junit_c2` (MySQL 8.0.45, port 3307) built from the updated project scripts |
| Defects retested | DEF-001…DEF-020 |
| Result | {len(closed)} closed, {len(reopened)} reopened, 1 new (DEF-021) |
| Report | `QA-Retest-Report.md` / `.docx` |
"""
open(os.path.join(OUT, "cycle-info.md"), "w", encoding="utf-8").write(info)
print("written: QA-Retest-Report.md, test-metrics.md, regression-results.md, cycle-info.md;", len(os.listdir(FIG)), "figures")
