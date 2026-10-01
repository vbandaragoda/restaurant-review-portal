USE tastelanka;

INSERT INTO restaurants
  (slug, name, cuisine, location, rating, review_count, price_min, price_max, vegetarian, vegan, halal, description, image_color)
VALUES
  ('ministry-of-crab', 'Ministry of Crab', 'Seafood · Sri Lankan', 'Colombo', 4.8, 320, 8000, 12000, FALSE, FALSE, TRUE, 'Popular seafood dining in Colombo. Browse menu items, prices and approved customer reviews.', '#332417'),
  ('the-empire-cafe', 'The Empire Cafe', 'Cafe · International', 'Kandy', 4.6, 220, 2000, 4000, TRUE, TRUE, TRUE, 'Casual dining with local and international favourites.', '#38592e'),
  ('pedlars-inn', 'Pedlar’s Inn', 'Cafe · International', 'Galle', 4.5, 490, 5000, 8000, TRUE, FALSE, TRUE, 'Relaxed cafe-style dining in the Galle area.', '#61949e'),
  ('nuga-gama', 'Nuga Gama', 'Sri Lankan · Authentic', 'Colombo', 4.4, 150, 3000, 5000, TRUE, TRUE, TRUE, 'Traditional Sri Lankan dining with local cuisine options.', '#662e1a'),
  ('green-leaf-kitchen', 'Green Leaf Kitchen', 'Sri Lankan · Vegetarian', 'Kandy', 4.3, 96, 1500, 3000, TRUE, TRUE, TRUE, 'Vegetarian-friendly local dishes with mild and medium spice options.', '#597a40')
ON DUPLICATE KEY UPDATE
  name = VALUES(name), cuisine = VALUES(cuisine), location = VALUES(location),
  rating = VALUES(rating), review_count = VALUES(review_count),
  price_min = VALUES(price_min), price_max = VALUES(price_max),
  vegetarian = VALUES(vegetarian), vegan = VALUES(vegan), halal = VALUES(halal),
  description = VALUES(description), image_color = VALUES(image_color);

INSERT INTO dishes
  (restaurant_id, slug, name, description, price, spice_level, vegetarian, halal, image_color,
   rating, food_rating, service_rating, review_count)
SELECT r.id, seed.slug, seed.name, seed.description, seed.price, seed.spice_level, seed.vegetarian,
       seed.halal, seed.image_color, seed.rating, seed.food_rating, seed.service_rating, seed.review_count
FROM restaurants r
JOIN (
  SELECT 'ministry-of-crab' restaurant_slug, 'chilli-crab' slug, 'Chilli Crab' name,
         'Signature Sri Lankan crab dish with a spicy chilli sauce.' description, 9500 price,
         'Hot' spice_level, FALSE vegetarian, TRUE halal, '#bd471f' image_color,
         4.9 rating, 4.9 food_rating, 4.6 service_rating, 142 review_count
  UNION ALL SELECT 'ministry-of-crab', 'garlic-prawn-rice', 'Garlic Prawn Rice',
         'Fragrant rice served with garlic prawns.', 4500, 'Medium', FALSE, TRUE, '#d19c42', 4.7, 4.8, 4.5, 88
  UNION ALL SELECT 'ministry-of-crab', 'vegetable-fried-rice', 'Vegetable Fried Rice',
         'Vegetarian fried rice with seasonal vegetables.', 2200, 'Mild', TRUE, TRUE, '#598c40', 4.5, 4.6, 4.4, 61
  UNION ALL SELECT 'ministry-of-crab', 'seafood-kottu', 'Seafood Kottu',
         'Sri Lankan kottu prepared with fresh seafood.', 3800, 'Hot', FALSE, TRUE, '#734d2e', 4.6, 4.7, 4.4, 74
) seed ON seed.restaurant_slug = r.slug
ON DUPLICATE KEY UPDATE
  name = VALUES(name), description = VALUES(description), price = VALUES(price),
  spice_level = VALUES(spice_level), vegetarian = VALUES(vegetarian), halal = VALUES(halal),
  image_color = VALUES(image_color), rating = VALUES(rating), food_rating = VALUES(food_rating),
  service_rating = VALUES(service_rating), review_count = VALUES(review_count);
