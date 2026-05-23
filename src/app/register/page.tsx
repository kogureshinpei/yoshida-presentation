"use client";

import { useState } from "react";

type Tab = "student" | "farmer" | "company";

const TABS: { key: Tab; label: string }[] = [
  { key: "student", label: "学生・社会人" },
  { key: "farmer", label: "農家" },
  { key: "company", label: "企業" },
];

const PREFECTURES = [
  "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
  "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
  "新潟県","富山県","石川県","福井県","山梨県","長野県",
  "岐阜県","静岡県","愛知県","三重県",
  "滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県",
  "鳥取県","島根県","岡山県","広島県","山口県",
  "徳島県","香川県","愛媛県","高知県",
  "福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県",
];

function InputField({
  label,
  id,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F] transition-colors duration-150"
      />
    </div>
  );
}

function TextareaField({
  label,
  id,
  placeholder,
  rows = 4,
  required = true,
}: {
  label: string;
  id: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F] transition-colors duration-150 resize-none"
      />
    </div>
  );
}

function SelectField({
  label,
  id,
  options,
  required = true,
}: {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={id}
        name={id}
        required={required}
        defaultValue=""
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F] transition-colors duration-150 cursor-pointer"
      >
        <option value="" disabled>選択してください</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function StudentForm() {
  return (
    <div className="space-y-5">
      <InputField label="名前" id="student-name" placeholder="山田 太郎" />
      <InputField label="メールアドレス" id="student-email" type="email" placeholder="example@email.com" />
      <InputField label="大学・学校名または勤務先" id="student-affiliation" placeholder="〇〇大学 / 〇〇株式会社" />
      <SelectField
        label="希望農業の種類"
        id="student-crop-type"
        options={[
          { value: "vegetable", label: "野菜" },
          { value: "fruit", label: "果樹" },
          { value: "rice", label: "水稲" },
          { value: "other", label: "その他" },
        ]}
      />
      <InputField
        label="参加可能な日"
        id="student-available-days"
        placeholder="例: 毎週土曜日"
      />
      <TextareaField
        label="志望動機"
        id="student-motivation"
        placeholder="農業体験に興味を持った理由や、農業を通じて学びたいことを教えてください。"
        rows={5}
      />
    </div>
  );
}

function FarmerForm() {
  return (
    <div className="space-y-5">
      <InputField label="農家名" id="farmer-name" placeholder="〇〇農園 / 田中農家" />
      <SelectField
        label="都道府県"
        id="farmer-prefecture"
        options={PREFECTURES.map((p) => ({ value: p, label: p }))}
      />
      <InputField label="主な作物" id="farmer-crops" placeholder="例: りんご・ぶどう" />
      <div>
        <label htmlFor="farmer-capacity" className="block text-sm font-medium text-gray-700 mb-1.5">
          一週間に受け入れ可能な人数 <span className="text-red-500">*</span>
        </label>
        <input
          id="farmer-capacity"
          name="farmer-capacity"
          type="number"
          min={1}
          max={100}
          placeholder="例: 5"
          required
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F] transition-colors duration-150"
        />
      </div>
      <TextareaField
        label="シフト希望日時"
        id="farmer-shift"
        placeholder="例: 毎週土日の8:00〜15:00、繁忙期（6月〜9月）は平日も可"
        rows={3}
      />
      <TextareaField
        label="農家の紹介文"
        id="farmer-description"
        placeholder="農場の特徴、作業内容、受け入れ条件などをご記入ください。"
        rows={5}
      />
    </div>
  );
}

function CompanyForm() {
  return (
    <div className="space-y-5">
      <InputField label="会社名" id="company-name" placeholder="〇〇株式会社" />
      <InputField label="担当者名" id="company-contact-name" placeholder="鈴木 一郎" />
      <InputField label="メールアドレス" id="company-email" type="email" placeholder="contact@company.co.jp" />
      <SelectField
        label="技術カテゴリ"
        id="company-category"
        options={[
          { value: "AI", label: "AI" },
          { value: "bio", label: "バイオ" },
          { value: "pesticide", label: "農薬" },
          { value: "iot", label: "IoT" },
          { value: "drone", label: "ドローン" },
          { value: "robot", label: "ロボット" },
        ]}
      />
      <TextareaField
        label="技術の説明"
        id="company-tech-description"
        placeholder="御社の技術・サービスの概要と農業への応用についてご説明ください。"
        rows={5}
      />
      <InputField label="対象作物" id="company-target-crops" placeholder="例: 水稲、野菜全般" />
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-sm p-8 shadow-2xl text-center"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="申し込み完了"
      >
        {/* Checkmark SVG */}
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#74C69D]/20 mx-auto mb-5">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="20" cy="20" r="20" fill="#2D6A4F" />
            <path
              d="M11 21l7 7 11-13"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 className="font-shippori text-xl font-bold text-gray-900 mb-3">
          お申し込みありがとうございます！
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-7">
          担当者より3営業日以内にご連絡いたします。
          しばらくお待ちいただき、ご不明な点がございましたらお気軽にお問い合わせください。
        </p>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#2D6A4F] text-white font-semibold text-sm hover:bg-[#1f5038] transition-colors duration-200"
        >
          閉じる
        </button>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState<Tab>("student");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#F8F4EF]">
      {/* Page header */}
      <div className="bg-[#2D6A4F] pt-10 pb-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-shippori text-3xl md:text-4xl font-bold text-white mb-2">
            参加登録
          </h1>
          <p className="text-white/75 text-sm md:text-base">
            あなたの役割を選んで申し込んでください
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Tab switcher */}
        <div className="bg-white rounded-2xl border border-gray-100 p-1.5 flex gap-1 mb-6 shadow-sm">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={[
                "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150",
                activeTab === tab.key
                  ? "bg-[#2D6A4F] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700",
              ].join(" ")}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h2 className="font-semibold text-gray-900 text-lg">
                {activeTab === "student" && "学生・社会人の方の登録"}
                {activeTab === "farmer" && "農家の方の登録"}
                {activeTab === "company" && "企業の方の登録"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                <span className="text-red-500">*</span> は必須項目です
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {activeTab === "student" && <StudentForm />}
              {activeTab === "farmer" && <FarmerForm />}
              {activeTab === "company" && <CompanyForm />}

              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#2D6A4F] text-white font-bold text-base hover:bg-[#1f5038] transition-all duration-200 hover:shadow-lg active:scale-[0.99]"
                >
                  申し込む
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  送信後、3営業日以内に担当者よりご連絡いたします
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success modal */}
      {submitted && <SuccessModal onClose={() => setSubmitted(false)} />}
    </main>
  );
}
