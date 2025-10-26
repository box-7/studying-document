
# npm-install
https://docs.npmjs.com/cli/v11/commands/npm-install


# npm install の概要（重要ポイント要約）

`npm install` は、**パッケージと依存関係をインストールするコマンド**です。  
Node.js プロジェクトで最も頻繁に使われる基本操作です。

---

## 🧩 基本構文

npm install [パッケージ名]

引数なしの場合は、`package.json` に記載されたすべての依存パッケージをインストールします。

---

## 📦 主な使い方

- `npm install`  
  → 現在のプロジェクトの依存パッケージをまとめてインストール  
- `npm install パッケージ名`  
  → 特定パッケージをインストール  
- `npm install -g パッケージ名`  
  → グローバルにインストール（全プロジェクトで利用可）

---

## 💾 依存関係の保存オプション

- `--save-prod`（デフォルト）：本番依存（`dependencies`）に保存  
- `--save-dev`：開発依存（`devDependencies`）に保存  
- `--save-optional`：任意依存（`optionalDependencies`）に保存  
- `--no-save`：`package.json` に保存しない  

---

## ⚙️ よく使うオプション

- `--production`：開発用依存を除いてインストール  
- `--save-exact`：バージョンを固定して保存（例：1.0.0）  
- `--dry-run`：実行せずに処理内容だけ確認  
- `--ignore-scripts`：インストール後スクリプトを実行しない  

---

## 🌐 インストール元の指定方法

- npmレジストリから  
  （例）react@18.3.0  
- ローカルフォルダから  
  （例）./package  
- URL や Git リポジトリから  
  （例）github:user/repo  

---

## 🧠 基本動作

1. `package.json` の依存関係を読み取る  
2. 依存パッケージを `node_modules` に展開  
3. 必要に応じて `package-lock.json` を更新  

---

## 🔍 関連コマンド

- `npm update`：パッケージを更新  
- `npm uninstall`：削除  
- `npm audit`：脆弱性をチェック  
- `npm link`：ローカルパッケージをリンク  

---

📖 詳細: [npm install 公式ドキュメント](https://docs.npmjs.com/cli/v10/commands/npm-install)
