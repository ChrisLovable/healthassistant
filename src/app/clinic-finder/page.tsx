"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MapPin,
  Navigation,
  Phone,
  Clock,
  Star,
  ChevronLeft,
  Loader2,
  Hospital,
  Stethoscope,
  Pill,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { TopBar } from "@/components/ui/TopBar";
import { Sticker } from "@/components/ui/Sticker";

type FacilityType = "clinic" | "hospital" | "pharmacy" | "emergency";

const VALID_TYPES: FacilityType[] = ["clinic", "hospital", "pharmacy", "emergency"];

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

const FACILITY_OPTIONS: { type: FacilityType; label: string; sublabel: string; icon: typeof Hospital; color: string }[] = [
  { type: "clinic", label: "Clinic", sublabel: "Government & CHC", icon: Stethoscope, color: "#16A085" },
  { type: "hospital", label: "Hospital", sublabel: "All hospitals", icon: Hospital, color: "#2980B9" },
  { type: "pharmacy", label: "Pharmacy", sublabel: "Clicks, Dischem, etc", icon: Pill, color: "#8E44AD" },
  { type: "emergency", label: "Emergency", sublabel: "Casualty & ER", icon: AlertCircle, color: "#C0392B" },
];

export default function ClinicFinderPage() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") as FacilityType | null;
  
  const [facilityType, setFacilityType] = useState<FacilityType>(
    initialType && VALID_TYPES.includes(initialType) ? initialType : "clinic"
  );
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "requesting" | "granted" | "denied">("idle");

  const fetchPlaces = useCallback(async (lat: number, lng: number, type: FacilityType) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/places?lat=${lat}&lng=${lng}&type=${type}&radius=10000`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setPlaces([]);
      } else {
        setPlaces(data.places || []);
      }
    } catch {
      setError("Failed to fetch nearby places. Please try again.");
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const requestLocation = useCallback(() => {
    setLocationStatus("requesting");
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLocationStatus("denied");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
        setUserLocation(loc);
        setLocationStatus("granted");
        fetchPlaces(loc.lat, loc.lng, facilityType);
      },
      (err) => {
        setLocationStatus("denied");
        if (err.code === err.PERMISSION_DENIED) {
          setError("Location access denied. Please enable location in your browser settings.");
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setError("Location unavailable. Please try again.");
        } else {
          setError("Could not get your location. Please try again.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, [facilityType, fetchPlaces]);

  useEffect(() => {
    if (userLocation) {
      fetchPlaces(userLocation.lat, userLocation.lng, facilityType);
    }
  }, [facilityType, userLocation, fetchPlaces]);

  const formatDistance = (km?: number) => {
    if (km === undefined) return "";
    if (km < 1) return `${Math.round(km * 1000)} m`;
    return `${km.toFixed(1)} km`;
  };

  const getDirectionsUrl = (place: Place) => {
    const dest = `${place.location.lat},${place.location.lng}`;
    if (userLocation) {
      return `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${dest}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${dest}`;
  };

  const getPlaceBadge = (place: Place): { label: string; color: string } | null => {
    const name = place.name.toLowerCase();
    const address = place.address.toLowerCase();
    const combined = `${name} ${address}`;

    if (/community health|chc|primary health|gateway clinic|city health|provincial|department of health/i.test(combined)) {
      return { label: "Government", color: "#16A085" };
    }
    if (/day hospital/i.test(combined)) {
      return { label: "Day Hospital", color: "#2980B9" };
    }
    if (/clicks|dischem|dis-chem|medirite/i.test(name)) {
      return { label: "Chain", color: "#8E44AD" };
    }
    if (/netcare|life\s|mediclinic|busamed/i.test(combined)) {
      return { label: "Private", color: "#7F8C8D" };
    }
    return null;
  };

  const selectedFacility = FACILITY_OPTIONS.find((f) => f.type === facilityType)!;

  return (
    <div className="min-h-screen max-w-md mx-auto" style={{ ["--accent" as string]: selectedFacility.color } as React.CSSProperties}>
      <TopBar />

      <main className="pb-8">
        <div className="px-4 pt-5 pb-4">
          <Link href="/" className="inline-flex items-center gap-1 text-[12px] font-medium mb-3" style={{ color: selectedFacility.color }}>
            <ChevronLeft size={14} strokeWidth={2.5} />
            Back to home
          </Link>

          <div className="flex items-start gap-3 mb-4">
            <Sticker color={selectedFacility.color} icon="map-pin" size="md" />
            <div className="flex-1 pt-1">
              <h1 className="font-serif font-bold text-[24px] text-[var(--text)] tracking-tight leading-[1.05]">
                Find nearby help
              </h1>
              <p className="text-[13px] text-[var(--text-muted)] mt-1 leading-snug">
                Locate clinics, hospitals, pharmacies, and emergency rooms near you.
              </p>
            </div>
          </div>

          {/* Facility type selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
            {FACILITY_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isSelected = facilityType === opt.type;
              return (
                <button
                  key={opt.type}
                  onClick={() => setFacilityType(opt.type)}
                  className={`flex flex-col items-start px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
                    isSelected
                      ? "text-white shadow-md"
                      : "bg-white/80 text-[var(--text)] border border-[var(--border)] hover:bg-white"
                  }`}
                  style={isSelected ? { backgroundColor: opt.color } : undefined}
                >
                  <span className="flex items-center gap-1.5 text-[12px] font-medium">
                    <Icon size={14} />
                    {opt.label}
                  </span>
                  <span className={`text-[9px] mt-0.5 ${isSelected ? "text-white/80" : "text-[var(--text-soft)]"}`}>
                    {opt.sublabel}
                  </span>
                </button>
              );
            })}
          </div>

          {facilityType === "clinic" && (
            <p className="text-[11px] text-[var(--text-soft)] mt-2 leading-relaxed">
              Searching for government clinics, community health centres, and public primary care facilities. 
              Services at government clinics are free or low-cost.
            </p>
          )}
        </div>

        {/* Location request / results */}
        <div className="px-4">
          {locationStatus === "idle" && (
            <div className="bg-white/90 backdrop-blur border border-white/80 rounded-2xl p-6 shadow-card text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--surface-warm)] grid place-items-center">
                <MapPin size={28} className="text-[var(--text-muted)]" />
              </div>
              <h2 className="font-serif font-bold text-[18px] text-[var(--text)] mb-2">
                Enable location access
              </h2>
              <p className="text-[13px] text-[var(--text-muted)] mb-4 leading-relaxed">
                We need your location to find the nearest {facilityType === "emergency" ? "emergency room" : facilityType}s.
                Your location is never stored.
              </p>
              <button
                onClick={requestLocation}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: selectedFacility.color }}
              >
                <Navigation size={16} />
                Use my location
              </button>
            </div>
          )}

          {locationStatus === "requesting" && (
            <div className="bg-white/90 backdrop-blur border border-white/80 rounded-2xl p-6 shadow-card text-center">
              <Loader2 size={32} className="mx-auto mb-3 animate-spin text-[var(--text-muted)]" />
              <p className="text-[14px] text-[var(--text-muted)]">Getting your location...</p>
            </div>
          )}

          {locationStatus === "denied" && error && (
            <div className="bg-white/90 backdrop-blur border border-white/80 rounded-2xl p-6 shadow-card text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 grid place-items-center">
                <AlertCircle size={28} className="text-red-500" />
              </div>
              <h2 className="font-serif font-bold text-[18px] text-[var(--text)] mb-2">
                Location unavailable
              </h2>
              <p className="text-[13px] text-[var(--text-muted)] mb-4 leading-relaxed">{error}</p>
              <button
                onClick={requestLocation}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: selectedFacility.color }}
              >
                Try again
              </button>
            </div>
          )}

          {locationStatus === "granted" && (
            <>
              {loading && (
                <div className="bg-white/90 backdrop-blur border border-white/80 rounded-2xl p-6 shadow-card text-center">
                  <Loader2 size={32} className="mx-auto mb-3 animate-spin" style={{ color: selectedFacility.color }} />
                  <p className="text-[14px] text-[var(--text-muted)]">
                    Finding nearby {facilityType === "emergency" ? "emergency rooms" : `${facilityType}s`}...
                  </p>
                </div>
              )}

              {!loading && error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                  <p className="text-[13px] text-red-700">{error}</p>
                </div>
              )}

              {!loading && !error && places.length === 0 && (
                <div className="bg-white/90 backdrop-blur border border-white/80 rounded-2xl p-6 shadow-card text-center">
                  <p className="text-[14px] text-[var(--text-muted)]">
                    No {facilityType === "emergency" ? "emergency rooms" : `${facilityType}s`} found within 10 km.
                    Try a different facility type.
                  </p>
                </div>
              )}

              {!loading && !error && places.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-[12px] text-[var(--text-soft)] mb-1">
                    {places.length} {facilityType === "emergency" ? "emergency room" : facilityType}
                    {places.length !== 1 ? "s" : ""} found nearby
                  </p>

                  {places.map((place) => {
                    const badge = getPlaceBadge(place);
                    return (
                    <div
                      key={place.id}
                      className="bg-white/90 backdrop-blur border border-white/80 rounded-2xl p-4 shadow-card"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-xl grid place-items-center flex-shrink-0"
                          style={{ backgroundColor: `${selectedFacility.color}15` }}
                        >
                          <selectedFacility.icon size={20} style={{ color: selectedFacility.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2">
                            <h3 className="font-serif font-bold text-[14px] text-[var(--text)] leading-tight flex-1">
                              {place.name}
                            </h3>
                            {badge && (
                              <span 
                                className="text-[9px] font-medium px-1.5 py-0.5 rounded-full text-white flex-shrink-0"
                                style={{ backgroundColor: badge.color }}
                              >
                                {badge.label}
                              </span>
                            )}
                          </div>
                          <p className="text-[12px] text-[var(--text-muted)] mt-0.5 line-clamp-2">
                            {place.address}
                          </p>

                          <div className="flex flex-wrap items-center gap-3 mt-2">
                            {place.distance !== undefined && (
                              <span className="inline-flex items-center gap-1 text-[11px] text-[var(--text-soft)]">
                                <MapPin size={12} />
                                {formatDistance(place.distance)}
                              </span>
                            )}
                            {place.rating && (
                              <span className="inline-flex items-center gap-1 text-[11px] text-[var(--text-soft)]">
                                <Star size={12} className="text-amber-500" />
                                {place.rating.toFixed(1)}
                                {place.userRatingsTotal && (
                                  <span className="text-[10px]">({place.userRatingsTotal})</span>
                                )}
                              </span>
                            )}
                            {place.openNow !== undefined && (
                              <span
                                className={`inline-flex items-center gap-1 text-[11px] ${
                                  place.openNow ? "text-green-600" : "text-red-500"
                                }`}
                              >
                                <Clock size={12} />
                                {place.openNow ? "Open now" : "Closed"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3 pt-3 border-t border-[var(--border-soft)]">
                        <a
                          href={getDirectionsUrl(place)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-medium text-white transition-all hover:opacity-90"
                          style={{ backgroundColor: selectedFacility.color }}
                        >
                          <Navigation size={14} />
                          Directions
                        </a>
                        <a
                          href={`https://www.google.com/maps/place/?q=place_id:${place.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-medium bg-[var(--surface-warm)] text-[var(--text)] border border-[var(--border)] hover:bg-white transition-all"
                        >
                          <ExternalLink size={14} />
                          Details
                        </a>
                      </div>
                    </div>
                  );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Emergency notice */}
        {facilityType === "emergency" && (
          <div className="px-4 mt-4">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13px] font-medium text-red-800">In a life-threatening emergency</p>
                  <p className="text-[12px] text-red-700 mt-1">
                    Call <a href="tel:10177" className="font-bold underline">10177</a> (ambulance) or{" "}
                    <a href="tel:112" className="font-bold underline">112</a> (emergency from mobile)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
