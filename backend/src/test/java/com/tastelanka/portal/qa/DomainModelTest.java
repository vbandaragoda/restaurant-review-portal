package com.tastelanka.portal.qa;

import com.tastelanka.portal.auth.AuthController.RegisterRequest;
import com.tastelanka.portal.dish.Dish;
import com.tastelanka.portal.restaurant.Restaurant;
import com.tastelanka.portal.review.Review;
import com.tastelanka.portal.review.ReviewStatus;
import com.tastelanka.portal.user.Role;
import com.tastelanka.portal.user.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

/** QA unit tests for entity defaults and state transitions (TC-UNIT-DOM-*). */
class DomainModelTest {

    private Restaurant restaurant() {
        return new Restaurant("qa-r", "QA R", "Sri Lankan", "Kandy", 100, 200, true, false, true, "d", null);
    }

    @Test
    @DisplayName("TC-UNIT-DOM-001 new user defaults to USER role")
    void newUserIsCustomer() {
        assertThat(new User("A", "a@b.test", "h", "en").getRole()).isEqualTo(Role.USER);
    }

    @Test
    @DisplayName("TC-UNIT-DOM-002 registration language defaults to 'en' when omitted or blank")
    void registerLanguageDefaults() {
        assertThat(new RegisterRequest("A", "a@b.test", "password1", null).language()).isEqualTo("en");
        assertThat(new RegisterRequest("A", "a@b.test", "password1", " ").language()).isEqualTo("en");
        assertThat(new RegisterRequest("A", "a@b.test", "password1", "ta").language()).isEqualTo("ta");
    }

    @Test
    @DisplayName("TC-UNIT-DOM-003 new restaurant starts with zero rating/reviews and default colour")
    void newRestaurantDefaults() {
        Restaurant r = restaurant();
        assertThat(r.getRating()).isEqualByComparingTo(BigDecimal.ZERO);
        assertThat(r.getReviewCount()).isZero();
        assertThat(r.getImageColor()).isEqualTo("#332417");
    }

    @Test
    @DisplayName("TC-UNIT-DOM-004 blank dish colour falls back to default")
    void dishColourDefault() {
        Dish d = new Dish(restaurant(), "qa-d", "QA D", null, 500, "Mild", true, true, " ");
        assertThat(d.getImageColor()).isEqualTo("#bd471f");
        assertThat(d.getReviewCount()).isZero();
    }

    @Test
    @DisplayName("TC-UNIT-DOM-005 new review is PENDING and moderation sets status and note")
    void reviewModeration() {
        Review review = new Review(new User("A", "a@b.test", "h", "en"), restaurant(), null, 5, 4, 5, "en", "Great");
        assertThat(review.getStatus()).isEqualTo(ReviewStatus.PENDING);
        review.moderate(ReviewStatus.APPROVED, "ok");
        assertThat(review.getStatus()).isEqualTo(ReviewStatus.APPROVED);
        assertThat(review.getModeratorNote()).isEqualTo("ok");
        assertThat(review.getCreatedAt()).isNotNull();
    }
}
