package com.tastelanka.portal.restaurant;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/restaurants")
public class RestaurantController {
    private final RestaurantRepository restaurants;

    public RestaurantController(RestaurantRepository restaurants) {
        this.restaurants = restaurants;
    }

    @GetMapping
    public List<RestaurantDto> list(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String cuisine,
            @RequestParam(defaultValue = "false") boolean vegetarian,
            @RequestParam(defaultValue = "false") boolean vegan,
            @RequestParam(defaultValue = "false") boolean halal) {
        return restaurants.search(clean(q), clean(location), clean(cuisine), vegetarian, vegan, halal)
                .stream().map(RestaurantDto::from).toList();
    }

    @GetMapping("/top-rated")
    public List<RestaurantDto> topRated() {
        return restaurants.findTop4ByOrderByRatingDescReviewCountDesc().stream().map(RestaurantDto::from).toList();
    }

    @GetMapping("/{slug}")
    public RestaurantDto get(@PathVariable String slug) {
        return RestaurantDto.from(restaurants.findBySlug(slug)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found")));
    }

    private String clean(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
