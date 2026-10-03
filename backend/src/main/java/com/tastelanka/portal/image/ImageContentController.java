package com.tastelanka.portal.image;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
public class ImageContentController {
    private static final Pattern SAFE_FILENAME =
            Pattern.compile("^[0-9a-f-]+\\.(?:jpg|png|gif)$");
    private static final Map<String, MediaType> MEDIA_TYPES = Map.of(
            "jpg", MediaType.IMAGE_JPEG,
            "png", MediaType.IMAGE_PNG,
            "gif", MediaType.IMAGE_GIF);

    private final StoredImageRepository images;
    private final Path legacyUploadDirectory;

    public ImageContentController(StoredImageRepository images,
                                  @Value("${app.upload.directory:uploads}") String uploadDirectory) {
        this.images = images;
        this.legacyUploadDirectory = Path.of(uploadDirectory).toAbsolutePath().normalize();
    }

    @GetMapping("/uploads/{filename}")
    public ResponseEntity<byte[]> get(@PathVariable String filename) {
        if (!SAFE_FILENAME.matcher(filename).matches()) {
            throw new ResponseStatusException(NOT_FOUND, "Image not found");
        }

        Optional<StoredImage> stored = images.findById(filename);
        if (stored.isPresent()) {
            StoredImage image = stored.get();
            return response(image.getContentType(), image.getData());
        }

        // Keeps images uploaded by older local builds readable while all new uploads
        // are stored durably in the database.
        Path legacyFile = legacyUploadDirectory.resolve(filename).normalize();
        if (!legacyFile.getParent().equals(legacyUploadDirectory) || !Files.isRegularFile(legacyFile)) {
            throw new ResponseStatusException(NOT_FOUND, "Image not found");
        }

        try {
            String extension = filename.substring(filename.lastIndexOf('.') + 1);
            return response(MEDIA_TYPES.get(extension).toString(), Files.readAllBytes(legacyFile));
        } catch (IOException exception) {
            throw new ResponseStatusException(INTERNAL_SERVER_ERROR, "Image could not be read", exception);
        }
    }

    private ResponseEntity<byte[]> response(String contentType, byte[] data) {
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .contentLength(data.length)
                .cacheControl(CacheControl.maxAge(Duration.ofDays(365)).cachePublic().immutable())
                .body(data);
    }
}
