package com.tastelanka.portal.user;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SavedRestaurantRepository extends JpaRepository<SavedRestaurant, Long> {
    @EntityGraph(attributePaths = "restaurant")
    List<SavedRestaurant> findByUserEmailIgnoreCaseOrderByCreatedAtDesc(String email);
    boolean existsByUserIdAndRestaurantId(Long userId, Long restaurantId);
    void deleteByUserIdAndRestaurantId(Long userId, Long restaurantId);
}
