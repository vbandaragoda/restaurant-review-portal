package com.tastelanka.portal.image;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "uploaded_images")
public class StoredImage {
    @Id
    @Column(name = "filename", nullable = false, length = 64)
    private String filename;

    @Column(name = "content_type", nullable = false, length = 32)
    private String contentType;

    @Lob
    @Column(name = "image_data", nullable = false, columnDefinition = "LONGBLOB")
    private byte[] data;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    protected StoredImage() { }

    public StoredImage(String filename, String contentType, byte[] data) {
        this.filename = filename;
        this.contentType = contentType;
        this.data = data;
        this.createdAt = Instant.now();
    }

    public String getFilename() { return filename; }
    public String getContentType() { return contentType; }
    public byte[] getData() { return data; }
    public Instant getCreatedAt() { return createdAt; }
}
