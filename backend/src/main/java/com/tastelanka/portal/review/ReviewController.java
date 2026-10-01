package com.tastelanka.portal.review;

import com.tastelanka.portal.dish.Dish;
import com.tastelanka.portal.dish.DishRepository;
import com.tastelanka.portal.restaurant.Restaurant;
import com.tastelanka.portal.restaurant.RestaurantRepository;
import com.tastelanka.portal.user.User;
import com.tastelanka.portal.user.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {
    private final ReviewRepository reviews;
    private final UserRepository users;
    private final RestaurantRepository restaurants;
    private final DishRepository dishes;

    public ReviewController(ReviewRepository reviews, UserRepository users,
                            RestaurantRepository restaurants, DishRepository dishes) {
        this.reviews = reviews;
        this.users = users;
        this.restaurants = restaurants;
        this.dishes = dishes;
    }

    @GetMapping
    public List<ReviewDto> approved(@RequestParam String restaurant) {
        return reviews.findByRestaurantSlugAndStatusOrderByCreatedAtDesc(restaurant, ReviewStatus.APPROVED)
                .stream().map(ReviewDto::from).toList();
    }

    @GetMapping("/mine")
    public List<ReviewDto> mine(Authentication authentication) {
        return reviews.findByUserEmailIgnoreCaseOrderByCreatedAtDesc(authentication.getName())
                .stream().map(ReviewDto::from).toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReviewDto create(Authentication authentication, @Valid @RequestBody CreateReviewRequest request) {
        User user = users.findByEmailIgnoreCase(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        Restaurant restaurant = restaurants.findBySlug(request.restaurantSlug())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found"));
        Dish dish = request.dishSlug() == null || request.dishSlug().isBlank() ? null
                : dishes.findBySlug(request.dishSlug())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Dish not found"));
        if (dish != null && !dish.getRestaurant().getId().equals(restaurant.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Dish does not belong to this restaurant");
        }
        return ReviewDto.from(reviews.save(new Review(user, restaurant, dish, request.foodRating(),
                request.serviceRating(), request.overallRating(), request.language(), request.reviewText().trim())));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    public void delete(Authentication authentication, @PathVariable Long id) {
        Review review = reviews.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found"));
        if (!review.getUser().getEmail().equalsIgnoreCase(authentication.getName())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only delete your own reviews");
        }
        if (review.getStatus() == ReviewStatus.APPROVED) {
            review.getRestaurant().removeApprovedReview(review.getOverallRating());
            if (review.getDish() != null) {
                review.getDish().removeApprovedReview(review.getOverallRating(), review.getFoodRating(),
                        review.getServiceRating());
            }
        }
        reviews.delete(review);
    }

    public record CreateReviewRequest(
            @NotBlank String restaurantSlug,
            String dishSlug,
            @Min(1) @Max(5) int foodRating,
            @Min(1) @Max(5) int serviceRating,
            @Min(1) @Max(5) int overallRating,
            @NotBlank @Pattern(regexp = "en|si|ta") String language,
            @NotBlank @Size(max = 5000) String reviewText) { }
}
