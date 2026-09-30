# Test Environment — TasteLanka Restaurant Review Portal

Test cycle date: 2026-09-30 · Tester: QA (Claude Code, automated + scripted execution)

## Application under test
| Item | Value |
|---|---|
| Repository | `D:\restaurent\restaurant-review-portal` |
| Commit | `fc1f1cc2bd020eb5e4afd074a7c6f9e4c33c54c1` ("styling issues fix"), working tree clean except added `testing/` and `backend/src/test/.../qa/` (QA artefacts only) |
| Backend version | `com.tastelanka:backend:0.0.1-SNAPSHOT` (Spring Boot 4.1.1, Spring Security 7.1.1, Hibernate ORM 7.4.5.Final, Apache Tomcat 11.0.24 embedded, MySQL Connector/J 9.7.0, jjwt 0.13.0) |
| Frontend version | `frontend@0.1.0` (Next.js 16.3.6 with Turbopack dev server, React 19.2.8, TypeScript 5.9.3, Tailwind CSS 4.3.3, Axios 1.20.0) |
| Database | MySQL Community Server **8.0.45** (local Windows service, port **3307**), charset `utf8mb4`, collation `utf8mb4_0900_ai_ci` |
| API architecture | REST/JSON under `/api/v1`, stateless |
| Authentication | JWT (HS-signed, 24 h expiry), bearer token stored by the UI in `localStorage` |
| Authorization | Role-based: `USER`, `MODERATOR`, `ADMIN`; `/api/v1/admin/**` requires ADMIN or MODERATOR |

## Platform
| Item | Value |
|---|---|
| OS | Microsoft Windows 11 Home Single Language 10.0.26200 |
| Java / build | Oracle JDK 17.0.12; Apache Maven 3.9.16 via bundled `mvnw` |
| Node.js / npm | v22.21.0 / 10.9.4 |
| Browser (E2E) | Microsoft Edge 154.0.4258.37 (headless, driven by Playwright) |
| Python | Anaconda Python 3.9.12 with `requests` 2.27.1 (API/security harness) |

## Test tools
| Tool | Version | Use |
|---|---|---|
| JUnit Jupiter / AssertJ / Spring MockMvc | 6.0.3 / 3.27.7 / Spring Test 7.0.9 | Existing + new backend unit/integration tests |
| Playwright Test | 1.63.0 (isolated in `testing/e2e`) | UI E2E, dry runs, responsive checks, screenshots |
| @axe-core/playwright (axe-core) | 4.13.0 engine (0 npm audit vulnerabilities) | Automated WCAG 2.1 A/AA scan |
| Python harness `testing/scripts/*.py` | — | API, security, persistence, performance tests with JSON evidence |
| MySQL client | 8.0.45 | Database evidence queries |
| ESLint / tsc / next build | project versions | Static checks |

## Configuration used
| Setting | Value | Note |
|---|---|---|
| Database schema (manual/API/UI testing) | `tastelanka_qa` | Created from `database/schema/001_schema.sql` + `database/seed/001_restaurants.sql` with only the DB name changed (`testing/db/*.sql`) |
| Database schema (JUnit) | `tastelanka_junit` | Same scripts, name changed — isolated from manual test data |
| DB user | `root` on `localhost:3307` | Provided by the product owner for this environment |
| `JWT_SECRET` | **not set** (default from `application.yml` in effect) | Matches README run steps — see DEF-003 |
| Bootstrap admin | `qa.admin@tastelanka.test` via `ADMIN_EMAIL/ADMIN_PASSWORD` | Test credential stored in `testing/qa.env` |
| API | `http://localhost:8080/api/v1` via `mvnw spring-boot:run` | |
| UI | `http://localhost:3000` via `npm run dev` (README) | UI timings are dev-server timings |

### Deviations from README
* Docker Desktop's `compose.yaml` MySQL 8.4 was **not** used: host port 3306 belongs to an unrelated local MySQL; per the product owner's instruction the local MySQL 8.0 on port 3307 was used instead (README permits "a local MySQL 8 instance").
* A leftover empty database `tastelanka` was created on 3307 during setup; dropping it was blocked by the permission policy — the owner may drop it manually.

## Start-up commands used
```bash
source testing/qa.env            # DB_URL, DB_USERNAME, DB_PASSWORD, ADMIN_EMAIL, ADMIN_PASSWORD
cd backend && ./mvnw spring-boot:run
cd frontend && npm ci && npm run dev
```
Automated suites: `./mvnw test` (backend), `npm run lint`, `npx tsc --noEmit`, `npm run build` (frontend), `npx playwright test` (testing/e2e), `python testing/scripts/api_security_tests.py`.

## Test-execution incident: concurrent QA session
From about 19:43 to 20:17 local time, a **forked copy of this QA session** ran at the same time and wrote to the same `testing/` folder and database schemas. Effects observed: two full Playwright runs overlapped (artifact folders wiped, full-page screenshot timeouts) and deliverables were generated from the overlapping runs. Actions taken: the fork was asked to stop and confirmed it had; everything it produced was re-verified against raw evidence (two inaccurate statements in the defect register were corrected); the JUnit suite and the complete Playwright suite were re-executed exclusively; and all reported results come from those final runs. The overlapping-run outputs are kept, labelled, in `evidence/ui/superseded/` and are not used for any result.
