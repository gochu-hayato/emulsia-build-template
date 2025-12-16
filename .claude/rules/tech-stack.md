# 技術スタック

## フロントエンド

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS v3**
  - ⚠️ v4はWSL環境で不安定なため使用禁止

## バックエンド

- **Firebase Firestore** - データベース
- **Firebase Authentication** - 認証
- **Firebase Hosting** - ホスティング
- **Firebase Functions** - サーバーレス関数（必要に応じて）

## 開発ツール

- **Node.js 18+**
- **npm**
- **Git** + **GitHub CLI**
- **WSL** (Windows環境)

## AI開発

- **Claude Code on the Web (CCOW)** - 実装
- **Claude for Chrome (CfC)** - 自動操作

---

## バージョン情報

| パッケージ | バージョン | 備考 |
|-----------|-----------|------|
| next | 14.x | App Router使用 |
| react | 18.x | |
| typescript | 5.x | |
| tailwindcss | 3.x | v4使用禁止 |
| firebase | 10.x | |

---

## 環境変数

### .env.local（開発環境）

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### GitHub Secrets（本番環境）

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `FIREBASE_SERVICE_ACCOUNT`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
