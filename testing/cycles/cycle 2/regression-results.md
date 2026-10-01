# Retest & Regression Results — Cycle 2

## Retest
| Defect ID | Severity | Original Result (cycle 1) | Fix | Retest Tests | Retest Result |
|---|---|---|---|---|---|
| DEF-001 | High | 403 with empty body in every case (backend log shows the correct exception was resolved, e.g. MethodArgumentNotValidException, then masked) | Commit eed62c2 | TC-AUTH-003, TC-AUTH-014, TC-API-024, TC-ADM-003, TC-ADM-013, TC-ADM-014, TC-ADM-015, TC-API-028, TC-HTTP-002, TC-HTTP-003, TC-HTTP-004, TC-HTTP-005, TC-API-040 | PASS |
| DEF-002 | Medium | 403 Forbidden, empty body | Commit eed62c2 | TC-SEC-001, TC-SEC-002, TC-SEC-003, TC-SEC-004, TC-SEC-016, TC-SEC-017, TC-REV-002, TC-REV-018, TC-SAV-005, TC-INT-005, TC-API-044 | PASS |
| DEF-003 | Critical | HTTP 200 with dashboard data | Commit eed62c2 | TC-SEC-005, TC-SEC-007, TC-SEC-008, TC-INT-006, TC-UNIT-JWT-006 | PASS |
| DEF-004 | Medium | reviewCount = 0, rating = 0 (seeded: 320 → 320, 4.8 → 4.8) | Commit eed62c2 | TC-MOD-012, TC-INT-021, TC-MOD-020, TC-MOD-021, TC-REV-025, TC-UNIT-DOM-006 | PASS |
| DEF-005 | Low | 201 Created; row persisted (DB check shows 1 restaurant with price_min > price_max) | Commit eed62c2 | TC-ADM-007, TC-ADM-039, TC-INT-034 | PASS |
| DEF-006 | Medium | Unhandled SQLIntegrityConstraintViolationException 'Duplicate entry nuga-gama'; client gets 403 | Commit eed62c2 | TC-ADM-011, TC-ADM-028, TC-INT-032 | PASS |
| DEF-007 | Medium | Unhandled 'Cannot delete or update a parent row: fk_reviews_restaurant'; UI message with no possible remedy | Commit eed62c2 | TC-ADM-037, TC-ADM-038, TC-INT-033, TC-ADM-UI-002 | PASS |
| DEF-008 | High | priceMin back to 3000, description reset; seafood-kottu re-created with new id 10 | Commit eed62c2 | TC-DATA-002, TC-DATA-003, TC-INT-035 | PASS |
| DEF-009 | Medium | All 8 restaurants listed | Commit eed62c2 | BB-08c | PASS |
| DEF-010 | Medium | No price control; chip click does nothing; location ignored | Commit eed62c2 | BB-08d, TC-UI-013, TC-API-030, TC-API-031, TC-API-032, TC-API-033, TC-API-034, TC-INT-042 | PASS |
| DEF-011 | Low | Still 3 (Galle) results | Commit eed62c2 | BB-08b | PASS |
| DEF-012 | Medium | 0 visible filter controls; Apply Filters hidden | Commit eed62c2 | BB-18c | PASS |
| DEF-013 | Medium | 153 px overflow; collapsed cards | Commit eed62c2 | BB-18-tablet | PASS |
| DEF-014 | Medium | Generic error; no way to complete | Commit eed62c2 | TC-UI-006 | PASS |
| DEF-015 | Low | Button shows 'Save' | Commit eed62c2 | TC-UI-008 | PASS |
| DEF-016 | Low | 210 vs 220 | Commit eed62c2 | TC-UI-011 | PASS |
| DEF-017 | Medium | color-contrast (serious) on 10/10 pages | Commit eed62c2 | BB-20a | PASS |
| DEF-018 | Medium | 3 unlabeled controls; select-name critical | Commit eed62c2 | BB-20a, BB-20e | PASS |
| DEF-019 | Medium | Names '★'; aria-pressed null | Commit eed62c2 | BB-20d | PASS |
| DEF-020 | Medium | Only status (+ empty note) stored | Commit eed62c2 | TC-ADM-UI-004, TC-MOD-015, TC-MOD-016, TC-MOD-018, TC-MOD-019, TC-INT-023, TC-INT-024 | PASS |
| DEF-021 | Medium | New in cycle 2 | QA working tree – DomainModelTest updated to the new signature (not yet committed) | C2-AUTO-001 → C2-AUTO-002 | PASS (pending commit) |

## Regression
| Suite | Command | Result (cycle 2) | Cycle 1 |
|---|---|---|---|
| Backend JUnit as committed | `./mvnw test` | compilation error (DEF-021) | 69 run, 57 passed, 12 failed |
| Backend JUnit after test update (C2-AUTO-002) | `./mvnw test` (DB_URL→tastelanka_junit_c2, JWT_SECRET set) | 76 run, 75 passed, 1 failed (TC-UNIT-VAL-010 – obsolete premise) | – |
| Backend JUnit final (C2-AUTO-003) | same, TC-UNIT-VAL-010 disabled with reason | 76 run, 75 passed, 0 failed, 1 skipped (not applicable) – BUILD SUCCESS | 69 run, 57 passed, 12 failed |
| API/security/data – original suite | `python testing/scripts/api_security_tests.py` | 151 passed, 0 failed | 83 passed, 68 failed |
| API – cycle 2 additions | `python testing/scripts/api_cycle2_tests.py` | all passed (see results CSV) | new |
| Persistence across restart | `persistence_tests.py pre/post` | 17 passed, 0 failed | 15 passed, 2 failed |
| UI/E2E – unchanged specs (run 1) | `npx playwright test` | 25 passed, 39 failed (test maintenance needed) | 49 passed, 15 failed |
| UI/E2E – maintained specs (final) | `npx playwright test` | 63 passed, 1 failed | 49 passed, 15 failed |

Status change of every counted test against cycle 1: FAIL→PASS: 91, unchanged PASS: 155, new: 39, other: 11. No previously passing test fails.
Per-test comparison: `regression-comparison.csv`.
