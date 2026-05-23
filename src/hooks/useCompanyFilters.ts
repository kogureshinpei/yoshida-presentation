import { useMemo, useState } from "react";
import type { Company } from "@/types";

export type CompanyFilters = {
  category: string;
  targetCrop: string;
};

const DEFAULT_FILTERS: CompanyFilters = {
  category: "",
  targetCrop: "",
};

export function useCompanyFilters(companies: Company[]) {
  const [filters, setFilters] = useState<CompanyFilters>(DEFAULT_FILTERS);

  const filteredCompanies = useMemo(() => {
    return companies.filter((co) => {
      if (filters.category && co.category !== filters.category) return false;
      if (
        filters.targetCrop &&
        !co.targetCrops.some((c) => c.includes(filters.targetCrop))
      )
        return false;
      return true;
    });
  }, [companies, filters]);

  const categories = useMemo(
    () => Array.from(new Set(companies.map((c) => c.category))).sort(),
    [companies]
  );

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const updateFilter = <K extends keyof CompanyFilters>(
    key: K,
    value: CompanyFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return {
    filters,
    filteredCompanies,
    categories,
    updateFilter,
    resetFilters,
  };
}
