package com.tastelanka.portal.dish;

import java.math.BigDecimal;

public record DishDto(
        Long id,
        String slug,
        String name,
        String description,
        Integer price,
        String spiceLevel,
        boolean vegetarian,
        boolean halal,
        String imageColor,
        BigDecimal rating,
        BigDecimal foodRating,
        BigDecimal serviceRating,
        Integer reviewCount,
        String restaurantSlug,
        String restaurantName) {
    public static DishDto from(Dish dish) {
        return new DishDto(dish.getId(), dish.getSlug(), dish.getName(), dish.getDescription(), dish.getPrice(),
                dish.getSpiceLevel(), dish.isVegetarian(), dish.isHalal(), dish.getImageColor(), dish.getRating(),
                dish.getFoodRating(), dish.getServiceRating(), dish.getReviewCount(),
                dish.getRestaurant().getSlug(), dish.getRestaurant().getName());
    }
}
