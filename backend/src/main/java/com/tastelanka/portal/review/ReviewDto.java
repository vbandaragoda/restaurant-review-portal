package com.tastelanka.portal.review;

import java.time.Instant;

public record ReviewDto(
        Long id,
        String author,
        String restaurantSlug,
        String restaurantName,
        String dishSlug,
        String dishName,
        int foodRating,
        int serviceRating,
        int overallRating,
        String language,
        String reviewText,
        String status,
        String moderatorNote,
        Instant createdAt) {
    public static ReviewDto from(Review review) {
        return new ReviewDto(review.getId(), review.getUser().getFullName(), review.getRestaurant().getSlug(),
                review.getRestaurant().getName(), review.getDish() == null ? null : review.getDish().getSlug(),
                review.getDish() == null ? null : review.getDish().getName(), review.getFoodRating(),
                review.getServiceRating(), review.getOverallRating(), review.getLanguage(), review.getReviewText(),
                review.getStatus().name(), review.getModeratorNote(), review.getCreatedAt());
    }
}
