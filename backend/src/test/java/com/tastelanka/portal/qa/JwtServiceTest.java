package com.tastelanka.portal.qa;

import com.tastelanka.portal.security.JwtService;
import com.tastelanka.portal.user.User;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.security.SignatureException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/** QA unit tests for token generation and validation (TC-UNIT-JWT-*). */
class JwtServiceTest {
    private static final String SECRET = "qa-unit-test-secret-that-is-at-least-32-bytes-long";
    private final User user = new User("QA Unit", "qa.unit@tastelanka.test", "hash", "en");

    @Test
    @DisplayName("TC-UNIT-JWT-001 generated token round-trips to the user's email subject")
    void generatedTokenReturnsSubject() {
        JwtService service = new JwtService(SECRET, 60_000);
        String token = service.generate(user);
        assertThat(service.subject(token)).isEqualTo("qa.unit@tastelanka.test");
    }

    @Test
    @DisplayName("TC-UNIT-JWT-002 token with a modified signature is rejected")
    void tamperedTokenRejected() {
        JwtService service = new JwtService(SECRET, 60_000);
        String token = service.generate(user);
        String tampered = token.substring(0, token.length() - 4) + (token.endsWith("AAAA") ? "BBBB" : "AAAA");
        assertThatThrownBy(() -> service.subject(tampered)).isInstanceOf(SignatureException.class);
    }

    @Test
    @DisplayName("TC-UNIT-JWT-003 expired token is rejected")
    void expiredTokenRejected() {
        JwtService service = new JwtService(SECRET, -1_000);
        String token = service.generate(user);
        assertThatThrownBy(() -> service.subject(token)).isInstanceOf(ExpiredJwtException.class);
    }

    @Test
    @DisplayName("TC-UNIT-JWT-004 token signed with a different secret is rejected")
    void foreignKeyRejected() {
        String foreign = new JwtService("another-secret-that-is-also-at-least-32-bytes", 60_000).generate(user);
        assertThatThrownBy(() -> new JwtService(SECRET, 60_000).subject(foreign)).isInstanceOf(JwtException.class);
    }

    @Test
    @DisplayName("TC-UNIT-JWT-005 secret shorter than 32 bytes is refused at construction")
    void shortSecretRefused() {
        assertThatThrownBy(() -> new JwtService("too-short", 60_000)).isInstanceOf(RuntimeException.class);
    }
}
