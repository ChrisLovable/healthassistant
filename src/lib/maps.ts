// Native maps deep links — no map library, no API key, no geolocation prompt.
// On mobile these open the device's Google Maps / Apple Maps app directly.

export function mapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

// destination: "lat,lng" (best) or a free-text address
export function mapsDirectionsUrl(destination: string, mode?: "driving" | "walking"): string {
  const modeParam = mode ? `&travelmode=${encodeURIComponent(mode)}` : "";
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}${modeParam}`;
}