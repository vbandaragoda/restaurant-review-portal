package com.tastelanka.portal.cuisine;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CuisineRepository extends JpaRepository<Cuisine, Long> {
    List<Cuisine> findAllByOrderByDisplayOrderAscNameAsc();
    Optional<Cuisine> findBySlug(String slug);
    Optional<Cuisine> findByNameIgnoreCase(String name);
}
