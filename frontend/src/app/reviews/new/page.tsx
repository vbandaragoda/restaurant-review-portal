import { ReviewForm } from "@/components/review-form";

export default async function NewReviewPage({ searchParams }: { searchParams: Promise<{ restaurant?: string; dish?: string }> }) {
  const params = await searchParams;
  return <ReviewForm initialRestaurantSlug={params.restaurant ?? ""} initialDishSlug={params.dish ?? ""} />;
}
