package com.tastelanka.portal.dish;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import java.util.List;
import java.util.Optional;

public interface DishRepository extends JpaRepository<Dish, Long> {
    @Override
    @EntityGraph(attributePaths = "restaurant")
    List<Dish> findAll();

    @EntityGraph(attributePaths = "restaurant")
    List<Dish> findByRestaurantSlugOrderByNameAsc(String restaurantSlug);
    @EntityGraph(attributePaths = "restaurant")
    Optional<Dish> findBySlug(String slug);
}
