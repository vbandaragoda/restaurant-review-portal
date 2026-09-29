package com.tastelanka.portal.dish;

import com.tastelanka.portal.restaurant.Restaurant;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "dishes")
public class Dish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "restaurant_id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
    private Restaurant restaurant;

    @Column(nullable = false, unique = true, length = 160)
    private String slug;
    @Column(nullable = false, length = 160)
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(nullable = false)
    private Integer price;
    @Column(name = "spice_level", nullable = false, length = 20)
    private String spiceLevel;
    @Column(nullable = false)
    private boolean vegetarian;
    @Column(nullable = false)
    private boolean halal;
    @Column(name = "image_color", nullable = false, length = 7)
    private String imageColor;
    @Column(nullable = false, precision = 2, scale = 1)
    private BigDecimal rating = BigDecimal.ZERO;
    @Column(name = "food_rating", nullable = false, precision = 2, scale = 1)
    private BigDecimal foodRating = BigDecimal.ZERO;
    @Column(name = "service_rating", nullable = false, precision = 2, scale = 1)
    private BigDecimal serviceRating = BigDecimal.ZERO;
    @Column(name = "review_count", nullable = false)
    private Integer reviewCount = 0;

    protected Dish() { }

    public Dish(Restaurant restaurant, String slug, String name, String description, Integer price,
                String spiceLevel, boolean vegetarian, boolean halal, String imageColor) {
        this.restaurant = restaurant;
        update(slug, name, description, price, spiceLevel, vegetarian, halal, imageColor);
    }

    public void update(String slug, String name, String description, Integer price, String spiceLevel,
                       boolean vegetarian, boolean halal, String imageColor) {
        this.slug = slug;
        this.name = name;
        this.description = description;
        this.price = price;
        this.spiceLevel = spiceLevel;
        this.vegetarian = vegetarian;
        this.halal = halal;
        this.imageColor = imageColor == null || imageColor.isBlank() ? "#bd471f" : imageColor;
    }

    public void setRestaurant(Restaurant restaurant) { this.restaurant = restaurant; }
    public void updateRatings(BigDecimal rating, BigDecimal foodRating, BigDecimal serviceRating, int reviewCount) {
        this.rating = rating;
        this.foodRating = foodRating;
        this.serviceRating = serviceRating;
        this.reviewCount = reviewCount;
    }
    public Long getId() { return id; }
    public Restaurant getRestaurant() { return restaurant; }
    public String getSlug() { return slug; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public Integer getPrice() { return price; }
    public String getSpiceLevel() { return spiceLevel; }
    public boolean isVegetarian() { return vegetarian; }
    public boolean isHalal() { return halal; }
    public String getImageColor() { return imageColor; }
    public BigDecimal getRating() { return rating; }
    public BigDecimal getFoodRating() { return foodRating; }
    public BigDecimal getServiceRating() { return serviceRating; }
    public Integer getReviewCount() { return reviewCount; }
}
