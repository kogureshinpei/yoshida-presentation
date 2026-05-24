"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { NavigationArrow } from "@phosphor-icons/react";
import farmsData from "@/data/farms.json";
import type { Farm } from "@/types";

const StoreMapView = dynamic(
  () => import("@/components/StoreMapView").then((m) => ({ default: m.StoreMapView })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[500px] rounded-2xl bg-[#1a3d2e] animate-pulse flex items-center justify-center">
        <span className="text-white/40 text-sm">マップを読み込み中...</span>
      </div>
    ),
  }
);

const farms = farmsData as Farm[];

export default function TopPage() {
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [locating, setLocating] = useState(false);

  const handleLocate = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLat(pos.coords.latitude);
        setUserLng(pos.coords.longitude);
        setLocating(false);
      },
      () => setLocating(false)
    );
  };

  return (
    <main className="min-h-screen bg-[#1B4332] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-4">
        <div>
          <span className="inline-block text-[#74C69D] text-xs font-semibold tracking-widest uppercase mb-1">
            全国マップ
          </span>
          <h1 className="font-shippori text-2xl md:text-3xl font-bold text-white leading-snug">
            全国直売所マップ
          </h1>
          <p className="text-white/50 text-sm mt-0.5">
            {farms.length}カ所の農家直売所
          </p>
        </div>

        <button
          type="button"
          onClick={handleLocate}
          disabled={locating}
          className={[
            "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-150 whitespace-nowrap flex-none mt-1",
            userLat
              ? "bg-[#74C69D] text-[#1B4332] border-[#74C69D]"
              : "bg-white/10 text-white border-white/20 hover:bg-white/20",
            locating ? "opacity-60 cursor-not-allowed" : "",
          ].join(" ")}
        >
          <NavigationArrow size={15} weight={userLat ? "fill" : "regular"} />
          {locating ? "取得中…" : userLat ? "現在地表示中" : "現在地から探す"}
        </button>
      </div>

      {/* Full-height map */}
      <div className="flex-1 px-4 pb-4 md:px-6 md:pb-6" style={{ minHeight: "calc(100vh - 200px)" }}>
        <StoreMapView
          farms={farms}
          userLat={userLat}
          userLng={userLng}
          containerClass="w-full h-full min-h-[500px] rounded-2xl overflow-hidden shadow-xl"
        />
      </div>
    </main>
  );
}
