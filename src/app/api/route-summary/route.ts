import { NextRequest, NextResponse } from "next/server";

type TravelMode = "driving" | "walking";

export async function GET(request: NextRequest) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Google Maps API key not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const originLat = searchParams.get("originLat");
  const originLng = searchParams.get("originLng");
  const destLat = searchParams.get("destLat");
  const destLng = searchParams.get("destLng");
  const mode = (searchParams.get("mode") || "driving") as TravelMode;

  if (!originLat || !originLng || !destLat || !destLng) {
    return NextResponse.json({ error: "originLat, originLng, destLat and destLng are required" }, { status: 400 });
  }

  try {
    const url = new URL("https://maps.googleapis.com/maps/api/distancematrix/json");
    url.searchParams.set("origins", `${originLat},${originLng}`);
    url.searchParams.set("destinations", `${destLat},${destLng}`);
    url.searchParams.set("mode", mode);
    url.searchParams.set("key", apiKey);

    const response = await fetch(url.toString());
    const data = await response.json();
    const element = data?.rows?.[0]?.elements?.[0];

    if (element?.status !== "OK") {
      return NextResponse.json({ error: "No route found" }, { status: 404 });
    }

    return NextResponse.json({
      distanceText: element.distance?.text || null,
      durationText: element.duration?.text || null,
      mode,
    });
  } catch (error) {
    console.error("Route summary API error:", error);
    return NextResponse.json({ error: "Failed to fetch route summary" }, { status: 500 });
  }
}
