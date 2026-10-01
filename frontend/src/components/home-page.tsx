"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { mediaStyle } from "@/lib/media";
import type { Cuisine, Restaurant } from "@/lib/types";
import { MobileNavigation, SiteHeader } from "@/components/site-shell";

const requirements = [
  ["Dietary filters", "Vegetarian · Vegan · Halal"],
  ["Spice indicator", "Mild · Medium · Hot"],
  ["Multilingual", "English · සිංහල · தமிழ்"],
  ["Moderated reviews", "Approve before publishing"],
] as const;

function SearchForm({ mobile = false }: { mobile?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (location) params.set("location", location);
    router.push(params.size ? `/restaurants?${params.toString()}` : "/restaurants");
  };

  if (mobile) {
    return (
      <form onSubmit={submit} className="mt-[22px]">
        <label className="sr-only" htmlFor="mobile-search">Search restaurants or dishes</label>
        <input id="mobile-search" value={query} onChange={(event) => setQuery(event.target.value)} className="h-[46px] w-full rounded-xl bg-surface px-3.5 text-xs outline-none placeholder:text-[#6b6b63] focus:ring-2 focus:ring-brand/30" placeholder="Search restaurants or dishes…" />
      </form>
    );
  }

  return (
    <form onSubmit={submit} className="flex h-16 w-full max-w-[950px] items-center gap-3 rounded-[18px] bg-white py-2.5 pr-2.5 pl-5 text-[#1a1a17] shadow-sm">
      <label className="sr-only" htmlFor="desktop-search">Search restaurants, dishes or cuisines</label>
      <input id="desktop-search" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 text-sm outline-none placeholder:text-[#7a7870]" placeholder="Search for restaurants, dishes or cuisines…" />
      <label className="sr-only" htmlFor="location">Location</label>
      <select id="location" value={location} onChange={(event) => setLocation(event.target.value)} className="hidden bg-transparent px-[18px] text-sm font-medium outline-none sm:block">
        <option value="">All Locations</option><option>Colombo</option><option>Kandy</option><option>Galle</option>
      </select>
      <button className="rounded-[10px] bg-brand px-[22px] py-[13px] text-sm font-semibold text-white transition hover:bg-[#bd3d05]" type="submit">Search</button>
    </form>
  );
}

function SectionHeader({ title, link, href = "#" }: { title: string; link: string; href?: string }) {
  return (
    <div className="flex min-h-[100px] items-start">
      <h2 className="text-[26px] font-bold">{title}</h2>
      <Link href={href} className="ml-auto text-[13px] font-semibold text-brand">{link}</Link>
    </div>
  );
}

function DesktopHome({ restaurants, cuisines }: { restaurants: Restaurant[]; cuisines: Cuisine[] }) {
  const router = useRouter();
  return (
    <div className="hidden md:block">
      <section className="relative h-[510px] overflow-hidden bg-[#1f1f17] bg-[url('/images/hero.jpg')] bg-cover bg-center px-[5vw] pt-[58px] text-white xl:px-[72px]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" aria-hidden="true" />
        <div className="relative z-10">
          <p className="text-[13px] font-semibold text-[#e5d1b0]">EXPLORE. TASTE. SHARE.</p>
          <h1 className="mt-[17px] text-[42px] leading-[50px] font-bold tracking-[-0.5px]">Find Great Food<br />in Colombo, Kandy &amp; Galle</h1>
          <p className="mt-3 text-[17px] leading-[21px] text-[#e0ded4]">Discover restaurants, explore menus, read real reviews<br />and share your dining experiences.</p>
          <div className="mt-4"><SearchForm /></div>
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <Link href="/cuisines" className="rounded-[18px] bg-white px-[15px] py-2.5 text-xs font-medium text-[#1a1a17] hover:bg-surface">Cuisine</Link>
            <Link href="/restaurants?vegetarian=true" className="rounded-[18px] bg-white px-[15px] py-2.5 text-xs font-medium text-[#1a1a17] hover:bg-surface">Vegetarian</Link>
            <Link href="/restaurants?vegan=true" className="rounded-[18px] bg-white px-[15px] py-2.5 text-xs font-medium text-[#1a1a17] hover:bg-surface">Vegan</Link>
            <Link href="/restaurants?halal=true" className="rounded-[18px] bg-white px-[15px] py-2.5 text-xs font-medium text-[#1a1a17] hover:bg-surface">Halal</Link>
            <label className="sr-only" htmlFor="home-spice-filter">Spice level</label>
            <select id="home-spice-filter" defaultValue="" onChange={(event) => event.target.value && router.push(`/restaurants?spiceLevel=${event.target.value}`)} className="rounded-[18px] bg-white px-[15px] py-2.5 text-xs font-medium text-[#1a1a17] outline-none"><option value="" disabled>Spice Level</option><option>Mild</option><option>Medium</option><option>Hot</option></select>
            <label className="sr-only" htmlFor="home-price-filter">Maximum price</label>
            <select id="home-price-filter" defaultValue="" onChange={(event) => event.target.value && router.push(`/restaurants?maxPrice=${event.target.value}`)} className="rounded-[18px] bg-white px-[15px] py-2.5 text-xs font-medium text-[#1a1a17] outline-none"><option value="" disabled>Price Band</option><option value="3000">Up to LKR 3,000</option><option value="5000">Up to LKR 5,000</option><option value="8000">Up to LKR 8,000</option></select>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1440px] px-[4.45vw] pt-[34px] pb-10 xl:px-16">
        <SectionHeader title="Popular Cuisine Categories" link="View All Categories →" href="/cuisines" />
        <div className="mt-10 grid grid-cols-3 gap-4 lg:grid-cols-6">
          {cuisines.slice(0, 6).map((cuisine) => (
            <Link href={`/restaurants?cuisine=${encodeURIComponent(cuisine.name)}`} key={cuisine.name} className="h-[174px] overflow-hidden rounded-[14px] border border-soft-border transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="h-[104px]" style={mediaStyle(cuisine.imageUrl, "#eeeae1")} />
              <div className="bg-white p-2.5"><h3 className="text-[15px] font-semibold">{cuisine.name}</h3><p className="mt-1 text-[11px] text-muted">{cuisine.restaurantCount} restaurants</p></div>
            </Link>
          ))}
        </div>

        <div className="mt-10"><SectionHeader title="Top Rated Restaurants" link="View All Restaurants →" href="/restaurants" /></div>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {restaurants.map((restaurant) => (
            <Link href={`/restaurants/${restaurant.slug}`} key={restaurant.name} className="h-[312px] overflow-hidden rounded-[14px] border border-soft-border transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="h-36" style={mediaStyle(restaurant.imageUrl, restaurant.imageColor)} />
              <div className="p-3.5">
                <p className="text-sm font-semibold text-brand">★ {restaurant.rating} <span className="ml-1 text-[11px] font-normal text-muted">({restaurant.reviewCount} reviews)</span></p>
                <h3 className="mt-[7px] text-lg font-bold">{restaurant.name}</h3>
                <p className="mt-[7px] text-xs text-muted">{restaurant.cuisine}</p><p className="mt-[7px] text-xs text-muted">⌖&nbsp; {restaurant.location}</p><p className="mt-[7px] text-xs font-medium text-muted">LKR {money(restaurant.priceMin)} – {money(restaurant.priceMax)}</p>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-10 flex min-h-[148px] items-start rounded-2xl bg-surface-warm px-11 py-7">
          <div><h2 className="text-2xl font-bold">Support Local Restaurants</h2><p className="mt-[7px] text-sm text-muted">Help your favourite restaurants grow by sharing honest reviews.</p><p className="mt-[7px] text-xs font-medium text-brand">Good food deserves good words.</p></div>
          <Link href="/reviews/new" className="ml-auto rounded-[10px] bg-brand px-[22px] py-[13px] text-sm font-semibold text-white">Write a Review</Link>
        </section>

        <div className="mt-10"><SectionHeader title="Built for Sri Lankan diners" link="Core portal requirements" /></div>
        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {requirements.map(([title, detail]) => <article key={title} className="h-[100px] rounded-xl bg-surface p-[18px]"><h3 className="text-sm font-semibold">{title}</h3><p className="mt-1.5 text-xs text-muted">{detail}</p></article>)}
        </div>
      </main>

      <footer className="mt-[70px] flex h-[190px] items-start bg-footer px-[5vw] py-[42px] text-white xl:px-[72px]">
        <div><p className="text-[22px] font-bold text-[#edb84d]">TasteLanka</p><p className="mt-[7px] text-[11px] font-medium text-[#c2ccbf]">Discover · Dine · Review</p><p className="mt-[7px] text-xs font-medium">Good Food. A Better Sri Lanka.</p><p className="mt-4 text-[11px] text-[#c2ccbf]">&copy; 2026 Group 4</p></div>
        <nav className="ml-auto flex gap-[26px] text-xs font-medium" aria-label="Footer navigation">
          {["Home", "About", "Contact", "Terms", "Privacy"].map((item) => <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`} key={item}>{item}</Link>)}
        </nav>
      </footer>
    </div>
  );
}

function MobileHome({ restaurants, cuisines }: { restaurants: Restaurant[]; cuisines: Cuisine[] }) {
  return (
    <div className="min-h-[844px] bg-white pb-24 md:hidden">
      <main className="px-5 pt-6">
        <h1 className="text-[28px] leading-[34px] font-bold">Find Great Food</h1>
        <p className="mt-1 text-[15px] leading-[18px] font-semibold text-brand">Colombo, Kandy &amp; Galle</p>
        <SearchForm mobile />
        <section className="mt-[26px]">
          <h2 className="text-lg font-bold">Popular cuisines</h2>
          <div className="mt-4 flex justify-between gap-1 overflow-x-auto">
            {cuisines.slice(0, 4).map((cuisine) => <Link key={cuisine.id} href={`/restaurants?cuisine=${encodeURIComponent(cuisine.name)}`} className="shrink-0 rounded-[15px] bg-surface px-2.5 py-[9px] text-[11px] leading-3 font-semibold">{cuisine.name}</Link>)}
          </div>
        </section>
        <section className="mt-[27px]">
          <h2 className="text-lg font-bold">Top rated</h2>
          <div className="mt-4 space-y-[22px]">
            {restaurants.slice(0, 2).map((restaurant) => (
              <Link href={`/restaurants/${restaurant.slug}`} key={restaurant.name} className="flex h-[148px] items-center overflow-hidden rounded-xl border border-[#ded9cf] p-[11px]">
                <div className="h-[124px] w-28 shrink-0 rounded-[10px]" style={mediaStyle(restaurant.imageUrl, restaurant.imageColor)} />
                <div className="ml-4 min-w-0 self-start pt-2"><h3 className="truncate text-[15px] font-bold">{restaurant.name}</h3><p className="mt-[11px] truncate text-[11px] text-[#6b6b63]">{restaurant.location} • {restaurant.cuisine}</p><p className="mt-[13px] text-xs font-semibold text-brand">★ {restaurant.rating}</p><p className="mt-[11px] text-[11px] font-semibold">LKR {money(restaurant.priceMin)}–{money(restaurant.priceMax)}</p></div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <MobileNavigation active="home" />
    </div>
  );
}

export function HomePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  useEffect(() => {
    Promise.all([api.get<Restaurant[]>("/restaurants/top-rated"), api.get<Cuisine[]>("/cuisines")])
      .then(([topRated, cuisineResponse]) => { setRestaurants(topRated.data); setCuisines(cuisineResponse.data); })
      .catch(() => { setRestaurants([]); setCuisines([]); });
  }, []);
  return <><SiteHeader active="home" /><DesktopHome restaurants={restaurants} cuisines={cuisines} /><MobileHome restaurants={restaurants} cuisines={cuisines} /></>;
}

function money(value: number) {
  return new Intl.NumberFormat("en-LK").format(value);
}
