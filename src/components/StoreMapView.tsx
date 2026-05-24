"use client";

import { useEffect, useRef } from "react";
import type { Farm } from "@/types";

type Props = {
  farms: Farm[];
  userLat?: number | null;
  userLng?: number | null;
};

export function StoreMapView({ farms, userLat, userLng }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let L: typeof import("leaflet");
    let map: import("leaflet").Map;

    async function initMap() {
      try {
        L = (await import("leaflet")).default;

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

        const storeIcon = L.divIcon({
          className: "",
          html: `<div style="
            background:#C0392B;color:white;border-radius:50%;
            width:30px;height:30px;display:flex;align-items:center;
            justify-content:center;font-size:13px;box-shadow:0 2px 8px rgba(0,0,0,0.3);
          ">🏪</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        farms.forEach((farm) => {
          const lat = farm.storeLat ?? farm.lat;
          const lng = farm.storeLng ?? farm.lng;
          if (!lat || !lng) return;
          L.marker([lat, lng], { icon: storeIcon })
            .addTo(map)
            .bindPopup(
              `<strong>${farm.name}</strong><br>
               ${farm.storeAddress ?? farm.location}<br>
               <span style="color:#2D6A4F;font-size:12px">${farm.crops.join("・")}</span>`
            );
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
        // Leaflet failed — ErrorBoundary handles fallback
      }
    }

    initMap();

    return () => {
      if (map) map.remove();
      mapInstanceRef.current = null;
    };
  }, [farms, userLat, userLng]);

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div
        ref={mapRef}
        className="w-full h-[580px] rounded-2xl overflow-hidden border border-gray-200 shadow-md"
      />
    </>
  );
}
