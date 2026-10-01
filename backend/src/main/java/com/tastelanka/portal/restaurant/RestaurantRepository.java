package com.tastelanka.portal.restaurant;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    Optional<Restaurant> findBySlug(String slug);
    List<Restaurant> findTop4ByOrderByRatingDescReviewCountDesc();
    List<Restaurant> findByCuisineContainingIgnoreCase(String cuisine);
    long countByCuisineContainingIgnoreCase(String cuisine);

    @Query("""
            select r from Restaurant r
            where (:query is null or lower(r.name) like lower(concat('%', :query, '%'))
                or lower(r.cuisine) like lower(concat('%', :query, '%'))
                or lower(r.location) like lower(concat('%', :query, '%')))
              and (:location is null or lower(r.location) = lower(:location))
              and (:cuisine is null or lower(r.cuisine) like lower(concat('%', :cuisine, '%')))
              and (:vegetarian = false or r.vegetarian = true)
              and (:vegan = false or r.vegan = true)
              and (:halal = false or r.halal = true)
              and (:maxPrice is null or r.priceMin <= :maxPrice)
              and (:spiceLevel is null or exists (
                    select d.id from Dish d
                    where d.restaurant = r and lower(d.spiceLevel) = lower(:spiceLevel)
              ))
            order by r.rating desc, r.reviewCount desc
            """)
    List<Restaurant> search(@Param("query") String query,
                            @Param("location") String location,
                            @Param("cuisine") String cuisine,
                            @Param("vegetarian") boolean vegetarian,
                            @Param("vegan") boolean vegan,
                            @Param("halal") boolean halal,
                            @Param("maxPrice") Integer maxPrice,
                            @Param("spiceLevel") String spiceLevel);
}
