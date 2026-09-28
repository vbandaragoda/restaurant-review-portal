USE tastelanka;

INSERT INTO restaurants
  (slug, name, cuisine, location, rating, review_count, price_min, price_max, vegetarian, vegan, halal)
VALUES
  ('ministry-of-crab', 'Ministry of Crab', 'Seafood · Sri Lankan', 'Colombo', 4.8, 320, 8000, 12000, FALSE, FALSE, TRUE),
  ('the-empire-cafe', 'The Empire Cafe', 'Cafe · International', 'Kandy', 4.6, 210, 2000, 4000, TRUE, TRUE, TRUE),
  ('pedlars-inn', 'Pedlar’s Inn', 'Seafood · International', 'Galle', 4.5, 180, 5000, 8000, TRUE, FALSE, TRUE),
  ('nuga-gama', 'Nuga Gama', 'Sri Lankan · Authentic', 'Colombo', 4.4, 150, 3000, 5000, TRUE, TRUE, TRUE)
ON DUPLICATE KEY UPDATE
  name = VALUES(name), cuisine = VALUES(cuisine), location = VALUES(location),
  rating = VALUES(rating), review_count = VALUES(review_count),
  price_min = VALUES(price_min), price_max = VALUES(price_max),
  vegetarian = VALUES(vegetarian), vegan = VALUES(vegan), halal = VALUES(halal);
