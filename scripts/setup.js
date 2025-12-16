const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

// 設定ファイルの保存場所
const CONFIG_DIR = path.join(os.homedir(), '.cardconnect');
const CONFIG_FILE = path.join(CONFIG_DIR, 'settings.json');

// 質問用のインターフェース
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 質問関数
function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// メイン処理
async function main() {
  console.log('🚀 CardConnect セットアップ\n');
  
  try {
    // 既存設定を確認
    const configs = loadConfigs();
    
    if (configs.length > 0) {
      console.log('以前の設定が見つかりました：');
      configs.forEach((config, index) => {
        console.log(`  ${index + 1}. ${config.name} (${config.projectId})`);
      });
      console.log('');
      
      const useExisting = await question('既存の設定を使用しますか？ (y/n): ');
      
      if (useExisting.toLowerCase() === 'y') {
        const selectedIndex = await question('番号を選択してください: ');
        const index = parseInt(selectedIndex) - 1;
        
        if (index >= 0 && index < configs.length) {
          const selected = configs[index];
          applyConfig(selected);
          console.log('\n✅ 設定を適用しました！');
          console.log('npm run dev で起動できます\n');
          rl.close();
          return;
        } else {
          console.log('無効な番号です。新規設定を作成します。\n');
        }
      }
    }
    
    // 新規設定
    await createNewConfig();
    
  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// 新規設定を作成
async function createNewConfig() {
  console.log('新しい設定を作成します\n');
  
  const name = await question('設定名（例: A社本番環境）: ');
  const projectId = await question('Firebase Project ID: ');
  
  // Project IDの形式チェック
  if (!/^[a-z0-9-]+$/.test(projectId)) {
    throw new Error('Project IDは英小文字、数字、ハイフンのみ使用できます');
  }
  
  const config = {
    name: name || projectId,
    projectId: projectId,
    apiKey: 'auto-generated',
    authDomain: `${projectId}.firebaseapp.com`,
    storageBucket: `${projectId}.appspot.com`,
    messagingSenderId: 'auto',
    appId: 'auto',
    createdAt: new Date().toISOString()
  };
  
  applyConfig(config);
  
  const save = await question('\nこの設定を保存しますか？ (y/n): ');
  
  if (save.toLowerCase() === 'y') {
    saveConfig(config);
    console.log('✅ 設定を保存しました！');
  }
  
  console.log('\nnpm run dev で起動できます\n');
}

// 設定を適用（.env.local作成）
function applyConfig(config) {
  const envContent = `# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=${config.apiKey}
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${config.authDomain}
NEXT_PUBLIC_FIREBASE_PROJECT_ID=${config.projectId}
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${config.storageBucket}
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${config.messagingSenderId}
NEXT_PUBLIC_FIREBASE_APP_ID=${config.appId}
`;
  
  fs.writeFileSync('.env.local', envContent);
  console.log('📝 .env.local を作成しました');
}

// 設定を読み込み
function loadConfigs() {
  if (!fs.existsSync(CONFIG_FILE)) {
    return [];
  }
  
  try {
    const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.warn('⚠️  設定ファイルの読み込みに失敗しました');
    return [];
  }
}

// 設定を保存
function saveConfig(config) {
  // ディレクトリ作成
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
  
  // 既存設定を読み込み
  const configs = loadConfigs();
  
  // 重複チェック
  const existingIndex = configs.findIndex(c => c.projectId === config.projectId);
  if (existingIndex >= 0) {
    // 既存の設定を更新
    configs[existingIndex] = config;
  } else {
    // 新規追加
    configs.push(config);
  }
  
  // 保存
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(configs, null, 2));
}

// 実行
main();
