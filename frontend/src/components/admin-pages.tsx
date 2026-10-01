"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, apiErrorMessage } from "@/lib/api";
import { mediaStyle } from "@/lib/media";
import { getSession, useSession } from "@/lib/session";
import type { Cuisine, DashboardStats, Dish, Profile, Restaurant, Review } from "@/lib/types";
import { PageMessage, SiteHeader } from "@/components/site-shell";

type AdminPage = "dashboard" | "cuisines" | "restaurants" | "menu" | "users" | "reviews";
const input = "h-11 w-full rounded-lg border border-soft-border bg-white px-3 text-sm outline-none focus:border-brand";

function AdminShell({ active, title, subtitle, children }: { active: AdminPage; title: string; subtitle: string; children: ReactNode }) {
  const router = useRouter(); const session = useSession(); const ready = Boolean(session && session.role !== "USER");
  useEffect(() => { const current = getSession(); if (!current || current.role === "USER") router.replace("/login?next=/admin"); }, [router]);
  if (!ready) return <main className="mx-auto max-w-3xl px-5 py-16"><PageMessage>Checking administrator access…</PageMessage></main>;
  const links: Array<[AdminPage, string, string]> = [["dashboard","Dashboard","/admin"],["cuisines","Cuisines","/admin/cuisines"],["restaurants","Restaurants","/admin/restaurants"],["menu","Menu","/admin/menu"],["users","Users","/admin/users"],["reviews","Review Moderation","/admin/reviews"]];
  return <div className="min-h-screen bg-[#f8f6f1]"><SiteHeader /><div className="mx-auto grid max-w-[1440px] md:grid-cols-[240px_1fr]"><aside className="border-r border-soft-border bg-footer p-5 text-white md:min-h-[calc(100vh-84px)]"><p className="mb-7 text-sm font-bold text-[#ffa126]">ADMIN PORTAL</p><nav className="grid grid-cols-2 gap-2 md:grid-cols-1">{links.map(([key,label,href]) => <Link key={key} className={`rounded-lg px-4 py-3 text-sm ${active === key ? "bg-white font-semibold text-footer" : "text-white/80 hover:bg-white/10"}`} href={href}>{label}</Link>)}</nav></aside><main className="min-w-0 p-5 md:p-10"><h1 className="text-[30px] font-bold">{title}</h1><p className="mt-2 text-sm text-muted">{subtitle}</p><div className="mt-8">{children}</div></main></div></div>;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null); const [error, setError] = useState("");
  useEffect(() => { api.get<DashboardStats>("/admin/dashboard").then((response) => setStats(response.data)).catch(() => setError("Dashboard metrics could not be loaded.")); }, []);
  const cards: Array<[string, number | undefined, string]> = [["Cuisine categories",stats?.cuisines,"/admin/cuisines"],["Restaurants",stats?.restaurants,"/admin/restaurants"],["Menu items",stats?.dishes,"/admin/menu"],["Registered users",stats?.users,"/admin/users"],["Pending reviews",stats?.pendingReviews,"/admin/reviews"],["Approved reviews",stats?.approvedReviews,"/admin/reviews"]];
  return <AdminShell active="dashboard" title="Admin Dashboard" subtitle="Manage TasteLanka restaurants, menus and community reviews.">{error && <PageMessage error>{error}</PageMessage>}<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([label,value,href]) => <Link key={label} href={href} className="rounded-xl border border-soft-border bg-white p-6"><p className="text-sm text-muted">{label}</p><p className="mt-3 text-4xl font-bold">{value ?? "–"}</p><p className="mt-5 text-xs font-semibold text-brand">View details →</p></Link>)}</div></AdminShell>;
}

type CuisineForm = { id?: number; slug: string; name: string; description: string; displayOrder: string; imageUrl: string };
const emptyCuisine: CuisineForm = { slug: "", name: "", description: "", displayOrder: "0", imageUrl: "" };

export function CuisineManagement() {
  const [items, setItems] = useState<Cuisine[]>([]);
  const [form, setForm] = useState<CuisineForm>(emptyCuisine);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false);

  const load = useCallback(() => api.get<Cuisine[]>("/admin/cuisines")
    .then((response) => setItems(response.data))
    .catch(() => { setMessage("Cuisine categories could not be loaded."); setMessageError(true); }), []);

  useEffect(() => { void load(); }, [load]);

  const edit = (item: Cuisine) => {
    setForm({ id: item.id, slug: item.slug, name: item.name, description: item.description ?? "", displayOrder: String(item.displayOrder), imageUrl: item.imageUrl ?? "" });
    setMessage("");
    setMessageError(false);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage("");
    setMessageError(false);
    const payload = { slug: form.slug, name: form.name, description: form.description, displayOrder: Number(form.displayOrder), imageUrl: form.imageUrl || null };
    try {
      if (form.id) await api.put(`/admin/cuisines/${form.id}`, payload);
      else await api.post("/admin/cuisines", payload);
      setForm(emptyCuisine);
      setMessage("Cuisine category saved.");
      await load();
    } catch (error) {
      setMessage(apiErrorMessage(error, "Cuisine category could not be saved."));
      setMessageError(true);
    }
  };

  const remove = async (item: Cuisine) => {
    if (!window.confirm(`Delete ${item.name}?`)) return;
    try {
      await api.delete(`/admin/cuisines/${item.id}`);
      if (form.id === item.id) setForm(emptyCuisine);
      setMessage("Cuisine category deleted.");
      setMessageError(false);
      await load();
    } catch (error) {
      setMessage(apiErrorMessage(error, "Cuisine category could not be deleted."));
      setMessageError(true);
    }
  };

  return <AdminShell active="cuisines" title="Cuisine Management" subtitle="Create and edit the cuisine categories shown on the homepage, cuisine directory and restaurant filters.">
    <div className="grid gap-7 xl:grid-cols-[390px_1fr]">
      <form onSubmit={submit} className="space-y-4 rounded-xl border border-soft-border bg-white p-5">
        <h2 className="text-lg font-bold">{form.id ? "Edit cuisine" : "Add cuisine"}</h2>
        {message && <PageMessage error={messageError}>{message}</PageMessage>}
        <Field label="Name"><input required maxLength={80} className={input} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></Field>
        <Field label="Slug"><input required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" className={input} value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} /></Field>
        <Field label="Display order"><input required min="0" max="999" type="number" className={input} value={form.displayOrder} onChange={(event) => setForm({ ...form, displayOrder: event.target.value })} /></Field>
        <Field label="Description"><textarea maxLength={1000} className="h-24 w-full rounded-lg border border-soft-border p-3 text-sm outline-none focus:border-brand" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></Field>
        <ImageUploadField label="Cuisine image" value={form.imageUrl} onChange={(imageUrl) => setForm({ ...form, imageUrl })} />
        <div className="flex gap-2">
          {form.id && <button type="button" onClick={() => { setForm(emptyCuisine); setMessage(""); }} className="rounded-lg border border-soft-border px-4 py-3 text-sm">Cancel</button>}
          <button className="flex-1 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white" type="submit">Save Cuisine</button>
        </div>
      </form>
      <div className="space-y-3">
        {items.length === 0 && <PageMessage>No cuisine categories have been added.</PageMessage>}
        {items.map((item) => <article key={item.id} className="flex items-center rounded-xl border border-soft-border bg-white p-4">
          <span className="mr-4 size-16 shrink-0 rounded-lg" style={mediaStyle(item.imageUrl, "#eeeae1")} />
          <div className="min-w-0"><h3 className="font-bold">{item.name}</h3><p className="mt-1 text-xs text-muted">Order {item.displayOrder} · {item.restaurantCount} restaurants</p>{item.description && <p className="mt-2 line-clamp-1 text-xs text-muted">{item.description}</p>}</div>
          <div className="ml-auto flex shrink-0 gap-2 pl-3"><button onClick={() => edit(item)} className="rounded-lg border border-soft-border px-3 py-2 text-xs font-semibold">Edit</button><button onClick={() => void remove(item)} className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">Delete</button></div>
        </article>)}
      </div>
    </div>
  </AdminShell>;
}

type RestaurantForm = { id?: number; slug: string; name: string; cuisine: string; location: string; priceMin: string; priceMax: string; vegetarian: boolean; vegan: boolean; halal: boolean; description: string; imageUrl: string };
const emptyRestaurant: RestaurantForm = { slug:"",name:"",cuisine:"",location:"",priceMin:"",priceMax:"",vegetarian:false,vegan:false,halal:false,description:"",imageUrl:"" };

export function RestaurantManagement() {
  const [items,setItems]=useState<Restaurant[]>([]); const [form,setForm]=useState<RestaurantForm>(emptyRestaurant); const [message,setMessage]=useState("");
  const load=()=>api.get<Restaurant[]>("/admin/restaurants").then((response)=>setItems(response.data)).catch(()=>setMessage("Restaurants could not be loaded.")); useEffect(()=>{void load();},[]);
  const edit=(item:Restaurant)=>setForm({id:item.id,slug:item.slug,name:item.name,cuisine:item.cuisine,location:item.location,priceMin:String(item.priceMin),priceMax:String(item.priceMax),vegetarian:item.vegetarian,vegan:item.vegan,halal:item.halal,description:item.description??"",imageUrl:item.imageUrl??""});
  const submit=async(event:FormEvent)=>{event.preventDefault();setMessage("");const payload={...form,priceMin:Number(form.priceMin),priceMax:Number(form.priceMax),id:undefined};if(payload.priceMin>payload.priceMax){setMessage("Minimum price cannot be greater than maximum price.");return;}try{if(form.id) await api.put(`/admin/restaurants/${form.id}`,payload); else await api.post("/admin/restaurants",payload);setForm(emptyRestaurant);setMessage("Restaurant saved.");await load();}catch(error){setMessage(apiErrorMessage(error,"Restaurant could not be saved. Check the slug and required fields."));}};
  const remove=async(item:Restaurant)=>{if(!window.confirm(`Delete ${item.name}?`))return;try{await api.delete(`/admin/restaurants/${item.id}`);setMessage("Restaurant deleted.");await load();}catch(error){setMessage(apiErrorMessage(error,"Restaurant could not be deleted."));}};
  return <AdminShell active="restaurants" title="Restaurant Management" subtitle="Create, update and remove restaurant listings."><div className="grid gap-7 xl:grid-cols-[390px_1fr]"><form onSubmit={submit} className="space-y-4 rounded-xl border border-soft-border bg-white p-5"><h2 className="text-lg font-bold">{form.id?"Edit restaurant":"Add restaurant"}</h2>{message&&<PageMessage error={message.includes("could not")}>{message}</PageMessage>}<Field label="Name"><input required className={input} value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/></Field><Field label="Slug"><input required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" className={input} value={form.slug} onChange={(e)=>setForm({...form,slug:e.target.value})}/></Field><div className="grid grid-cols-2 gap-3"><Field label="Cuisine"><input required className={input} value={form.cuisine} onChange={(e)=>setForm({...form,cuisine:e.target.value})}/></Field><Field label="Location"><input required className={input} value={form.location} onChange={(e)=>setForm({...form,location:e.target.value})}/></Field></div><div className="grid grid-cols-2 gap-3"><Field label="Minimum price"><input required min="0" type="number" className={input} value={form.priceMin} onChange={(e)=>setForm({...form,priceMin:e.target.value})}/></Field><Field label="Maximum price"><input required min="0" type="number" className={input} value={form.priceMax} onChange={(e)=>setForm({...form,priceMax:e.target.value})}/></Field></div><Field label="Description"><textarea className="h-24 w-full rounded-lg border border-soft-border p-3 text-sm" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/></Field><div className="flex flex-wrap gap-4 text-xs">{(["vegetarian","vegan","halal"] as const).map((key)=><label key={key} className="flex items-center gap-2"><input type="checkbox" checked={form[key]} onChange={(e)=>setForm({...form,[key]:e.target.checked})}/>{key}</label>)}</div><ImageUploadField label="Restaurant image" value={form.imageUrl} onChange={(imageUrl)=>setForm({...form,imageUrl})}/><div className="flex gap-2">{form.id&&<button type="button" onClick={()=>setForm(emptyRestaurant)} className="rounded-lg border border-soft-border px-4 py-3 text-sm">Cancel</button>}<button className="flex-1 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white" type="submit">Save Restaurant</button></div></form><div className="space-y-3">{items.map((item)=><article key={item.id} className="flex items-center rounded-xl border border-soft-border bg-white p-4"><span className="mr-4 size-12 rounded-lg" style={mediaStyle(item.imageUrl,item.imageColor)}/><div><h3 className="font-bold">{item.name}</h3><p className="mt-1 text-xs text-muted">{item.cuisine} • {item.location}</p></div><div className="ml-auto flex gap-2"><button onClick={()=>edit(item)} className="rounded-lg border border-soft-border px-3 py-2 text-xs font-semibold">Edit</button><button onClick={()=>void remove(item)} className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">Delete</button></div></article>)}</div></div></AdminShell>;
}

type DishForm={id?:number;restaurantSlug:string;slug:string;name:string;description:string;price:string;spiceLevel:"Mild"|"Medium"|"Hot";vegetarian:boolean;halal:boolean;imageUrl:string};
const emptyDish:DishForm={restaurantSlug:"",slug:"",name:"",description:"",price:"",spiceLevel:"Medium",vegetarian:false,halal:false,imageUrl:""};
export function MenuManagement(){const[restaurants,setRestaurants]=useState<Restaurant[]>([]);const[items,setItems]=useState<Dish[]>([]);const[form,setForm]=useState<DishForm>(emptyDish);const[message,setMessage]=useState("");const load=()=>Promise.all([api.get<Restaurant[]>("/admin/restaurants"),api.get<Dish[]>("/admin/dishes")]).then(([r,d])=>{setRestaurants(r.data);setItems(d.data);setForm((current)=>({...current,restaurantSlug:current.restaurantSlug||r.data[0]?.slug||""}));}).catch(()=>setMessage("Menu data could not be loaded."));useEffect(()=>{void load();},[]);const edit=(item:Dish)=>setForm({id:item.id,restaurantSlug:item.restaurantSlug,slug:item.slug,name:item.name,description:item.description??"",price:String(item.price),spiceLevel:item.spiceLevel,vegetarian:item.vegetarian,halal:item.halal,imageUrl:item.imageUrl??""});const submit=async(e:FormEvent)=>{e.preventDefault();const payload={...form,price:Number(form.price),id:undefined};try{if(form.id) await api.put(`/admin/dishes/${form.id}`,payload); else await api.post("/admin/dishes",payload);setForm({...emptyDish,restaurantSlug:restaurants[0]?.slug??""});setMessage("Menu item saved.");await load();}catch(error){setMessage(apiErrorMessage(error,"Menu item could not be saved."));}};const remove=async(item:Dish)=>{if(!window.confirm(`Delete ${item.name}?`))return;try{await api.delete(`/admin/dishes/${item.id}`);setMessage("Menu item deleted.");await load();}catch(error){setMessage(apiErrorMessage(error,"Menu item could not be deleted."));}};return <AdminShell active="menu" title="Menu Management" subtitle="Manage dishes, pricing and dietary information."><div className="grid gap-7 xl:grid-cols-[390px_1fr]"><form onSubmit={submit} className="space-y-4 rounded-xl border border-soft-border bg-white p-5"><h2 className="text-lg font-bold">{form.id?"Edit dish":"Add dish"}</h2>{message&&<PageMessage error={message.includes("could not")}>{message}</PageMessage>}<Field label="Restaurant"><select required className={input} value={form.restaurantSlug} onChange={(e)=>setForm({...form,restaurantSlug:e.target.value})}>{restaurants.map((r)=><option key={r.id} value={r.slug}>{r.name}</option>)}</select></Field><Field label="Dish name"><input required className={input} value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/></Field><Field label="Slug"><input required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" className={input} value={form.slug} onChange={(e)=>setForm({...form,slug:e.target.value})}/></Field><div className="grid grid-cols-2 gap-3"><Field label="Price"><input required min="0" type="number" className={input} value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})}/></Field><Field label="Spice"><select className={input} value={form.spiceLevel} onChange={(e)=>setForm({...form,spiceLevel:e.target.value as DishForm["spiceLevel"]})}><option>Mild</option><option>Medium</option><option>Hot</option></select></Field></div><Field label="Description"><textarea className="h-24 w-full rounded-lg border border-soft-border p-3 text-sm" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/></Field><div className="flex gap-5 text-xs"><label><input type="checkbox" checked={form.vegetarian} onChange={(e)=>setForm({...form,vegetarian:e.target.checked})}/> Vegetarian</label><label><input type="checkbox" checked={form.halal} onChange={(e)=>setForm({...form,halal:e.target.checked})}/> Halal</label></div><ImageUploadField label="Dish image" value={form.imageUrl} onChange={(imageUrl)=>setForm({...form,imageUrl})}/><div className="flex gap-2">{form.id&&<button type="button" onClick={()=>setForm({...emptyDish,restaurantSlug:restaurants[0]?.slug??""})} className="rounded-lg border border-soft-border px-4 py-3 text-sm">Cancel</button>}<button className="flex-1 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white">Save Dish</button></div></form><div className="grid gap-3 lg:grid-cols-2">{items.map((item)=><article key={item.id} className="rounded-xl border border-soft-border bg-white p-4"><div className="h-28 rounded-lg" style={mediaStyle(item.imageUrl,item.imageColor)}/><h3 className="mt-3 font-bold">{item.name}</h3><p className="mt-1 text-xs text-muted">{item.restaurantName} • LKR {item.price}</p><div className="mt-4 flex gap-2"><button onClick={()=>edit(item)} className="rounded-lg border border-soft-border px-3 py-2 text-xs font-semibold">Edit</button><button onClick={()=>void remove(item)} className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">Delete</button></div></article>)}</div></div></AdminShell>;}

export function UserManagement() {
  const [items, setItems] = useState<Profile[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Profile[]>("/admin/users")
      .then((response) => setItems(response.data))
      .catch(() => setError("Registered users could not be loaded."))
      .finally(() => setLoading(false));
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleItems = normalizedQuery
    ? items.filter((item) => item.fullName.toLowerCase().includes(normalizedQuery)
      || item.email.toLowerCase().includes(normalizedQuery)
      || item.role.toLowerCase().includes(normalizedQuery))
    : items;

  return <AdminShell active="users" title="Registered Users" subtitle="View the accounts registered with TasteLanka.">
    <div className="rounded-xl border border-soft-border bg-white p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div><h2 className="text-lg font-bold">User directory</h2><p className="mt-1 text-xs text-muted">{items.length} registered accounts</p></div>
        <label className="sm:ml-auto"><span className="sr-only">Search users</span><input className={`${input} sm:w-72`} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, email or role" /></label>
      </div>
      <div className="mt-5">
        {loading && <PageMessage>Loading registered users…</PageMessage>}
        {error && <PageMessage error>{error}</PageMessage>}
        {!loading && !error && visibleItems.length === 0 && <PageMessage>No users match your search.</PageMessage>}
        {!loading && !error && visibleItems.length > 0 && <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-soft-border text-xs uppercase tracking-wide text-muted"><tr><th className="px-3 py-3 font-semibold">Name</th><th className="px-3 py-3 font-semibold">Email</th><th className="px-3 py-3 font-semibold">Role</th><th className="px-3 py-3 font-semibold">Language</th><th className="px-3 py-3 font-semibold">Joined</th></tr></thead>
          <tbody>{visibleItems.map((user) => <tr key={user.id} className="border-b border-soft-border last:border-0"><td className="px-3 py-4 font-semibold">{user.fullName}</td><td className="px-3 py-4 text-muted">{user.email}</td><td className="px-3 py-4"><span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${user.role === "ADMIN" ? "bg-brand/10 text-brand" : user.role === "MODERATOR" ? "bg-amber-100 text-amber-800" : "bg-surface text-muted"}`}>{user.role}</span></td><td className="px-3 py-4 uppercase text-muted">{user.language}</td><td className="px-3 py-4 text-muted">{new Date(user.createdAt).toLocaleDateString("en-LK", { year: "numeric", month: "short", day: "numeric" })}</td></tr>)}</tbody>
        </table></div>}
      </div>
    </div>
  </AdminShell>;
}

export function ReviewModeration() {
  const [status, setStatus] = useState<"PENDING" | "APPROVED" | "REJECTED">("PENDING");
  const [items, setItems] = useState<Review[]>([]);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [message, setMessage] = useState("");
  const load = useCallback(() => api.get<Review[]>("/admin/reviews", { params: { status } })
    .then((response) => setItems(response.data))
    .catch(() => setMessage("Reviews could not be loaded.")), [status]);
  useEffect(() => { void load(); }, [load]);

  const moderate = async (id: number, next: "APPROVED" | "REJECTED") => {
    const note = notes[id]?.trim() ?? "";
    if (next === "REJECTED" && !note) { setMessage("Add a reason before rejecting a review."); return; }
    try {
      await api.patch(`/admin/reviews/${id}`, { status: next, note });
      setMessage(`Review ${next.toLowerCase()}.`);
      setNotes((current) => ({ ...current, [id]: "" }));
      await load();
    } catch (error) { setMessage(apiErrorMessage(error, "Review status could not be changed.")); }
  };

  return <AdminShell active="reviews" title="Review Moderation" subtitle="Approve or reject multilingual community reviews before publication.">
    <div className="flex flex-wrap gap-2">{(["PENDING", "APPROVED", "REJECTED"] as const).map((item) => <button key={item} onClick={() => setStatus(item)} className={`rounded-full px-4 py-2 text-xs font-semibold ${status === item ? "bg-brand text-white" : "bg-white"}`}>{item}</button>)}</div>
    {message && <div className="mt-5"><PageMessage error={message.includes("could not") || message.startsWith("Add")}>{message}</PageMessage></div>}
    <div className="mt-6 space-y-4">{items.length === 0 && <PageMessage>No {status.toLowerCase()} reviews.</PageMessage>}{items.map((review) => <article key={review.id} className="rounded-xl border border-soft-border bg-white p-5">
      <div className="flex flex-wrap items-center gap-2"><h2 className="font-bold">{review.author}</h2><span className="text-xs text-muted">reviewed {review.dishName ?? review.restaurantName}</span><span className="ml-auto rounded-full bg-surface px-3 py-1 text-[10px] font-semibold uppercase">{review.language}</span></div>
      <p className="mt-3 text-brand">{"★".repeat(review.overallRating)}{"☆".repeat(5 - review.overallRating)}</p>
      <p className="mt-3 text-sm text-muted">{review.reviewText}</p>
      <p className="mt-3 text-xs font-semibold">Food {review.foodRating} • Service {review.serviceRating} • Overall {review.overallRating}</p>
      {status === "PENDING" ? <div className="mt-5">
        <label className="block text-xs font-semibold" htmlFor={`moderation-note-${review.id}`}>Moderation note <span className="font-normal text-muted">(required when rejecting)</span></label>
        <textarea id={`moderation-note-${review.id}`} value={notes[review.id] ?? ""} onChange={(event) => setNotes((current) => ({ ...current, [review.id]: event.target.value }))} className="mt-2 h-20 w-full rounded-lg border border-soft-border p-3 text-sm outline-none focus:border-brand" maxLength={1000} />
        <div className="mt-3 flex gap-2"><button onClick={() => void moderate(review.id, "REJECTED")} className="rounded-lg border border-red-200 px-4 py-2 text-xs font-semibold text-red-700">Reject</button><button onClick={() => void moderate(review.id, "APPROVED")} className="rounded-lg bg-green-700 px-4 py-2 text-xs font-semibold text-white">Approve</button></div>
      </div> : <div className="mt-4 rounded-lg bg-surface p-3 text-xs text-muted"><p><span className="font-semibold text-foreground">Moderated by:</span> {review.moderatedBy ?? "Unknown moderator"}{review.moderatedAt ? ` on ${new Date(review.moderatedAt).toLocaleString()}` : ""}</p>{review.moderatorNote && <p className="mt-2"><span className="font-semibold text-foreground">Note:</span> {review.moderatorNote}</p>}</div>}
    </article>)}</div>
  </AdminShell>;
}

function ImageUploadField({ label, value, onChange }: { label: string; value: string; onChange: (imageUrl: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError("Image must be 5 MB or smaller."); return; }
    setUploading(true); setError("");
    const data = new FormData();
    data.append("file", file);
    try {
      const response = await api.post<{ imageUrl: string }>("/admin/images", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange(response.data.imageUrl);
    } catch (uploadError) {
      setError(apiErrorMessage(uploadError, "Image could not be uploaded."));
    } finally {
      setUploading(false);
    }
  };

  return <div>
    <p className="text-xs font-semibold">{label}</p>
    {value && <div className="mt-2 h-36 rounded-lg border border-soft-border" role="img" aria-label={`${label} preview`} style={mediaStyle(value, "#eeeae1")} />}
    <div className="mt-2 flex gap-2">
      <label className={`cursor-pointer rounded-lg border border-soft-border px-4 py-3 text-xs font-semibold ${uploading ? "pointer-events-none opacity-60" : ""}`}>
        {uploading ? "Uploading…" : value ? "Replace image" : "Choose image"}
        <input className="sr-only" type="file" accept="image/jpeg,image/png,image/gif" disabled={uploading} onChange={upload} />
      </label>
      {value && <button className="rounded-lg px-3 py-2 text-xs font-semibold text-red-700" type="button" onClick={() => onChange("")}>Remove</button>}
    </div>
    <p className={`mt-2 text-[11px] ${error ? "text-red-700" : "text-muted"}`} aria-live="polite">{error || "JPEG, PNG or GIF, up to 5 MB."}</p>
  </div>;
}

function Field({label,children}:{label:string;children:ReactNode}){return <label className="block text-xs font-semibold">{label}<span className="mt-2 block">{children}</span></label>;}
