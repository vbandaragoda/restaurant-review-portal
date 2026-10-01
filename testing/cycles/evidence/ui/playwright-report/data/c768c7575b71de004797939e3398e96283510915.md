# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> TC-ADM-UI-004 moderator can enter a moderation note / reason when rejecting
- Location: specs\admin.spec.ts:195:5

# Error details

```
Error: moderation UI should allow recording a reason (API supports 'note')

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - generic [ref=f1e2]:
    - banner [ref=f1e3]:
      - link "TasteLanka home" [ref=f1e4] [cursor=pointer]:
        - /url: /
        - generic [ref=f1e6]:
          - strong [ref=f1e7]: TasteLanka
          - generic [ref=f1e8]: Discover • Dine • Review
      - navigation "Main navigation" [ref=f1e9]:
        - link "Home" [ref=f1e10] [cursor=pointer]:
          - /url: /
        - link "Restaurants" [ref=f1e11] [cursor=pointer]:
          - /url: /restaurants
        - link "Cuisines" [ref=f1e12] [cursor=pointer]:
          - /url: /cuisines
        - link "About" [ref=f1e13] [cursor=pointer]:
          - /url: /about
      - link "Dashboard" [ref=f1e15] [cursor=pointer]:
        - /url: /admin
    - generic [ref=f1e16]:
      - complementary [ref=f1e17]:
        - paragraph [ref=f1e18]: ADMIN PORTAL
        - navigation [ref=f1e19]:
          - link "Dashboard" [ref=f1e20] [cursor=pointer]:
            - /url: /admin
          - link "Restaurants" [ref=f1e21] [cursor=pointer]:
            - /url: /admin/restaurants
          - link "Menu" [ref=f1e22] [cursor=pointer]:
            - /url: /admin/menu
          - link "Review Moderation" [ref=f1e23] [cursor=pointer]:
            - /url: /admin/reviews
      - main [ref=f1e24]:
        - heading "Review Moderation" [level=1] [ref=f1e25]
        - paragraph [ref=f1e26]: Approve or reject multilingual community reviews before publication.
        - generic [ref=f1e27]:
          - generic [ref=f1e28]:
            - button "PENDING" [ref=f1e29]
            - button "APPROVED" [ref=f1e30]
            - button "REJECTED" [ref=f1e31]
          - generic [ref=f1e32]:
            - article [ref=f1e33]:
              - generic [ref=f1e34]:
                - heading "QA User A" [level=2] [ref=f1e35]
                - generic [ref=f1e36]: reviewed Nuga Gama
                - generic [ref=f1e37]: en
              - paragraph [ref=f1e38]: ★☆☆☆☆
              - paragraph [ref=f1e39]: QA boundary review – minimum ratings.
              - paragraph [ref=f1e40]: Food 1 • Service 1 • Overall 1
              - generic [ref=f1e41]:
                - button "Reject" [ref=f1e42]
                - button "Approve" [ref=f1e43]
            - article [ref=f1e44]:
              - generic [ref=f1e45]:
                - heading "QA User A" [level=2] [ref=f1e46]
                - generic [ref=f1e47]: reviewed Nuga Gama
                - generic [ref=f1e48]: en
              - paragraph [ref=f1e49]: ★★★★☆
              - paragraph [ref=f1e50]: yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
              - paragraph [ref=f1e51]: Food 4 • Service 5 • Overall 4
              - generic [ref=f1e52]:
                - button "Reject" [ref=f1e53]
                - button "Approve" [ref=f1e54]
            - article [ref=f1e55]:
              - generic [ref=f1e56]:
                - heading "QA User A" [level=2] [ref=f1e57]
                - generic [ref=f1e58]: reviewed QA Reviewed Cafe
                - generic [ref=f1e59]: en
              - paragraph [ref=f1e60]: ★★★★☆
              - paragraph [ref=f1e61]: QA review on a restaurant that will be deleted.
              - paragraph [ref=f1e62]: Food 4 • Service 5 • Overall 4
              - generic [ref=f1e63]:
                - button "Reject" [ref=f1e64]
                - button "Approve" [ref=f1e65]
            - article [ref=f1e66]:
              - generic [ref=f1e67]:
                - heading "QA User A" [level=2] [ref=f1e68]
                - generic [ref=f1e69]: reviewed Pedlar’s Inn
                - generic [ref=f1e70]: en
              - paragraph [ref=f1e71]: ★★★★☆
              - paragraph [ref=f1e72]: QA performance sample review
              - paragraph [ref=f1e73]: Food 4 • Service 4 • Overall 4
              - generic [ref=f1e74]:
                - button "Reject" [ref=f1e75]
                - button "Approve" [ref=f1e76]
            - article [ref=f1e77]:
              - generic [ref=f1e78]:
                - heading "QA User A" [level=2] [ref=f1e79]
                - generic [ref=f1e80]: reviewed Pedlar’s Inn
                - generic [ref=f1e81]: en
              - paragraph [ref=f1e82]: ★★★★☆
              - paragraph [ref=f1e83]: QA performance sample review
              - paragraph [ref=f1e84]: Food 4 • Service 4 • Overall 4
              - generic [ref=f1e85]:
                - button "Reject" [ref=f1e86]
                - button "Approve" [ref=f1e87]
            - article [ref=f1e88]:
              - generic [ref=f1e89]:
                - heading "QA User A" [level=2] [ref=f1e90]
                - generic [ref=f1e91]: reviewed Pedlar’s Inn
                - generic [ref=f1e92]: en
              - paragraph [ref=f1e93]: ★★★★☆
              - paragraph [ref=f1e94]: QA performance sample review
              - paragraph [ref=f1e95]: Food 4 • Service 4 • Overall 4
              - generic [ref=f1e96]:
                - button "Reject" [ref=f1e97]
                - button "Approve" [ref=f1e98]
            - article [ref=f1e99]:
              - generic [ref=f1e100]:
                - heading "QA User A" [level=2] [ref=f1e101]
                - generic [ref=f1e102]: reviewed Pedlar’s Inn
                - generic [ref=f1e103]: en
              - paragraph [ref=f1e104]: ★★★★☆
              - paragraph [ref=f1e105]: QA performance sample review
              - paragraph [ref=f1e106]: Food 4 • Service 4 • Overall 4
              - generic [ref=f1e107]:
                - button "Reject" [ref=f1e108]
                - button "Approve" [ref=f1e109]
            - article [ref=f1e110]:
              - generic [ref=f1e111]:
                - heading "QA User A" [level=2] [ref=f1e112]
                - generic [ref=f1e113]: reviewed Pedlar’s Inn
                - generic [ref=f1e114]: en
              - paragraph [ref=f1e115]: ★★★★☆
              - paragraph [ref=f1e116]: QA performance sample review
              - paragraph [ref=f1e117]: Food 4 • Service 4 • Overall 4
              - generic [ref=f1e118]:
                - button "Reject" [ref=f1e119]
                - button "Approve" [ref=f1e120]
            - article [ref=f1e121]:
              - generic [ref=f1e122]:
                - heading "QA User A" [level=2] [ref=f1e123]
                - generic [ref=f1e124]: reviewed Pedlar’s Inn
                - generic [ref=f1e125]: en
              - paragraph [ref=f1e126]: ★★★★☆
              - paragraph [ref=f1e127]: QA performance sample review
              - paragraph [ref=f1e128]: Food 4 • Service 4 • Overall 4
              - generic [ref=f1e129]:
                - button "Reject" [ref=f1e130]
                - button "Approve" [ref=f1e131]
            - article [ref=f1e132]:
              - generic [ref=f1e133]:
                - heading "QA User A" [level=2] [ref=f1e134]
                - generic [ref=f1e135]: reviewed Pedlar’s Inn
                - generic [ref=f1e136]: en
              - paragraph [ref=f1e137]: ★★★★☆
              - paragraph [ref=f1e138]: QA performance sample review
              - paragraph [ref=f1e139]: Food 4 • Service 4 • Overall 4
              - generic [ref=f1e140]:
                - button "Reject" [ref=f1e141]
                - button "Approve" [ref=f1e142]
            - article [ref=f1e143]:
              - generic [ref=f1e144]:
                - heading "QA User A" [level=2] [ref=f1e145]
                - generic [ref=f1e146]: reviewed Pedlar’s Inn
                - generic [ref=f1e147]: en
              - paragraph [ref=f1e148]: ★★★★☆
              - paragraph [ref=f1e149]: QA performance sample review
              - paragraph [ref=f1e150]: Food 4 • Service 4 • Overall 4
              - generic [ref=f1e151]:
                - button "Reject" [ref=f1e152]
                - button "Approve" [ref=f1e153]
            - article [ref=f1e154]:
              - generic [ref=f1e155]:
                - heading "QA User A" [level=2] [ref=f1e156]
                - generic [ref=f1e157]: reviewed Pedlar’s Inn
                - generic [ref=f1e158]: en
              - paragraph [ref=f1e159]: ★★★★☆
              - paragraph [ref=f1e160]: QA performance sample review
              - paragraph [ref=f1e161]: Food 4 • Service 4 • Overall 4
              - generic [ref=f1e162]:
                - button "Reject" [ref=f1e163]
                - button "Approve" [ref=f1e164]
            - article [ref=f1e165]:
              - generic [ref=f1e166]:
                - heading "QA User A" [level=2] [ref=f1e167]
                - generic [ref=f1e168]: reviewed Pedlar’s Inn
                - generic [ref=f1e169]: en
              - paragraph [ref=f1e170]: ★★★★☆
              - paragraph [ref=f1e171]: QA performance sample review
              - paragraph [ref=f1e172]: Food 4 • Service 4 • Overall 4
              - generic [ref=f1e173]:
                - button "Reject" [ref=f1e174]
                - button "Approve" [ref=f1e175]
            - article [ref=f1e176]:
              - generic [ref=f1e177]:
                - heading "QA UI Customer" [level=2] [ref=f1e178]
                - generic [ref=f1e179]: reviewed Green Leaf Kitchen
                - generic [ref=f1e180]: en
              - paragraph [ref=f1e181]: ★★★★★
              - paragraph [ref=f1e182]: "QA UI review 135906: lovely vegetarian curry, attentive staff."
              - paragraph [ref=f1e183]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e184]:
                - button "Reject" [ref=f1e185]
                - button "Approve" [ref=f1e186]
            - article [ref=f1e187]:
              - generic [ref=f1e188]:
                - heading "QA Language" [level=2] [ref=f1e189]
                - generic [ref=f1e190]: reviewed Nuga Gama
                - generic [ref=f1e191]: si
              - paragraph [ref=f1e192]: ★★★★★
              - paragraph [ref=f1e193]: ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි.
              - paragraph [ref=f1e194]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e195]:
                - button "Reject" [ref=f1e196]
                - button "Approve" [ref=f1e197]
            - article [ref=f1e198]:
              - generic [ref=f1e199]:
                - heading "QA Language" [level=2] [ref=f1e200]
                - generic [ref=f1e201]: reviewed Nuga Gama
                - generic [ref=f1e202]: ta
              - paragraph [ref=f1e203]: ★★★★★
              - paragraph [ref=f1e204]: அருமையான உணவு, மீண்டும் வருவேன்.
              - paragraph [ref=f1e205]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e206]:
                - button "Reject" [ref=f1e207]
                - button "Approve" [ref=f1e208]
            - article [ref=f1e209]:
              - generic [ref=f1e210]:
                - heading "ශානි ප්‍රනාන්දු" [level=2] [ref=f1e211]
                - generic [ref=f1e212]: reviewed Ministry of Crab
                - generic [ref=f1e213]: ta
              - paragraph [ref=f1e214]: ★★★★★
              - paragraph [ref=f1e215]: நண்டு கறி மிகவும் சுவையாக இருந்தது.
              - paragraph [ref=f1e216]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e217]:
                - button "Reject" [ref=f1e218]
                - button "Approve" [ref=f1e219]
            - article [ref=f1e220]:
              - generic [ref=f1e221]:
                - heading "QA UI Customer" [level=2] [ref=f1e222]
                - generic [ref=f1e223]: reviewed Green Leaf Kitchen
                - generic [ref=f1e224]: en
              - paragraph [ref=f1e225]: ★★★★★
              - paragraph [ref=f1e226]: "QA UI review 141022: lovely vegetarian curry, attentive staff."
              - paragraph [ref=f1e227]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e228]:
                - button "Reject" [ref=f1e229]
                - button "Approve" [ref=f1e230]
            - article [ref=f1e231]:
              - generic [ref=f1e232]:
                - heading "ශානි ප්‍රනාන්දු" [level=2] [ref=f1e233]
                - generic [ref=f1e234]: reviewed Ministry of Crab
                - generic [ref=f1e235]: ta
              - paragraph [ref=f1e236]: ★★★★★
              - paragraph [ref=f1e237]: நண்டு கறி மிகவும் சுவையாக இருந்தது.
              - paragraph [ref=f1e238]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e239]:
                - button "Reject" [ref=f1e240]
                - button "Approve" [ref=f1e241]
            - article [ref=f1e242]:
              - generic [ref=f1e243]:
                - heading "QA Moderation Customer" [level=2] [ref=f1e244]
                - generic [ref=f1e245]: reviewed The Empire Cafe
                - generic [ref=f1e246]: en
              - paragraph [ref=f1e247]: ★★★★★
              - paragraph [ref=f1e248]: QA-MOD-APPROVE 141338 excellent hoppers
              - paragraph [ref=f1e249]: Food 5 • Service 4 • Overall 5
              - generic [ref=f1e250]:
                - button "Reject" [ref=f1e251]
                - button "Approve" [ref=f1e252]
            - article [ref=f1e253]:
              - generic [ref=f1e254]:
                - heading "QA Moderation Customer" [level=2] [ref=f1e255]
                - generic [ref=f1e256]: reviewed The Empire Cafe
                - generic [ref=f1e257]: en
              - paragraph [ref=f1e258]: ★★★★★
              - paragraph [ref=f1e259]: QA-MOD-REJECT 141338 spam content here
              - paragraph [ref=f1e260]: Food 5 • Service 4 • Overall 5
              - generic [ref=f1e261]:
                - button "Reject" [ref=f1e262]
                - button "Approve" [ref=f1e263]
            - article [ref=f1e264]:
              - generic [ref=f1e265]:
                - heading "QA UI Customer" [level=2] [ref=f1e266]
                - generic [ref=f1e267]: reviewed Green Leaf Kitchen
                - generic [ref=f1e268]: en
              - paragraph [ref=f1e269]: ★★★★★
              - paragraph [ref=f1e270]: "QA UI review 141338: lovely vegetarian curry, attentive staff."
              - paragraph [ref=f1e271]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e272]:
                - button "Reject" [ref=f1e273]
                - button "Approve" [ref=f1e274]
            - article [ref=f1e275]:
              - generic [ref=f1e276]:
                - heading "QA Language" [level=2] [ref=f1e277]
                - generic [ref=f1e278]: reviewed Nuga Gama
                - generic [ref=f1e279]: si
              - paragraph [ref=f1e280]: ★★★★★
              - paragraph [ref=f1e281]: ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි.
              - paragraph [ref=f1e282]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e283]:
                - button "Reject" [ref=f1e284]
                - button "Approve" [ref=f1e285]
            - article [ref=f1e286]:
              - generic [ref=f1e287]:
                - heading "QA Language" [level=2] [ref=f1e288]
                - generic [ref=f1e289]: reviewed Nuga Gama
                - generic [ref=f1e290]: ta
              - paragraph [ref=f1e291]: ★★★★★
              - paragraph [ref=f1e292]: அருமையான உணவு, மீண்டும் வருவேன்.
              - paragraph [ref=f1e293]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e294]:
                - button "Reject" [ref=f1e295]
                - button "Approve" [ref=f1e296]
            - article [ref=f1e297]:
              - generic [ref=f1e298]:
                - heading "DR Two" [level=2] [ref=f1e299]
                - generic [ref=f1e300]: reviewed Pedlar’s Inn
                - generic [ref=f1e301]: en
              - paragraph [ref=f1e302]: ★★★★☆
              - paragraph [ref=f1e303]: DR-02 141338 the lamprais was superb and service quick
              - paragraph [ref=f1e304]: Food 5 • Service 5 • Overall 4
              - generic [ref=f1e305]:
                - button "Reject" [ref=f1e306]
                - button "Approve" [ref=f1e307]
            - article [ref=f1e308]:
              - generic [ref=f1e309]:
                - heading "QA Moderation Customer" [level=2] [ref=f1e310]
                - generic [ref=f1e311]: reviewed The Empire Cafe
                - generic [ref=f1e312]: en
              - paragraph [ref=f1e313]: ★★★★★
              - paragraph [ref=f1e314]: QA-MOD-APPROVE 141925 excellent hoppers
              - paragraph [ref=f1e315]: Food 5 • Service 4 • Overall 5
              - generic [ref=f1e316]:
                - button "Reject" [ref=f1e317]
                - button "Approve" [ref=f1e318]
            - article [ref=f1e319]:
              - generic [ref=f1e320]:
                - heading "QA Moderation Customer" [level=2] [ref=f1e321]
                - generic [ref=f1e322]: reviewed The Empire Cafe
                - generic [ref=f1e323]: en
              - paragraph [ref=f1e324]: ★★★★★
              - paragraph [ref=f1e325]: QA-MOD-REJECT 141925 spam content here
              - paragraph [ref=f1e326]: Food 5 • Service 4 • Overall 5
              - generic [ref=f1e327]:
                - button "Reject" [ref=f1e328]
                - button "Approve" [ref=f1e329]
            - article [ref=f1e330]:
              - generic [ref=f1e331]:
                - heading "ශානි ප්‍රනාන්දු" [level=2] [ref=f1e332]
                - generic [ref=f1e333]: reviewed Ministry of Crab
                - generic [ref=f1e334]: ta
              - paragraph [ref=f1e335]: ★★★★★
              - paragraph [ref=f1e336]: நண்டு கறி மிகவும் சுவையாக இருந்தது.
              - paragraph [ref=f1e337]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e338]:
                - button "Reject" [ref=f1e339]
                - button "Approve" [ref=f1e340]
            - article [ref=f1e341]:
              - generic [ref=f1e342]:
                - heading "QA UI Customer" [level=2] [ref=f1e343]
                - generic [ref=f1e344]: reviewed Green Leaf Kitchen
                - generic [ref=f1e345]: en
              - paragraph [ref=f1e346]: ★★★★★
              - paragraph [ref=f1e347]: "QA UI review 141925: lovely vegetarian curry, attentive staff."
              - paragraph [ref=f1e348]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e349]:
                - button "Reject" [ref=f1e350]
                - button "Approve" [ref=f1e351]
            - article [ref=f1e352]:
              - generic [ref=f1e353]:
                - heading "QA Language" [level=2] [ref=f1e354]
                - generic [ref=f1e355]: reviewed Nuga Gama
                - generic [ref=f1e356]: si
              - paragraph [ref=f1e357]: ★★★★★
              - paragraph [ref=f1e358]: ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි.
              - paragraph [ref=f1e359]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e360]:
                - button "Reject" [ref=f1e361]
                - button "Approve" [ref=f1e362]
            - article [ref=f1e363]:
              - generic [ref=f1e364]:
                - heading "QA Language" [level=2] [ref=f1e365]
                - generic [ref=f1e366]: reviewed Nuga Gama
                - generic [ref=f1e367]: ta
              - paragraph [ref=f1e368]: ★★★★★
              - paragraph [ref=f1e369]: அருமையான உணவு, மீண்டும் வருவேன்.
              - paragraph [ref=f1e370]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e371]:
                - button "Reject" [ref=f1e372]
                - button "Approve" [ref=f1e373]
            - article [ref=f1e374]:
              - generic [ref=f1e375]:
                - heading "ශානි ප්‍රනාන්දු" [level=2] [ref=f1e376]
                - generic [ref=f1e377]: reviewed Ministry of Crab
                - generic [ref=f1e378]: ta
              - paragraph [ref=f1e379]: ★★★★★
              - paragraph [ref=f1e380]: நண்டு கறி மிகவும் சுவையாக இருந்தது.
              - paragraph [ref=f1e381]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e382]:
                - button "Reject" [ref=f1e383]
                - button "Approve" [ref=f1e384]
            - article [ref=f1e385]:
              - generic [ref=f1e386]:
                - heading "QA Language" [level=2] [ref=f1e387]
                - generic [ref=f1e388]: reviewed Nuga Gama
                - generic [ref=f1e389]: si
              - paragraph [ref=f1e390]: ★★★★★
              - paragraph [ref=f1e391]: ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි.
              - paragraph [ref=f1e392]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e393]:
                - button "Reject" [ref=f1e394]
                - button "Approve" [ref=f1e395]
            - article [ref=f1e396]:
              - generic [ref=f1e397]:
                - heading "QA Language" [level=2] [ref=f1e398]
                - generic [ref=f1e399]: reviewed Nuga Gama
                - generic [ref=f1e400]: ta
              - paragraph [ref=f1e401]: ★★★★★
              - paragraph [ref=f1e402]: அருமையான உணவு, மீண்டும் வருவேன்.
              - paragraph [ref=f1e403]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e404]:
                - button "Reject" [ref=f1e405]
                - button "Approve" [ref=f1e406]
            - article [ref=f1e407]:
              - generic [ref=f1e408]:
                - heading "QA UI Customer" [level=2] [ref=f1e409]
                - generic [ref=f1e410]: reviewed Green Leaf Kitchen
                - generic [ref=f1e411]: en
              - paragraph [ref=f1e412]: ★★★★★
              - paragraph [ref=f1e413]: "QA UI review 143146: lovely vegetarian curry, attentive staff."
              - paragraph [ref=f1e414]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e415]:
                - button "Reject" [ref=f1e416]
                - button "Approve" [ref=f1e417]
            - article [ref=f1e418]:
              - generic [ref=f1e419]:
                - heading "ශානි ප්‍රනාන්දු" [level=2] [ref=f1e420]
                - generic [ref=f1e421]: reviewed Ministry of Crab
                - generic [ref=f1e422]: ta
              - paragraph [ref=f1e423]: ★★★★★
              - paragraph [ref=f1e424]: நண்டு கறி மிகவும் சுவையாக இருந்தது.
              - paragraph [ref=f1e425]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e426]:
                - button "Reject" [ref=f1e427]
                - button "Approve" [ref=f1e428]
            - article [ref=f1e429]:
              - generic [ref=f1e430]:
                - heading "QA UI Customer" [level=2] [ref=f1e431]
                - generic [ref=f1e432]: reviewed Green Leaf Kitchen
                - generic [ref=f1e433]: en
              - paragraph [ref=f1e434]: ★★★★★
              - paragraph [ref=f1e435]: "QA UI review 200712: lovely vegetarian curry, attentive staff."
              - paragraph [ref=f1e436]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e437]:
                - button "Reject" [ref=f1e438]
                - button "Approve" [ref=f1e439]
            - article [ref=f1e440]:
              - generic [ref=f1e441]:
                - heading "QA Language" [level=2] [ref=f1e442]
                - generic [ref=f1e443]: reviewed Nuga Gama
                - generic [ref=f1e444]: si
              - paragraph [ref=f1e445]: ★★★★★
              - paragraph [ref=f1e446]: ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි.
              - paragraph [ref=f1e447]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e448]:
                - button "Reject" [ref=f1e449]
                - button "Approve" [ref=f1e450]
            - article [ref=f1e451]:
              - generic [ref=f1e452]:
                - heading "QA Language" [level=2] [ref=f1e453]
                - generic [ref=f1e454]: reviewed Nuga Gama
                - generic [ref=f1e455]: ta
              - paragraph [ref=f1e456]: ★★★★★
              - paragraph [ref=f1e457]: அருமையான உணவு, மீண்டும் வருவேன்.
              - paragraph [ref=f1e458]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e459]:
                - button "Reject" [ref=f1e460]
                - button "Approve" [ref=f1e461]
            - article [ref=f1e462]:
              - generic [ref=f1e463]:
                - heading "ශානි ප්‍රනාන්දු" [level=2] [ref=f1e464]
                - generic [ref=f1e465]: reviewed Ministry of Crab
                - generic [ref=f1e466]: ta
              - paragraph [ref=f1e467]: ★★★★★
              - paragraph [ref=f1e468]: நண்டு கறி மிகவும் சுவையாக இருந்தது.
              - paragraph [ref=f1e469]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e470]:
                - button "Reject" [ref=f1e471]
                - button "Approve" [ref=f1e472]
            - article [ref=f1e473]:
              - generic [ref=f1e474]:
                - heading "QA Language" [level=2] [ref=f1e475]
                - generic [ref=f1e476]: reviewed Nuga Gama
                - generic [ref=f1e477]: si
              - paragraph [ref=f1e478]: ★★★★★
              - paragraph [ref=f1e479]: ඉතා රසවත් කෑම වේලක්. නැවත පැමිණෙමි.
              - paragraph [ref=f1e480]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e481]:
                - button "Reject" [ref=f1e482]
                - button "Approve" [ref=f1e483]
            - article [ref=f1e484]:
              - generic [ref=f1e485]:
                - heading "QA Language" [level=2] [ref=f1e486]
                - generic [ref=f1e487]: reviewed Nuga Gama
                - generic [ref=f1e488]: ta
              - paragraph [ref=f1e489]: ★★★★★
              - paragraph [ref=f1e490]: அருமையான உணவு, மீண்டும் வருவேன்.
              - paragraph [ref=f1e491]: Food 5 • Service 5 • Overall 5
              - generic [ref=f1e492]:
                - button "Reject" [ref=f1e493]
                - button "Approve" [ref=f1e494]
  - button "Open Next.js Dev Tools" [ref=f1e500] [cursor=pointer]
  - alert [ref=f1e504]
```

# Test source

```ts
  100 |   const msg = page.getByText(/could not be deleted/);
  101 |   await expect(msg).toBeVisible();
  102 |   log("TC-ADM-UI-002", `message shown: ${await msg.textContent()}`);
  103 |   await shot(page, "ui", "TC-ADM-UI-002-delete-restaurant-with-reviews");
  104 |   // The message tells the admin to remove reviews first; check whether the admin UI offers any way to delete reviews.
  105 |   await page.goto("/admin/reviews");
  106 |   await page.getByRole("button", { name: "APPROVED" }).click();
  107 |   const deleteReviewButtons = await page.getByRole("button", { name: /delete/i }).count();
  108 |   log("TC-ADM-UI-002", `review delete controls available in moderation UI: ${deleteReviewButtons}`);
  109 |   expect(deleteReviewButtons, "admin must have a way to act on the instruction 'Remove its menu and reviews first'").toBeGreaterThan(0);
  110 | });
  111 | 
  112 | test("BB-16 admin creates, updates and deletes a dish through the UI", async ({ page }) => {
  113 |   acceptDialogs(page);
  114 |   await loginAdmin(page);
  115 |   await page.goto("/admin/menu");
  116 |   await expect(page.getByRole("heading", { name: "Menu Management" })).toBeVisible();
  117 |   await page.getByLabel("Restaurant").selectOption("nuga-gama");
  118 |   await page.getByLabel("Dish name").fill("QA UI Kiribath");
  119 |   await page.getByLabel("Slug").fill(dishSlug);
  120 |   await page.getByLabel("Price").fill("650");
  121 |   await page.getByLabel("Spice").selectOption("Mild");
  122 |   await page.getByLabel("Description").fill("Milk rice with lunu miris.");
  123 |   await page.getByRole("checkbox", { name: "Vegetarian" }).check();
  124 |   await page.getByRole("button", { name: "Save Dish" }).click();
  125 |   await expect(page.getByText("Menu item saved.")).toBeVisible();
  126 |   const card = page.getByRole("article").filter({ hasText: "QA UI Kiribath" });
  127 |   await expect(card).toContainText("Nuga Gama • LKR 650");
  128 |   await shot(page, "ui", "BB-16a-dish-created");
  129 | 
  130 |   await card.getByRole("button", { name: "Edit" }).click();
  131 |   await page.getByLabel("Price").fill("700");
  132 |   await page.getByLabel("Spice").selectOption("Medium");
  133 |   await page.getByRole("button", { name: "Save Dish" }).click();
  134 |   await expect(page.getByText("Menu item saved.")).toBeVisible();
  135 |   await expect(page.getByRole("article").filter({ hasText: "QA UI Kiribath" })).toContainText("LKR 700");
  136 |   const d = await (await fetch(`${API}/dishes/${dishSlug}`)).json();
  137 |   expect([d.price, d.spiceLevel, d.restaurantSlug]).toEqual([700, "Medium", "nuga-gama"]);
  138 |   await page.goto("/restaurants/nuga-gama");
  139 |   await expect(page.getByRole("heading", { name: "QA UI Kiribath" })).toBeVisible();
  140 |   await shot(page, "ui", "BB-16b-dish-updated-visible-on-menu");
  141 | 
  142 |   await page.goto("/admin/menu");
  143 |   await page.getByRole("article").filter({ hasText: "QA UI Kiribath" }).getByRole("button", { name: "Delete" }).click();
  144 |   await expect(page.getByRole("article").filter({ hasText: "QA UI Kiribath" })).toHaveCount(0);
  145 |   await shot(page, "ui", "BB-16c-dish-deleted");
  146 | });
  147 | 
  148 | test("TC-ADM-UI-003 invalid restaurant input shows validation feedback", async ({ page }) => {
  149 |   await loginAdmin(page);
  150 |   await page.goto("/admin/restaurants");
  151 |   await page.getByLabel("Name", { exact: true }).fill("Bad");
  152 |   await page.getByLabel("Slug").fill("Bad Slug!");
  153 |   await page.getByRole("button", { name: "Save Restaurant" }).click();
  154 |   const msg = await page.getByLabel("Slug").evaluate((el: HTMLInputElement) => el.validationMessage);
  155 |   log("TC-ADM-UI-003", `slug validation message: "${msg}"`);
  156 |   expect(msg).not.toBe("");
  157 |   await shot(page, "ui", "TC-ADM-UI-003-invalid-slug", false);
  158 | });
  159 | 
  160 | test("BB-13 admin approves and rejects pending reviews; public visibility follows status", async ({ page }) => {
  161 |   // arrange: two fresh pending reviews from a new customer
  162 |   const email = `qa.ui.modcust.${RUN}@tastelanka.test`;
  163 |   const token = await apiRegister("QA Moderation Customer", email);
  164 |   for (const text of [`QA-MOD-APPROVE ${RUN} excellent hoppers`, `QA-MOD-REJECT ${RUN} spam content here`]) {
  165 |     const r = await fetch(`${API}/reviews`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  166 |       body: JSON.stringify({ restaurantSlug: "the-empire-cafe", foodRating: 5, serviceRating: 4, overallRating: 5, language: "en", reviewText: text }) });
  167 |     expect(r.status).toBe(201);
  168 |   }
  169 |   await loginAdmin(page);
  170 |   await page.goto("/admin/reviews");
  171 |   await expect(page.getByRole("heading", { name: "Review Moderation" })).toBeVisible();
  172 |   const approve = page.getByRole("article").filter({ hasText: `QA-MOD-APPROVE ${RUN}` });
  173 |   const reject = page.getByRole("article").filter({ hasText: `QA-MOD-REJECT ${RUN}` });
  174 |   await expect(approve).toBeVisible();
  175 |   await shot(page, "ui", "BB-13a-moderation-pending-queue");
  176 |   await approve.getByRole("button", { name: "Approve" }).click();
  177 |   await expect(page.getByText("Review approved.")).toBeVisible();
  178 |   await reject.getByRole("button", { name: "Reject" }).click();
  179 |   await expect(page.getByText("Review rejected.")).toBeVisible();
  180 |   await page.getByRole("button", { name: "APPROVED" }).click();
  181 |   await expect(page.getByRole("article").filter({ hasText: `QA-MOD-APPROVE ${RUN}` })).toBeVisible();
  182 |   await shot(page, "ui", "BB-13b-moderation-approved-tab");
  183 |   await page.getByRole("button", { name: "REJECTED" }).click();
  184 |   await expect(page.getByRole("article").filter({ hasText: `QA-MOD-REJECT ${RUN}` })).toBeVisible();
  185 |   await page.goto("/restaurants/the-empire-cafe");
  186 |   await expect(page.getByText(`QA-MOD-APPROVE ${RUN}`)).toBeVisible();
  187 |   await expect(page.getByText(`QA-MOD-REJECT ${RUN}`)).toHaveCount(0);
  188 |   await shot(page, "ui", "BB-13c-public-page-shows-only-approved");
  189 |   // author sees outcome
  190 |   await loginOk(page, email);
  191 |   await expect(page.getByRole("article").filter({ hasText: `QA-MOD-REJECT ${RUN}` }).getByText("REJECTED")).toBeVisible();
  192 |   await shot(page, "ui", "BB-13d-author-sees-moderation-outcome");
  193 | });
  194 | 
  195 | test("TC-ADM-UI-004 moderator can enter a moderation note / reason when rejecting", async ({ page }) => {
  196 |   await loginAdmin(page);
  197 |   await page.goto("/admin/reviews");
  198 |   const noteFields = await page.locator("textarea, input[type=text]").count();
  199 |   log("TC-ADM-UI-004", `note/reason inputs in moderation UI: ${noteFields}`);
> 200 |   expect(noteFields, "moderation UI should allow recording a reason (API supports 'note')").toBeGreaterThan(0);
      |                                                                                             ^ Error: moderation UI should allow recording a reason (API supports 'note')
  201 | });
  202 | 
```