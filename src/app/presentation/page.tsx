"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  ChartBar,
  Buildings,
  CheckCircle,
  Circle,
  ArrowRight,
  ArrowLeft,
  Plant,
  CalendarCheck,
  UserCircle,
  Confetti,
} from "@phosphor-icons/react";
import farmsData from "@/data/farms.json";
import companiesData from "@/data/companies.json";
import trialMatchesData from "@/data/trialMatches.json";
import type { Farm, Company } from "@/types";

/* ─────────────────────────────── types ─────────────────────────────── */
type TrialEntry = { companyId: string; technology: string; status: string; period: string; note: string };
type TrialMatch = { farmId: string; trials: TrialEntry[] };

/* ─────────────────────────────── constants ─────────────────────────── */
const DEMO_SHIFTS = [
  { id: 0, label: "6/1（月）08:00〜15:00", remaining: 3, total: 5 },
  { id: 1, label: "6/3（水）08:00〜15:00", remaining: 2, total: 5 },
  { id: 2, label: "6/5（金）08:00〜15:00", remaining: 4, total: 4 },
  { id: 3, label: "6/7（土）08:00〜15:00", remaining: 1, total: 5 },
];

const MOCK_NAMES = [
  "田中 優花（東農大 3年）", "鈴木 蓮（酪農大 2年）", "山田 陸（帯広畜産大 1年）",
  "伊藤 颯（東北大 3年）", "高橋 美咲（北大 4年）", "渡辺 葵（農工大 2年）",
  "小林 悠（千葉大 3年）", "加藤 蒼（農大 2年）", "中村 結（明大 3年）",
  "山口 陽向（法大 2年）", "斎藤 樹（早大 4年）", "青木 莉子（上智大 2年）",
  "松田 大河（東大 1年）", "佐々木 萌（女子栄養大 3年）", "井上 晴人（農工大 4年）",
];

const STATUS_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  "トライアル中": { bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-200" },
  "導入完了":     { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200" },
  "検討中":       { bg: "bg-gray-50",   text: "text-gray-600",   border: "border-gray-200" },
};

function getMockStudents(filled: number, seed: number): string[] {
  return Array.from({ length: filled }, (_, i) => MOCK_NAMES[(seed * 3 + i) % MOCK_NAMES.length]);
}

/* ═══════════════════════════════════════════════════════════════════════
   TAB 1: 学生シフト登録フロー
══════════════════════════════════════════════════════════════════════ */
function StudentFlow() {
  const [step, setStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const STEPS = ["農場を選ぶ", "シフトを選ぶ", "内容を確認", "申込み完了"];

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-0">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const done = n < step;
          const active = n === step;
          return (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={[
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                    done   ? "bg-[#C0392B] text-white" :
                    active ? "bg-[#2D6A4F] text-white ring-4 ring-[#2D6A4F]/20" :
                             "bg-gray-200 text-gray-400",
                  ].join(" ")}
                >
                  {done ? <CheckCircle size={16} weight="fill" /> : n}
                </div>
                <span className={`text-[10px] font-medium ${active ? "text-[#2D6A4F]" : "text-gray-400"}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 w-10 sm:w-16 mb-4 mx-1 transition-colors duration-300 ${n < step ? "bg-[#C0392B]" : "bg-gray-200"}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {step === 1 && (
          <div className="p-6">
            <h3 className="font-shippori text-lg font-bold text-gray-900 mb-1">農場を選ぶ</h3>
            <p className="text-sm text-gray-500 mb-5">条件に合う農場を探してシフトに申し込みましょう</p>
            {/* Demo farm card */}
            <div className="border-2 border-[#2D6A4F] rounded-xl overflow-hidden mb-4">
              <div className="h-32 bg-gradient-to-br from-[#1B4332] to-[#52B788] relative flex items-end p-4">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 text-white text-xs font-medium mb-1">北海道</span>
                  <h4 className="font-bold text-white text-base">田中農園</h4>
                </div>
                <span className="absolute top-3 right-3 px-2 py-1 bg-[#2D6A4F] text-white text-xs font-bold rounded-full">今週3枠空き</span>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-1 mb-3">
                  {["りんご", "ぶどう"].map(c => (
                    <span key={c} className="px-2 py-0.5 rounded-full text-xs bg-[#74C69D]/20 text-[#2D6A4F] font-medium">{c}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">⭐ 4.8 · 累計58名受入</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    <CheckCircle size={12} weight="fill" /> 選択中
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center">※デモ用に田中農園を選択済みの状態で表示しています</p>
          </div>
        )}

        {step === 2 && (
          <div className="p-6">
            <h3 className="font-shippori text-lg font-bold text-gray-900 mb-1">シフトを選ぶ</h3>
            <p className="text-sm text-gray-500 mb-5">田中農園 — 希望する日程をタップしてください</p>
            <div className="space-y-3">
              {DEMO_SHIFTS.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedSlot(slot.id)}
                  className={[
                    "w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all duration-150",
                    selectedSlot === slot.id
                      ? "border-[#2D6A4F] bg-[#2D6A4F]/5"
                      : "border-gray-200 hover:border-[#74C69D]",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <CalendarCheck
                      size={20}
                      weight={selectedSlot === slot.id ? "fill" : "regular"}
                      className={selectedSlot === slot.id ? "text-[#2D6A4F]" : "text-gray-400"}
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{slot.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        残 <span className={`font-bold ${slot.remaining <= 1 ? "text-[#C0392B]" : "text-[#2D6A4F]"}`}>{slot.remaining}</span>/{slot.total} 枠
                      </p>
                    </div>
                  </div>
                  {selectedSlot === slot.id && (
                    <CheckCircle size={20} weight="fill" className="text-[#2D6A4F] flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-6">
            <h3 className="font-shippori text-lg font-bold text-gray-900 mb-1">申し込み内容を確認</h3>
            <p className="text-sm text-gray-500 mb-5">以下の内容で申し込みます</p>
            <div className="space-y-3">
              {[
                { label: "農場", value: "田中農園（北海道）" },
                { label: "シフト日時", value: selectedSlot !== null ? DEMO_SHIFTS[selectedSlot].label : "6/1（月）08:00〜15:00" },
                { label: "作業内容", value: "りんご摘果・袋かけ作業" },
                { label: "氏名", value: "山本 花子" },
                { label: "大学・学年", value: "東京農業大学 農学部 3年" },
                { label: "一言メモ", value: "農業は未経験ですが体力には自信があります！" },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3 py-3 border-b border-gray-100 last:border-none">
                  <span className="text-xs font-semibold text-gray-400 w-24 flex-shrink-0 pt-0.5">{label}</span>
                  <span className="text-sm text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="p-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center mb-4">
              <Confetti size={40} weight="fill" className="text-[#2D6A4F]" />
            </div>
            <h3 className="font-shippori text-xl font-bold text-gray-900 mb-2">申し込み完了！</h3>
            <p className="text-sm text-gray-500 mb-1">田中農園からの返信をお待ちください</p>
            <p className="text-xs text-gray-400 mb-6">通常3営業日以内にメールでご連絡します</p>
            <div className="bg-[#F8F4EF] rounded-xl p-4 w-full text-left text-sm text-gray-700 space-y-1">
              <p>📅 <span className="font-medium">シフト日時:</span> 6/1（月）08:00〜15:00</p>
              <p>📍 <span className="font-medium">農場:</span> 田中農園（北海道）</p>
              <p>🌾 <span className="font-medium">作業:</span> りんご摘果・袋かけ作業</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => { setStep(Math.max(1, step - 1)); }}
          disabled={step === 1}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium disabled:opacity-30 hover:border-gray-300 transition-all"
        >
          <ArrowLeft size={15} /> 前へ
        </button>
        {step < 4 ? (
          <button
            type="button"
            onClick={() => { if (step === 2 && selectedSlot === null) setSelectedSlot(0); setStep(Math.min(4, step + 1)); }}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#2D6A4F] text-white text-sm font-semibold hover:bg-[#1B4332] transition-all"
          >
            {step === 3 ? "申し込む" : "次へ"} <ArrowRight size={15} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => { setStep(1); setSelectedSlot(null); }}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border-2 border-[#C0392B] text-[#C0392B] text-sm font-semibold hover:bg-[#C0392B]/5 transition-all"
          >
            最初から
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   TAB 2: 農家ダッシュボード
══════════════════════════════════════════════════════════════════════ */
function FarmDashboard() {
  const farms = farmsData as Farm[];
  const [farmId, setFarmId] = useState(farms[0].id);
  const farm = farms.find((f) => f.id === farmId) ?? farms[0];

  const totalCapacity = farm.shiftSlots.reduce((s, sl) => s + sl.capacity, 0);
  const totalFilled   = farm.shiftSlots.reduce((s, sl) => s + sl.filled, 0);
  const totalEmpty    = totalCapacity - totalFilled;
  const fillRate      = totalCapacity > 0 ? Math.round((totalFilled / totalCapacity) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Farm selector */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-semibold text-gray-600 whitespace-nowrap">農場を選択:</label>
        <select
          value={farmId}
          onChange={(e) => setFarmId(e.target.value)}
          className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#2D6A4F]"
        >
          {farms.map((f) => (
            <option key={f.id} value={f.id}>{f.name}（{f.prefecture}）</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "今週の登録学生", value: `${totalFilled}名`, color: "text-[#2D6A4F]" },
          { label: "空き枠数",       value: `${totalEmpty}枠`,  color: totalEmpty === 0 ? "text-[#C0392B]" : "text-amber-600" },
          { label: "シフト数",       value: `${farm.shiftSlots.length}枠`, color: "text-gray-700" },
          { label: "充填率",         value: `${fillRate}%`,     color: fillRate >= 80 ? "text-[#2D6A4F]" : "text-amber-600" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
            <div className={`text-2xl font-bold ${color} leading-none mb-1`}>{value}</div>
            <div className="text-xs text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Fill rate bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>今週の充填状況</span>
          <span>{totalFilled}/{totalCapacity} 名</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${fillRate}%`,
              backgroundColor: fillRate >= 80 ? "#2D6A4F" : fillRate >= 50 ? "#52B788" : "#C0392B",
            }}
          />
        </div>
      </div>

      {/* Shift table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-[#C0392B]" />
          <h3 className="text-sm font-semibold text-gray-700">シフト別 登録状況</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {farm.shiftSlots.map((slot, i) => {
            const students = getMockStudents(slot.filled, i);
            const empty = slot.capacity - slot.filled;
            const full = slot.filled >= slot.capacity;
            return (
              <div key={i} className="px-5 py-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 mr-2">
                      {slot.dayOfWeek} {slot.date}
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      {slot.startTime}〜{slot.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${full ? "bg-gray-100 text-gray-500" : "bg-[#2D6A4F]/10 text-[#2D6A4F]"}`}>
                      {slot.filled}/{slot.capacity}名
                    </span>
                    {!full && (
                      <span className="text-[10px] text-[#C0392B] font-semibold">残{empty}枠</span>
                    )}
                    {full && (
                      <span className="text-[10px] text-gray-400 font-semibold">満席</span>
                    )}
                  </div>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(slot.filled / slot.capacity) * 100}%`,
                      backgroundColor: full ? "#52B788" : "#2D6A4F",
                    }}
                  />
                </div>
                {/* Student chips */}
                {students.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {students.map((name, j) => (
                      <span key={j} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F8F4EF] text-[11px] text-gray-600 border border-gray-200">
                        <UserCircle size={11} weight="fill" className="text-[#52B788]" />
                        {name}
                      </span>
                    ))}
                  </div>
                )}
                {slot.filled === 0 && (
                  <p className="text-xs text-gray-400 italic">登録者なし — 募集中</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   TAB 3: 企業トライアル状況
══════════════════════════════════════════════════════════════════════ */
function CompanyTrials() {
  const farms = farmsData as Farm[];
  const [farmId, setFarmId] = useState(farms[0].id);
  const farm = farms.find((f) => f.id === farmId) ?? farms[0];

  const match = (trialMatchesData as TrialMatch[]).find((m) => m.farmId === farmId);
  const trials = match?.trials ?? [];

  const countByStatus = {
    "トライアル中": trials.filter((t) => t.status === "トライアル中").length,
    "導入完了":     trials.filter((t) => t.status === "導入完了").length,
    "検討中":       trials.filter((t) => t.status === "検討中").length,
  };

  return (
    <div className="space-y-6">
      {/* Farm selector */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-semibold text-gray-600 whitespace-nowrap">農場を選択:</label>
        <select
          value={farmId}
          onChange={(e) => setFarmId(e.target.value)}
          className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#2D6A4F]"
        >
          {farms.map((f) => (
            <option key={f.id} value={f.id}>{f.name}（{f.prefecture}）</option>
          ))}
        </select>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-2">
        {trials.length === 0 ? (
          <span className="text-sm text-gray-400">この農場のトライアルデータはありません</span>
        ) : (
          <>
            <span className="text-sm text-gray-600 font-medium">{farm.name} では計 <strong>{trials.length}社</strong> が技術連携中:</span>
            {Object.entries(countByStatus).filter(([, v]) => v > 0).map(([status, count]) => {
              const s = STATUS_STYLE[status];
              return (
                <span key={status} className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.bg} ${s.text} ${s.border}`}>
                  {status} {count}社
                </span>
              );
            })}
          </>
        )}
      </div>

      {/* Trial cards */}
      <div className="space-y-4">
        {trials.map((trial) => {
          const company = (companiesData as Company[]).find((c) => c.id === trial.companyId);
          if (!company) return null;
          const s = STATUS_STYLE[trial.status] ?? STATUS_STYLE["検討中"];
          const initials = company.name.replace(/株式会社|合同会社|有限会社/g, "").slice(0, 2);
          return (
            <div key={trial.companyId} className={`bg-white rounded-2xl border ${s.border} shadow-sm overflow-hidden`}>
              {/* Card header */}
              <div className={`px-5 py-3 flex items-center justify-between ${s.bg}`}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold select-none flex-shrink-0"
                    style={{ backgroundColor: company.logoColor }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${s.text}`}>{company.name}</p>
                    <p className="text-xs text-gray-500">{company.category} · 設立{company.established}年</p>
                  </div>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${s.bg} ${s.text} ${s.border}`}>
                  {trial.status}
                </span>
              </div>
              {/* Card body */}
              <div className="px-5 py-4 space-y-2">
                <div className="flex items-start gap-2">
                  <Plant size={14} className="text-[#52B788] flex-shrink-0 mt-0.5" weight="fill" />
                  <p className="text-sm font-semibold text-gray-800">{trial.technology}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed pl-5">{trial.note}</p>
                <p className="text-[11px] text-gray-400 pl-5">📅 {trial.period}</p>
              </div>
              {/* Link to company */}
              <div className="px-5 pb-4">
                <Link
                  href={`/for-farmers/companies/${company.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#2D6A4F] hover:underline"
                >
                  企業詳細ページを見る <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          );
        })}

        {trials.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
            <Buildings size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400">この農場はまだ企業トライアルが登録されていません</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════ */
type Tab = "student" | "dashboard" | "trial";

const TABS: { id: Tab; label: string; sub: string; Icon: typeof GraduationCap }[] = [
  { id: "student",   label: "学生シフト登録フロー", sub: "実際の申込体験を確認",   Icon: GraduationCap },
  { id: "dashboard", label: "農家ダッシュボード",   sub: "シフト管理・空き状況",   Icon: ChartBar },
  { id: "trial",     label: "企業トライアル状況",   sub: "マッチング・導入技術一覧", Icon: Buildings },
];

export default function PresentationPage() {
  const [tab, setTab] = useState<Tab>("student");

  return (
    <main className="min-h-screen bg-[#F8F4EF]">
      {/* Page header */}
      <div className="bg-[#1B4332] pt-10 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C0392B]/80 text-white text-xs font-bold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            発表用デモ
          </div>
          <h1 className="font-shippori text-3xl font-bold text-white mb-2">プロダクト体験デモ</h1>
          <p className="text-white/70 text-sm">学生・農家・企業それぞれの体験フローをインタラクティブに確認できます</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-4">
        {/* Tab selector */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {TABS.map(({ id, label, sub, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={[
                "rounded-2xl p-3 md:p-4 text-left transition-all duration-200 border-2",
                tab === id
                  ? "bg-white border-[#C0392B] shadow-md"
                  : "bg-white/60 border-transparent hover:bg-white hover:border-gray-200",
              ].join(" ")}
            >
              <Icon
                size={20}
                weight={tab === id ? "fill" : "regular"}
                className={tab === id ? "text-[#C0392B] mb-1" : "text-gray-400 mb-1"}
              />
              <p className={`text-xs font-bold leading-snug ${tab === id ? "text-gray-900" : "text-gray-500"}`}>
                {label}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5 hidden sm:block">{sub}</p>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="pb-24">
          {tab === "student"   && <StudentFlow />}
          {tab === "dashboard" && <FarmDashboard />}
          {tab === "trial"     && <CompanyTrials />}
        </div>
      </div>
    </main>
  );
}
