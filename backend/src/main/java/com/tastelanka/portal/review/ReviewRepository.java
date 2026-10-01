package com.tastelanka.portal.review;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @EntityGraph(attributePaths = {"user", "restaurant", "dish", "moderatedBy"})
    List<Review> findByRestaurantSlugAndStatusOrderByCreatedAtDesc(String restaurantSlug, ReviewStatus status);

    @EntityGraph(attributePaths = {"user", "restaurant", "dish", "moderatedBy"})
    List<Review> findByUserEmailIgnoreCaseOrderByCreatedAtDesc(String email);

    @EntityGraph(attributePaths = {"user", "restaurant", "dish", "moderatedBy"})
    List<Review> findByStatusOrderByCreatedAtAsc(ReviewStatus status);

    @Override
    @EntityGraph(attributePaths = {"user", "restaurant", "dish", "moderatedBy"})
    Optional<Review> findById(Long id);

    boolean existsByRestaurantId(Long restaurantId);
    long countByStatus(ReviewStatus status);
}
