# プロジェクト基本情報

## プロジェクト構造

このプロジェクトは3層の情報管理構造を持ちます：

### 1. CLAUDE.md（現在地）
**役割：** プロジェクトの「今ここ」を示す
- 現在のフェーズ、ブランチ、タスク
- 最近の重要な決定
- 次のアクション

**更新頻度：** 毎日

### 2. .claude/rules/（プロジェクト憲法）
**役割：** 常に守るべきルール・制約
- 技術スタック（固定）
- コーディング規約
- ブランチ運用
- Firestoreスキーマ

**更新頻度：** 定期的（技術変更時）

### 3. .claude/skills/（実装パターン）
**役割：** クライアント固有の実装知識
- データ構造定義
- 業務ロジック
- バリデーションルール
- コード例

**更新頻度：** 継続的（ヒアリングで発見次第）

## リポジトリ情報

- **GitHub:** {GITHUB_USER}/{REPO_NAME}
- **Firebase:** {FIREBASE_PROJECT}
- **Hosting:** https://{FIREBASE_PROJECT}.web.app

## 技術スタック

詳細は以下を参照：
@.claude/rules/tech-stack.md

## コーディング規約

詳細は以下を参照：
@.claude/rules/coding-standards.md

## ワークフロー

詳細は以下を参照：
@.claude/rules/workflow.md

## Firestoreスキーマ

詳細は以下を参照：
@.claude/rules/firestore-schema.md

---

**重要：**
- クライアント固有の業務知識は `.claude/skills/` を参照
- プロジェクト開始後、速やかにスキーマ定義を記載してください
