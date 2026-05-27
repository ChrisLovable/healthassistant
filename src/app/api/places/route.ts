import { NextRequest, NextResponse } from "next/server";

type PlaceType = "clinic" | "hospital" | "pharmacy" | "emergency";

interface SearchConfig {
  queries: string[];
  type?: string;
}

const SEARCH_CONFIG: Record<PlaceType, SearchConfig> = {
  clinic: {
    queries: [
      "government clinic",
      "community health centre",
      "public clinic",
      "primary health care",
      "day hospital",
    ],
  },
  hospital: {
    queries: ["hospital"],
    type: "hospital",
  },
  pharmacy: {
    queries: ["pharmacy", "clicks pharmacy", "dischem"],
    type: "pharmacy",
  },
  emergency: {
    queries: ["emergency room", "casualty hospital", "emergency unit"],
    type: "hospital",
  },
};

const EXCLUDE_PATTERNS = [
  /guest\s*house/i,
  /guesthouse/i,
  /b\s*&\s*b/i,
  /bed\s*(and|&)\s*breakfast/i,
  /hotel/i,
  /lodge/i,
  /inn\b/i,
  /backpackers/i,
  /accommodation/i,
  /university(?!\s+hospital)/i,
  /college(?!\s+hospital)/i,
  /school(?!\s+of\s+(medicine|nursing))/i,
];

interface Place {
  id: string;
  name: string;
  address: string;
  location: { lat: number; lng: number };
  distance?: number;
  rating?: number;
  userRatingsTotal?: number;
  openNow?: boolean;
  types: string[];
}

function isValidPlace(place: Place, facilityType: PlaceType): boolean {
  const nameAndAddress = `${place.name} ${place.address}`.toLowerCase();

  for (const pattern of EXCLUDE_PATTERNS) {
    if (pattern.test(nameAndAddress)) {
      return false;
    }
  }

  if (place.types.some(t => ["lodging", "tourist_attraction", "travel_agency", "real_estate_agency"].includes(t))) {
    return false;
  }

  if (facilityType === "pharmacy") {
    const pharmacyKeywords = ["pharmacy", "apteek", "chemist", "clicks", "dischem", "medirite"];
    return pharmacyKeywords.some(k => nameAndAddress.includes(k));
  }

  return true;
}

export async function GET(request: NextRequest) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Google Maps API key not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const type = (searchParams.get("type") || "clinic") as PlaceType;
  const radius = searchParams.get("radius") || "10000";

  if (!lat || !lng) {
    return NextResponse.json({ error: "lat and lng are required" }, { status: 400 });
  }

  const config = SEARCH_CONFIG[type] || SEARCH_CONFIG.clinic;

  try {
    const allPlaces: Place[] = [];

    for (const query of config.queries) {
      const url = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json");
      url.searchParams.set("query", query);
      url.searchParams.set("location", `${lat},${lng}`);
      url.searchParams.set("radius", radius);
      if (config.type) {
        url.searchParams.set("type", config.type);
      }
      url.searchParams.set("key", apiKey);

      const response = await fetch(url.toString());
      const data = await response.json();

      if (data.status === "OK" && data.results) {
        const places: Place[] = data.results.map((place: {
          place_id: string;
          name: string;
          vicinity?: string;
          formatted_address?: string;
          geometry: { location: { lat: number; lng: number } };
          rating?: number;
          user_ratings_total?: number;
          opening_hours?: { open_now?: boolean };
          types?: string[];
        }) => ({
          id: place.place_id,
          name: place.name,
          address: place.vicinity || place.formatted_address || "",
          location: place.geometry.location,
          rating: place.rating,
          userRatingsTotal: place.user_ratings_total,
          openNow: place.opening_hours?.open_now,
          types: place.types || [],
        }));
        allPlaces.push(...places);
      }
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    const placesWithDistance = allPlaces
      .filter(place => isValidPlace(place, type))
      .map(place => ({
        ...place,
        distance: haversineDistance(userLat, userLng, place.location.lat, place.location.lng),
      }));

    const uniquePlaces = Array.from(new Map(placesWithDistance.map(p => [p.id, p])).values());
    uniquePlaces.sort((a, b) => (a.distance || 0) - (b.distance || 0));

    return NextResponse.json({ places: uniquePlaces.slice(0, 20) });
  } catch (error) {
    console.error("Places API error:", error);
    return NextResponse.json({ error: "Failed to fetch places" }, { status: 500 });
  }
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}
