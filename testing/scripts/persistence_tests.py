"""Phase 7: persistence across an API restart.

Usage:  python persistence_tests.py pre    (make changes, then restart the API)
        python persistence_tests.py post   (verify after restart)
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from qa_lib import ROOT, Runner, label_token, load_env  # noqa: E402

env = load_env()
phase = sys.argv[1]
ctx_path = os.path.join(ROOT, "evidence", "run-context.json")
ctx = json.load(open(ctx_path, encoding="utf-8"))
R = Runner(f"persistence-{phase}")
D = "database"
PW = "QaUser#2026pw"
r, b = R.call(f"TC-DATA-{phase}-login", "Admin login", D, "POST", "/auth/login", 200,
              body={"email": env["ADMIN_EMAIL"], "password": env["ADMIN_PASSWORD"]}, quiet=True)
adm = b["token"]; label_token("ADMIN token", adm)
r, b = R.call(f"TC-DATA-{phase}-loginA", "User A login", D, "POST", "/auth/login", 200,
              body={"email": ctx["userA"], "password": PW}, quiet=True)
tokA = b["token"]; label_token("USER_A token", tokA)
slug = f"qa-persist-{ctx['run']}"
EDIT = f"QA-EDITED description {ctx['run']}"

if phase == "pre":
    rest = {"slug": slug, "name": "QA Persistence Diner", "cuisine": "Sri Lankan", "location": "Colombo", "priceMin": 500,
            "priceMax": 900, "vegetarian": False, "vegan": False, "halal": False, "description": "persistence check"}
    R.call("TC-DATA-001a", "Create restaurant before restart", D, "POST", "/admin/restaurants", 201, token=adm, body=rest)
    r, b = R.call("TC-DATA-002a", "Read seeded restaurant nuga-gama", D, "GET", "/restaurants/nuga-gama", 200)
    seeded = b
    body = {k: seeded[k] for k in ("slug", "name", "cuisine", "location", "priceMin", "priceMax", "vegetarian", "vegan", "halal", "imageColor")}
    body.update(description=EDIT, priceMin=3500)
    R.call("TC-DATA-002b", "Admin edits seeded restaurant nuga-gama (description, priceMin=3500)", D, "PUT",
           f"/admin/restaurants/{seeded['id']}", 200, token=adm, body=body,
           check=lambda r, b: (b["description"] == EDIT and b["priceMin"] == 3500, f"description={b['description']!r} priceMin={b['priceMin']}"))
    r, b = R.call("TC-DATA-003a", "Find seeded dish seafood-kottu", D, "GET", "/dishes/seafood-kottu", 200)
    R.call("TC-DATA-003b", "Admin deletes seeded dish seafood-kottu", D, "DELETE", f"/admin/dishes/{b['id']}", 204, token=adm)
    R.call("TC-DATA-004a", "User A saves restaurant before restart", D, "POST", "/users/me/saved-restaurants/pedlars-inn", 201, token=tokA)
else:
    R.call("TC-DATA-001", "Restaurant created before restart still exists", D, "GET", f"/restaurants/{slug}", 200,
           check=lambda r, b: (b["name"] == "QA Persistence Diner", f"name={b['name']}"))
    R.call("TC-DATA-002", "Admin edit to seeded restaurant survives restart", D, "GET", "/restaurants/nuga-gama", 200,
           check=lambda r, b: (b["description"] == EDIT and b["priceMin"] == 3500,
                               f"description after restart={b['description']!r}; priceMin={b['priceMin']}"),
           expected_text=f"HTTP 200; description={EDIT!r}, priceMin=3500")
    R.call("TC-DATA-003", "Seeded dish deleted by admin stays deleted after restart", D, "GET", "/dishes/seafood-kottu", [403, 404],
           expected_text="Dish not found (HTTP 404; API currently masks as 403 – DEF-001)")
    R.call("TC-DATA-004", "Saved restaurant persists after restart", D, "GET", "/users/me/saved-restaurants", 200, token=tokA,
           check=lambda r, b: ("pedlars-inn" in [x["slug"] for x in b], f"slugs={[x['slug'] for x in b]}"))
    R.call("TC-DATA-005", "Reviews and moderation status persist after restart", D, "GET", "/reviews/mine", 200, token=tokA,
           check=lambda r, b: (any(x["id"] == ctx["reviewPendingOrApproved"] and x["status"] == "APPROVED" for x in b),
                               f"review {ctx['reviewPendingOrApproved']} status={[x['status'] for x in b if x['id'] == ctx['reviewPendingOrApproved']]}"))
    R.call("TC-DATA-006", "Previously issued JWT still valid after restart (stateless, same secret)", D, "GET", "/users/me", 200, token=tokA)
    R.call("TC-DATA-007", "Unicode (Sinhala) review text intact after restart", D, "GET", "/reviews", 200,
           params={"restaurant": "ministry-of-crab"},
           check=lambda r, b: (any(x["id"] == ctx["reviewSinhala"] and x["reviewText"] == "රසවත් කකුළුවන් කෑම. සේවය ඉතා හොඳයි." for x in b),
                               "Sinhala text byte-identical after restart"))
R.save()
