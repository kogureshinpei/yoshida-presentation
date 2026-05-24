"use client";

import { useState } from "react";
import Image from "next/image";
import companiesData from "@/data/companies.json";
import jobSeekersData from "@/data/jobSeekers.json";
import type { Company, JobSeeker } from "@/types";
import { useCompanyFilters } from "@/hooks/useCompanyFilters";
import CompanyCard from "@/components/CompanyCard";
import EmptyState from "@/components/EmptyState";
import { MagnifyingGlass, X, MapPin, Briefcase, Plant, ArrowRight } from "@phosphor-icons/react";

type PageTab = "agtech" | "seekers";

const CATEGORY_ORDER: Company["category"][] = ["AI", "バイオ", "農薬", "IoT", "ドローン", "ロボット"];

/* ── Job Seeker card ── */
function SeekerCard({ seeker }: { seeker: JobSeeker }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
        {/* Card header */}
        <div className="p-5 flex items-start gap-4">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-none">
            <Image
              src={seeker.avatar}
              alt={seeker.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="font-bold text-gray-900 text-base">{seeker.name}</p>
              <span className="text-xs text-gray-400 flex-none">{seeker.age}歳</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
              <Briefcase size={11} />
              {seeker.currentJob}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <MapPin size={11} />
              {seeker.currentPrefecture} → <span className="text-[#2D6A4F] font-medium">{seeker.targetPrefecture}</span>
            </p>
          </div>
        </div>

        {/* Crop */}
        <div className="px-5 pb-3 flex items-center gap-1.5">
          <Plant size={13} className="text-[#2D6A4F]" />
          <span className="text-sm font-medium text-[#2D6A4F]">
            {seeker.cropDecided ? seeker.targetCrop : "作物未定（相談したい）"}
          </span>
        </div>

        {/* Tags */}
        <div className="px-5 pb-4 flex flex-wrap gap-1.5">
          {seeker.tags.map((tag) => (
            <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-[#F8F4EF] text-gray-600 border border-gray-100">
              {tag}
            </span>
          ))}
        </div>

        {/* Persona excerpt */}
        <div className="px-5 pb-4">
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{seeker.persona}</p>
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex-1 py-2.5 rounded-xl border border-[#2D6A4F] text-[#2D6A4F] text-sm font-medium hover:bg-[#2D6A4F]/5 transition-colors"
          >
            詳細を見る
          </button>
          <a
            href="/register"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2D6A4F] text-white text-sm font-medium hover:bg-[#1f5038] transition-colors"
          >
            スカウト
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Detail modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-none">
                  <Image src={seeker.avatar} alt={seeker.name} fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-xl">{seeker.name}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{seeker.age}歳 · {seeker.currentJob}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors flex-none ml-4"
                aria-label="閉じる"
              >
                <X size={14} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F8F4EF] rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-500 mb-1">現在地 → 希望地</p>
                  <p className="text-sm font-semibold text-gray-900">{seeker.currentPrefecture} → {seeker.targetPrefecture}</p>
                </div>
                <div className="bg-[#F8F4EF] rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-500 mb-1">育てたい作物</p>
                  <p className="text-sm font-semibold text-[#2D6A4F]">{seeker.cropDecided ? seeker.targetCrop : "未定"}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">人物像・志望理由</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{seeker.persona}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">スキル・強み</h3>
                <div className="flex flex-wrap gap-2">
                  {seeker.skills.map((s) => (
                    <span key={s} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">参加可能日</h3>
                <p className="text-sm text-gray-700">{seeker.availableDays}</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {seeker.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-medium">{tag}</span>
                ))}
              </div>
            </div>

            <div className="p-6 pt-0 flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                閉じる
              </button>
              <a
                href="/register"
                className="flex-1 py-3 rounded-xl bg-[#2D6A4F] text-white text-sm font-semibold text-center hover:bg-[#1f5038] transition-colors"
              >
                スカウトする
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Seeker search/filter bar ── */
function SeekerList() {
  const [query, setQuery] = useState("");
  const [cropFilter, setCropFilter] = useState("");

  const allCrops = Array.from(
    new Set(
      (jobSeekersData as JobSeeker[])
        .filter((s) => s.cropDecided)
        .map((s) => s.targetCrop)
    )
  ).sort();

  const filtered = (jobSeekersData as JobSeeker[]).filter((s) => {
    const q = query.trim().toLowerCase();
    if (q && !s.name.includes(q) && !s.persona.includes(q) && !s.tags.join("").includes(q)) return false;
    if (cropFilter && s.targetCrop !== cropFilter) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Filter row */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <MagnifyingGlass size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="名前・キーワードで検索"
            className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F] bg-white transition-colors"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={13} />
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <div className="flex items-center gap-2 w-max">
            <button
              type="button"
              onClick={() => setCropFilter("")}
              className={["whitespace-nowrap px-3.5 py-2 rounded-full text-xs font-medium border transition-colors", cropFilter === "" ? "bg-[#2D6A4F] text-white border-[#2D6A4F]" : "bg-white text-gray-600 border-gray-200 hover:border-[#2D6A4F]"].join(" ")}
            >
              すべての作物
            </button>
            {allCrops.map((crop) => (
              <button
                key={crop}
                type="button"
                onClick={() => setCropFilter(crop)}
                className={["whitespace-nowrap px-3.5 py-2 rounded-full text-xs font-medium border transition-colors", cropFilter === crop ? "bg-[#2D6A4F] text-white border-[#2D6A4F]" : "bg-white text-gray-600 border-gray-200 hover:border-[#2D6A4F]"].join(" ")}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        <span className="font-semibold text-[#2D6A4F]">{filtered.length}</span> 名の就農希望者が見つかりました
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          条件に合う就農希望者が見つかりませんでした
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s) => (
            <SeekerCard key={s.id} seeker={s} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main page ── */
export default function ForFarmersPage() {
  const [pageTab, setPageTab] = useState<PageTab>("agtech");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const { filters, filteredCompanies, categories, updateFilter, resetFilters } =
    useCompanyFilters(companiesData as Company[]);

  const orderedCategories = CATEGORY_ORDER.filter((c) => categories.includes(c));
  const handleCloseModal = () => setSelectedCompany(null);

  return (
    <main className="min-h-screen bg-[#F8F4EF]">
      {/* Page header */}
      <div className="bg-[#1B4332] pt-10 pb-0 px-4">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block text-[#74C69D] text-sm font-semibold tracking-wide uppercase mb-2">
            農家の方へ
          </span>
          <h1 className="font-shippori text-3xl md:text-4xl font-bold text-white mb-4">
            農家向けダッシュボード
          </h1>

          {/* Page tabs */}
          <div className="flex gap-1 border-b border-white/20">
            {(["agtech", "seekers"] as PageTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setPageTab(tab)}
                className={[
                  "px-6 py-3 text-sm font-semibold rounded-t-lg transition-colors duration-150",
                  pageTab === tab
                    ? "bg-[#F8F4EF] text-[#1B4332]"
                    : "text-white/70 hover:text-white",
                ].join(" ")}
              >
                {tab === "agtech" ? "AgTech企業を探す" : "就農希望者を探す"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* ── AgTech tab ── */}
        {pageTab === "agtech" && (
          <>
            <div className="overflow-x-auto pb-1 -mx-4 px-4">
              <div className="flex items-center gap-2 w-max">
                <button
                  type="button"
                  onClick={() => updateFilter("category", "")}
                  className={["whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150", filters.category === "" ? "bg-[#2D6A4F] text-white border-[#2D6A4F]" : "bg-white text-gray-600 border-gray-200 hover:border-[#2D6A4F] hover:text-[#2D6A4F]"].join(" ")}
                >
                  すべて
                </button>
                {orderedCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => updateFilter("category", cat)}
                    className={["whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150", filters.category === cat ? "bg-[#2D6A4F] text-white border-[#2D6A4F]" : "bg-white text-gray-600 border-gray-200 hover:border-[#2D6A4F] hover:text-[#2D6A4F]"].join(" ")}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-500">
              <span className="font-semibold text-[#2D6A4F]">{filteredCompanies.length}</span> 社が見つかりました
            </p>

            {filteredCompanies.length === 0 ? (
              <EmptyState message="条件に合う企業が見つかりませんでした。カテゴリを変えてみてください。" onReset={resetFilters} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} onClick={setSelectedCompany} />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Seekers tab ── */}
        {pageTab === "seekers" && <SeekerList />}
      </div>

      {/* Company detail modal */}
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
            <div className="flex items-start justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-base flex-shrink-0 select-none"
                  style={{ backgroundColor: selectedCompany.logoColor }}
                >
                  {selectedCompany.name.replace(/[株式会社|合同会社|有限会社]/g, "").slice(0, 2)}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 text-lg leading-snug">{selectedCompany.name}</h2>
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

            <div className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#74C69D]/20 text-[#2D6A4F]">
                  {selectedCompany.category}
                </span>
                <span className="text-sm text-gray-400">設立 {selectedCompany.established}年</span>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">企業紹介</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{selectedCompany.description}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">提供技術</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCompany.technologies.map((tech) => (
                    <span key={tech} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 font-medium">{tech}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">対象作物</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCompany.targetCrops.map((crop) => (
                    <span key={crop} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-[#74C69D]/15 text-[#2D6A4F] font-medium">{crop}</span>
                  ))}
                </div>
              </div>
            </div>

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
