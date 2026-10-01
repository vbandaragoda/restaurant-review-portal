"""Cycle 2 additions: API tests for the fixes and new behaviour delivered in commit eed62c2.

The original api_security_tests.py is run unchanged for regression; this script only adds tests for
behaviour that did not exist in cycle 1 (review deletion, price/spice filters, moderation audit fields,
error bodies). Run after api_security_tests.py (uses its run-context.json).
"""
import json
import os
import sys
import time

sys.path.insert(0, os.path.dirname(__file__))
from qa_lib import OUT, Runner, label_token, load_env  # noqa: E402

env = load_env()
ctx = json.load(open(os.path.join(OUT, "evidence", "run-context.json"), encoding="utf-8"))
RUN = ctx["run"] + "c2"
R = Runner("cycle2-additions")
A, S = "api", "security"
PW = "QaUser#2026pw"
problem = lambda r, b: (isinstance(b, dict) and bool(b.get("detail")) and "problem+json" in r.headers.get("Content-Type", ""),
                        f"Content-Type={r.headers.get('Content-Type')}; detail={b.get('detail') if isinstance(b, dict) else b!r}")

r, b = R.call("TC-C2-SETUP-1", "Admin login", A, "POST", "/auth/login", 200, body={"email": env["ADMIN_EMAIL"], "password": env["ADMIN_PASSWORD"]}, quiet=True)
adm = b["token"]; label_token("ADMIN token", adm)
r, b = R.call("TC-C2-SETUP-2", "User A login", A, "POST", "/auth/login", 200, body={"email": ctx["userA"], "password": PW}, quiet=True)
tokA = b["token"]; label_token("USER_A token", tokA)
r, b = R.call("TC-C2-SETUP-3", "User B login", A, "POST", "/auth/login", 200, body={"email": ctx["userB"], "password": PW}, quiet=True)
tokB = b["token"]; label_token("USER_B token", tokB)
rv = lambda **kw: {"restaurantSlug": "nuga-gama", "foodRating": 4, "serviceRating": 4, "overallRating": 4, "language": "en",
                   "reviewText": "Cycle 2 QA review for retest.", **kw}

print("== DEF-001 retest: error responses carry status and a problem body")
R.call("TC-API-040", "Invalid registration returns 400 with problem detail", A, "POST", "/auth/register", 400, body={}, check=problem,
       expected_text="HTTP 400, Content-Type application/problem+json, non-empty 'detail'")
R.call("TC-API-041", "Wrong password returns 401 with problem detail", A, "POST", "/auth/login", 401,
       body={"email": ctx["userA"], "password": "WrongPass#1"}, check=problem)
R.call("TC-API-042", "Unknown restaurant returns 404 with problem detail", A, "GET", "/restaurants/no-such-restaurant", 404, check=problem)
R.call("TC-API-043", "Duplicate slug on create returns 409 with problem detail (admin)", A, "POST", "/admin/restaurants", 409, token=adm,
       body={"slug": "nuga-gama", "name": "Dup", "cuisine": "X", "location": "Galle", "priceMin": 1, "priceMax": 2,
             "vegetarian": False, "vegan": False, "halal": False}, check=problem)
R.call("TC-API-044", "Unauthenticated protected request returns 401 with problem detail (DEF-002 retest)", S, "GET", "/users/me", 401, check=problem)
R.call("TC-API-045", "Customer on admin endpoint returns 403 with problem detail", S, "GET", "/admin/dashboard", 403, token=tokA, check=problem)
R.call("TC-API-046", "Unknown endpoint returns 404 (not 403)", A, "GET", "/no-such-endpoint", [401, 404],
       expected_text="HTTP 404 (or 401 for protected namespace) – never a masked 403")

print("== DEF-010 retest: price and spice-level filters")
slugs = lambda b: sorted(x["slug"] for x in b)
R.call("TC-API-030", "Filter maxPrice=2000 returns only restaurants starting at or below LKR 2,000", A, "GET", "/restaurants", 200,
       params={"maxPrice": 2000}, check=lambda r, b: (len(b) > 0 and all(x["priceMin"] <= 2000 for x in b) and "ministry-of-crab" not in slugs(b),
                                                     f"slugs={slugs(b)}"))
R.call("TC-API-031", "Filter spiceLevel=Hot returns restaurants with a Hot dish", A, "GET", "/restaurants", 200, params={"spiceLevel": "Hot"},
       check=lambda r, b: ("ministry-of-crab" in slugs(b) and "green-leaf-kitchen" not in slugs(b), f"slugs={slugs(b)}"))
R.call("TC-API-032", "Combined maxPrice=5000 & vegan=true", A, "GET", "/restaurants", 200, params={"maxPrice": 5000, "vegan": "true"},
       check=lambda r, b: (all(x["vegan"] and x["priceMin"] <= 5000 for x in b) and len(b) > 0, f"slugs={slugs(b)}"))
R.call("TC-API-033", "Invalid spiceLevel=Extreme rejected", A, "GET", "/restaurants", 400, params={"spiceLevel": "Extreme"}, check=problem)
R.call("TC-API-034", "Negative maxPrice rejected", A, "GET", "/restaurants", 400, params={"maxPrice": -1}, check=problem)
R.call("TC-API-035", "Non-numeric maxPrice rejected", A, "GET", "/restaurants", 400, params={"maxPrice": "cheap"})

print("== DEF-020 retest: moderation rules and audit trail")
r, b = R.call("TC-C2-SETUP-4", "Setup: pending review by User A", A, "POST", "/reviews", 201, token=tokA, body=rv(), quiet=True)
rid = b["id"]
R.call("TC-MOD-015", "Reject without a reason is refused", A, "PATCH", f"/admin/reviews/{rid}", 400, token=adm, body={"status": "REJECTED"}, check=problem)
R.call("TC-MOD-016", "Reject with blank reason is refused", A, "PATCH", f"/admin/reviews/{rid}", 400, token=adm, body={"status": "REJECTED", "note": "   "})
R.call("TC-MOD-017", "Moving a review back to PENDING is refused", A, "PATCH", f"/admin/reviews/{rid}", 400, token=adm, body={"status": "PENDING"})
R.call("TC-MOD-018", "Reject with reason records moderator, time and note", A, "PATCH", f"/admin/reviews/{rid}", 200, token=adm,
       body={"status": "REJECTED", "note": "Duplicate content"},
       check=lambda r, b: (b.get("moderatorNote") == "Duplicate content" and b.get("moderatedBy") and b.get("moderatedAt"),
                           f"note={b.get('moderatorNote')!r} moderatedBy={b.get('moderatedBy')!r} moderatedAt={b.get('moderatedAt')!r}"))
R.call("TC-MOD-019", "Author sees moderation reason in own reviews", A, "GET", "/reviews/mine", 200, token=tokA,
       check=lambda r, b: (any(x["id"] == rid and x.get("moderatorNote") == "Duplicate content" for x in b), "reason visible to author"))

print("== DEF-004 retest: rating aggregation on approve / re-moderate / delete")
r, b = R.call("TC-C2-SETUP-5", "Setup: restaurant for rating checks", A, "POST", "/admin/restaurants", 201, token=adm, quiet=True,
              body={"slug": f"qa-agg-{RUN}", "name": "QA Aggregation Cafe", "cuisine": "Sri Lankan", "location": "Kandy", "priceMin": 500,
                    "priceMax": 900, "vegetarian": True, "vegan": False, "halal": False})
agg = f"qa-agg-{RUN}"
ids = []
for o in (4, 2):
    r, b = R.call(f"TC-C2-SETUP-6{o}", f"Setup: {o}-star review", A, "POST", "/reviews", 201, token=tokB, quiet=True,
                  body=rv(restaurantSlug=agg, overallRating=o, reviewText=f"Cycle 2 aggregation review {o} stars."))
    ids.append(b["id"])
    R.call(f"TC-C2-SETUP-7{o}", "Setup: approve", A, "PATCH", f"/admin/reviews/{b['id']}", 200, token=adm, body={"status": "APPROVED"}, quiet=True)
R.call("TC-MOD-020", "Two approved reviews (4 and 2 stars) give rating 3.0 / count 2", A, "GET", f"/restaurants/{agg}", 200,
       check=lambda r, b: (float(b["rating"]) == 3.0 and b["reviewCount"] == 2, f"rating={b['rating']} count={b['reviewCount']}"))
R.call("TC-C2-SETUP-8", "Setup: re-moderate the 2-star review to REJECTED", A, "PATCH", f"/admin/reviews/{ids[1]}", 200, token=adm,
       body={"status": "REJECTED", "note": "Re-moderated by QA"}, quiet=True)
R.call("TC-MOD-021", "Rejecting a previously approved review removes it from the rating", A, "GET", f"/restaurants/{agg}", 200,
       check=lambda r, b: (float(b["rating"]) == 4.0 and b["reviewCount"] == 1, f"rating={b['rating']} count={b['reviewCount']}"))

print("== New: review deletion by author")
R.call("TC-REV-022", "Another user cannot delete someone else's review", S, "DELETE", f"/reviews/{ids[0]}", 403, token=tokA, check=problem)
R.call("TC-REV-023", "Anonymous user cannot delete a review", S, "DELETE", f"/reviews/{ids[0]}", 401)
R.call("TC-REV-024", "Admin token cannot delete another user's review via customer endpoint", S, "DELETE", f"/reviews/{ids[0]}", 403, token=adm)
R.call("TC-REV-021", "Author deletes own approved review", A, "DELETE", f"/reviews/{ids[0]}", 204, token=tokB)
R.call("TC-REV-025", "Deleted approved review is removed from rating and count", A, "GET", f"/restaurants/{agg}", 200,
       check=lambda r, b: (b["reviewCount"] == 0 and float(b["rating"]) == 0.0, f"rating={b['rating']} count={b['reviewCount']}"))
R.call("TC-REV-026", "Deleting a non-existent review returns 404", A, "DELETE", "/reviews/999999", 404, token=tokB)
R.call("TC-REV-027", "Deleted review no longer in author's list", A, "GET", "/reviews/mine", 200, token=tokB,
       check=lambda r, b: (ids[0] not in [x["id"] for x in b], f"ids={[x['id'] for x in b][:10]}"))

print("== DEF-006/007 retests")
R.call("TC-ADM-038", "Delete restaurant with reviews returns 409 with explanatory detail", A, "DELETE", f"/admin/restaurants/{ctx['restaurantWithReviews']}", 409,
       token=adm, check=problem)
R.call("TC-ADM-039", "Update restaurant price range inverted is refused", A, "PUT", f"/admin/restaurants/{ctx['restaurantWithReviews']}", 400, token=adm,
       body={"slug": ctx["restaurantWithReviewsSlug"], "name": "QA Reviewed Cafe", "cuisine": "Sri Lankan · Fusion", "location": "Galle",
             "priceMin": 9000, "priceMax": 100, "vegetarian": True, "vegan": False, "halal": True}, check=problem)
R.save()
