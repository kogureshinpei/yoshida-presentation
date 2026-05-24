"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, ArrowRight } from "@phosphor-icons/react";
import type { Farm } from "@/types";
import { ApplyModal } from "./ApplyModal";

type Props = {
  farm: Farm;
};

function getAvailableSlots(farm: Farm): number {
  return farm.shiftSlots.reduce((sum, slot) => {
    return sum + Math.max(0, slot.capacity - slot.filled);
  }, 0);
}

export default function FarmCard({ farm }: Props) {
  const [applyOpen, setApplyOpen] = useState(false);
  const availableSlots = getAvailableSlots(farm);

  return (
    <>
      <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col">
        {/* Image — links to detail */}
        <Link href={`/for-students/farms/${farm.id}`} className="block relative w-full aspect-video overflow-hidden flex-none">
          <Image
            src={farm.image}
            alt={farm.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3">
            {availableSlots > 0 ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#2D6A4F] text-white shadow-sm">
                今週{availableSlots}枠空き
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-400 text-white shadow-sm">
                満席
              </span>
            )}
          </div>
        </Link>

        {/* Card body */}
        <div className="p-4 flex flex-col flex-1">
          <Link href={`/for-students/farms/${farm.id}`} className="block">
            <h3 className="font-semibold text-gray-900 text-base leading-snug mb-1 group-hover:text-[#2D6A4F] transition-colors duration-200">
              {farm.name}
            </h3>
          </Link>

          <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
            <MapPin size={13} weight="fill" />
            <span>{farm.prefecture} · {farm.location}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {farm.crops.map((crop) => (
              <span
                key={crop}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#74C69D]/20 text-[#2D6A4F]"
              >
                {crop}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1 text-amber-400">
                <Star size={14} weight="fill" />
                <span className="text-sm font-semibold text-gray-700">{farm.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-gray-400">
                累計受入 <span className="font-medium text-gray-600">{farm.acceptCount}</span> 名
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Link
                href={`/for-students/farms/${farm.id}`}
                className="flex-1 py-2 rounded-xl border border-[#2D6A4F] text-[#2D6A4F] text-xs font-semibold text-center hover:bg-[#2D6A4F]/5 transition-colors"
              >
                詳細を見る
              </Link>
              <button
                type="button"
                onClick={() => setApplyOpen(true)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#2D6A4F] text-white text-xs font-semibold hover:bg-[#1f5038] transition-colors"
              >
                働きたい！
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {applyOpen && (
        <ApplyModal farmName={farm.name} onClose={() => setApplyOpen(false)} />
      )}
    </>
  );
}
