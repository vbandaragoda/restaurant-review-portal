import type { Session } from "@/lib/types";
import { useMemo, useSyncExternalStore } from "react";

const TOKEN_KEY = "tastelanka.token";
const SESSION_KEY = "tastelanka.session";

export function saveSession(session: Session) {
  window.localStorage.setItem(TOKEN_KEY, session.token);
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("tastelanka-session"));
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(SESSION_KEY);
  if (!value) return null;
  try {
    return JSON.parse(value) as Session;
  } catch {
    clearSession();
    return null;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("tastelanka-session"));
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("tastelanka-session", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("tastelanka-session", callback);
  };
}

function snapshot() {
  return window.localStorage.getItem(SESSION_KEY);
}

export function useSession() {
  const value = useSyncExternalStore(subscribe, snapshot, () => null);
  return useMemo(() => {
    if (!value) return null;
    try { return JSON.parse(value) as Session; } catch { return null; }
  }, [value]);
}
