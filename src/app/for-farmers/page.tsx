"use client";

import { useState } from "react";
import companiesData from "@/data/companies.json";
import type { Company } from "@/types";
import { useCompanyFilters } from "@/hooks/useCompanyFilters";
import CompanyCard from "@/components/CompanyCard";
import EmptyState from "@/components/EmptyState";

const CATEGORY_ORDER: Company["category"][] = ["AI", "バイオ", "農薬", "IoT", "ドローン", "ロボット"];

export default function ForFarmersPage() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const { filters, filteredCompanies, categories, updateFilter, resetFilters } =
    useCompanyFilters(companiesData as Company[]);

  const orderedCategories = CATEGORY_ORDER.filter((c) => categories.includes(c));

  const handleCloseModal = () => setSelectedCompany(null);

  return (
    <main className="min-h-screen bg-[#F8F4EF]">
      {/* Page header */}
      <div className="bg-[#1B4332] pt-10 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block text-[#74C69D] text-sm font-semibold tracking-wide uppercase mb-2">
            農家の方へ
          </span>
          <h1 className="font-shippori text-3xl md:text-4xl font-bold text-white mb-2">
            AgTech企業を探す
          </h1>
          <p className="text-white/75 text-sm md:text-base">
            農家の課題を解決する最新技術
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Category filter chips */}
        <div className="overflow-x-auto pb-1 -mx-4 px-4">
          <div className="flex items-center gap-2 w-max">
            <button
              type="button"
              onClick={() => updateFilter("category", "")}
              className={[
                "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150",
                filters.category === ""
                  ? "bg-[#2D6A4F] text-white border-[#2D6A4F]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#2D6A4F] hover:text-[#2D6A4F]",
              ].join(" ")}
            >
              すべて
            </button>
            {orderedCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => updateFilter("category", cat)}
                className={[
                  "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150",
                  filters.category === cat
                    ? "bg-[#2D6A4F] text-white border-[#2D6A4F]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#2D6A4F] hover:text-[#2D6A4F]",
                ].join(" ")}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-[#2D6A4F]">{filteredCompanies.length}</span> 社が見つかりました
        </p>

        {/* Company grid */}
        {filteredCompanies.length === 0 ? (
          <EmptyState
            message="条件に合う企業が見つかりませんでした。カテゴリを変えてみてください。"
            onReset={resetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onClick={setSelectedCompany}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedCompany !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selectedCompany.name}
          >
            {/* Modal header */}
            <div className="flex items-start justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-base flex-shrink-0 select-none"
                  style={{ backgroundColor: selectedCompany.logoColor }}
                >
                  {selectedCompany.name.replace(/[株式会社|合同会社|有限会社]/g, "").slice(0, 2)}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 text-lg leading-snug">
                    {selectedCompany.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">{selectedCompany.tagline}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="flex-shrink-0 ml-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors duration-150"
                aria-label="閉じる"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 2l10 10M12 2L2 12" />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6 space-y-5">
              {/* Category + established */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#74C69D]/20 text-[#2D6A4F]">
                  {selectedCompany.category}
                </span>
                <span className="text-sm text-gray-400">
                  設立 {selectedCompany.established}年
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">企業紹介</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{selectedCompany.description}</p>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">提供技術</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCompany.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Target crops */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">対象作物</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCompany.targetCrops.map((crop) => (
                    <span
                      key={crop}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-[#74C69D]/15 text-[#2D6A4F] font-medium"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                        <path d="M6 1C4 1 2.5 2.5 2.5 4.5 2.5 7 6 11 6 11s3.5-4 3.5-6.5C9.5 2.5 8 1 6 1z" opacity="0.7" />
                      </svg>
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="p-6 pt-0">
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-full py-3 rounded-xl border-2 border-[#2D6A4F] text-[#2D6A4F] font-semibold text-sm hover:bg-[#2D6A4F] hover:text-white transition-all duration-200"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
