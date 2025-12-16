# Firestore スキーマ定義

## Path-specific Rules

以下のファイルを編集する際、このルールを適用：
- `types/firestore.ts`

---

## コレクション構造

```
firestore/
├── (クライアント固有のコレクション)
```

**プロジェクト開始後に記載してください。**

---

## セキュリティルール

プロジェクト開始時に `firestore.rules` を設定してください。

### 基本テンプレート

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 認証済みユーザーのみアクセス可能
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### コレクション別ルール例

```
match /your_collection/{docId} {
  allow read: if request.auth != null;
  allow create: if request.auth != null
                && request.auth.uid == request.resource.data.userId;
  allow update: if request.auth != null
                && request.auth.uid == resource.data.userId;
  allow delete: if request.auth != null
                && request.auth.uid == resource.data.userId;
}
```

---

## 型定義の記載例

```typescript
interface YourCollection {
  id: string;
  userId: string;
  // ...
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

**このファイルはスキーマの単一情報源（SSOT）として機能します。**
**スキーマ変更時は必ずこのファイルを更新してください。**
