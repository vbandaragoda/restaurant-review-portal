const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";
const mediaBaseUrl = apiBaseUrl.replace(/\/api\/v1\/?$/, "");

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
