#!/bin/bash

# ========================================
# Firebase Hosting 初期化スクリプト
# ========================================
# 使い方: ./scripts/init-hosting.sh <project-id> [site-name]
# 例: ./scripts/init-hosting.sh client-a cardconnect
# ========================================

set -e

# カラー定義
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🔥 Firebase Hosting 初期化${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 引数チェック
if [ $# -lt 1 ]; then
  echo -e "${RED}❌ エラー: プロジェクトIDを指定してください${NC}"
  echo ""
  echo "使い方: ./scripts/init-hosting.sh <project-id> [site-name]"
  echo "例: ./scripts/init-hosting.sh client-a cardconnect"
  exit 1
fi

PROJECT_ID=$1
SITE_NAME=${2:-"main"}

echo -e "${YELLOW}プロジェクトID:${NC} $PROJECT_ID"
echo -e "${YELLOW}サイト名:${NC} $SITE_NAME"
echo ""

# Firebase CLIの確認
if ! command -v firebase &> /dev/null; then
  echo -e "${RED}❌ Firebase CLIがインストールされていません${NC}"
  echo ""
  echo "インストール方法:"
  echo "  npm install -g firebase-tools"
  exit 1
fi

echo -e "${GREEN}✅ Firebase CLIを検出しました${NC}"
echo ""

# Firebase ログイン確認
echo -e "${YELLOW}[1/5] Firebase認証を確認中...${NC}"
if ! firebase projects:list &> /dev/null; then
  echo -e "${YELLOW}ログインが必要です${NC}"
  firebase login
fi
echo -e "${GREEN}✅ 認証済み${NC}"
echo ""

# プロジェクト設定
echo -e "${YELLOW}[2/5] プロジェクトを設定中...${NC}"

# .firebasercの作成
cat > .firebaserc << EOF
{
  "projects": {
    "default": "$PROJECT_ID"
  }
}
EOF

echo -e "${GREEN}✅ .firebaserc を作成しました${NC}"
echo ""

# firebase.jsonの確認・更新
echo -e "${YELLOW}[3/5] firebase.json を確認中...${NC}"

if [ ! -f "firebase.json" ]; then
  echo -e "${YELLOW}firebase.json が存在しないため作成します${NC}"
  cat > firebase.json << 'EOF'
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "storage": {
    "rules": "storage.rules"
  }
}
EOF
fi

echo -e "${GREEN}✅ firebase.json を確認しました${NC}"
echo ""

# next.config.tsの確認
echo -e "${YELLOW}[4/5] next.config.ts を確認中...${NC}"

if grep -q "output.*export" next.config.ts 2>/dev/null; then
  echo -e "${GREEN}✅ output: 'export' が設定されています${NC}"
else
  echo -e "${YELLOW}⚠️  next.config.ts に output: 'export' の設定がありません${NC}"
  echo -e "${YELLOW}   静的エクスポートが必要な場合は手動で追加してください${NC}"
fi
echo ""

# 環境変数の確認
echo -e "${YELLOW}[5/5] 環境変数を確認中...${NC}"

if [ ! -f ".env.local" ]; then
  echo -e "${YELLOW}⚠️  .env.local が存在しません${NC}"
  echo ""
  echo "環境変数を設定してください:"
  echo "  node scripts/setup.js"
else
  echo -e "${GREEN}✅ .env.local が存在します${NC}"
fi
echo ""

# 完了メッセージ
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 初期化完了！${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}次のステップ:${NC}"
echo ""
echo "1. 環境変数を設定（まだの場合）:"
echo "   node scripts/setup.js"
echo ""
echo "2. ビルド＆デプロイ:"
echo "   ./scripts/deploy.sh"
echo ""
echo "3. または手動デプロイ:"
echo "   npm run build"
echo "   firebase deploy --only hosting"
echo ""
