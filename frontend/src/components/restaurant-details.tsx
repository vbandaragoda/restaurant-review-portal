"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { getSession } from "@/lib/session";
import type { Dish, Restaurant, Review } from "@/lib/types";
import { MobileNavigation, PageMessage, SiteFooter, SiteHeader } from "@/components/site-shell";

const money = (value: number) => new Intl.NumberFormat("en-LK").format(value);

export function RestaurantDetails({ slug }: { slug: string }) {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const requests: Promise<unknown>[] = [
      api.get<Restaurant>(`/restaurants/${slug}`),
      api.get<Dish[]>("/dishes", { params: { restaurant: slug } }),
      api.get<Review[]>("/reviews", { params: { restaurant: slug } }),
    ];
    if (getSession()) requests.push(api.get<Restaurant[]>("/users/me/saved-restaurants"));
    Promise.all(requests).then(([restaurantResponse, dishesResponse, reviewsResponse, savedResponse]) => {
      setRestaurant((restaurantResponse as { data: Restaurant }).data);
      setDishes((dishesResponse as { data: Dish[] }).data);
      setReviews((reviewsResponse as { data: Review[] }).data);
      if (savedResponse) setSaved((savedResponse as { data: Restaurant[] }).data.some((item) => item.slug === slug));
    }).catch(() => setError("Restaurant details could not be loaded. Confirm that the API is running."));
  }, [slug]);

  const saveRestaurant = async () => {
    if (!getSession()) { router.push(`/login?next=${encodeURIComponent(`/restaurants/${slug}`)}`); return; }
    try { await api.post(`/users/me/saved-restaurants/${slug}`); setSaved(true); }
    catch { setError("The restaurant could not be saved."); }
  };

  if (error && !restaurant) return <><SiteHeader active="restaurants" /><main className="mx-auto max-w-3xl px-5 py-16"><PageMessage error>{error}</PageMessage></main><MobileNavigation active="restaurants" /></>;
  if (!restaurant) return <><SiteHeader active="restaurants" /><main className="mx-auto max-w-3xl px-5 py-16"><PageMessage>Loading restaurant…</PageMessage></main></>;

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <SiteHeader active="restaurants" />
      <section className="relative flex h-[320px] flex-col justify-end gap-5 bg-[#332417] px-5 pb-8 text-white sm:flex-row sm:items-end sm:justify-start md:h-[360px] md:px-16 md:pb-16" style={{ backgroundColor: restaurant.imageColor }}>
        <div><h1 className="text-[30px] font-bold md:text-[38px]">{restaurant.name}</h1><p className="mt-2 text-sm md:text-[15px]">{restaurant.cuisine} • {restaurant.location}</p><p className="mt-3 text-[15px] font-semibold text-[#ffbf33]">★ {restaurant.rating} &nbsp; {restaurant.reviewCount} reviews</p></div>
        <div className="flex gap-2 sm:ml-auto">
          <button onClick={saveRestaurant} disabled={saved} aria-pressed={saved} className="rounded-lg border border-white/50 px-4 py-3 text-xs font-semibold disabled:cursor-default disabled:bg-white/15" type="button">{saved ? "Saved" : "Save"}</button>
          <Link href={`/reviews/new?restaurant=${restaurant.slug}`} className="rounded-lg bg-brand px-5 py-3 text-xs font-semibold">Write a Review</Link>
        </div>
      </section>

      <main className="mx-auto max-w-[1440px] px-5 py-8 md:px-16">
        {error && <div className="mb-5"><PageMessage error>{error}</PageMessage></div>}
        <section className="rounded-xl border border-soft-border p-5 md:p-6">
          <h2 className="text-xl font-bold">About this restaurant</h2>
          <p className="mt-3 text-[13px] text-muted">{restaurant.description ?? "Browse menu items, prices and approved customer reviews."}</p>
          <div className="mt-5 flex flex-wrap gap-2.5"><Tag>{restaurant.cuisine.split("·")[0].trim()}</Tag><Tag>{restaurant.location}</Tag><Tag>LKR {money(restaurant.priceMin)}–{money(restaurant.priceMax)}</Tag>{restaurant.halal && <Tag>Halal</Tag>}</div>
        </section>

        <h2 className="mt-10 text-[28px] font-bold">Menu</h2>
        <div className="mt-5 grid gap-7 lg:grid-cols-2">
          {dishes.map((dish) => <DishCard key={dish.id} dish={dish} />)}
          {dishes.length === 0 && <PageMessage>No menu items have been added yet.</PageMessage>}
        </div>

        <h2 className="mt-12 text-[28px] font-bold">Customer Reviews</h2>
        <div className="mt-5 space-y-6">
          {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
          {reviews.length === 0 && <PageMessage>No approved reviews yet. Be the first to share your experience.</PageMessage>}
        </div>
      </main>
      <div className="mt-24"><SiteFooter /></div>
      <MobileNavigation active="restaurants" />
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-surface px-3 py-2 text-xs font-semibold">{children}</span>;
}

function DishCard({ dish }: { dish: Dish }) {
  return <article className="flex min-h-[180px] rounded-xl border border-soft-border p-[15px] md:h-[210px]">
    <div className="w-[120px] shrink-0 rounded-[10px] md:w-[190px]" style={{ backgroundColor: dish.imageColor }} />
    <div className="flex min-w-0 flex-1 flex-col pl-4 md:pl-6"><h3 className="text-lg font-bold md:text-[19px]">{dish.name}</h3><p className="mt-2 text-sm font-semibold text-brand">LKR {money(dish.price)}</p><div className="mt-5 flex flex-wrap gap-2"><Tag>{dish.spiceLevel}</Tag>{dish.halal && <Tag>Halal</Tag>}{dish.vegetarian && <Tag>Vegetarian</Tag>}</div><p className="mt-3 hidden text-xs text-muted sm:block">View dish details and customer ratings</p><Link className="mt-auto self-end rounded-lg border border-soft-border px-5 py-3 text-xs font-semibold" href={`/dishes/${dish.slug}`}>View Dish</Link></div>
  </article>;
}

function ReviewCard({ review }: { review: Review }) {
  return <article className="min-h-[146px] rounded-xl border border-soft-border p-5"><h3 className="text-[15px] font-bold">{review.author}</h3><p className="mt-2 text-[15px] text-brand">{"★".repeat(review.overallRating)}{"☆".repeat(5 - review.overallRating)}</p><p className="mt-3 text-[13px] text-muted">{review.reviewText}</p><p className="mt-4 text-xs font-semibold">Food {review.foodRating}.0 • Service {review.serviceRating}.0</p></article>;
}
