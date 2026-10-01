# Retest & Regression Results

## Retest
No defect fixes were delivered in this cycle (repository remains at commit `fc1f1cc`; no application code was changed by QA). Retest status for all 20 defects: **Not retested**. Defects remain **Open**.

## Regression baseline (final clean run, 2026-09-30)
| Suite | Command | Executed | Passed | Failed | Evidence |
|---|---|---|---|---|---|
| Backend JUnit (existing + QA) — first run | `./mvnw test` (DB_URL→tastelanka_junit) | 69 | 57 | 12 | evidence/automated/AUTO-005-junit-qa-suite-run1.log, surefire-run1/ |
| Backend JUnit (existing + QA) — final run | same | 69 | 57 | 12 | evidence/automated/AUTO-006-junit-qa-suite-final.log, surefire-final/ |
| API/security/data harness | `python testing/scripts/api_security_tests.py` (+ persistence, moderator scope) | 152 | 82 | 70 | evidence/api-security-results.csv |
| UI / E2E / dry runs / NFR (final exclusive run) | `npx playwright test` (testing/e2e) | 64 | 49 | 15 | evidence/ui/playwright-results.json, playwright-final-console.txt, playwright-report/index.html |

Result comparison: JUnit first vs final run identical (same 12 failing tests). UI tests that changed status between development runs and the final run did so only because of corrected test design or the overlapping-run incident (BB-13, DR-02, DR-06, PERF-UI failed on screenshot/trace-file errors while two sessions ran concurrently; all pass in the exclusive final run) — see report §11; no product code changed, so no regression can have been introduced by QA.

Each open defect has at least one automated test in these suites that currently fails; after a fix, re-running the three commands provides retest + regression evidence.
