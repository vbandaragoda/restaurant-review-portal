package com.tastelanka.portal.qa;

import com.tastelanka.portal.admin.ImageUploadController;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ImageUploadControllerTest {
    private static final byte[] ONE_PIXEL_PNG = Base64.getDecoder().decode(
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=");

    @TempDir
    Path uploadDirectory;

    @Test
    void storesValidatedImageWithGeneratedName() throws Exception {
        ImageUploadController controller = new ImageUploadController(uploadDirectory.toString());
        var file = new MockMultipartFile("file", "restaurant.png", "image/png", ONE_PIXEL_PNG);

        var response = controller.upload(file);

        assertThat(response.imageUrl()).matches("^/uploads/[0-9a-f-]+\\.png$");
        assertThat(Files.exists(uploadDirectory.resolve(response.imageUrl().substring("/uploads/".length())))).isTrue();
    }

    @Test
    void rejectsNonImageContentTypes() {
        ImageUploadController controller = new ImageUploadController(uploadDirectory.toString());
        var file = new MockMultipartFile("file", "notes.txt", "text/plain", "not an image".getBytes());

        assertThatThrownBy(() -> controller.upload(file)).isInstanceOf(ResponseStatusException.class);
    }
}
