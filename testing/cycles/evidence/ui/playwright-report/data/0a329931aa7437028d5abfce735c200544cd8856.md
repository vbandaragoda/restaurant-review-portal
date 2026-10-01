# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nonfunctional.spec.ts >> BB-20a automated accessibility scan (axe-core, WCAG 2.1 A/AA) of key pages
- Location: specs\nonfunctional.spec.ts:88:5

# Error details

```
Error: no serious/critical WCAG A/AA violations

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 90

- Array []
+ Array [
+   Object {
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": 12,
+     "page": "home",
+     "sample": ".gap-\\[30px\\] > .text-brand.font-semibold[href=\"/\"]",
+   },
+   Object {
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": 29,
+     "page": "restaurants",
+     "sample": ".gap-\\[30px\\] > .text-brand[href$=\"restaurants\"]",
+   },
+   Object {
+     "help": "Select element must have an accessible name",
+     "id": "select-name",
+     "impact": "critical",
+     "nodes": 2,
+     "page": "restaurants",
+     "sample": "form > select",
+   },
+   Object {
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": 7,
+     "page": "restaurant-details",
+     "sample": ".gap-\\[30px\\] > .text-brand[href$=\"restaurants\"]",
+   },
+   Object {
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": 5,
+     "page": "dish-details",
+     "sample": ".gap-\\[30px\\] > .text-brand.font-semibold[href$=\"restaurants\"]",
+   },
+   Object {
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": 3,
+     "page": "login",
+     "sample": "a[href$=\"contact\"]",
+   },
+   Object {
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": 2,
+     "page": "signup",
+     "sample": ".mt-4",
+   },
+   Object {
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": 3,
+     "page": "review-form",
+     "sample": ".text-brand[href$=\"nuga-gama\"]",
+   },
+   Object {
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": 1,
+     "page": "profile",
+     "sample": ".mt-9",
+   },
+   Object {
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": 5,
+     "page": "admin-dashboard",
+     "sample": ".rounded-xl.p-6[href$=\"restaurants\"] > .mt-5.text-xs.text-brand",
+   },
+   Object {
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": 1,
+     "page": "admin-reviews",
+     "sample": ".bg-brand.text-white.rounded-full",
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=f11e1]:
  - generic [ref=f11e2]:
    - banner [ref=f11e3]:
      - link "TasteLanka home" [ref=f11e4] [cursor=pointer]:
        - /url: /
        - generic [ref=f11e6]:
          - strong [ref=f11e7]: TasteLanka
          - generic [ref=f11e8]: Discover • Dine • Review
      - navigation "Main navigation" [ref=f11e9]:
        - link "Home" [ref=f11e10] [cursor=pointer]:
          - /url: /
        - link "Restaurants" [ref=f11e11] [cursor=pointer]:
          - /url: /restaurants
        - link "Cuisines" [ref=f11e12] [cursor=pointer]:
          - /url: /cuisines
        - link "About" [ref=f11e13] [cursor=pointer]:
          - /url: /about
      - link "Dashboard" [ref=f11e15] [cursor=pointer]:
        - /url: /admin
    - generic [ref=f11e16]:
      - complementary [ref=f11e17]:
        - paragraph [ref=f11e18]: ADMIN PORTAL
        - navigation [ref=f11e19]:
          - link "Dashboard" [ref=f11e20] [cursor=pointer]:
            - /url: /admin
          - link "Restaurants" [ref=f11e21] [cursor=pointer]:
            - /url: /admin/restaurants
          - link "Menu" [ref=f11e22] [cursor=pointer]:
            - /url: /admin/menu
          - link "Review Moderation" [ref=f11e23] [cursor=pointer]:
            - /url: /admin/reviews
      - main [ref=f11e24]:
        - heading "Review Moderation" [level=1] [ref=f11e25]
        - paragraph [ref=f11e26]: Approve or reject multilingual community reviews before publication.
        - generic [ref=f11e27]:
          - generic [ref=f11e28]:
            - button "PENDING" [ref=f11e29]
            - button "APPROVED" [ref=f11e30]
            - button "REJECTED" [ref=f11e31]
          - generic [ref=f11e32]:
            - article [ref=f11e33]:
              - generic [ref=f11e34]:
                - heading "QA User A" [level=2] [ref=f11e35]
                - generic [ref=f11e36]: reviewed Nuga Gama
                - generic [ref=f11e37]: en
              - paragraph [ref=f11e38]: ★☆☆☆☆
              - paragraph [ref=f11e39]: QA boundary review – minimum ratings.
              - paragraph [ref=f11e40]: Food 1 • Service 1 • Overall 1
              - generic [ref=f11e41]:
                - button "Reject" [ref=f11e42]
                - button "Approve" [ref=f11e43]
            - article [ref=f11e44]:
              - generic [ref=f11e45]:
                - heading "QA User A" [level=2] [ref=f11e46]
                - generic [ref=f11e47]: reviewed Nuga Gama
                - generic [ref=f11e48]: en
              - paragraph [ref=f11e49]: ★★★★☆
              - paragraph [ref=f11e50]: yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
              - paragraph [ref=f11e51]: Food 4 • Service 5 • Overall 4
              - generic [ref=f11e52]:
                - button "Reject" [ref=f11e53]
                - button "Approve" [ref=f11e54]
            - article [ref=f11e55]:
              - generic [ref=f11e56]:
                - heading "QA User A" [level=2] [ref=f11e57]
                - generic [ref=f11e58]: reviewed QA Reviewed Cafe
                - generic [ref=f11e59]: en
              - paragraph [ref=f11e60]: ★★★★☆
              - paragraph [ref=f11e61]: QA review on a restaurant that will be deleted.
              - paragraph [ref=f11e62]: Food 4 • Service 5 • Overall 4
              - generic [ref=f11e63]:
                - button "Reject" [ref=f11e64]
                - button "Approve" [ref=f11e65]
            - article [ref=f11e66]:
              - generic [ref=f11e67]:
                - heading "QA User A" [level=2] [ref=f11e68]
                - generic [ref=f11e69]: reviewed Pedlar’s Inn
                - generic [ref=f11e70]: en
              - paragraph [ref=f11e71]: ★★★★☆
              - paragraph [ref=f11e72]: QA performance sample review
              - paragraph [ref=f11e73]: Food 4 • Service 4 • Overall 4
              - generic [ref=f11e74]:
                - button "Reject" [ref=f11e75]
                - button "Approve" [ref=f11e76]
            - article [ref=f11e77]:
              - generic [ref=f11e78]:
                - heading "QA User A" [level=2] [ref=f11e79]
                - generic [ref=f11e80]: reviewed Pedlar’s Inn
                - generic [ref=f11e81]: en
              - paragraph [ref=f11e82]: ★★★★☆
              - paragraph [ref=f11e83]: QA performance sample review
              - paragraph [ref=f11e84]: Food 4 • Service 4 • Overall 4
              - generic [ref=f11e85]:
                - button "Reject" [ref=f11e86]
                - button "Approve" [ref=f11e87]
            - article [ref=f11e88]:
              - generic [ref=f11e89]:
                - heading "QA User A" [level=2] [ref=f11e90]
                - generic [ref=f11e91]: reviewed Pedlar’s Inn
                - generic [ref=f11e92]: en
              - paragraph [ref=f11e93]: ★★★★☆
              - paragraph [ref=f11e94]: QA performance sample review
              - paragraph [ref=f11e95]: Food 4 • Service 4 • Overall 4
              - generic [ref=f11e96]:
                - button "Reject" [ref=f11e97]
                - button "Approve" [ref=f11e98]
            - article [ref=f11e99]:
              - generic [ref=f11e100]:
                - heading "QA User A" [level=2] [ref=f11e101]
                - generic [ref=f11e102]: reviewed Pedlar’s Inn
                - generic [ref=f11e103]: en
              - paragraph [ref=f11e104]: ★★★★☆
              - paragraph [ref=f11e105]: QA performance sample review
              - paragraph [ref=f11e106]: Food 4 • Service 4 • Overall 4
              - generic [ref=f11e107]:
                - button "Reject" [ref=f11e108]
                - button "Approve" [ref=f11e109]
            - article [ref=f11e110]:
              - generic [ref=f11e111]:
                - heading "QA User A" [level=2] [ref=f11e112]
                - generic [ref=f11e113]: reviewed Pedlar’s Inn
                - generic [ref=f11e114]: en
              - paragraph [ref=f11e115]: ★★★★☆
              - paragraph [ref=f11e116]: QA performance sample review
              - paragraph [ref=f11e117]: Food 4 • Service 4 • Overall 4
              - generic [ref=f11e118]:
                - button "Reject" [ref=f11e119]
                - button "Approve" [ref=f11e120]
            - article [ref=f11e121]:
              - generic [ref=f11e122]:
                - heading "QA User A" [level=2] [ref=f11e123]
                - generic [ref=f11e124]: reviewed Pedlar’s Inn
                - generic [ref=f11e125]: en
              - paragraph [ref=f11e126]: ★★★★☆
              - paragraph [ref=f11e127]: QA performance sample review
              - paragraph [ref=f11e128]: Food 4 • Service 4 • Overall 4
              - generic [ref=f11e129]:
                - button "Reject" [ref=f11e130]
                - button "Approve" [ref=f11e131]
            - article [ref=f11e132]:
              - generic [ref=f11e133]:
                - heading "QA User A" [level=2] [ref=f11e134]
                - generic [ref=f11e135]: reviewed Pedlar’s Inn
                - generic [ref=f11e136]: en
              - paragraph [ref=f11e137]: ★★★★☆
              - paragraph [ref=f11e138]: QA performance sample review
              - paragraph [ref=f11e139]: Food 4 • Service 4 • Overall 4
              - generic [ref=f11e140]:
                - button "Reject" [ref=f11e141]
                - button "Approve" [ref=f11e142]
            - article [ref=f11e143]:
              - generic [ref=f11e144]:
                - heading "QA User A" [level=2] [ref=f11e145]
                - generic [ref=f11e146]: reviewed Pedlar’s Inn
                - generic [ref=f11e147]: en
              - paragraph [ref=f11e148]: ★★★★☆
              - paragraph [ref=f11e149]: QA performance sample review
              - paragraph [ref=f11e150]: Food 4 • Service 4 • Overall 4
              - generic [ref=f11e151]:
                - button "Reject" [ref=f11e152]
                - button "Approve" [ref=f11e153]
            - article [ref=f11e154]:
              - generic [ref=f11e155]:
                - heading "QA User A" [level=2] [ref=f11e156]
                - generic [ref=f11e157]: reviewed Pedlar’s Inn
                - generic [ref=f11e158]: en
              - paragraph [ref=f11e159]: ★★★★☆
              - paragraph [ref=f11e160]: QA performance sample review
              - paragraph [ref=f11e161]: Food 4 • Service 4 • Overall 4
              - generic [ref=f11e162]:
                - button "Reject" [ref=f11e163]
                - button "Approve" [ref=f11e164]
            - article [ref=f11e165]:
              - generic [ref=f11e166]:
                - heading "QA User A" [level=2] [ref=f11e167]
                - generic [ref=f11e168]: reviewed Pedlar’s Inn
                - generic [ref=f11e169]: en
              - paragraph [ref=f11e170]: ★★★★☆
              - paragraph [ref=f11e171]: QA performance sample review
              - paragraph [ref=f11e172]: Food 4 • Service 4 • Overall 4
              - generic [ref=f11e173]:
                - button "Reject" [ref=f11e174]
                - button "Approve" [ref=f11e175]
            - article [ref=f11e176]:
              - generic [ref=f11e177]:
                - heading "QA UI Customer" [level=2] [ref=f11e178]
                - generic [ref=f11e179]: reviewed Green Leaf Kitchen
                - generic [ref=f11e180]: en
              - paragraph [ref=f11e181]: ★★★★★
              - paragraph [ref=f11e182]: "QA UI review 135906: lovely vegetarian curry, attentive staff."
              - paragraph [ref=f11e183]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e184]:
                - button "Reject" [ref=f11e185]
                - button "Approve" [ref=f11e186]
            - article [ref=f11e187]:
              - generic [ref=f11e188]:
                - heading "QA Language" [level=2] [ref=f11e189]
                - generic [ref=f11e190]: reviewed Nuga Gama
                - generic [ref=f11e191]: si
              - paragraph [ref=f11e192]: ★★★★★
              - paragraph [ref=f11e193]: ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි.
              - paragraph [ref=f11e194]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e195]:
                - button "Reject" [ref=f11e196]
                - button "Approve" [ref=f11e197]
            - article [ref=f11e198]:
              - generic [ref=f11e199]:
                - heading "QA Language" [level=2] [ref=f11e200]
                - generic [ref=f11e201]: reviewed Nuga Gama
                - generic [ref=f11e202]: ta
              - paragraph [ref=f11e203]: ★★★★★
              - paragraph [ref=f11e204]: அருமையான உணவு, மீண்டும் வருவேன்.
              - paragraph [ref=f11e205]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e206]:
                - button "Reject" [ref=f11e207]
                - button "Approve" [ref=f11e208]
            - article [ref=f11e209]:
              - generic [ref=f11e210]:
                - heading "ශානි ප්‍රනාන්දු" [level=2] [ref=f11e211]
                - generic [ref=f11e212]: reviewed Ministry of Crab
                - generic [ref=f11e213]: ta
              - paragraph [ref=f11e214]: ★★★★★
              - paragraph [ref=f11e215]: நண்டு கறி மிகவும் சுவையாக இருந்தது.
              - paragraph [ref=f11e216]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e217]:
                - button "Reject" [ref=f11e218]
                - button "Approve" [ref=f11e219]
            - article [ref=f11e220]:
              - generic [ref=f11e221]:
                - heading "QA UI Customer" [level=2] [ref=f11e222]
                - generic [ref=f11e223]: reviewed Green Leaf Kitchen
                - generic [ref=f11e224]: en
              - paragraph [ref=f11e225]: ★★★★★
              - paragraph [ref=f11e226]: "QA UI review 141022: lovely vegetarian curry, attentive staff."
              - paragraph [ref=f11e227]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e228]:
                - button "Reject" [ref=f11e229]
                - button "Approve" [ref=f11e230]
            - article [ref=f11e231]:
              - generic [ref=f11e232]:
                - heading "ශානි ප්‍රනාන්දු" [level=2] [ref=f11e233]
                - generic [ref=f11e234]: reviewed Ministry of Crab
                - generic [ref=f11e235]: ta
              - paragraph [ref=f11e236]: ★★★★★
              - paragraph [ref=f11e237]: நண்டு கறி மிகவும் சுவையாக இருந்தது.
              - paragraph [ref=f11e238]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e239]:
                - button "Reject" [ref=f11e240]
                - button "Approve" [ref=f11e241]
            - article [ref=f11e242]:
              - generic [ref=f11e243]:
                - heading "QA Moderation Customer" [level=2] [ref=f11e244]
                - generic [ref=f11e245]: reviewed The Empire Cafe
                - generic [ref=f11e246]: en
              - paragraph [ref=f11e247]: ★★★★★
              - paragraph [ref=f11e248]: QA-MOD-APPROVE 141338 excellent hoppers
              - paragraph [ref=f11e249]: Food 5 • Service 4 • Overall 5
              - generic [ref=f11e250]:
                - button "Reject" [ref=f11e251]
                - button "Approve" [ref=f11e252]
            - article [ref=f11e253]:
              - generic [ref=f11e254]:
                - heading "QA Moderation Customer" [level=2] [ref=f11e255]
                - generic [ref=f11e256]: reviewed The Empire Cafe
                - generic [ref=f11e257]: en
              - paragraph [ref=f11e258]: ★★★★★
              - paragraph [ref=f11e259]: QA-MOD-REJECT 141338 spam content here
              - paragraph [ref=f11e260]: Food 5 • Service 4 • Overall 5
              - generic [ref=f11e261]:
                - button "Reject" [ref=f11e262]
                - button "Approve" [ref=f11e263]
            - article [ref=f11e264]:
              - generic [ref=f11e265]:
                - heading "QA UI Customer" [level=2] [ref=f11e266]
                - generic [ref=f11e267]: reviewed Green Leaf Kitchen
                - generic [ref=f11e268]: en
              - paragraph [ref=f11e269]: ★★★★★
              - paragraph [ref=f11e270]: "QA UI review 141338: lovely vegetarian curry, attentive staff."
              - paragraph [ref=f11e271]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e272]:
                - button "Reject" [ref=f11e273]
                - button "Approve" [ref=f11e274]
            - article [ref=f11e275]:
              - generic [ref=f11e276]:
                - heading "QA Language" [level=2] [ref=f11e277]
                - generic [ref=f11e278]: reviewed Nuga Gama
                - generic [ref=f11e279]: si
              - paragraph [ref=f11e280]: ★★★★★
              - paragraph [ref=f11e281]: ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි.
              - paragraph [ref=f11e282]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e283]:
                - button "Reject" [ref=f11e284]
                - button "Approve" [ref=f11e285]
            - article [ref=f11e286]:
              - generic [ref=f11e287]:
                - heading "QA Language" [level=2] [ref=f11e288]
                - generic [ref=f11e289]: reviewed Nuga Gama
                - generic [ref=f11e290]: ta
              - paragraph [ref=f11e291]: ★★★★★
              - paragraph [ref=f11e292]: அருமையான உணவு, மீண்டும் வருவேன்.
              - paragraph [ref=f11e293]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e294]:
                - button "Reject" [ref=f11e295]
                - button "Approve" [ref=f11e296]
            - article [ref=f11e297]:
              - generic [ref=f11e298]:
                - heading "DR Two" [level=2] [ref=f11e299]
                - generic [ref=f11e300]: reviewed Pedlar’s Inn
                - generic [ref=f11e301]: en
              - paragraph [ref=f11e302]: ★★★★☆
              - paragraph [ref=f11e303]: DR-02 141338 the lamprais was superb and service quick
              - paragraph [ref=f11e304]: Food 5 • Service 5 • Overall 4
              - generic [ref=f11e305]:
                - button "Reject" [ref=f11e306]
                - button "Approve" [ref=f11e307]
            - article [ref=f11e308]:
              - generic [ref=f11e309]:
                - heading "QA Moderation Customer" [level=2] [ref=f11e310]
                - generic [ref=f11e311]: reviewed The Empire Cafe
                - generic [ref=f11e312]: en
              - paragraph [ref=f11e313]: ★★★★★
              - paragraph [ref=f11e314]: QA-MOD-APPROVE 141925 excellent hoppers
              - paragraph [ref=f11e315]: Food 5 • Service 4 • Overall 5
              - generic [ref=f11e316]:
                - button "Reject" [ref=f11e317]
                - button "Approve" [ref=f11e318]
            - article [ref=f11e319]:
              - generic [ref=f11e320]:
                - heading "QA Moderation Customer" [level=2] [ref=f11e321]
                - generic [ref=f11e322]: reviewed The Empire Cafe
                - generic [ref=f11e323]: en
              - paragraph [ref=f11e324]: ★★★★★
              - paragraph [ref=f11e325]: QA-MOD-REJECT 141925 spam content here
              - paragraph [ref=f11e326]: Food 5 • Service 4 • Overall 5
              - generic [ref=f11e327]:
                - button "Reject" [ref=f11e328]
                - button "Approve" [ref=f11e329]
            - article [ref=f11e330]:
              - generic [ref=f11e331]:
                - heading "ශානි ප්‍රනාන්දු" [level=2] [ref=f11e332]
                - generic [ref=f11e333]: reviewed Ministry of Crab
                - generic [ref=f11e334]: ta
              - paragraph [ref=f11e335]: ★★★★★
              - paragraph [ref=f11e336]: நண்டு கறி மிகவும் சுவையாக இருந்தது.
              - paragraph [ref=f11e337]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e338]:
                - button "Reject" [ref=f11e339]
                - button "Approve" [ref=f11e340]
            - article [ref=f11e341]:
              - generic [ref=f11e342]:
                - heading "QA UI Customer" [level=2] [ref=f11e343]
                - generic [ref=f11e344]: reviewed Green Leaf Kitchen
                - generic [ref=f11e345]: en
              - paragraph [ref=f11e346]: ★★★★★
              - paragraph [ref=f11e347]: "QA UI review 141925: lovely vegetarian curry, attentive staff."
              - paragraph [ref=f11e348]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e349]:
                - button "Reject" [ref=f11e350]
                - button "Approve" [ref=f11e351]
            - article [ref=f11e352]:
              - generic [ref=f11e353]:
                - heading "QA Language" [level=2] [ref=f11e354]
                - generic [ref=f11e355]: reviewed Nuga Gama
                - generic [ref=f11e356]: si
              - paragraph [ref=f11e357]: ★★★★★
              - paragraph [ref=f11e358]: ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි.
              - paragraph [ref=f11e359]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e360]:
                - button "Reject" [ref=f11e361]
                - button "Approve" [ref=f11e362]
            - article [ref=f11e363]:
              - generic [ref=f11e364]:
                - heading "QA Language" [level=2] [ref=f11e365]
                - generic [ref=f11e366]: reviewed Nuga Gama
                - generic [ref=f11e367]: ta
              - paragraph [ref=f11e368]: ★★★★★
              - paragraph [ref=f11e369]: அருமையான உணவு, மீண்டும் வருவேன்.
              - paragraph [ref=f11e370]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e371]:
                - button "Reject" [ref=f11e372]
                - button "Approve" [ref=f11e373]
            - article [ref=f11e374]:
              - generic [ref=f11e375]:
                - heading "ශානි ප්‍රනාන්දු" [level=2] [ref=f11e376]
                - generic [ref=f11e377]: reviewed Ministry of Crab
                - generic [ref=f11e378]: ta
              - paragraph [ref=f11e379]: ★★★★★
              - paragraph [ref=f11e380]: நண்டு கறி மிகவும் சுவையாக இருந்தது.
              - paragraph [ref=f11e381]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e382]:
                - button "Reject" [ref=f11e383]
                - button "Approve" [ref=f11e384]
            - article [ref=f11e385]:
              - generic [ref=f11e386]:
                - heading "QA Language" [level=2] [ref=f11e387]
                - generic [ref=f11e388]: reviewed Nuga Gama
                - generic [ref=f11e389]: si
              - paragraph [ref=f11e390]: ★★★★★
              - paragraph [ref=f11e391]: ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි.
              - paragraph [ref=f11e392]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e393]:
                - button "Reject" [ref=f11e394]
                - button "Approve" [ref=f11e395]
            - article [ref=f11e396]:
              - generic [ref=f11e397]:
                - heading "QA Language" [level=2] [ref=f11e398]
                - generic [ref=f11e399]: reviewed Nuga Gama
                - generic [ref=f11e400]: ta
              - paragraph [ref=f11e401]: ★★★★★
              - paragraph [ref=f11e402]: அருமையான உணவு, மீண்டும் வருவேன்.
              - paragraph [ref=f11e403]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e404]:
                - button "Reject" [ref=f11e405]
                - button "Approve" [ref=f11e406]
            - article [ref=f11e407]:
              - generic [ref=f11e408]:
                - heading "QA UI Customer" [level=2] [ref=f11e409]
                - generic [ref=f11e410]: reviewed Green Leaf Kitchen
                - generic [ref=f11e411]: en
              - paragraph [ref=f11e412]: ★★★★★
              - paragraph [ref=f11e413]: "QA UI review 143146: lovely vegetarian curry, attentive staff."
              - paragraph [ref=f11e414]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e415]:
                - button "Reject" [ref=f11e416]
                - button "Approve" [ref=f11e417]
            - article [ref=f11e418]:
              - generic [ref=f11e419]:
                - heading "ශානි ප්‍රනාන්දු" [level=2] [ref=f11e420]
                - generic [ref=f11e421]: reviewed Ministry of Crab
                - generic [ref=f11e422]: ta
              - paragraph [ref=f11e423]: ★★★★★
              - paragraph [ref=f11e424]: நண்டு கறி மிகவும் சுவையாக இருந்தது.
              - paragraph [ref=f11e425]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e426]:
                - button "Reject" [ref=f11e427]
                - button "Approve" [ref=f11e428]
            - article [ref=f11e429]:
              - generic [ref=f11e430]:
                - heading "QA UI Customer" [level=2] [ref=f11e431]
                - generic [ref=f11e432]: reviewed Green Leaf Kitchen
                - generic [ref=f11e433]: en
              - paragraph [ref=f11e434]: ★★★★★
              - paragraph [ref=f11e435]: "QA UI review 200712: lovely vegetarian curry, attentive staff."
              - paragraph [ref=f11e436]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e437]:
                - button "Reject" [ref=f11e438]
                - button "Approve" [ref=f11e439]
            - article [ref=f11e440]:
              - generic [ref=f11e441]:
                - heading "QA Language" [level=2] [ref=f11e442]
                - generic [ref=f11e443]: reviewed Nuga Gama
                - generic [ref=f11e444]: si
              - paragraph [ref=f11e445]: ★★★★★
              - paragraph [ref=f11e446]: ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි.
              - paragraph [ref=f11e447]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e448]:
                - button "Reject" [ref=f11e449]
                - button "Approve" [ref=f11e450]
            - article [ref=f11e451]:
              - generic [ref=f11e452]:
                - heading "QA Language" [level=2] [ref=f11e453]
                - generic [ref=f11e454]: reviewed Nuga Gama
                - generic [ref=f11e455]: ta
              - paragraph [ref=f11e456]: ★★★★★
              - paragraph [ref=f11e457]: அருமையான உணவு, மீண்டும் வருவேன்.
              - paragraph [ref=f11e458]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e459]:
                - button "Reject" [ref=f11e460]
                - button "Approve" [ref=f11e461]
            - article [ref=f11e462]:
              - generic [ref=f11e463]:
                - heading "ශානි ප්‍රනාන්දු" [level=2] [ref=f11e464]
                - generic [ref=f11e465]: reviewed Ministry of Crab
                - generic [ref=f11e466]: ta
              - paragraph [ref=f11e467]: ★★★★★
              - paragraph [ref=f11e468]: நண்டு கறி மிகவும் சுவையாக இருந்தது.
              - paragraph [ref=f11e469]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e470]:
                - button "Reject" [ref=f11e471]
                - button "Approve" [ref=f11e472]
            - article [ref=f11e473]:
              - generic [ref=f11e474]:
                - heading "QA Language" [level=2] [ref=f11e475]
                - generic [ref=f11e476]: reviewed Nuga Gama
                - generic [ref=f11e477]: si
              - paragraph [ref=f11e478]: ★★★★★
              - paragraph [ref=f11e479]: ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි.
              - paragraph [ref=f11e480]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e481]:
                - button "Reject" [ref=f11e482]
                - button "Approve" [ref=f11e483]
            - article [ref=f11e484]:
              - generic [ref=f11e485]:
                - heading "QA Language" [level=2] [ref=f11e486]
                - generic [ref=f11e487]: reviewed Nuga Gama
                - generic [ref=f11e488]: ta
              - paragraph [ref=f11e489]: ★★★★★
              - paragraph [ref=f11e490]: அருமையான உணவு, மீண்டும் வருவேன்.
              - paragraph [ref=f11e491]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e492]:
                - button "Reject" [ref=f11e493]
                - button "Approve" [ref=f11e494]
            - article [ref=f11e495]:
              - generic [ref=f11e496]:
                - heading "QA UI Customer" [level=2] [ref=f11e497]
                - generic [ref=f11e498]: reviewed Green Leaf Kitchen
                - generic [ref=f11e499]: en
              - paragraph [ref=f11e500]: ★★★★★
              - paragraph [ref=f11e501]: "QA UI review 144945: lovely vegetarian curry, attentive staff."
              - paragraph [ref=f11e502]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e503]:
                - button "Reject" [ref=f11e504]
                - button "Approve" [ref=f11e505]
            - article [ref=f11e506]:
              - generic [ref=f11e507]:
                - heading "ශානි ප්‍රනාන්දු" [level=2] [ref=f11e508]
                - generic [ref=f11e509]: reviewed Ministry of Crab
                - generic [ref=f11e510]: ta
              - paragraph [ref=f11e511]: ★★★★★
              - paragraph [ref=f11e512]: நண்டு கறி மிகவும் சுவையாக இருந்தது.
              - paragraph [ref=f11e513]: Food 5 • Service 5 • Overall 5
              - generic [ref=f11e514]:
                - button "Reject" [ref=f11e515]
                - button "Approve" [ref=f11e516]
  - button "Open Next.js Dev Tools" [ref=f11e522] [cursor=pointer]
  - alert [ref=f11e526]
```

# Test source

```ts
  3   | import fs from "node:fs";
  4   | import path from "node:path";
  5   | import { apiRegister, EVIDENCE, log, loginAdmin, loginOk, RUN, shot } from "./helpers";
  6   | 
  7   | const viewports = { mobile: { width: 375, height: 812 }, tablet: { width: 768, height: 1024 }, desktop: { width: 1440, height: 900 } };
  8   | const pages = [
  9   |   ["home", "/"], ["restaurants", "/restaurants"], ["restaurant-details", "/restaurants/ministry-of-crab"],
  10  |   ["dish-details", "/dishes/chilli-crab"], ["login", "/login"], ["signup", "/signup"],
  11  | ] as const;
  12  | 
  13  | async function settle(page: Page) {
  14  |   await page.waitForLoadState("networkidle");
  15  |   await expect(page.getByText(/Loading/)).toHaveCount(0);
  16  | }
  17  | 
  18  | async function overflow(page: Page) {
  19  |   return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  20  | }
  21  | 
  22  | // ------------------------------------------------------------------------------------------------ responsive (BB-18)
  23  | for (const [vpName, vp] of Object.entries(viewports)) {
  24  |   test(`BB-18 responsive layout at ${vpName} ${vp.width}x${vp.height}: no horizontal overflow, content visible`, async ({ page }) => {
  25  |     await page.setViewportSize(vp);
  26  |     const results: string[] = [];
  27  |     for (const [name, url] of pages) {
  28  |       await page.goto(url);
  29  |       await settle(page);
  30  |       const ov = await overflow(page);
  31  |       await expect(page.locator("h1").filter({ visible: true }).first()).toBeVisible();
  32  |       results.push(`${name}: horizontal overflow=${ov}px`);
  33  |       await shot(page, "ui/responsive", `BB-18-${vpName}-${name}`);
  34  |       expect.soft(ov, `${name} must not scroll horizontally at ${vpName}`).toBeLessThanOrEqual(0);
  35  |     }
  36  |     log(`BB-18-${vpName}`, results.join("; "));
  37  |   });
  38  | }
  39  | 
  40  | test("BB-18b mobile: bottom navigation is present and search works", async ({ page }) => {
  41  |   await page.setViewportSize(viewports.mobile);
  42  |   await page.goto("/");
  43  |   const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  44  |   await expect(nav).toBeVisible();
  45  |   await page.locator("#mobile-search").fill("kandy");
  46  |   await page.locator("#mobile-search").press("Enter");
  47  |   await expect(page).toHaveURL(/\/restaurants\?q=kandy/);
  48  |   await expect(page.getByText("2 restaurants found").or(page.getByText(/\d+ restaurants found/))).toBeVisible();
  49  | });
  50  | 
  51  | test("BB-18c mobile: restaurant filters are available", async ({ page }) => {
  52  |   await page.setViewportSize(viewports.mobile);
  53  |   await page.goto("/restaurants");
  54  |   await settle(page);
  55  |   const visibleFilterControls = await page.getByRole("checkbox").filter({ visible: true }).count();
  56  |   const applyVisible = await page.getByRole("button", { name: "Apply Filters" }).isVisible();
  57  |   log("BB-18c", `mobile visible filter checkboxes=${visibleFilterControls}; Apply Filters visible=${applyVisible}`);
  58  |   await shot(page, "ui/responsive", "BB-18c-mobile-restaurants-no-filters", false);
  59  |   expect(visibleFilterControls + (applyVisible ? 1 : 0), "dietary/location filters should be usable on mobile").toBeGreaterThan(0);
  60  | });
  61  | 
  62  | test("BB-18d mobile: profile, review form and admin remain usable", async ({ page }) => {
  63  |   await page.setViewportSize(viewports.mobile);
  64  |   const email = `qa.ui.mobile.${RUN}@tastelanka.test`;
  65  |   await apiRegister("QA Mobile", email);
  66  |   await loginOk(page, email);
  67  |   await settle(page);
  68  |   expect(await overflow(page)).toBeLessThanOrEqual(0);
  69  |   await shot(page, "ui/responsive", "BB-18d-mobile-profile");
  70  |   await page.goto("/reviews/new?restaurant=nuga-gama");
  71  |   await settle(page);
  72  |   await expect(page.getByRole("button", { name: "Submit Review" })).toBeVisible();
  73  |   expect(await overflow(page)).toBeLessThanOrEqual(0);
  74  |   await shot(page, "ui/responsive", "BB-18d-mobile-review-form");
  75  |   await page.evaluate(() => localStorage.clear());
  76  |   await loginAdmin(page);
  77  |   await page.goto("/admin/restaurants");
  78  |   await settle(page);
  79  |   const ov = await overflow(page);
  80  |   await shot(page, "ui/responsive", "BB-18d-mobile-admin-restaurants");
  81  |   log("BB-18d", `mobile admin restaurants overflow=${ov}px`);
  82  |   expect(ov).toBeLessThanOrEqual(0);
  83  | });
  84  | 
  85  | // ------------------------------------------------------------------------------------------------ accessibility (BB-20)
  86  | const a11yPages = [...pages, ["review-form", "/reviews/new?restaurant=nuga-gama"], ["profile", "/profile"], ["admin-dashboard", "/admin"], ["admin-reviews", "/admin/reviews"]] as const;
  87  | 
  88  | test("BB-20a automated accessibility scan (axe-core, WCAG 2.1 A/AA) of key pages", async ({ page }) => {
  89  |   const summary: Record<string, unknown>[] = [];
  90  |   const email = `qa.ui.a11y.${RUN}@tastelanka.test`;
  91  |   await apiRegister("QA A11y", email);
  92  |   for (const [name, url] of a11yPages) {
  93  |     if (name === "review-form") await loginOk(page, email);
  94  |     if (name === "admin-dashboard") { await page.evaluate(() => localStorage.clear()); await loginAdmin(page); }
  95  |     await page.goto(url);
  96  |     await settle(page);
  97  |     const res = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  98  |     for (const v of res.violations) summary.push({ page: name, id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length, sample: v.nodes[0]?.target.join(" ") });
  99  |   }
  100 |   fs.writeFileSync(path.join(EVIDENCE, "ui", "BB-20a-axe-violations.json"), JSON.stringify(summary, null, 2));
  101 |   const serious = summary.filter((v) => v.impact === "serious" || v.impact === "critical");
  102 |   log("BB-20a", `axe violations total=${summary.length}; serious/critical=${serious.length}; rules=${[...new Set(summary.map((v) => `${v.id}(${v.impact})`))].join(", ")}`);
> 103 |   expect(serious, "no serious/critical WCAG A/AA violations").toEqual([]);
      |                                                               ^ Error: no serious/critical WCAG A/AA violations
  104 | });
  105 | 
  106 | test("BB-20b keyboard-only login: fields reachable by Tab and form submits with Enter", async ({ page }) => {
  107 |   const email = `qa.ui.kbd.${RUN}@tastelanka.test`;
  108 |   await apiRegister("QA Keyboard", email);
  109 |   await page.goto("/login");
  110 |   const order: string[] = [];
  111 |   for (let i = 0; i < 6; i++) {
  112 |     await page.keyboard.press("Tab");
  113 |     order.push(await page.evaluate(() => { const el = document.activeElement as HTMLElement; return `${el.tagName}:${el.getAttribute("type") ?? ""}:${(el.textContent || el.getAttribute("placeholder") || "").trim().slice(0, 20)}`; }));
  114 |   }
  115 |   log("BB-20b", `tab order: ${order.join(" | ")}`);
  116 |   await page.getByLabel("Email").focus();
  117 |   await page.keyboard.type(email);
  118 |   await page.keyboard.press("Tab");
  119 |   await page.keyboard.type("QaUser#2026pw");
  120 |   await page.keyboard.press("Enter");
  121 |   await expect(page).toHaveURL(/\/profile/);
  122 |   expect(order.some((o) => o.startsWith("INPUT:email"))).toBe(true);
  123 |   expect(order.some((o) => o.startsWith("INPUT:password"))).toBe(true);
  124 | });
  125 | 
  126 | test("BB-20c focus is visibly indicated on interactive elements", async ({ page }) => {
  127 |   await page.goto("/login");
  128 |   await page.getByLabel("Email").focus();
  129 |   const inputStyle = await page.getByLabel("Email").evaluate((el) => { const s = getComputedStyle(el); return `${s.borderColor}|${s.outlineStyle}|${s.boxShadow}`; });
  130 |   await page.getByRole("button", { name: "Log In" }).focus();
  131 |   const btn = await page.getByRole("button", { name: "Log In" }).evaluate((el) => { const s = getComputedStyle(el); return `${s.outlineStyle}|${s.outlineWidth}|${s.boxShadow}`; });
  132 |   log("BB-20c", `focused email input: ${inputStyle}; focused Log In button: ${btn}`);
  133 |   await shot(page, "ui", "BB-20c-focus-indicator-login-button", false);
  134 |   expect(btn.startsWith("none|") && btn.endsWith("none"), "focused button must show an outline or ring").toBe(false);
  135 | });
  136 | 
  137 | test("BB-20d rating star buttons expose accessible names and selected state", async ({ page }) => {
  138 |   const email = `qa.ui.stars.${RUN}@tastelanka.test`;
  139 |   await apiRegister("QA Stars", email);
  140 |   await loginOk(page, email);
  141 |   await page.goto("/reviews/new?restaurant=nuga-gama");
  142 |   await settle(page);
  143 |   const names = await page.locator("fieldset").first().getByRole("button").evaluateAll((els) =>
  144 |     els.map((e) => `${e.getAttribute("aria-label") ?? e.textContent}|pressed=${e.getAttribute("aria-pressed")}`));
  145 |   log("BB-20d", `food-quality star buttons: ${names.join(", ")}`);
  146 |   expect(names.every((n) => /[1-5]/.test(n.split("|")[0])), "each star should be announced with its value").toBe(true);
  147 | });
  148 | 
  149 | test("BB-20e search and filter inputs have programmatic labels", async ({ page }) => {
  150 |   await page.goto("/restaurants");
  151 |   await settle(page);
  152 |   const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input:not([type=hidden]), select, textarea")]
  153 |     .filter((el) => !(el as HTMLInputElement).labels?.length && !el.getAttribute("aria-label") && !el.getAttribute("aria-labelledby"))
  154 |     .map((el) => `${el.tagName.toLowerCase()}[${el.getAttribute("placeholder") ?? el.getAttribute("type") ?? ""}]`));
  155 |   log("BB-20e", `unlabeled controls on /restaurants: ${unlabeled.join(", ") || "none"}`);
  156 |   expect(unlabeled).toEqual([]);
  157 | });
  158 | 
  159 | // ------------------------------------------------------------------------------------------------ multilingual (BB-19)
  160 | test("BB-19a approved Sinhala and Tamil reviews display correctly with Unicode fonts", async ({ page }) => {
  161 |   await page.goto("/restaurants/ministry-of-crab");
  162 |   await settle(page);
  163 |   const si = page.getByText("රසවත් කකුළුවන් කෑම. සේවය ඉතා හොඳයි.");
  164 |   const ta = page.getByText("மிகவும் சுவையான உணவு. சேவை நன்றாக இருந்தது.");
  165 |   await expect(si).toBeVisible();
  166 |   await expect(ta).toBeVisible();
  167 |   await si.scrollIntoViewIfNeeded();
  168 |   const fonts = await si.evaluate((el) => getComputedStyle(el).fontFamily);
  169 |   const glyphs = await page.evaluate(async () => ({ si: document.fonts.check("16px 'Noto Sans Sinhala'", "ක"), loaded: [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family) }));
  170 |   log("BB-19a", `font-family=${fonts}; loaded fonts=${[...new Set(glyphs.loaded)].join(", ")}`);
  171 |   await shot(page, "ui", "BB-19a-sinhala-tamil-reviews");
  172 |   expect(fonts.toLowerCase()).toContain("sinhala");
  173 | });
  174 | 
  175 | test("BB-19b customer can write a review in Sinhala and in Tamil via the language selector", async ({ page }) => {
  176 |   const email = `qa.ui.lang.${RUN}@tastelanka.test`;
  177 |   await apiRegister("QA Language", email);
  178 |   await loginOk(page, email);
  179 |   for (const [button, text] of [["සිංහල", "ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි."], ["தமிழ்", "அருமையான உணவு, மீண்டும் வருவேன்."]] as const) {
  180 |     await page.goto("/reviews/new?restaurant=nuga-gama");
  181 |     await settle(page);
  182 |     await page.getByRole("button", { name: button }).click();
  183 |     await page.getByLabel("Review").fill(text);
  184 |     await page.getByRole("button", { name: "Submit Review" }).click();
  185 |     await expect(page.getByText("Thank you. Your review is pending moderator approval.")).toBeVisible();
  186 |   }
  187 |   await page.goto("/profile");
  188 |   await expect(page.getByText("ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි.")).toBeVisible();
  189 |   await expect(page.getByText("அருமையான உணவு, மீண்டும் வருவேன்.")).toBeVisible();
  190 |   await shot(page, "ui", "BB-19b-sinhala-tamil-reviews-submitted-profile");
  191 | });
  192 | 
  193 | test("BB-19c interface language can be switched to Sinhala / Tamil", async ({ page }) => {
  194 |   await page.goto("/");
  195 |   await settle(page);
  196 |   const switcher = await page.locator("select, button, a").filter({ hasText: /^(සිංහල|தமிழ்|SI|TA|Language)$/ }).count();
  197 |   const htmlLang = await page.evaluate(() => document.documentElement.lang);
  198 |   log("BB-19c", `language switch controls on home page=${switcher}; <html lang>=${htmlLang}`);
  199 |   expect(switcher, "a UI language selector (EN/SI/TA)").toBeGreaterThan(0);
  200 | });
  201 | 
  202 | // ------------------------------------------------------------------------------------------------ UI performance (dev server)
  203 | test("PERF-UI page load timings (Next.js dev server; indicative only)", async ({ page }) => {
```