import { useMemo, useState } from "react";
import type { Farm } from "@/types";

export type FarmFilters = {
  prefecture: string;
  crop: string;
  hasAvailability: boolean;
};

const DEFAULT_FILTERS: FarmFilters = {
  prefecture: "",
  crop: "",
  hasAvailability: false,
};

export function useFarmFilters(farms: Farm[]) {
  const [filters, setFilters] = useState<FarmFilters>(DEFAULT_FILTERS);

  const filteredFarms = useMemo(() => {
    return farms.filter((farm) => {
      if (filters.prefecture && farm.prefecture !== filters.prefecture) {
        return false;
      }
      if (filters.crop && !farm.crops.includes(filters.crop)) {
        return false;
      }
      if (filters.hasAvailability) {
        const hasOpen = farm.shiftSlots.some((s) => s.filled < s.capacity);
        if (!hasOpen) return false;
      }
      return true;
    });
  }, [farms, filters]);

  const prefectures = useMemo(
    () => Array.from(new Set(farms.map((f) => f.prefecture))).sort(),
    [farms]
  );

  const allCrops = useMemo(
    () => Array.from(new Set(farms.flatMap((f) => f.crops))).sort(),
    [farms]
  );

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const updateFilter = <K extends keyof FarmFilters>(
    key: K,
    value: FarmFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return {
    filters,
    filteredFarms,
    prefectures,
    allCrops,
    updateFilter,
    resetFilters,
  };
}
