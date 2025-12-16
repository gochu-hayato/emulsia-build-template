# Skills Directory

このディレクトリには、クライアント固有の実装パターンをSKILL.md形式で格納します。

## 構造

```
.claude/skills/
├── README.md                           # 本ファイル
└── {client-pattern-name}/              # クライアント固有パターン
    ├── SKILL.md                        # 必須、概要と基本
    ├── {detail}.md                     # オプション、詳細
    └── scripts/                        # オプション、実行可能ツール
        ├── generate_slip_number.py
        └── validate_slip.py
```

## SKILL.mdの形式

```yaml
---
name: client-pattern-name
description: パターンの説明。トリガーキーワードを含める。
allowed-tools:
  - Read
  - Write
  - Edit
---

# パターン名

## 概要
...

## 実装パターン
...
```

## 使い方

### CCOWでの参照（現状）
Issue本文に明示的に記載：
```markdown
## 参照ドキュメント
- @.claude/skills/abc-corp-slip-processing/SKILL.md
```

### 将来の自動トリガー対応
CCOWが `.claude/skills/` に対応したら、
descriptionのキーワードで自動的に読み込まれます。

## 注意事項

- SKILL.mdは500-1,000行を目安に簡潔に
- 1,000行超えたら詳細を別ファイルに分離
- クライアント固有の情報のみ含める
- 一般的な製造業パターンは別途用意

---

**プロジェクト開始後、初回ヒアリング内容からSKILL.mdを作成してください。**
