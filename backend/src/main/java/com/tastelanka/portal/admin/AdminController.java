package com.tastelanka.portal.admin;

import com.tastelanka.portal.dish.Dish;
import com.tastelanka.portal.dish.DishDto;
import com.tastelanka.portal.dish.DishRepository;
import com.tastelanka.portal.restaurant.Restaurant;
import com.tastelanka.portal.restaurant.RestaurantDto;
import com.tastelanka.portal.restaurant.RestaurantRepository;
import com.tastelanka.portal.review.Review;
import com.tastelanka.portal.review.ReviewDto;
import com.tastelanka.portal.review.ReviewRepository;
import com.tastelanka.portal.review.ReviewStatus;
import com.tastelanka.portal.user.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {
    private final RestaurantRepository restaurants;
    private final DishRepository dishes;
    private final ReviewRepository reviews;
    private final UserRepository users;

    public AdminController(RestaurantRepository restaurants, DishRepository dishes,
                           ReviewRepository reviews, UserRepository users) {
        this.restaurants = restaurants;
        this.dishes = dishes;
        this.reviews = reviews;
        this.users = users;
    }

    @GetMapping("/dashboard")
    public DashboardStats dashboard() {
        return new DashboardStats(restaurants.count(), dishes.count(), users.count(),
                reviews.countByStatus(ReviewStatus.PENDING), reviews.countByStatus(ReviewStatus.APPROVED));
    }

    @GetMapping("/restaurants")
    public List<RestaurantDto> restaurants() {
        return restaurants.findAll().stream().map(RestaurantDto::from).toList();
    }

    @PostMapping("/restaurants")
    @ResponseStatus(HttpStatus.CREATED)
    public RestaurantDto createRestaurant(@Valid @RequestBody RestaurantRequest request) {
        validatePriceRange(request);
        if (restaurants.findBySlug(request.slug()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Restaurant slug already exists");
        }
        return RestaurantDto.from(restaurants.save(new Restaurant(request.slug(), request.name(), request.cuisine(),
                request.location(), request.priceMin(), request.priceMax(), request.vegetarian(), request.vegan(),
                request.halal(), request.description(), request.imageUrl())));
    }

    @PutMapping("/restaurants/{id}")
    @Transactional
    public RestaurantDto updateRestaurant(@PathVariable Long id, @Valid @RequestBody RestaurantRequest request) {
        validatePriceRange(request);
        Restaurant restaurant = restaurants.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found"));
        restaurants.findBySlug(request.slug()).filter(existing -> !Objects.equals(existing.getId(), id))
                .ifPresent(existing -> { throw new ResponseStatusException(HttpStatus.CONFLICT,
                        "Restaurant slug already exists"); });
        restaurant.update(request.slug(), request.name(), request.cuisine(), request.location(), request.priceMin(),
                request.priceMax(), request.vegetarian(), request.vegan(), request.halal(), request.description(),
                request.imageUrl());
        return RestaurantDto.from(restaurant);
    }

    @DeleteMapping("/restaurants/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRestaurant(@PathVariable Long id) {
        if (!restaurants.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found");
        if (reviews.existsByRestaurantId(id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Restaurant has customer reviews and cannot be deleted");
        }
        restaurants.deleteById(id);
    }

    @GetMapping("/dishes")
    public List<DishDto> dishes() {
        return dishes.findAll().stream().map(DishDto::from).toList();
    }

    @PostMapping("/dishes")
    @ResponseStatus(HttpStatus.CREATED)
    public DishDto createDish(@Valid @RequestBody DishRequest request) {
        Restaurant restaurant = restaurant(request.restaurantSlug());
        if (dishes.findBySlug(request.slug()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Dish slug already exists");
        }
        return DishDto.from(dishes.save(new Dish(restaurant, request.slug(), request.name(), request.description(),
                request.price(), request.spiceLevel(), request.vegetarian(), request.halal(), request.imageUrl())));
    }

    @PutMapping("/dishes/{id}")
    @Transactional
    public DishDto updateDish(@PathVariable Long id, @Valid @RequestBody DishRequest request) {
        Dish dish = dishes.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Dish not found"));
        dishes.findBySlug(request.slug()).filter(existing -> !Objects.equals(existing.getId(), id))
                .ifPresent(existing -> { throw new ResponseStatusException(HttpStatus.CONFLICT,
                        "Dish slug already exists"); });
        dish.setRestaurant(restaurant(request.restaurantSlug()));
        dish.update(request.slug(), request.name(), request.description(), request.price(), request.spiceLevel(),
                request.vegetarian(), request.halal(), request.imageUrl());
        return DishDto.from(dish);
    }

    @DeleteMapping("/dishes/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDish(@PathVariable Long id) {
        if (!dishes.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Dish not found");
        dishes.deleteById(id);
    }

    @GetMapping("/reviews")
    public List<ReviewDto> reviews(@RequestParam(defaultValue = "PENDING") ReviewStatus status) {
        return reviews.findByStatusOrderByCreatedAtAsc(status).stream().map(ReviewDto::from).toList();
    }

    @PatchMapping("/reviews/{id}")
    @Transactional
    public ReviewDto moderate(Authentication authentication, @PathVariable Long id,
                              @Valid @RequestBody ModerationRequest request) {
        Review review = reviews.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found"));
        if (request.status() == ReviewStatus.PENDING) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Review must be approved or rejected");
        }
        if (request.status() == ReviewStatus.REJECTED && (request.note() == null || request.note().isBlank())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A rejection reason is required");
        }
        var moderator = users.findByEmailIgnoreCase(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Moderator not found"));
        if (review.getStatus() != request.status()) {
            if (review.getStatus() == ReviewStatus.APPROVED) {
                review.getRestaurant().removeApprovedReview(review.getOverallRating());
                if (review.getDish() != null) review.getDish().removeApprovedReview(review.getOverallRating(),
                        review.getFoodRating(), review.getServiceRating());
            }
            if (request.status() == ReviewStatus.APPROVED) {
                review.getRestaurant().addApprovedReview(review.getOverallRating());
                if (review.getDish() != null) review.getDish().addApprovedReview(review.getOverallRating(),
                        review.getFoodRating(), review.getServiceRating());
            }
        }
        review.moderate(request.status(), request.note(), moderator);
        return ReviewDto.from(review);
    }

    private void validatePriceRange(RestaurantRequest request) {
        if (request.priceMin() > request.priceMax()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Minimum price must not exceed maximum price");
        }
    }

    private Restaurant restaurant(String slug) {
        return restaurants.findBySlug(slug)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found"));
    }

    public record DashboardStats(long restaurants, long dishes, long users, long pendingReviews, long approvedReviews) { }

    public record RestaurantRequest(
            @NotBlank @Pattern(regexp = "[a-z0-9]+(?:-[a-z0-9]+)*") String slug,
            @NotBlank @Size(max = 160) String name,
            @NotBlank @Size(max = 80) String cuisine,
            @NotBlank @Size(max = 80) String location,
            @NotNull @Min(0) Integer priceMin,
            @NotNull @Min(0) Integer priceMax,
            boolean vegetarian,
            boolean vegan,
            boolean halal,
            @Size(max = 5000) String description,
            @Size(max = 500) @Pattern(regexp = "^/uploads/[0-9a-f-]+\\.(?:jpg|png|gif)$") String imageUrl) { }

    public record DishRequest(
            @NotBlank String restaurantSlug,
            @NotBlank @Pattern(regexp = "[a-z0-9]+(?:-[a-z0-9]+)*") String slug,
            @NotBlank @Size(max = 160) String name,
            @Size(max = 5000) String description,
            @NotNull @Min(0) Integer price,
            @NotBlank @Pattern(regexp = "Mild|Medium|Hot") String spiceLevel,
            boolean vegetarian,
            boolean halal,
            @Size(max = 500) @Pattern(regexp = "^/uploads/[0-9a-f-]+\\.(?:jpg|png|gif)$") String imageUrl) { }

    public record ModerationRequest(@NotNull ReviewStatus status, @Size(max = 500) String note) { }
}
