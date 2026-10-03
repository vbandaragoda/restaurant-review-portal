package com.tastelanka.portal.qa;

import com.tastelanka.portal.admin.ImageUploadController;
import com.tastelanka.portal.image.ImageContentController;
import com.tastelanka.portal.image.StoredImage;
import com.tastelanka.portal.image.StoredImageRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.mockito.ArgumentCaptor;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.nio.file.Path;
import java.util.Base64;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ImageUploadControllerTest {
    private static final byte[] ONE_PIXEL_PNG = Base64.getDecoder().decode(
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=");

    @TempDir
    Path uploadDirectory;

    @Test
    void storesValidatedImageWithGeneratedName() {
        StoredImageRepository images = mock(StoredImageRepository.class);
        ImageUploadController controller = new ImageUploadController(images);
        var file = new MockMultipartFile("file", "restaurant.png", "image/png", ONE_PIXEL_PNG);

        var response = controller.upload(file);

        assertThat(response.imageUrl()).matches("^/uploads/[0-9a-f-]+\\.png$");
        ArgumentCaptor<StoredImage> saved = ArgumentCaptor.forClass(StoredImage.class);
        verify(images).save(saved.capture());
        assertThat(saved.getValue().getFilename()).isEqualTo(response.imageUrl().substring("/uploads/".length()));
        assertThat(saved.getValue().getContentType()).isEqualTo(MediaType.IMAGE_PNG_VALUE);
        assertThat(saved.getValue().getData()).isEqualTo(ONE_PIXEL_PNG);
    }

    @Test
    void rejectsNonImageContentTypes() {
        ImageUploadController controller = new ImageUploadController(mock(StoredImageRepository.class));
        var file = new MockMultipartFile("file", "notes.txt", "text/plain", "not an image".getBytes());

        assertThatThrownBy(() -> controller.upload(file)).isInstanceOf(ResponseStatusException.class);
    }

    @Test
    void returnsStoredImageWithLongLivedCacheHeaders() {
        StoredImageRepository images = mock(StoredImageRepository.class);
        String filename = "123e4567-e89b-12d3-a456-426614174000.png";
        when(images.findById(filename)).thenReturn(Optional.of(
                new StoredImage(filename, MediaType.IMAGE_PNG_VALUE, ONE_PIXEL_PNG)));
        ImageContentController controller = new ImageContentController(images, uploadDirectory.toString());

        var response = controller.get(filename);

        assertThat(response.getStatusCode().value()).isEqualTo(200);
        assertThat(response.getHeaders().getContentType()).isEqualTo(MediaType.IMAGE_PNG);
        assertThat(response.getHeaders().getCacheControl()).contains("max-age=31536000");
        assertThat(response.getBody()).isEqualTo(ONE_PIXEL_PNG);
    }

    @Test
    void returnsNotFoundWhenImageDoesNotExist() {
        StoredImageRepository images = mock(StoredImageRepository.class);
        when(images.findById("123e4567-e89b-12d3-a456-426614174000.jpg"))
                .thenReturn(Optional.empty());
        ImageContentController controller = new ImageContentController(images, uploadDirectory.toString());

        assertThatThrownBy(() -> controller.get("123e4567-e89b-12d3-a456-426614174000.jpg"))
                .isInstanceOf(ResponseStatusException.class)
                .satisfies(error -> assertThat(((ResponseStatusException) error).getStatusCode().value())
                        .isEqualTo(404));
    }
}
