"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Restaurant } from "@/lib/types";
import { MobileNavigation, PageMessage, SiteFooter, SiteHeader } from "@/components/site-shell";

const locations = ["Colombo", "Kandy", "Galle"];
const cuisines = ["Sri Lankan", "Indian", "Chinese", "Italian", "Middle Eastern", "Western"];

function money(value: number) {
  return new Intl.NumberFormat("en-LK").format(value);
}

export function RestaurantSearch({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [vegetarian, setVegetarian] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [halal, setHalal] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (initialQuery?: string) => {
    setLoading(true);
    setError("");
    try {
      const params = { q: (initialQuery ?? query) || undefined, location: location || undefined,
        cuisine: cuisine || undefined, vegetarian, vegan, halal };
      const response = await api.get<Restaurant[]>("/restaurants", { params });
      setRestaurants(response.data);
    } catch {
      setError("Restaurants could not be loaded. Confirm that the Spring Boot API is running on port 8080.");
    } finally {
      setLoading(false);
    }
  }, [cuisine, halal, location, query, vegan, vegetarian]);

  useEffect(() => {
    api.get<Restaurant[]>("/restaurants", { params: { q: initialQuery || undefined } })
      .then((response) => setRestaurants(response.data))
      .catch(() => setError("Restaurants could not be loaded. Confirm that the Spring Boot API is running on port 8080."))
      .finally(() => setLoading(false));
  }, [initialQuery]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const url = new URL(window.location.href);
    if (query) url.searchParams.set("q", query); else url.searchParams.delete("q");
    window.history.replaceState({}, "", url);
    void load();
  };

  const clear = () => {
    setLocation(""); setCuisine(""); setVegetarian(false); setVegan(false); setHalal(false);
  };

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <SiteHeader active="restaurants" />
      <section className="bg-[#faf5e8] px-5 py-6 md:h-[170px] md:px-16 md:py-7">
        <h1 className="text-[26px] font-bold md:text-[30px]">Find restaurants</h1>
        <p className="mt-1 text-xs text-muted md:text-sm">Search and filter restaurants across Colombo, Kandy and Galle.</p>
        <form onSubmit={submit} className="mt-5 grid gap-3 md:grid-cols-[minmax(0,760px)_230px_116px]">
          <input className="h-12 rounded-[10px] border border-soft-border bg-white px-[18px] text-sm outline-none focus:border-brand" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="restaurants, dishes or cuisines..." />
          <select className="h-12 rounded-[10px] border border-soft-border bg-white px-[18px] text-sm font-semibold outline-none" value={location} onChange={(event) => setLocation(event.target.value)}>
            <option value="">All Locations</option>{locations.map((item) => <option key={item}>{item}</option>)}
          </select>
          <button className="h-12 rounded-[10px] bg-brand text-sm font-semibold text-white" type="submit">Search</button>
        </form>
      </section>

      <main className="mx-auto grid max-w-[1440px] gap-10 px-5 py-10 md:grid-cols-[276px_minmax(0,992px)] md:px-16">
        <aside className="hidden md:block">
          <div className="flex items-center"><h2 className="text-[22px] font-bold">Filters</h2><button onClick={clear} className="ml-auto text-[13px] font-semibold text-brand" type="button">Clear all</button></div>
          <FilterGroup title="Location" values={locations} selected={location} onSelect={setLocation} />
          <FilterGroup title="Cuisine" values={cuisines} selected={cuisine} onSelect={setCuisine} />
          <div className="mt-8"><h3 className="text-[15px] font-bold">Dietary</h3>
            <Check label="Vegetarian" checked={vegetarian} set={setVegetarian} />
            <Check label="Vegan" checked={vegan} set={setVegan} />
            <Check label="Halal" checked={halal} set={setHalal} />
          </div>
          <button onClick={() => void load()} className="mt-10 h-11 w-full rounded-lg bg-brand text-sm font-semibold text-white" type="button">Apply Filters</button>
        </aside>

        <section>
          <div className="flex items-start"><div><h2 className="text-[28px] font-bold">Restaurants</h2><p className="mt-1 text-[13px] text-muted">{restaurants.length} restaurants found</p></div>
            <select className="ml-auto hidden h-[42px] w-[202px] rounded-lg border border-soft-border px-4 text-[13px] font-semibold md:block"><option>Sort: Top Rated</option></select>
          </div>
          <div className="mt-6 space-y-4">
            {loading && <PageMessage>Loading restaurants…</PageMessage>}
            {error && <PageMessage error>{error}</PageMessage>}
            {!loading && !error && restaurants.length === 0 && <PageMessage>No restaurants match these filters.</PageMessage>}
            {restaurants.map((restaurant) => <RestaurantResult key={restaurant.id} restaurant={restaurant} />)}
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileNavigation active="restaurants" />
    </div>
  );
}

function FilterGroup({ title, values, selected, onSelect }: { title: string; values: string[]; selected: string; onSelect: (value: string) => void }) {
  return <div className="mt-8"><h3 className="text-[15px] font-bold">{title}</h3><div className="mt-4 space-y-3">{values.map((value) => <label key={value} className="flex items-center gap-3 text-[13px]"><input type="checkbox" checked={selected === value} onChange={() => onSelect(selected === value ? "" : value)} className="size-[18px] accent-[#e04005]" />{value}</label>)}</div></div>;
}

function Check({ label, checked, set }: { label: string; checked: boolean; set: (value: boolean) => void }) {
  return <label className="mt-4 flex items-center gap-3 text-[13px]"><input type="checkbox" checked={checked} onChange={(event) => set(event.target.checked)} className="size-[18px] accent-[#e04005]" />{label}</label>;
}

function RestaurantResult({ restaurant }: { restaurant: Restaurant }) {
  return (
    <article className="flex min-h-[160px] flex-col rounded-xl border border-soft-border p-3 md:min-h-[210px] md:flex-row md:p-[15px]">
      <div className="h-36 w-full shrink-0 rounded-[9px] md:h-[178px] md:w-[250px]" style={{ backgroundColor: restaurant.imageColor || "#332417" }} />
      <div className="flex min-w-0 flex-1 flex-col pt-4 md:px-6 md:py-0">
        <h3 className="text-xl font-bold md:text-[21px]">{restaurant.name}</h3>
        <p className="mt-2 text-[13px] font-semibold text-[#f2610d]">★ {restaurant.rating} <span className="font-normal">({restaurant.reviewCount} reviews)</span></p>
        <p className="mt-3 text-[13px] text-muted">{restaurant.cuisine} · {restaurant.location}</p>
        <p className="mt-2 text-[13px] font-semibold">LKR {money(restaurant.priceMin)} – {money(restaurant.priceMax)}</p>
        <p className="mt-3 line-clamp-2 text-[13px] text-muted">{restaurant.description ?? "Explore the menu, prices and customer reviews."}</p>
        <div className="mt-auto flex items-end gap-2 pt-3">
          <span className="rounded-full border border-soft-border px-3 py-2 text-[11px] font-semibold">{restaurant.cuisine.split("·")[0].trim()}</span>
          <span className="rounded-full border border-soft-border px-3 py-2 text-[11px] font-semibold">{restaurant.location}</span>
          <Link className="ml-auto rounded-lg bg-brand px-6 py-3 text-[13px] font-semibold text-white" href={`/restaurants/${restaurant.slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
