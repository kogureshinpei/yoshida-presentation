# Go Go ふぁーまー — プロジェクト知識ベース

> 最終更新: 2026-05-24  
> このファイルは会話の重要な内容・実装決定・設計思想をまとめたものです。  
> Claude は毎回の作業開始前にこのファイルを読み、文脈を把握してから作業すること。

---

## 1. プロダクト概要

**サービス名**: Go Go ふぁーまー  
**旧名**: ミノリ（MINORI）  
**種別**: 農業マッチングプラットフォーム（静的プロトタイプ）

### 3つのターゲット
| ターゲット | ニーズ |
|---|---|
| 学生・社会人 | 農業シフト体験の場を求めている |
| 農家 | 人手不足の解消・AgTech技術の試験導入 |
| AgTech企業 | 農家パートナーを通じた実証実験の場 |

---

## 2. 技術スタック

| 項目 | 内容 |
|---|---|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS v4のみ（CSS Modules禁止） |
| マップ | Leaflet.js（`dynamic(() => import(...), { ssr: false })`）|
| アイコン | `@phosphor-icons/react`（named import） |
| フォント | Noto Sans JP（本文）+ Shippori Mincho（見出しのみ） |
| テスト | Vitest + @testing-library/react |
| ホスティング | GitHub Pages（静的エクスポート） |
| CI/CD | GitHub Actions（main push → 自動デプロイ） |

### Next.js 静的エクスポート設定（重要）
```ts
// next.config.ts
const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd && repoName ? `/${repoName}` : "",
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    root: path.resolve(__dirname), // 親ディレクトリのpnpm-lock.yamlを誤認識しないために必須
  },
};
```

---

## 3. 公開URL・リポジトリ

- **GitHub**: https://github.com/kogureshinpei/yoshida-presentation
- **公開URL**: https://kogureshinpei.github.io/yoshida-presentation/
- **ローカルパス**: `/Users/shinpeikogure/Desktop/yoshida`

---

## 4. ページ構成

| パス | 種別 | 説明 |
|---|---|---|
| `/` | 静的 | ランディングページ（Hero・ストーリーブロック・Testimonials・CTA）|
| `/for-students` | Client | 農場一覧（グリッド/マップ切替・フィルター） |
| `/for-students/farms/[id]` | SSG | 農場詳細（シフトカレンダー・AgTechトライアル一覧）|
| `/for-farmers` | Client | AgTech企業一覧（カテゴリフィルター・モーダル）|
| `/for-farmers/companies/[id]` | SSG | 企業詳細（製品・実績・導入事例）|
| `/register` | Client | 参加登録フォーム（学生/農家/企業の3タブ）|
| `/presentation` | Client | **発表用デモ**（下記3セクション） |

### `/presentation` の3セクション
1. **学生シフト登録フロー** — 4ステップのインタラクティブデモ
2. **農家ダッシュボード** — 農場別シフト充填状況・登録学生一覧
3. **企業トライアル状況** — 農場 × AgTech企業のマッチング可視化

---

## 5. データファイル構成

```
src/data/
├── farms.json          # 農場10件（id: farm-001〜farm-010）
├── companies.json      # AgTech企業8社（id: co-001〜co-008）
├── companyDetails.json # 企業詳細（製品・実績・導入事例・ヒーロー画像）
└── trialMatches.json   # 農場 × 企業トライアルマッチング（全10農場）
```

### 主要型定義 (`src/types/index.ts`)
```ts
ShiftSlot   // date, dayOfWeek, startTime, endTime, capacity, filled
Farm        // id, name, location, prefecture, crops[], shiftSlots[], features[], rating, acceptCount
Company     // id, name, category, tagline, description, technologies[], targetCrops[], logoColor, established
CompanyDetail // id, vision, heroImage, stats[], about, products[], caseStudy
CompanyStat   // label, value, note
CompanyProduct // name, badge, description, features[], price
```

### `trialMatches.json` の構造
```ts
type TrialMatch = {
  farmId: string; // e.g. "farm-001"
  trials: {
    companyId: string; // e.g. "co-001"
    technology: string; // 技術・製品名
    status: "トライアル中" | "導入完了" | "検討中";
    period: string;
    note: string;
  }[];
}
```

---

## 6. コンポーネント構成

```
src/components/
├── Navigation.tsx       # デスクトップ上部ナビ + モバイル5タブ下部バー
├── FarmCard.tsx         # 農場カード（next/image・空き枠バッジ）
├── CompanyCard.tsx      # 企業カード（概要モーダル + 詳細ページリンク）
├── ShiftCalendar.tsx    # 週別シフトグリッド
├── FilterBar.tsx        # 農場フィルター（都道府県/作物/空き枠）
├── MapView.tsx          # Leafletマップ（useEffect内で非同期init）
├── MapViewWrapper.tsx   # dynamic import + ErrorBoundary
├── Testimonials.tsx     # 口コミ3カード
└── EmptyState.tsx       # フィルター結果ゼロ時の表示
```

### カスタムフック
```
src/hooks/
├── useFarmFilters.ts        # 農場フィルター（prefecture・crop・hasAvailability）
├── useFarmFilters.test.ts   # Vitestテスト9件
└── useCompanyFilters.ts     # 企業フィルター（category・targetCrop）
```

---

## 7. デザインシステム

### カラーパレット
| 変数 | 値 | 用途 |
|---|---|---|
| `--color-primary` | `#2D6A4F` | メインの緑 |
| `--color-accent` | `#74C69D` | ライトグリーン |
| `--color-red` | `#C0392B` | **赤アクセント（縁・アンダーライン）** |
| `--color-bg` | `#F8F4EF` | 背景のオフホワイト |
| ダークグリーン | `#1B4332` | ヘッダー背景 |
| ミディアムグリーン | `#52B788` | セカンダリ |

### 赤アクセントの適用箇所
- ナビゲーション デスクトップ: アクティブリンク `border-b-2 border-[#C0392B]`
- ナビゲーション モバイル: アクティブタブ上部に `h-[2px] bg-[#C0392B]` 線
- 農場詳細ページのAgTechセクション見出し左ボーダー: `bg-[#C0392B]`
- 発表用ページのステップインジケーター（完了済みステップ）

### フォント運用
- `font-shippori`（`.font-shippori` クラス）: h1・h2 の目立つ見出しのみ
- Noto Sans JP: それ以外すべて

### モバイル対応
- ナビゲーション: 下部5タブバー（学生・農家・企業・登録・発表用）
- `pb-16 md:pb-0`: モバイルタブバー分のパディング

---

## 8. Leafletマップの実装パターン（重要）

```tsx
// MapViewWrapper.tsx — SSR無効でdynamic import
const MapView = dynamic(() => import("./MapView").then(m => ({ default: m.MapView })), { ssr: false });

// React.Component を require() ではなく import で使う（TypeScript strict対応）
import React from "react";
export class MapErrorBoundary extends React.Component<...> { ... }
```

```tsx
// MapView.tsx — Leafletのデフォルトアイコン404バグの修正
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  // ...
});
```

---

## 9. GitHub Pages デプロイの注意点

- `public/.nojekyll` が必須（jekyllがアンダースコアディレクトリを無視するのを防ぐ）
- `basePath` は CI の `NEXT_PUBLIC_REPO_NAME` 環境変数で設定
- `turbopack.root` を設定しないと親の `pnpm-lock.yaml` を誤ってワークスペースルートと判断してビルドエラーになる
- 静的エクスポートのため `params` は `generateStaticParams` で全IDを宣言する必要がある

---

## 10. 実装上の決定事項・ユーザー指示

### やってはいけないこと
- `create-next-app` で既存ディレクトリに直接scaffoldしない（`tasks/` フォルダが消える）
- `require("react").Component` を使わない（TypeScript strictモードでエラー）
- CSS Modulesを使わない（Tailwindのみ）
- 色指定は `text-neutral-xxx` など色名直打ち禁止。セマンティック or カスタムカラー `[#hex]` を使う

### ユーザーの好み・スタイル
- コメントは最小限（理由が自明でないもののみ）
- 日本語UIテキストが基本
- データはJSONファイルで管理（DB不使用）
- 架空のリアリティある内容（実在しない企業・農家の具体的なストーリー）を充実させる
- サービス名変更など指示があれば全ファイルに一括反映する

### AgTech企業カテゴリ
`AI` | `バイオ` | `農薬` | `IoT` | `ドローン` | `ロボット`

### トライアルステータスの色分け
| ステータス | バッジ色 |
|---|---|
| トライアル中 | amber（`bg-amber-100 text-amber-700`）|
| 導入完了 | green（`bg-green-100 text-green-700`）|
| 検討中 | gray（`bg-gray-100 text-gray-600`）|
