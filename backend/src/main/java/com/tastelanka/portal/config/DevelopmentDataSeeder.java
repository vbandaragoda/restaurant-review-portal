package com.tastelanka.portal.config;

import com.tastelanka.portal.dish.Dish;
import com.tastelanka.portal.dish.DishRepository;
import com.tastelanka.portal.restaurant.Restaurant;
import com.tastelanka.portal.restaurant.RestaurantRepository;
import com.tastelanka.portal.user.Role;
import com.tastelanka.portal.user.User;
import com.tastelanka.portal.user.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DevelopmentDataSeeder implements ApplicationRunner {
    private final RestaurantRepository restaurants;
    private final DishRepository dishes;
    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;
    private final String adminEmail;
    private final String adminPassword;

    public DevelopmentDataSeeder(RestaurantRepository restaurants, DishRepository dishes, UserRepository users,
                                 PasswordEncoder passwordEncoder,
                                 @Value("${app.bootstrap.admin-email:}") String adminEmail,
                                 @Value("${app.bootstrap.admin-password:}") String adminPassword) {
        this.restaurants = restaurants;
        this.dishes = dishes;
        this.users = users;
        this.passwordEncoder = passwordEncoder;
        this.adminEmail = adminEmail;
        this.adminPassword = adminPassword;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        Restaurant ministry = restaurant("ministry-of-crab", "Ministry of Crab", "Seafood · Sri Lankan", "Colombo",
                8000, 12000, false, false, true,
                "Popular seafood dining in Colombo. Browse menu items, prices and approved customer reviews.", "#332417");
        restaurant("the-empire-cafe", "The Empire Cafe", "Cafe · International", "Kandy", 2000, 4000,
                true, true, true, "Casual dining with local and international favourites.", "#38592e");
        restaurant("pedlars-inn", "Pedlar’s Inn", "Cafe · International", "Galle", 5000, 8000,
                true, false, true, "Relaxed cafe-style dining in the Galle area.", "#61949e");
        restaurant("nuga-gama", "Nuga Gama", "Sri Lankan · Authentic", "Colombo", 3000, 5000,
                true, true, true, "Traditional Sri Lankan dining with local cuisine options.", "#662e1a");
        restaurant("green-leaf-kitchen", "Green Leaf Kitchen", "Sri Lankan · Vegetarian", "Kandy", 1500, 3000,
                true, true, true, "Vegetarian-friendly local dishes with mild and medium spice options.", "#597a40");

        dish(ministry, "chilli-crab", "Chilli Crab",
                "Signature Sri Lankan crab dish with a spicy chilli sauce.", 9500, "Hot", false, true, "#bd471f");
        dish(ministry, "garlic-prawn-rice", "Garlic Prawn Rice",
                "Fragrant rice served with garlic prawns.", 4500, "Medium", false, true, "#d19c42");
        dish(ministry, "vegetable-fried-rice", "Vegetable Fried Rice",
                "Vegetarian fried rice with seasonal vegetables.", 2200, "Mild", true, true, "#598c40");
        dish(ministry, "seafood-kottu", "Seafood Kottu",
                "Sri Lankan kottu prepared with fresh seafood.", 3800, "Hot", false, true, "#734d2e");

        if (!adminEmail.isBlank() && !adminPassword.isBlank() && !users.existsByEmailIgnoreCase(adminEmail)) {
            User admin = new User("TasteLanka Admin", adminEmail.trim().toLowerCase(),
                    passwordEncoder.encode(adminPassword), "en");
            admin.setRole(Role.ADMIN);
            users.save(admin);
        }
    }

    private Restaurant restaurant(String slug, String name, String cuisine, String location, int priceMin, int priceMax,
                                  boolean vegetarian, boolean vegan, boolean halal, String description, String color) {
        return restaurants.findBySlug(slug).map(restaurant -> {
            restaurant.update(slug, name, cuisine, location, priceMin, priceMax, vegetarian, vegan, halal,
                    description, color);
            return restaurant;
        }).orElseGet(() -> restaurants.save(new Restaurant(slug, name, cuisine,
                location, priceMin, priceMax, vegetarian, vegan, halal, description, color)));
    }

    private void dish(Restaurant restaurant, String slug, String name, String description, int price,
                      String spiceLevel, boolean vegetarian, boolean halal, String color) {
        if (dishes.findBySlug(slug).isEmpty()) {
            dishes.save(new Dish(restaurant, slug, name, description, price, spiceLevel, vegetarian, halal, color));
        }
    }
}
