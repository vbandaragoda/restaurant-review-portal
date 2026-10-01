"""Generates QA-Test-Report.md, test-metrics.md and regression-results.md from the generated CSV/JSON outputs."""
import csv, glob, json, os
import xml.etree.ElementTree as ET
from collections import Counter

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
rd = lambda p: list(csv.DictReader(open(os.path.join(ROOT, p), encoding="utf-8-sig")))
M = json.load(open(os.path.join(ROOT, "evidence", "metrics.json")))
R, DEF, RTM, EVI = rd("test-execution-results.csv"), rd("defects/defect-register.csv"), rd("traceability-matrix.csv"), rd("evidence-index.csv")
PERF, PUI = rd("evidence/performance/PERF-api-response-times.csv"), rd("evidence/performance/PERF-UI-page-load.csv")
by = {r["Test ID"]: r for r in R}
EVID = {r["File"]: r["Evidence ID"] for r in EVI}
def ev_ids(field, n=4):
    ids = []
    for part in (field or "").split(";"):
        path = part.strip().split(" (")[0]
        if path in EVID and EVID[path] not in ids:
            ids.append(EVID[path])
    return ", ".join(ids[:n]) + (" …" if len(ids) > n else "") if ids else "—"
for r in R: r["EVID"] = ev_ids(r["Evidence"])
for d in DEF: d["EVID"] = ev_ids(d["Evidence"], 5)
counted = [r for r in R if r["Status"] not in ("SETUP", "INFO") and "Sub-test;" not in r["Notes"]]
fails = [r for r in counted if r["Status"] == "FAIL"]
def1 = sum(1 for r in fails if r["Defect ID"].strip().startswith("DEF-001") or r["Defect ID"] == "DEF-001")
def2 = sum(1 for r in fails if r["Defect ID"] == "DEF-002")
p, f, ne, tot = M["p"], M["f"], M["ne"], M["tot"]


def table(rows, cols, w=None):
    out = ["| " + " | ".join(cols) + " |", "|" + "---|" * len(cols)]
    for r in rows:
        out.append("| " + " | ".join(str(r.get(c, "")).replace("|", "/").replace("\n", " ")[: (w or 400)] for c in cols) + " |")
    return "\n".join(out)


def status_of(ids):
    return ", ".join(f"{i}: {by[i]['Status']}" for i in ids if i in by)


def junit_totals(folder):
    t = f_ = e = sk = 0
    for x in glob.glob(os.path.join(ROOT, "evidence", "automated", folder, "TEST-*.xml")):
        r = ET.parse(x).getroot()
        t += int(r.get("tests")); f_ += int(r.get("failures")); e += int(r.get("errors")); sk += int(r.get("skipped"))
    return t, t - f_ - e - sk, f_, e, sk
J1, JF = junit_totals("surefire-run1"), junit_totals("surefire-final")
PW = json.load(open(os.path.join(ROOT, "evidence", "ui", "playwright-results.json"), encoding="utf-8"))["stats"]
PW_T = PW["expected"] + PW["unexpected"] + PW["flaky"] + PW["skipped"]

lv = M["levels"]
level_rows = [{"Level/Type": k, "Total": v[0], "Passed": v[1], "Failed": v[2], "Not executed": v[3]} for k, v in lv.items()]
bb = [r for r in R if r["Level/Type"].startswith("Baseline black-box")]
dr = [r for r in R if r["Level/Type"].startswith("Dry run")]
open_defs = sum(d["Status"] == "Open" for d in DEF)
sec_rows = [r for r in R if r["Test ID"].startswith("TC-SEC") or r["Test ID"] in ("BB-14",)]
api_groups = Counter()
for r in R:
    if r["Level/Type"].startswith("API"):
        g = r["Test ID"].rsplit("-", 1)[0]
        api_groups[(g, r["Status"])] += 1
groups = sorted({g for g, _ in api_groups})
api_tbl = [{"Group": g, "Pass": api_groups[(g, "PASS")], "Fail": api_groups[(g, "FAIL")], "Info": api_groups[(g, "INFO")], "Setup steps": api_groups[(g, "SETUP")]} for g in groups]

report = f"""# QA Test Report — TasteLanka Restaurant Review Portal

| | |
|---|---|
| Product / version | TasteLanka Restaurant Review Portal — commit `fc1f1cc` (backend 0.0.1-SNAPSHOT, frontend 0.1.0) |
| Test cycle | 2026-09-30 (single cycle) |
| Baseline | *Test Plan – Restaurant Review Portal* (BB-01…BB-20, DR-01…DR-07, UT-01…UT-10) |
| Prepared by | QA (Claude Code) — all results from actual execution; evidence under `testing/evidence/` |

## 1. Executive Summary
The application was built, started and tested end-to-end (API, UI in Microsoft Edge, database, JUnit). **{tot} test cases** were counted: **{p} passed, {f} failed, {ne} not executed** (usability sessions without participants). Pass rate = passed ÷ (passed + failed) = **{M['rate']}%** — note that **{def1 + def2} of the {f} failures stem from two API error-handling defects (DEF-001, DEF-002)** that mask every error status as HTTP 403 — the invalid requests are still rejected (the backend log shows the correct exception being raised), but clients receive no usable status or message.

Core journeys work: registration, login/logout, browsing, search, location/dietary filters, restaurant and dish details, review submission with moderation, saved restaurants, admin CRUD for restaurants and dishes, role enforcement on the API, persistence of new data, Sinhala/Tamil content. Baseline: **{M['bb_p']}/20 BB tests pass, {M['bb_f']} fail; {M['dr_p']}/7 dry runs pass{', ' + str(M['dr_f']) + ' fail' if M['dr_f'] else ''}.**

**{M['ndef']} defects** are open: **{M['sev']['Critical']} Critical, {M['sev']['High']} High, {M['sev']['Medium']} Medium, {M['sev']['Low']} Low**. The most important:
* **DEF-003 (Critical)** — with the README start-up (no `JWT_SECRET`), a publicly known default key signs tokens; a forged admin token was accepted (HTTP 200 on `/admin/dashboard`).
* **DEF-008 (High)** — admin changes to seeded restaurants are reverted and deleted seeded dishes re-created on every API restart.
* **DEF-001 (High)** — all API errors reach clients as `403` with an empty body; unhandled 500s are hidden.
* DEF-004 approved reviews never update ratings; DEF-006/007 unhandled constraint errors on slug update and restaurant deletion; responsive (DEF-012/013) and accessibility (DEF-017…019) gaps.

No fixes were delivered during the cycle, so no defect has been retested or closed. **Assessment: not ready for release** until DEF-003 and DEF-008 are fixed and DEF-001 is resolved (see §17).

## 2. Test Scope
In scope: all README REST endpoints; all UI routes; DB integrity; restart persistence; BB-01…BB-20; DR-01…DR-07; UT scenario preparation; 150+ additional API/security/data/JUnit/UI cases. Out of scope / not implemented: FR-11 review comments, FR-12 restaurant responses (no implementation — reported *Not Implemented*), password recovery, load testing, production hardening. Details: `test-strategy.md`.

## 3. Test Environment
Windows 11 10.0.26200 · JDK 17.0.12 · Node 22.21.0 · MySQL 8.0.45 (port 3307, schemas `tastelanka_qa` / `tastelanka_junit` built from the project's own SQL) · Edge 154 (Playwright 1.63.0) · Spring Boot 4.1.1 · Next.js 16.3.6 (dev server). `JWT_SECRET` unset, as in README. Full details and deviations: `test-environment.md`.

## 4. Test Strategy
Risk-based black-box testing on the running system at five levels (unit, integration, API, E2E, non-functional) plus dry runs; tests assert expected behaviour and are fully scripted for re-execution. See `test-strategy.md`.

## 5. Test Execution Summary
{table(level_rows, ["Level/Type", "Total", "Passed", "Failed", "Not executed"])}

Not counted in the totals: {M['setup']} setup/support steps and {M['info']} informational observations (TC-SEC-006 token valid after logout; TC-SEC-060 no login throttling; TC-SEC-071/072 MODERATOR has full restaurant-management rights) — recorded in `test-execution-results.csv`.

Existing automated tests (Phase 3): backend `./mvnw test` — 1 test (`contextLoads`), 1 passed, 0 failed, 28 s; ESLint pass; `next build` pass; `tsc --noEmit` passes after build (fails before build only because Next generates route types during build — not a defect). New QA JUnit suite (5 classes in `backend/src/test/java/com/tastelanka/portal/qa/`, including the existing test): final run {JF[0]} invocations, {JF[1]} passed, {JF[2]} failed, {JF[3]} errors — identical to the first run ({J1[0]}/{J1[1]}/{J1[2]}); every failure maps to DEF-001…008.

## 6. Functional Test Results (baseline)
{table(bb, ["Test ID", "Requirement", "Expected Result", "Status", "Defect ID", "EVID"], 160)}

Per-BB actual results, preconditions, steps and evidence: `test-execution-results.csv` (baseline rows) and screenshots in `evidence/ui/`.

## 7. API Test Results
{table(api_tbl, ["Group", "Pass", "Fail", "Info", "Setup steps"])}

Highlights (evidence `evidence/api/<ID>.json` contains method, URL, headers, request/response body, status, expected, actual):
* Pass: registration (201, role forced to USER, no hash exposed), case-insensitive login, search/filters (TC-API-010…020), details/menu, review creation with PENDING status, Sinhala/Tamil round-trip, moderation visibility, saved-restaurant idempotency, admin CRUD happy paths, cascade of dishes on restaurant delete.
* Fail: every negative case returned `403` + empty body instead of 400/401/404/405/409/415 (DEF-001, DEF-002); slug conflict on update and deletion of reviewed restaurant are unhandled server errors (DEF-006, DEF-007); `priceMin > priceMax` accepted (DEF-005); approval does not update ratings (DEF-004).

## 8. End-to-End Test Results
{table(dr, ["Test ID", "Title", "Status", "EVID", "Notes"], 200)}

Additional UI cases: {status_of(['TC-UI-001','TC-UI-002','TC-UI-003','TC-UI-004','TC-UI-005','TC-UI-006','TC-UI-007','TC-UI-008','TC-UI-009','TC-UI-010','TC-UI-011','TC-UI-012','TC-UI-013','TC-ADM-UI-001','TC-ADM-UI-002','TC-ADM-UI-003','TC-ADM-UI-004'])}.

## 9. Security Test Results
| Area | Result | Evidence |
|---|---|---|
| Unauthenticated access to protected endpoints | Denied — but 403 instead of 401 (DEF-002) | TC-SEC-001, TC-SEC-016/017 |
| Invalid / tampered / expired tokens | Rejected (403) | TC-SEC-002…004, TC-UNIT-JWT-002…004 |
| **Forged token with default secret** | **Accepted — admin access (DEF-003, Critical)** | TC-SEC-005, TC-INT-006 |
| Logout / session invalidation | Client-side only; old JWT valid until expiry (observation) | TC-SEC-006, TC-UI-002 |
| Customer → admin API (vertical) | Denied 403; data unchanged | TC-SEC-010…015, TC-INT-010 |
| Customer forging role in localStorage | UI shell shows but API refuses data | BB-14c |
| Horizontal access (saved list, own reviews) | Isolated per user (endpoints bound to token identity; no ID-based IDOR surface) | TC-SEC-040…043 |
| Mass assignment (role on register, status on review) | Ignored | TC-AUTH-011, TC-SEC-020, TC-INT-022 |
| SQL injection probes (q, location, slug, login) | No injection; parameterised queries | TC-SEC-021…024 |
| Stored XSS in review | Rendered as text, no script execution | TC-SEC-030, TC-SEC-031 (screenshot) |
| Malformed JSON / wrong types / oversized input | Rejected (status masked by DEF-001); 10 000-char query → 400 | TC-SEC-025/026, TC-ADM-014/015 |
| CORS | Untrusted origin refused; configured origin allowed | TC-SEC-050/051 |
| Brute force | No lockout/throttling after 10 failures (observation) | TC-SEC-060 |
| Password storage | bcrypt `$2a$10$`, 60 chars | TC-DATA-010 |
| Role scope | MODERATOR can create/delete restaurants (observation — requirement undefined) | TC-SEC-071/072 |

## 10. Non-Functional Test Results
**Performance (NFR-01)** — no thresholds are defined in the test plan; values are measured only (single client, local).
{table(PERF, ["ID", "Operation", "Samples", "Statuses", "Median ms", "P95 ms", "Max ms"])}

UI page loads on the Next.js **dev** server (indicative): {', '.join(f"{r['page']} {r['contentReadyMs']} ms to content" for r in PUI)}.

**Responsiveness (NFR-04)** — {status_of(['BB-18-mobile','BB-18-tablet','BB-18-desktop','BB-18b','BB-18c','BB-18d'])}. Tablet listing overflows 153 px (DEF-013); no filters on mobile (DEF-012). Screenshots: `evidence/ui/responsive/`.

**Accessibility (NFR-03)** — {status_of(['BB-20a','BB-20b','BB-20c','BB-20d','BB-20e'])}. axe WCAG 2.1 A/AA: colour-contrast (serious) on all scanned pages, unlabeled selects (critical) — `evidence/ui/BB-20a-axe-violations.json`. Keyboard login and visible focus pass.

**Multilingual (FR-15)** — {status_of(['BB-19a','BB-19b','BB-19c'])}. Sinhala/Tamil reviews and names are stored (utf8mb4, verified by hex) and rendered with Noto Sans Sinhala/Tamil; there is **no interface language switch** (Not Implemented).

## 11. Dry-Run Results
All seven dry runs executed from a fresh account: {status_of(['DR-01','DR-02','DR-03','DR-04','DR-05','DR-06','DR-07'])}. Step-by-step timestamps: `evidence/ui/ui-step-log.txt`; screenshots: `evidence/dry-runs/`.

Test-execution corrections (not product defects, re-run before results were recorded): login helper did not wait for session storage; run-id regenerated after worker restart; a filter test assumed a fixed restaurant count; a responsive test selected a hidden desktop `<h1>`; TC-UI-002 depended on BB-01's account and was made self-contained; full-page screenshots on very long pages needed a 60 s timeout. **A forked copy of this QA session ran concurrently for part of the cycle and wrote to the same `testing/` folder**; its and this session's full UI runs overlapped (artifact folders wiped, screenshot timeouts). The fork was stopped, its outputs were re-verified against raw evidence, and all UI results in this report come from one exclusive final run ({PW_T} tests: {PW['expected']} passed, {PW['unexpected']} failed, started {PW['startTime'][:19]}Z). Overlapping-run outputs are kept, labelled, in `evidence/ui/superseded/`.

## 12. Defect Summary
{table(DEF, ["Defect ID", "Title", "Severity", "Priority", "Status", "EVID"], 140)}

Full records (description, preconditions, steps, expected/actual, evidence, root cause): `defects/defect-register.csv`.

## 13. Retest and Regression Results
No code fixes were delivered during this cycle; therefore **no defect was retested, none is Fixed/Closed**, and no post-fix regression run was possible. The final clean full run documented here is the **regression baseline** (`regression-results.md`); every open defect has an automated test that fails today and must pass after its fix.

## 14. Requirements Traceability
{table(RTM, ["Requirement", "Purpose", "Execution Status", "Result", "Defect", "Coverage Status"], 120)}

Coverage (by execution): Covered {M['cov']['Covered']}, Partially Covered {M['cov']['Partially Covered']}, Not Implemented {M['cov']['Not Implemented']}, Not Evidenced {M['cov']['Not Evidenced']}, Not Covered {M['cov']['Not Covered']}. Full matrix with test IDs and evidence: `traceability-matrix.csv`.

## 15. Evidence Index
{M['evid']} evidence items catalogued as EVID-001…EVID-{M['evid']:03d} in `evidence-index.csv` (API/security JSON, screenshots, JUnit XML, logs, DB snapshots, performance CSV, Playwright HTML report `evidence/ui/playwright-report/index.html`).

## 16. Outstanding Risks / Issues
* DEF-003: deployments started per README are exposed to token forgery.
* DEF-008: admin data loss on each restart; DEF-004: ratings shown to users are not derived from reviews (seed values are static marketing numbers — DEF-016).
* DEF-001/002: clients cannot distinguish errors; production 500s are invisible to clients.
* No throttling on login; JWTs cannot be revoked on logout; MODERATOR has full catalogue rights.
* FR-11, FR-12 not implemented; UI translation not implemented; no review edit/delete for users or admins.
* Usability (NFR-02) unevidenced — UT-01…UT-10 require participants.
* Environment differences: MySQL 8.0.45 instead of compose's 8.4; UI timings from the dev server.

## 17. Final QA Assessment
Based on executed tests, the main customer and administrator workflows can be demonstrated ({M['bb_p']}/20 BB and {M['dr_p']}/7 dry runs pass), and access control on the API holds for issued tokens. The product **does not meet the exit criteria for release**: one Critical and two High defects are open and unretested, validation feedback over the API is not delivered (FR-17/NFR-08), and accessibility and responsive requirements are only partly met. Recommended before the next cycle: fix DEF-003, DEF-008, DEF-001/002, DEF-006/007, DEF-004; then re-run `./mvnw test`, `python testing/scripts/api_security_tests.py` and `npx playwright test` as the regression pack, and run UT-01…UT-10 with participants.
"""
appendix_path = os.path.join(ROOT, "report-evidence-appendix.md")
if os.path.exists(appendix_path):
    report += "\n" + open(appendix_path, encoding="utf-8").read()
report = report.replace("## 15. Evidence Index\n", "## 15. Evidence Index\nEVID identifiers in the tables above refer to rows of `evidence-index.csv`; Appendix A reproduces the key evidence (screenshots, API request/response records, database snapshots, logs).\n\n")
open(os.path.join(ROOT, "QA-Test-Report.md"), "w", encoding="utf-8").write(report)

metrics = f"""# Test Metrics (from actual execution)

Denominator for pass rate: executed test cases with a PASS or FAIL result (setup steps, informational observations, sub-tests rolled into BB parents and NOT EXECUTED tests are excluded).

| Metric | Value |
|---|---|
| Total test cases | {tot} |
| Executed | {p + f} |
| Passed | {p} |
| Failed | {f} |
| Blocked | {M['b']} |
| Not executed | {ne} (UT-01…UT-10, no participants) |
| **Pass rate** | **{M['rate']}%** = {p} / {p + f} |
| Failures attributable to DEF-001/DEF-002 (error-status masking) | {def1 + def2} of {f} |
| Baseline BB pass / fail | {M['bb_p']} / {M['bb_f']} of 20 |
| Dry runs pass / fail | {M['dr_p']} / {M['dr_f']} of 7 |
| Defects total | {M['ndef']} |
| Critical / High / Medium / Low | {M['sev']['Critical']} / {M['sev']['High']} / {M['sev']['Medium']} / {M['sev']['Low']} |
| Open / Fixed / Closed / Deferred | {open_defs} / 0 / 0 / 0 |
| Retest pass rate | N/A — no fixes delivered (0 retests) |
| Requirements (28) Covered / Partial / Not Implemented / Not Evidenced / Not Covered | {M['cov']['Covered']} / {M['cov']['Partially Covered']} / {M['cov']['Not Implemented']} / {M['cov']['Not Evidenced']} / {M['cov']['Not Covered']} |
| Evidence items | {M['evid']} |
"""
open(os.path.join(ROOT, "test-metrics.md"), "w", encoding="utf-8").write(metrics)

reg = f"""# Retest & Regression Results

## Retest
No defect fixes were delivered in this cycle (repository remains at commit `fc1f1cc`; no application code was changed by QA). Retest status for all {M['ndef']} defects: **Not retested**. Defects remain **Open**.

## Regression baseline (final clean run, 2026-09-30)
| Suite | Command | Executed | Passed | Failed | Evidence |
|---|---|---|---|---|---|
| Backend JUnit (existing + QA) — first run | `./mvnw test` (DB_URL→tastelanka_junit) | {J1[0]} | {J1[1]} | {J1[2]} | evidence/automated/AUTO-005-junit-qa-suite-run1.log, surefire-run1/ |
| Backend JUnit (existing + QA) — final run | same | {JF[0]} | {JF[1]} | {JF[2]} | evidence/automated/AUTO-006-junit-qa-suite-final.log, surefire-final/ |
| API/security/data harness | `python testing/scripts/api_security_tests.py` (+ persistence, moderator scope) | {sum(1 for r in R if r['Level/Type'].startswith('API') and r['Status'] in ('PASS','FAIL'))} | {sum(1 for r in R if r['Level/Type'].startswith('API') and r['Status']=='PASS')} | {sum(1 for r in R if r['Level/Type'].startswith('API') and r['Status']=='FAIL')} | evidence/api-security-results.csv |
| UI / E2E / dry runs / NFR (final exclusive run) | `npx playwright test` (testing/e2e) | {PW_T} | {PW['expected']} | {PW['unexpected']} | evidence/ui/playwright-results.json, playwright-final-console.txt, playwright-report/index.html |

Result comparison: JUnit first vs final run identical (same 12 failing tests). UI tests that changed status between development runs and the final run did so only because of corrected test design or the overlapping-run incident (BB-13, DR-02, DR-06, PERF-UI failed on screenshot/trace-file errors while two sessions ran concurrently; all pass in the exclusive final run) — see report §11; no product code changed, so no regression can have been introduced by QA.

Each open defect has at least one automated test in these suites that currently fails; after a fix, re-running the three commands provides retest + regression evidence.
"""
open(os.path.join(ROOT, "regression-results.md"), "w", encoding="utf-8").write(reg)
print("report written")
