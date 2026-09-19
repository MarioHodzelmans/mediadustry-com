const DEFAULT_HOSTS = [
  "mediadustry.com",
  "www.mediadustry.com",
  "alexkamsmaparket.nl",
  "www.alexkamsmaparket.nl",
  "localhost",
];

function configuredHosts() {
  return (process.env.SHOWCASE_IFRAME_HOSTS ?? "")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedShowcaseUrl(value: string) {
  if (value.startsWith("/")) return true;
  try {
    const { hostname, protocol } = new URL(value);
    if (protocol !== "https:" && hostname !== "localhost") return false;
    return [...DEFAULT_HOSTS, ...configuredHosts()].some((entry) => {
      if (entry.startsWith("*.")) {
        const root = entry.slice(2);
        return hostname === root || hostname.endsWith(`.${root}`);
      }
      return hostname === entry;
    });
  } catch {
    return false;
  }
}
