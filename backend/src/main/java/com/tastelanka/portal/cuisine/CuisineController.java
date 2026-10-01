package com.tastelanka.portal.cuisine;

import com.tastelanka.portal.restaurant.RestaurantRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/api/v1/cuisines")
public class CuisineController {
    private final CuisineRepository cuisines;
    private final RestaurantRepository restaurants;

    public CuisineController(CuisineRepository cuisines, RestaurantRepository restaurants) {
        this.cuisines = cuisines;
        this.restaurants = restaurants;
    }

    @GetMapping
    public List<CuisineDto> list() {
        return cuisines.findAllByOrderByDisplayOrderAscNameAsc().stream().map(this::toDto).toList();
    }

    @GetMapping("/{slug}")
    public CuisineDto get(@PathVariable String slug) {
        return toDto(cuisines.findBySlug(slug)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Cuisine not found")));
    }

    private CuisineDto toDto(Cuisine cuisine) {
        return CuisineDto.from(cuisine, restaurants.countByCuisineContainingIgnoreCase(cuisine.getName()));
    }
}
