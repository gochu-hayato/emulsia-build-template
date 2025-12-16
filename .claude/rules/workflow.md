# 開発フロー

## ブランチ運用

### ブランチ構成
- **main**: 本番環境（Protected）
- **develop**: 開発環境（Default Branch）
- **feature/**: 機能開発ブランチ

### ブランチ作成

```bash
# 最新のdevelopを取得
git checkout develop
git pull origin develop

# featureブランチ作成
git checkout -b feature/YYYYMMDD-機能名
```

**命名規則:**
```
feature/20251215-email-notification
feature/20251216-user-profile
```

---

## Issue → PR → マージ

### 1. Issue作成

GitHub Issuesで作成または、Emulsia Brewから自動生成。

**テンプレート:**
```markdown
## 概要
{実装内容の要約}

## 推奨モデル
Sonnet 4.5

## 実装内容
- {詳細1}
- {詳細2}

## 見積時間
1.5h
```

---

### 2. 実装

**手動実装:**
```bash
# コード編集
vim src/...

# コミット
git add .
git commit -m "[feat] #5 メール送信サービス実装"
git push origin feature/20251215-email-notification
```

**自動実装（CCOW）:**
Claude for Chromeから指示 → CCOW実行 → 自動コミット

---

### 3. PR作成

**手動:**
```bash
gh pr create \
  --base develop \
  --title "[feat] メール通知機能実装" \
  --body "..."
```

**自動（CCOW）:**
Issue に `Auto PR: true` フラグがあれば自動作成

---

### 4. レビュー

**GitHub Actions CI:**
- ESLint
- TypeScript型チェック
- ビルド確認
- Firebase Hostingプレビューデプロイ

**人間レビュー:**
- プレビュー環境で動作確認
- コードレビュー
- 承認

---

### 5. マージ

```bash
# developにマージ
gh pr merge --squash

# 自動デプロイ
develop → Firebase Hosting (自動)
```

---

## 緊急対応フロー

### Hotfix

```bash
# mainから切る
git checkout main
git pull origin main
git checkout -b hotfix/YYYYMMDD-緊急修正

# 修正
...

# PR作成（base: main）
gh pr create --base main --title "[hotfix] ..."

# マージ後、developにもマージ
git checkout develop
git merge main
git push origin develop
```

---

## デプロイフロー

### 自動デプロイ

- **develop → Firebase Hosting**: PR マージ時に自動
- **main → Firebase Hosting**: mainへのマージ時に自動

### 手動デプロイ（必要時）

```bash
firebase deploy --only hosting
```
