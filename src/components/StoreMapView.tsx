"use client";

import { useEffect, useRef } from "react";
import type { Farm } from "@/types";

type Props = {
  farms: Farm[];
  userLat?: number | null;
  userLng?: number | null;
  containerClass?: string;
  selectedFarmId?: string | null;
};

function makeStoreIcon(L: typeof import("leaflet"), selected: boolean) {
  const size = selected ? 44 : 30;
  const fontSize = selected ? 18 : 13;
  const shadow = selected
    ? "0 0 0 5px rgba(192,57,43,0.25), 0 4px 14px rgba(0,0,0,0.35)"
    : "0 2px 8px rgba(0,0,0,0.3)";
  return L.divIcon({
    className: "",
    html: `<div style="
      background:#C0392B;color:white;border-radius:50%;
      width:${size}px;height:${size}px;display:flex;align-items:center;
      justify-content:center;font-size:${fontSize}px;
      box-shadow:${shadow};
      ${selected ? "border:3px solid white;" : ""}
      transition:all 0.2s ease;
    ">🏪</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2) - 4],
  });
}

export function StoreMapView({ farms, userLat, userLng, containerClass, selectedFarmId }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<Record<string, import("leaflet").Marker>>({});
  const lRef = useRef<typeof import("leaflet") | null>(null);

  /* ── Map init / teardown ── */
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let map: import("leaflet").Map;

    async function initMap() {
      try {
        const L = (await import("leaflet")).default;
        lRef.current = L;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        const centerLat = userLat ?? 36.5;
        const centerLng = userLng ?? 136.5;
        const zoom = userLat ? 10 : 5;

        map = L.map(mapRef.current!).setView([centerLat, centerLng], zoom);
        mapInstanceRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);

        markersRef.current = {};
        farms.forEach((farm) => {
          const lat = farm.storeLat ?? farm.lat;
          const lng = farm.storeLng ?? farm.lng;
          if (!lat || !lng) return;
          const isSelected = farm.id === selectedFarmId;
          const marker = L.marker([lat, lng], { icon: makeStoreIcon(L, isSelected) })
            .addTo(map)
            .bindPopup(
              `<strong>${farm.name}</strong><br>
               ${farm.storeAddress ?? farm.location}<br>
               <span style="color:#2D6A4F;font-size:12px">${farm.crops.join("・")}</span>`
            );
          markersRef.current[farm.id] = marker;
          if (isSelected) marker.openPopup();
        });

        if (userLat && userLng) {
          const meIcon = L.divIcon({
            className: "",
            html: `<div style="
              background:#2D6A4F;color:white;border-radius:50%;
              width:28px;height:28px;display:flex;align-items:center;
              justify-content:center;font-size:13px;box-shadow:0 2px 8px rgba(0,0,0,0.4);
              border:2px solid white;
            ">📍</div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14],
          });
          L.marker([userLat, userLng], { icon: meIcon })
            .addTo(map)
            .bindPopup("現在地");
        }
      } catch {
        // Leaflet failed
      }
    }

    initMap();

    return () => {
      if (map) map.remove();
      mapInstanceRef.current = null;
      markersRef.current = {};
      lRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [farms, userLat, userLng]);

  /* ── Selection highlight (no map reinit) ── */
  useEffect(() => {
    const L = lRef.current;
    const map = mapInstanceRef.current;
    if (!L || !map) return;

    Object.entries(markersRef.current).forEach(([farmId, marker]) => {
      marker.setIcon(makeStoreIcon(L, farmId === selectedFarmId));
    });

    if (selectedFarmId && markersRef.current[selectedFarmId]) {
      const marker = markersRef.current[selectedFarmId];
      map.panTo(marker.getLatLng(), { animate: true, duration: 0.4 });
      marker.openPopup();
    }
  }, [selectedFarmId]);

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div
        ref={mapRef}
        className={containerClass ?? "w-full h-[580px] rounded-2xl overflow-hidden border border-gray-200 shadow-md"}
      />
    </>
  );
}
