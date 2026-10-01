package com.tastelanka.portal.cuisine;

public record CuisineDto(
        Long id,
        String slug,
        String name,
        String description,
        String imageUrl,
        Integer displayOrder,
        long restaurantCount) {

    public static CuisineDto from(Cuisine cuisine, long restaurantCount) {
        return new CuisineDto(cuisine.getId(), cuisine.getSlug(), cuisine.getName(), cuisine.getDescription(),
                cuisine.getImageUrl(), cuisine.getDisplayOrder(), restaurantCount);
    }
}
