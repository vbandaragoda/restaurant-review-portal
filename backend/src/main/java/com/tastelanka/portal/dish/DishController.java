package com.tastelanka.portal.dish;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/dishes")
public class DishController {
    private final DishRepository dishes;

    public DishController(DishRepository dishes) {
        this.dishes = dishes;
    }

    @GetMapping
    public List<DishDto> list(@RequestParam(required = false) String restaurant) {
        List<Dish> result = restaurant == null || restaurant.isBlank()
                ? dishes.findAll()
                : dishes.findByRestaurantSlugOrderByNameAsc(restaurant.trim());
        return result.stream().map(DishDto::from).toList();
    }

    @GetMapping("/{slug}")
    public DishDto get(@PathVariable String slug) {
        return DishDto.from(dishes.findBySlug(slug)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Dish not found")));
    }
}
