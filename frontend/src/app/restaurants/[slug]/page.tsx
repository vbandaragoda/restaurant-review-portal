import { RestaurantDetails } from "@/components/restaurant-details";

export default async function RestaurantPage({ params }: PageProps<"/restaurants/[slug]">) {
  const { slug } = await params;
  return <RestaurantDetails slug={slug} />;
}
