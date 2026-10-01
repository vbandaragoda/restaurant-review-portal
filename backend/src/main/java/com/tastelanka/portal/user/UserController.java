package com.tastelanka.portal.user;

import com.tastelanka.portal.restaurant.Restaurant;
import com.tastelanka.portal.restaurant.RestaurantDto;
import com.tastelanka.portal.restaurant.RestaurantRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users/me")
public class UserController {
    private final UserRepository users;
    private final RestaurantRepository restaurants;
    private final SavedRestaurantRepository savedRestaurants;

    public UserController(UserRepository users, RestaurantRepository restaurants,
                          SavedRestaurantRepository savedRestaurants) {
        this.users = users;
        this.restaurants = restaurants;
        this.savedRestaurants = savedRestaurants;
    }

    @GetMapping
    public UserProfile profile(Authentication authentication) {
        return UserProfile.from(current(authentication));
    }

    @GetMapping("/saved-restaurants")
    public List<RestaurantDto> saved(Authentication authentication) {
        return savedRestaurants.findByUserEmailIgnoreCaseOrderByCreatedAtDesc(authentication.getName())
                .stream().map(item -> RestaurantDto.from(item.getRestaurant())).toList();
    }

    @PostMapping("/saved-restaurants/{slug}")
    @ResponseStatus(HttpStatus.CREATED)
    public RestaurantDto save(Authentication authentication, @PathVariable String slug) {
        User user = current(authentication);
        Restaurant restaurant = restaurants.findBySlug(slug)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found"));
        if (!savedRestaurants.existsByUserIdAndRestaurantId(user.getId(), restaurant.getId())) {
            savedRestaurants.save(new SavedRestaurant(user, restaurant));
        }
        return RestaurantDto.from(restaurant);
    }

    @DeleteMapping("/saved-restaurants/{slug}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    public void remove(Authentication authentication, @PathVariable String slug) {
        User user = current(authentication);
        Restaurant restaurant = restaurants.findBySlug(slug)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found"));
        savedRestaurants.deleteByUserIdAndRestaurantId(user.getId(), restaurant.getId());
    }

    private User current(Authentication authentication) {
        return users.findByEmailIgnoreCase(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
    }

    public record UserProfile(Long id, String fullName, String email, String role, String language, Instant createdAt) {
        static UserProfile from(User user) {
            return new UserProfile(user.getId(), user.getFullName(), user.getEmail(), user.getRole().name(),
                    user.getPreferredLanguage(), user.getCreatedAt());
        }
    }
}
