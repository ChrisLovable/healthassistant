"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { mapsDirectionsUrl } from "@/lib/maps";
import { X } from "lucide-react";

type Lang = "en" | "af" | "xh";
type FinderType = "medical" | "pharmacy";
type TravelMode = "driving" | "walking";

type Place = {
  id: string;
  name: string;
  address: string;
  distance?: number;
  location: { lat: number; lng: number };
};

const LABELS = {
  en: {
    title: "Find nearby help",
    subtitle: "We show nearby places in distance order. Tap one to route there.",
    back: "Back",
    medical: "Nearest medical facility",
    pharmacy: "Nearest pharmacy",
    optionsTitle: "Nearby places",
    clickDirections: "Click to get directions",
    routeThere: "Route there",
    openRoute: "Open route",
    driving: "Drive",
    walking: "Walk",
    eta: "ETA",
    distance: "Distance",
    routeLoading: "Getting route details...",
    cancel: "Cancel",
    loading: "Finding nearby places...",
    locate: "Use my location",
    locationError: "Location is needed to show nearby places.",
    noResults: "No places found nearby. Please try again.",
    tryAgain: "Try again",
    note: "Public clinics offer free basic healthcare. Bring your ID and any clinic card.",
  },
  af: {
    title: "Vind hulp naby jou",
    subtitle: "Ons wys nabygeleë plekke volgens afstand. Tik een vir roete.",
    back: "Terug",
    medical: "Naaste mediese fasiliteit",
    pharmacy: "Naaste apteek",
    optionsTitle: "Plekke naby jou",
    clickDirections: "Klik vir aanwysings",
    routeThere: "Roete daarheen",
    openRoute: "Maak roete oop",
    driving: "Ry",
    walking: "Stap",
    eta: "Tyd",
    distance: "Afstand",
    routeLoading: "Kry roete-besonderhede...",
    cancel: "Kanselleer",
    loading: "Soek nabygeleë plekke...",
    locate: "Gebruik my ligging",
    locationError: "Ligging is nodig om nabygeleë plekke te wys.",
    noResults: "Geen plekke naby gevind nie. Probeer asseblief weer.",
    tryAgain: "Probeer weer",
    note: "Openbare klinieke bied gratis basiese gesondheidsorg. Bring jou ID en enige kliniekkaart saam.",
  },
  xh: {
    title: "Fumana uncedo olukufuphi",
    subtitle: "Sibonisa iindawo ezikufuphi ngokomgama. Cofa enye ukuze ufumane indlela.",
    back: "Buyela",
    medical: "Eyona ndawo yonyango ikufuphi",
    pharmacy: "Eyona farmasi ikufuphi",
    optionsTitle: "Iindawo ezikufuphi",
    clickDirections: "Cofa ukuze ufumane indlela",
    routeThere: "Ndikhokele apho",
    openRoute: "Vula indlela",
    driving: "Qhuba",
    walking: "Hamba ngeenyawo",
    eta: "Ixesha",
    distance: "Umgama",
    routeLoading: "Sifumana iinkcukacha zendlela...",
    cancel: "Rhoxisa",
    loading: "Sikhangela iindawo ezikufuphi...",
    locate: "Sebenzisa indawo endikuyo",
    locationError: "Indawo okuyo iyafuneka ukuze sibonise iindawo ezikufuphi.",
    noResults: "Akukho ndawo ifunyenwe kufuphi. Zama kwakhona.",
    tryAgain: "Zama kwakhona",
    note: "Iikliniki zikarhulumente zibonelela ngonyango olusisiseko simahla. Phatha i-ID yakho nekhadi lekliniki ukuba unalo.",
  },
} as const;

export function ClinicFinderClient({ lang, initialType }: { lang: Lang; initialType: FinderType }) {
  const activeType = initialType;
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [travelMode, setTravelMode] = useState<TravelMode>("driving");
  const [routeSummary, setRouteSummary] = useState<{ distanceText: string | null; durationText: string | null } | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const L = LABELS[lang];
  const apiTypes = useMemo(
    () => (activeType === "medical" ? ["clinic", "hospital", "emergency"] : ["pharmacy"]),
    [activeType]
  );

  const loadPlaces = () => {
    setLoading(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation({ lat, lng });
          const responses = await Promise.all(
            apiTypes.map((type) => fetch(`/api/places?lat=${lat}&lng=${lng}&type=${type}`))
          );
          const payloads = await Promise.all(responses.map((r) => r.json()));
          const merged = payloads.flatMap((p) => p.places || []);
          const deduped = Array.from(new Map(merged.map((p: Place) => [p.id, p])).values());
          deduped.sort((a, b) => (a.distance || 0) - (b.distance || 0));
          setPlaces(deduped);
        } catch {
          setLocationError(L.noResults);
          setPlaces([]);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLocationError(L.locationError);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    loadPlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiTypes]);

  useEffect(() => {
    if (!selectedPlace || !userLocation) return;
    let cancelled = false;
    const fetchRouteSummary = async () => {
      setRouteLoading(true);
      try {
        const response = await fetch(
          `/api/route-summary?originLat=${userLocation.lat}&originLng=${userLocation.lng}&destLat=${selectedPlace.location.lat}&destLng=${selectedPlace.location.lng}&mode=${travelMode}`
        );
        const data = await response.json();
        if (!cancelled) {
          setRouteSummary({
            distanceText: data.distanceText || null,
            durationText: data.durationText || null,
          });
        }
      } catch {
        if (!cancelled) {
          setRouteSummary({ distanceText: null, durationText: null });
        }
      } finally {
        if (!cancelled) setRouteLoading(false);
      }
    };
    fetchRouteSummary();
    return () => {
      cancelled = true;
    };
  }, [selectedPlace, userLocation, travelMode]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-12 pt-6">
      <Link href="/" className="mb-4 text-sm text-stone-500">&larr; {L.back}</Link>
      <h1 className="text-2xl font-bold text-stone-800">{activeType === "medical" ? L.medical : L.pharmacy}</h1>
      <p className="mt-2 text-stone-600">{L.subtitle}</p>

      <h2 className="mt-6 text-sm font-semibold text-stone-500">{L.optionsTitle}</h2>
      <div className="mt-3 flex flex-col gap-3">
        {loading && <p className="text-sm text-stone-500">{L.loading}</p>}
        {!loading && locationError && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-sm text-amber-800">{locationError}</p>
            <button
              type="button"
              onClick={loadPlaces}
              className="mt-2 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white"
            >
              {L.tryAgain}
            </button>
          </div>
        )}
        {!loading && !locationError && places.length === 0 && (
          <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3">
            <p className="text-sm text-stone-600">{L.noResults}</p>
            <button
              type="button"
              onClick={loadPlaces}
              className="mt-2 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white"
            >
              {L.locate}
            </button>
          </div>
        )}
        {!loading &&
          !locationError &&
          places.map((place) => (
            <button
              key={place.id}
              type="button"
              onClick={() => setSelectedPlace(place)}
              className="text-left rounded-2xl border border-stone-200 bg-white px-4 py-4 shadow-sm hover:border-stone-300"
            >
              <p className="text-base font-semibold text-stone-800">{place.name}</p>
              <p className="mt-1 text-sm text-stone-500">{place.address}</p>
              <p className="mt-1 text-xs font-medium text-violet-700">{L.clickDirections}</p>
              {typeof place.distance === "number" && (
                <p className="mt-1 text-xs font-semibold text-stone-400">{place.distance.toFixed(1)} km</p>
              )}
            </button>
          ))}
      </div>

      <p className="mt-8 rounded-xl bg-stone-100 px-4 py-3 text-sm text-stone-600">{L.note}</p>

      {selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
          <div className="relative h-[90vh] w-[90vw] max-w-3xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setSelectedPlace(null);
                setRouteSummary(null);
              }}
              className="absolute right-3 top-3 h-8 w-8 rounded-full border border-[var(--border)] bg-white text-[var(--text-muted)] shadow-sm hover:text-[var(--text)]"
              aria-label="Close modal"
            >
              <span className="grid h-full w-full place-items-center">
                <X size={16} />
              </span>
            </button>
            <p className="text-lg font-bold text-stone-800">{selectedPlace.name}</p>
            <p className="mt-1 text-sm text-stone-500">{selectedPlace.address}</p>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedPlace(null);
                  setRouteSummary(null);
                }}
                className="flex-1 rounded-xl px-3 py-2 text-sm font-semibold text-[var(--text)] border border-[var(--border)] bg-white shadow-[0_4px_0_rgba(0,0,0,0.12)] active:translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,0.12)] transition-all"
              >
                {L.cancel}
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTravelMode("driving")}
                className={`rounded-xl px-3 py-2 text-sm font-semibold shadow-[0_4px_0_rgba(0,0,0,0.12)] active:translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,0.12)] transition-all ${travelMode === "driving" ? "bg-emerald-600 text-white" : "bg-white text-[var(--text)] border border-[var(--border)]"}`}
              >
                {L.driving}
              </button>
              <button
                type="button"
                onClick={() => setTravelMode("walking")}
                className={`rounded-xl px-3 py-2 text-sm font-semibold shadow-[0_4px_0_rgba(0,0,0,0.12)] active:translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,0.12)] transition-all ${travelMode === "walking" ? "bg-emerald-600 text-white" : "bg-white text-[var(--text)] border border-[var(--border)]"}`}
              >
                {L.walking}
              </button>
            </div>

            <div className="mt-3 rounded-xl bg-[var(--surface-warm)] border border-[var(--border)] px-3 py-2">
              {routeLoading ? (
                <p className="text-xs text-[var(--text-muted)]">{L.routeLoading}</p>
              ) : (
                <p className="text-sm text-[var(--text)]">
                  <span className="font-semibold">{L.eta}:</span> {routeSummary?.durationText || "—"} ·{" "}
                  <span className="font-semibold">{L.distance}:</span> {routeSummary?.distanceText || "—"}
                </p>
              )}
            </div>

            <div className="mt-3">
              <a
                href={mapsDirectionsUrl(`${selectedPlace.location.lat},${selectedPlace.location.lng}`, travelMode)}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl px-3 py-2 text-center text-sm font-semibold text-white shadow-[0_4px_0_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,0.2)] transition-all"
                style={{ background: "radial-gradient(circle at 30% 25%, #B069CC, #8E44AD 50%, #5B2C72)" }}
              >
                {L.openRoute}
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
