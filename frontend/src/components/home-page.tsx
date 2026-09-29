"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { MobileNavigation, SiteHeader } from "@/components/site-shell";

const cuisines = [
  { name: "Sri Lankan", count: "120+ Restaurants", color: "#dbe5d1" },
  { name: "Indian", count: "95+ Restaurants", color: "#faf5eb" },
  { name: "Chinese", count: "60+ Restaurants", color: "#ebd9ba" },
  { name: "Italian", count: "45+ Restaurants", color: "#dbd1b8" },
  { name: "Middle Eastern", count: "40+ Restaurants", color: "#e5d6bf" },
  { name: "Western", count: "70+ Restaurants", color: "#e0cca8" },
] as const;

const restaurants = [
  { slug: "ministry-of-crab", name: "Ministry of Crab", mobileName: "Ministry of Crab", cuisine: "Seafood · Sri Lankan", mobileMeta: "Colombo • Seafood", location: "Colombo", rating: "4.8", reviews: "320", price: "LKR 8,000 – 12,000", mobilePrice: "LKR 8k–12k", color: "#522e14" },
  { slug: "the-empire-cafe", name: "The Empire Cafe", mobileName: "Empire Cafe", cuisine: "Cafe · International", mobileMeta: "Kandy • Cafe", location: "Kandy", rating: "4.6", reviews: "210", price: "LKR 2,000 – 4,000", mobilePrice: "LKR 2k–4k", color: "#3d6633" },
  { slug: "pedlars-inn", name: "Pedlar’s Inn", mobileName: "Pedlar’s Inn", cuisine: "Seafood · International", mobileMeta: "Galle • Seafood", location: "Galle", rating: "4.5", reviews: "180", price: "LKR 5,000 – 8,000", mobilePrice: "LKR 5k–8k", color: "#78a1ab" },
  { slug: "nuga-gama", name: "Nuga Gama", mobileName: "Nuga Gama", cuisine: "Sri Lankan · Authentic", mobileMeta: "Colombo • Sri Lankan", location: "Colombo", rating: "4.4", reviews: "150", price: "LKR 3,000 – 5,000", mobilePrice: "LKR 3k–5k", color: "#592e1f" },
] as const;

const requirements = [
  ["Dietary filters", "Vegetarian · Vegan · Halal"],
  ["Spice indicator", "Mild · Medium · Hot"],
  ["Multilingual", "English · සිංහල · தமிழ்"],
  ["Moderated reviews", "Approve before publishing"],
] as const;

function Brand() {
  return (
    <Link href="/" className="flex items-start gap-3" aria-label="TasteLanka home">
      <span className="hidden size-11 shrink-0 rounded-full bg-brand md:block" />
      <span className="flex flex-col gap-0.5">
        <strong className="text-[18px] leading-[22px] md:text-2xl md:leading-[29px]">TasteLanka</strong>
        <span className="hidden text-[11px] font-medium text-muted md:block">Discover · Dine · Review</span>
      </span>
    </Link>
  );
}

function DesktopHeader() {
  return <SiteHeader active="home" />;
}

function SearchForm({ mobile = false }: { mobile?: boolean }) {
  const [query, setQuery] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    window.location.assign(value ? `/restaurants?q=${encodeURIComponent(value)}` : "/restaurants");
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
      <select id="location" className="hidden bg-transparent px-[18px] text-sm font-medium outline-none sm:block">
        <option>All Locations</option><option>Colombo</option><option>Kandy</option><option>Galle</option>
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

function DesktopHome() {
  return (
    <div className="hidden md:block">
      <DesktopHeader />
      <section className="h-[510px] bg-[#1f1f17] px-[5vw] pt-[58px] text-white xl:px-[72px]">
        <p className="text-[11px] font-semibold text-[#c2baa8]">HERO PHOTO PLACEHOLDER · Sri Lankan coastal dining</p>
        <p className="mt-5 text-[13px] font-semibold text-[#e5d1b0]">EXPLORE. TASTE. SHARE.</p>
        <h1 className="mt-[17px] text-[42px] leading-[50px] font-bold tracking-[-0.5px]">Find Great Food<br />in Colombo, Kandy &amp; Galle</h1>
        <p className="mt-3 text-[17px] leading-[21px] text-[#e0ded4]">Discover restaurants, explore menus, read real reviews<br />and share your dining experiences.</p>
        <div className="mt-4"><SearchForm /></div>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {["Cuisine ▾", "Vegetarian", "Vegan", "Halal", "Spice Level ▾", "Price Band ▾"].map((filter) => (
            <button key={filter} className="rounded-[18px] bg-white px-[15px] py-2.5 text-xs font-medium text-[#1a1a17] hover:bg-surface" type="button">{filter}</button>
          ))}
        </div>
      </section>

      <main className="mx-auto max-w-[1440px] px-[4.45vw] pt-[34px] pb-10 xl:px-16">
        <SectionHeader title="Popular Cuisine Categories" link="View All Categories →" href="/cuisines" />
        <div className="mt-10 grid grid-cols-3 gap-4 lg:grid-cols-6">
          {cuisines.map((cuisine) => (
            <Link href={`/restaurants?cuisine=${encodeURIComponent(cuisine.name)}`} key={cuisine.name} className="h-[174px] overflow-hidden rounded-[14px] border border-soft-border transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="h-[104px]" style={{ backgroundColor: cuisine.color }} />
              <div className="bg-white p-2.5"><h3 className="text-[15px] font-semibold">{cuisine.name}</h3><p className="mt-1 text-[11px] text-muted">{cuisine.count}</p></div>
            </Link>
          ))}
        </div>

        <div className="mt-10"><SectionHeader title="Top Rated Restaurants" link="View All Restaurants →" href="/restaurants" /></div>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {restaurants.map((restaurant) => (
            <Link href={`/restaurants/${restaurant.slug}`} key={restaurant.name} className="h-[312px] overflow-hidden rounded-[14px] border border-soft-border transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="h-36" style={{ backgroundColor: restaurant.color }} />
              <div className="p-3.5">
                <p className="text-sm font-semibold text-[#f57814]">★ {restaurant.rating} <span className="ml-1 text-[11px] font-normal text-muted">({restaurant.reviews} reviews)</span></p>
                <h3 className="mt-[7px] text-lg font-bold">{restaurant.name}</h3>
                <p className="mt-[7px] text-xs text-muted">{restaurant.cuisine}</p><p className="mt-[7px] text-xs text-muted">⌖&nbsp; {restaurant.location}</p><p className="mt-[7px] text-xs font-medium text-muted">{restaurant.price}</p>
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
        <div><p className="text-[22px] font-bold text-[#edb84d]">TasteLanka</p><p className="mt-[7px] text-[11px] font-medium text-[#c2ccbf]">Discover · Dine · Review</p><p className="mt-[7px] text-xs font-medium">Good Food. A Better Sri Lanka.</p></div>
        <nav className="ml-auto flex gap-[26px] text-xs font-medium" aria-label="Footer navigation">
          {["Home", "About", "Contact", "Terms", "Privacy"].map((item) => <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`} key={item}>{item}</Link>)}
        </nav>
      </footer>
    </div>
  );
}

function MobileHome() {
  return (
    <div className="min-h-[844px] bg-white pb-24 md:hidden">
      <header className="h-16 px-5 pt-[22px]"><Brand /></header>
      <main className="px-5 pt-6">
        <h1 className="text-[28px] leading-[34px] font-bold">Find Great Food</h1>
        <p className="mt-1 text-[15px] leading-[18px] font-semibold text-[#e04005]">Colombo, Kandy &amp; Galle</p>
        <SearchForm mobile />
        <section className="mt-[26px]">
          <h2 className="text-lg font-bold">Popular cuisines</h2>
          <div className="mt-4 flex justify-between gap-1 overflow-x-auto">
            {["Rice & Curry", "Kottu", "Seafood", "Indian"].map((cuisine) => <Link key={cuisine} href={`/restaurants?cuisine=${encodeURIComponent(cuisine)}`} className="shrink-0 rounded-[15px] bg-surface px-2.5 py-[9px] text-[11px] leading-3 font-semibold">{cuisine}</Link>)}
          </div>
        </section>
        <section className="mt-[27px]">
          <h2 className="text-lg font-bold">Top rated</h2>
          <div className="mt-4 space-y-[22px]">
            {restaurants.slice(0, 2).map((restaurant) => (
              <Link href={`/restaurants/${restaurant.slug}`} key={restaurant.name} className="flex h-[148px] items-center overflow-hidden rounded-xl border border-[#ded9cf] p-[11px]">
                <div className="h-[124px] w-28 shrink-0 rounded-[10px]" style={{ backgroundColor: restaurant.color }} />
                <div className="ml-4 self-start pt-2"><h3 className="text-[15px] font-bold">{restaurant.mobileName}</h3><p className="mt-[11px] text-[11px] text-[#6b6b63]">{restaurant.mobileMeta}</p><p className="mt-[13px] text-xs font-semibold text-[#f2610d]">★ {restaurant.rating}</p><p className="mt-[11px] text-[11px] font-semibold">{restaurant.mobilePrice}</p></div>
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
  return <><DesktopHome /><MobileHome /></>;
}
