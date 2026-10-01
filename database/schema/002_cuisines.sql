USE tastelanka;

CREATE TABLE IF NOT EXISTS cuisines (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(160) NOT NULL,
  name VARCHAR(80) NOT NULL,
  description TEXT NULL,
  image_url VARCHAR(500) NULL,
  display_order INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE KEY uk_cuisines_slug (slug),
  UNIQUE KEY uk_cuisines_name (name),
  KEY idx_cuisines_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
