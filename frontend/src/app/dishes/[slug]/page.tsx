import { DishDetails } from "@/components/dish-details";

export default async function DishPage({ params }: PageProps<"/dishes/[slug]">) {
  const { slug } = await params;
  return <DishDetails slug={slug} />;
}
