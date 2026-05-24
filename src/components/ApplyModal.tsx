"use client";

import { useState } from "react";
import { X, CheckCircle } from "@phosphor-icons/react";

type Props = {
  farmName: string;
  onClose: () => void;
};

export function ApplyModal({ farmName, onClose }: Props) {
  const [message, setMessage] = useState("");
  const [timing, setTiming] = useState("");
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
                <p className="text-xs text-[#2D6A4F] font-semibold uppercase tracking-wide mb-0.5">
                  働きたい気持ちを伝える
                </p>
                <h2 className="font-bold text-gray-900 text-lg leading-snug">{farmName}</h2>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  メッセージ <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="この農家で働きたい理由や、自分のことを簡単に紹介してください。どんなことを学びたいか、どんな経験があるかなど自由に書いてください。"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F] resize-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  参加希望時期
                  <span className="text-gray-400 text-xs font-normal ml-1.5">任意</span>
                </label>
                <input
                  type="text"
                  value={timing}
                  onChange={(e) => setTiming(e.target.value)}
                  placeholder="例: 今月中、来週末、6月以降"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F] transition-colors"
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
                className="flex-1 py-3 rounded-xl bg-[#2D6A4F] text-white font-bold text-sm hover:bg-[#1f5038] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                希望を届ける
              </button>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <CheckCircle size={52} weight="fill" className="text-[#2D6A4F] mx-auto mb-4" />
            <h2 className="font-bold text-gray-900 text-xl mb-2">メッセージを送りました！</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {farmName}に希望が届きました。
              <br />
              農家からの返信をお待ちください。
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
