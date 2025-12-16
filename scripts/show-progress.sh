#!/bin/bash

echo "📊 プロジェクト進捗サマリー"
echo "=============================="

# GitHub CLI がインストールされているか確認
if ! command -v gh &> /dev/null; then
  echo "❌ GitHub CLI (gh) がインストールされていません"
  echo "   インストール: https://cli.github.com/"
  exit 1
fi

# 累計完了Issue数
TOTAL_CLOSED=$(gh issue list --state closed --json number 2>/dev/null | jq 'length' || echo 0)
echo "累計完了Issue: ${TOTAL_CLOSED}件"

# 今週の完了Issue数
WEEK_START=$(date -d '7 days ago' +%Y-%m-%d 2>/dev/null || date -v-7d +%Y-%m-%d)
WEEK_CLOSED=$(gh issue list --state closed \
  --search "closed:>=${WEEK_START}" \
  --json number 2>/dev/null | jq 'length' || echo 0)
echo "今週完了Issue: ${WEEK_CLOSED}件"

# 最近完了したIssue（5件）
echo ""
echo "最近完了したIssue（5件）:"
gh issue list --state closed --limit 5 \
  --json number,title,closedAt 2>/dev/null | \
  jq -r '.[] | "  #\(.number) \(.title) (完了: \(.closedAt[:10]))"' || \
  echo "  （なし）"

# 進行中のIssue
echo ""
echo "進行中のIssue:"
gh issue list --state open \
  --json number,title 2>/dev/null | \
  jq -r '.[] | "  #\(.number) \(.title)"' || \
  echo "  （なし）"

echo ""
echo "=============================="
echo "詳細: gh issue list --state all"
