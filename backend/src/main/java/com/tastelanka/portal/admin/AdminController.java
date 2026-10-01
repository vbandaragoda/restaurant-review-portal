package com.tastelanka.portal.admin;

import com.tastelanka.portal.cuisine.Cuisine;
import com.tastelanka.portal.cuisine.CuisineDto;
import com.tastelanka.portal.cuisine.CuisineRepository;
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
import java.time.Instant;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {
    private final RestaurantRepository restaurants;
    private final DishRepository dishes;
    private final ReviewRepository reviews;
    private final UserRepository users;
    private final CuisineRepository cuisines;

    public AdminController(RestaurantRepository restaurants, DishRepository dishes,
                           ReviewRepository reviews, UserRepository users, CuisineRepository cuisines) {
        this.restaurants = restaurants;
        this.dishes = dishes;
        this.reviews = reviews;
        this.users = users;
        this.cuisines = cuisines;
    }

    @GetMapping("/dashboard")
    public DashboardStats dashboard() {
        return new DashboardStats(restaurants.count(), dishes.count(), cuisines.count(), users.count(),
                reviews.countByStatus(ReviewStatus.PENDING), reviews.countByStatus(ReviewStatus.APPROVED));
    }

    @GetMapping("/users")
    public List<UserSummary> users() {
        return users.findAllByOrderByCreatedAtDesc().stream().map(UserSummary::from).toList();
    }

    @GetMapping("/cuisines")
    public List<CuisineDto> cuisines() {
        return cuisines.findAllByOrderByDisplayOrderAscNameAsc().stream().map(this::toCuisineDto).toList();
    }

    @PostMapping("/cuisines")
    @ResponseStatus(HttpStatus.CREATED)
    public CuisineDto createCuisine(@Valid @RequestBody CuisineRequest request) {
        if (cuisines.findBySlug(request.slug()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Cuisine slug already exists");
        }
        if (cuisines.findByNameIgnoreCase(request.name()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Cuisine name already exists");
        }
        return toCuisineDto(cuisines.save(new Cuisine(request.slug(), request.name(), request.description(),
                request.imageUrl(), request.displayOrder())));
    }

    @PutMapping("/cuisines/{id}")
    @Transactional
    public CuisineDto updateCuisine(@PathVariable Long id, @Valid @RequestBody CuisineRequest request) {
        Cuisine cuisine = cuisines.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cuisine not found"));
        cuisines.findBySlug(request.slug()).filter(existing -> !Objects.equals(existing.getId(), id))
                .ifPresent(existing -> { throw new ResponseStatusException(HttpStatus.CONFLICT,
                        "Cuisine slug already exists"); });
        cuisines.findByNameIgnoreCase(request.name()).filter(existing -> !Objects.equals(existing.getId(), id))
                .ifPresent(existing -> { throw new ResponseStatusException(HttpStatus.CONFLICT,
                        "Cuisine name already exists"); });

        String oldName = cuisine.getName();
        cuisine.update(request.slug(), request.name(), request.description(), request.imageUrl(),
                request.displayOrder());
        if (!oldName.equalsIgnoreCase(cuisine.getName())) {
            restaurants.findByCuisineContainingIgnoreCase(oldName)
                    .forEach(restaurant -> restaurant.renameCuisineCategory(oldName, cuisine.getName()));
        }
        return toCuisineDto(cuisine);
    }

    @DeleteMapping("/cuisines/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCuisine(@PathVariable Long id) {
        Cuisine cuisine = cuisines.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cuisine not found"));
        if (restaurants.countByCuisineContainingIgnoreCase(cuisine.getName()) > 0) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Cuisine is used by restaurants and cannot be deleted");
        }
        cuisines.delete(cuisine);
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

    private CuisineDto toCuisineDto(Cuisine cuisine) {
        return CuisineDto.from(cuisine, restaurants.countByCuisineContainingIgnoreCase(cuisine.getName()));
    }

    public record DashboardStats(long restaurants, long dishes, long cuisines, long users, long pendingReviews,
                                 long approvedReviews) { }

    public record UserSummary(Long id, String fullName, String email, String role, String language,
                              Instant createdAt) {
        public static UserSummary from(com.tastelanka.portal.user.User user) {
            return new UserSummary(user.getId(), user.getFullName(), user.getEmail(), user.getRole().name(),
                    user.getPreferredLanguage(), user.getCreatedAt());
        }
    }

    public record CuisineRequest(
            @NotBlank @Pattern(regexp = "[a-z0-9]+(?:-[a-z0-9]+)*") String slug,
            @NotBlank @Size(max = 80) String name,
            @Size(max = 1000) String description,
            @Size(max = 500) @Pattern(regexp = "^/uploads/[0-9a-f-]+\\.(?:jpg|png|gif)$") String imageUrl,
            @NotNull @Min(0) @Max(999) Integer displayOrder) { }

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
