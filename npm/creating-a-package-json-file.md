# package.json の作成方法（要約）

`package.json` は、npm パッケージの設定・依存関係・バージョン情報などを管理する重要なファイルです。  
npm レジストリに公開する際には必須となります。

---

## 🎯 主な役割

- プロジェクトの依存パッケージを一覧化する  
- 使用可能なバージョン範囲を定義する（セマンティックバージョニングに準拠）  
- ビルドの再現性を高め、他の開発者と共有しやすくする  

💡 npm サイトで見つけやすくするため、`description` を入れておくと便利です。

---

## 📦 主要フィールド

- **name（必須）**：パッケージ名。小文字で、スペース不可。ハイフン・ドット・アンダースコアは使用可能。  
- **version（必須）**：形式は「x.x.x」。セマンティックバージョニングに従う。  
- **author（任意）**：作者名や連絡先（例：Your Name <email@example.com> (https://example.com)）。

---

## 🪄 作成方法

### 1. 対話形式で作成  
コマンドラインでプロジェクトディレクトリに移動し、「npm init」を実行。  
質問に答えると自動的に package.json が生成されます。

### 2. 自動生成（質問なし）  
「npm init --yes」または「npm init -y」を実行すると、  
ディレクトリ情報をもとにデフォルト設定で作成されます。  
デフォルトでは name がディレクトリ名、version が 1.0.0 などが自動入力されます。

---

## ⚙️ デフォルト設定のカスタマイズ

init コマンドで使用する初期値は変更可能です。  
たとえば次のように設定できます：

- 「npm set init-author-name "your_name"」  
- 「npm set init-author-email "you@example.com"」  
- 「npm set init-license "MIT"」

---

📖 詳細: [npm init 公式ドキュメント](https://docs.npmjs.com/cli/v10/commands/npm-init)
