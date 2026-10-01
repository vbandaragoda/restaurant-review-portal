# Test Strategy — TasteLanka Restaurant Review Portal

## 1. Objectives
Verify, by execution against the running system, that customer and administrator workflows, validation, authentication/authorization, discovery (search/filter/details/menu), reviews and moderation, saved restaurants, persistence, responsiveness, accessibility and multilingual content behave as specified in the supplied Test Plan (FR-01…FR-18, NFR-01…NFR-08, NFR-12, NFR-13). Record defects with evidence.

## 2. Scope
**In scope:** all REST endpoints listed in the README; all UI routes (`/`, `/restaurants`, `/restaurants/[slug]`, `/dishes/[slug]`, `/reviews/new`, `/login`, `/signup`, `/profile`, `/cuisines`, `/admin/**`); DB integrity; restart persistence; baseline BB-01…BB-20, DR-01…DR-07; UT-01…UT-10 preparation.

**Out of scope:** FR-11 review comments and FR-12 restaurant responses (no implementation exists — recorded *Not Implemented*); load/stress testing; penetration testing beyond application-level probes; production deployment/TLS; email/password recovery (not implemented — "Forgot password?" links to /contact).

## 3. Test levels & types
| Level | Technique | Tooling |
|---|---|---|
| Unit | Boundary/equivalence tests of validation rules, JWT service, entity defaults | JUnit (`backend/src/test/.../qa`) |
| Integration | Controller + security + JPA against MySQL; real-HTTP contract test | Spring Boot Test, MockMvc, embedded Tomcat |
| API (system) | Positive/negative/boundary, invalid IDs, methods, content types, CRUD, persistence | Python harness, JSON evidence per test |
| Security | AuthN/AuthZ, token tampering/expiry/forgery, IDOR/horizontal, vertical escalation, mass assignment, SQLi/XSS probes, CORS, brute force | Python harness + Playwright |
| E2E / UI | Black-box BB-xx and TC-UI-xx workflows | Playwright (Edge) with screenshots |
| Dry run | Full journeys DR-01…DR-07 from a fresh account | Playwright |
| Non-functional | API timings, page-load timings, responsive (375/768/1440), axe WCAG scan, keyboard, focus, multilingual | Python, Playwright, axe-core |
| Data | CREATE→READ, UPDATE→READ, DELETE→READ, restart persistence, relationship integrity SQL | Python + MySQL client |
| Usability | UT-01…UT-10 prepared; require human participants | — (Not Executed) |

## 4. Test data strategy
* Seed catalogue from project scripts (5 restaurants, 4 dishes).
* Unique run suffixes (`qa.*.<run>@tastelanka.test`, `qa-*-<run>` slugs) so runs never collide.
* Dedicated schemas `tastelanka_qa` (manual/API/UI) and `tastelanka_junit` (JUnit).
* Test passwords are test values; admin credential lives only in `testing/qa.env`; evidence JSON redacts passwords and tokens.
* Unicode data: Sinhala and Tamil names/reviews.

## 5. Automation strategy
All executable checks are scripted so they can be re-run for retest/regression: `api_security_tests.py`, `persistence_tests.py`, `performance_tests.py`, Playwright specs (`customer`, `admin`, `nonfunctional`, `dry-runs`) and JUnit classes (`JwtServiceTest`, `DomainModelTest`, `RequestValidationTest`, `ApiIntegrationTest`, `HttpErrorContractTest`). Tests assert the **expected** behaviour; tests tied to open defects fail by design until fixed.

## 6. Evidence strategy
Every API/security test writes request, response, status, expected, actual and verdict to `testing/evidence/<type>/<TestID>.json`. UI tests save screenshots at verification points plus a timestamped step log (`ui-step-log.txt`), Playwright JSON/HTML reports, and failure traces. DB evidence is raw SQL output. All evidence is catalogued in `testing/evidence-index.csv` (EVID-nnn).

## 7. Defect management
Failures are triaged before logging: tester/test-data mistakes are fixed in the test and re-run (not logged — see §11 of the report). Product failures get a DEF-nnn entry in `testing/defects/defect-register.csv` with severity (impact) and priority (urgency), root cause where known from logs/code, and status. Defects are closed only after a successful retest.

## 8. Entry criteria
Application builds; API health `UP`; DB initialised from project scripts; admin bootstrap account available; test plan baseline available. **Met** on 2026-09-30.

## 9. Exit criteria
All baseline BB/DR tests executed with recorded status; every failure linked to a defect or documented reason; evidence indexed; RTM coverage based on execution; Critical/High defects reported to owner. Usability tests require participants (not met — Not Executed).

## 10. Risks & assumptions
* Requirement texts for FR/NFR IDs were available only as purpose labels in the test plan's traceability table; expected results follow the plan's BB/DR descriptions and conventional HTTP/WCAG practice.
* UI timings come from the Next.js **dev** server and are indicative only.
* No developer fixes were delivered during this cycle, so retest/regression of fixes could not be performed (defects remain Open).
* Test data accumulates in `tastelanka_qa` (seed restaurants are also reset by the seeder on restart — DEF-008).
