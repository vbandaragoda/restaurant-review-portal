import { API_BASE_URL } from "@/lib/api";

const mediaBaseUrl = API_BASE_URL.replace(/\/api\/v1\/?$/i, "");

export function mediaUrl(path?: string) {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return `${mediaBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function mediaStyle(imageUrl: string | undefined, fallbackColor: string) {
  const resolvedUrl = mediaUrl(imageUrl);
  return {
    backgroundColor: fallbackColor,
    backgroundImage: resolvedUrl ? `url("${resolvedUrl}")` : undefined,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
}
