import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import farmsData from "@/data/farms.json";
import companiesData from "@/data/companies.json";
import trialMatchesData from "@/data/trialMatches.json";
import type { Farm, Company } from "@/types";
import ShiftCalendar from "@/components/ShiftCalendar";

type TrialEntry = { companyId: string; technology: string; status: string; period: string; note: string };
type TrialMatch = { farmId: string; trials: TrialEntry[] };

const STATUS_STYLE: Record<string, { bg: string; text: string }> = {
  "トライアル中": { bg: "bg-amber-100", text: "text-amber-700" },
  "導入完了":     { bg: "bg-green-100",  text: "text-green-700" },
  "検討中":       { bg: "bg-gray-100",   text: "text-gray-600" },
};

type Props = {
  params: { id: string };
};

export function generateStaticParams() {
  return (farmsData as Farm[]).map((farm) => ({ id: farm.id }));
}

const FEATURE_ICONS: Record<string, string> = {
  宿泊施設あり: "🏠",
  交通費支給: "🚃",
  農機具貸出: "🚜",
  食事提供: "🍱",
  未経験歓迎: "👋",
  "週1日から可": "📅",
  有機農業認定: "🌿",
  収穫物お土産: "🎁",
  農業体験証明書発行: "📜",
  田植え体験: "🌾",
  昼食提供: "🍱",
  温泉近隣: "♨️",
  絶景段々畑: "🏔️",
  みかん食べ放題: "🍊",
  観光地近隣: "🗺️",
  摘み取り体験: "🫐",
  "U・Iターン歓迎": "✈️",
  自然環境: "🌲",
  京野菜: "🥬",
  文化体験: "⛩️",
  農業観光: "🎌",
  機械化農業: "⚙️",
  大規模農場: "📐",
  首都圏からアクセス良好: "🚄",
  南国体験: "🌺",
  宿泊施設完備: "🏨",
  マリンスポーツ近隣: "🏄",
  スマート農業: "📱",
  広大な農地: "🌄",
  正規雇用転換実績あり: "💼",
};

export default function FarmDetailPage({ params }: Props) {
  const farm = (farmsData as Farm[]).find((f) => f.id === params.id);

  if (!farm) notFound();

  const farmTrials = ((trialMatchesData as TrialMatch[]).find((m) => m.farmId === farm.id)?.trials) ?? [];

  const availableSlots = farm.shiftSlots.reduce(
    (sum, s) => sum + Math.max(0, s.capacity - s.filled),
    0
  );

  return (
    <main className="min-h-screen bg-[#F8F4EF]">
      {/* Hero image */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        <Image
          src={farm.image}
          alt={farm.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Back link */}
        <Link
          href="/for-students"
          className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/30 transition-colors duration-150"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M9 2L4 7l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          農場一覧に戻る
        </Link>

        {/* Availability badge */}
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
          {availableSlots > 0 ? (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#2D6A4F] text-white text-sm font-semibold shadow-lg">
              今週{availableSlots}枠空き
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-500 text-white text-sm font-semibold shadow-lg">
              今週満席
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Farm details */}
          <div className="flex-1 min-w-0">
            {/* Prefecture badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#74C69D]/20 text-[#2D6A4F] text-xs font-semibold">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                  <path d="M6 1a3.5 3.5 0 00-3.5 3.5C2.5 7.375 6 11 6 11s3.5-3.625 3.5-6.5A3.5 3.5 0 006 1zm0 4.75a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
                </svg>
                {farm.prefecture}
              </span>
              <span className="text-sm text-gray-400">{farm.location}</span>
            </div>

            {/* Farm name */}
            <h1 className="font-shippori text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-snug">
              {farm.name}
            </h1>

            {/* Stats row */}
            <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-1.5">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="#F59E0B" aria-hidden="true">
                  <path d="M9 1.5l2.09 4.23 4.67.68-3.38 3.3.8 4.65L9 11.77l-4.18 2.19.8-4.65L2.24 6.41l4.67-.68L9 1.5z" />
                </svg>
                <span className="text-lg font-bold text-gray-800">{farm.rating.toFixed(1)}</span>
              </div>
              <div className="text-gray-500 text-sm">
                累計受入 <span className="font-semibold text-gray-700">{farm.acceptCount}</span> 名
              </div>
              <div className="text-gray-500 text-sm">
                シフト <span className="font-semibold text-gray-700">{farm.shiftSlots.length}</span> 枠
              </div>
            </div>

            {/* Crop tags */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">作物</h2>
              <div className="flex flex-wrap gap-2">
                {farm.crops.map((crop) => (
                  <span
                    key={crop}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#74C69D]/20 text-[#2D6A4F]"
                  >
                    {crop}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">農場紹介</h2>
              <p className="text-gray-700 leading-relaxed">{farm.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">特徴・設備</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {farm.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-gray-100 text-sm text-gray-700"
                  >
                    <span aria-hidden="true" className="text-base">
                      {FEATURE_ICONS[feature] ?? "✓"}
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* AgTech trials */}
            {farmTrials.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1 h-5 rounded-full bg-[#C0392B] flex-shrink-0" />
                  <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    導入中の AgTech 技術
                  </h2>
                </div>
                <div className="space-y-3">
                  {farmTrials.map((trial) => {
                    const company = (companiesData as Company[]).find((c) => c.id === trial.companyId);
                    if (!company) return null;
                    const style = STATUS_STYLE[trial.status] ?? STATUS_STYLE["検討中"];
                    const initials = company.name.replace(/株式会社|合同会社|有限会社/g, "").slice(0, 2);
                    return (
                      <div key={trial.companyId} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-xs font-bold select-none"
                          style={{ backgroundColor: company.logoColor }}
                        >
                          {initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <span className="text-sm font-semibold text-gray-900 truncate">{company.name}</span>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${style.bg} ${style.text}`}>
                              {trial.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 leading-snug mb-1">{trial.technology}</p>
                          <p className="text-[11px] text-gray-400">{trial.period} — {trial.note}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right: Shift calendar */}
          <div className="lg:w-[380px] xl:w-[420px] flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm lg:sticky lg:top-24">
              <ShiftCalendar shiftSlots={farm.shiftSlots} farmName={farm.name} />

              {/* CTA — desktop */}
              <div className="mt-6 hidden md:block">
                <Link
                  href="/register"
                  className="block w-full text-center py-3.5 rounded-xl bg-[#2D6A4F] text-white font-semibold text-sm hover:bg-[#1f5038] transition-all duration-200 hover:shadow-md"
                >
                  シフトを申し込む
                </Link>
                <p className="text-center text-xs text-gray-400 mt-2">
                  登録無料・3営業日以内に返信
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 px-4 pb-3 pt-2 bg-white/90 backdrop-blur-sm border-t border-gray-200">
        <Link
          href="/register"
          className="block w-full text-center py-3.5 rounded-xl bg-[#2D6A4F] text-white font-semibold text-sm hover:bg-[#1f5038] transition-colors duration-200"
        >
          シフトを申し込む
        </Link>
      </div>
    </main>
  );
}
