# Next.js + Firebase テンプレート

Emulsia Build 用の Next.js + Firebase プロジェクトテンプレート。

---

## 特徴

- Next.js 16 (App Router)
- Firebase (Authentication, Firestore, Storage, Hosting)
- GitHub Actions CI/CD
- TypeScript
- Tailwind CSS
- ESLint 設定済み

---

## セットアップ手順

### 1. Clone

```bash
git clone https://github.com/OkutaniHayato/nextjs-firebase-template.git my-project
cd my-project
rm -rf .git
git init
npm install
```

### 2. Firebase設定

1. [Firebase Console](https://console.firebase.google.com/) でプロジェクト作成
2. Authentication, Firestore, Storage, Hosting を有効化
3. Webアプリを登録し、SDK設定をコピー
4. Service Account キーを生成

### 3. 環境変数設定

```bash
cp .env.example .env.local
```

`.env.local` にFirebaseの認証情報を入力。

### 4. 初期設定

プロジェクト固有の設定を編集：

1. `knowledge/index.md` - プロジェクト概要
2. `knowledge/company_info.md` - 会社情報
3. `knowledge/glossary.md` - 専門用語集
4. `.claude/rules/base.md` - プロジェクト情報

### 5. 起動確認

```bash
npm run dev
```

http://localhost:3000 を開いて確認。

### 6. GitHub Actions 権限設定

CI/CDを有効にするため、以下の設定が必要です：

1. リポジトリの **Settings** → **Actions** → **General** を開く
2. 「Workflow permissions」で **Read and write permissions** を選択
3. **Allow GitHub Actions to create and approve pull requests** にチェック
4. **Save** をクリック

---

## ディレクトリ構成

```
my-project/
├── .claude/
│   └── rules/              # Claude Code ルール
│       ├── base.md         # 基本ルール
│       ├── coding-standards.md  # コーディング規約
│       └── knowledge-guide.md   # ナレッジ読み込みガイド
├── knowledge/              # プロジェクトナレッジ
│   ├── index.md            # プロジェクト概要
│   ├── progress.md         # 実装済み機能
│   ├── company_info.md     # 会社情報
│   ├── glossary.md         # 専門用語集
│   ├── domain/             # 業務ドメイン別情報
│   └── conversations/      # 会話ログ
├── custom/
│   ├── instructions/       # 特殊ルール
│   └── tools/              # カスタムツール
├── src/
│   ├── app/                # Next.js ページ
│   ├── components/         # UIコンポーネント
│   ├── config/             # Firebase設定
│   ├── hooks/              # カスタムフック
│   ├── lib/                # ユーティリティ
│   └── types/              # 型定義
├── scripts/                # セットアップスクリプト
├── .env.example            # 環境変数テンプレート
├── firebase.json           # Firebase設定
├── firestore.rules         # Firestoreセキュリティルール
└── storage.rules           # Storageセキュリティルール
```

---

## 参照するSkills

Claude Code での開発時に参照：

- `emulsia-standards` - Emulsia 標準規約
- `manufacturing-dx` - 製造業DX知識
- `firebase-nextjs` - Firebase + Next.js 開発パターン

---

## 開発コマンド

```bash
# 開発サーバー
npm run dev

# ビルド
npm run build

# Lint
npm run lint

# Firebase Emulator
firebase emulators:start
```

---

## ブランチ戦略

- `main` - 本番環境
- `develop` - 開発環境
- `feature/YYYYMMDD-概要` - 機能開発

---

## ライセンス

MIT
