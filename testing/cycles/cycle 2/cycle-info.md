# Cycle 2 — Retest after bug fixes

| | |
|---|---|
| Date | 1 October 2026 |
| Commit tested | `eed62c2` "bug fixes" (Vimukthi Bandaragoda, 08:30) on branch `dev`; cycle 1 tested `fc1f1cc` |
| Local, uncommitted changes present | `backend/src/main/resources/application.yml` datasource defaults (overridden by environment in all runs); QA test updates in `backend/src/test/.../qa/` |
| Databases | `tastelanka_qa_c2`, `tastelanka_junit_c2` (MySQL 8.0.45, port 3307) built from the updated project scripts |
| Defects retested | DEF-001…DEF-020 |
| Result | 20 closed, 0 reopened, 1 new (DEF-021) |
| Report | `QA-Retest-Report.md` / `.docx` |
