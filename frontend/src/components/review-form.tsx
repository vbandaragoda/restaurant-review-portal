"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { getSession } from "@/lib/session";
import type { Dish, Restaurant } from "@/lib/types";
import { PageMessage, SiteHeader } from "@/components/site-shell";

export function ReviewForm({ initialRestaurantSlug, initialDishSlug }: { initialRestaurantSlug: string; initialDishSlug: string }) {
  const router = useRouter();
  const [restaurantSlug, setRestaurantSlug] = useState(initialRestaurantSlug);
  const [dishSlug] = useState(initialDishSlug);
  const [availableRestaurants, setAvailableRestaurants] = useState<Restaurant[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [dish, setDish] = useState<Dish | null>(null);
  const [foodRating, setFoodRating] = useState(5);
  const [serviceRating, setServiceRating] = useState(5);
  const [overallRating, setOverallRating] = useState(5);
  const [language, setLanguage] = useState<"en" | "si" | "ta">("en");
  const [reviewText, setReviewText] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!getSession()) { router.replace(`/login?next=${encodeURIComponent(window.location.pathname + window.location.search)}`); return; }
    if (restaurantSlug) api.get<Restaurant>(`/restaurants/${restaurantSlug}`).then((response) => setRestaurant(response.data));
    else api.get<Restaurant[]>("/restaurants").then((response) => setAvailableRestaurants(response.data));
    if (dishSlug) api.get<Dish>(`/dishes/${dishSlug}`).then((response) => setDish(response.data));
  }, [dishSlug, restaurantSlug, router]);

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setSubmitting(true); setMessage("");
    if (!restaurantSlug) { setMessage("Please select a restaurant before submitting your review."); setSubmitting(false); return; }
    try {
      await api.post("/reviews", { restaurantSlug, dishSlug: dishSlug || null, foodRating, serviceRating, overallRating, language, reviewText });
      setMessage("Thank you. Your review is pending moderator approval."); setReviewText("");
    } catch { setMessage("The review could not be submitted. Please check all fields and try again."); }
    finally { setSubmitting(false); }
  };

  return <div className="min-h-screen bg-[#faf9f6]"><SiteHeader active="reviews" /><main className="mx-auto max-w-[760px] px-5 py-8 md:py-14">
    <Link href={restaurantSlug ? `/restaurants/${restaurantSlug}` : "/restaurants"} className="text-sm font-semibold text-brand">‹ Back</Link>
    <h1 className="mt-5 text-[30px] font-bold">Write a Review</h1><p className="mt-2 text-muted">{dish?.name ?? restaurant?.name ?? "Share your dining experience"}</p>
    {message && <div className="mt-5"><PageMessage error={!message.startsWith("Thank you")}>{message}</PageMessage></div>}
    <form onSubmit={submit} className="mt-7 space-y-6 rounded-2xl border border-soft-border bg-white p-5 md:p-8">
      {!initialRestaurantSlug && <label className="block text-sm font-semibold" htmlFor="review-restaurant">Restaurant
        <select id="review-restaurant" required value={restaurantSlug} onChange={(event) => { setRestaurantSlug(event.target.value); setRestaurant(null); }} className="mt-3 h-12 w-full rounded-xl border border-soft-border bg-white px-4 font-normal outline-none focus:border-brand">
          <option value="">Select a restaurant</option>
          {availableRestaurants.map((item) => <option key={item.id} value={item.slug}>{item.name} — {item.location}</option>)}
        </select>
      </label>}
      <Stars label="Food quality" value={foodRating} set={setFoodRating} /><Stars label="Customer service" value={serviceRating} set={setServiceRating} /><Stars label="Overall experience" value={overallRating} set={setOverallRating} />
      <fieldset><legend className="text-sm font-semibold">Language</legend><div className="mt-3 flex gap-2">{([["en", "English"], ["si", "සිංහල"], ["ta", "தமிழ்"]] as const).map(([value, label]) => <button key={value} onClick={() => setLanguage(value)} className={`rounded-full px-4 py-2 text-xs font-semibold ${language === value ? "bg-brand text-white" : "bg-surface"}`} type="button">{label}</button>)}</div></fieldset>
      <label className="block text-sm font-semibold">Review<textarea required minLength={10} maxLength={5000} value={reviewText} onChange={(event) => setReviewText(event.target.value)} className="mt-3 h-[150px] w-full resize-none rounded-xl border border-soft-border p-4 font-normal outline-none focus:border-brand" placeholder="Share your dining experience…" /></label>
      <PageMessage>Review is published only after moderator approval.</PageMessage>
      <div className="flex gap-3"><Link className="rounded-lg border border-soft-border px-5 py-3 text-sm font-semibold" href={restaurantSlug ? `/restaurants/${restaurantSlug}` : "/restaurants"}>Cancel</Link><button disabled={submitting} className="flex-1 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white disabled:opacity-60" type="submit">{submitting ? "Submitting…" : "Submit Review"}</button></div>
    </form>
  </main></div>;
}

function Stars({ label, value, set }: { label: string; value: number; set: (value: number) => void }) {
  return <fieldset><legend className="text-sm font-semibold">{label}</legend><div className="mt-2 flex gap-1" aria-label={`${label}: ${value} out of 5`}>{[1,2,3,4,5].map((star) => <button key={star} type="button" aria-label={`${star} ${star === 1 ? "star" : "stars"}`} aria-pressed={star === value} onClick={() => set(star)} className={`text-[34px] leading-none ${star <= value ? "text-brand" : "text-[#d8d4cc]"}`}><span aria-hidden="true">★</span></button>)}</div></fieldset>;
}
