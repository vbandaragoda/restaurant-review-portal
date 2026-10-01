package com.tastelanka.portal.security;

import com.tastelanka.portal.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {
    private static final Logger log = LoggerFactory.getLogger(JwtService.class);
    private final SecretKey key;
    private final long expiration;

    public JwtService(@Value("${app.jwt.secret}") String secret, @Value("${app.jwt.expiration}") long expiration) {
        if (secret == null || secret.isBlank()) {
            byte[] generatedSecret = new byte[32];
            new SecureRandom().nextBytes(generatedSecret);
            this.key = Keys.hmacShaKeyFor(generatedSecret);
            log.warn("JWT_SECRET is not configured. Using an ephemeral signing key; sessions will expire when the API restarts.");
        } else {
            if (secret.equals("replace-with-at-least-32-random-bytes")) {
                throw new IllegalStateException("Replace the example JWT_SECRET with a private value of at least 32 bytes");
            }
            this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        }
        this.expiration = expiration;
    }

    public String generate(User user) {
        Instant now = Instant.now();
        return Jwts.builder()
                .subject(user.getEmail())
                .claim("uid", user.getId())
                .claim("role", user.getRole().name())
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusMillis(expiration)))
                .signWith(key)
                .compact();
    }

    public String subject(String token) {
        Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
        return claims.getSubject();
    }
}
