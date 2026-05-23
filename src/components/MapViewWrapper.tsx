"use client";

import dynamic from "next/dynamic";
import type { Farm } from "@/types";

const MapView = dynamic(
  () => import("./MapView").then((m) => ({ default: m.MapView })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[480px] rounded-xl bg-green-50 flex items-center justify-center border border-green-100">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-sm text-green-700">地図を読み込み中…</p>
        </div>
      </div>
    ),
  }
);

type Props = {
  farms: Farm[];
};

function MapFallback() {
  return (
    <div className="w-full h-[480px] rounded-xl bg-green-50 flex items-center justify-center border border-green-100">
      <div className="text-center">
        <div className="text-4xl mb-3">🗺️</div>
        <p className="text-green-800 font-medium">地図を読み込めませんでした</p>
        <p className="text-sm text-green-600 mt-1">
          ページを再読み込みしてください
        </p>
      </div>
    </div>
  );
}

export class MapErrorBoundary extends (
  require("react").Component<{ children: React.ReactNode }, { hasError: boolean }>
) {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <MapFallback />;
    return this.props.children;
  }
}

export function MapViewWrapper({ farms }: Props) {
  return (
    <MapErrorBoundary>
      <MapView farms={farms} />
    </MapErrorBoundary>
  );
}
