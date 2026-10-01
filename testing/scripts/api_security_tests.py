"""Phase 4 (API) and Phase 6 (security) test execution against the running TasteLanka API.

Run:  source testing/qa.env && python testing/scripts/api_security_tests.py
Writes one JSON evidence file per test plus testing/evidence/api-security-results.csv.
Also writes testing/evidence/run-context.json with IDs created during the run (used by later phases).
"""
import base64
import hashlib
import hmac
import json
import os
import sys
import time

sys.path.insert(0, os.path.dirname(__file__))
from qa_lib import ROOT, Runner, label_token, load_env  # noqa: E402

env = load_env()
RUN = time.strftime("%H%M%S")
R = Runner("api+security")
A, S = "api", "security"
PW = "QaUser#2026pw"  # test password for customer accounts created in this run


def email(tag):
    return f"qa.{tag}.{RUN}@tastelanka.test"


def has(*keys):
    return lambda r, b: (all(k in b for k in keys), f"keys present: {[k for k in keys if k in b]}")


# ---------------------------------------------------------------- AUTH
print("== Authentication")
r, b = R.call("TC-AUTH-001", "Register with valid data", A, "POST", "/auth/register", 201,
              body={"fullName": "QA User A", "email": email("usera"), "password": PW, "language": "en"},
              check=lambda r, b: (b.get("role") == "USER" and bool(b.get("token")) and "passwordHash" not in b,
                                  f"role={b.get('role')}, token issued={bool(b.get('token'))}, passwordHash exposed={'passwordHash' in b}"),
              expected_text="HTTP 201; JWT returned; role USER; no password hash in response")
tokA = b["token"]; label_token("USER_A token", tokA); userA = b
R.call("TC-AUTH-002", "Register duplicate email (different case)", A, "POST", "/auth/register", 409,
       body={"fullName": "Dup", "email": email("usera").upper(), "password": PW},
       expected_text="HTTP 409 Conflict (email already registered)")
R.call("TC-AUTH-003", "Register with empty body (missing all fields)", A, "POST", "/auth/register", 400, body={},
       expected_text="HTTP 400 with validation feedback")
R.call("TC-AUTH-004", "Register with invalid email format", A, "POST", "/auth/register", 400,
       body={"fullName": "Bad Email", "email": "not-an-email", "password": PW})
R.call("TC-AUTH-005", "Register password length 7 (below min 8)", A, "POST", "/auth/register", 400,
       body={"fullName": "Short Pw", "email": email("pw7"), "password": "Abc#123"})
R.call("TC-AUTH-006", "Register password length 8 (min boundary)", A, "POST", "/auth/register", 201,
       body={"fullName": "Pw Eight", "email": email("pw8"), "password": "Abc#1234"})
R.call("TC-AUTH-007", "Register password length 73 (above max 72)", A, "POST", "/auth/register", 400,
       body={"fullName": "Long Pw", "email": email("pw73"), "password": "a" * 73})
R.call("TC-AUTH-008", "Register password length 72 (max boundary)", A, "POST", "/auth/register", 201,
       body={"fullName": "Pw SeventyTwo", "email": email("pw72"), "password": "a" * 72})
R.call("TC-AUTH-009", "Register unsupported language 'fr'", A, "POST", "/auth/register", 400,
       body={"fullName": "Lang", "email": email("lang"), "password": PW, "language": "fr"})
R.call("TC-AUTH-010", "Register whitespace-only full name", A, "POST", "/auth/register", 400,
       body={"fullName": "   ", "email": email("blank"), "password": PW})
R.call("TC-AUTH-011", "Register attempts role escalation via 'role':'ADMIN' field", S, "POST", "/auth/register", 201,
       body={"fullName": "Escalate", "email": email("escalate"), "password": PW, "role": "ADMIN"},
       check=lambda r, b: (b.get("role") == "USER", f"role assigned={b.get('role')}"),
       expected_text="HTTP 201 and role USER (extra 'role' field ignored)")
r, b = R.call("TC-AUTH-012", "Register Sinhala-preference user with Unicode name", A, "POST", "/auth/register", 201,
              body={"fullName": "නිමල් පෙරේරා", "email": email("sinhala"), "password": PW, "language": "si"},
              check=lambda r, b: (b.get("fullName") == "නිමල් පෙරේරා" and b.get("language") == "si",
                                  f"fullName round-trip={b.get('fullName')}, language={b.get('language')}"))
R.call("TC-AUTH-013", "Login with valid credentials", A, "POST", "/auth/login", 200,
       body={"email": email("usera"), "password": PW}, check=has("token", "role"))
R.call("TC-AUTH-014", "Login with incorrect password", A, "POST", "/auth/login", 401,
       body={"email": email("usera"), "password": "WrongPass#1"},
       expected_text="HTTP 401 Unauthorized with an error message")
R.call("TC-AUTH-015", "Login with unregistered email", A, "POST", "/auth/login", 401,
       body={"email": email("nobody"), "password": PW})
R.call("TC-AUTH-016", "Login with email in different letter case", A, "POST", "/auth/login", 200,
       body={"email": email("usera").upper(), "password": PW})
R.call("TC-AUTH-017", "Login with missing password", A, "POST", "/auth/login", 400, body={"email": email("usera")})

r, b = R.call("TC-AUTH-018", "Register second customer (User B)", A, "POST", "/auth/register", 201,
              body={"fullName": "QA User B", "email": email("userb"), "password": PW})
tokB = b["token"]; label_token("USER_B token", tokB)
r, b = R.call("TC-AUTH-019", "Register third customer (later promoted to MODERATOR)", A, "POST", "/auth/register", 201,
              body={"fullName": "QA Moderator", "email": email("mod"), "password": PW})
tokM = b["token"]; label_token("MODERATOR token", tokM); modEmail = email("mod")
r, b = R.call("TC-AUTH-020", "Administrator login (bootstrap admin)", A, "POST", "/auth/login", 200,
              body={"email": env["ADMIN_EMAIL"], "password": env["ADMIN_PASSWORD"]},
              check=lambda r, b: (b.get("role") == "ADMIN", f"role={b.get('role')}"))
tokAdm = b["token"]; label_token("ADMIN token", tokAdm)

# ---------------------------------------------------------------- PROFILE
print("== Profile")
R.call("TC-API-001", "Get own profile with valid token", A, "GET", "/users/me", 200, token=tokA,
       check=lambda r, b: (b.get("email") == email("usera") and "passwordHash" not in b and "password" not in b,
                           f"email matches={b.get('email') == email('usera')}, fields={sorted(b.keys())}"))

# ---------------------------------------------------------------- RESTAURANTS / SEARCH / FILTER
print("== Restaurants, search, filters")
slugs = lambda b: sorted(x["slug"] for x in b)
R.call("TC-API-010", "List all restaurants", A, "GET", "/restaurants", 200,
       check=lambda r, b: (len(b) >= 5, f"count={len(b)} slugs={slugs(b)}"))
R.call("TC-API-011", "Search by name 'crab'", A, "GET", "/restaurants", 200, params={"q": "crab"},
       check=lambda r, b: (slugs(b) == ["ministry-of-crab"], f"slugs={slugs(b)}"))
R.call("TC-API-012", "Search is case-insensitive 'NUGA'", A, "GET", "/restaurants", 200, params={"q": "NUGA"},
       check=lambda r, b: (slugs(b) == ["nuga-gama"], f"slugs={slugs(b)}"))
R.call("TC-API-013", "Search matches location 'galle'", A, "GET", "/restaurants", 200, params={"q": "galle"},
       check=lambda r, b: (slugs(b) == ["pedlars-inn"], f"slugs={slugs(b)}"))
R.call("TC-API-014", "Search with no matches", A, "GET", "/restaurants", 200, params={"q": "zzqqxx"},
       check=lambda r, b: (b == [], f"count={len(b)}"))
R.call("TC-API-015", "Filter location=Kandy", A, "GET", "/restaurants", 200, params={"location": "Kandy"},
       check=lambda r, b: (len(b) >= 2 and all(x["location"] == "Kandy" for x in b), f"slugs={slugs(b)}"))
R.call("TC-API-016", "Filter cuisine=Seafood", A, "GET", "/restaurants", 200, params={"cuisine": "Seafood"},
       check=lambda r, b: (len(b) >= 1 and all("seafood" in x["cuisine"].lower() for x in b), f"slugs={slugs(b)}"))
R.call("TC-API-017", "Filter vegan=true", A, "GET", "/restaurants", 200, params={"vegan": "true"},
       check=lambda r, b: (len(b) >= 1 and all(x["vegan"] for x in b) and "ministry-of-crab" not in slugs(b),
                           f"slugs={slugs(b)}"))
R.call("TC-API-018", "Filter vegetarian=true", A, "GET", "/restaurants", 200, params={"vegetarian": "true"},
       check=lambda r, b: (all(x["vegetarian"] for x in b) and "ministry-of-crab" not in slugs(b), f"slugs={slugs(b)}"))
R.call("TC-API-019", "Filter halal=true", A, "GET", "/restaurants", 200, params={"halal": "true"},
       check=lambda r, b: (all(x["halal"] for x in b), f"slugs={slugs(b)}"))
R.call("TC-API-020", "Combined filters location=Colombo & vegan=true", A, "GET", "/restaurants", 200,
       params={"location": "Colombo", "vegan": "true"},
       check=lambda r, b: (slugs(b) == ["nuga-gama"], f"slugs={slugs(b)}"))
R.call("TC-API-021", "Invalid boolean filter vegetarian=abc", A, "GET", "/restaurants", 400,
       params={"vegetarian": "abc"}, expected_text="HTTP 400 (type mismatch)")
R.call("TC-API-022", "Top-rated restaurants (max 4, sorted by rating desc)", A, "GET", "/restaurants/top-rated", 200,
       check=lambda r, b: (len(b) <= 4 and [x["rating"] for x in b] == sorted([x["rating"] for x in b], reverse=True),
                           f"ratings={[x['rating'] for x in b]}"))
R.call("TC-API-023", "Restaurant details by slug", A, "GET", "/restaurants/ministry-of-crab", 200,
       check=lambda r, b: (b.get("name") == "Ministry of Crab", f"name={b.get('name')}"))
R.call("TC-API-024", "Restaurant details for non-existent slug", A, "GET", "/restaurants/does-not-exist", 404,
       expected_text="HTTP 404 Not Found")
R.call("TC-API-025", "Dishes for a restaurant", A, "GET", "/dishes", 200, params={"restaurant": "ministry-of-crab"},
       check=lambda r, b: (len(b) == 4 and all(x["restaurantSlug"] == "ministry-of-crab" for x in b), f"count={len(b)}"))
R.call("TC-API-026", "Dish details by slug", A, "GET", "/dishes/chilli-crab", 200,
       check=lambda r, b: (b.get("spiceLevel") == "Hot" and b.get("price") == 9500, f"spice={b.get('spiceLevel')} price={b.get('price')}"))
R.call("TC-API-027", "Dish details for non-existent slug", A, "GET", "/dishes/no-such-dish", 404)
R.call("TC-API-028", "Unsupported method DELETE /restaurants (authenticated user)", A, "DELETE", "/restaurants", 405,
       token=tokA, expected_text="HTTP 405 Method Not Allowed")
R.call("TC-API-029", "Unsupported method PUT /health", A, "PUT", "/health", 405, body={})

# ---------------------------------------------------------------- REVIEWS
print("== Reviews")
rv = lambda **kw: {"restaurantSlug": "nuga-gama", "foodRating": 4, "serviceRating": 5, "overallRating": 4,
                   "language": "en", "reviewText": "QA review: tasty rice and curry, friendly staff.", **kw}
r, b = R.call("TC-REV-001", "Submit valid review (authenticated)", A, "POST", "/reviews", 201, token=tokA, body=rv(),
              check=lambda r, b: (b.get("status") == "PENDING", f"status={b.get('status')} id={b.get('id')}"),
              expected_text="HTTP 201; review stored with status PENDING")
rev1 = b["id"]
R.call("TC-REV-002", "Submit review without authentication", S, "POST", "/reviews", 401, body=rv(),
       expected_text="HTTP 401 Unauthorized")
R.call("TC-REV-003", "Review with overall rating 0 (below range)", A, "POST", "/reviews", 400, token=tokA, body=rv(overallRating=0))
R.call("TC-REV-004", "Review with food rating 6 (above range)", A, "POST", "/reviews", 400, token=tokA, body=rv(foodRating=6))
R.call("TC-REV-005", "Review with ratings 1/1/1 (lower boundary)", A, "POST", "/reviews", 201, token=tokA,
       body=rv(foodRating=1, serviceRating=1, overallRating=1, reviewText="QA boundary review – minimum ratings."))
R.call("TC-REV-006", "Review with missing review text", A, "POST", "/reviews", 400, token=tokA,
       body={k: v for k, v in rv().items() if k != "reviewText"})
R.call("TC-REV-007", "Review with whitespace-only text", A, "POST", "/reviews", 400, token=tokA, body=rv(reviewText="    "))
R.call("TC-REV-008", "Review with ratings omitted", A, "POST", "/reviews", 400, token=tokA,
       body={"restaurantSlug": "nuga-gama", "language": "en", "reviewText": "No ratings supplied here."})
R.call("TC-REV-009", "Review with unsupported language 'fr'", A, "POST", "/reviews", 400, token=tokA, body=rv(language="fr"))
R.call("TC-REV-010", "Review for non-existent restaurant", A, "POST", "/reviews", 404, token=tokA,
       body=rv(restaurantSlug="no-such-restaurant"))
R.call("TC-REV-011", "Review with dish that belongs to another restaurant", A, "POST", "/reviews", 400, token=tokA,
       body=rv(restaurantSlug="nuga-gama", dishSlug="chilli-crab"))
R.call("TC-REV-012", "Review text 5001 chars (above max 5000)", A, "POST", "/reviews", 400, token=tokA,
       body=rv(reviewText="x" * 5001))
R.call("TC-REV-013", "Review text exactly 5000 chars (max boundary)", A, "POST", "/reviews", 201, token=tokA,
       body=rv(reviewText="y" * 5000), check=lambda r, b: (len(b.get("reviewText", "")) == 5000, f"stored length={len(b.get('reviewText',''))}"))
R.call("TC-REV-014", "Review with non-numeric rating 'five'", A, "POST", "/reviews", 400, token=tokA,
       body=rv(foodRating="five"))
r, b = R.call("TC-REV-015", "Sinhala review text stored and returned intact", A, "POST", "/reviews", 201, token=tokB,
              body=rv(restaurantSlug="ministry-of-crab", dishSlug="chilli-crab", language="si",
                      reviewText="රසවත් කකුළුවන් කෑම. සේවය ඉතා හොඳයි."),
              check=lambda r, b: (b.get("reviewText") == "රසවත් කකුළුවන් කෑම. සේවය ඉතා හොඳයි.", "Sinhala text round-trip exact"))
revSi = b["id"]
r, b = R.call("TC-REV-016", "Tamil review text stored and returned intact", A, "POST", "/reviews", 201, token=tokB,
              body=rv(restaurantSlug="ministry-of-crab", language="ta", reviewText="மிகவும் சுவையான உணவு. சேவை நன்றாக இருந்தது."),
              check=lambda r, b: (b.get("reviewText") == "மிகவும் சுவையான உணவு. சேவை நன்றாக இருந்தது.", "Tamil text round-trip exact"))
revTa = b["id"]
r, b = R.call("TC-SEC-020", "Mass assignment: review submitted with status=APPROVED", S, "POST", "/reviews", 201, token=tokB,
              body=rv(restaurantSlug="ministry-of-crab", status="APPROVED", moderatorNote="self-approved"),
              check=lambda r, b: (b.get("status") == "PENDING" and not b.get("moderatorNote"), f"status={b.get('status')} note={b.get('moderatorNote')}"),
              expected_text="HTTP 201 but status forced to PENDING (client status ignored)")
revMass = b["id"]
XSS = "<script>alert('xss-qa')</script><img src=x onerror=alert('xss-img')> QA XSS probe"
r, b = R.call("TC-SEC-030", "Stored XSS payload in review text (API layer)", S, "POST", "/reviews", 201, token=tokB,
              body=rv(restaurantSlug="nuga-gama", reviewText=XSS),
              expected_text="HTTP 201; text stored verbatim (output encoding must happen in UI – see TC-UI XSS test)")
revXss = b["id"]
R.call("TC-REV-017", "View own reviews (User A)", A, "GET", "/reviews/mine", 200, token=tokA,
       check=lambda r, b: (len(b) >= 3 and all(x["author"] == "QA User A" for x in b), f"count={len(b)} authors={sorted({x['author'] for x in b})}"))
R.call("TC-REV-018", "View own reviews without token", S, "GET", "/reviews/mine", 401)
R.call("TC-REV-019", "Public review list requires restaurant parameter", A, "GET", "/reviews", 400,
       expected_text="HTTP 400 (missing required parameter)")
R.call("TC-REV-020", "Pending review NOT visible in public list", A, "GET", "/reviews", 200, params={"restaurant": "nuga-gama"},
       check=lambda r, b: (rev1 not in [x["id"] for x in b], f"public ids={[x['id'] for x in b]} pending id={rev1}"))

# ---------------------------------------------------------------- MODERATION
print("== Moderation")
R.call("TC-MOD-001", "Admin lists pending reviews", A, "GET", "/admin/reviews", 200, token=tokAdm,
       check=lambda r, b: (rev1 in [x["id"] for x in b] and all(x["status"] == "PENDING" for x in b), f"count={len(b)}"))
R.call("TC-MOD-002", "Admin approves review", A, "PATCH", f"/admin/reviews/{rev1}", 200, token=tokAdm,
       body={"status": "APPROVED", "note": "QA approved"},
       check=lambda r, b: (b.get("status") == "APPROVED", f"status={b.get('status')}"))
R.call("TC-MOD-003", "Approved review visible in public list", A, "GET", "/reviews", 200, params={"restaurant": "nuga-gama"},
       check=lambda r, b: (rev1 in [x["id"] for x in b], f"public ids={[x['id'] for x in b]}"))
R.call("TC-MOD-004", "Admin rejects review", A, "PATCH", f"/admin/reviews/{revMass}", 200, token=tokAdm,
       body={"status": "REJECTED", "note": "QA rejected"}, check=lambda r, b: (b.get("status") == "REJECTED", f"status={b.get('status')}"))
R.call("TC-MOD-005", "Rejected review not visible in public list", A, "GET", "/reviews", 200, params={"restaurant": "ministry-of-crab"},
       check=lambda r, b: (revMass not in [x["id"] for x in b], f"public ids={[x['id'] for x in b]}"))
R.call("TC-MOD-006", "Moderate with invalid status 'DELETED'", A, "PATCH", f"/admin/reviews/{rev1}", 400, token=tokAdm,
       body={"status": "DELETED"})
R.call("TC-MOD-007", "Moderate non-existent review id", A, "PATCH", "/admin/reviews/999999", 404, token=tokAdm,
       body={"status": "APPROVED"})
R.call("TC-MOD-008", "Moderation note longer than 500 chars", A, "PATCH", f"/admin/reviews/{rev1}", 400, token=tokAdm,
       body={"status": "APPROVED", "note": "n" * 501})
R.call("TC-MOD-009", "Filter moderation queue by APPROVED", A, "GET", "/admin/reviews", 200, token=tokAdm, params={"status": "APPROVED"},
       check=lambda r, b: (all(x["status"] == "APPROVED" for x in b) and rev1 in [x["id"] for x in b], f"count={len(b)}"))
R.call("TC-MOD-010", "Moderation queue with invalid status filter", A, "GET", "/admin/reviews", 400, token=tokAdm, params={"status": "FOO"})
R.call("TC-MOD-011", "Own-review list shows moderation outcome to author", A, "GET", "/reviews/mine", 200, token=tokA,
       check=lambda r, b: (any(x["id"] == rev1 and x["status"] == "APPROVED" for x in b), "approved status visible to author"))
r0, b0 = R.call("TC-MOD-012a", "Restaurant rating/reviewCount before approval (baseline)", A, "GET", "/restaurants/ministry-of-crab", 200,
                check=lambda r, b: (True, f"rating={b['rating']} reviewCount={b['reviewCount']}"))
R.call("TC-MOD-012b", "Approve Sinhala 5/4/5 review for ministry-of-crab", A, "PATCH", f"/admin/reviews/{revSi}", 200, token=tokAdm,
       body={"status": "APPROVED"})
R.call("TC-MOD-012", "Approved review is reflected in restaurant reviewCount/rating", A, "GET", "/restaurants/ministry-of-crab", 200,
       check=lambda r, b: (b["reviewCount"] == b0["reviewCount"] + 1,
                           f"reviewCount before={b0['reviewCount']} after={b['reviewCount']}; rating before={b0['rating']} after={b['rating']}"),
       expected_text="HTTP 200; reviewCount increases by 1 and rating is recalculated after approval")
R.call("TC-MOD-013", "Approve Tamil review (for multilingual display test)", A, "PATCH", f"/admin/reviews/{revTa}", 200, token=tokAdm,
       body={"status": "APPROVED"})
R.call("TC-MOD-014", "Approve XSS-probe review (for UI output-encoding test)", A, "PATCH", f"/admin/reviews/{revXss}", 200, token=tokAdm,
       body={"status": "APPROVED"})

# ---------------------------------------------------------------- SAVED RESTAURANTS
print("== Saved restaurants")
R.call("TC-SAV-001", "Save restaurant", A, "POST", "/users/me/saved-restaurants/green-leaf-kitchen", 201, token=tokA,
       check=lambda r, b: (b.get("slug") == "green-leaf-kitchen", f"slug={b.get('slug')}"))
R.call("TC-SAV-002", "Save same restaurant again (idempotent)", A, "POST", "/users/me/saved-restaurants/green-leaf-kitchen", [200, 201],
       token=tokA)
R.call("TC-SAV-003", "List saved restaurants has no duplicate", A, "GET", "/users/me/saved-restaurants", 200, token=tokA,
       check=lambda r, b: ([x["slug"] for x in b].count("green-leaf-kitchen") == 1, f"slugs={[x['slug'] for x in b]}"))
R.call("TC-SAV-004", "Save non-existent restaurant", A, "POST", "/users/me/saved-restaurants/no-such-restaurant", 404, token=tokA)
R.call("TC-SAV-005", "Save restaurant without token", S, "POST", "/users/me/saved-restaurants/nuga-gama", 401)
R.call("TC-SEC-040", "Horizontal access: User B deletes a restaurant saved by User A", S, "DELETE",
       "/users/me/saved-restaurants/green-leaf-kitchen", 204, token=tokB,
       expected_text="HTTP 204 acting only on User B's own list (no effect on User A)")
R.call("TC-SEC-041", "User A's saved restaurant unaffected by User B action", S, "GET", "/users/me/saved-restaurants", 200, token=tokA,
       check=lambda r, b: ("green-leaf-kitchen" in [x["slug"] for x in b], f"User A slugs={[x['slug'] for x in b]}"))
R.call("TC-SEC-042", "User B cannot see User A's saved list", S, "GET", "/users/me/saved-restaurants", 200, token=tokB,
       check=lambda r, b: ("green-leaf-kitchen" not in [x["slug"] for x in b], f"User B slugs={[x['slug'] for x in b]}"))
R.call("TC-SEC-043", "User B's own-review list excludes User A's reviews", S, "GET", "/reviews/mine", 200, token=tokB,
       check=lambda r, b: (all(x["author"] == "QA User B" for x in b), f"authors={sorted({x['author'] for x in b})}"))
R.call("TC-SAV-006", "Remove saved restaurant", A, "DELETE", "/users/me/saved-restaurants/green-leaf-kitchen", 204, token=tokA)
R.call("TC-SAV-007", "Saved list empty after removal", A, "GET", "/users/me/saved-restaurants", 200, token=tokA,
       check=lambda r, b: ("green-leaf-kitchen" not in [x["slug"] for x in b], f"slugs={[x['slug'] for x in b]}"))

# ---------------------------------------------------------------- ADMIN RESTAURANT CRUD
print("== Admin restaurant CRUD")
rest = lambda **kw: {"slug": f"qa-rest-{RUN}", "name": "QA Test Bistro", "cuisine": "Sri Lankan · Fusion", "location": "Galle",
                     "priceMin": 1000, "priceMax": 2500, "vegetarian": True, "vegan": False, "halal": True,
                     "description": "Created by QA API test.", "imageColor": "#123456", **kw}
R.call("TC-ADM-000", "Admin dashboard stats", A, "GET", "/admin/dashboard", 200, token=tokAdm,
       check=has("restaurants", "dishes", "users", "pendingReviews", "approvedReviews"))
r, b = R.call("TC-ADM-001", "Create restaurant (valid)", A, "POST", "/admin/restaurants", 201, token=tokAdm, body=rest(),
              check=lambda r, b: (b.get("slug") == f"qa-rest-{RUN}" and b.get("rating") == 0, f"id={b.get('id')} rating={b.get('rating')}"))
restId = b["id"]
R.call("TC-ADM-002", "Created restaurant readable via public API", A, "GET", f"/restaurants/qa-rest-{RUN}", 200,
       check=lambda r, b: (b.get("name") == "QA Test Bistro", f"name={b.get('name')}"))
R.call("TC-ADM-003", "Create restaurant with duplicate slug", A, "POST", "/admin/restaurants", 409, token=tokAdm, body=rest())
R.call("TC-ADM-004", "Create restaurant with invalid slug 'Bad Slug!'", A, "POST", "/admin/restaurants", 400, token=tokAdm,
       body=rest(slug="Bad Slug!"))
R.call("TC-ADM-005", "Create restaurant missing name/cuisine/location", A, "POST", "/admin/restaurants", 400, token=tokAdm,
       body={"slug": f"qa-missing-{RUN}", "priceMin": 1, "priceMax": 2})
R.call("TC-ADM-006", "Create restaurant with negative price", A, "POST", "/admin/restaurants", 400, token=tokAdm,
       body=rest(slug=f"qa-neg-{RUN}", priceMin=-5))
r, b = R.call("TC-ADM-007", "Create restaurant with priceMin > priceMax", A, "POST", "/admin/restaurants", 400, token=tokAdm,
              body=rest(slug=f"qa-inverted-{RUN}", priceMin=9000, priceMax=100),
              expected_text="HTTP 400 (minimum price must not exceed maximum price)")
invertedId = b.get("id") if isinstance(b, dict) else None
R.call("TC-ADM-008", "Create restaurant with invalid colour 'red'", A, "POST", "/admin/restaurants", 400, token=tokAdm,
       body=rest(slug=f"qa-colour-{RUN}", imageColor="red"))
R.call("TC-ADM-009", "Update restaurant (valid)", A, "PUT", f"/admin/restaurants/{restId}", 200, token=tokAdm,
       body=rest(name="QA Test Bistro Updated", location="Kandy"),
       check=lambda r, b: (b.get("name") == "QA Test Bistro Updated" and b.get("location") == "Kandy", f"name={b.get('name')} location={b.get('location')}"))
R.call("TC-ADM-010", "Update persisted (read back)", A, "GET", f"/restaurants/qa-rest-{RUN}", 200,
       check=lambda r, b: (b.get("name") == "QA Test Bistro Updated", f"name={b.get('name')}"))
R.call("TC-ADM-011", "Update restaurant to slug already used by another restaurant", A, "PUT", f"/admin/restaurants/{restId}", 409,
       token=tokAdm, body=rest(slug="nuga-gama"), expected_text="HTTP 409 Conflict (slug already exists)")
R.call("TC-ADM-012", "Update non-existent restaurant", A, "PUT", "/admin/restaurants/999999", 404, token=tokAdm,
       body=rest(slug=f"qa-ghost-{RUN}"))
R.call("TC-ADM-013", "Update restaurant with non-numeric id", A, "PUT", "/admin/restaurants/abc", 400, token=tokAdm, body=rest())
R.call("TC-ADM-014", "Malformed JSON body (authenticated admin)", A, "POST", "/admin/restaurants", 400, token=tokAdm,
       raw='{"slug": "broken", "name": ', headers={"Content-Type": "application/json"})
R.call("TC-ADM-015", "Unsupported content type text/plain", A, "POST", "/admin/restaurants", 415, token=tokAdm,
       raw="slug=x", headers={"Content-Type": "text/plain"})

# ---------------------------------------------------------------- ADMIN DISH CRUD
print("== Admin dish CRUD")
dish = lambda **kw: {"restaurantSlug": f"qa-rest-{RUN}", "slug": f"qa-dish-{RUN}", "name": "QA Hoppers", "description": "Egg hoppers.",
                     "price": 850, "spiceLevel": "Mild", "vegetarian": True, "halal": True, "imageColor": "#aa5500", **kw}
r, b = R.call("TC-ADM-020", "Create dish (valid)", A, "POST", "/admin/dishes", 201, token=tokAdm, body=dish(),
              check=lambda r, b: (b.get("restaurantSlug") == f"qa-rest-{RUN}", f"id={b.get('id')}"))
dishId = b["id"]
R.call("TC-ADM-021", "Created dish appears in restaurant menu", A, "GET", "/dishes", 200, params={"restaurant": f"qa-rest-{RUN}"},
       check=lambda r, b: (f"qa-dish-{RUN}" in [x["slug"] for x in b], f"slugs={[x['slug'] for x in b]}"))
R.call("TC-ADM-022", "Create dish with duplicate slug", A, "POST", "/admin/dishes", 409, token=tokAdm, body=dish())
R.call("TC-ADM-023", "Create dish for unknown restaurant", A, "POST", "/admin/dishes", 404, token=tokAdm,
       body=dish(slug=f"qa-dish2-{RUN}", restaurantSlug="no-such-restaurant"))
R.call("TC-ADM-024", "Create dish with invalid spice level 'Extreme'", A, "POST", "/admin/dishes", 400, token=tokAdm,
       body=dish(slug=f"qa-dish3-{RUN}", spiceLevel="Extreme"))
R.call("TC-ADM-025", "Create dish with negative price", A, "POST", "/admin/dishes", 400, token=tokAdm,
       body=dish(slug=f"qa-dish4-{RUN}", price=-1))
R.call("TC-ADM-026", "Update dish (price and spice)", A, "PUT", f"/admin/dishes/{dishId}", 200, token=tokAdm,
       body=dish(price=990, spiceLevel="Hot"), check=lambda r, b: (b.get("price") == 990 and b.get("spiceLevel") == "Hot", f"price={b.get('price')} spice={b.get('spiceLevel')}"))
R.call("TC-ADM-027", "Dish update persisted (read back)", A, "GET", f"/dishes/qa-dish-{RUN}", 200,
       check=lambda r, b: (b.get("price") == 990, f"price={b.get('price')}"))
R.call("TC-ADM-028", "Update dish to slug used by another dish", A, "PUT", f"/admin/dishes/{dishId}", 409, token=tokAdm,
       body=dish(slug="chilli-crab"), expected_text="HTTP 409 Conflict (slug already exists)")
R.call("TC-ADM-029", "Update non-existent dish", A, "PUT", "/admin/dishes/999999", 404, token=tokAdm, body=dish(slug=f"qa-x-{RUN}"))
R.call("TC-ADM-030", "Delete non-existent dish", A, "DELETE", "/admin/dishes/999999", 404, token=tokAdm)
R.call("TC-ADM-031", "Delete dish", A, "DELETE", f"/admin/dishes/{dishId}", 204, token=tokAdm)
R.call("TC-ADM-032", "Deleted dish no longer readable", A, "GET", f"/dishes/qa-dish-{RUN}", 404)

# delete restaurant: one with no reviews, one with a review
R.call("TC-ADM-033", "Delete non-existent restaurant", A, "DELETE", "/admin/restaurants/999999", 404, token=tokAdm)
r, b = R.call("TC-ADM-034a", "Setup: dish on QA restaurant for cascade check", A, "POST", "/admin/dishes", 201, token=tokAdm,
              body=dish(slug=f"qa-dish-cascade-{RUN}"))
R.call("TC-ADM-034", "Delete restaurant without reviews (dishes cascade)", A, "DELETE", f"/admin/restaurants/{restId}", 204, token=tokAdm)
R.call("TC-ADM-035", "Deleted restaurant no longer readable", A, "GET", f"/restaurants/qa-rest-{RUN}", 404)
R.call("TC-ADM-036", "Child dish removed with restaurant (cascade)", A, "GET", f"/dishes/qa-dish-cascade-{RUN}", 404)
r, b = R.call("TC-ADM-037a", "Setup: second QA restaurant", A, "POST", "/admin/restaurants", 201, token=tokAdm,
              body=rest(slug=f"qa-rest2-{RUN}", name="QA Reviewed Cafe"))
rest2Id = b["id"]
R.call("TC-ADM-037b", "Setup: customer review on second QA restaurant", A, "POST", "/reviews", 201, token=tokA,
       body=rv(restaurantSlug=f"qa-rest2-{RUN}", reviewText="QA review on a restaurant that will be deleted."))
R.call("TC-ADM-037", "Delete restaurant that has customer reviews", A, "DELETE", f"/admin/restaurants/{rest2Id}", [204, 409], token=tokAdm,
       expected_text="HTTP 204 (restaurant and dependent data removed) or HTTP 409 with an explanatory message; never a 5xx")

# ---------------------------------------------------------------- AUTHORIZATION / SECURITY
print("== Authorization & token security")
R.call("TC-SEC-001", "Protected endpoint without token (/users/me)", S, "GET", "/users/me", 401, expected_text="HTTP 401 Unauthorized")
R.call("TC-SEC-002", "Malformed bearer token", S, "GET", "/users/me", 401, headers={"Authorization": "Bearer not.a.jwt"})
tampered = tokA[:-4] + ("AAAA" if not tokA.endswith("AAAA") else "BBBB")
label_token("USER_A token with tampered signature", tampered)
R.call("TC-SEC-003", "Token with tampered signature", S, "GET", "/users/me", 401, token=tampered)


def b64(d):
    return base64.urlsafe_b64encode(d).rstrip(b"=").decode()


def forge(sub, role, exp_offset, secret=b"change-this-development-secret-before-production-32-bytes-minimum"):
    now = int(time.time())
    h = b64(json.dumps({"alg": "HS256"}).encode())
    p = b64(json.dumps({"sub": sub, "role": role, "iat": now, "exp": now + exp_offset}).encode())
    s = b64(hmac.new(secret, f"{h}.{p}".encode(), hashlib.sha256).digest())
    return f"{h}.{p}.{s}"


expired = forge(email("usera"), "USER", -60)
label_token("expired token (exp in past)", expired)
R.call("TC-SEC-004", "Expired token rejected", S, "GET", "/users/me", 401, token=expired)
forged = forge(env["ADMIN_EMAIL"], "ADMIN", 3600)
label_token("token forged offline with the default JWT secret from application.yml", forged)
R.call("TC-SEC-005", "Forged admin token signed with default JWT secret (JWT_SECRET not set, as in README run steps)", S,
       "GET", "/admin/dashboard", [401, 403], token=forged,
       expected_text="HTTP 401/403 – tokens not issued by the server must be rejected")
R.call("TC-SEC-006", "INFO: previously issued token still accepted (logout is client-side only; no revocation endpoint)", S, "GET", "/users/me", 200, token=tokA,
       expected_text="Informational observation – records actual behaviour; no logout/revocation requirement exists")
R.call("TC-SEC-010", "Customer accesses admin dashboard", S, "GET", "/admin/dashboard", 403, token=tokA)
R.call("TC-SEC-011", "Customer creates restaurant via admin API", S, "POST", "/admin/restaurants", 403, token=tokA,
       body=rest(slug=f"qa-hack-{RUN}"))
R.call("TC-SEC-012", "Customer deletes restaurant via admin API", S, "DELETE", "/admin/restaurants/1", 403, token=tokA)
R.call("TC-SEC-013", "Customer moderates (self-approves) a review", S, "PATCH", f"/admin/reviews/{revXss}", 403, token=tokB,
       body={"status": "APPROVED"})
R.call("TC-SEC-014", "Customer deletes dish via admin API", S, "DELETE", "/admin/dishes/1", 403, token=tokA)
R.call("TC-SEC-015", "Restaurant id 1 intact after unauthorized delete attempt", S, "GET", "/admin/restaurants", 200, token=tokAdm,
       check=lambda r, b: (1 in [x["id"] for x in b], "restaurant id 1 still present"))
R.call("TC-SEC-016", "Anonymous access to admin dashboard", S, "GET", "/admin/dashboard", 401,
       expected_text="HTTP 401 Unauthorized (not authenticated)")
R.call("TC-SEC-017", "Anonymous delete restaurant", S, "DELETE", "/admin/restaurants/1", 401)
R.call("TC-SEC-021", "SQL injection probe in search q", S, "GET", "/restaurants", 200, params={"q": "' OR '1'='1"},
       check=lambda r, b: (b == [], f"rows returned={len(b)}"), expected_text="HTTP 200 and empty list (input treated as literal)")
R.call("TC-SEC-022", "SQL injection probe in location filter", S, "GET", "/restaurants", 200,
       params={"location": "Colombo' OR 1=1 -- "}, check=lambda r, b: (b == [], f"rows returned={len(b)}"))
R.call("TC-SEC-023", "SQL injection probe in login email", S, "POST", "/auth/login", [400, 401],
       body={"email": "' OR 1=1 -- @x.com", "password": "x"}, expected_text="HTTP 400/401; no authentication")
R.call("TC-SEC-024", "SQL injection probe in restaurant slug path", S, "GET", "/restaurants/x' OR '1'='1", 404)
R.call("TC-SEC-025", "Oversized search query (10,000 chars)", S, "GET", "/restaurants", [200, 400, 414],
       params={"q": "a" * 10000}, expected_text="Handled without 5xx")
R.call("TC-SEC-026", "Malformed JSON on public login endpoint", S, "POST", "/auth/login", 400, raw="{bad json",
       headers={"Content-Type": "application/json"})
R.call("TC-SEC-027", "Public review list does not leak emails", S, "GET", "/reviews", 200, params={"restaurant": "nuga-gama"},
       check=lambda r, b: ("@" not in json.dumps(b), "no email addresses in payload"))
cors_origin = "https://evil.example"
R.call("TC-SEC-050", "CORS preflight from untrusted origin", S, "OPTIONS", "/users/me", [403],
       headers={"Origin": cors_origin, "Access-Control-Request-Method": "GET"},
       check=lambda r, b: ("Access-Control-Allow-Origin" not in r.headers, f"ACAO={r.headers.get('Access-Control-Allow-Origin')}"),
       expected_text="Preflight rejected; no Access-Control-Allow-Origin for untrusted origin")
R.call("TC-SEC-051", "CORS preflight from configured frontend origin", S, "OPTIONS", "/users/me", 200,
       headers={"Origin": "http://localhost:3000", "Access-Control-Request-Method": "GET"},
       check=lambda r, b: (r.headers.get("Access-Control-Allow-Origin") == "http://localhost:3000", f"ACAO={r.headers.get('Access-Control-Allow-Origin')}"))
fails = []
for i in range(10):
    import requests as _rq
    fails.append(_rq.post(os.environ.get("API", "http://localhost:8080/api/v1") + "/auth/login",
                          json={"email": email("userb"), "password": f"wrong-{i}"}).status_code)
R.call("TC-SEC-060", "Login succeeds immediately after 10 consecutive failed attempts (no lockout/throttling)", S, "POST",
       "/auth/login", 200, body={"email": email("userb"), "password": PW},
       check=lambda r, b: (True, f"preceding 10 failed-attempt statuses={sorted(set(fails))}"),
       expected_text="Informational: records whether brute-force protection exists")

R.save()
ctx = {"run": RUN, "userA": email("usera"), "userB": email("userb"), "moderator": modEmail, "password": "see scripts (test value)",
       "reviewPendingOrApproved": rev1, "reviewSinhala": revSi, "reviewTamil": revTa, "reviewXss": revXss,
       "reviewRejected": revMass, "restaurantWithReviews": rest2Id, "restaurantWithReviewsSlug": f"qa-rest2-{RUN}",
       "invertedPriceRestaurantId": invertedId}
with open(os.path.join(ROOT, "evidence", "run-context.json"), "w", encoding="utf-8") as fh:
    json.dump(ctx, fh, indent=2)
