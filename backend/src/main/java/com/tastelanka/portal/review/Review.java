package com.tastelanka.portal.review;

import com.tastelanka.portal.dish.Dish;
import com.tastelanka.portal.restaurant.Restaurant;
import com.tastelanka.portal.user.User;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "restaurant_id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
    private Restaurant restaurant;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dish_id", columnDefinition = "BIGINT UNSIGNED")
    private Dish dish;

    @Column(name = "food_rating", nullable = false)
    private int foodRating;
    @Column(name = "service_rating", nullable = false)
    private int serviceRating;
    @Column(name = "overall_rating", nullable = false)
    private int overallRating;
    @Column(nullable = false, length = 5)
    private String language;
    @Column(name = "review_text", nullable = false, columnDefinition = "TEXT")
    private String reviewText;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ReviewStatus status = ReviewStatus.PENDING;
    @Column(name = "moderator_note", length = 500)
    private String moderatorNote;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "moderated_by", columnDefinition = "BIGINT UNSIGNED")
    private User moderatedBy;
    @Column(name = "moderated_at")
    private Instant moderatedAt;
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    protected Review() { }

    public Review(User user, Restaurant restaurant, Dish dish, int foodRating, int serviceRating,
                  int overallRating, String language, String reviewText) {
        this.user = user;
        this.restaurant = restaurant;
        this.dish = dish;
        this.foodRating = foodRating;
        this.serviceRating = serviceRating;
        this.overallRating = overallRating;
        this.language = language;
        this.reviewText = reviewText;
    }

    public void moderate(ReviewStatus status, String moderatorNote, User moderator) {
        this.status = status;
        this.moderatorNote = moderatorNote == null || moderatorNote.isBlank() ? null : moderatorNote.trim();
        this.moderatedBy = moderator;
        this.moderatedAt = Instant.now();
    }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public Restaurant getRestaurant() { return restaurant; }
    public Dish getDish() { return dish; }
    public int getFoodRating() { return foodRating; }
    public int getServiceRating() { return serviceRating; }
    public int getOverallRating() { return overallRating; }
    public String getLanguage() { return language; }
    public String getReviewText() { return reviewText; }
    public ReviewStatus getStatus() { return status; }
    public String getModeratorNote() { return moderatorNote; }
    public User getModeratedBy() { return moderatedBy; }
    public Instant getModeratedAt() { return moderatedAt; }
    public Instant getCreatedAt() { return createdAt; }
}
