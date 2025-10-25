# Vite の概要
https://vite.dev/guide/


Vite（フランス語で「速い」という意味、発音 /vit/、「veet」のように発音）は、**モダンなウェブプロジェクト向けに、より高速で軽量な開発体験を提供するビルドツール** です。  
主に以下の 2 つの部分で構成されています。

1. **開発サーバー**  
   ネイティブの ES モジュールに対して豊富な機能強化を提供します。  
   例：非常に高速な Hot Module Replacement (HMR) など。

2. **ビルドコマンド**  
   Rollup を使用してコードをバンドルし、**本番環境向けに最適化された静的アセット** を出力します。

Vite は意見のある設定（opinionated）で、**合理的なデフォルト設定** があらかじめ用意されています。  
可能な機能の詳細は [Features Guide](https://vitejs.dev/guide/features.html) を参照してください。  
フレームワークのサポートや他のツールとの統合は **プラグイン** を通じて可能です。  
Vite の設定方法は [Config Section](https://vitejs.dev/config/) に記載されています。

また、Vite は **Plugin API** や **JavaScript API** を通じて高度に拡張可能で、型情報もサポートされています。

Vite プロジェクトの背景や設計意図については [Why Vite](https://vitejs.dev/guide/why.html) を参照してください。

---

# ブラウザ対応

## 開発時
Vite は **モダンブラウザの使用を前提** としています。  
つまり、最新の JavaScript や CSS のほとんどの機能をサポートするブラウザです。  
そのため、Vite は transform ターゲットを `esnext` に設定し、**構文の変換を最小限に抑え、可能な限り元のソースに近い形でモジュールを提供** します。  
開発サーバーを動作させるためのランタイムコードも注入されます。これらのコードは、各メジャーリリース時点（例：2025-05-01）で利用可能な機能を使用しています。

**自分メモ**  
esnext とは、現在の最新の ECMAScript（JavaScript）の仕様に基づいた構文や機能 を指すターゲット


## 本番ビルド時
デフォルトでは、Vite は **少なくとも 2.5 年前にリリースされたブラウザ** を対象とします（Baseline Widely Available）。  
ターゲットブラウザは設定で下げることも可能です。  
また、公式プラグイン `@vitejs/plugin-legacy` を使うことで、**旧ブラウザのサポート** も可能です。  
詳細は [Building for Production](https://vitejs.dev/guide/build.html) を参照してください。

---

# Vite をオンラインで試す

Vite は **StackBlitz 上でオンラインで試すことが可能** です。  
ブラウザ上で Vite ベースのビルド環境を直接実行でき、**ローカル環境とほぼ同じ動作** ですが、マシンへのインストールは不要です。  

URL 例：`vite.new/{template}` で使用するフレームワークを選択できます。

### サポートされているテンプレートプリセット
（公式ドキュメント参照）


# Vite テンプレートプリセット一覧

| JavaScript | TypeScript |
|------------|------------|
| vanilla    | vanilla-ts |
| vue        | vue-ts     |
| react      | react-ts   |
| preact     | preact-ts  |
| lit        | lit-ts     |
| svelte     | svelte-ts  |
| solid      | solid-ts   |
| qwik       | qwik-ts    |



# Vite プロジェクトの初期設定（Scaffolding）

Vite プロジェクトを作成するには、npm、Yarn、pnpm、Bun、Deno などのパッケージマネージャーを使用できます。

まず、npm で新しい Vite プロジェクトを作成する場合は、次のコマンドを実行します。
```
npm create vite@latest
```

その後、表示されるプロンプトに従って設定を行います。

## 互換性に関する注意

Vite を使用するには Node.js バージョン 20.19 以上、または 22.12 以上が必要です。  
ただし、一部のテンプレートはさらに高い Node.js バージョンを必要とする場合があります。パッケージマネージャーが警告した場合はアップグレードしてください。

## プロジェクト名やテンプレートを指定する方法

プロジェクト名や使用するテンプレートをコマンドラインで直接指定することも可能です。  
例えば、Vite + Vue プロジェクトを作成する場合は次のように実行します。
```
npm create vite@latest my-vue-app -- --template vue
```
> npm 7 以降では、追加のダブルダッシュ `--` が必要です。

対応しているテンプレートは以下の通りです：
```
vanilla, vanilla-ts, vue, vue-ts, react, react-ts, react-swc, react-swc-ts, preact, preact-ts, lit, lit-ts, svelte, svelte-ts, solid, solid-ts, qwik, qwik-ts
```

プロジェクト名に `.` を指定すると、現在のディレクトリ内にプロジェクトを作成できます。




# Community Templates

`create-vite` は、人気のフレームワーク用の基本テンプレートから素早くプロジェクトを開始するためのツールです。  
他のツールと統合されている、または異なるフレームワーク向けのテンプレートは、[Awesome Vite](https://github.com/vitejs/awesome-vite) でコミュニティによって管理されています。

## GitHub のテンプレートをオンラインで試す

例えば、テンプレートが `https://github.com/user/project` にある場合、URL の `github` の後に `.stackblitz` を追加することで、ブラウザ上で直接試すことができます。

https://github.stackblitz.com/user/project

markdown


## degit を使ってプロジェクトを作成する方法

GitHub 上のプロジェクトをローカルにコピーして使用するには、`degit` を使用します。  
デフォルトブランチが `main` の場合、次のコマンドでプロジェクトを作成できます。
```
npx degit user/project#main my-project
cd my-project
npm install
npm run dev
```

# Manual Installation

プロジェクト内で Vite CLI をインストールするには、次のコマンドを実行します。  

npm を使う場合は   
`npm install -D vite`。  
Yarn、pnpm、Bun、Deno を使用しても同様にインストール可能です。

次に、プロジェクト内に `index.html` ファイルを作成します。内容の例としては、次のようになります。  

HTML 内に  
 `<p>Hello Vite!</p>`   
 と書きます。

準備ができたら、ターミナルで Vite CLI を実行します。  

npm の場合は   
`npx vite`  
Yarn、pnpm、Bun、Deno でも同様に CLI コマンドを使用できます。

すると、`index.html` が `http://localhost:5173` で提供されます。


# index.html and Project Root

Vite プロジェクトでは、`index.html` が `public` フォルダ内ではなく、プロジェクトのルートに配置されます。  
これは意図的で、開発中 Vite はサーバーとして動作し、`index.html` がアプリケーションのエントリーポイントになるためです。

Vite は `index.html` をソースコードの一部として扱い、モジュールグラフに組み込みます。  
`<script type="module" src="...">` の参照先の JavaScript コードを解決し、インラインの `<script type="module">` や `<link href>` で参照された CSS も Vite 特有の機能が適用されます。  
また、`index.html` 内の URL は自動的にリベースされるため、`%PUBLIC_URL%` のような特別なプレースホルダーは不要です。

Vite には、ファイルを提供する「ルートディレクトリ」という概念があります。  
ドキュメント内では `<root>` として参照されます。ソースコード内の絶対 URL はこのプロジェクトルートを基準に解決されるため、通常の静的サーバーで作業しているかのようにコーディングできます（ただし、Vite の方が遥かに強力です）。  
Vite はルート外のファイルシステム上の依存関係も扱えるため、モノレポ構成でも使用可能です。

また、Vite は複数の `.html` エントリーポイントを持つマルチページアプリケーションもサポートしています。

## Specifying Alternative Root

Vite を実行すると、現在の作業ディレクトリがルートとして開発サーバーが起動します。  
別のルートを指定する場合は `vite serve some/sub/dir` のように実行します。  
なお、Vite はプロジェクトルート内の設定ファイル（`vite.config.js` など）も解決するため、ルートを変更する場合は設定ファイルも移動する必要があります。

# Command Line Interface

Vite がインストールされているプロジェクトでは、`vite` バイナリを npm スクリプトで使用することも、`npx vite` で直接実行することもできます。  
スキャフォールドされた Vite プロジェクトのデフォルトの npm スクリプトは以下の通りです。

package.json 内では、

`"dev": "vite"` は開発サーバーを起動します。別名として `vite dev` や `vite serve` も使用可能です。  
`"build": "vite build"` は本番用にビルドします。  
`"preview": "vite preview"` は本番ビルドをローカルでプレビューします。

CLI オプションとして `--port` や `--open` などを指定することも可能です。  
使用可能な全ての CLI オプションは、プロジェクト内で `npx vite --help` を実行すると確認できます。



# Using Unreleased Commits

新しいリリースを待たずに最新機能を試したい場合は、特定の Vite コミットを https://pkg.pr.new からインストールできます。

npm、Yarn、pnpm、Bun のいずれかで、

npm install -D https://pkg.pr.new/vite@SHA

のように実行します。`SHA` は Vite の任意のコミット SHA に置き換えてください。ただし、1 ヶ月以内のコミットのみが有効で、古いコミットは削除されます。

あるいは、Vite リポジトリをローカルにクローンして、自分でビルドしてリンクする方法もあります（pnpm が必要です）。
```
git clone https://github.com/vitejs/vite.git  
cd vite  
pnpm install  
cd packages/vite  
pnpm run build  
pnpm link --global  // このステップでは使用したいパッケージマネージャーを使用
```

その後、Vite を使用しているプロジェクトに移動し、pnpm link --global vite（または使用したパッケージマネージャー）を実行します。  
これで開発サーバーを再起動すれば、最新の開発版 Vite を使うことができます。

## Dependencies using Vite

依存パッケージが使用する Vite のバージョンを置き換えたい場合は、npm overrides または pnpm overrides を使用します。

## Community

質問やサポートが必要な場合は、Discord や GitHub Discussions のコミュニティにアクセスしてください。





