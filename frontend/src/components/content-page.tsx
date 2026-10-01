import { MobileNavigation, SiteFooter, SiteHeader, type ActivePage } from "@/components/site-shell";

export function ContentPage({ title, description, active, children }: { title: string; description: string; active?: ActivePage; children?: React.ReactNode }) {
  return <div className="min-h-screen pb-20 md:pb-0"><SiteHeader active={active} /><main className="mx-auto max-w-[1000px] px-5 py-12 md:py-20"><p className="text-sm font-bold uppercase tracking-widest text-brand">TasteLanka</p><h1 className="mt-3 text-4xl font-bold md:text-5xl">{title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{description}</p>{children}</main><div className="mt-24"><SiteFooter /></div><MobileNavigation /></div>;
}
