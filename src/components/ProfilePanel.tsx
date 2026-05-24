"use client";

import { useState } from "react";
import { X, ArrowLeft, PaperPlaneTilt, CaretRight } from "@phosphor-icons/react";

export type PanelType = "farmer" | "student";

type Message = { from: "me" | "other"; text: string; time: string };
type Thread = {
  id: string;
  partnerName: string;
  partnerSub: string;
  lastMessage: string;
  lastTime: string;
  messages: Message[];
};

/* ── Mock thread data ── */
const FARMER_COMPANY_THREADS: Thread[] = [
  {
    id: "fc1",
    partnerName: "スマート農業AI株式会社",
    partnerSub: "AI · センサー",
    lastMessage: "来週の設置日程についてご相談させてください",
    lastTime: "10:45",
    messages: [
      { from: "other", text: "先日はご連絡いただきありがとうございます。弊社のAIセンサーシステムをご圃場でぜひ試していただければと思います。", time: "昨日 13:15" },
      { from: "me", text: "資料を拝見しました。精度面でどのくらいの実績がありますか？", time: "昨日 14:30" },
      { from: "other", text: "昨年の試験導入では収穫量が平均18%向上しました。詳細なデータをお送りします。", time: "昨日 16:00" },
      { from: "me", text: "ありがとうございます。一度圃場を見ていただけますか。来月の第2週であれば空いています。", time: "昨日 16:45" },
      { from: "other", text: "来週の設置日程についてご相談させてください", time: "10:45" },
    ],
  },
  {
    id: "fc2",
    partnerName: "グリーンバイオテック株式会社",
    partnerSub: "バイオ · 土壌分析",
    lastMessage: "土壌分析の結果レポートをお送りしました",
    lastTime: "昨日",
    messages: [
      { from: "other", text: "先日の土壌サンプリングのご協力ありがとうございました。分析が完了しましたのでご報告します。", time: "昨日 9:00" },
      { from: "other", text: "土壌分析の結果レポートをお送りしました", time: "昨日 9:05" },
      { from: "me", text: "ありがとうございます。確認します。窒素含有量が低いとのことでしたが、改善策はありますか？", time: "昨日 11:20" },
    ],
  },
  {
    id: "fc3",
    partnerName: "ドローンアグリ株式会社",
    partnerSub: "ドローン · 農薬散布",
    lastMessage: "次回散布の予定を確認させてください",
    lastTime: "月曜日",
    messages: [
      { from: "other", text: "先週の農薬散布は計画通り完了しました。ご確認いただけましたか？", time: "月曜日 8:30" },
      { from: "me", text: "はい、均一に散布されていて助かりました。次の散布はいつ頃になりますか？", time: "月曜日 10:00" },
      { from: "other", text: "次回散布の予定を確認させてください", time: "月曜日 10:15" },
    ],
  },
];

const FARMER_STUDENT_THREADS: Thread[] = [
  {
    id: "fs1",
    partnerName: "山田 太郎",
    partnerSub: "24歳 · 東京 → 北海道希望",
    lastMessage: "来週土曜日にお邪魔してもよいでしょうか",
    lastTime: "11:20",
    messages: [
      { from: "other", text: "はじめまして。農業体験に興味があり、こちらの農園でぜひ学ばせていただきたいです。", time: "昨日 20:00" },
      { from: "me", text: "メッセージありがとうございます。どのような農業をしたいですか？", time: "昨日 21:30" },
      { from: "other", text: "野菜全般に興味があります。特にトマトの栽培技術を学びたいです。", time: "昨日 22:00" },
      { from: "me", text: "それなら一度見学に来てみませんか？まず圃場の雰囲気を確認してください。", time: "昨日 22:30" },
      { from: "other", text: "来週土曜日にお邪魔してもよいでしょうか", time: "11:20" },
    ],
  },
  {
    id: "fs2",
    partnerName: "鈴木 花子",
    partnerSub: "22歳 · 大阪 → 長野希望",
    lastMessage: "水稲の作付けについて詳しく教えていただけますか",
    lastTime: "昨日",
    messages: [
      { from: "other", text: "先日のスカウトメッセージありがとうございました！ぜひ学ばせてください。", time: "昨日 15:00" },
      { from: "me", text: "こちらこそ、ぜひ一緒に農業をやりましょう！今年の水稲作付けに参加できますよ。", time: "昨日 16:00" },
      { from: "other", text: "水稲の作付けについて詳しく教えていただけますか", time: "昨日 16:30" },
    ],
  },
  {
    id: "fs3",
    partnerName: "佐々木 健",
    partnerSub: "26歳 · 東京 → 山形希望",
    lastMessage: "先週はありがとうございました！とても勉強になりました",
    lastTime: "月曜日",
    messages: [
      { from: "other", text: "先週はありがとうございました！とても勉強になりました", time: "月曜日 19:00" },
      { from: "me", text: "お疲れ様でした。来週も来ますか？", time: "月曜日 20:00" },
      { from: "other", text: "はい、ぜひまたお願いします！", time: "月曜日 20:15" },
    ],
  },
];

const STUDENT_THREADS: Thread[] = [
  {
    id: "st1",
    partnerName: "田中農園",
    partnerSub: "北海道 · トマト・じゃがいも",
    lastMessage: "来週のシフトの件でご連絡しました",
    lastTime: "12:05",
    messages: [
      { from: "me", text: "こちらの農園でぜひ働いてみたいです。見学させていただくことは可能でしょうか？", time: "昨日 18:00" },
      { from: "other", text: "メッセージありがとうございます！ぜひ来てください。いつが都合よいですか？", time: "昨日 19:30" },
      { from: "me", text: "来週末であれば空いています。土曜日はいかがでしょうか？", time: "昨日 20:00" },
      { from: "other", text: "来週のシフトの件でご連絡しました", time: "12:05" },
    ],
  },
  {
    id: "st2",
    partnerName: "高橋りんご園",
    partnerSub: "長野県 · りんご・なし",
    lastMessage: "見学を歓迎します！来週末いかがですか",
    lastTime: "昨日",
    messages: [
      { from: "me", text: "りんごの栽培に興味があります。長野に行く予定があるのでぜひ立ち寄らせてください。", time: "2日前 15:00" },
      { from: "other", text: "見学を歓迎します！来週末いかがですか", time: "昨日 9:00" },
    ],
  },
  {
    id: "st3",
    partnerName: "吉田ぶどう農場",
    partnerSub: "山梨県 · ぶどう・もも",
    lastMessage: "動きやすい服装と長靴があれば完璧です",
    lastTime: "月曜日",
    messages: [
      { from: "other", text: "先日のご連絡ありがとうございました。体験日程が決まりました。", time: "月曜日 10:00" },
      { from: "me", text: "ありがとうございます！楽しみにしています。何か持参するものはありますか？", time: "月曜日 11:00" },
      { from: "other", text: "動きやすい服装と長靴があれば完璧です", time: "月曜日 11:30" },
    ],
  },
];

/* ── Thread list ── */
function ThreadList({
  threads,
  onSelect,
}: {
  threads: Thread[];
  onSelect: (t: Thread) => void;
}) {
  return (
    <ul className="flex flex-col divide-y divide-gray-50">
      {threads.map((t) => (
        <li key={t.id}>
          <button
            type="button"
            onClick={() => onSelect(t)}
            className="w-full text-left flex items-start gap-3 px-4 py-3.5 hover:bg-[#F8F4EF] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center flex-none text-[#2D6A4F] font-bold text-sm">
              {t.partnerName.slice(0, 1)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-semibold text-gray-900 text-sm truncate">{t.partnerName}</span>
                <span className="text-[10px] text-gray-400 flex-none">{t.lastTime}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{t.partnerSub}</p>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{t.lastMessage}</p>
            </div>
            <CaretRight size={14} className="text-gray-300 flex-none mt-1" />
          </button>
        </li>
      ))}
    </ul>
  );
}

/* ── Chat thread view ── */
function ChatThread({
  thread,
  onBack,
}: {
  thread: Thread;
  onBack: () => void;
}) {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col h-full">
      {/* Thread header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 flex-none">
        <button
          type="button"
          onClick={onBack}
          className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors flex-none"
          aria-label="戻る"
        >
          <ArrowLeft size={13} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">{thread.partnerName}</p>
          <p className="text-[11px] text-gray-400 truncate">{thread.partnerSub}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {thread.messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={[
                "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                msg.from === "me"
                  ? "bg-[#2D6A4F] text-white rounded-br-sm"
                  : "bg-gray-100 text-gray-800 rounded-bl-sm",
              ].join(" ")}
            >
              <p>{msg.text}</p>
              <p className={`text-[10px] mt-1 ${msg.from === "me" ? "text-white/60" : "text-gray-400"}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-end gap-2 px-4 py-3 border-t border-gray-100 flex-none">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="メッセージを入力..."
          rows={1}
          className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F] resize-none transition-colors"
          style={{ maxHeight: "80px" }}
        />
        <button
          type="button"
          disabled={!input.trim()}
          className="w-9 h-9 rounded-xl bg-[#2D6A4F] text-white flex items-center justify-center hover:bg-[#1f5038] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-none"
          aria-label="送信"
        >
          <PaperPlaneTilt size={16} weight="fill" />
        </button>
      </div>
    </div>
  );
}

/* ── Messages pane ── */
function MessagesPane({ type }: { type: PanelType }) {
  const [subTab, setSubTab] = useState<"company" | "student">("company");
  const [activeThread, setActiveThread] = useState<Thread | null>(null);

  const threads =
    type === "farmer"
      ? subTab === "company"
        ? FARMER_COMPANY_THREADS
        : FARMER_STUDENT_THREADS
      : STUDENT_THREADS;

  if (activeThread) {
    return (
      <ChatThread thread={activeThread} onBack={() => setActiveThread(null)} />
    );
  }

  return (
    <div className="flex flex-col h-full">
      {type === "farmer" && (
        <div className="flex gap-1 px-4 pt-3 pb-2 border-b border-gray-100 flex-none">
          <button
            type="button"
            onClick={() => setSubTab("company")}
            className={[
              "flex-1 py-2 rounded-lg text-xs font-semibold transition-colors",
              subTab === "company"
                ? "bg-[#2D6A4F] text-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
            ].join(" ")}
          >
            企業とのやり取り
          </button>
          <button
            type="button"
            onClick={() => setSubTab("student")}
            className={[
              "flex-1 py-2 rounded-lg text-xs font-semibold transition-colors",
              subTab === "student"
                ? "bg-[#2D6A4F] text-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
            ].join(" ")}
          >
            学生とのやり取り
          </button>
        </div>
      )}

      {type === "student" && (
        <div className="px-4 pt-3 pb-2 border-b border-gray-100 flex-none">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            農家とのやり取り
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <ThreadList threads={threads} onSelect={setActiveThread} />
      </div>
    </div>
  );
}

/* ── Profile pane ── */
function ProfilePane({ type }: { type: PanelType }) {
  return (
    <div className="px-4 py-4 space-y-4 overflow-y-auto">
      {type === "farmer" ? (
        <>
          <Field label="農家名・農園名" defaultValue="田中農園" />
          <Field label="都道府県" defaultValue="北海道" />
          <Field label="主な作物" defaultValue="トマト・じゃがいも・とうもろこし" />
          <TextareaFieldInner
            label="農業哲学・後継者に伝えたいこと"
            defaultValue="40年間、化学農薬に頼らない農業を続けてきました。土を育てれば、作物は自然と育つ。この信念を次の世代に伝えたいと思っています。"
          />
          <Field label="受け入れ可能人数（週）" defaultValue="3名まで" />
        </>
      ) : (
        <>
          <Field label="お名前" defaultValue="山田 太郎" />
          <Field label="現在地" defaultValue="東京都" />
          <Field label="希望就農地域" defaultValue="北海道・東北" />
          <Field label="育てたい作物" defaultValue="トマト・葉野菜" />
          <TextareaFieldInner
            label="自己紹介・農業への想い"
            defaultValue="大学で農学を専攻し、いつか自分の農場を持つことが夢です。現場で実際に土に触れながら農業の技術と哲学を学びたいと思っています。"
          />
        </>
      )}

      <button
        type="button"
        className="w-full py-3 rounded-xl bg-[#2D6A4F] text-white font-semibold text-sm hover:bg-[#1f5038] transition-colors mt-2"
      >
        変更を保存する
      </button>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F] transition-colors"
      />
    </div>
  );
}

function TextareaFieldInner({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <textarea
        defaultValue={defaultValue}
        rows={4}
        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F] resize-none transition-colors"
      />
    </div>
  );
}

/* ── Main panel ── */
type Props = {
  type: PanelType;
  onClose: () => void;
};

type MainTab = "profile" | "messages";

export function ProfilePanel({ type, onClose }: Props) {
  const [tab, setTab] = useState<MainTab>("messages");

  const title = type === "farmer" ? "農家プロフィール" : "就農希望者プロフィール";
  const accentColor = type === "farmer" ? "bg-[#1B4332]" : "bg-[#2D6A4F]";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[420px] bg-white shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* Header */}
        <div className={`${accentColor} flex items-center justify-between px-5 py-4 flex-none`}>
          <h2 className="font-bold text-white text-base">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="閉じる"
          >
            <X size={15} />
          </button>
        </div>

        {/* Main tabs */}
        <div className="flex border-b border-gray-100 flex-none">
          {(["profile", "messages"] as MainTab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={[
                "flex-1 py-3 text-sm font-semibold transition-colors border-b-2",
                tab === t
                  ? "text-[#2D6A4F] border-[#2D6A4F]"
                  : "text-gray-400 border-transparent hover:text-gray-600",
              ].join(" ")}
            >
              {t === "profile" ? "プロフィール" : "メッセージ"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {tab === "profile" ? (
            <div className="h-full overflow-y-auto">
              <ProfilePane type={type} />
            </div>
          ) : (
            <MessagesPane type={type} />
          )}
        </div>
      </div>
    </>
  );
}
