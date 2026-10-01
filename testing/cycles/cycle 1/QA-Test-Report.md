# QA Test Report — TasteLanka Restaurant Review Portal

| |                                                                                                 |
|---|-------------------------------------------------------------------------------------------------|
| Product / version | TasteLanka Restaurant Review Portal — commit `fc1f1cc` (backend 0.0.1-SNAPSHOT, frontend 0.1.0) |
| Test cycle | 2026-09-30 (single cycle)                                                                       |
| Baseline | *Test Plan – Restaurant Review Portal* (BB-01…BB-20, DR-01…DR-07, UT-01…UT-10)                  |
| Prepared by | QA Manuja Rajakaruna — all results from actual execution; evidence under `testing/evidence/`    |

## 1. Executive Summary
The application was built, started and tested end-to-end (API, UI in Microsoft Edge, database, JUnit). **257 test cases** were counted: **155 passed, 92 failed, 10 not executed** (usability sessions without participants). Pass rate = passed ÷ (passed + failed) = **62.8%** — note that **67 of the 92 failures stem from two API error-handling defects (DEF-001, DEF-002)** that mask every error status as HTTP 403 — the invalid requests are still rejected (the backend log shows the correct exception being raised), but clients receive no usable status or message.

Core journeys work: registration, login/logout, browsing, search, location/dietary filters, restaurant and dish details, review submission with moderation, saved restaurants, admin CRUD for restaurants and dishes, role enforcement on the API, persistence of new data, Sinhala/Tamil content. Baseline: **16/20 BB tests pass, 4 fail; 7/7 dry runs pass.**

**20 defects** are open: **1 Critical, 2 High, 13 Medium, 4 Low**. The most important:
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
| Level/Type | Total | Passed | Failed | Not executed |
|---|---|---|---|---|
| API/Security/Data (system) | 152 | 82 | 70 | 0 |
| JUnit integration | 24 | 13 | 11 | 0 |
| JUnit unit | 22 | 21 | 1 | 0 |
| Baseline black-box (UI/E2E) | 20 | 16 | 4 | 0 |
| Dry run (E2E) | 7 | 7 | 0 | 0 |
| Performance (UI) | 1 | 1 | 0 | 0 |
| UI/E2E | 18 | 12 | 6 | 0 |
| Existing automated/static | 3 | 3 | 0 | 0 |
| Usability (participant) | 10 | 0 | 0 | 10 |

Not counted in the totals: 16 setup/support steps and 4 informational observations (TC-SEC-006 token valid after logout; TC-SEC-060 no login throttling; TC-SEC-071/072 MODERATOR has full restaurant-management rights) — recorded in `test-execution-results.csv`.

Existing automated tests (Phase 3): backend `./mvnw test` — 1 test (`contextLoads`), 1 passed, 0 failed, 28 s; ESLint pass; `next build` pass; `tsc --noEmit` passes after build (fails before build only because Next generates route types during build — not a defect). New QA JUnit suite (5 classes in `backend/src/test/java/com/tastelanka/portal/qa/`, including the existing test): final run 69 invocations, 57 passed, 12 failed, 0 errors — identical to the first run (69/57/12); every failure maps to DEF-001…008.

## 6. Functional Test Results (baseline)
| Test ID | Requirement | Expected Result | Status | Defect ID | EVID |
|---|---|---|---|---|---|
| BB-01 | FR-06 | Account created; next-step feedback shown | PASS |  | EVID-239 |
| BB-02 | FR-06, FR-17 | Rejected with meaningful feedback | PASS |  | EVID-240, EVID-241, EVID-242 |
| BB-03 | FR-07 | Authenticated; protected functions accessible | PASS |  | EVID-243 |
| BB-04 | FR-07 | Rejected with error message | PASS |  | EVID-244 |
| BB-05 | FR-08 | Profile information displayed | PASS |  | EVID-245 |
| BB-06 | FR-01 | Restaurants displayed | PASS |  | EVID-246 |
| BB-07 | FR-04 | Matching restaurants returned | PASS |  | EVID-247 |
| BB-08 | FR-05 | Results reflect selected criteria (incl. price) | FAIL | DEF-009; DEF-010; DEF-011 | EVID-248, EVID-249, EVID-250, EVID-342 |
| BB-09 | FR-02, FR-03 | Restaurant and menu/dish info displayed | PASS |  | EVID-342 |
| BB-10 | FR-09 | Accepted and stored for moderation | PASS |  | EVID-253 |
| BB-11 | FR-09, FR-17 | Rejected with validation feedback | PASS |  | EVID-254, EVID-342 |
| BB-12 | FR-10 | Own reviews displayed with status | PASS |  | EVID-255 |
| BB-13 | FR-14 | Status updated; visibility follows status | PASS |  | EVID-342 |
| BB-14 | FR-16 | Access denied | PASS |  | EVID-197, EVID-342, EVID-198 |
| BB-15 | FR-13 | Operations completed and reflected | PASS |  | EVID-342 |
| BB-16 | FR-13 | Operations completed and reflected | PASS |  | EVID-342 |
| BB-17 | FR-18 | Persisted data retrieved consistently | FAIL | DEF-008 | EVID-154, EVID-167, EVID-166 |
| BB-18 | NFR-04 | Core functions usable without loss of content | FAIL | DEF-012; DEF-013 | EVID-305, EVID-306, EVID-307, EVID-308 … |
| BB-19 | FR-15 | Translated content displayed consistently | PASS (partial – UI translation not implemented) |  | EVID-266, EVID-267, EVID-342 |
| BB-20 | NFR-03 | Core interface elements accessible | FAIL | DEF-017; DEF-018; DEF-019 | EVID-342, EVID-269 |

Per-BB actual results, preconditions, steps and evidence: `test-execution-results.csv` (baseline rows) and screenshots in `evidence/ui/`.

## 7. API Test Results
| Group | Pass | Fail | Info | Setup steps |
|---|---|---|---|---|
| TC-ADM | 11 | 23 | 0 | 3 |
| TC-API | 16 | 5 | 0 | 0 |
| TC-AUTH | 10 | 10 | 0 | 0 |
| TC-DATA | 5 | 2 | 0 | 6 |
| TC-DATA-post | 0 | 0 | 0 | 2 |
| TC-DATA-pre | 0 | 0 | 0 | 2 |
| TC-MOD | 9 | 5 | 0 | 2 |
| TC-REV | 7 | 13 | 0 | 0 |
| TC-SAV | 5 | 2 | 0 | 0 |
| TC-SEC | 19 | 10 | 4 | 1 |

Highlights (evidence `evidence/api/<ID>.json` contains method, URL, headers, request/response body, status, expected, actual):
* Pass: registration (201, role forced to USER, no hash exposed), case-insensitive login, search/filters (TC-API-010…020), details/menu, review creation with PENDING status, Sinhala/Tamil round-trip, moderation visibility, saved-restaurant idempotency, admin CRUD happy paths, cascade of dishes on restaurant delete.
* Fail: every negative case returned `403` + empty body instead of 400/401/404/405/409/415 (DEF-001, DEF-002); slug conflict on update and deletion of reviewed restaurant are unhandled server errors (DEF-006, DEF-007); `priceMin > priceMax` accepted (DEF-005); approval does not update ratings (DEF-004).

## 8. End-to-End Test Results
| Test ID | Title | Status | EVID | Notes |
|---|---|---|---|---|
| DR-01 | Register → Login → Browse → Search/filter → View restaurant | PASS | EVID-175, EVID-176, EVID-342 |  |
| DR-02 | Login → Select restaurant → Submit review → Admin moderates | PASS | EVID-177, EVID-178, EVID-179, EVID-342 |  DR-02: approval did not change restaurant aggregate rating (DEF-004); journey not blocked |
| DR-03 | Login → Save → Profile → View saved → Remove | PASS | EVID-180, EVID-181, EVID-342 |  |
| DR-04 | Admin login → Dashboard → Create/update/delete restaurant | PASS | EVID-182, EVID-183, EVID-342 |  |
| DR-05 | Admin login → Manage dishes → Create/update/delete dish | PASS | EVID-184, EVID-342 |  |
| DR-06 | Admin login → Pending → Approve/reject → visibility | PASS | EVID-185, EVID-186, EVID-342 |  |
| DR-07 | EN/SI/TA content journey | PASS | EVID-187, EVID-188, EVID-342 | UI chrome remains English (no UI translation) |

Additional UI cases: TC-UI-001: PASS, TC-UI-002: PASS, TC-UI-003: PASS, TC-UI-004: PASS, TC-UI-005: PASS, TC-UI-006: FAIL, TC-UI-007: PASS, TC-UI-008: FAIL, TC-UI-009: PASS, TC-UI-010: PASS, TC-UI-011: FAIL, TC-UI-012: PASS, TC-UI-013: FAIL, TC-ADM-UI-001: PASS, TC-ADM-UI-002: FAIL, TC-ADM-UI-003: PASS, TC-ADM-UI-004: FAIL.

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
| ID | Operation | Samples | Statuses | Median ms | P95 ms | Max ms |
|---|---|---|---|---|---|---|
| PERF-001 | Restaurant listing | 50 | 200 | 10.8 | 13.2 | 14.4 |
| PERF-002 | Search q=crab | 50 | 200 | 9.6 | 10.8 | 10.9 |
| PERF-003 | Filter location=Kandy&vegan=true | 50 | 200 | 8.7 | 9.7 | 10.2 |
| PERF-004 | Top-rated | 50 | 200 | 8.6 | 10.0 | 11.2 |
| PERF-005 | Restaurant details | 50 | 200 | 8.1 | 10.3 | 12.2 |
| PERF-006 | Restaurant menu (dishes) | 50 | 200 | 9.5 | 11.3 | 13.9 |
| PERF-007 | Public approved reviews | 50 | 200 | 10.3 | 11.9 | 14.0 |
| PERF-008 | Own reviews (auth) | 50 | 200 | 12.0 | 13.6 | 16.8 |
| PERF-009 | Profile (auth) | 50 | 200 | 8.9 | 10.5 | 11.2 |
| PERF-010 | Login (bcrypt) | 50 | 200 | 96.6 | 99.4 | 103.7 |
| PERF-011 | Submit review (auth, write) | 10 | 201 | 15.9 | 22.0 | 32.9 |

UI page loads on the Next.js **dev** server (indicative): home 1539 ms to content, restaurants 1806 ms to content, restaurant-details 1509 ms to content, search 1573 ms to content.

**Responsiveness (NFR-04)** — BB-18-mobile: PASS, BB-18-tablet: FAIL, BB-18-desktop: PASS, BB-18b: PASS, BB-18c: FAIL, BB-18d: PASS. Tablet listing overflows 153 px (DEF-013); no filters on mobile (DEF-012). Screenshots: `evidence/ui/responsive/`.

**Accessibility (NFR-03)** — BB-20a: FAIL, BB-20b: PASS, BB-20c: PASS, BB-20d: FAIL, BB-20e: FAIL. axe WCAG 2.1 A/AA: colour-contrast (serious) on all scanned pages, unlabeled selects (critical) — `evidence/ui/BB-20a-axe-violations.json`. Keyboard login and visible focus pass.

**Multilingual (FR-15)** — BB-19a: PASS, BB-19b: PASS, BB-19c: FAIL. Sinhala/Tamil reviews and names are stored (utf8mb4, verified by hex) and rendered with Noto Sans Sinhala/Tamil; there is **no interface language switch** (Not Implemented).

## 11. Dry-Run Results
All seven dry runs executed from a fresh account: DR-01: PASS, DR-02: PASS, DR-03: PASS, DR-04: PASS, DR-05: PASS, DR-06: PASS, DR-07: PASS. Step-by-step timestamps: `evidence/ui/ui-step-log.txt`; screenshots: `evidence/dry-runs/`.

Test-execution corrections (not product defects, re-run before results were recorded): login helper did not wait for session storage; run-id regenerated after worker restart; a filter test assumed a fixed restaurant count; a responsive test selected a hidden desktop `<h1>`; TC-UI-002 depended on BB-01's account and was made self-contained; full-page screenshots on very long pages needed a 60 s timeout. **A forked copy of this QA session ran concurrently for part of the cycle and wrote to the same `testing/` folder**; its and this session's full UI runs overlapped (artifact folders wiped, screenshot timeouts). The fork was stopped, its outputs were re-verified against raw evidence, and all UI results in this report come from one exclusive final run (64 tests: 49 passed, 15 failed, started 2026-09-30T14:49:45Z). Overlapping-run outputs are kept, labelled, in `evidence/ui/superseded/`.

## 12. Defect Summary
| Defect ID | Title | Severity | Priority | Status | EVID |
|---|---|---|---|---|---|
| DEF-001 | API returns HTTP 403 with empty body instead of the real error status (400/401/404/405/409/415/500) | High | High | Open | EVID-062, EVID-072, EVID-054, EVID-005, EVID-137 … |
| DEF-002 | Unauthenticated requests to protected endpoints return 403 instead of 401 | Medium | Medium | Open | EVID-203, EVID-206, EVID-135 |
| DEF-003 | Default JWT signing secret committed in application.yml allows forging admin tokens | Critical | High | Open | EVID-207, EVID-135 |
| DEF-004 | Approved reviews never update restaurant/dish rating or review count | Medium | Medium | Open | EVID-090, EVID-091, EVID-342 |
| DEF-005 | Restaurant accepted with minimum price greater than maximum price | Low | Medium | Open | EVID-009, EVID-165, EVID-321 |
| DEF-006 | Updating a restaurant or dish to an existing slug causes an unhandled server exception | Medium | Medium | Open | EVID-013, EVID-026, EVID-189, EVID-135 |
| DEF-007 | Restaurants that have reviews cannot be deleted; UI instructs an impossible action | Medium | Medium | Open | EVID-036, EVID-271, EVID-189 |
| DEF-008 | Admin edits to seeded data are overwritten, and deleted seeded dishes are re-created, on every API restart | High | High | Open | EVID-154, EVID-157, EVID-167, EVID-166 |
| DEF-009 | Cuisine category links do not filter the restaurant list | Medium | Medium | Open | EVID-250, EVID-342 |
| DEF-010 | Price and spice-level filters are not available; home page filter chips and location selector do nothing | Medium | Medium | Open | EVID-342, EVID-282 |
| DEF-011 | 'Clear all' unticks filters but results stay filtered until 'Apply Filters' is pressed | Low | Low | Open | EVID-249, EVID-342 |
| DEF-012 | No search filters available on mobile | Medium | Medium | Open | EVID-323 |
| DEF-013 | Restaurant listing overflows horizontally and collapses at tablet width (768 px) | Medium | Medium | Open | EVID-321, EVID-342 |
| DEF-014 | 'Write a Review' from the home page is a dead end (no restaurant can be selected) | Medium | Medium | Open | EVID-277 |
| DEF-015 | Restaurant page shows 'Save' for a restaurant the user has already saved | Low | Low | Open | EVID-281, EVID-342 |
| DEF-016 | Home page 'Top Rated' cards and cuisine counts are hard-coded and disagree with live data | Low | Low | Open | EVID-342, EVID-273 |
| DEF-017 | Insufficient colour contrast of brand-orange text (WCAG 1.4.3) | Medium | Medium | Open | EVID-268 |
| DEF-018 | Search input and select boxes on /restaurants have no accessible label | Medium | Medium | Open | EVID-268, EVID-342 |
| DEF-019 | Rating star buttons are announced only as '★' with no value or selected state | Medium | Medium | Open | EVID-342 |
| DEF-020 | Moderation actions are not traceable (no moderator, timestamp or reason captured) | Medium | Medium | Open | EVID-165, EVID-342 |

Full records (description, preconditions, steps, expected/actual, evidence, root cause): `defects/defect-register.csv`.

## 13. Retest and Regression Results
No code fixes were delivered during this cycle; therefore **no defect was retested, none is Fixed/Closed**, and no post-fix regression run was possible. The final clean full run documented here is the **regression baseline** (`regression-results.md`); every open defect has an automated test that fails today and must pass after its fix.

## 14. Requirements Traceability
| Requirement | Purpose | Execution Status | Result | Defect | Coverage Status |
|---|---|---|---|---|---|
| FR-01 | Restaurant browsing | 5/5 executed | FAIL | DEF-016 | Covered |
| FR-02 | Restaurant details | 4/4 executed | FAIL | — | Covered |
| FR-03 | Menu/dish information | 4/4 executed | FAIL | — | Covered |
| FR-04 | Restaurant search | 7/7 executed | PASS | — | Covered |
| FR-05 | Restaurant filtering | 8/8 executed | FAIL | DEF-009; DEF-010; DEF-011; DEF-012 | Partially Covered |
| FR-06 | User registration | 10/10 executed | FAIL | DEF-001 | Covered |
| FR-07 | User authentication | 7/7 executed | FAIL | DEF-001 | Covered |
| FR-08 | User profile | 5/5 executed | FAIL | DEF-015 | Covered |
| FR-09 | Ratings and reviews | 9/9 executed | FAIL | DEF-004; DEF-014; DEF-019 | Covered |
| FR-10 | Own review management/viewing | 3/3 executed | PASS | — | Partially Covered |
| FR-11 | Review comments | Not executed | — | — | Not Implemented |
| FR-12 | Restaurant responses | Not executed | — | — | Not Implemented |
| FR-13 | Restaurant/menu management | 12/12 executed | FAIL | DEF-005; DEF-006; DEF-007; DEF-008 | Covered |
| FR-14 | Review moderation | 6/6 executed | FAIL | DEF-004; DEF-020 | Covered |
| FR-15 | Multilingual content | 6/6 executed | PASS | — | Partially Covered |
| FR-16 | Role-based access | 8/8 executed | PASS | DEF-003 | Covered |
| FR-17 | Validation/error handling | 7/7 executed | FAIL | DEF-001; DEF-005; DEF-014 | Covered |
| FR-18 | Data persistence | 7/7 executed | FAIL | DEF-008 | Covered |
| NFR-01 | Performance of common actions | Executed (PERF-001..011, PERF-UI) | MEASURED | — | Partially Covered |
| NFR-02 | Usability | 0/10 executed | NOT EXECUTED | DEF-011; DEF-014; DEF-015 | Not Evidenced |
| NFR-03 | Accessibility | 1/1 executed | FAIL | DEF-017; DEF-018; DEF-019 | Covered |
| NFR-04 | Responsiveness | 1/1 executed | FAIL | DEF-012; DEF-013 | Covered |
| NFR-05 | Security/access control | 10/10 executed | FAIL | DEF-002; DEF-003 | Covered |
| NFR-06 | Privacy/data handling | 6/6 executed | PASS | — | Covered |
| NFR-07 | Data integrity | 5/5 executed | FAIL | DEF-004; DEF-005; DEF-008; DEF-016 | Covered |
| NFR-08 | Error handling/reliability | 6/6 executed | FAIL | DEF-001; DEF-002; DEF-006; DEF-007 | Covered |
| NFR-12 | Testability | Assessed | PARTIAL | — | Partially Covered |
| NFR-13 | Administrative/moderation traceability | 3/3 executed | FAIL | DEF-020 | Covered |

Coverage (by execution): Covered 20, Partially Covered 5, Not Implemented 2, Not Evidenced 1, Not Covered 0. Full matrix with test IDs and evidence: `traceability-matrix.csv`.

## 15. Evidence Index
EVID identifiers in the tables above refer to rows of `evidence-index.csv`; Appendix A reproduces the key evidence (screenshots, API request/response records, database snapshots, logs).

342 evidence items catalogued as EVID-001…EVID-342 in `evidence-index.csv` (API/security JSON, screenshots, JUnit XML, logs, DB snapshots, performance CSV, Playwright HTML report `evidence/ui/playwright-report/index.html`).

## 16. Outstanding Risks / Issues
* DEF-003: deployments started per README are exposed to token forgery.
* DEF-008: admin data loss on each restart; DEF-004: ratings shown to users are not derived from reviews (seed values are static marketing numbers — DEF-016).
* DEF-001/002: clients cannot distinguish errors; production 500s are invisible to clients.
* No throttling on login; JWTs cannot be revoked on logout; MODERATOR has full catalogue rights.
* FR-11, FR-12 not implemented; UI translation not implemented; no review edit/delete for users or admins.
* Usability (NFR-02) unevidenced — UT-01…UT-10 require participants.
* Environment differences: MySQL 8.0.45 instead of compose's 8.4; UI timings from the dev server.

## 17. Final QA Assessment
Based on executed tests, the main customer and administrator workflows can be demonstrated (16/20 BB and 7/7 dry runs pass), and access control on the API holds for issued tokens. The product **does not meet the exit criteria for release**: one Critical and two High defects are open and unretested, validation feedback over the API is not delivered (FR-17/NFR-08), and accessibility and responsive requirements are only partly met. Recommended before the next cycle: fix DEF-003, DEF-008, DEF-001/002, DEF-006/007, DEF-004; then re-run `./mvnw test`, `python testing/scripts/api_security_tests.py` and `npx playwright test` as the regression pack, and run UT-01…UT-10 with participants.

## Appendix A — Evidence
All items below are reproduced from the evidence files catalogued in `evidence-index.csv`. Screenshots come from the final exclusive Playwright run (Microsoft Edge 154, 1440×900 unless stated); they are downscaled copies, and very tall pages are cropped to their top portion. API excerpts are the recorded request/response of the executed test (passwords and tokens redacted at capture time).

### A.1 Baseline black-box tests (BB)

![EVID-239 · BB-01 PASS · new account lands on profile showing name and e-mail — source: evidence/ui/BB-01-registration-success-profile.png](report-figures/BB-01-registration-success-profile.jpg)

![EVID-240 · BB-02 PASS · mismatched passwords rejected with message — source: evidence/ui/BB-02a-registration-password-mismatch.png](report-figures/BB-02a-registration-password-mismatch.jpg)

![EVID-241 · BB-02 PASS · duplicate e-mail rejected with message — source: evidence/ui/BB-02b-registration-duplicate-email.png](report-figures/BB-02b-registration-duplicate-email.jpg)

![EVID-244 · BB-04 PASS · wrong password rejected: 'Invalid email or password.' — source: evidence/ui/BB-04-login-invalid-password.png](report-figures/BB-04-login-invalid-password.jpg)

![EVID-245 · BB-03/BB-05 PASS · authenticated profile with reviews and saved sections — source: evidence/ui/BB-05-profile.png](report-figures/BB-05-profile.jpg)

![EVID-247 · BB-07 PASS · search 'crab' returns 1 matching restaurant — source: evidence/ui/BB-07-search-crab.png](report-figures/BB-07-search-crab.jpg)

![EVID-248 · BB-08a PASS · Kandy + Vegan filter returns 2 restaurants — source: evidence/ui/BB-08a-filter-kandy-vegan.png](report-figures/BB-08a-filter-kandy-vegan.jpg)

![EVID-250 · BB-08c FAIL (DEF-009) · cuisine=Seafood link still lists all restaurants (top of full-page screenshot shown) — source: evidence/ui/BB-08c-cuisine-link-seafood.png](report-figures/BB-08c-cuisine-link-seafood.jpg)

![EVID-251 · BB-09 PASS · restaurant details and menu (top of full-page screenshot shown) — source: evidence/ui/BB-09a-restaurant-details-menu.png](report-figures/BB-09a-restaurant-details-menu.jpg)

![EVID-252 · BB-09 PASS · dish details: price LKR 9,500, spice Hot — source: evidence/ui/BB-09b-dish-details.png](report-figures/BB-09b-dish-details.jpg)

![EVID-253 · BB-10 PASS · review accepted, pending moderation — source: evidence/ui/BB-10-review-submitted.png](report-figures/BB-10-review-submitted.jpg)

![EVID-254 · BB-11 PASS · review text under 10 characters blocked — source: evidence/ui/BB-11a-review-too-short.png](report-figures/BB-11a-review-too-short.jpg)

![EVID-255 · BB-12 PASS · own review listed with PENDING status — source: evidence/ui/BB-12-own-reviews-pending.png](report-figures/BB-12-own-reviews-pending.jpg)

![EVID-257 · BB-13 PASS · approved review moves to APPROVED tab (top of full-page screenshot shown) — source: evidence/ui/BB-13b-moderation-approved-tab.png](report-figures/BB-13b-moderation-approved-tab.jpg)

![EVID-258 · BB-13 PASS · public page shows the approved review only (top of full-page screenshot shown) — source: evidence/ui/BB-13c-public-page-shows-only-approved.png](report-figures/BB-13c-public-page-shows-only-approved.jpg)

![EVID-197 · BB-14 PASS · customer redirected away from /admin — source: evidence/security/BB-14a-customer-denied-admin-ui.png](report-figures/BB-14a-customer-denied-admin-ui.jpg)

![EVID-198 · BB-14 PASS · role forged in browser storage: API refuses admin data — source: evidence/security/BB-14c-forged-client-role-no-data.png](report-figures/BB-14c-forged-client-role-no-data.jpg)

![EVID-260 · BB-15 PASS · admin created restaurant listed — source: evidence/ui/BB-15a-restaurant-created.png](report-figures/BB-15a-restaurant-created.jpg)

![EVID-261 · BB-15 PASS · admin update (rename, Galle) reflected — source: evidence/ui/BB-15b-restaurant-updated.png](report-figures/BB-15b-restaurant-updated.jpg)

![EVID-264 · BB-16 PASS · admin-created dish appears on public menu (top of full-page screenshot shown) — source: evidence/ui/BB-16b-dish-updated-visible-on-menu.png](report-figures/BB-16b-dish-updated-visible-on-menu.jpg)

![EVID-312 · BB-18 mobile PASS · 375 px home, no horizontal overflow (top of full-page screenshot shown) — source: evidence/ui/responsive/BB-18-mobile-home.png](report-figures/BB-18-mobile-home.jpg)

![EVID-321 · BB-18 tablet FAIL (DEF-013) · 768 px listing: collapsed cards, 153 px overflow (top of full-page screenshot shown) — source: evidence/ui/responsive/BB-18-tablet-restaurants.png](report-figures/BB-18-tablet-restaurants.jpg)

![EVID-323 · BB-18c FAIL (DEF-012) · 375 px listing without any filter controls (top of full-page screenshot shown) — source: evidence/ui/responsive/BB-18c-mobile-restaurants-no-filters.png](report-figures/BB-18c-mobile-restaurants-no-filters.jpg)

![EVID-266 · BB-19a PASS · approved Sinhala and Tamil reviews rendered (top of full-page screenshot shown) — source: evidence/ui/BB-19a-sinhala-tamil-reviews.png](report-figures/BB-19a-sinhala-tamil-reviews.jpg)

![EVID-269 · BB-20c PASS · visible focus on Log In button — source: evidence/ui/BB-20c-focus-indicator-login-button.png](report-figures/BB-20c-focus-indicator-login-button.jpg)

**EVID-268 · BB-20a FAIL (DEF-017, DEF-018) — axe-core WCAG 2.1 A/AA results**

| Page | Rule | Impact | Nodes | Example element |
|---|---|---|---|---|
| home | color-contrast | serious | 12 | `.gap-\[30px\] > .text-brand.font-semibold[href="/"]` |
| restaurants | color-contrast | serious | 29 | `.gap-\[30px\] > .text-brand[href$="restaurants"]` |
| restaurants | select-name | critical | 2 | `form > select` |
| restaurant-details | color-contrast | serious | 7 | `.gap-\[30px\] > .text-brand[href$="restaurants"]` |
| dish-details | color-contrast | serious | 5 | `.gap-\[30px\] > .text-brand.font-semibold[href$="restaurants` |
| login | color-contrast | serious | 3 | `a[href$="contact"]` |
| signup | color-contrast | serious | 2 | `.mt-4` |
| review-form | color-contrast | serious | 3 | `.text-brand[href$="nuga-gama"]` |
| profile | color-contrast | serious | 1 | `.mt-9` |
| admin-dashboard | color-contrast | serious | 5 | `.rounded-xl.p-6[href$="restaurants"] > .mt-5.text-xs.text-br` |
| admin-reviews | color-contrast | serious | 1 | `.bg-brand.text-white.rounded-full` |

**EVID-167 · BB-17 / TC-DATA-002 — database BEFORE API restart (admin edit applied, seeded dish deleted)** — source: evidence/database/TC-DATA-db-snapshot-before-restart.txt

```
| snapshot_time       |
| 2026-09-30 19:10:36 |
|  4 | nuga-gama          |      3500 | QA-EDITED description 190512                  |
```

**EVID-166 · BB-17 / TC-DATA-002/003 FAIL (DEF-008) — database AFTER restart (edit reverted, dish re-created as id 10)** — source: evidence/database/TC-DATA-db-snapshot-after-restart.txt

```
| snapshot_time       |
| 2026-09-30 19:11:29 |
|  4 | nuga-gama          |      3000 | Traditional Sri Lankan dining with local cuis |
| 10 | seafood-kottu        |             1 |
```

### A.2 Dry runs (DR)

![EVID-176 · DR-01 PASS · new user reaches restaurant details after search/filter (top of full-page screenshot shown) — source: evidence/dry-runs/DR-01-step5-restaurant-details.png](report-figures/DR-01-step5-restaurant-details.jpg)

![EVID-179 · DR-02 PASS · review approved by admin is publicly visible (4 stars) (top of full-page screenshot shown) — source: evidence/dry-runs/DR-02-step6-review-public.png](report-figures/DR-02-step6-review-public.jpg)

![EVID-180 · DR-03 PASS · saved restaurant shown on profile — source: evidence/dry-runs/DR-03-step4-profile-saved.png](report-figures/DR-03-step4-profile-saved.jpg)

![EVID-183 · DR-04 PASS · admin price update visible on public page — source: evidence/dry-runs/DR-04-step4-updated-public-page.png](report-figures/DR-04-step4-updated-public-page.jpg)

![EVID-184 · DR-05 PASS · admin dish price update visible (LKR 1,250) — source: evidence/dry-runs/DR-05-step4-dish-updated.png](report-figures/DR-05-step4-dish-updated.jpg)

![EVID-186 · DR-06 PASS · author sees APPROVED and REJECTED outcomes — source: evidence/dry-runs/DR-06-step4-author-profile-statuses.png](report-figures/DR-06-step4-author-profile-statuses.jpg)

![EVID-188 · DR-07 PASS · Sinhala/Tamil content readable (top of full-page screenshot shown) — source: evidence/dry-runs/DR-07-step4-si-ta-reviews-rendered.png](report-figures/DR-07-step4-si-ta-reviews-rendered.jpg)

**EVID-342 · Dry-run step log (timestamps from the final run)** — source: evidence/ui/ui-step-log.txt

```
2026-09-30T14:54:30.141Z	DR-01	1 registered and landed on profile
2026-09-30T14:54:32.240Z	DR-01	2 logged in again
2026-09-30T14:54:32.712Z	DR-01	3 browsed listing
2026-09-30T14:54:34.194Z	DR-01	4 searched 'Sri Lankan' + Colombo filter -> Nuga Gama listed
2026-09-30T14:54:35.090Z	DR-01	5 restaurant details displayed — journey complete
2026-09-30T14:54:40.624Z	DR-02	3 review submitted (overall 4 stars) -> pending message
2026-09-30T14:54:41.258Z	DR-02	4 review not public while pending
2026-09-30T14:55:11.263Z	DR-02	5 admin approved
2026-09-30T14:55:14.683Z	DR-02	6 approved review visible publicly with 4 stars
2026-09-30T14:55:14.765Z	DR-02	7 restaurant aggregate after approval: rating=4.5 reviewCount=490 (seed values 4.5/490)
2026-09-30T14:55:18.137Z	DR-03	3 saved The Empire Cafe
2026-09-30T14:55:18.811Z	DR-03	4 profile lists saved restaurant
2026-09-30T14:55:19.262Z	DR-03	5 opened saved restaurant from profile
2026-09-30T14:55:20.887Z	DR-03	6 removed; profile shows empty state after reload
2026-09-30T14:55:22.994Z	DR-04	2 dashboard shown
2026-09-30T14:55:24.034Z	DR-04	3 created
2026-09-30T14:55:25.393Z	DR-04	4 updated; public page shows LKR 1,200–2,600
2026-09-30T14:55:26.431Z	DR-04	5 deleted; absent after reload
2026-09-30T14:55:29.791Z	DR-05	3 dish created for Green Leaf Kitchen
2026-09-30T14:55:31.252Z	DR-05	4 updated; dish page shows LKR 1,250
2026-09-30T14:55:32.543Z	DR-05	5 deleted; not on restaurant menu
2026-09-30T14:56:03.969Z	DR-06	3 approved one, rejected one
2026-09-30T14:56:08.650Z	DR-06	4 public shows approved only; author sees APPROVED/REJECTED
2026-09-30T14:56:14.523Z	DR-07	2 Sinhala full name registered and shown on profile
2026-09-30T14:56:17.026Z	DR-07	4 Sinhala and Tamil approved reviews rendered; Tamil review submitted; UI chrome remains English (no UI translation)
```

### A.3 API and security evidence

**EVID-060 · TC-AUTH-001 PASS — Register with valid data** · executed 2026-09-30T19:05:13+05:30 · verdict **PASS**

```
POST http://localhost:8080/api/v1/auth/register
Authorization: none
Request body: {"fullName": "QA User A", "email": "qa.usera.190512@tastelanka.test", "password": "<redacted test password, length 13>", "language": "en"}
→ HTTP 201 (787.1 ms)  Content-Length: 356
Response body: {"token": "<JWT, 238 chars>", "userId": 2, "fullName": "QA User A", "email": "qa.usera.190512@tastelanka.test", "role": "USER", "language": "en"}
Expected: HTTP 201; JWT returned; role USER; no password hash in response
Actual:   HTTP 201; role=USER, token issued=True, passwordHash exposed=False
```

**EVID-062 · TC-AUTH-003 FAIL (DEF-001) — Register with empty body (missing all fields)** · executed 2026-09-30T19:05:13+05:30 · verdict **FAIL**

```
POST http://localhost:8080/api/v1/auth/register
Authorization: none
Request body: {}
→ HTTP 403 (9.7 ms)  Content-Length: 0
Response body: (empty)
Expected: HTTP 400 with validation feedback
Actual:   HTTP 403
```

**EVID-072 · TC-AUTH-014 FAIL (DEF-001) — Login with incorrect password** · executed 2026-09-30T19:05:14+05:30 · verdict **FAIL**

```
POST http://localhost:8080/api/v1/auth/login
Authorization: none
Request body: {"email": "qa.usera.190512@tastelanka.test", "password": "<redacted test password, length 11>"}
→ HTTP 403 (106.4 ms)  Content-Length: 0
Response body: (empty)
Expected: HTTP 401 Unauthorized with an error message
Actual:   HTTP 403
```

**EVID-005 · TC-ADM-003 FAIL (DEF-001) — as ADMIN — Create restaurant with duplicate slug** · executed 2026-09-30T19:05:18+05:30 · verdict **FAIL**

```
POST http://localhost:8080/api/v1/admin/restaurants
Authorization: Bearer <ADMIN token>
Request body: {"slug": "qa-rest-190512", "name": "QA Test Bistro", "cuisine": "Sri Lankan · Fusion", "location": "Galle", "priceMin": 1000, "priceMax": 2500, "vegetarian": true, "vegan": false, "halal": true, "description": "Created by QA API test.", "imageColor": "#123456"}
→ HTTP 403 (34.8 ms)  Content-Length: 0
Response body: (empty)
Expected: HTTP 409
Actual:   HTTP 403
```

**EVID-203 · TC-SEC-001 FAIL (DEF-002) — Protected endpoint without token (/users/me)** · executed 2026-09-30T19:05:19+05:30 · verdict **FAIL**

```
GET http://localhost:8080/api/v1/users/me
Authorization: none
→ HTTP 403 (26.5 ms)  Content-Length: 0
Response body: (empty)
Expected: HTTP 401 Unauthorized
Actual:   HTTP 403
```

**EVID-207 · TC-SEC-005 FAIL (DEF-003, Critical) — Forged admin token signed with default JWT secret (JWT_SECRET not set, as in README run steps)** · executed 2026-09-30T19:05:19+05:30 · verdict **FAIL**

```
GET http://localhost:8080/api/v1/admin/dashboard
Authorization: Bearer <token forged offline with the default JWT secret from application.yml>
→ HTTP 200 (27.8 ms)  Content-Length: 77
Response body: {"restaurants": 7, "dishes": 4, "users": 8, "pendingReviews": 3, "approvedReviews": 4}
Expected: HTTP 401/403 – tokens not issued by the server must be rejected
Actual:   HTTP 200
```

**EVID-209 · TC-SEC-010 PASS — Customer accesses admin dashboard** · executed 2026-09-30T19:05:19+05:30 · verdict **PASS**

```
GET http://localhost:8080/api/v1/admin/dashboard
Authorization: Bearer <USER_A token>
→ HTTP 403 (30.2 ms)  Content-Length: 0
Response body: (empty)
Expected: HTTP 403
Actual:   HTTP 403
```

**EVID-217 · TC-SEC-020 PASS — Mass assignment: review submitted with status=APPROVED** · executed 2026-09-30T19:05:17+05:30 · verdict **PASS**

```
POST http://localhost:8080/api/v1/reviews
Authorization: Bearer <USER_B token>
Request body: {"restaurantSlug": "ministry-of-crab", "foodRating": 4, "serviceRating": 5, "overallRating": 4, "language": "en", "reviewText": "QA review: tasty rice and curry, friendly staff.", "status": "APPROVED", "moderatorNote": "self-approved"}
→ HTTP 201 (26.0 ms)  Content-Length: 296
Response body: {"id": 6, "author": "QA User B", "restaurantSlug": "ministry-of-crab", "restaurantName": "Ministry of Crab", "foodRating": 4, "serviceRating": 5, "overallRating": 4, "language": "en", "reviewText": "QA review: tasty rice and curry, friendly staff.", "status": "PENDING", "createdAt": "2026-09-30T13:35:17.171407300Z"}
Expected: HTTP 201 but status forced to PENDING (client status ignored)
Actual:   HTTP 201; status=PENDING note=None
```

**EVID-218 · TC-SEC-021 PASS — SQL injection probe in search q** · executed 2026-09-30T19:05:19+05:30 · verdict **PASS**

```
GET http://localhost:8080/api/v1/restaurants?q=%27+OR+%271%27%3D%271
Authorization: none
→ HTTP 200 (32.7 ms)  Content-Length: 2
Response body: []
Expected: HTTP 200 and empty list (input treated as literal)
Actual:   HTTP 200; rows returned=0
```

**EVID-228 · TC-SEC-041 PASS — User A's saved restaurant unaffected by User B action** · executed 2026-09-30T19:05:17+05:30 · verdict **PASS**

```
GET http://localhost:8080/api/v1/users/me/saved-restaurants
Authorization: Bearer <USER_A token>
→ HTTP 200 (36.4 ms)  Content-Length: 336
Response body: [{"id": 5, "slug": "green-leaf-kitchen", "name": "Green Leaf Kitchen", "cuisine": "Sri Lankan · Vegetarian", "location": "Kandy", "rating": 4.3, "reviewCount": 96, "priceMin": 1500, "priceMax": 3000, "vegetarian": true, "vegan": true, "halal": true, "description": "Vegetarian-friendly local dishes with mild and medium spice options.", "imageColor": "#597a40"}]
Expected: HTTP 200
Actual:   HTTP 200; User A slugs=['green-leaf-kitchen']
```

**EVID-090 · TC-MOD-012 FAIL (DEF-004) — Approved review is reflected in restaurant reviewCount/rating** · executed 2026-09-30T19:05:17+05:30 · verdict **FAIL**

```
GET http://localhost:8080/api/v1/restaurants/ministry-of-crab
Authorization: none
→ HTTP 200 (9.5 ms)  Content-Length: 356
Response body: {"id": 1, "slug": "ministry-of-crab", "name": "Ministry of Crab", "cuisine": "Seafood · Sri Lankan", "location": "Colombo", "rating": 4.8, "reviewCount": 320, "priceMin": 8000, "priceMax": 12000, "vegetarian": false, "vegan": false, "halal": true, "description": "Popular seafood dining in Colombo. Browse menu items, prices and approved customer reviews.", "imageColor": "#332417"}
Expected: HTTP 200; reviewCount increases by 1 and rating is recalculated after approval
Actual:   HTTP 200; reviewCount before=320 after=320; rating before=4.8 after=4.8
```

**EVID-009 · TC-ADM-007 FAIL (DEF-005) — Create restaurant with priceMin > priceMax** · executed 2026-09-30T19:05:18+05:30 · verdict **FAIL**

```
POST http://localhost:8080/api/v1/admin/restaurants
Authorization: Bearer <ADMIN token>
Request body: {"slug": "qa-inverted-190512", "name": "QA Test Bistro", "cuisine": "Sri Lankan · Fusion", "location": "Galle", "priceMin": 9000, "priceMax": 100, "vegetarian": true, "vegan": false, "halal": true, "description": "Created by QA API test.", "imageColor": "#123456"}
→ HTTP 201 (19.5 ms)  Content-Length: 278
Response body: {"id": 7, "slug": "qa-inverted-190512", "name": "QA Test Bistro", "cuisine": "Sri Lankan · Fusion", "location": "Galle", "rating": 0, "reviewCount": 0, "priceMin": 9000, "priceMax": 100, "vegetarian": true, "vegan": false, "halal": true, "description": "Created by QA API test.", "imageColor": "#123456"}
Expected: HTTP 400 (minimum price must not exceed maximum price)
Actual:   HTTP 201
```

**EVID-013 · TC-ADM-011 FAIL (DEF-006) — Update restaurant to slug already used by another restaurant** · executed 2026-09-30T19:05:18+05:30 · verdict **FAIL**

```
PUT http://localhost:8080/api/v1/admin/restaurants/6
Authorization: Bearer <ADMIN token>
Request body: {"slug": "nuga-gama", "name": "QA Test Bistro", "cuisine": "Sri Lankan · Fusion", "location": "Galle", "priceMin": 1000, "priceMax": 2500, "vegetarian": true, "vegan": false, "halal": true, "description": "Created by QA API test.", "imageColor": "#123456"}
→ HTTP 403 (67.3 ms)  Content-Length: 0
Response body: (empty)
Expected: HTTP 409 Conflict (slug already exists)
Actual:   HTTP 403
```

**EVID-036 · TC-ADM-037 FAIL (DEF-007) — Delete restaurant that has customer reviews** · executed 2026-09-30T19:05:19+05:30 · verdict **FAIL**

```
DELETE http://localhost:8080/api/v1/admin/restaurants/8
Authorization: Bearer <ADMIN token>
→ HTTP 403 (44.7 ms)  Content-Length: 0
Response body: (empty)
Expected: HTTP 204 (restaurant and dependent data removed) or HTTP 409 with an explanatory message; never a 5xx
Actual:   HTTP 403
```

**EVID-154 · TC-DATA-002 FAIL (DEF-008) — Admin edit to seeded restaurant survives restart** · executed 2026-09-30T19:11:28+05:30 · verdict **FAIL**

```
GET http://localhost:8080/api/v1/restaurants/nuga-gama
Authorization: none
→ HTTP 200 (30.6 ms)  Content-Length: 307
Response body: {"id": 4, "slug": "nuga-gama", "name": "Nuga Gama", "cuisine": "Sri Lankan · Authentic", "location": "Colombo", "rating": 4.4, "reviewCount": 150, "priceMin": 3000, "priceMax": 5000, "vegetarian": true, "vegan": true, "halal": true, "description": "Traditional Sri Lankan dining with local cuisine options.", "imageColor": "#662e1a"}
Expected: HTTP 200; description='QA-EDITED description 190512', priceMin=3500
Actual:   HTTP 200; description after restart='Traditional Sri Lankan dining with local cuisine options.'; priceMin=3000
```

**EVID-189 · Backend log — correct 400-class exceptions were raised for requests the client received as 403 (DEF-001)** — source: evidence/logs/backend-run-1.log

```
2026-09-30T18:59:24.951+05:30  WARN 14664 --- [tastelanka-api] [nio-8080-exec-7] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.bind.MethodArgumentNotValidException: Validation failed for argument [0] in public com.tastelanka.portal.auth.AuthController$AuthResponse com.tastelanka.portal.auth.AuthController.register(com.tastelanka.portal.auth.AuthController$RegisterRequest) with 3 errors: [Field error in object 'registerRequest' on field 'fullName': rejected value [null]; codes [NotBlank.registerRequest.fullName,NotBlank.fullName,NotBlank.java.lang.String,NotBlank]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [registerRequest.fullName,fullName]; arguments []; default message [fullName]]; default message [must not be blank]] [Field error in object 'registerRequest' on field 'password': rejected value [null]; codes [NotBlank.registerRequest.password,NotBlank.password,NotBlank.java.lang.String,NotBlank]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [registerRequest.password,password]; arguments []; default message [password]]; default message [must not be blank]] [Field error in object 'registerRequest' on field 'email': rejected value [null]; codes [NotBlank.registerRequest.email,NotBlank.email,NotBlank.java.lang.String,NotBlank]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [registerRequest.email,email]; arguments []; default message [email]]; default message [must not be blank]] ]
2026-09-30T19:05:13.592+05:30  WARN 14664 --- [tastelanka-api] [nio-8080-exec-3] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.bind.MethodArgumentNotValidException: Validation failed for argument [0] in public com.tastelanka.portal.auth.AuthController$AuthResponse com.tastelanka.portal.auth.AuthController.register(com.tastelanka.portal.auth.AuthController$RegisterRequest) with 3 errors: [Field error in object 'registerRequest' on field 'password': rejected value [null]; codes [NotBlank.registerRequest.password,NotBlank.password,NotBlank.java.lang.String,NotBlank]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [registerRequest.password,password]; arguments []; default message [password]]; default message [must not be blank]] [Field error in object 'registerRequest' on field 'email': rejected value [null]; codes [NotBlank.registerRequest.email,NotBlank.email,NotBlank.java.lang.String,NotBlank]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [registerRequest.email,email]; arguments []; default message [email]]; default message [must not be blank]] [Field error in object 'registerRequest' on field 'fullName': rejected value [null]; codes [NotBlank.registerRequest.fullName,NotBlank.fullName,NotBlank.java.lang.String,NotBlank]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [registerRequest.fullName,fullName]; arguments []; default message [fullName]]; default message [must not be blank]] ]
2026-09-30T19:05:13.599+05:30  WARN 14664 --- [tastelanka-api] [nio-8080-exec-5] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.bind.MethodArgumentNotValidException: Validation failed for argument [0] in public com.tastelanka.portal.auth.AuthController$AuthResponse com.tastelanka.portal.auth.AuthController.register(com.tastelanka.portal.auth.AuthController$RegisterRequest): [Field error in object 'registerRequest' on field 'email': rejected value [not-an-email]; codes [Email.registerRequest.email,Email.email,Email.java.lang.String,Email]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [registerRequest.email,email]; arguments []; default message [email],[Ljakarta.validation.constraints.Pattern$Flag;@52179fb5,.*]; default message [must be a well-formed email address]] ]
```

**EVID-189 · Backend log — unhandled exceptions behind the masked 403s (DEF-006, DEF-007)** — source: evidence/logs/backend-run-1.log

```
2026-09-30T19:05:18.383+05:30  WARN 14664 --- [tastelanka-api] [nio-8080-exec-1] org.hibernate.orm.jdbc.error             : Duplicate entry 'nuga-gama' for key 'restaurants.uk_restaurants_slug'
2026-09-30T19:05:18.393+05:30 ERROR 14664 --- [tastelanka-api] [nio-8080-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed: org.springframework.dao.DataIntegrityViolationException: could not execute statement [Duplicate entry 'nuga-gama' for key 'restaurants.uk_restaurants_slug'] [update restaurants set cuisine=?,description=?,halal=?,image_color=?,location=?,name=?,price_max=?,price_min=?,rating=?,review_count=?,slug=?,vegan=?,vegetarian=? where id=?]; SQL [update restaurants set cuisine=?,description=?,halal=?,image_color=?,location=?,name=?,price_max=?,price_min=?,rating=?,review_count=?,slug=?,vegan=?,vegetarian=? where id=?]; constraint [restaurants.uk_restaurants_slug]] with root cause
java.sql.SQLIntegrityConstraintViolationException: Duplicate entry 'nuga-gama' for key 'restaurants.uk_restaurants_slug'
2026-09-30T19:05:18.779+05:30  WARN 14664 --- [tastelanka-api] [nio-8080-exec-7] org.hibernate.orm.jdbc.error             : Duplicate entry 'chilli-crab' for key 'dishes.uk_dishes_slug'
2026-09-30T19:05:18.781+05:30 ERROR 14664 --- [tastelanka-api] [nio-8080-exec-7] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed: org.springframework.dao.DataIntegrityViolationException: could not execute statement [Duplicate entry 'chilli-crab' for key 'dishes.uk_dishes_slug'] [update dishes set description=?,food_rating=?,halal=?,image_color=?,name=?,price=?,rating=?,restaurant_id=?,review_count=?,service_rating=?,slug=?,spice_level=?,vegetarian=? where id=?]; SQL [update dishes set description=?,food_rating=?,halal=?,image_color=?,name=?,price=?,rating=?,restaurant_id=?,review_count=?,service_rating=?,slug=?,spice_level=?,vegetarian=? where id=?]; constraint [dishes.uk_dishes_slug]] with root cause
java.sql.SQLIntegrityConstraintViolationException: Duplicate entry 'chilli-crab' for key 'dishes.uk_dishes_slug'
```

![EVID-226 · TC-SEC-031 PASS · stored XSS payload rendered as plain text, no script executed (top of full-page screenshot shown) — source: evidence/security/TC-SEC-031-xss-rendered-as-text.png](report-figures/TC-SEC-031-xss-rendered-as-text.jpg)

### A.4 Additional UI defects

![EVID-277 · TC-UI-006 FAIL (DEF-014) · home 'Write a Review': no restaurant selector, generic error — source: evidence/ui/TC-UI-006-review-without-restaurant.png](report-figures/TC-UI-006-review-without-restaurant.jpg)

![EVID-281 · TC-UI-008 FAIL (DEF-015) · already-saved restaurant shows 'Save' — source: evidence/ui/TC-UI-008-saved-state-after-reload.png](report-figures/TC-UI-008-saved-state-after-reload.jpg)

![EVID-271 · TC-ADM-UI-002 FAIL (DEF-007) · 'Remove its menu and reviews first' — no way to remove reviews — source: evidence/ui/TC-ADM-UI-002-delete-restaurant-with-reviews.png](report-figures/TC-ADM-UI-002-delete-restaurant-with-reviews.jpg)

![EVID-282 · TC-UI-013 FAIL (DEF-010) · home location selector ignored — source: evidence/ui/TC-UI-013-home-location-ignored.png](report-figures/TC-UI-013-home-location-ignored.jpg)

![EVID-270 · TC-ADM-UI-001 PASS · admin dashboard with live metrics — source: evidence/ui/TC-ADM-UI-001-admin-dashboard.png](report-figures/TC-ADM-UI-001-admin-dashboard.jpg)

### A.5 Automated test evidence

**EVID-127 · JUnit final run — per-class summary** — source: evidence/automated/AUTO-006-junit-qa-suite-final.log

```
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 22.99 s -- in com.tastelanka.portal.BackendApplicationTests
[ERROR] Tests run: 18, Failures: 7, Errors: 0, Skipped: 0, Time elapsed: 14.02 s <<< FAILURE! -- in com.tastelanka.portal.qa.ApiIntegrationTest
[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.033 s -- in com.tastelanka.portal.qa.DomainModelTest
[ERROR] Tests run: 5, Failures: 4, Errors: 0, Skipped: 0, Time elapsed: 6.200 s <<< FAILURE! -- in com.tastelanka.portal.qa.HttpErrorContractTest
[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.073 s -- in com.tastelanka.portal.qa.JwtServiceTest
[ERROR] Tests run: 35, Failures: 1, Errors: 0, Skipped: 0, Time elapsed: 0.536 s <<< FAILURE! -- in com.tastelanka.portal.qa.RequestValidationTest
[ERROR] Tests run: 69, Failures: 12, Errors: 0, Skipped: 0
[INFO] BUILD FAILURE
```

**EVID-302 · Playwright final exclusive run — failures and totals** — source: evidence/ui/playwright-final-console.txt

```
  x   6 specs\admin.spec.ts:93:5 › TC-ADM-UI-002 admin sees a clear message when a restaurant with reviews cannot be deleted (6.3s)
  x  10 specs\admin.spec.ts:195:5 › TC-ADM-UI-004 moderator can enter a moderation note / reason when rejecting (6.6s)
  x  25 specs\customer.spec.ts:137:5 › BB-08b 'Clear all' resets filters and results (3.4s)
  x  26 specs\customer.spec.ts:158:5 › BB-08c cuisine category link filters the listing (3.1s)
  x  27 specs\customer.spec.ts:169:5 › BB-08d price and spice filters are available on restaurant search (2.4s)
  x  33 specs\customer.spec.ts:230:5 › TC-UI-006 'Write a Review' from home page (no restaurant selected) lets the user pick a restaurant (7.8s)
  x  36 specs\customer.spec.ts:269:5 › TC-UI-008 saved state is shown when revisiting an already-saved restaurant (6.3s)
  x  40 specs\customer.spec.ts:306:5 › TC-UI-011 home 'Top Rated' section reflects API data (2.4s)
  x  42 specs\customer.spec.ts:324:5 › TC-UI-013 home page filter chips and location selector affect results (4.6s)
  x  51 specs\nonfunctional.spec.ts:24:7 › BB-18 responsive layout at tablet 768x1024: no horizontal overflow, content visible (12.5s)
  x  54 specs\nonfunctional.spec.ts:51:5 › BB-18c mobile: restaurant filters are available (2.4s)
  x  56 specs\nonfunctional.spec.ts:88:5 › BB-20a automated accessibility scan (axe-core, WCAG 2.1 A/AA) of key pages (37.9s)
  x  59 specs\nonfunctional.spec.ts:137:5 › BB-20d rating star buttons expose accessible names and selected state (4.2s)
  x  60 specs\nonfunctional.spec.ts:149:5 › BB-20e search and filter inputs have programmatic labels (2.9s)
  x  63 specs\nonfunctional.spec.ts:193:5 › BB-19c interface language can be switched to Sinhala / Tamil (2.5s)
  15 failed
  49 passed (9.2m)
```

