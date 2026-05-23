"use client";

import { useState } from "react";
import farmsData from "@/data/farms.json";
import type { Farm } from "@/types";
import { useFarmFilters } from "@/hooks/useFarmFilters";
import FarmCard from "@/components/FarmCard";
import FilterBar from "@/components/FilterBar";
import EmptyState from "@/components/EmptyState";
import { MapViewWrapper } from "@/components/MapViewWrapper";

type ViewMode = "grid" | "map";

export default function ForStudentsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const { filters, filteredFarms, prefectures, allCrops, updateFilter, resetFilters } =
    useFarmFilters(farmsData as Farm[]);

  return (
    <main className="min-h-screen bg-[#F8F4EF]">
      {/* Page header */}
      <div className="bg-[#2D6A4F] pt-10 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block text-[#74C69D] text-sm font-semibold tracking-wide uppercase mb-2">
            学生・社会人の方へ
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-shippori text-3xl md:text-4xl font-bold text-white mb-2">
                農家を探す
              </h1>
              <p className="text-white/75 text-sm md:text-base">
                全国{farmsData.length}件の農場から、あなたに合ったシフトを見つけよう
              </p>
            </div>

            {/* View mode toggle */}
            <div className="flex items-center gap-1 bg-white/15 rounded-xl p-1 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={[
                  "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                  viewMode === "grid"
                    ? "bg-white text-[#2D6A4F] shadow-sm"
                    : "text-white/80 hover:text-white",
                ].join(" ")}
                aria-pressed={viewMode === "grid"}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <rect x="1" y="1" width="6" height="6" rx="1" />
                  <rect x="9" y="1" width="6" height="6" rx="1" />
                  <rect x="1" y="9" width="6" height="6" rx="1" />
                  <rect x="9" y="9" width="6" height="6" rx="1" />
                </svg>
                グリッド
              </button>
              <button
                type="button"
                onClick={() => setViewMode("map")}
                className={[
                  "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                  viewMode === "map"
                    ? "bg-white text-[#2D6A4F] shadow-sm"
                    : "text-white/80 hover:text-white",
                ].join(" ")}
                aria-pressed={viewMode === "map"}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.75 4.5 8.5 4.5 8.5S12.5 9.75 12.5 6c0-2.485-2.015-4.5-4.5-4.5z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="8" cy="6" r="1.5" />
                </svg>
                地図
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Filter bar */}
        <FilterBar
          filters={filters}
          prefectures={prefectures}
          allCrops={allCrops}
          updateFilter={updateFilter}
          resetFilters={resetFilters}
        />

        {/* Result count */}
        {viewMode === "grid" && (
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-[#2D6A4F]">{filteredFarms.length}</span> 件の農場が見つかりました
          </p>
        )}

        {/* Content */}
        {viewMode === "grid" ? (
          filteredFarms.length === 0 ? (
            <EmptyState
              message="条件に合う農場が見つかりませんでした。フィルターを変えてみてください。"
              onReset={resetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredFarms.map((farm) => (
                <FarmCard key={farm.id} farm={farm} />
              ))}
            </div>
          )
        ) : (
          <MapViewWrapper farms={filteredFarms} />
        )}
      </div>
    </main>
  );
}
