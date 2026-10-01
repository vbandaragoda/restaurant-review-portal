export type Restaurant = {
  id: number;
  slug: string;
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  reviewCount: number;
  priceMin: number;
  priceMax: number;
  vegetarian: boolean;
  vegan: boolean;
  halal: boolean;
  description?: string;
  imageColor: string;
  imageUrl?: string;
};

export type Cuisine = {
  id: number;
  slug: string;
  name: string;
  description?: string;
  imageUrl?: string;
  displayOrder: number;
  restaurantCount: number;
};

export type Dish = {
  id: number;
  slug: string;
  name: string;
  description?: string;
  price: number;
  spiceLevel: "Mild" | "Medium" | "Hot";
  vegetarian: boolean;
  halal: boolean;
  imageColor: string;
  imageUrl?: string;
  rating: number;
  foodRating: number;
  serviceRating: number;
  reviewCount: number;
  restaurantSlug: string;
  restaurantName: string;
};

export type Review = {
  id: number;
  author: string;
  restaurantSlug: string;
  restaurantName: string;
  dishSlug?: string;
  dishName?: string;
  foodRating: number;
  serviceRating: number;
  overallRating: number;
  language: "en" | "si" | "ta";
  reviewText: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  moderatorNote?: string;
  moderatedBy?: string;
  moderatedAt?: string;
  createdAt: string;
};

export type Session = {
  token: string;
  userId: number;
  fullName: string;
  email: string;
  role: "USER" | "MODERATOR" | "ADMIN";
  language: "en" | "si" | "ta";
};

export type Profile = {
  id: number;
  fullName: string;
  email: string;
  role: "USER" | "MODERATOR" | "ADMIN";
  language: "en" | "si" | "ta";
  createdAt: string;
};

export type DashboardStats = {
  restaurants: number;
  dishes: number;
  cuisines: number;
  users: number;
  pendingReviews: number;
  approvedReviews: number;
};
