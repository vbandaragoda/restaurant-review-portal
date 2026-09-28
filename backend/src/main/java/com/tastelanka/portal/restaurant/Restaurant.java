package com.tastelanka.portal.restaurant;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true, length = 160)
    private String slug;
    @Column(nullable = false, length = 160)
    private String name;
    @Column(nullable = false, length = 80)
    private String cuisine;
    @Column(nullable = false, length = 80)
    private String location;
    @Column(nullable = false, precision = 2, scale = 1)
    private BigDecimal rating;
    @Column(name = "review_count", nullable = false)
    private Integer reviewCount;
    @Column(name = "price_min", nullable = false)
    private Integer priceMin;
    @Column(name = "price_max", nullable = false)
    private Integer priceMax;
    @Column(nullable = false)
    private boolean vegetarian;
    @Column(nullable = false)
    private boolean vegan;
    @Column(nullable = false)
    private boolean halal;

    protected Restaurant() { }
    public Long getId() { return id; }
    public String getSlug() { return slug; }
    public String getName() { return name; }
    public String getCuisine() { return cuisine; }
    public String getLocation() { return location; }
    public BigDecimal getRating() { return rating; }
    public Integer getReviewCount() { return reviewCount; }
    public Integer getPriceMin() { return priceMin; }
    public Integer getPriceMax() { return priceMax; }
    public boolean isVegetarian() { return vegetarian; }
    public boolean isVegan() { return vegan; }
    public boolean isHalal() { return halal; }
}
