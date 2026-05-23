import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFarmFilters } from "./useFarmFilters";
import type { Farm } from "@/types";

const slot = (dayOfWeek: "月" | "火" | "水" | "木" | "金" | "土" | "日", capacity: number, filled: number) => ({
  date: "2026-06-01",
  dayOfWeek,
  startTime: "9:00",
  endTime: "17:00",
  capacity,
  filled,
});

const makeFarm = (overrides: Partial<Farm>): Farm => ({
  id: "f-1",
  name: "テスト農場",
  location: "北海道札幌市",
  prefecture: "北海道",
  crops: ["トマト"],
  description: "",
  image: "",
  shiftSlots: [slot("月", 3, 1)],
  features: [],
  rating: 4.0,
  acceptCount: 10,
  ...overrides,
});

const farms: Farm[] = [
  makeFarm({ id: "f-1", prefecture: "北海道", crops: ["トマト"], shiftSlots: [slot("月", 3, 1)] }),
  makeFarm({ id: "f-2", prefecture: "長野県", crops: ["りんご", "ぶどう"], shiftSlots: [slot("火", 2, 2)] }),
  makeFarm({ id: "f-3", prefecture: "北海道", crops: ["じゃがいも"], shiftSlots: [slot("水", 4, 4)] }),
];

describe("useFarmFilters", () => {
  it("初期状態では全農場を返す", () => {
    const { result } = renderHook(() => useFarmFilters(farms));
    expect(result.current.filteredFarms).toHaveLength(3);
  });

  it("都道府県フィルターで絞り込める", () => {
    const { result } = renderHook(() => useFarmFilters(farms));
    act(() => { result.current.updateFilter("prefecture", "北海道"); });
    expect(result.current.filteredFarms).toHaveLength(2);
    expect(result.current.filteredFarms.every((f) => f.prefecture === "北海道")).toBe(true);
  });

  it("作物フィルターで絞り込める", () => {
    const { result } = renderHook(() => useFarmFilters(farms));
    act(() => { result.current.updateFilter("crop", "りんご"); });
    expect(result.current.filteredFarms).toHaveLength(1);
    expect(result.current.filteredFarms[0].id).toBe("f-2");
  });

  it("空き枠ありフィルターで満席を除外する", () => {
    const { result } = renderHook(() => useFarmFilters(farms));
    act(() => { result.current.updateFilter("hasAvailability", true); });
    // f-2 (2/2 満席) と f-3 (4/4 満席) は除外、f-1 (1/3) のみ残る
    expect(result.current.filteredFarms).toHaveLength(1);
    expect(result.current.filteredFarms[0].id).toBe("f-1");
  });

  it("フィルターを複数組み合わせられる", () => {
    const { result } = renderHook(() => useFarmFilters(farms));
    act(() => {
      result.current.updateFilter("prefecture", "北海道");
      result.current.updateFilter("hasAvailability", true);
    });
    expect(result.current.filteredFarms).toHaveLength(1);
    expect(result.current.filteredFarms[0].id).toBe("f-1");
  });

  it("resetFilters で全件に戻る", () => {
    const { result } = renderHook(() => useFarmFilters(farms));
    act(() => { result.current.updateFilter("prefecture", "長野県"); });
    expect(result.current.filteredFarms).toHaveLength(1);
    act(() => { result.current.resetFilters(); });
    expect(result.current.filteredFarms).toHaveLength(3);
  });

  it("prefectures は重複なくソートされている", () => {
    const { result } = renderHook(() => useFarmFilters(farms));
    expect(result.current.prefectures).toEqual(["北海道", "長野県"]);
  });

  it("allCrops は全作物を重複なくソートして返す", () => {
    const { result } = renderHook(() => useFarmFilters(farms));
    expect(result.current.allCrops).toEqual(["じゃがいも", "ぶどう", "りんご", "トマト"]);
  });

  it("空配列を渡すとフィルター結果も空", () => {
    const { result } = renderHook(() => useFarmFilters([]));
    expect(result.current.filteredFarms).toHaveLength(0);
    expect(result.current.prefectures).toHaveLength(0);
    expect(result.current.allCrops).toHaveLength(0);
  });
});
