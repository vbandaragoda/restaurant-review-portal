"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { clearSession, getSession } from "@/lib/session";
import type { Profile, Restaurant, Review } from "@/lib/types";
import { MobileNavigation, PageMessage, SiteHeader } from "@/components/site-shell";

export function ProfilePage() {
  const router = useRouter(); const [profile, setProfile] = useState<Profile | null>(null); const [reviews, setReviews] = useState<Review[]>([]); const [saved, setSaved] = useState<Restaurant[]>([]); const [error, setError] = useState("");
  useEffect(() => { if (!getSession()) { router.replace("/login?next=/profile"); return; } Promise.all([api.get<Profile>("/users/me"), api.get<Review[]>("/reviews/mine"), api.get<Restaurant[]>("/users/me/saved-restaurants")]).then(([profileResponse, reviewResponse, savedResponse]) => { setProfile(profileResponse.data); setReviews(reviewResponse.data); setSaved(savedResponse.data); }).catch(() => setError("Your profile could not be loaded. Please log in again.")); }, [router]);
  const logout = () => { clearSession(); router.push("/"); };
  const removeSaved = async (restaurant: Restaurant) => { await api.delete(`/users/me/saved-restaurants/${restaurant.slug}`); setSaved((current) => current.filter((item) => item.id !== restaurant.id)); };
  return <div className="min-h-screen pb-20 md:pb-0"><SiteHeader active="profile" /><main className="mx-auto max-w-[1000px] px-5 py-7 md:py-12">
    <h1 className="text-[28px] font-bold">Profile</h1>{error && <div className="mt-5"><PageMessage error>{error}</PageMessage></div>}
    {!profile ? <div className="mt-7"><PageMessage>Loading profile…</PageMessage></div> : <>
      <section className="mt-7 flex items-center rounded-2xl bg-surface p-5"><div className="flex size-[72px] items-center justify-center rounded-full bg-brand text-2xl font-bold text-white">{profile.fullName.charAt(0)}</div><div className="ml-5"><h2 className="text-xl font-bold">{profile.fullName}</h2><p className="mt-1 text-sm text-muted">{profile.email}</p></div>{profile.role !== "USER" && <Link className="ml-auto rounded-lg bg-footer px-4 py-3 text-xs font-semibold text-white" href="/admin">Admin dashboard</Link>}</section>
      <h2 id="reviews" className="mt-10 text-xl font-bold">My Reviews</h2><div className="mt-4 space-y-4">{reviews.length === 0 && <PageMessage>You have not submitted a review yet.</PageMessage>}{reviews.map((review) => <article key={review.id} className="rounded-xl border border-soft-border p-4"><div className="flex"><Link className="font-semibold" href={`/restaurants/${review.restaurantSlug}`}>{review.restaurantName}</Link><span className={`ml-auto rounded-full px-2.5 py-1 text-[10px] font-semibold ${review.status === "APPROVED" ? "bg-green-100 text-green-700" : review.status === "REJECTED" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{review.status}</span></div><p className="mt-2 text-[#f2610d]">{"★".repeat(review.overallRating)}{"☆".repeat(5-review.overallRating)}</p><p className="mt-3 text-xs text-muted">{review.reviewText}</p></article>)}</div>
      <h2 className="mt-10 text-xl font-bold">Saved Restaurants</h2><div className="mt-4 space-y-4">{saved.length === 0 && <PageMessage>No saved restaurants yet.</PageMessage>}{saved.map((restaurant) => <article key={restaurant.id} className="flex items-center rounded-xl border border-soft-border p-4"><div><Link className="font-semibold" href={`/restaurants/${restaurant.slug}`}>{restaurant.name} • {restaurant.location}</Link><p className="mt-2 text-xs text-[#f2610d]">★ {restaurant.rating}</p></div><button onClick={() => void removeSaved(restaurant)} className="ml-auto text-xs font-semibold text-brand" type="button">Remove</button></article>)}</div>
      <button onClick={logout} className="mt-9 h-[42px] w-full rounded-lg border border-soft-border text-sm font-semibold text-brand" type="button">Log Out</button>
    </>}
  </main><MobileNavigation active="profile" /></div>;
}
