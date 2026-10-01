package com.tastelanka.portal.cuisine;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cuisines")
public class Cuisine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long id;

    @Column(nullable = false, unique = true, length = 160)
    private String slug;

    @Column(nullable = false, unique = true, length = 80)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;

    protected Cuisine() { }

    public Cuisine(String slug, String name, String description, String imageUrl, Integer displayOrder) {
        update(slug, name, description, imageUrl, displayOrder);
    }

    public void update(String slug, String name, String description, String imageUrl, Integer displayOrder) {
        this.slug = slug.trim();
        this.name = name.trim();
        this.description = blankToNull(description);
        this.imageUrl = blankToNull(imageUrl);
        this.displayOrder = displayOrder;
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    public Long getId() { return id; }
    public String getSlug() { return slug; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getImageUrl() { return imageUrl; }
    public Integer getDisplayOrder() { return displayOrder; }
}
