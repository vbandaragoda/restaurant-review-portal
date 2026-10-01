"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ContentPage } from "@/components/content-page";
import { PageMessage } from "@/components/site-shell";
import { api } from "@/lib/api";
import { mediaStyle } from "@/lib/media";
import type { Cuisine } from "@/lib/types";

export function CuisineDirectory() {
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get<Cuisine[]>("/cuisines")
      .then((response) => setCuisines(response.data))
      .catch(() => setError("Cuisine categories could not be loaded."))
      .finally(() => setLoading(false));
  }, []);

  return <ContentPage title="Cuisine Categories" description="Explore Sri Lanka’s restaurant scene by cuisine, dietary preference and dining style." active="cuisines">
    <div className="mt-10">
      {loading && <PageMessage>Loading cuisine categories…</PageMessage>}
      {error && <PageMessage error>{error}</PageMessage>}
      {!loading && !error && cuisines.length === 0 && <PageMessage>No cuisine categories have been added yet.</PageMessage>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cuisines.map((cuisine) => <Link key={cuisine.id} href={`/restaurants?cuisine=${encodeURIComponent(cuisine.name)}`} className="overflow-hidden rounded-xl border border-soft-border bg-white transition hover:-translate-y-0.5 hover:shadow-md">
          <span className="block h-32" style={mediaStyle(cuisine.imageUrl, "#eeeae1")} />
          <span className="block p-4">
            <span className="block font-semibold">{cuisine.name}</span>
            <span className="mt-1 block text-xs text-muted">{cuisine.restaurantCount} restaurants</span>
            {cuisine.description && <span className="mt-2 line-clamp-2 block text-xs leading-5 text-muted">{cuisine.description}</span>}
          </span>
        </Link>)}
      </div>
    </div>
  </ContentPage>;
}
