# TrailFusion AI ホームページ

## 📋 概要

TrailFusion AIのアプリコレクションを紹介するレスポンシブなホームページです。5つのアプリ（GPティーチャーズ、森のウッドゴーレム、ワードブラスター、論破王、ハッキングタイマー）の情報を動的に切り替えて表示します。

## 📁 ファイル構成

```
myhomepage/
├── index.html              # メインのホームページ
├── style.css               # スタイルシート（削除済み、index.html内に統合）
├── script.js               # JavaScript（削除済み、index.html内に統合）
├── test-images.html        # 画像表示テスト用ページ
├── image-diagnostic.html   # 画像診断ツール
├── images/                 # 画像ファイルディレクトリ
│   ├── logo.PNG           # ロゴファイル
│   ├── gpt_*.jpg          # GPティーチャーズ関連画像
│   ├── wg_*.png           # 森のウッドゴーレム関連画像
│   ├── wb_*.jpg           # ワードブラスター関連画像
│   ├── ronpa_*.jpg        # 論破王関連画像
│   └── ht_*.png           # ハッキングタイマー関連画像
└── README.md              # このファイル
```

## 🖼️ 画像表示問題の解決

### 問題の原因

1. **存在しない画像ファイル**: `wb_hero_main.jpg` が参照されているが実際には存在しない
2. **Live Serverでの相対パス問題**: 環境によって画像パスの解決方法が異なる
3. **ファイル名の大文字小文字**: `logo.PNG` など、大文字小文字の違い

### 解決済みの修正

1. **画像パスの修正**:
   - 存在しない `wb_hero_main.jpg` を `wb_level_select.jpg` に変更
   - 実際に存在するファイルのみを参照

2. **エラーハンドリングの追加**:
   - 画像読み込み失敗時の自動フォールバック
   - 拡張子の自動変換（.jpg ↔ .png ↔ .jpeg）
   - 詳細なデバッグログ出力

3. **Live Server対応**:
   - 相対パスの正規化処理
   - 環境検出とパス調整

## 🚀 使用方法

### 1. 基本的な表示

```bash
# Live Serverを使用（推奨）
# VS Codeの Live Server 拡張機能を使用
# または
npx live-server

# Python HTTP サーバーを使用
python -m http.server 8000
# または
python3 -m http.server 8000
```

### 2. 画像表示のテスト

1. **基本テスト**: `test-images.html` を開いて個別の画像読み込み状況を確認
2. **詳細診断**: `image-diagnostic.html` を開いて環境情報と推奨解決策を確認

### 3. デバッグ方法

ブラウザの開発者ツール（F12）のコンソールで以下の情報を確認：

```javascript
// 画像読み込み状況
console.log('画像の総数:', document.querySelectorAll('img').length);

// 現在の環境
console.log('現在のURL:', window.location.href);
console.log('ベースURL:', window.location.origin);
```

## 🔧 トラブルシューティング

### Live Serverで画像が表示されない場合

1. **ワークスペースルートの確認**:
   - Live Serverがプロジェクトのルートディレクトリから起動されているか確認
   - `index.html` と `images/` フォルダが同じ階層にあることを確認

2. **キャッシュのクリア**:
   ```
   Ctrl+Shift+R (Windows/Linux)
   Cmd+Shift+R (Mac)
   ```

3. **ファイル名の確認**:
   - 大文字小文字が正確に一致しているか確認
   - 拡張子（.jpg, .jpeg, .png）が正しいか確認

### ファイルシステムで直接開く場合

1. **HTTPサーバーの使用を推奨**:
   - `file://` プロトコルではセキュリティ制限により一部機能が制限される
   - Live ServerやPython http.serverを使用

2. **相対パスの使用**:
   - 絶対パスは避け、相対パス（`images/filename.jpg`）を使用

## 🎨 機能

- **レスポンシブデザイン**: モバイル、タブレット、デスクトップに対応
- **アプリ切り替え**: 5つのアプリ情報を動的に切り替え
- **多言語対応**: 日本語、英語、中国語など9言語に対応
- **アニメーション**: AOS（Animate On Scroll）ライブラリを使用
- **画像最適化**: 自動エラーハンドリングと代替画像表示

## 📱 対応ブラウザ

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🔄 更新履歴

### v1.2.0 (最新)
- 画像表示問題の修正
- Live Server対応の改善
- エラーハンドリングの強化
- 診断ツールの追加

### v1.1.0
- 多言語対応の実装
- アプリ切り替え機能の追加

### v1.0.0
- 初期リリース

## 📞 サポート

画像表示に関する問題が解決しない場合：

1. `image-diagnostic.html` を実行して診断結果を確認
2. ブラウザのコンソールログを確認
3. ファイル構造とパスを再確認

## 📄 ライセンス

© 2025 TrailFusion AI. All rights reserved. 