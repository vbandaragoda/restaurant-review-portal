import { RestaurantSearch } from "@/components/restaurant-search";

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function RestaurantsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  return <RestaurantSearch
    initialQuery={first(params.q)}
    initialLocation={first(params.location)}
    initialCuisine={first(params.cuisine)}
    initialVegetarian={first(params.vegetarian) === "true"}
    initialVegan={first(params.vegan) === "true"}
    initialHalal={first(params.halal) === "true"}
    initialMaxPrice={first(params.maxPrice)}
    initialSpiceLevel={first(params.spiceLevel)}
  />;
}
