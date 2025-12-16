---
paths: src/**/*.{ts,tsx}
---

# TypeScript/React コーディング規約

## TypeScript

### 型定義
- すべての関数に戻り値の型を明記
- `any` 型の使用禁止
- optional は `?` を使用（`| undefined` ではなく）

### 命名規則
- **ファイル名**: kebab-case (`user-profile.tsx`)
- **変数・関数**: camelCase (`getUserProfile`)
- **型・インターフェース**: PascalCase (`UserProfile`)
- **定数**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)

### インポート順序
1. React関連
2. Next.js関連
3. 外部ライブラリ
4. 内部モジュール（絶対パス）
5. 相対パス

```typescript
// Good
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { formatDate } from './utils';
```

---

## React

### コンポーネント
- 関数コンポーネントのみ使用
- Props は interface で定義
- デフォルト export 禁止（named exportのみ）

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const Button = ({ label, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{label}</button>;
};
```

### Hooks
- カスタムフックは `use` プレフィックス
- useEffect の依存配列を必ず指定

---

## Firestore

### コレクション・ドキュメント命名
- コレクション: 複数形・小文字 (`users`, `orders`)
- ドキュメントID: UUID または自動生成

### 型定義
- `types/firestore.ts` に集約
- Firestoreのデータ構造と1対1対応

```typescript
// types/firestore.ts
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

## コミット規約

### フォーマット
```
[種別] #IssueNumber 内容
```

### 種別
- `[feat]`: 新機能
- `[fix]`: バグ修正
- `[refactor]`: リファクタリング
- `[docs]`: ドキュメント
- `[test]`: テスト
- `[chore]`: その他（ビルド、設定変更等）

### 例
```
[feat] #5 ユーザー登録機能実装
[fix] #12 ログイン時のエラーハンドリング修正
[refactor] #18 認証ロジックの整理
```

---

## 禁止事項

### 絶対禁止
- `any` 型の使用
- `console.log` のコミット
- 機密情報のハードコード
- デフォルト export

### 非推奨
- クラスコンポーネント
- `var` の使用
- グローバル変数
