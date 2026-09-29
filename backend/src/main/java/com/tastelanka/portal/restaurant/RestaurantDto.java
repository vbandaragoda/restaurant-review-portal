package com.tastelanka.portal.restaurant;

import java.math.BigDecimal;

public record RestaurantDto(
        Long id,
        String slug,
        String name,
        String cuisine,
        String location,
        BigDecimal rating,
        Integer reviewCount,
        Integer priceMin,
        Integer priceMax,
        boolean vegetarian,
        boolean vegan,
        boolean halal,
        String description,
        String imageColor) {

    public static RestaurantDto from(Restaurant restaurant) {
        return new RestaurantDto(
                restaurant.getId(), restaurant.getSlug(), restaurant.getName(), restaurant.getCuisine(),
                restaurant.getLocation(), restaurant.getRating(), restaurant.getReviewCount(),
                restaurant.getPriceMin(), restaurant.getPriceMax(), restaurant.isVegetarian(),
                restaurant.isVegan(), restaurant.isHalal(), restaurant.getDescription(), restaurant.getImageColor());
    }
}
