## Appendix A — Evidence
All items below are reproduced from the evidence files catalogued in `evidence-index.csv`. Screenshots come from the final exclusive Playwright run (Microsoft Edge 154, 1440×900 unless stated); they are downscaled copies, and very tall pages are cropped to their top portion. API excerpts are the recorded request/response of the executed test (passwords and tokens redacted at capture time).

### A.1 Baseline black-box tests (BB)

![EVID-239 · BB-01 PASS · new account lands on profile showing name and e-mail — source: evidence/ui/BB-01-registration-success-profile.png](report-figures/BB-01-registration-success-profile.jpg)

![EVID-240 · BB-02 PASS · mismatched passwords rejected with message — source: evidence/ui/BB-02a-registration-password-mismatch.png](report-figures/BB-02a-registration-password-mismatch.jpg)

![EVID-241 · BB-02 PASS · duplicate e-mail rejected with message — source: evidence/ui/BB-02b-registration-duplicate-email.png](report-figures/BB-02b-registration-duplicate-email.jpg)

![EVID-244 · BB-04 PASS · wrong password rejected: 'Invalid email or password.' — source: evidence/ui/BB-04-login-invalid-password.png](report-figures/BB-04-login-invalid-password.jpg)

![EVID-245 · BB-03/BB-05 PASS · authenticated profile with reviews and saved sections — source: evidence/ui/BB-05-profile.png](report-figures/BB-05-profile.jpg)

![EVID-247 · BB-07 PASS · search 'crab' returns 1 matching restaurant — source: evidence/ui/BB-07-search-crab.png](report-figures/BB-07-search-crab.jpg)

![EVID-248 · BB-08a PASS · Kandy + Vegan filter returns 2 restaurants — source: evidence/ui/BB-08a-filter-kandy-vegan.png](report-figures/BB-08a-filter-kandy-vegan.jpg)

![EVID-250 · BB-08c FAIL (DEF-009) · cuisine=Seafood link still lists all restaurants (top of full-page screenshot shown) — source: evidence/ui/BB-08c-cuisine-link-seafood.png](report-figures/BB-08c-cuisine-link-seafood.jpg)

![EVID-251 · BB-09 PASS · restaurant details and menu (top of full-page screenshot shown) — source: evidence/ui/BB-09a-restaurant-details-menu.png](report-figures/BB-09a-restaurant-details-menu.jpg)

![EVID-252 · BB-09 PASS · dish details: price LKR 9,500, spice Hot — source: evidence/ui/BB-09b-dish-details.png](report-figures/BB-09b-dish-details.jpg)

![EVID-253 · BB-10 PASS · review accepted, pending moderation — source: evidence/ui/BB-10-review-submitted.png](report-figures/BB-10-review-submitted.jpg)

![EVID-254 · BB-11 PASS · review text under 10 characters blocked — source: evidence/ui/BB-11a-review-too-short.png](report-figures/BB-11a-review-too-short.jpg)

![EVID-255 · BB-12 PASS · own review listed with PENDING status — source: evidence/ui/BB-12-own-reviews-pending.png](report-figures/BB-12-own-reviews-pending.jpg)

![EVID-257 · BB-13 PASS · approved review moves to APPROVED tab (top of full-page screenshot shown) — source: evidence/ui/BB-13b-moderation-approved-tab.png](report-figures/BB-13b-moderation-approved-tab.jpg)

![EVID-258 · BB-13 PASS · public page shows the approved review only (top of full-page screenshot shown) — source: evidence/ui/BB-13c-public-page-shows-only-approved.png](report-figures/BB-13c-public-page-shows-only-approved.jpg)

![EVID-197 · BB-14 PASS · customer redirected away from /admin — source: evidence/security/BB-14a-customer-denied-admin-ui.png](report-figures/BB-14a-customer-denied-admin-ui.jpg)

![EVID-198 · BB-14 PASS · role forged in browser storage: API refuses admin data — source: evidence/security/BB-14c-forged-client-role-no-data.png](report-figures/BB-14c-forged-client-role-no-data.jpg)

![EVID-260 · BB-15 PASS · admin created restaurant listed — source: evidence/ui/BB-15a-restaurant-created.png](report-figures/BB-15a-restaurant-created.jpg)

![EVID-261 · BB-15 PASS · admin update (rename, Galle) reflected — source: evidence/ui/BB-15b-restaurant-updated.png](report-figures/BB-15b-restaurant-updated.jpg)

![EVID-264 · BB-16 PASS · admin-created dish appears on public menu (top of full-page screenshot shown) — source: evidence/ui/BB-16b-dish-updated-visible-on-menu.png](report-figures/BB-16b-dish-updated-visible-on-menu.jpg)

![EVID-312 · BB-18 mobile PASS · 375 px home, no horizontal overflow (top of full-page screenshot shown) — source: evidence/ui/responsive/BB-18-mobile-home.png](report-figures/BB-18-mobile-home.jpg)

![EVID-321 · BB-18 tablet FAIL (DEF-013) · 768 px listing: collapsed cards, 153 px overflow (top of full-page screenshot shown) — source: evidence/ui/responsive/BB-18-tablet-restaurants.png](report-figures/BB-18-tablet-restaurants.jpg)

![EVID-323 · BB-18c FAIL (DEF-012) · 375 px listing without any filter controls (top of full-page screenshot shown) — source: evidence/ui/responsive/BB-18c-mobile-restaurants-no-filters.png](report-figures/BB-18c-mobile-restaurants-no-filters.jpg)

![EVID-266 · BB-19a PASS · approved Sinhala and Tamil reviews rendered (top of full-page screenshot shown) — source: evidence/ui/BB-19a-sinhala-tamil-reviews.png](report-figures/BB-19a-sinhala-tamil-reviews.jpg)

![EVID-269 · BB-20c PASS · visible focus on Log In button — source: evidence/ui/BB-20c-focus-indicator-login-button.png](report-figures/BB-20c-focus-indicator-login-button.jpg)

**EVID-268 · BB-20a FAIL (DEF-017, DEF-018) — axe-core WCAG 2.1 A/AA results**

| Page | Rule | Impact | Nodes | Example element |
|---|---|---|---|---|
| home | color-contrast | serious | 12 | `.gap-\[30px\] > .text-brand.font-semibold[href="/"]` |
| restaurants | color-contrast | serious | 29 | `.gap-\[30px\] > .text-brand[href$="restaurants"]` |
| restaurants | select-name | critical | 2 | `form > select` |
| restaurant-details | color-contrast | serious | 7 | `.gap-\[30px\] > .text-brand[href$="restaurants"]` |
| dish-details | color-contrast | serious | 5 | `.gap-\[30px\] > .text-brand.font-semibold[href$="restaurants` |
| login | color-contrast | serious | 3 | `a[href$="contact"]` |
| signup | color-contrast | serious | 2 | `.mt-4` |
| review-form | color-contrast | serious | 3 | `.text-brand[href$="nuga-gama"]` |
| profile | color-contrast | serious | 1 | `.mt-9` |
| admin-dashboard | color-contrast | serious | 5 | `.rounded-xl.p-6[href$="restaurants"] > .mt-5.text-xs.text-br` |
| admin-reviews | color-contrast | serious | 1 | `.bg-brand.text-white.rounded-full` |

**EVID-167 · BB-17 / TC-DATA-002 — database BEFORE API restart (admin edit applied, seeded dish deleted)** — source: evidence/database/TC-DATA-db-snapshot-before-restart.txt

```
| snapshot_time       |
| 2026-09-30 19:10:36 |
|  4 | nuga-gama          |      3500 | QA-EDITED description 190512                  |
```

**EVID-166 · BB-17 / TC-DATA-002/003 FAIL (DEF-008) — database AFTER restart (edit reverted, dish re-created as id 10)** — source: evidence/database/TC-DATA-db-snapshot-after-restart.txt

```
| snapshot_time       |
| 2026-09-30 19:11:29 |
|  4 | nuga-gama          |      3000 | Traditional Sri Lankan dining with local cuis |
| 10 | seafood-kottu        |             1 |
```

### A.2 Dry runs (DR)

![EVID-176 · DR-01 PASS · new user reaches restaurant details after search/filter (top of full-page screenshot shown) — source: evidence/dry-runs/DR-01-step5-restaurant-details.png](report-figures/DR-01-step5-restaurant-details.jpg)

![EVID-179 · DR-02 PASS · review approved by admin is publicly visible (4 stars) (top of full-page screenshot shown) — source: evidence/dry-runs/DR-02-step6-review-public.png](report-figures/DR-02-step6-review-public.jpg)

![EVID-180 · DR-03 PASS · saved restaurant shown on profile — source: evidence/dry-runs/DR-03-step4-profile-saved.png](report-figures/DR-03-step4-profile-saved.jpg)

![EVID-183 · DR-04 PASS · admin price update visible on public page — source: evidence/dry-runs/DR-04-step4-updated-public-page.png](report-figures/DR-04-step4-updated-public-page.jpg)

![EVID-184 · DR-05 PASS · admin dish price update visible (LKR 1,250) — source: evidence/dry-runs/DR-05-step4-dish-updated.png](report-figures/DR-05-step4-dish-updated.jpg)

![EVID-186 · DR-06 PASS · author sees APPROVED and REJECTED outcomes — source: evidence/dry-runs/DR-06-step4-author-profile-statuses.png](report-figures/DR-06-step4-author-profile-statuses.jpg)

![EVID-188 · DR-07 PASS · Sinhala/Tamil content readable (top of full-page screenshot shown) — source: evidence/dry-runs/DR-07-step4-si-ta-reviews-rendered.png](report-figures/DR-07-step4-si-ta-reviews-rendered.jpg)

**EVID-342 · Dry-run step log (timestamps from the final run)** — source: evidence/ui/ui-step-log.txt

```
2026-09-30T14:54:30.141Z	DR-01	1 registered and landed on profile
2026-09-30T14:54:32.240Z	DR-01	2 logged in again
2026-09-30T14:54:32.712Z	DR-01	3 browsed listing
2026-09-30T14:54:34.194Z	DR-01	4 searched 'Sri Lankan' + Colombo filter -> Nuga Gama listed
2026-09-30T14:54:35.090Z	DR-01	5 restaurant details displayed — journey complete
2026-09-30T14:54:40.624Z	DR-02	3 review submitted (overall 4 stars) -> pending message
2026-09-30T14:54:41.258Z	DR-02	4 review not public while pending
2026-09-30T14:55:11.263Z	DR-02	5 admin approved
2026-09-30T14:55:14.683Z	DR-02	6 approved review visible publicly with 4 stars
2026-09-30T14:55:14.765Z	DR-02	7 restaurant aggregate after approval: rating=4.5 reviewCount=490 (seed values 4.5/490)
2026-09-30T14:55:18.137Z	DR-03	3 saved The Empire Cafe
2026-09-30T14:55:18.811Z	DR-03	4 profile lists saved restaurant
2026-09-30T14:55:19.262Z	DR-03	5 opened saved restaurant from profile
2026-09-30T14:55:20.887Z	DR-03	6 removed; profile shows empty state after reload
2026-09-30T14:55:22.994Z	DR-04	2 dashboard shown
2026-09-30T14:55:24.034Z	DR-04	3 created
2026-09-30T14:55:25.393Z	DR-04	4 updated; public page shows LKR 1,200–2,600
2026-09-30T14:55:26.431Z	DR-04	5 deleted; absent after reload
2026-09-30T14:55:29.791Z	DR-05	3 dish created for Green Leaf Kitchen
2026-09-30T14:55:31.252Z	DR-05	4 updated; dish page shows LKR 1,250
2026-09-30T14:55:32.543Z	DR-05	5 deleted; not on restaurant menu
2026-09-30T14:56:03.969Z	DR-06	3 approved one, rejected one
2026-09-30T14:56:08.650Z	DR-06	4 public shows approved only; author sees APPROVED/REJECTED
2026-09-30T14:56:14.523Z	DR-07	2 Sinhala full name registered and shown on profile
2026-09-30T14:56:17.026Z	DR-07	4 Sinhala and Tamil approved reviews rendered; Tamil review submitted; UI chrome remains English (no UI translation)
```

### A.3 API and security evidence

**EVID-060 · TC-AUTH-001 PASS — Register with valid data** · executed 2026-09-30T19:05:13+05:30 · verdict **PASS**

```
POST http://localhost:8080/api/v1/auth/register
Authorization: none
Request body: {"fullName": "QA User A", "email": "qa.usera.190512@tastelanka.test", "password": "<redacted test password, length 13>", "language": "en"}
→ HTTP 201 (787.1 ms)  Content-Length: 356
Response body: {"token": "<JWT, 238 chars>", "userId": 2, "fullName": "QA User A", "email": "qa.usera.190512@tastelanka.test", "role": "USER", "language": "en"}
Expected: HTTP 201; JWT returned; role USER; no password hash in response
Actual:   HTTP 201; role=USER, token issued=True, passwordHash exposed=False
```

**EVID-062 · TC-AUTH-003 FAIL (DEF-001) — Register with empty body (missing all fields)** · executed 2026-09-30T19:05:13+05:30 · verdict **FAIL**

```
POST http://localhost:8080/api/v1/auth/register
Authorization: none
Request body: {}
→ HTTP 403 (9.7 ms)  Content-Length: 0
Response body: (empty)
Expected: HTTP 400 with validation feedback
Actual:   HTTP 403
```

**EVID-072 · TC-AUTH-014 FAIL (DEF-001) — Login with incorrect password** · executed 2026-09-30T19:05:14+05:30 · verdict **FAIL**

```
POST http://localhost:8080/api/v1/auth/login
Authorization: none
Request body: {"email": "qa.usera.190512@tastelanka.test", "password": "<redacted test password, length 11>"}
→ HTTP 403 (106.4 ms)  Content-Length: 0
Response body: (empty)
Expected: HTTP 401 Unauthorized with an error message
Actual:   HTTP 403
```

**EVID-005 · TC-ADM-003 FAIL (DEF-001) — as ADMIN — Create restaurant with duplicate slug** · executed 2026-09-30T19:05:18+05:30 · verdict **FAIL**

```
POST http://localhost:8080/api/v1/admin/restaurants
Authorization: Bearer <ADMIN token>
Request body: {"slug": "qa-rest-190512", "name": "QA Test Bistro", "cuisine": "Sri Lankan · Fusion", "location": "Galle", "priceMin": 1000, "priceMax": 2500, "vegetarian": true, "vegan": false, "halal": true, "description": "Created by QA API test.", "imageColor": "#123456"}
→ HTTP 403 (34.8 ms)  Content-Length: 0
Response body: (empty)
Expected: HTTP 409
Actual:   HTTP 403
```

**EVID-203 · TC-SEC-001 FAIL (DEF-002) — Protected endpoint without token (/users/me)** · executed 2026-09-30T19:05:19+05:30 · verdict **FAIL**

```
GET http://localhost:8080/api/v1/users/me
Authorization: none
→ HTTP 403 (26.5 ms)  Content-Length: 0
Response body: (empty)
Expected: HTTP 401 Unauthorized
Actual:   HTTP 403
```

**EVID-207 · TC-SEC-005 FAIL (DEF-003, Critical) — Forged admin token signed with default JWT secret (JWT_SECRET not set, as in README run steps)** · executed 2026-09-30T19:05:19+05:30 · verdict **FAIL**

```
GET http://localhost:8080/api/v1/admin/dashboard
Authorization: Bearer <token forged offline with the default JWT secret from application.yml>
→ HTTP 200 (27.8 ms)  Content-Length: 77
Response body: {"restaurants": 7, "dishes": 4, "users": 8, "pendingReviews": 3, "approvedReviews": 4}
Expected: HTTP 401/403 – tokens not issued by the server must be rejected
Actual:   HTTP 200
```

**EVID-209 · TC-SEC-010 PASS — Customer accesses admin dashboard** · executed 2026-09-30T19:05:19+05:30 · verdict **PASS**

```
GET http://localhost:8080/api/v1/admin/dashboard
Authorization: Bearer <USER_A token>
→ HTTP 403 (30.2 ms)  Content-Length: 0
Response body: (empty)
Expected: HTTP 403
Actual:   HTTP 403
```

**EVID-217 · TC-SEC-020 PASS — Mass assignment: review submitted with status=APPROVED** · executed 2026-09-30T19:05:17+05:30 · verdict **PASS**

```
POST http://localhost:8080/api/v1/reviews
Authorization: Bearer <USER_B token>
Request body: {"restaurantSlug": "ministry-of-crab", "foodRating": 4, "serviceRating": 5, "overallRating": 4, "language": "en", "reviewText": "QA review: tasty rice and curry, friendly staff.", "status": "APPROVED", "moderatorNote": "self-approved"}
→ HTTP 201 (26.0 ms)  Content-Length: 296
Response body: {"id": 6, "author": "QA User B", "restaurantSlug": "ministry-of-crab", "restaurantName": "Ministry of Crab", "foodRating": 4, "serviceRating": 5, "overallRating": 4, "language": "en", "reviewText": "QA review: tasty rice and curry, friendly staff.", "status": "PENDING", "createdAt": "2026-09-30T13:35:17.171407300Z"}
Expected: HTTP 201 but status forced to PENDING (client status ignored)
Actual:   HTTP 201; status=PENDING note=None
```

**EVID-218 · TC-SEC-021 PASS — SQL injection probe in search q** · executed 2026-09-30T19:05:19+05:30 · verdict **PASS**

```
GET http://localhost:8080/api/v1/restaurants?q=%27+OR+%271%27%3D%271
Authorization: none
→ HTTP 200 (32.7 ms)  Content-Length: 2
Response body: []
Expected: HTTP 200 and empty list (input treated as literal)
Actual:   HTTP 200; rows returned=0
```

**EVID-228 · TC-SEC-041 PASS — User A's saved restaurant unaffected by User B action** · executed 2026-09-30T19:05:17+05:30 · verdict **PASS**

```
GET http://localhost:8080/api/v1/users/me/saved-restaurants
Authorization: Bearer <USER_A token>
→ HTTP 200 (36.4 ms)  Content-Length: 336
Response body: [{"id": 5, "slug": "green-leaf-kitchen", "name": "Green Leaf Kitchen", "cuisine": "Sri Lankan · Vegetarian", "location": "Kandy", "rating": 4.3, "reviewCount": 96, "priceMin": 1500, "priceMax": 3000, "vegetarian": true, "vegan": true, "halal": true, "description": "Vegetarian-friendly local dishes with mild and medium spice options.", "imageColor": "#597a40"}]
Expected: HTTP 200
Actual:   HTTP 200; User A slugs=['green-leaf-kitchen']
```

**EVID-090 · TC-MOD-012 FAIL (DEF-004) — Approved review is reflected in restaurant reviewCount/rating** · executed 2026-09-30T19:05:17+05:30 · verdict **FAIL**

```
GET http://localhost:8080/api/v1/restaurants/ministry-of-crab
Authorization: none
→ HTTP 200 (9.5 ms)  Content-Length: 356
Response body: {"id": 1, "slug": "ministry-of-crab", "name": "Ministry of Crab", "cuisine": "Seafood · Sri Lankan", "location": "Colombo", "rating": 4.8, "reviewCount": 320, "priceMin": 8000, "priceMax": 12000, "vegetarian": false, "vegan": false, "halal": true, "description": "Popular seafood dining in Colombo. Browse menu items, prices and approved customer reviews.", "imageColor": "#332417"}
Expected: HTTP 200; reviewCount increases by 1 and rating is recalculated after approval
Actual:   HTTP 200; reviewCount before=320 after=320; rating before=4.8 after=4.8
```

**EVID-009 · TC-ADM-007 FAIL (DEF-005) — Create restaurant with priceMin > priceMax** · executed 2026-09-30T19:05:18+05:30 · verdict **FAIL**

```
POST http://localhost:8080/api/v1/admin/restaurants
Authorization: Bearer <ADMIN token>
Request body: {"slug": "qa-inverted-190512", "name": "QA Test Bistro", "cuisine": "Sri Lankan · Fusion", "location": "Galle", "priceMin": 9000, "priceMax": 100, "vegetarian": true, "vegan": false, "halal": true, "description": "Created by QA API test.", "imageColor": "#123456"}
→ HTTP 201 (19.5 ms)  Content-Length: 278
Response body: {"id": 7, "slug": "qa-inverted-190512", "name": "QA Test Bistro", "cuisine": "Sri Lankan · Fusion", "location": "Galle", "rating": 0, "reviewCount": 0, "priceMin": 9000, "priceMax": 100, "vegetarian": true, "vegan": false, "halal": true, "description": "Created by QA API test.", "imageColor": "#123456"}
Expected: HTTP 400 (minimum price must not exceed maximum price)
Actual:   HTTP 201
```

**EVID-013 · TC-ADM-011 FAIL (DEF-006) — Update restaurant to slug already used by another restaurant** · executed 2026-09-30T19:05:18+05:30 · verdict **FAIL**

```
PUT http://localhost:8080/api/v1/admin/restaurants/6
Authorization: Bearer <ADMIN token>
Request body: {"slug": "nuga-gama", "name": "QA Test Bistro", "cuisine": "Sri Lankan · Fusion", "location": "Galle", "priceMin": 1000, "priceMax": 2500, "vegetarian": true, "vegan": false, "halal": true, "description": "Created by QA API test.", "imageColor": "#123456"}
→ HTTP 403 (67.3 ms)  Content-Length: 0
Response body: (empty)
Expected: HTTP 409 Conflict (slug already exists)
Actual:   HTTP 403
```

**EVID-036 · TC-ADM-037 FAIL (DEF-007) — Delete restaurant that has customer reviews** · executed 2026-09-30T19:05:19+05:30 · verdict **FAIL**

```
DELETE http://localhost:8080/api/v1/admin/restaurants/8
Authorization: Bearer <ADMIN token>
→ HTTP 403 (44.7 ms)  Content-Length: 0
Response body: (empty)
Expected: HTTP 204 (restaurant and dependent data removed) or HTTP 409 with an explanatory message; never a 5xx
Actual:   HTTP 403
```

**EVID-154 · TC-DATA-002 FAIL (DEF-008) — Admin edit to seeded restaurant survives restart** · executed 2026-09-30T19:11:28+05:30 · verdict **FAIL**

```
GET http://localhost:8080/api/v1/restaurants/nuga-gama
Authorization: none
→ HTTP 200 (30.6 ms)  Content-Length: 307
Response body: {"id": 4, "slug": "nuga-gama", "name": "Nuga Gama", "cuisine": "Sri Lankan · Authentic", "location": "Colombo", "rating": 4.4, "reviewCount": 150, "priceMin": 3000, "priceMax": 5000, "vegetarian": true, "vegan": true, "halal": true, "description": "Traditional Sri Lankan dining with local cuisine options.", "imageColor": "#662e1a"}
Expected: HTTP 200; description='QA-EDITED description 190512', priceMin=3500
Actual:   HTTP 200; description after restart='Traditional Sri Lankan dining with local cuisine options.'; priceMin=3000
```

**EVID-189 · Backend log — correct 400-class exceptions were raised for requests the client received as 403 (DEF-001)** — source: evidence/logs/backend-run-1.log

```
2026-09-30T18:59:24.951+05:30  WARN 14664 --- [tastelanka-api] [nio-8080-exec-7] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.bind.MethodArgumentNotValidException: Validation failed for argument [0] in public com.tastelanka.portal.auth.AuthController$AuthResponse com.tastelanka.portal.auth.AuthController.register(com.tastelanka.portal.auth.AuthController$RegisterRequest) with 3 errors: [Field error in object 'registerRequest' on field 'fullName': rejected value [null]; codes [NotBlank.registerRequest.fullName,NotBlank.fullName,NotBlank.java.lang.String,NotBlank]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [registerRequest.fullName,fullName]; arguments []; default message [fullName]]; default message [must not be blank]] [Field error in object 'registerRequest' on field 'password': rejected value [null]; codes [NotBlank.registerRequest.password,NotBlank.password,NotBlank.java.lang.String,NotBlank]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [registerRequest.password,password]; arguments []; default message [password]]; default message [must not be blank]] [Field error in object 'registerRequest' on field 'email': rejected value [null]; codes [NotBlank.registerRequest.email,NotBlank.email,NotBlank.java.lang.String,NotBlank]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [registerRequest.email,email]; arguments []; default message [email]]; default message [must not be blank]] ]
2026-09-30T19:05:13.592+05:30  WARN 14664 --- [tastelanka-api] [nio-8080-exec-3] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.bind.MethodArgumentNotValidException: Validation failed for argument [0] in public com.tastelanka.portal.auth.AuthController$AuthResponse com.tastelanka.portal.auth.AuthController.register(com.tastelanka.portal.auth.AuthController$RegisterRequest) with 3 errors: [Field error in object 'registerRequest' on field 'password': rejected value [null]; codes [NotBlank.registerRequest.password,NotBlank.password,NotBlank.java.lang.String,NotBlank]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [registerRequest.password,password]; arguments []; default message [password]]; default message [must not be blank]] [Field error in object 'registerRequest' on field 'email': rejected value [null]; codes [NotBlank.registerRequest.email,NotBlank.email,NotBlank.java.lang.String,NotBlank]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [registerRequest.email,email]; arguments []; default message [email]]; default message [must not be blank]] [Field error in object 'registerRequest' on field 'fullName': rejected value [null]; codes [NotBlank.registerRequest.fullName,NotBlank.fullName,NotBlank.java.lang.String,NotBlank]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [registerRequest.fullName,fullName]; arguments []; default message [fullName]]; default message [must not be blank]] ]
2026-09-30T19:05:13.599+05:30  WARN 14664 --- [tastelanka-api] [nio-8080-exec-5] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.bind.MethodArgumentNotValidException: Validation failed for argument [0] in public com.tastelanka.portal.auth.AuthController$AuthResponse com.tastelanka.portal.auth.AuthController.register(com.tastelanka.portal.auth.AuthController$RegisterRequest): [Field error in object 'registerRequest' on field 'email': rejected value [not-an-email]; codes [Email.registerRequest.email,Email.email,Email.java.lang.String,Email]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [registerRequest.email,email]; arguments []; default message [email],[Ljakarta.validation.constraints.Pattern$Flag;@52179fb5,.*]; default message [must be a well-formed email address]] ]
```

**EVID-189 · Backend log — unhandled exceptions behind the masked 403s (DEF-006, DEF-007)** — source: evidence/logs/backend-run-1.log

```
2026-09-30T19:05:18.383+05:30  WARN 14664 --- [tastelanka-api] [nio-8080-exec-1] org.hibernate.orm.jdbc.error             : Duplicate entry 'nuga-gama' for key 'restaurants.uk_restaurants_slug'
2026-09-30T19:05:18.393+05:30 ERROR 14664 --- [tastelanka-api] [nio-8080-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed: org.springframework.dao.DataIntegrityViolationException: could not execute statement [Duplicate entry 'nuga-gama' for key 'restaurants.uk_restaurants_slug'] [update restaurants set cuisine=?,description=?,halal=?,image_color=?,location=?,name=?,price_max=?,price_min=?,rating=?,review_count=?,slug=?,vegan=?,vegetarian=? where id=?]; SQL [update restaurants set cuisine=?,description=?,halal=?,image_color=?,location=?,name=?,price_max=?,price_min=?,rating=?,review_count=?,slug=?,vegan=?,vegetarian=? where id=?]; constraint [restaurants.uk_restaurants_slug]] with root cause
java.sql.SQLIntegrityConstraintViolationException: Duplicate entry 'nuga-gama' for key 'restaurants.uk_restaurants_slug'
2026-09-30T19:05:18.779+05:30  WARN 14664 --- [tastelanka-api] [nio-8080-exec-7] org.hibernate.orm.jdbc.error             : Duplicate entry 'chilli-crab' for key 'dishes.uk_dishes_slug'
2026-09-30T19:05:18.781+05:30 ERROR 14664 --- [tastelanka-api] [nio-8080-exec-7] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed: org.springframework.dao.DataIntegrityViolationException: could not execute statement [Duplicate entry 'chilli-crab' for key 'dishes.uk_dishes_slug'] [update dishes set description=?,food_rating=?,halal=?,image_color=?,name=?,price=?,rating=?,restaurant_id=?,review_count=?,service_rating=?,slug=?,spice_level=?,vegetarian=? where id=?]; SQL [update dishes set description=?,food_rating=?,halal=?,image_color=?,name=?,price=?,rating=?,restaurant_id=?,review_count=?,service_rating=?,slug=?,spice_level=?,vegetarian=? where id=?]; constraint [dishes.uk_dishes_slug]] with root cause
java.sql.SQLIntegrityConstraintViolationException: Duplicate entry 'chilli-crab' for key 'dishes.uk_dishes_slug'
```

![EVID-226 · TC-SEC-031 PASS · stored XSS payload rendered as plain text, no script executed (top of full-page screenshot shown) — source: evidence/security/TC-SEC-031-xss-rendered-as-text.png](report-figures/TC-SEC-031-xss-rendered-as-text.jpg)

### A.4 Additional UI defects

![EVID-277 · TC-UI-006 FAIL (DEF-014) · home 'Write a Review': no restaurant selector, generic error — source: evidence/ui/TC-UI-006-review-without-restaurant.png](report-figures/TC-UI-006-review-without-restaurant.jpg)

![EVID-281 · TC-UI-008 FAIL (DEF-015) · already-saved restaurant shows 'Save' — source: evidence/ui/TC-UI-008-saved-state-after-reload.png](report-figures/TC-UI-008-saved-state-after-reload.jpg)

![EVID-271 · TC-ADM-UI-002 FAIL (DEF-007) · 'Remove its menu and reviews first' — no way to remove reviews — source: evidence/ui/TC-ADM-UI-002-delete-restaurant-with-reviews.png](report-figures/TC-ADM-UI-002-delete-restaurant-with-reviews.jpg)

![EVID-282 · TC-UI-013 FAIL (DEF-010) · home location selector ignored — source: evidence/ui/TC-UI-013-home-location-ignored.png](report-figures/TC-UI-013-home-location-ignored.jpg)

![EVID-270 · TC-ADM-UI-001 PASS · admin dashboard with live metrics — source: evidence/ui/TC-ADM-UI-001-admin-dashboard.png](report-figures/TC-ADM-UI-001-admin-dashboard.jpg)

### A.5 Automated test evidence

**EVID-127 · JUnit final run — per-class summary** — source: evidence/automated/AUTO-006-junit-qa-suite-final.log

```
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 22.99 s -- in com.tastelanka.portal.BackendApplicationTests
[ERROR] Tests run: 18, Failures: 7, Errors: 0, Skipped: 0, Time elapsed: 14.02 s <<< FAILURE! -- in com.tastelanka.portal.qa.ApiIntegrationTest
[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.033 s -- in com.tastelanka.portal.qa.DomainModelTest
[ERROR] Tests run: 5, Failures: 4, Errors: 0, Skipped: 0, Time elapsed: 6.200 s <<< FAILURE! -- in com.tastelanka.portal.qa.HttpErrorContractTest
[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.073 s -- in com.tastelanka.portal.qa.JwtServiceTest
[ERROR] Tests run: 35, Failures: 1, Errors: 0, Skipped: 0, Time elapsed: 0.536 s <<< FAILURE! -- in com.tastelanka.portal.qa.RequestValidationTest
[ERROR] Tests run: 69, Failures: 12, Errors: 0, Skipped: 0
[INFO] BUILD FAILURE
```

**EVID-302 · Playwright final exclusive run — failures and totals** — source: evidence/ui/playwright-final-console.txt

```
  x   6 specs\admin.spec.ts:93:5 › TC-ADM-UI-002 admin sees a clear message when a restaurant with reviews cannot be deleted (6.3s)
  x  10 specs\admin.spec.ts:195:5 › TC-ADM-UI-004 moderator can enter a moderation note / reason when rejecting (6.6s)
  x  25 specs\customer.spec.ts:137:5 › BB-08b 'Clear all' resets filters and results (3.4s)
  x  26 specs\customer.spec.ts:158:5 › BB-08c cuisine category link filters the listing (3.1s)
  x  27 specs\customer.spec.ts:169:5 › BB-08d price and spice filters are available on restaurant search (2.4s)
  x  33 specs\customer.spec.ts:230:5 › TC-UI-006 'Write a Review' from home page (no restaurant selected) lets the user pick a restaurant (7.8s)
  x  36 specs\customer.spec.ts:269:5 › TC-UI-008 saved state is shown when revisiting an already-saved restaurant (6.3s)
  x  40 specs\customer.spec.ts:306:5 › TC-UI-011 home 'Top Rated' section reflects API data (2.4s)
  x  42 specs\customer.spec.ts:324:5 › TC-UI-013 home page filter chips and location selector affect results (4.6s)
  x  51 specs\nonfunctional.spec.ts:24:7 › BB-18 responsive layout at tablet 768x1024: no horizontal overflow, content visible (12.5s)
  x  54 specs\nonfunctional.spec.ts:51:5 › BB-18c mobile: restaurant filters are available (2.4s)
  x  56 specs\nonfunctional.spec.ts:88:5 › BB-20a automated accessibility scan (axe-core, WCAG 2.1 A/AA) of key pages (37.9s)
  x  59 specs\nonfunctional.spec.ts:137:5 › BB-20d rating star buttons expose accessible names and selected state (4.2s)
  x  60 specs\nonfunctional.spec.ts:149:5 › BB-20e search and filter inputs have programmatic labels (2.9s)
  x  63 specs\nonfunctional.spec.ts:193:5 › BB-19c interface language can be switched to Sinhala / Tamil (2.5s)
  15 failed
  49 passed (9.2m)
```

