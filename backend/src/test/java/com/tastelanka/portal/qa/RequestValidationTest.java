package com.tastelanka.portal.qa;

import com.tastelanka.portal.admin.AdminController.DishRequest;
import com.tastelanka.portal.admin.AdminController.ModerationRequest;
import com.tastelanka.portal.admin.AdminController.RestaurantRequest;
import com.tastelanka.portal.auth.AuthController.LoginRequest;
import com.tastelanka.portal.auth.AuthController.RegisterRequest;
import com.tastelanka.portal.review.ReviewController.CreateReviewRequest;
import com.tastelanka.portal.review.ReviewStatus;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;

/** QA unit tests for Bean Validation rules on API request records (TC-UNIT-VAL-*). */
class RequestValidationTest {
    private static jakarta.validation.ValidatorFactory factory;
    private static Validator validator;

    @BeforeAll
    static void setUp() {
        factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @AfterAll
    static void tearDown() {
        factory.close();
    }

    private static boolean valid(Object o) {
        return validator.validate(o).isEmpty();
    }

    private static RestaurantRequest restaurant(String slug, Integer min, Integer max, String colour) {
        return new RestaurantRequest(slug, "Name", "Cuisine", "Galle", min, max, true, false, true, "desc", colour);
    }

    private static CreateReviewRequest review(int food, int service, int overall, String lang, String text) {
        return new CreateReviewRequest("nuga-gama", null, food, service, overall, lang, text);
    }

    @ParameterizedTest(name = "TC-UNIT-VAL-001 password length {0} valid={1}")
    @CsvSource({"7,false", "8,true", "72,true", "73,false"})
    void passwordLengthBoundaries(int length, boolean expected) {
        assertThat(valid(new RegisterRequest("QA", "qa@tastelanka.test", "p".repeat(length), "en"))).isEqualTo(expected);
    }

    @ParameterizedTest(name = "TC-UNIT-VAL-002 email ''{0}'' is rejected")
    @ValueSource(strings = {"", "plainaddress", "a@", "@b.com"})
    void invalidEmailsRejected(String email) {
        assertThat(valid(new RegisterRequest("QA", email, "password1", "en"))).isFalse();
    }

    @Test
    @DisplayName("TC-UNIT-VAL-003 registration rejects blank name and unsupported language")
    void registrationNameAndLanguage() {
        assertThat(valid(new RegisterRequest("  ", "qa@tastelanka.test", "password1", "en"))).isFalse();
        assertThat(valid(new RegisterRequest("QA", "qa@tastelanka.test", "password1", "fr"))).isFalse();
        assertThat(valid(new RegisterRequest("x".repeat(121), "qa@tastelanka.test", "password1", "en"))).isFalse();
    }

    @Test
    @DisplayName("TC-UNIT-VAL-004 login requires email and password")
    void loginRequired() {
        assertThat(valid(new LoginRequest("qa@tastelanka.test", ""))).isFalse();
        assertThat(valid(new LoginRequest("", "password1"))).isFalse();
        assertThat(valid(new LoginRequest("qa@tastelanka.test", "password1"))).isTrue();
    }

    @ParameterizedTest(name = "TC-UNIT-VAL-005 rating {0} valid={1}")
    @CsvSource({"0,false", "1,true", "5,true", "6,false"})
    void ratingBoundaries(int rating, boolean expected) {
        assertThat(valid(review(rating, rating, rating, "en", "Tasty food"))).isEqualTo(expected);
    }

    @Test
    @DisplayName("TC-UNIT-VAL-006 review text must be non-blank and at most 5000 characters")
    void reviewText() {
        assertThat(valid(review(5, 5, 5, "en", "   "))).isFalse();
        assertThat(valid(review(5, 5, 5, "en", "y".repeat(5000)))).isTrue();
        assertThat(valid(review(5, 5, 5, "en", "y".repeat(5001)))).isFalse();
    }

    @ParameterizedTest(name = "TC-UNIT-VAL-007 review language ''{0}'' valid={1}")
    @CsvSource({"en,true", "si,true", "ta,true", "fr,false", "EN,false"})
    void reviewLanguage(String lang, boolean expected) {
        assertThat(valid(review(4, 4, 4, lang, "Tasty food"))).isEqualTo(expected);
    }

    @ParameterizedTest(name = "TC-UNIT-VAL-008 restaurant slug ''{0}'' valid={1}")
    @CsvSource({"green-leaf,true", "a1,true", "Bad Slug,false", "-lead,false", "trail-,false", "double--dash,false", "UPPER,false"})
    void restaurantSlug(String slug, boolean expected) {
        assertThat(valid(restaurant(slug, 100, 200, "#123456"))).isEqualTo(expected);
    }

    @Test
    @DisplayName("TC-UNIT-VAL-009 restaurant prices must be non-negative and colour must be #RRGGBB")
    void restaurantPricesAndColour() {
        assertThat(valid(restaurant("ok", -1, 200, "#123456"))).isFalse();
        assertThat(valid(restaurant("ok", 0, 0, "#123456"))).isTrue();
        assertThat(valid(restaurant("ok", 100, 200, "red"))).isFalse();
        assertThat(valid(restaurant("ok", 100, 200, null))).isTrue();
    }

    @Test
    @org.junit.jupiter.api.Disabled("Cycle 2: obsolete premise - commit eed62c2 validates the price range in AdminController and a DB "
            + "CHECK constraint instead of Bean Validation. Behaviour is verified by TC-INT-034 and API test TC-ADM-007.")
    @DisplayName("TC-UNIT-VAL-010 restaurant with minimum price above maximum price is rejected (DEF-005)")
    void priceRangeOrder() {
        assertThat(valid(restaurant("inverted", 9000, 100, "#123456")))
                .as("priceMin 9000 > priceMax 100 should fail validation")
                .isFalse();
    }

    @ParameterizedTest(name = "TC-UNIT-VAL-011 dish spice ''{0}'' valid={1}")
    @CsvSource({"Mild,true", "Medium,true", "Hot,true", "Extreme,false", "hot,false"})
    void dishSpice(String spice, boolean expected) {
        assertThat(valid(new DishRequest("nuga-gama", "qa-dish", "Dish", null, 500, spice, true, true, null))).isEqualTo(expected);
    }

    @Test
    @DisplayName("TC-UNIT-VAL-012 moderation requires status and limits note to 500 characters")
    void moderation() {
        assertThat(valid(new ModerationRequest(null, null))).isFalse();
        assertThat(valid(new ModerationRequest(ReviewStatus.APPROVED, "n".repeat(500)))).isTrue();
        assertThat(valid(new ModerationRequest(ReviewStatus.APPROVED, "n".repeat(501)))).isFalse();
    }
}
