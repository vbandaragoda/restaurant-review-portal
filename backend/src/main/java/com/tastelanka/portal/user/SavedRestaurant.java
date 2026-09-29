package com.tastelanka.portal.user;

import com.tastelanka.portal.restaurant.Restaurant;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "saved_restaurants", uniqueConstraints = @UniqueConstraint(
        name = "uk_saved_user_restaurant", columnNames = {"user_id", "restaurant_id"}))
public class SavedRestaurant {
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
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    protected SavedRestaurant() { }
    public SavedRestaurant(User user, Restaurant restaurant) {
        this.user = user;
        this.restaurant = restaurant;
    }
    public Long getId() { return id; }
    public Restaurant getRestaurant() { return restaurant; }
}
