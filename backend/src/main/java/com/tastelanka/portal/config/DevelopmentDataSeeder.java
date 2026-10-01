package com.tastelanka.portal.config;

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
    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;
    private final String adminEmail;
    private final String adminPassword;

    public DevelopmentDataSeeder(UserRepository users, PasswordEncoder passwordEncoder,
                                 @Value("${app.bootstrap.admin-email:}") String adminEmail,
                                 @Value("${app.bootstrap.admin-password:}") String adminPassword) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
        this.adminEmail = adminEmail;
        this.adminPassword = adminPassword;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        if (!adminEmail.isBlank() && !adminPassword.isBlank()) {
            String normalizedEmail = adminEmail.trim().toLowerCase();
            String encodedPassword = passwordEncoder.encode(adminPassword);
            User admin = users.findByEmailIgnoreCase(normalizedEmail).orElseGet(() ->
                    new User("TasteLanka Admin", normalizedEmail, encodedPassword, "en"));
            admin.setPasswordHash(encodedPassword);
            admin.setRole(Role.ADMIN);
            users.save(admin);
        }
    }
}
