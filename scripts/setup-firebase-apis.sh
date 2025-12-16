#!/bin/bash

# Firebase API一括有効化スクリプト
# Next.js + Firebase Hostingに必要な全APIを一括で有効化します

set -e

# 色付き出力
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔥 Firebase API一括有効化スクリプト"
echo ""

# プロジェクトIDを取得
if [ -z "$1" ]; then
  echo -e "${YELLOW}使い方: ./setup-firebase-apis.sh <project-id>${NC}"
  echo ""
  echo "例: ./setup-firebase-apis.sh my-project-stg"
  exit 1
fi

PROJECT_ID=$1

echo "プロジェクトID: $PROJECT_ID"
echo ""

# gcloudがインストールされているか確認
if ! command -v gcloud &> /dev/null; then
  echo -e "${RED}❌ gcloudコマンドが見つかりません${NC}"
  echo ""
  echo "Google Cloud SDKをインストールしてください："
  echo "https://cloud.google.com/sdk/docs/install"
  exit 1
fi

echo "✅ gcloudコマンドが見つかりました"
echo ""

# プロジェクトを設定
echo "📝 プロジェクトを設定中..."
gcloud config set project $PROJECT_ID

echo ""
echo "🔑 必要なAPIを有効化中..."
echo ""

# 必要なAPIのリスト
APIS=(
  "cloudfunctions.googleapis.com"      # Cloud Functions
  "cloudbuild.googleapis.com"          # Cloud Build
  "artifactregistry.googleapis.com"    # Artifact Registry
  "run.googleapis.com"                 # Cloud Run
  "firebaseextensions.googleapis.com"  # Firebase Extensions
  "eventarc.googleapis.com"            # Eventarc
  "pubsub.googleapis.com"              # Pub/Sub
  "cloudbilling.googleapis.com"        # Cloud Billing
  "firebase.googleapis.com"            # Firebase
  "firebasehosting.googleapis.com"     # Firebase Hosting
  "firestore.googleapis.com"           # Firestore
  "storage.googleapis.com"             # Cloud Storage
)

# 各APIを有効化
for api in "${APIS[@]}"; do
  echo -n "  • $api ... "
  if gcloud services enable $api --project=$PROJECT_ID 2>/dev/null; then
    echo -e "${GREEN}✓${NC}"
  else
    echo -e "${RED}✗${NC}"
    echo -e "${YELLOW}    警告: $api の有効化に失敗しました${NC}"
  fi
done

echo ""
echo -e "${GREEN}✅ API有効化が完了しました！${NC}"
echo ""
echo "⏱️  変更が反映されるまで5〜10分お待ちください"
echo ""
echo "次のステップ："
echo "  1. 10分待つ"
echo "  2. GitHub Secretsを設定"
echo "  3. GitHub Actionsを実行"
