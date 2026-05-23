@AGENTS.md

# Go Go ふぁーまー — Claude作業ガイド

## 最優先ルール: セッション開始時に必ず読む

**このプロジェクトで何か作業を始める前に、必ず以下を読むこと:**

```
tasks/knowledge.md
```

このファイルには以下が記載されている:
- サービスの概要・ターゲット・ページ構成
- 技術スタック・デザインシステム・カラーパレット
- データファイルの構造と型定義
- 実装上の重要な決定事項（Leafletのバグ対処、GitHub Pages注意点など）
- ユーザーの好み・やってはいけないこと

**読まずに作業を始めると、前回の決定事項を覚えていない状態で実装することになる。必ず読め。**

---

## ワークフロー

```
1. tasks/knowledge.md を Read する
2. 前回の実装内容・設計・データ構造を把握する
3. ユーザーの指示を文脈を持って理解する
4. 実装・回答する
5. 重要な決定・新機能・変更点は tasks/knowledge.md に追記する
```

---

## knowledge.md の更新タイミング

以下が発生したら `tasks/knowledge.md` を更新すること:
- 新しいページ・コンポーネントを追加した
- データ構造（型定義・JSONファイル）を変更した
- デザインシステムを変更した（色・フォント・レイアウトなど）
- ユーザーから「こうしてほしい」「こうしないでほしい」という指示があった
- 重要な技術的バグとその解決策が発見された
- サービス名など基本情報が変更された

---

## プロジェクト基本情報（クイックリファレンス）

| 項目 | 内容 |
|---|---|
| サービス名 | Go Go ふぁーまー |
| リポジトリ | https://github.com/kogureshinpei/yoshida-presentation |
| 公開URL | https://kogureshinpei.github.io/yoshida-presentation/ |
| ローカルパス | `/Users/shinpeikogure/Desktop/yoshida` |
| フレームワーク | Next.js 16 App Router + TypeScript + Tailwind CSS v4 |
| データ | DBなし・JSONファイル管理 |
| ホスティング | GitHub Pages（静的エクスポート）|

詳細は `tasks/knowledge.md` を参照。
