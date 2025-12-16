# Emulsia Build Template

製造業向けに最適化されたNext.js + Firebaseプロジェクトテンプレート

## 概要

このテンプレートは、Emulsia Buildで使用する製造業特化型のプロジェクト雛形です。

## 技術スタック

- Next.js 14+ (App Router)
- Firebase (Firestore, Authentication, Functions, Hosting)
- TypeScript
- Tailwind CSS 3

## 推奨ディレクトリ構造（複数アプリ実装時）

```
src/
├── dashboard/      # 経営ダッシュボード
│   ├── components/
│   ├── types/
│   └── lib/
├── sales/          # 営業管理
│   ├── components/
│   ├── types/
│   └── lib/
├── production/     # 生産管理
│   ├── components/
│   ├── types/
│   └── lib/
├── inventory/      # 在庫管理
│   ├── components/
│   ├── types/
│   └── lib/
├── purchasing/     # 購買管理
│   ├── components/
│   ├── types/
│   └── lib/
├── shipping/       # 出荷管理
│   ├── components/
│   ├── types/
│   └── lib/
├── quality/        # 品質管理
│   ├── components/
│   ├── types/
│   └── lib/
└── shared/         # 共通コンポーネント
    ├── components/
    ├── types/
    ├── lib/
    └── hooks/
```

## 構造化のタイミング

**初回実装（1-2機能）：** 現在のフラットな構造で開始
**2つ目の機能実装時：** 上記の機能別ディレクトリ構造へリファクタリング

詳細は `docs/directory-structure-guide.md` を参照してください。

## セットアップ

```bash
# 依存パッケージインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build
```

## ドキュメント

- [ディレクトリ構造ガイド](docs/directory-structure-guide.md)

## ライセンス

Private - Emulsia Project
