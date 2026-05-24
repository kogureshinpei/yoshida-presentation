"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { MagnifyingGlass, NavigationArrow, X } from "@phosphor-icons/react";
import farmsData from "@/data/farms.json";
import type { Farm } from "@/types";

const StoreMapView = dynamic(
  () => import("./StoreMapView").then((m) => ({ default: m.StoreMapView })),
  { ssr: false, loading: () => <div className="w-full h-[420px] rounded-xl bg-gray-100 animate-pulse" /> }
);

const farms = farmsData as Farm[];

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function StoreMapSection() {
  const [query, setQuery] = useState("");
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = q
      ? farms.filter(
          (f) =>
            f.name.toLowerCase().includes(q) ||
            (f.storeAddress ?? "").toLowerCase().includes(q) ||
            f.location.toLowerCase().includes(q)
        )
      : [...farms];

    if (userLat !== null && userLng !== null) {
      list = list.sort((a, b) => {
        const aLat = a.storeLat ?? a.lat ?? 0;
        const aLng = a.storeLng ?? a.lng ?? 0;
        const bLat = b.storeLat ?? b.lat ?? 0;
        const bLng = b.storeLng ?? b.lng ?? 0;
        return (
          haversineKm(userLat, userLng, aLat, aLng) -
          haversineKm(userLat, userLng, bLat, bLng)
        );
      });
    }

    return list;
  }, [query, userLat, userLng]);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setGeoError("お使いのブラウザは位置情報に対応していません");
      return;
    }
    setLocating(true);
    setGeoError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLat(pos.coords.latitude);
        setUserLng(pos.coords.longitude);
        setLocating(false);
      },
      () => {
        setGeoError("位置情報の取得に失敗しました");
        setLocating(false);
      }
    );
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block text-[#C0392B] text-sm font-semibold tracking-wide uppercase mb-2">
            直売所マップ
          </span>
          <h2 className="font-shippori text-2xl md:text-3xl font-bold text-[#2D6A4F] mb-2">
            近くの直売所を探す
          </h2>
          <p className="text-gray-500 text-sm">
            全国{farms.length}カ所の農家直売所。現地に足を運んで、農家さんと話してみましょう。
          </p>
        </div>

        {/* Search + locate controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="直売所名・農家名で検索"
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F] transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="検索をクリア"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleLocate}
            disabled={locating}
            className={[
              "flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-150 whitespace-nowrap",
              userLat
                ? "bg-[#2D6A4F] text-white border-[#2D6A4F]"
                : "bg-white text-[#2D6A4F] border-[#2D6A4F] hover:bg-[#2D6A4F]/5",
              locating ? "opacity-60 cursor-not-allowed" : "",
            ].join(" ")}
          >
            <NavigationArrow size={16} weight={userLat ? "fill" : "regular"} />
            {locating ? "取得中…" : userLat ? "現在地から表示中" : "現在地から探す"}
          </button>
        </div>

        {/* Error / result count */}
        <div className="flex items-center gap-3 mb-4 min-h-[20px]">
          {geoError && <p className="text-sm text-red-500">{geoError}</p>}
          <p className="text-sm text-gray-400">
            {filtered.length} 件表示
            {userLat ? " · 近い順" : ""}
          </p>
        </div>

        {/* Map */}
        <StoreMapView farms={filtered} userLat={userLat} userLng={userLng} />

        {/* Store list (nearest first when located) */}
        {filtered.length > 0 && (
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.slice(0, 6).map((farm) => {
              const lat = farm.storeLat ?? farm.lat;
              const lng = farm.storeLng ?? farm.lng;
              const dist =
                userLat && userLng && lat && lng
                  ? haversineKm(userLat, userLng, lat, lng).toFixed(0)
                  : null;
              return (
                <li
                  key={farm.id}
                  className="flex flex-col gap-1 bg-[#F8F4EF] rounded-xl px-4 py-3 border border-gray-100"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-sm text-gray-900 leading-snug">
                      {farm.name}
                    </span>
                    {dist && (
                      <span className="text-xs text-[#C0392B] font-medium whitespace-nowrap">
                        約{dist}km
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {farm.storeAddress ?? farm.location}
                  </p>
                  <p className="text-xs text-[#2D6A4F] mt-0.5">
                    {farm.crops.join("・")}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
