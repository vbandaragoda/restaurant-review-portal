"use client";

import Link from "next/link";
import { useSession } from "@/lib/session";

export type ActivePage = "home" | "restaurants" | "cuisines" | "about" | "reviews" | "profile";

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="TasteLanka home">
      <span className={`${compact ? "size-10" : "size-11"} rounded-full bg-brand`} />
      <span>
        <strong className="block text-2xl leading-none">TasteLanka</strong>
        <span className="mt-1 block text-[10px] text-muted">Discover • Dine • Review</span>
      </span>
    </Link>
  );
}

export function SiteHeader({ active }: { active?: ActivePage }) {
  const session = useSession();
  const links: Array<[ActivePage, string, string]> = [
    ["home", "Home", "/"],
    ["restaurants", "Restaurants", "/restaurants"],
    ["cuisines", "Cuisines", "/cuisines"],
    ["about", "About", "/about"],
  ];
  return (
    <>
      <header className="relative z-20 hidden h-[84px] items-center px-[5vw] shadow-[0_2px_8px_rgba(26,26,23,0.06)] md:flex xl:px-[72px]">
        <Brand />
        <span className="min-w-0 flex-1" aria-hidden="true" />
        <nav className="flex shrink-0 gap-[30px] text-sm leading-normal font-medium" aria-label="Main navigation">
          {links.map(([key, label, href]) => (
            <Link key={key} className={active === key ? "font-semibold text-brand" : ""} href={href}>{label}</Link>
          ))}
        </nav>
        <span className="min-w-0 flex-1" aria-hidden="true" />
        <div className="flex shrink-0 gap-2.5 text-sm leading-normal font-semibold">
          {session ? (
            <Link className="rounded-[10px] border border-soft-border px-[22px] py-[13px]" href={session.role === "ADMIN" || session.role === "MODERATOR" ? "/admin" : "/profile"}>
              {session.role === "USER" ? "Profile" : "Dashboard"}
            </Link>
          ) : (
            <>
              <Link className="rounded-[10px] border border-soft-border px-[22px] py-[13px]" href="/login">Log In</Link>
              <Link className="rounded-[10px] bg-brand px-[22px] py-[13px] text-white" href="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </header>
      <header className="relative z-20 flex h-16 items-center border-b border-soft-border px-5 shadow-[0_2px_8px_rgba(26,26,23,0.06)] md:hidden">
        <Link href="/" className="text-xl font-bold">TasteLanka</Link>
        {session ? <Link className="ml-auto text-xs font-semibold text-brand" href="/profile">{session.fullName.split(" ")[0]}</Link> : <Link className="ml-auto text-xs font-semibold text-brand" href="/login">Log In</Link>}
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="hidden h-[220px] items-start bg-footer px-16 py-12 text-white md:flex">
      <div><p className="text-xl font-bold text-[#ffa126]">TasteLanka</p><p className="mt-2 text-[11px]">Discover • Dine • Review</p><p className="mt-2 text-xs">Good Food. A Better Sri Lanka.</p></div>
      <nav className="ml-auto flex gap-7 pt-7 text-xs" aria-label="Footer navigation">
        <Link href="/">Home</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link>
      </nav>
    </footer>
  );
}

export function MobileNavigation({ active }: { active?: ActivePage }) {
  const items: Array<[ActivePage, string, string]> = [
    ["home", "Home", "/"], ["restaurants", "Search", "/restaurants"],
    ["reviews", "Reviews", "/profile#reviews"], ["profile", "Profile", "/profile"],
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 grid h-16 grid-cols-4 border-t border-soft-border bg-white text-center text-[10px] md:hidden" aria-label="Mobile navigation">
      {items.map(([key, label, href]) => <Link key={key} className={`pt-[26px] ${active === key ? "font-semibold text-brand" : "text-muted"}`} href={href}>{label}</Link>)}
    </nav>
  );
}

export function PageMessage({ children, error = false }: { children: React.ReactNode; error?: boolean }) {
  return <div className={`rounded-xl border px-4 py-3 text-sm ${error ? "border-red-200 bg-red-50 text-red-700" : "border-soft-border bg-surface"}`}>{children}</div>;
}
