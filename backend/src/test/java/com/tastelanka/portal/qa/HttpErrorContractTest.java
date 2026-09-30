package com.tastelanka.portal.qa;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * QA tests over a real HTTP connection (embedded Tomcat), so the servlet error dispatch runs exactly as in
 * production. MockMvc does not perform that dispatch, which is why these are separate (TC-HTTP-*, DEF-001).
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class HttpErrorContractTest {
    @LocalServerPort int port;
    private final HttpClient client = HttpClient.newHttpClient();

    private HttpResponse<String> send(String method, String path, String body) throws Exception {
        HttpRequest.Builder b = HttpRequest.newBuilder(URI.create("http://localhost:" + port + "/api/v1" + path))
                .header("Content-Type", "application/json");
        b.method(method, body == null ? HttpRequest.BodyPublishers.noBody() : HttpRequest.BodyPublishers.ofString(body));
        return client.send(b.build(), HttpResponse.BodyHandlers.ofString());
    }

    @Test
    @DisplayName("TC-HTTP-001 health endpoint returns 200 UP")
    void health() throws Exception {
        HttpResponse<String> r = send("GET", "/health", null);
        assertThat(r.statusCode()).isEqualTo(200);
        assertThat(r.body()).contains("\"status\":\"UP\"");
    }

    @Test
    @DisplayName("TC-HTTP-002 invalid registration returns 400 over real HTTP (DEF-001)")
    void invalidRegistration() throws Exception {
        assertThat(send("POST", "/auth/register", "{}").statusCode()).isEqualTo(400);
    }

    @Test
    @DisplayName("TC-HTTP-003 wrong login returns 401 over real HTTP (DEF-001)")
    void wrongLogin() throws Exception {
        assertThat(send("POST", "/auth/login", "{\"email\":\"nobody@tastelanka.test\",\"password\":\"Wrong#123\"}").statusCode())
                .isEqualTo(401);
    }

    @Test
    @DisplayName("TC-HTTP-004 unknown restaurant returns 404 over real HTTP (DEF-001)")
    void unknownRestaurant() throws Exception {
        assertThat(send("GET", "/restaurants/no-such-restaurant-junit", null).statusCode()).isEqualTo(404);
    }

    @Test
    @DisplayName("TC-HTTP-005 error responses carry a body explaining the error (DEF-001)")
    void errorBodyPresent() throws Exception {
        assertThat(send("POST", "/auth/register", "{}").body()).isNotBlank();
    }
}
