import { RestaurantSearch } from "@/components/restaurant-search";

export default async function RestaurantsPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const params = await searchParams;
  const initialQuery = Array.isArray(params.q) ? params.q[0] ?? "" : params.q ?? "";
  return <RestaurantSearch initialQuery={initialQuery} />;
}
