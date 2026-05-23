# 農業プラットフォーム プロトタイプ 設計計画書

## プロダクト概要

**仮称**: ミノリ（MINORI）  
**コンセプト**: 農家 × 学生・社会人 × AgTech企業をつなぐ農業マッチングプラットフォーム

### 解決する課題
- 農家の人手不足（繁忙期の即戦力確保）
- 学生・社会人の農業体験ニーズへのアクセス手段がない
- AgTech企業が農家へ技術を試したくても接点がない

### ユーザー種別
| ユーザー | 役割 |
|---------|------|
| 農家 | シフト枠を登録、AgTech企業の技術を閲覧 |
| 学生・社会人 | 農家を探してシフト申込 |
| AgTech企業 | バイオ・農薬・AI遠隔操作等の技術を農家へ紹介 |

### ビジネスモデル（参考）
- 学生が正規雇用転換時に収入の一部を手数料として受け取る
- AgTech企業はプラットフォームへの情報掲載料を支払う

---

## 技術スタック

| 項目 | 選定 | 理由 |
|------|------|------|
| フレームワーク | Next.js 14 (App Router) | コンポーネント管理・静的export対応 |
| 言語 | TypeScript | 型安全性 |
| スタイリング | Tailwind CSS | 高速プロトタイピング |
| データ | JSON モックデータ | DBなし（GitHub Pages対応） |
| デプロイ | GitHub Pages | `output: 'export'` で静的ビルド |
| フォント | Noto Sans JP | 日本語最適化 |

---

## 画面一覧

### 1. ランディングページ (`/`)
- ヒーローセクション：キャッチコピー + 背景農地画像
- プラットフォーム概念図（農家 ↔ 学生 ↔ 企業の三角形）
- 2つのCTA：「農家・学生として参加する」「企業として参加する」
- 特徴紹介セクション（3カラム）

### 2. 学生向け：農家一覧 (`/for-students`)
- フィルター：都道府県、農作物種別、シフト空き状況
- 農家カード一覧（名前・場所・作物・受入人数・シフト例）
- 検索バー

### 3. 農家詳細 + シフト閲覧 (`/for-students/farms/[id]`)
- 農家プロフィール（写真・紹介文・場所・作物）
- 週次シフトカレンダー（空き枠をビジュアル表示）
- シフト申込ボタン → 申込フォームへ

### 4. 農家向け：AgTech企業一覧 (`/for-farmers`)
- フィルター：技術カテゴリ（AI・バイオ・農薬・IoT・ドローン等）
- 企業カード一覧（社名・技術説明・対応作物・導入事例）
- 企業詳細モーダル or ページ

### 5. 登録 / シフト申込フォーム (`/register`)
- タブ切替：学生登録 / 農家登録
- 学生：名前・連絡先・希望農業種別・入れる日時
- 農家：農家名・場所・作物・シフト枠設定
- ※ UIのみ、送信処理なし

---

## モックデータ設計

### farms.json（10件）
```
{ id, name, location, prefecture, crops[], description, image, 
  shiftSlots[{ date, startTime, endTime, capacity, filled }],
  features[] }
```

### companies.json（8件）
```
{ id, name, category, tagline, description, technologies[], 
  targetCrops[], logoUrl, website }
```

---

## デザイン方針（デザインレビュー確定版 2026-05-23）

### カラーシステム
- Primary: 深緑 `#2D6A4F`
- Accent: 黄緑 `#74C69D`
- Background: オフホワイト `#F8F4EF`
- Text: `#1A1A1A` (dark), `#6B7280` (muted)

### タイポグラフィ
- **見出し (ヒーローのみ)**: Shippori Mincho (Google Fonts, 日本語明朝体) — 農業の大地感
- **本文・UI全般**: Noto Sans JP (subsets: latin + japanese)
- `next/font/google` で両方読み込み

### ヒーローセクション
- フルブリード農地写真 (Unsplash) + 深緑グラデーションoverlay (`#2D6A4F` 70% opacity)
- ヒーロー内要素: ブランド名 → 大見出し (Shippori Mincho) → サブテキスト → CTAグループ
- **3チャネルCTAボタン**: 学生 / 農家 / 企業 → 各セクションへ誘導

### ストーリーセクション (3カラムグリッドの代替)
- **縦積みストーリー形式**: 左メッセージ + 右農家写真、次は農家左 + 企業右、交互配置
- 各ブロックに1つのストーリー（学生の体験 / 農家の課題解決 / AgTech導入）
- AIスロップ回避: アイコン丸背景グリッドは使用禁止

### 農家カードデザイン
- 写真 (上部) + 農家名 + 都道府県 + 作物タグ
- **シフト空きインジケーターバッジ**: 「今週X枠空き」を緑バッジで表示
- ホバー: elevation shadow (translate-y + shadow-lg, 150ms ease)
- AI差別化: タグ + バッジが農業マッチングプロダクト固有の情報

### 空状態UI
- フィルター結果0件: 農業テーマのSVGイラスト + 「条件に合う農家が見つかりませんでした」+ 「フィルターをリセット」ボタン

### インタラクション状態
```
機能               | LOADING       | EMPTY                    | ERROR          | SUCCESS
农家一覧           | スケルトン3枚  | SVGイラスト+リセットCTA  | N/A (静的)     | —
企業一覧           | スケルトン3枚  | SVGイラスト+リセットCTA  | N/A (静的)     | —
Leaflet地図        | スピナー       | —                        | ErrorBoundary  | —
登録フォーム       | —             | —                        | —              | 成功モーダル
```

### アニメーション (Tailwind CSS)
- ヒーロー: フェードイン (opacity 0→1, 600ms)
- カード: ホバーエレベーション (`hover:shadow-lg hover:-translate-y-1 transition-all`)
- ランディングセクション: スクロールリビール (`IntersectionObserver` + Tailwind animate)

### レスポンシブ仕様
```
Mobile  (< 640px):  カード1列 | フィルター: アコーディオン | シフト: 横スクロール | ナビ: ボトムタブバー
Tablet  (640-1024): カード2列 | フィルター: 折り畳みサイドバー
Desktop (> 1024px): カード3列 | フィルター: 常時展開サイドバー | ナビ: トップバー
```

### アクセシビリティ
- タッチターゲット: 最小44px
- カラーコントラスト: #2D6A4F on white = 7.5:1 (WCAG AA ✅)
- ARIA landmarks: `<main>`, `<nav>`, `<aside>` (フィルター)
- 全画像: `alt` 属性必須
- キーボードフォーカス: 可視インジケーター (ring-2 ring-green)

### 感情的アーク (ユーザージャーニー)
```
Step 1: ランディング → 「農業って新しい」驚き (フルブリード農地写真)
Step 2: ヒーロー読む → 「自分に関係ある」発見 (3チャネルCTA)
Step 3: 農家一覧    → 「こんな農家が」発見の喜び (カード + 地図)
Step 4: 農家詳細   → 「行けそう」確信 (週次シフトカレンダー)
Step 5: 申込フォーム → 「簡単に申し込める」安心 (フォームの短さ)
Step 6: 成功モーダル → 「やった」達成感 (緑チェックアニメーション)
```

---

## スコープ外（プロトタイプでは実装しない）

- ユーザー認証・ログイン機能
- 実際のシフト送信・マッチングロジック
- 決済・手数料計算
- 通知・メール送信
- 管理者画面

---

## ディレクトリ構成（予定）

```
yoshida/
├── src/
│   ├── app/
│   │   ├── page.tsx              # ランディング（テスティモニアル含む）
│   │   ├── for-students/
│   │   │   ├── page.tsx          # 農家一覧 + 地図ビュー
│   │   │   └── farms/[id]/
│   │   │       └── page.tsx      # 農家詳細 + 週次シフトカレンダー
│   │   ├── for-farmers/
│   │   │   └── page.tsx          # AgTech企業一覧
│   │   └── register/
│   │       └── page.tsx          # 登録フォーム（成功モーダル付き）
│   ├── components/
│   │   ├── ui/                   # 汎用UI部品
│   │   ├── FarmCard.tsx
│   │   ├── CompanyCard.tsx
│   │   ├── ShiftCalendar.tsx     # 週次グリッド形式
│   │   ├── MapView.tsx           # Leaflet.js (dynamic import, ssr:false)
│   │   ├── Navigation.tsx        # 3チャネル切替（学生/農家/企業）
│   │   └── Testimonials.tsx
│   └── data/
│       ├── farms.json
│       └── companies.json
├── public/
│   └── .nojekyll                 # GitHub Pages 必須
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions 自動デプロイ
├── next.config.js                # output:'export', basePath:'/{repo}'
└── tailwind.config.js
```

## COレビュー確定事項（2026-05-23）

### 追加スコープ（cherry-pick）
- ✅ Leaflet.js インタラクティブ地図（農家一覧のマップビュー）
- ✅ テスティモニアルセクション（ランディング: 学生・農家・企業の声）
- ✅ 3チャネルナビゲーション（学生 / 農家 / 企業 モード切替）

### 実装時の必須注意点
- `next.config.js`: `output: 'export'`, `basePath: '/{repo-name}'`, `images: { unoptimized: true }`
- Leaflet: `dynamic(() => import('./MapView'), { ssr: false })` 必須
- `public/.nojekyll` ファイルを配置（GitHub Pages用）
- GitHub Actions `deploy.yml` でmainブランチ push時に自動デプロイ
- 空状態UI: フィルター結果0件時に「農家が見つかりませんでした」を表示
- フォーム送信後: 成功モーダル/トーストを表示（実際の送信なし）

### TODOS.md
- P2: ランディングにビジネスモデル収益フロー図セクションを追加

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 1 | CLEAN | 5 proposals, 3 accepted, 1 deferred |
| Codex Review | `/codex review` | Independent 2nd opinion | 0 | — | — |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 1 | CLEAN | 6 issues found, 0 critical gaps |
| Design Review | `/plan-design-review` | UI/UX gaps | 1 | CLEAN | score: 4/10 → 9/10, 9 decisions |

**VERDICT:** CEO + ENG + DESIGN CLEARED — 実装開始可能。
