CREATE DATABASE IF NOT EXISTS tastelanka
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE tastelanka;

CREATE TABLE IF NOT EXISTS uploaded_images (
  filename VARCHAR(64) NOT NULL,
  content_type VARCHAR(32) NOT NULL,
  image_data LONGBLOB NOT NULL,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (filename)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'USER',
  preferred_language VARCHAR(5) NOT NULL DEFAULT 'en',
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  UNIQUE KEY uk_users_email (email),
  CONSTRAINT chk_users_language CHECK (preferred_language IN ('en', 'si', 'ta'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS restaurants (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(160) NOT NULL,
  name VARCHAR(160) NOT NULL,
  cuisine VARCHAR(80) NOT NULL,
  location VARCHAR(80) NOT NULL,
  rating DECIMAL(2,1) NOT NULL DEFAULT 0.0,
  review_count INT UNSIGNED NOT NULL DEFAULT 0,
  price_min INT UNSIGNED NOT NULL,
  price_max INT UNSIGNED NOT NULL,
  vegetarian BOOLEAN NOT NULL DEFAULT FALSE,
  vegan BOOLEAN NOT NULL DEFAULT FALSE,
  halal BOOLEAN NOT NULL DEFAULT FALSE,
  description TEXT NULL,
  image_color CHAR(7) NOT NULL DEFAULT '#332417',
  image_url VARCHAR(500) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uk_restaurants_slug (slug),
  KEY idx_restaurants_location (location),
  KEY idx_restaurants_cuisine (cuisine),
  KEY idx_restaurants_rating (rating),
  CONSTRAINT chk_restaurants_price_range CHECK (price_min <= price_max)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS dishes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  restaurant_id BIGINT UNSIGNED NOT NULL,
  slug VARCHAR(160) NOT NULL,
  name VARCHAR(160) NOT NULL,
  description TEXT NULL,
  price INT UNSIGNED NOT NULL,
  spice_level VARCHAR(20) NOT NULL,
  vegetarian BOOLEAN NOT NULL DEFAULT FALSE,
  halal BOOLEAN NOT NULL DEFAULT FALSE,
  image_color CHAR(7) NOT NULL DEFAULT '#bd471f',
  image_url VARCHAR(500) NULL,
  rating DECIMAL(2,1) NOT NULL DEFAULT 0.0,
  food_rating DECIMAL(2,1) NOT NULL DEFAULT 0.0,
  service_rating DECIMAL(2,1) NOT NULL DEFAULT 0.0,
  review_count INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE KEY uk_dishes_slug (slug),
  KEY idx_dishes_restaurant (restaurant_id),
  CONSTRAINT fk_dishes_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
  CONSTRAINT chk_dishes_spice CHECK (spice_level IN ('Mild', 'Medium', 'Hot'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS reviews (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  restaurant_id BIGINT UNSIGNED NOT NULL,
  dish_id BIGINT UNSIGNED NULL,
  food_rating TINYINT UNSIGNED NOT NULL,
  service_rating TINYINT UNSIGNED NOT NULL,
  overall_rating TINYINT UNSIGNED NOT NULL,
  language VARCHAR(5) NOT NULL DEFAULT 'en',
  review_text TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  moderator_note VARCHAR(500) NULL,
  moderated_by BIGINT UNSIGNED NULL,
  moderated_at DATETIME(6) NULL,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  KEY idx_reviews_restaurant_status (restaurant_id, status),
  CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_reviews_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  CONSTRAINT fk_reviews_dish FOREIGN KEY (dish_id) REFERENCES dishes(id) ON DELETE SET NULL,
  CONSTRAINT fk_reviews_moderator FOREIGN KEY (moderated_by) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT chk_reviews_language CHECK (language IN ('en', 'si', 'ta')),
  CONSTRAINT chk_reviews_status CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  CONSTRAINT chk_reviews_food_rating CHECK (food_rating BETWEEN 1 AND 5),
  CONSTRAINT chk_reviews_service_rating CHECK (service_rating BETWEEN 1 AND 5),
  CONSTRAINT chk_reviews_overall_rating CHECK (overall_rating BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS saved_restaurants (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  restaurant_id BIGINT UNSIGNED NOT NULL,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  UNIQUE KEY uk_saved_user_restaurant (user_id, restaurant_id),
  CONSTRAINT fk_saved_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_saved_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
