"use client";

import Link from "next/link";
import { ArrowRight, Leaf } from "@phosphor-icons/react";
import type { Company } from "@/types";

type Props = {
  company: Company;
  onClick?: (company: Company) => void;
};

const CATEGORY_STYLES: Record<Company["category"], { bg: string; text: string }> = {
  AI: { bg: "bg-blue-100", text: "text-blue-700" },
  バイオ: { bg: "bg-emerald-100", text: "text-emerald-700" },
  農薬: { bg: "bg-yellow-100", text: "text-yellow-700" },
  IoT: { bg: "bg-violet-100", text: "text-violet-700" },
  ドローン: { bg: "bg-sky-100", text: "text-sky-700" },
  ロボット: { bg: "bg-orange-100", text: "text-orange-700" },
};

function getInitials(name: string): string {
  // Take up to 2 chars from name
  return name.replace(/[株式会社|合同会社|有限会社]/g, "").slice(0, 2);
}

export default function CompanyCard({ company, onClick }: Props) {
  const categoryStyle = CATEGORY_STYLES[company.category] ?? {
    bg: "bg-gray-100",
    text: "text-gray-700",
  };

  const visibleTechs = company.technologies.slice(0, 3);
  const extraTechCount = company.technologies.length - 3;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      {/* Top: logo + category */}
      <div className="flex items-start justify-between gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-sm select-none"
          style={{ backgroundColor: company.logoColor }}
          aria-label={company.name}
        >
          {getInitials(company.name)}
        </div>
        <span
          className={[
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold mt-0.5",
            categoryStyle.bg,
            categoryStyle.text,
          ].join(" ")}
        >
          {company.category}
        </span>
      </div>

      {/* Name + tagline */}
      <div>
        <h3 className="font-semibold text-gray-900 text-base leading-snug mb-1">
          {company.name}
        </h3>
        <p className="text-sm text-gray-500">{company.tagline}</p>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
        {company.description}
      </p>

      {/* Technology tags */}
      <div className="flex flex-wrap gap-1.5">
        {visibleTechs.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
          >
            {tech}
          </span>
        ))}
        {extraTechCount > 0 && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-400">
            +{extraTechCount}
          </span>
        )}
      </div>

      {/* Target crops */}
      {company.targetCrops.length > 0 && (
        <div className="flex items-center gap-2">
          <Leaf size={14} weight="fill" className="text-[#74C69D] flex-shrink-0" />
          <span className="text-xs text-gray-500">
            対象作物: {company.targetCrops.join("・")}
          </span>
        </div>
      )}

      {/* CTA buttons */}
      <div className="mt-auto flex gap-2">
        <button
          type="button"
          onClick={() => onClick?.(company)}
          className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-all duration-200"
        >
          概要
        </button>
        <Link
          href={`/for-farmers/companies/${company.id}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#2D6A4F] text-white text-sm font-medium hover:bg-[#1B4332] transition-all duration-200"
        >
          詳細ページ
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
