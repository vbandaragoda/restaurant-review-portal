package com.tastelanka.portal.restaurant;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT UNSIGNED")
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
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(name = "image_color", nullable = false, length = 7)
    private String imageColor = "#332417";

    protected Restaurant() { }

    public Restaurant(String slug, String name, String cuisine, String location, Integer priceMin, Integer priceMax,
                      boolean vegetarian, boolean vegan, boolean halal, String description, String imageColor) {
        update(slug, name, cuisine, location, priceMin, priceMax, vegetarian, vegan, halal, description, imageColor);
        this.rating = BigDecimal.ZERO;
        this.reviewCount = 0;
    }

    public void update(String slug, String name, String cuisine, String location, Integer priceMin, Integer priceMax,
                       boolean vegetarian, boolean vegan, boolean halal, String description, String imageColor) {
        this.slug = slug;
        this.name = name;
        this.cuisine = cuisine;
        this.location = location;
        this.priceMin = priceMin;
        this.priceMax = priceMax;
        this.vegetarian = vegetarian;
        this.vegan = vegan;
        this.halal = halal;
        this.description = description;
        this.imageColor = imageColor == null || imageColor.isBlank() ? "#332417" : imageColor;
    }

    public void updateRating(BigDecimal rating, int reviewCount) {
        this.rating = rating;
        this.reviewCount = reviewCount;
    }

    public void addApprovedReview(int overallRating) {
        BigDecimal total = rating.multiply(BigDecimal.valueOf(reviewCount)).add(BigDecimal.valueOf(overallRating));
        reviewCount++;
        rating = total.divide(BigDecimal.valueOf(reviewCount), 1, RoundingMode.HALF_UP);
    }

    public void removeApprovedReview(int overallRating) {
        if (reviewCount <= 1) {
            rating = BigDecimal.ZERO.setScale(1);
            reviewCount = 0;
            return;
        }
        BigDecimal total = rating.multiply(BigDecimal.valueOf(reviewCount)).subtract(BigDecimal.valueOf(overallRating));
        reviewCount--;
        rating = total.max(BigDecimal.ZERO).divide(BigDecimal.valueOf(reviewCount), 1, RoundingMode.HALF_UP);
    }
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
    public String getDescription() { return description; }
    public String getImageColor() { return imageColor; }
}
