USE tastelanka;

INSERT IGNORE INTO restaurants
  (slug, name, cuisine, location, rating, review_count, price_min, price_max, vegetarian, vegan, halal, description, image_color)
VALUES
  ('spice-garden-colombo', 'Spice Garden Colombo', 'Indian', 'Colombo', 4.5, 84, 1800, 4200, TRUE, FALSE, TRUE, 'A welcoming Indian restaurant serving aromatic curries, tandoor favourites and fresh breads.', '#9b4a2f'),
  ('jade-dragon-kandy', 'Jade Dragon Kandy', 'Chinese', 'Kandy', 4.4, 72, 1600, 3800, TRUE, FALSE, TRUE, 'Classic Chinese dishes prepared with fresh vegetables, noodles and bold regional flavours.', '#8b2f32'),
  ('trattoria-galle', 'Trattoria Galle', 'Italian', 'Galle', 4.6, 105, 2200, 4800, TRUE, FALSE, TRUE, 'Relaxed Italian dining with handmade pizza, pasta and simple Mediterranean ingredients.', '#436c45'),
  ('cedar-table', 'Cedar Table', 'Middle Eastern', 'Colombo', 4.5, 91, 1800, 4500, TRUE, TRUE, TRUE, 'Middle Eastern grills, mezze and warm flatbreads served in a casual sharing-style setting.', '#a66b32'),
  ('coastal-grill-galle', 'Coastal Grill Galle', 'Western', 'Galle', 4.3, 68, 2400, 5200, TRUE, FALSE, TRUE, 'Western comfort food and grilled favourites served near the historic Galle Fort.', '#36596b');

INSERT IGNORE INTO dishes
  (restaurant_id, slug, name, description, price, spice_level, vegetarian, halal, image_color,
   rating, food_rating, service_rating, review_count)
SELECT r.id, seed.slug, seed.name, seed.description, seed.price, seed.spice_level, seed.vegetarian,
       seed.halal, seed.image_color, seed.rating, seed.food_rating, seed.service_rating, seed.review_count
FROM restaurants r
JOIN (
  SELECT 'spice-garden-colombo' restaurant_slug, 'butter-chicken' slug, 'Butter Chicken' name,
         'Tandoor-cooked chicken in a creamy tomato and spice sauce.' description, 2800 price,
         'Medium' spice_level, FALSE vegetarian, TRUE halal, '#c86b32' image_color,
         4.6 rating, 4.7 food_rating, 4.5 service_rating, 52 review_count
  UNION ALL SELECT 'jade-dragon-kandy', 'kung-pao-chicken', 'Kung Pao Chicken',
         'Wok-fried chicken with peanuts, vegetables and a hot savoury sauce.', 2400, 'Hot', FALSE, TRUE,
         '#a13d32', 4.5, 4.6, 4.3, 44
  UNION ALL SELECT 'trattoria-galle', 'margherita-pizza', 'Margherita Pizza',
         'Stone-baked pizza topped with tomato, mozzarella and fresh basil.', 2600, 'Mild', TRUE, TRUE,
         '#b64c37', 4.7, 4.8, 4.6, 66
  UNION ALL SELECT 'cedar-table', 'chicken-shawarma-platter', 'Chicken Shawarma Platter',
         'Spiced chicken shawarma with hummus, salad, pickles and warm flatbread.', 2900, 'Medium', FALSE, TRUE,
         '#ba7939', 4.6, 4.7, 4.5, 58
  UNION ALL SELECT 'coastal-grill-galle', 'grilled-chicken-steak', 'Grilled Chicken Steak',
         'Herb-marinated grilled chicken served with vegetables and pepper sauce.', 3400, 'Mild', FALSE, TRUE,
         '#6b4935', 4.4, 4.5, 4.3, 39
) seed ON seed.restaurant_slug = r.slug;
