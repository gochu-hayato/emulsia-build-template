#!/bin/bash

# ========================================
# Firebase Hosting デプロイスクリプト
# ========================================
# 使い方: ./scripts/deploy.sh [environment]
# 例: ./scripts/deploy.sh production
# ========================================

set -e

# カラー定義
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# 環境（デフォルトはproduction）
ENVIRONMENT=${1:-production}

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🚀 Firebase Hosting デプロイ${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}環境:${NC} $ENVIRONMENT"
echo ""

# .env.localの確認
if [ ! -f ".env.local" ]; then
  echo -e "${RED}❌ .env.local が見つかりません${NC}"
  echo ""
  echo "環境変数を設定してください:"
  echo "  node scripts/setup.js"
  exit 1
fi

# Firebase CLIの確認
if ! command -v firebase &> /dev/null; then
  echo -e "${RED}❌ Firebase CLIがインストールされていません${NC}"
  echo ""
  echo "インストール方法:"
  echo "  npm install -g firebase-tools"
  exit 1
fi

# ビルド
echo -e "${YELLOW}[1/3] ビルド中...${NC}"
echo ""

npm run build

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ ビルドに失敗しました${NC}"
  exit 1
fi

echo ""
echo -e "${GREEN}✅ ビルド完了${NC}"
echo ""

# outディレクトリの確認
if [ ! -d "out" ]; then
  echo -e "${RED}❌ outディレクトリが見つかりません${NC}"
  echo ""
  echo "next.config.ts に output: 'export' が設定されているか確認してください"
  exit 1
fi

# デプロイ
echo -e "${YELLOW}[2/3] Firebase Hosting にデプロイ中...${NC}"
echo ""

firebase deploy --only hosting

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ デプロイに失敗しました${NC}"
  exit 1
fi

echo ""
echo -e "${GREEN}✅ デプロイ完了${NC}"
echo ""

# プロジェクトIDを取得
PROJECT_ID=$(firebase use 2>/dev/null || echo "unknown")

# 完了メッセージ
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 デプロイ成功！${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}デプロイ先:${NC}"
echo "  https://$PROJECT_ID.web.app"
echo "  https://$PROJECT_ID.firebaseapp.com"
echo ""
echo -e "${YELLOW}Firebase Console:${NC}"
echo "  https://console.firebase.google.com/project/$PROJECT_ID/hosting"
echo ""
