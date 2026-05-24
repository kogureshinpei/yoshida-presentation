"use client";

import { useState } from "react";
import { X, CheckCircle } from "@phosphor-icons/react";

type Props = {
  seekerName: string;
  seekerAge: number;
  onClose: () => void;
};

export function ScoutModal({ seekerName, seekerAge, onClose }: Props) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {!submitted ? (
          <>
            <div className="flex items-start justify-between p-6 border-b border-gray-100">
              <div>
                <p className="text-xs text-[#C0392B] font-semibold uppercase tracking-wide mb-0.5">
                  スカウトメッセージ
                </p>
                <h2 className="font-bold text-gray-900 text-lg">
                  {seekerName}
                  <span className="text-sm text-gray-400 font-normal ml-2">{seekerAge}歳</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors flex-none ml-4"
                aria-label="閉じる"
              >
                <X size={14} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-500 leading-relaxed bg-[#F8F4EF] rounded-xl px-4 py-3">
                あなたの農場の魅力・求める人物像・具体的な仕事内容などを伝えると、
                {seekerName}さんに届きやすくなります。
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  メッセージ <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder={`${seekerName}さんへのスカウトメッセージを書いてください。農場の特徴、一緒にやりたいことなどを伝えましょう。`}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F] resize-none transition-colors"
                />
              </div>
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
              <button
                type="button"
                disabled={!message.trim()}
                onClick={() => setSubmitted(true)}
                className="flex-1 py-3 rounded-xl bg-[#C0392B] text-white font-bold text-sm hover:bg-[#a93226] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                スカウトする
              </button>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <CheckCircle size={52} weight="fill" className="text-[#2D6A4F] mx-auto mb-4" />
            <h2 className="font-bold text-gray-900 text-xl mb-2">スカウトを送りました！</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {seekerName}さんにメッセージが届きました。
              <br />
              返信をお待ちください。
            </p>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#2D6A4F] text-white font-semibold text-sm hover:bg-[#1f5038] transition-colors"
            >
              閉じる
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
