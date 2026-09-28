package com.tastelanka.portal.restaurant;

import org.springframework.data.domain.Sort;
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
    public List<Restaurant> list() {
        return restaurants.findAll(Sort.by(Sort.Direction.DESC, "rating"));
    }

    @GetMapping("/top-rated")
    public List<Restaurant> topRated() {
        return restaurants.findTop4ByOrderByRatingDescReviewCountDesc();
    }

    @GetMapping("/{slug}")
    public Restaurant get(@PathVariable String slug) {
        return restaurants.findBySlug(slug)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found"));
    }
}
