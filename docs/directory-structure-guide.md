# ディレクトリ構造ガイド

## 目次

1. [基本方針](#基本方針)
2. [段階的構造化](#段階的構造化)
3. [機能別ディレクトリ](#機能別ディレクトリ)
4. [共通ディレクトリ](#共通ディレクトリ)
5. [命名規則](#命名規則)

---

## 基本方針

### 製造業特化設計

このテンプレートは製造業の業務フローに最適化されています。

**対象業務領域：**
- 経営ダッシュボード
- 営業管理
- 生産管理
- 在庫管理
- 購買管理
- 出荷管理
- 品質管理

### 段階的成長

プロジェクトの成長に合わせて構造を変化させます。

---

## 段階的構造化

### Phase 1: 初期実装（1機能）

```
src/
├── app/
├── components/
├── lib/
└── shared/
```

**対象：** 初回デリバリー（1つの機能のみ実装）

**特徴：**
- シンプルなフラット構造
- 迅速な開発開始

---

### Phase 2: 機能追加（2-3機能）

```
src/
├── sales/
│   ├── components/
│   ├── types/
│   └── lib/
├── inventory/
│   ├── components/
│   ├── types/
│   └── lib/
└── shared/
    ├── components/
    ├── types/
    ├── lib/
    └── hooks/
```

**対象：** 2つ目の機能実装開始時

**リファクタリング手順：**
1. `src/shared/` ディレクトリを作成
2. 既存の共通コンポーネントを `shared/` に移動
3. 新機能を機能別ディレクトリに実装

---

### Phase 3: 完全展開（5-7機能）

```
src/
├── dashboard/
├── sales/
├── production/
├── inventory/
├── purchasing/
├── shipping/
├── quality/
└── shared/
```

**対象：** 複数機能が稼働している状態

---

## 機能別ディレクトリ

### 標準構造

各機能ディレクトリは以下の構造を持ちます：

```
{feature}/
├── components/       # 機能固有のUIコンポーネント
├── types/           # TypeScript型定義
├── lib/             # ビジネスロジック・ユーティリティ
└── hooks/           # カスタムReact Hooks（オプション）
```

### 機能一覧

| ディレクトリ | 機能 | 主要コンポーネント例 |
|------------|------|---------------------|
| `dashboard/` | 経営ダッシュボード | KPIカード、グラフ |
| `sales/` | 営業管理 | 見積作成、受注管理 |
| `production/` | 生産管理 | 製造指示、進捗管理 |
| `inventory/` | 在庫管理 | 在庫一覧、入出庫 |
| `purchasing/` | 購買管理 | 発注管理、仕入先管理 |
| `shipping/` | 出荷管理 | 出荷指示、配送管理 |
| `quality/` | 品質管理 | 検査記録、不良管理 |

---

## 共通ディレクトリ

### shared/ の役割

複数機能で使用するコードを集約します。

```
shared/
├── components/      # 共通UIコンポーネント
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Modal.tsx
├── types/          # 共通型定義
│   ├── common.ts
│   └── firestore.ts
├── lib/            # 共通ロジック
│   ├── firebase.ts
│   └── validation.ts
└── hooks/          # 共通Hooks
    ├── useAuth.ts
    └── useFirestore.ts
```

### 共通化の判断基準

以下の場合は `shared/` に配置します：

✅ **共通化すべき：**
- 2つ以上の機能で使用
- ビジネスロジックを持たない
- 汎用的なUI・ロジック

❌ **共通化すべきでない：**
- 1つの機能でのみ使用
- 機能固有のビジネスロジック
- 頻繁に変更される

---

## 命名規則

### ディレクトリ名

- **小文字のみ**
- **単語区切りはハイフンなし**（例：`inventory` not `inventory-management`）
- **英語表記**

### ファイル名

**コンポーネント：**
- PascalCase（例：`Button.tsx`）

**ユーティリティ・型定義：**
- camelCase（例：`validation.ts`, `common.ts`）

**定数：**
- UPPER_SNAKE_CASE（例：`API_ENDPOINTS.ts`）

---

## リファクタリングチェックリスト

Phase 1 → Phase 2 移行時：

- [ ] `src/shared/` ディレクトリ作成
- [ ] 共通コンポーネントを `shared/components/` に移動
- [ ] 共通型定義を `shared/types/` に移動
- [ ] 既存機能を機能別ディレクトリに移動
- [ ] インポートパスを更新
- [ ] ビルド・テストが通ることを確認

---

## 参考リンク

- [Next.js Project Structure Best Practices](https://nextjs.org/docs/getting-started/project-structure)
- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)

---

**Emulsia Build Template - Directory Structure Guide**
**最終更新：2025年12月**
