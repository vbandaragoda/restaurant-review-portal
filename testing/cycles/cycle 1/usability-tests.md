# Usability Test Scenarios (UT-01 … UT-10)

**Execution status: NOT EXECUTED** — no human participants were available in this test cycle. No participant data has been created. The scenarios below are ready for a moderated session (recommended 5 participants: first-time visitors, one mobile user, one Sinhala- and one Tamil-preferring reader).

Session protocol: think-aloud, no help unless blocked > 2 min; record completion (Yes / With help / No), time on task (stopwatch), errors, and comments. Environment: see `test-environment.md` (desktop 1440×900 and mobile 375×812).

| ID | Task given to participant | Start page | Success criterion | Observer notes to capture |
|---|---|---|---|---|
| UT-01 | "Find a restaurant in Kandy you might like." | `/` | Reaches a Kandy restaurant details page unaided | Route taken; use of search vs browse |
| UT-02 | "Find the restaurant 'Nuga Gama'." | `/` | Finds it, or understands the no-result state for a misspelling | Search terms tried |
| UT-03 | "Show only vegan restaurants in Colombo, then remove the filters." | `/restaurants` | Applies and clears filters; knows results changed | Awareness of "Apply Filters"/"Clear all" (see DEF-011) |
| UT-04 | "What does Chilli Crab cost and how spicy is it?" | `/restaurants/ministry-of-crab` | Correct price (LKR 9,500) and spice (Hot) | Time to locate dish page |
| UT-05 | "Rate and review a restaurant you visited." (logged-in account provided) | `/` | Submitted review reaches pending state | Whether home "Write a Review" dead end is hit (DEF-014) |
| UT-06 | "Save Pedlar's Inn for later, then remove it." | `/restaurants/pedlars-inn` | Saves, finds it on profile, removes it | Understanding of saved state (DEF-015) |
| UT-07 | "Find your reviews and saved restaurants." | `/` | Reaches profile sections | Navigation path |
| UT-08 | Repeat UT-01 and UT-03 on a phone (375 px) | `/` | Task completion on mobile | Missing mobile filters (DEF-012) |
| UT-09 | "Read the Sinhala and Tamil reviews for Ministry of Crab." | `/restaurants/ministry-of-crab` | Text readable; interface understood | Expectation of a UI language switch |
| UT-10 | "Create an account" (participant is given an already-registered e-mail, then a mismatched password) | `/signup` | Understands errors and recovers unaided | Clarity of messages |

## Results
| Participant ID | Task | Completion | Time | Issues | Comments | Observations |
|---|---|---|---|---|---|---|
| — | UT-01 … UT-10 | NOT EXECUTED | — | — | — | No participants available |

Heuristic observations made by the tester during scripted E2E runs (not participant data) are logged as defects DEF-009, DEF-010, DEF-011, DEF-012, DEF-014, DEF-015.
