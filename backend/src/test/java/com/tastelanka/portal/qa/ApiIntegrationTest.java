package com.tastelanka.portal.qa;

import com.jayway.jsonpath.JsonPath;
import com.tastelanka.portal.config.DevelopmentDataSeeder;
import com.tastelanka.portal.restaurant.RestaurantRepository;
import com.tastelanka.portal.security.JwtService;
import com.tastelanka.portal.user.Role;
import com.tastelanka.portal.user.User;
import com.tastelanka.portal.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.DefaultApplicationArguments;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

/**
 * QA integration tests for controllers, security rules and persistence (TC-INT-*).
 * Runs the full Spring context against the isolated tastelanka_junit schema (set DB_URL).
 * Tests assert the EXPECTED behaviour; tests linked to a DEF-xxx id fail while that defect is open.
 */
@SpringBootTest
@AutoConfigureMockMvc
class ApiIntegrationTest {
    private static final String DEFAULT_SECRET = "change-this-development-secret-before-production-32-bytes-minimum";

    @Autowired MockMvc mvc;
    @Autowired UserRepository users;
    @Autowired RestaurantRepository restaurants;
    @Autowired PasswordEncoder encoder;
    @Autowired JwtService jwt;
    @Autowired DevelopmentDataSeeder seeder;
    @Value("${app.jwt.secret}") String configuredSecret;

    private String run;
    private String adminToken;

    @BeforeEach
    void setUp() {
        run = UUID.randomUUID().toString().substring(0, 8);
        User admin = new User("JUnit Admin", "junit.admin." + run + "@tastelanka.test", encoder.encode("AdminPass#1"), "en");
        admin.setRole(Role.ADMIN);
        adminToken = jwt.generate(users.save(admin));
    }

    // ------------------------------------------------------------------ helpers
    private int status(MockHttpServletRequestBuilder request) throws Exception {
        return perform(request).getResponse().getStatus();
    }

    private MvcResult perform(MockHttpServletRequestBuilder request) throws Exception {
        return mvc.perform(request).andReturn();
    }

    private MockHttpServletRequestBuilder json(MockHttpServletRequestBuilder b, String body) {
        return b.contentType(MediaType.APPLICATION_JSON).content(body);
    }

    private MockHttpServletRequestBuilder auth(MockHttpServletRequestBuilder b, String token) {
        return b.header("Authorization", "Bearer " + token);
    }

    private String register(String tag) throws Exception {
        MvcResult r = perform(json(post("/api/v1/auth/register"),
                "{\"fullName\":\"JUnit " + tag + "\",\"email\":\"junit." + tag + "." + run + "@tastelanka.test\",\"password\":\"Password#1\"}"));
        assertThat(r.getResponse().getStatus()).isEqualTo(201);
        return JsonPath.read(r.getResponse().getContentAsString(), "$.token");
    }

    private String restaurantBody(String slug, int min, int max) {
        return "{\"slug\":\"" + slug + "\",\"name\":\"JUnit Cafe\",\"cuisine\":\"Sri Lankan\",\"location\":\"Galle\","
                + "\"priceMin\":" + min + ",\"priceMax\":" + max + ",\"vegetarian\":true,\"vegan\":false,\"halal\":true}";
    }

    private long createRestaurant(String slug) throws Exception {
        MvcResult r = perform(json(auth(post("/api/v1/admin/restaurants"), adminToken), restaurantBody(slug, 100, 200)));
        assertThat(r.getResponse().getStatus()).isEqualTo(201);
        return ((Number) JsonPath.read(r.getResponse().getContentAsString(), "$.id")).longValue();
    }

    private long review(String token, String restaurantSlug, int overall) throws Exception {
        MvcResult r = perform(json(auth(post("/api/v1/reviews"), token),
                "{\"restaurantSlug\":\"" + restaurantSlug + "\",\"foodRating\":" + overall + ",\"serviceRating\":" + overall
                        + ",\"overallRating\":" + overall + ",\"language\":\"en\",\"reviewText\":\"JUnit review text\"}"));
        assertThat(r.getResponse().getStatus()).isEqualTo(201);
        return ((Number) JsonPath.read(r.getResponse().getContentAsString(), "$.id")).longValue();
    }

    /** Performs a request whose failure mode may be an unhandled exception; reports that as a test failure, not an error. */
    private int statusOrUnhandled(MockHttpServletRequestBuilder request) {
        try {
            return status(request);
        } catch (Exception e) {
            Throwable root = e;
            while (root.getCause() != null) root = root.getCause();
            fail("Unhandled server exception instead of an HTTP error response: " + root.getClass().getSimpleName()
                    + ": " + root.getMessage());
            return -1;
        }
    }

    // ------------------------------------------------------------------ authentication
    @Test
    @DisplayName("TC-INT-001 registration returns 201, a token and the USER role")
    void registerCustomer() throws Exception {
        MvcResult r = perform(json(post("/api/v1/auth/register"),
                "{\"fullName\":\"JUnit Reg\",\"email\":\"junit.reg." + run + "@tastelanka.test\",\"password\":\"Password#1\",\"role\":\"ADMIN\"}"));
        assertThat(r.getResponse().getStatus()).isEqualTo(201);
        String body = r.getResponse().getContentAsString();
        assertThat((String) JsonPath.read(body, "$.role")).isEqualTo("USER");
        assertThat(body).doesNotContain("passwordHash").doesNotContain("Password#1");
    }

    @Test
    @DisplayName("TC-INT-002 duplicate registration (case-insensitive) returns 409")
    void duplicateRegistration() throws Exception {
        register("dup");
        assertThat(status(json(post("/api/v1/auth/register"),
                "{\"fullName\":\"X\",\"email\":\"JUNIT.DUP." + run.toUpperCase() + "@TASTELANKA.TEST\",\"password\":\"Password#1\"}")))
                .isEqualTo(409);
    }

    @Test
    @DisplayName("TC-INT-003 invalid registration payload returns 400")
    void invalidRegistration() throws Exception {
        assertThat(status(json(post("/api/v1/auth/register"), "{\"fullName\":\"\",\"email\":\"bad\",\"password\":\"x\"}")))
                .isEqualTo(400);
    }

    @Test
    @DisplayName("TC-INT-004 login with wrong password returns 401")
    void wrongPassword() throws Exception {
        register("login");
        assertThat(status(json(post("/api/v1/auth/login"),
                "{\"email\":\"junit.login." + run + "@tastelanka.test\",\"password\":\"WrongPass#1\"}"))).isEqualTo(401);
    }

    @Test
    @DisplayName("TC-INT-005 unauthenticated request to a protected endpoint returns 401 (DEF-001)")
    void anonymousProtectedEndpoint() throws Exception {
        assertThat(status(get("/api/v1/users/me"))).as("anonymous GET /users/me").isEqualTo(401);
    }

    @Test
    @DisplayName("TC-INT-006 JWT signing secret is not the well-known default committed in application.yml (DEF-002)")
    void jwtSecretIsNotDefault() {
        assertThat(configuredSecret).as("app.jwt.secret").isNotEqualTo(DEFAULT_SECRET);
    }

    // ------------------------------------------------------------------ authorization
    @Test
    @DisplayName("TC-INT-010 customer token cannot reach admin endpoints (403)")
    void customerForbiddenFromAdmin() throws Exception {
        String token = register("cust");
        assertThat(status(auth(get("/api/v1/admin/dashboard"), token))).isEqualTo(403);
        assertThat(status(json(auth(post("/api/v1/admin/restaurants"), token), restaurantBody("junit-hack-" + run, 1, 2)))).isEqualTo(403);
        assertThat(status(auth(delete("/api/v1/admin/restaurants/1"), token))).isEqualTo(403);
        assertThat(restaurants.findBySlug("junit-hack-" + run)).isEmpty();
    }

    @Test
    @DisplayName("TC-INT-011 role is read from the database per request (promotion takes effect without re-login)")
    void rolePromotionTakesEffect() throws Exception {
        String token = register("promo");
        assertThat(status(auth(get("/api/v1/admin/dashboard"), token))).isEqualTo(403);
        User u = users.findByEmailIgnoreCase("junit.promo." + run + "@tastelanka.test").orElseThrow();
        u.setRole(Role.MODERATOR);
        users.save(u);
        assertThat(status(auth(get("/api/v1/admin/dashboard"), token))).isEqualTo(200);
    }

    // ------------------------------------------------------------------ reviews & moderation
    @Test
    @DisplayName("TC-INT-020 review is PENDING, hidden publicly, then visible after approval")
    void moderationWorkflow() throws Exception {
        String token = register("rev");
        long id = review(token, "nuga-gama", 4);
        assertThat(perform(get("/api/v1/reviews").param("restaurant", "nuga-gama")).getResponse().getContentAsString())
                .doesNotContain("\"id\":" + id + ",");
        assertThat(status(json(auth(patch("/api/v1/admin/reviews/" + id), adminToken), "{\"status\":\"APPROVED\"}"))).isEqualTo(200);
        assertThat(perform(get("/api/v1/reviews").param("restaurant", "nuga-gama")).getResponse().getContentAsString())
                .contains("\"id\":" + id + ",");
    }

    @Test
    @DisplayName("TC-INT-021 approving a review updates the restaurant's reviewCount and rating (DEF-004)")
    void approvalUpdatesAggregateRating() throws Exception {
        String slug = "junit-agg-" + run;
        createRestaurant(slug);
        String token = register("agg");
        long id = review(token, slug, 4);
        perform(json(auth(patch("/api/v1/admin/reviews/" + id), adminToken), "{\"status\":\"APPROVED\"}"));
        String body = perform(get("/api/v1/restaurants/" + slug)).getResponse().getContentAsString();
        assertThat(((Number) JsonPath.read(body, "$.reviewCount")).intValue()).as("reviewCount after 1 approved review").isEqualTo(1);
        assertThat(((Number) JsonPath.read(body, "$.rating")).doubleValue()).as("rating after one 4-star approval").isEqualTo(4.0);
    }

    @Test
    @DisplayName("TC-INT-022 customer cannot self-approve through the create payload")
    void massAssignmentIgnored() throws Exception {
        String token = register("mass");
        MvcResult r = perform(json(auth(post("/api/v1/reviews"), token),
                "{\"restaurantSlug\":\"nuga-gama\",\"foodRating\":5,\"serviceRating\":5,\"overallRating\":5,\"language\":\"en\","
                        + "\"reviewText\":\"JUnit mass assignment\",\"status\":\"APPROVED\"}"));
        assertThat((String) JsonPath.read(r.getResponse().getContentAsString(), "$.status")).isEqualTo("PENDING");
    }

    // ------------------------------------------------------------------ admin CRUD & integrity
    @Test
    @DisplayName("TC-INT-030 restaurant create -> update -> delete is persisted")
    void restaurantCrud() throws Exception {
        String slug = "junit-crud-" + run;
        long id = createRestaurant(slug);
        assertThat(status(json(auth(put("/api/v1/admin/restaurants/" + id), adminToken), restaurantBody(slug, 300, 400)))).isEqualTo(200);
        assertThat(restaurants.findBySlug(slug).orElseThrow().getPriceMin()).isEqualTo(300);
        assertThat(status(auth(delete("/api/v1/admin/restaurants/" + id), adminToken))).isEqualTo(204);
        assertThat(restaurants.findById(id)).isEmpty();
    }

    @Test
    @DisplayName("TC-INT-031 duplicate slug on create returns 409")
    void duplicateSlugOnCreate() throws Exception {
        assertThat(status(json(auth(post("/api/v1/admin/restaurants"), adminToken), restaurantBody("nuga-gama", 1, 2)))).isEqualTo(409);
    }

    @Test
    @DisplayName("TC-INT-032 duplicate slug on UPDATE returns 409, not an unhandled exception (DEF-003)")
    void duplicateSlugOnUpdate() throws Exception {
        long id = createRestaurant("junit-upd-" + run);
        assertThat(statusOrUnhandled(json(auth(put("/api/v1/admin/restaurants/" + id), adminToken), restaurantBody("nuga-gama", 1, 2))))
                .isEqualTo(409);
    }

    @Test
    @DisplayName("TC-INT-033 deleting a restaurant that has reviews returns 204 or 409, not an unhandled exception (DEF-006)")
    void deleteRestaurantWithReviews() throws Exception {
        String slug = "junit-delrev-" + run;
        long id = createRestaurant(slug);
        review(register("delrev"), slug, 3);
        assertThat(statusOrUnhandled(auth(delete("/api/v1/admin/restaurants/" + id), adminToken))).isIn(204, 409);
    }

    @Test
    @DisplayName("TC-INT-034 restaurant with priceMin > priceMax is rejected with 400 (DEF-005)")
    void invertedPriceRange() throws Exception {
        assertThat(status(json(auth(post("/api/v1/admin/restaurants"), adminToken), restaurantBody("junit-inv-" + run, 9000, 100))))
                .isEqualTo(400);
    }

    @Test
    @DisplayName("TC-INT-035 admin edits to a seeded restaurant survive an application restart / seeder run (DEF-007)")
    void seederDoesNotOverwriteAdminEdits() throws Exception {
        long id = restaurants.findBySlug("green-leaf-kitchen").orElseThrow().getId();
        String edited = "{\"slug\":\"green-leaf-kitchen\",\"name\":\"Green Leaf Kitchen\",\"cuisine\":\"Sri Lankan · Vegetarian\","
                + "\"location\":\"Kandy\",\"priceMin\":1500,\"priceMax\":3000,\"vegetarian\":true,\"vegan\":true,\"halal\":true,"
                + "\"description\":\"JUnit edited description " + run + "\"}";
        assertThat(status(json(auth(put("/api/v1/admin/restaurants/" + id), adminToken), edited))).isEqualTo(200);
        seeder.run(new DefaultApplicationArguments()); // exactly what runs on every application start
        assertThat(restaurants.findBySlug("green-leaf-kitchen").orElseThrow().getDescription())
                .as("description after seeder run").isEqualTo("JUnit edited description " + run);
    }

    @Test
    @DisplayName("TC-INT-036 cuisine create -> public list -> update -> delete is persisted")
    void cuisineCrud() throws Exception {
        String slug = "junit-cuisine-" + run;
        String createBody = "{\"slug\":\"" + slug + "\",\"name\":\"JUnit Cuisine " + run
                + "\",\"description\":\"Initial description\",\"displayOrder\":90}";
        MvcResult created = perform(json(auth(post("/api/v1/admin/cuisines"), adminToken), createBody));
        assertThat(created.getResponse().getStatus()).isEqualTo(201);
        long id = ((Number) JsonPath.read(created.getResponse().getContentAsString(), "$.id")).longValue();

        String publicList = perform(get("/api/v1/cuisines")).getResponse().getContentAsString();
        assertThat(publicList).contains("\"slug\":\"" + slug + "\"");

        String updateBody = "{\"slug\":\"" + slug + "\",\"name\":\"Updated Cuisine " + run
                + "\",\"description\":\"Updated description\",\"displayOrder\":91}";
        MvcResult updated = perform(json(auth(put("/api/v1/admin/cuisines/" + id), adminToken), updateBody));
        assertThat(updated.getResponse().getStatus()).isEqualTo(200);
        assertThat((String) JsonPath.read(updated.getResponse().getContentAsString(), "$.name"))
                .isEqualTo("Updated Cuisine " + run);
        assertThat(status(auth(delete("/api/v1/admin/cuisines/" + id), adminToken))).isEqualTo(204);
        assertThat(status(get("/api/v1/cuisines/" + slug))).isEqualTo(404);
    }

    // ------------------------------------------------------------------ saved restaurants
    @Test
    @DisplayName("TC-INT-040 saving is idempotent and isolated per user")
    void savedRestaurants() throws Exception {
        String a = register("sava");
        String b = register("savb");
        assertThat(status(auth(post("/api/v1/users/me/saved-restaurants/nuga-gama"), a))).isEqualTo(201);
        assertThat(status(auth(post("/api/v1/users/me/saved-restaurants/nuga-gama"), a))).isEqualTo(201);
        String listA = perform(auth(get("/api/v1/users/me/saved-restaurants"), a)).getResponse().getContentAsString();
        assertThat(JsonPath.<java.util.List<String>>read(listA, "$[*].slug")).containsExactly("nuga-gama");
        assertThat(status(auth(delete("/api/v1/users/me/saved-restaurants/nuga-gama"), b))).isEqualTo(204);
        listA = perform(auth(get("/api/v1/users/me/saved-restaurants"), a)).getResponse().getContentAsString();
        assertThat(JsonPath.<java.util.List<String>>read(listA, "$[*].slug")).containsExactly("nuga-gama");
    }

    // ------------------------------------------------------------------ cycle 2: tests for fixes and new behaviour (commit eed62c2)
    @Test
    @DisplayName("TC-INT-023 rejecting a review without a reason returns 400; with a reason it is stored (DEF-020 retest)")
    void rejectionRequiresReason() throws Exception {
        long id = review(register("rej"), "nuga-gama", 2);
        assertThat(status(json(auth(patch("/api/v1/admin/reviews/" + id), adminToken), "{\"status\":\"REJECTED\"}"))).isEqualTo(400);
        assertThat(status(json(auth(patch("/api/v1/admin/reviews/" + id), adminToken), "{\"status\":\"REJECTED\",\"note\":\"   \"}"))).isEqualTo(400);
        MvcResult ok = perform(json(auth(patch("/api/v1/admin/reviews/" + id), adminToken), "{\"status\":\"REJECTED\",\"note\":\"Off-topic\"}"));
        assertThat(ok.getResponse().getStatus()).isEqualTo(200);
        assertThat((String) JsonPath.read(ok.getResponse().getContentAsString(), "$.moderatorNote")).isEqualTo("Off-topic");
    }

    @Test
    @DisplayName("TC-INT-024 moderation records the moderator and the moderation time (DEF-020 retest)")
    void moderationIsTraceable() throws Exception {
        long id = review(register("trace"), "nuga-gama", 4);
        String body = perform(json(auth(patch("/api/v1/admin/reviews/" + id), adminToken), "{\"status\":\"APPROVED\"}")).getResponse().getContentAsString();
        assertThat((String) JsonPath.read(body, "$.moderatedBy")).isEqualTo("JUnit Admin");
        assertThat((String) JsonPath.read(body, "$.moderatedAt")).isNotBlank();
    }

    @Test
    @DisplayName("TC-INT-025 a review cannot be moved back to PENDING")
    void cannotModerateToPending() throws Exception {
        long id = review(register("pend"), "nuga-gama", 3);
        assertThat(status(json(auth(patch("/api/v1/admin/reviews/" + id), adminToken), "{\"status\":\"PENDING\"}"))).isEqualTo(400);
    }

    @Test
    @DisplayName("TC-INT-026 only the author can delete a review; deleting an approved review updates the rating")
    void reviewDeletionOwnerOnlyAndRatingAdjusted() throws Exception {
        String slug = "junit-del-" + run;
        createRestaurant(slug);
        String owner = register("owner");
        String other = register("other");
        long id = review(owner, slug, 5);
        perform(json(auth(patch("/api/v1/admin/reviews/" + id), adminToken), "{\"status\":\"APPROVED\"}"));
        String before = perform(get("/api/v1/restaurants/" + slug)).getResponse().getContentAsString();
        assertThat(((Number) JsonPath.read(before, "$.reviewCount")).intValue()).isEqualTo(1);
        assertThat(status(auth(delete("/api/v1/reviews/" + id), other))).as("non-owner delete").isEqualTo(403);
        assertThat(status(delete("/api/v1/reviews/" + id))).as("anonymous delete").isEqualTo(401);
        assertThat(status(auth(delete("/api/v1/reviews/" + id), owner))).as("owner delete").isEqualTo(204);
        assertThat(status(auth(delete("/api/v1/reviews/" + id), owner))).as("delete again").isEqualTo(404);
        String after = perform(get("/api/v1/restaurants/" + slug)).getResponse().getContentAsString();
        assertThat(((Number) JsonPath.read(after, "$.reviewCount")).intValue()).isZero();
    }

    @Test
    @DisplayName("TC-INT-042 price and spice-level filters return matching restaurants and reject invalid values (DEF-010 retest)")
    void priceAndSpiceFilters() throws Exception {
        String byPrice = perform(get("/api/v1/restaurants").param("maxPrice", "2000")).getResponse().getContentAsString();
        java.util.List<Integer> mins = JsonPath.read(byPrice, "$[*].priceMin");
        assertThat(mins).isNotEmpty().allMatch(p -> p <= 2000);
        assertThat(JsonPath.<java.util.List<String>>read(byPrice, "$[*].slug")).contains("green-leaf-kitchen").doesNotContain("ministry-of-crab");
        String bySpice = perform(get("/api/v1/restaurants").param("spiceLevel", "Hot")).getResponse().getContentAsString();
        assertThat(JsonPath.<java.util.List<String>>read(bySpice, "$[*].slug")).contains("ministry-of-crab").doesNotContain("green-leaf-kitchen");
        assertThat(status(get("/api/v1/restaurants").param("spiceLevel", "Extreme"))).isEqualTo(400);
        assertThat(status(get("/api/v1/restaurants").param("maxPrice", "-1"))).isEqualTo(400);
    }
}
