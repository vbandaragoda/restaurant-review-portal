"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Dish } from "@/lib/types";
import { MobileNavigation, PageMessage, SiteFooter, SiteHeader } from "@/components/site-shell";

export function DishDetails({ slug }: { slug: string }) {
  const [dish, setDish] = useState<Dish | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { api.get<Dish>(`/dishes/${slug}`).then((response) => setDish(response.data)).catch(() => setError("Dish details could not be loaded.")); }, [slug]);
  if (!dish) return <><SiteHeader active="restaurants" /><main className="mx-auto max-w-3xl px-5 py-16"><PageMessage error={Boolean(error)}>{error || "Loading dish…"}</PageMessage></main></>;
  return <div className="min-h-screen pb-20 md:pb-0">
    <SiteHeader active="restaurants" />
    <main className="mx-auto max-w-[1180px] px-5 py-8 md:py-14">
      <Link href={`/restaurants/${dish.restaurantSlug}`} className="text-sm font-semibold text-brand">‹ Back to {dish.restaurantName}</Link>
      <div className="mt-6 grid gap-10 md:grid-cols-[minmax(0,560px)_1fr]">
        <div className="h-[230px] rounded-xl md:h-[480px]" style={{ backgroundColor: dish.imageColor }} />
        <section className="md:pt-8"><h1 className="text-[30px] font-bold md:text-[38px]">{dish.name}</h1><p className="mt-2 text-sm text-muted">{dish.restaurantName}</p><p className="mt-5 text-2xl font-bold text-brand">LKR {new Intl.NumberFormat("en-LK").format(dish.price)}</p><p className="mt-4 text-sm font-semibold text-brand">★ {dish.rating || "New"} • {dish.reviewCount} reviews</p><div className="mt-5 flex gap-2">{dish.halal && <Pill>Halal</Pill>}<Pill>{dish.spiceLevel}</Pill>{dish.vegetarian && <Pill>Vegetarian</Pill>}</div><p className="mt-6 leading-7 text-muted">{dish.description}</p>
          <h2 className="mt-10 text-xl font-bold">Ratings</h2><div className="mt-4 grid grid-cols-3 gap-2"><Rating label="Food" value={dish.foodRating} /><Rating label="Service" value={dish.serviceRating} /><Rating label="Overall" value={dish.rating} /></div>
          <Link href={`/reviews/new?restaurant=${dish.restaurantSlug}&dish=${dish.slug}`} className="mt-7 block rounded-lg bg-brand px-5 py-3 text-center text-sm font-semibold text-white">Review this Dish</Link>
        </section>
      </div>
    </main>
    <div className="mt-20"><SiteFooter /></div><MobileNavigation active="restaurants" />
  </div>;
}

function Pill({ children }: { children: React.ReactNode }) { return <span className="rounded-full bg-surface px-3 py-2 text-xs font-semibold">{children}</span>; }
function Rating({ label, value }: { label: string; value: number }) { return <div className="rounded-xl bg-surface p-3"><p className="text-[11px] text-muted">{label}</p><p className="mt-2 text-2xl font-bold">{value || "–"}</p></div>; }
