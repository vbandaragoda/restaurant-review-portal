import Link from "next/link";
import { MobileNavigation, SiteFooter, SiteHeader, type ActivePage } from "@/components/site-shell";

export function ContentPage({ title, description, active, children }: { title: string; description: string; active?: ActivePage; children?: React.ReactNode }) {
  return <div className="min-h-screen pb-20 md:pb-0"><SiteHeader active={active} /><main className="mx-auto max-w-[1000px] px-5 py-12 md:py-20"><p className="text-sm font-bold uppercase tracking-widest text-brand">TasteLanka</p><h1 className="mt-3 text-4xl font-bold md:text-5xl">{title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{description}</p>{children}</main><div className="mt-24"><SiteFooter /></div><MobileNavigation /></div>;
}

export function CuisineDirectory() {
  const cuisines = ["Sri Lankan", "Indian", "Chinese", "Italian", "Middle Eastern", "Western", "Seafood", "Vegetarian"];
  return <ContentPage title="Cuisine Categories" description="Explore Sri Lanka’s restaurant scene by cuisine, dietary preference and dining style." active="cuisines"><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cuisines.map((cuisine, index) => <Link key={cuisine} href={`/restaurants?cuisine=${encodeURIComponent(cuisine)}`} className="overflow-hidden rounded-xl border border-soft-border"><span className="block h-28" style={{backgroundColor:["#dbe5d1","#faf5eb","#ebd9ba","#dbd1b8","#e5d6bf","#e0cca8","#61949e","#598c40"][index]}}/><span className="block p-4 font-semibold">{cuisine}</span></Link>)}</div></ContentPage>;
}
