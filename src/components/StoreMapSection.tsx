"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { MagnifyingGlass, NavigationArrow, X, MapPin } from "@phosphor-icons/react";
import Link from "next/link";
import farmsData from "@/data/farms.json";
import type { Farm } from "@/types";

const StoreMapView = dynamic(
  () => import("./StoreMapView").then((m) => ({ default: m.StoreMapView })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[520px] rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center">
        <span className="text-gray-400 text-sm">マップを読み込み中...</span>
      </div>
    ),
  }
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
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-10">
          <span className="inline-block text-[#C0392B] text-sm font-semibold tracking-widest uppercase mb-3">
            直売所マップ
          </span>
          <h2 className="font-shippori text-3xl md:text-4xl font-bold text-[#2D6A4F] mb-3">
            近くの直売所を探す
          </h2>
          <p className="text-gray-500">
            全国{farms.length}カ所の農家直売所。現地に足を運んで、農家さんと直接話してみましょう。
          </p>
        </div>

        {/* PC layout: left panel + right map */}
        <div className="flex gap-6 items-start">
          {/* ── Left panel ── */}
          <div className="w-80 flex-none flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlass
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="直売所名・農家名で検索"
                className="w-full pl-10 pr-9 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F] transition-colors bg-white shadow-sm"
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

            {/* Locate button */}
            <button
              type="button"
              onClick={handleLocate}
              disabled={locating}
              className={[
                "flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-150",
                userLat
                  ? "bg-[#2D6A4F] text-white border-[#2D6A4F]"
                  : "bg-white text-[#2D6A4F] border-[#2D6A4F] hover:bg-[#2D6A4F]/5",
                locating ? "opacity-60 cursor-not-allowed" : "",
              ].join(" ")}
            >
              <NavigationArrow size={16} weight={userLat ? "fill" : "regular"} />
              {locating ? "位置情報を取得中…" : userLat ? "現在地から表示中" : "現在地から探す"}
            </button>

            {geoError && <p className="text-xs text-red-500 -mt-2">{geoError}</p>}

            {/* Result count */}
            <p className="text-xs text-gray-400 px-1">
              {filtered.length} 件
              {userLat ? " · 近い順" : ""}
            </p>

            {/* Store list */}
            <ul className="flex flex-col gap-2 overflow-y-auto max-h-[420px] pr-1">
              {filtered.map((farm) => {
                const lat = farm.storeLat ?? farm.lat;
                const lng = farm.storeLng ?? farm.lng;
                const dist =
                  userLat && userLng && lat && lng
                    ? haversineKm(userLat, userLng, lat, lng).toFixed(0)
                    : null;
                return (
                  <li key={farm.id}>
                    <Link
                      href={`/for-students/farms/${farm.id}`}
                      className="flex flex-col gap-1 bg-[#F8F4EF] hover:bg-[#eef5ef] rounded-xl px-4 py-3 border border-gray-100 hover:border-[#2D6A4F]/30 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-sm text-gray-900 leading-snug group-hover:text-[#2D6A4F] transition-colors">
                          {farm.name}
                        </span>
                        {dist && (
                          <span className="text-xs text-[#C0392B] font-semibold whitespace-nowrap">
                            約{dist}km
                          </span>
                        )}
                      </div>
                      <div className="flex items-start gap-1 text-xs text-gray-500">
                        <MapPin size={11} className="mt-0.5 flex-none text-gray-400" />
                        <span className="leading-relaxed">{farm.storeAddress ?? farm.location}</span>
                      </div>
                      <p className="text-xs text-[#2D6A4F] font-medium mt-0.5">
                        {farm.crops.join("・")}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Right map ── */}
          <div className="flex-1 min-w-0">
            <StoreMapView farms={filtered} userLat={userLat} userLng={userLng} />
          </div>
        </div>
      </div>
    </section>
  );
}
