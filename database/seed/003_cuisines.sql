USE tastelanka;

INSERT IGNORE INTO cuisines (slug, name, description, display_order)
VALUES
  ('sri-lankan', 'Sri Lankan', 'Traditional island flavours, rice and curry, hoppers, kottu and regional favourites.', 1),
  ('indian', 'Indian', 'Aromatic curries, tandoor dishes, biryani and fresh breads.', 2),
  ('chinese', 'Chinese', 'Wok-fired noodles, rice dishes and classic regional flavours.', 3),
  ('italian', 'Italian', 'Pizza, pasta and simple Mediterranean-inspired dishes.', 4),
  ('middle-eastern', 'Middle Eastern', 'Grills, mezze, shawarma and warm flatbreads.', 5),
  ('western', 'Western', 'Grilled favourites, comfort food and international classics.', 6),
  ('seafood', 'Seafood', 'Fresh fish, crab, prawns and coastal Sri Lankan specialities.', 7),
  ('vegetarian', 'Vegetarian', 'Plant-forward restaurants and meat-free dishes.', 8);
