"use client";

import { useEffect, useRef } from "react";
import type { Farm } from "@/types";

type Props = {
  farms: Farm[];
};

export function MapView({ farms }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let L: typeof import("leaflet");
    let map: import("leaflet").Map;

    async function initMap() {
      try {
        L = (await import("leaflet")).default;

        // Fix Leaflet default icon paths with Next.js
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        map = L.map(mapRef.current!).setView([36.5, 136.5], 5);
        mapInstanceRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);

        const greenIcon = L.divIcon({
          className: "",
          html: `<div style="
            background:#2D6A4F;color:white;border-radius:50%;
            width:32px;height:32px;display:flex;align-items:center;
            justify-content:center;font-size:14px;box-shadow:0 2px 8px rgba(0,0,0,0.3);
          ">🌾</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        (farms as (Farm & { lat?: number; lng?: number })[]).forEach((farm) => {
          if (!farm.lat || !farm.lng) return;
          const available = farm.shiftSlots.filter(
            (s) => s.filled < s.capacity
          ).length;
          L.marker([farm.lat, farm.lng], { icon: greenIcon })
            .addTo(map)
            .bindPopup(
              `<strong>${farm.name}</strong><br>
               ${farm.prefecture}<br>
               ${farm.crops.join("・")}<br>
               <span style="color:#2D6A4F">今週${available}枠空き</span>`
            );
        });
      } catch {
        // Leaflet failed to load — ErrorBoundary handles the fallback
      }
    }

    initMap();

    return () => {
      if (map) map.remove();
      mapInstanceRef.current = null;
    };
  }, [farms]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div
        ref={mapRef}
        className="w-full h-[480px] rounded-xl overflow-hidden border border-green-100 shadow-sm"
      />
    </>
  );
}
