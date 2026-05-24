import Image from "next/image";
import Link from "next/link";
import companiesData from "@/data/companies.json";
import companyDetailsData from "@/data/companyDetails.json";
import type { Company, CompanyDetail } from "@/types";

const companies = companiesData as Company[];
const details = companyDetailsData as CompanyDetail[];

const CATEGORY_COLOR: Record<string, { bg: string; text: string }> = {
  AI:       { bg: "bg-violet-100", text: "text-violet-700" },
  バイオ:   { bg: "bg-emerald-100", text: "text-emerald-700" },
  農薬:     { bg: "bg-amber-100", text: "text-amber-700" },
  IoT:      { bg: "bg-blue-100", text: "text-blue-700" },
  ドローン: { bg: "bg-sky-100", text: "text-sky-700" },
  ロボット: { bg: "bg-orange-100", text: "text-orange-700" },
};

export default function CompaniesPage() {
  return (
    <main className="min-h-screen bg-[#F8F4EF]">
      {/* Header */}
      <div className="bg-[#1B4332] pt-10 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block text-[#74C69D] text-sm font-semibold tracking-widest uppercase mb-2">
            企業一覧
          </span>
          <h1 className="font-shippori text-3xl md:text-4xl font-bold text-white mb-2">
            加盟AgTech企業
          </h1>
          <p className="text-white/70 text-sm md:text-base">
            Go Go ふぁーまーに登録している {companies.length} 社のAgTech企業
          </p>
        </div>
      </div>

      {/* Company table-style list */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[1fr_120px_180px_1fr_160px] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <span>企業名</span>
            <span>カテゴリ</span>
            <span>技術</span>
            <span>対象作物</span>
            <span className="text-right">詳細</span>
          </div>

          {/* Rows */}
          <ul className="divide-y divide-gray-50">
            {companies.map((company) => {
              const detail = details.find((d) => d.id === company.id);
              const catStyle = CATEGORY_COLOR[company.category] ?? { bg: "bg-gray-100", text: "text-gray-600" };

              return (
                <li key={company.id}>
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_120px_180px_1fr_160px] gap-3 md:gap-4 px-6 py-5 hover:bg-[#F8F4EF]/60 transition-colors items-center">
                    {/* Name + tagline */}
                    <div className="flex items-center gap-3">
                      {detail?.heroImage ? (
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-none">
                          <Image
                            src={detail.heroImage}
                            alt={company.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                      ) : (
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-none"
                          style={{ backgroundColor: company.logoColor }}
                        >
                          {company.name.slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900 text-sm leading-snug">{company.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{company.tagline}</p>
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${catStyle.bg} ${catStyle.text}`}>
                        {company.category}
                      </span>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1">
                      {company.technologies.slice(0, 2).map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">{t}</span>
                      ))}
                      {company.technologies.length > 2 && (
                        <span className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-400">+{company.technologies.length - 2}</span>
                      )}
                    </div>

                    {/* Target crops */}
                    <div className="text-sm text-gray-600">
                      {company.targetCrops.join("・")}
                    </div>

                    {/* Action */}
                    <div className="flex justify-end">
                      <Link
                        href={`/for-farmers/companies/${company.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-[#2D6A4F] text-white hover:bg-[#1f5038] transition-colors"
                      >
                        詳細ページ
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M2.5 7h9M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          掲載企業数: {companies.length}社 · 2026年5月現在
        </p>
      </div>
    </main>
  );
}
