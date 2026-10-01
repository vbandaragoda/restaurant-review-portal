"""Phase 8: response-time measurement of key API operations (sequential, single client, local environment).
No thresholds are defined in the test plan, so results are reported, not judged."""
import csv, json, statistics, time, requests, sys, os
API = "http://localhost:8080/api/v1"; N = 50; WARM = 5
OUT = os.environ["QA_OUT"]
ctx = json.load(open(os.path.join(OUT, "evidence", "run-context.json")))
tok = requests.post(API + "/auth/login", json={"email": ctx["userA"], "password": "QaUser#2026pw"}).json()["token"]
H = {"Authorization": "Bearer " + tok}
cases = [
 ("PERF-001", "Restaurant listing", "GET", "/restaurants", {}, None, None),
 ("PERF-002", "Search q=crab", "GET", "/restaurants", {"q": "crab"}, None, None),
 ("PERF-003", "Filter location=Kandy&vegan=true", "GET", "/restaurants", {"location": "Kandy", "vegan": "true"}, None, None),
 ("PERF-004", "Top-rated", "GET", "/restaurants/top-rated", {}, None, None),
 ("PERF-005", "Restaurant details", "GET", "/restaurants/ministry-of-crab", {}, None, None),
 ("PERF-006", "Restaurant menu (dishes)", "GET", "/dishes", {"restaurant": "ministry-of-crab"}, None, None),
 ("PERF-007", "Public approved reviews", "GET", "/reviews", {"restaurant": "ministry-of-crab"}, None, None),
 ("PERF-008", "Own reviews (auth)", "GET", "/reviews/mine", {}, None, H),
 ("PERF-009", "Profile (auth)", "GET", "/users/me", {}, None, H),
 ("PERF-010", "Login (bcrypt)", "POST", "/auth/login", {}, {"email": ctx["userA"], "password": "QaUser#2026pw"}, None),
 ("PERF-011", "Submit review (auth, write)", "POST", "/reviews", {}, {"restaurantSlug": "pedlars-inn", "foodRating": 4, "serviceRating": 4, "overallRating": 4, "language": "en", "reviewText": "QA performance sample review"}, H),
]
rows = []
for cid, name, m, path, params, body, hdr in cases:
    n = 10 if cid == "PERF-011" else N
    for _ in range(0 if cid == "PERF-011" else WARM):
        requests.request(m, API + path, params=params, json=body, headers=hdr)
    t, codes = [], set()
    for _ in range(n):
        s = time.perf_counter(); r = requests.request(m, API + path, params=params, json=body, headers=hdr); t.append((time.perf_counter() - s) * 1000); codes.add(r.status_code)
    t.sort()
    row = {"ID": cid, "Operation": name, "Method": m, "Endpoint": path, "Samples": n, "Statuses": "/".join(map(str, sorted(codes))),
           "Min ms": round(t[0], 1), "Median ms": round(statistics.median(t), 1), "P95 ms": round(t[int(0.95 * (n - 1))], 1), "Max ms": round(t[-1], 1)}
    rows.append(row); print(row)
os.makedirs(os.path.join(OUT, "evidence", "performance"), exist_ok=True)
with open(os.path.join(OUT, "evidence", "performance", "PERF-api-response-times.csv"), "w", newline="", encoding="utf-8") as fh:
    w = csv.DictWriter(fh, fieldnames=rows[0].keys()); w.writeheader(); w.writerows(rows)
print("executed at", time.strftime("%Y-%m-%d %H:%M:%S"))
