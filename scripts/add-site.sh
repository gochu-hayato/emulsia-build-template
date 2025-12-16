#!/bin/bash

# ========================================
# Firebase Hosting マルチサイト追加スクリプト
# ========================================
# 使い方: ./scripts/add-site.sh <project-id> <site-name>
# 例: ./scripts/add-site.sh client-a meeting-recorder
# ========================================

set -e

# カラー定義
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🔥 Firebase Hosting サイト追加${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 引数チェック
if [ $# -lt 2 ]; then
  echo -e "${RED}❌ エラー: プロジェクトIDとサイト名を指定してください${NC}"
  echo ""
  echo "使い方: ./scripts/add-site.sh <project-id> <site-name>"
  echo "例: ./scripts/add-site.sh client-a meeting-recorder"
  exit 1
fi

PROJECT_ID=$1
SITE_NAME=$2
SITE_ID="$SITE_NAME-$PROJECT_ID"

echo -e "${YELLOW}プロジェクトID:${NC} $PROJECT_ID"
echo -e "${YELLOW}サイト名:${NC} $SITE_NAME"
echo -e "${YELLOW}サイトID:${NC} $SITE_ID"
echo ""

# Firebase CLIの確認
if ! command -v firebase &> /dev/null; then
  echo -e "${RED}❌ Firebase CLIがインストールされていません${NC}"
  echo ""
  echo "インストール方法:"
  echo "  npm install -g firebase-tools"
  exit 1
fi

# ログイン確認
echo -e "${YELLOW}[1/4] Firebase認証を確認中...${NC}"
if ! firebase projects:list &> /dev/null; then
  echo -e "${YELLOW}ログインが必要です${NC}"
  firebase login
fi
echo -e "${GREEN}✅ 認証済み${NC}"
echo ""

# プロジェクト設定
echo -e "${YELLOW}[2/4] プロジェクトを設定中...${NC}"
firebase use $PROJECT_ID
echo -e "${GREEN}✅ プロジェクトを設定しました${NC}"
echo ""

# サイト作成
echo -e "${YELLOW}[3/4] Hostingサイトを作成中...${NC}"
echo ""

firebase hosting:sites:create $SITE_ID

if [ $? -ne 0 ]; then
  echo -e "${YELLOW}⚠️  サイトが既に存在する可能性があります${NC}"
fi

echo ""
echo -e "${GREEN}✅ サイトを作成しました${NC}"
echo ""

# ターゲット設定
echo -e "${YELLOW}[4/4] ターゲットを設定中...${NC}"

firebase target:apply hosting $SITE_NAME $SITE_ID

echo -e "${GREEN}✅ ターゲットを設定しました${NC}"
echo ""

# 完了メッセージ
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 サイト追加完了！${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}次のステップ:${NC}"
echo ""
echo "1. firebase.json にサイト設定を追加:"
echo ""
echo '   "hosting": ['
echo '     {'
echo '       "target": "'$SITE_NAME'",'
echo '       "public": "out",'
echo '       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],'
echo '       "rewrites": [{"source": "**", "destination": "/index.html"}]'
echo '     }'
echo '   ]'
echo ""
echo "2. デプロイ:"
echo "   firebase deploy --only hosting:$SITE_NAME"
echo ""
echo "3. サイトURL:"
echo "   https://$SITE_ID.web.app"
echo ""
