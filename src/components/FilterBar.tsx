"use client";

import { Funnel, ArrowCounterClockwise } from "@phosphor-icons/react";
import type { FarmFilters } from "@/hooks/useFarmFilters";

type Props = {
  filters: FarmFilters;
  prefectures: string[];
  allCrops: string[];
  updateFilter: <K extends keyof FarmFilters>(key: K, value: FarmFilters[K]) => void;
  resetFilters: () => void;
};

export default function FilterBar({
  filters,
  prefectures,
  allCrops,
  updateFilter,
  resetFilters,
}: Props) {
  const isAnyFilterActive =
    filters.prefecture !== "" ||
    filters.crop !== "" ||
    filters.hasAvailability;

  const filterContent = (
    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
      {/* Prefecture select */}
      <div className="flex-1 min-w-0">
        <label
          htmlFor="filter-prefecture"
          className="block text-xs font-medium text-gray-500 mb-1 md:sr-only"
        >
          都道府県
        </label>
        <select
          id="filter-prefecture"
          value={filters.prefecture}
          onChange={(e) => updateFilter("prefecture", e.target.value)}
          className="w-full md:w-auto px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F] transition-colors duration-150 cursor-pointer"
        >
          <option value="">すべての都道府県</option>
          {prefectures.map((pref) => (
            <option key={pref} value={pref}>
              {pref}
            </option>
          ))}
        </select>
      </div>

      {/* Crop select */}
      <div className="flex-1 min-w-0">
        <label
          htmlFor="filter-crop"
          className="block text-xs font-medium text-gray-500 mb-1 md:sr-only"
        >
          作物
        </label>
        <select
          id="filter-crop"
          value={filters.crop}
          onChange={(e) => updateFilter("crop", e.target.value)}
          className="w-full md:w-auto px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F] transition-colors duration-150 cursor-pointer"
        >
          <option value="">すべての作物</option>
          {allCrops.map((crop) => (
            <option key={crop} value={crop}>
              {crop}
            </option>
          ))}
        </select>
      </div>

      {/* Availability toggle */}
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <div className="relative">
            <input
              id="filter-availability"
              type="checkbox"
              checked={filters.hasAvailability}
              onChange={(e) => updateFilter("hasAvailability", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 rounded-full bg-gray-200 peer-checked:bg-[#2D6A4F] transition-colors duration-200" />
            <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5" />
          </div>
          <span className="text-sm text-gray-700 font-medium">空きあり</span>
        </label>
      </div>

      {/* Reset button */}
      <button
        type="button"
        onClick={resetFilters}
        disabled={!isAnyFilterActive}
        className={[
          "flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150",
          isAnyFilterActive
            ? "text-[#2D6A4F] hover:bg-[#2D6A4F]/10 cursor-pointer"
            : "text-gray-300 cursor-not-allowed",
        ].join(" ")}
        aria-label="フィルターをリセット"
      >
        <ArrowCounterClockwise size={15} />
        <span className="hidden md:inline">リセット</span>
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop layout */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 px-5 py-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Funnel size={16} weight="fill" className="text-[#2D6A4F]" />
          <span className="text-sm font-semibold text-gray-700">絞り込み</span>
          {isAnyFilterActive && (
            <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#2D6A4F] text-white text-[10px] font-bold">
              {[filters.prefecture, filters.crop, filters.hasAvailability ? "1" : ""].filter(Boolean).length}
            </span>
          )}
        </div>
        {filterContent}
      </div>

      {/* Mobile: accordion with <details> */}
      <details className="md:hidden bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none select-none">
          <div className="flex items-center gap-2">
            <Funnel size={16} weight="fill" className="text-[#2D6A4F]" />
            <span className="text-sm font-semibold text-gray-700">絞り込み</span>
            {isAnyFilterActive && (
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#2D6A4F] text-white text-[10px] font-bold">
                {[filters.prefecture, filters.crop, filters.hasAvailability ? "1" : ""].filter(Boolean).length}
              </span>
            )}
          </div>
          {/* Chevron indicator — CSS trick with group-open */}
          <svg
            className="w-4 h-4 text-gray-400 transition-transform duration-200 group-open:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="px-4 pb-4 pt-1 border-t border-gray-100">
          {filterContent}
        </div>
      </details>
    </>
  );
}
