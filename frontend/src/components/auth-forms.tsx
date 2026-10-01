"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { api } from "@/lib/api";
import { saveSession } from "@/lib/session";
import type { Session } from "@/lib/types";
import { PageMessage } from "@/components/site-shell";

function AuthBrand() { return <Link href="/" className="block text-center"><span className="mx-auto block size-[60px] rounded-full bg-brand" /><strong className="mt-4 block text-[28px]">TasteLanka</strong></Link>; }
const input = "h-12 w-full rounded-lg border border-soft-border px-3.5 outline-none focus:border-brand";
const field = `mt-2 ${input}`;

function PasswordField({ label, value, onChange, autoComplete, minLength, maxLength }: { label: string; value: string; onChange: (value: string) => void; autoComplete: string; minLength?: number; maxLength?: number }) {
  const [visible, setVisible] = useState(false);
  return <label className="block text-xs font-semibold">{label}<span className="relative mt-2 block"><input required minLength={minLength} maxLength={maxLength} type={visible ? "text" : "password"} autoComplete={autoComplete} value={value} onChange={(event) => onChange(event.target.value)} className={`${input} pr-16`} placeholder="••••••••" /><button type="button" aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`} aria-pressed={visible} onClick={() => setVisible((current) => !current)} className="absolute inset-y-0 right-3 my-auto h-fit text-xs font-semibold text-brand hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">{visible ? "Hide" : "Show"}</button></span></label>;
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const submit = async (event: FormEvent) => { event.preventDefault(); setLoading(true); setError(""); try { const response = await api.post<Session>("/auth/login", { email, password }); saveSession(response.data); const next = new URLSearchParams(window.location.search).get("next"); router.push(next || (response.data.role === "USER" ? "/profile" : "/admin")); } catch { setError("Invalid email or password."); } finally { setLoading(false); } };
  return <main className="min-h-screen bg-white px-5 py-14 md:flex md:items-center md:justify-center"><section className="mx-auto w-full max-w-[390px]"><AuthBrand /><h1 className="mt-11 text-[26px] font-bold">Welcome back</h1>{error && <div className="mt-5"><PageMessage error>{error}</PageMessage></div>}<form className="mt-6 space-y-5" onSubmit={submit}><label className="block text-xs font-semibold">Email<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className={field} placeholder="you@example.com" /></label><PasswordField label="Password" value={password} onChange={setPassword} autoComplete="current-password" /><div className="text-right"><Link className="text-xs font-semibold text-brand" href="/contact">Forgot password?</Link></div><button disabled={loading} className="h-[42px] w-full rounded-lg bg-brand text-sm font-semibold text-white disabled:opacity-60" type="submit">{loading ? "Logging in…" : "Log In"}</button><Link className="flex h-[42px] items-center justify-center rounded-lg border border-soft-border text-sm font-semibold" href="/">Continue as Guest</Link></form><p className="mt-7 text-center text-xs text-muted">New here? <Link className="font-semibold text-brand" href="/signup">Create an account</Link></p></section></main>;
}

export function SignUpForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const submit = async (event: FormEvent) => { event.preventDefault(); if (password !== confirm) { setError("Passwords do not match."); return; } setLoading(true); setError(""); try { const response = await api.post<Session>("/auth/register", { fullName, email, password, language: "en" }); saveSession(response.data); router.push("/profile"); } catch { setError("The account could not be created. The email may already be registered."); } finally { setLoading(false); } };
  return <main className="min-h-screen bg-white px-5 py-8 md:flex md:items-center md:justify-center"><section className="mx-auto w-full max-w-[420px]"><div className="flex items-center gap-4"><Link href="/login" className="text-3xl">‹</Link><h1 className="text-[22px] font-bold">Create Account</h1></div><h2 className="mt-8 text-[28px] font-bold">Join TasteLanka</h2><p className="mt-1 text-sm text-muted">Create an account to review and comment.</p>{error && <div className="mt-5"><PageMessage error>{error}</PageMessage></div>}<form className="mt-7 space-y-5" onSubmit={submit}><label className="block text-xs font-semibold">Full name<input required maxLength={120} value={fullName} onChange={(event) => setFullName(event.target.value)} className={field} placeholder="Amal Perera" /></label><label className="block text-xs font-semibold">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={field} placeholder="amal@example.com" /></label><PasswordField label="Password" value={password} onChange={setPassword} autoComplete="new-password" minLength={8} maxLength={72} /><PasswordField label="Confirm password" value={confirm} onChange={setConfirm} autoComplete="new-password" /><button disabled={loading} className="mt-4 h-[42px] w-full rounded-lg bg-brand text-sm font-semibold text-white disabled:opacity-60" type="submit">{loading ? "Creating…" : "Create Account"}</button></form><p className="mt-6 text-center text-xs text-muted">Already have an account? <Link className="font-semibold text-brand" href="/login">Log in</Link></p><div className="mt-8 rounded-xl bg-surface p-5 text-xs text-muted">English, Sinhala and Tamil review text supported.</div></section></main>;
}
