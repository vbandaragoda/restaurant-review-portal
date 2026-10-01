"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { mediaStyle } from "@/lib/media";
import type { Cuisine, Restaurant } from "@/lib/types";
import { MobileNavigation, PageMessage, SiteFooter, SiteHeader } from "@/components/site-shell";

const locations = ["Colombo", "Kandy", "Galle"];
const spiceLevels = ["Mild", "Medium", "Hot"];
const priceBands = [{ value: "3000", label: "Up to LKR 3,000" }, { value: "5000", label: "Up to LKR 5,000" }, { value: "8000", label: "Up to LKR 8,000" }];

type SearchProps = {
  initialQuery?: string;
  initialLocation?: string;
  initialCuisine?: string;
  initialVegetarian?: boolean;
  initialVegan?: boolean;
  initialHalal?: boolean;
  initialMaxPrice?: string;
  initialSpiceLevel?: string;
};

type FilterOverrides = Partial<{ query: string; location: string; cuisine: string; vegetarian: boolean; vegan: boolean; halal: boolean; maxPrice: string; spiceLevel: string }>;

function money(value: number) {
  return new Intl.NumberFormat("en-LK").format(value);
}

export function RestaurantSearch({ initialQuery = "", initialLocation = "", initialCuisine = "", initialVegetarian = false, initialVegan = false, initialHalal = false, initialMaxPrice = "", initialSpiceLevel = "" }: SearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [cuisine, setCuisine] = useState(initialCuisine);
  const [vegetarian, setVegetarian] = useState(initialVegetarian);
  const [vegan, setVegan] = useState(initialVegan);
  const [halal, setHalal] = useState(initialHalal);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [spiceLevel, setSpiceLevel] = useState(initialSpiceLevel);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [cuisineOptions, setCuisineOptions] = useState<string[]>(initialCuisine ? [initialCuisine] : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (overrides: FilterOverrides = {}) => {
    setLoading(true);
    setError("");
    try {
      const active = { query, location, cuisine, vegetarian, vegan, halal, maxPrice, spiceLevel, ...overrides };
      const params = { q: active.query || undefined, location: active.location || undefined,
        cuisine: active.cuisine || undefined, vegetarian: active.vegetarian, vegan: active.vegan,
        halal: active.halal, maxPrice: active.maxPrice ? Number(active.maxPrice) : undefined,
        spiceLevel: active.spiceLevel || undefined };
      const response = await api.get<Restaurant[]>("/restaurants", { params });
      setRestaurants(response.data);
    } catch {
      setError("Restaurants could not be loaded. Confirm that the Spring Boot API is running on port 8080.");
    } finally {
      setLoading(false);
    }
  }, [cuisine, halal, location, maxPrice, query, spiceLevel, vegan, vegetarian]);

  useEffect(() => {
    api.get<Restaurant[]>("/restaurants", { params: { q: initialQuery || undefined, location: initialLocation || undefined,
      cuisine: initialCuisine || undefined, vegetarian: initialVegetarian, vegan: initialVegan, halal: initialHalal,
      maxPrice: initialMaxPrice ? Number(initialMaxPrice) : undefined, spiceLevel: initialSpiceLevel || undefined } })
      .then((response) => setRestaurants(response.data))
      .catch(() => setError("Restaurants could not be loaded. Confirm that the Spring Boot API is running on port 8080."))
      .finally(() => setLoading(false));
  }, [initialCuisine, initialHalal, initialLocation, initialMaxPrice, initialQuery, initialSpiceLevel, initialVegan, initialVegetarian]);

  useEffect(() => {
    api.get<Cuisine[]>("/cuisines")
      .then((response) => setCuisineOptions(response.data.map((item) => item.name)))
      .catch(() => { if (!initialCuisine) setCuisineOptions([]); });
  }, [initialCuisine]);

  const syncUrl = (overrides: FilterOverrides = {}) => {
    const active = { query, location, cuisine, vegetarian, vegan, halal, maxPrice, spiceLevel, ...overrides };
    const url = new URL(window.location.href);
    const values: Record<string, string> = { q: active.query, location: active.location, cuisine: active.cuisine,
      vegetarian: active.vegetarian ? "true" : "", vegan: active.vegan ? "true" : "", halal: active.halal ? "true" : "",
      maxPrice: active.maxPrice, spiceLevel: active.spiceLevel };
    Object.entries(values).forEach(([key, value]) => value ? url.searchParams.set(key, value) : url.searchParams.delete(key));
    window.history.replaceState({}, "", url);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    syncUrl();
    void load();
  };

  const clear = () => {
    const cleared = { location: "", cuisine: "", vegetarian: false, vegan: false, halal: false, maxPrice: "", spiceLevel: "" };
    setLocation(""); setCuisine(""); setVegetarian(false); setVegan(false); setHalal(false); setMaxPrice(""); setSpiceLevel("");
    syncUrl(cleared);
    void load(cleared);
  };

  const applyFilters = () => { syncUrl(); void load(); };

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <SiteHeader active="restaurants" />
      <section className="bg-[#faf5e8] px-5 py-6 md:h-[170px] md:px-16 md:py-7">
        <h1 className="text-[26px] font-bold md:text-[30px]">Find restaurants</h1>
        <p className="mt-1 text-xs text-muted md:text-sm">Search and filter restaurants across Colombo, Kandy and Galle.</p>
        <form onSubmit={submit} className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_110px]">
          <label className="sr-only" htmlFor="restaurant-search">Search restaurants, dishes or cuisines</label>
          <input id="restaurant-search" className="h-12 min-w-0 rounded-[10px] border border-soft-border bg-white px-[18px] text-sm outline-none focus:border-brand" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="restaurants, dishes or cuisines..." />
          <label className="sr-only" htmlFor="search-location">Search location</label>
          <select id="search-location" className="h-12 min-w-0 rounded-[10px] border border-soft-border bg-white px-[18px] text-sm font-semibold outline-none focus:border-brand" value={location} onChange={(event) => setLocation(event.target.value)}>
            <option value="">All Locations</option>{locations.map((item) => <option key={item}>{item}</option>)}
          </select>
          <button className="h-12 rounded-[10px] bg-brand text-sm font-semibold text-white" type="submit">Search</button>
        </form>
      </section>

      <main className="mx-auto grid max-w-[1440px] gap-8 px-5 py-8 md:px-8 lg:grid-cols-[276px_minmax(0,1fr)] lg:gap-10 lg:px-16 lg:py-10">
        <aside className="hidden lg:block">
          <FilterPanel location={location} setLocation={setLocation} cuisine={cuisine} setCuisine={setCuisine}
            cuisines={cuisineOptions}
            vegetarian={vegetarian} setVegetarian={setVegetarian} vegan={vegan} setVegan={setVegan}
            halal={halal} setHalal={setHalal} maxPrice={maxPrice} setMaxPrice={setMaxPrice}
            spiceLevel={spiceLevel} setSpiceLevel={setSpiceLevel} clear={clear} apply={applyFilters} />
        </aside>

        <section className="min-w-0">
          <details className="mb-6 rounded-xl border border-soft-border bg-white p-4 lg:hidden">
            <summary className="cursor-pointer text-lg font-bold">Filters</summary>
            <FilterPanel location={location} setLocation={setLocation} cuisine={cuisine} setCuisine={setCuisine}
              cuisines={cuisineOptions}
              vegetarian={vegetarian} setVegetarian={setVegetarian} vegan={vegan} setVegan={setVegan}
              halal={halal} setHalal={setHalal} maxPrice={maxPrice} setMaxPrice={setMaxPrice}
              spiceLevel={spiceLevel} setSpiceLevel={setSpiceLevel} clear={clear} apply={applyFilters} compact />
          </details>
          <div className="flex items-start"><div><h2 className="text-[28px] font-bold">Restaurants</h2><p className="mt-1 text-[13px] text-muted">{restaurants.length} restaurants found</p></div>
            <label className="sr-only" htmlFor="restaurant-sort">Sort restaurants</label>
            <select id="restaurant-sort" className="ml-auto hidden h-[42px] w-[202px] rounded-lg border border-soft-border px-4 text-[13px] font-semibold md:block"><option>Sort: Top Rated</option></select>
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

type FilterPanelProps = {
  location: string; setLocation: (value: string) => void;
  cuisine: string; setCuisine: (value: string) => void;
  cuisines: string[];
  vegetarian: boolean; setVegetarian: (value: boolean) => void;
  vegan: boolean; setVegan: (value: boolean) => void;
  halal: boolean; setHalal: (value: boolean) => void;
  maxPrice: string; setMaxPrice: (value: string) => void;
  spiceLevel: string; setSpiceLevel: (value: string) => void;
  clear: () => void; apply: () => void; compact?: boolean;
};

function FilterPanel({ location, setLocation, cuisine, setCuisine, cuisines, vegetarian, setVegetarian, vegan, setVegan,
  halal, setHalal, maxPrice, setMaxPrice, spiceLevel, setSpiceLevel, clear, apply, compact = false }: FilterPanelProps) {
  return <div className={compact ? "pt-4" : ""}>
    <div className="flex items-center">{!compact && <h2 className="text-[22px] font-bold">Filters</h2>}<button onClick={clear} className="ml-auto text-[13px] font-semibold text-brand" type="button">Clear all</button></div>
    <div className={compact ? "grid gap-x-8 sm:grid-cols-2" : ""}>
      <FilterGroup title="Location" values={locations} selected={location} onSelect={setLocation} />
      <FilterGroup title="Cuisine" values={cuisines} selected={cuisine} onSelect={setCuisine} />
      <div className="mt-8"><h3 className="text-[15px] font-bold">Dietary</h3>
        <Check label="Vegetarian" checked={vegetarian} set={setVegetarian} />
        <Check label="Vegan" checked={vegan} set={setVegan} />
        <Check label="Halal" checked={halal} set={setHalal} />
      </div>
      <FilterGroup title="Spice level" values={spiceLevels} selected={spiceLevel} onSelect={setSpiceLevel} />
      <OptionFilterGroup title="Price per person" values={priceBands} selected={maxPrice} onSelect={setMaxPrice} />
    </div>
    <button onClick={apply} className="mt-8 h-11 w-full rounded-lg bg-brand text-sm font-semibold text-white" type="button">Apply Filters</button>
  </div>;
}

function FilterGroup({ title, values, selected, onSelect }: { title: string; values: string[]; selected: string; onSelect: (value: string) => void }) {
  return <div className="mt-8"><h3 className="text-[15px] font-bold">{title}</h3><div className="mt-4 space-y-3">{values.map((value) => <label key={value} className="flex items-center gap-3 text-[13px]"><input type="checkbox" checked={selected === value} onChange={() => onSelect(selected === value ? "" : value)} className="size-[18px] accent-brand" />{value}</label>)}</div></div>;
}

function OptionFilterGroup({ title, values, selected, onSelect }: { title: string; values: { value: string; label: string }[]; selected: string; onSelect: (value: string) => void }) {
  return <div className="mt-8"><h3 className="text-[15px] font-bold">{title}</h3><div className="mt-4 space-y-3">{values.map((option) => <label key={option.value} className="flex items-center gap-3 text-[13px]"><input type="checkbox" checked={selected === option.value} onChange={() => onSelect(selected === option.value ? "" : option.value)} className="size-[18px] accent-brand" />{option.label}</label>)}</div></div>;
}

function Check({ label, checked, set }: { label: string; checked: boolean; set: (value: boolean) => void }) {
  return <label className="mt-4 flex items-center gap-3 text-[13px]"><input type="checkbox" checked={checked} onChange={(event) => set(event.target.checked)} className="size-[18px] accent-brand" />{label}</label>;
}

function RestaurantResult({ restaurant }: { restaurant: Restaurant }) {
  return (
    <article className="flex min-h-[160px] min-w-0 flex-col rounded-xl border border-soft-border p-3 lg:min-h-[210px] lg:flex-row lg:p-[15px]">
      <div className="h-36 w-full shrink-0 rounded-[9px] lg:h-[178px] lg:w-[250px]" style={mediaStyle(restaurant.imageUrl, restaurant.imageColor || "#332417")} />
      <div className="flex min-w-0 flex-1 flex-col pt-4 lg:px-6 lg:py-0">
        <h3 className="break-words text-xl font-bold lg:text-[21px]">{restaurant.name}</h3>
        <p className="mt-2 text-[13px] font-semibold text-brand">★ {restaurant.rating} <span className="font-normal">({restaurant.reviewCount} reviews)</span></p>
        <p className="mt-3 text-[13px] text-muted">{restaurant.cuisine} · {restaurant.location}</p>
        <p className="mt-2 text-[13px] font-semibold">LKR {money(restaurant.priceMin)} – {money(restaurant.priceMax)}</p>
        <p className="mt-3 line-clamp-2 text-[13px] text-muted">{restaurant.description ?? "Explore the menu, prices and customer reviews."}</p>
        <div className="mt-auto flex flex-wrap items-end gap-2 pt-3">
          <span className="rounded-full border border-soft-border px-3 py-2 text-[11px] font-semibold">{restaurant.cuisine.split("·")[0].trim()}</span>
          <span className="rounded-full border border-soft-border px-3 py-2 text-[11px] font-semibold">{restaurant.location}</span>
          <Link className="ml-auto rounded-lg bg-brand px-5 py-3 text-[13px] font-semibold text-white" href={`/restaurants/${restaurant.slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
