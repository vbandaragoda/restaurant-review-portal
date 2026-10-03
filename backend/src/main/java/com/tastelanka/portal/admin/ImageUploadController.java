package com.tastelanka.portal.admin;

import com.tastelanka.portal.image.StoredImage;
import com.tastelanka.portal.image.StoredImageRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.imageio.ImageIO;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/images")
public class ImageUploadController {
    private static final long MAX_IMAGE_BYTES = 5L * 1024 * 1024;
    private static final Map<String, String> EXTENSIONS = Map.of(
            MediaType.IMAGE_JPEG_VALUE, ".jpg",
            MediaType.IMAGE_PNG_VALUE, ".png",
            MediaType.IMAGE_GIF_VALUE, ".gif");

    private final StoredImageRepository images;

    public ImageUploadController(StoredImageRepository images) {
        this.images = images;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ImageUploadResponse upload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Select an image to upload");
        }
        if (file.getSize() > MAX_IMAGE_BYTES) {
            throw new ResponseStatusException(HttpStatus.CONTENT_TOO_LARGE, "Image must be 5 MB or smaller");
        }
        String extension = EXTENSIONS.get(file.getContentType());
        if (extension == null) {
            throw new ResponseStatusException(HttpStatus.UNSUPPORTED_MEDIA_TYPE,
                    "Only JPEG, PNG, and GIF images are supported");
        }

        try {
            byte[] data = file.getBytes();
            if (ImageIO.read(new ByteArrayInputStream(data)) == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Uploaded file is not a valid image");
            }
            String filename = UUID.randomUUID() + extension;
            images.save(new StoredImage(filename, file.getContentType(), data));
            return new ImageUploadResponse("/uploads/" + filename);
        } catch (IOException exception) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Image could not be stored", exception);
        }
    }

    public record ImageUploadResponse(String imageUrl) { }
}
