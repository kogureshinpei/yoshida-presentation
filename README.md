# yoshida-presentation

農業マッチングプラットフォーム「ミノリ (MINORI)」のプロトタイプです。

## 概要

学生・社会人、農家、AgTech企業の3者をつなぐ農業マッチングプラットフォーム。

- **農場一覧**: 都道府県・作物・空き枠でフィルタリング + Leafletインタラクティブマップ
- **農場詳細**: シフトカレンダー表示
- **AgTech企業一覧**: カテゴリ別フィルタリング + 詳細モーダル
- **参加登録フォーム**: 学生・農家・企業の3タイプ対応

## 技術スタック

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Leaflet.js (インタラクティブマップ)
- Vitest (ユニットテスト)
- GitHub Pages (静的ホスティング)

## 開発

```bash
npm install
npm run dev   # http://localhost:3000
npm test      # Vitestテスト実行
npm run build # 静的エクスポートビルド
```
