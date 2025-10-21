# Node 開発環境の設定
https://developer.mozilla.org/ja/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/development_environment

Express の目的が理解できたので、Windows、Linux (Ubuntu)、および macOS 上で Node/Express 開発環境をセットアップしてテストする方法を説明します。どのような一般的な OS を使用していても、この記事では Express アプリケーションの開発を開始するために必要なものを提供します。

前提条件:	端末/コマンドラインを開く方法を知っていること。開発用コンピューターの OS にソフトウェアパッケージをインストールする方法を知っていること。  
目的:	コンピューター上に Express 用の開発環境をセットアップします。



# Express 開発環境概要
Node と Express のおかげで、ウェブアプリケーションの開発を始めるためにコンピューターをセットアップすることが非常に簡単になります。この節では必要なツールの概要、Ubuntu、macOS、および Windows に Node (および Express) をインストールするための最も簡単な方法について説明し、インストールをテストする方法を示します。

**自分メモ**  
NodeとExpressを使えば、Webアプリ開発の環境構築が簡単にできる。
この節では、必要なツールの紹介と、Ubuntu・macOS・Windowsへのインストール手順、および動作確認方法を説明する。

### Express 開発環境とは何か?
Express 開発環境には Nodejs、npm パッケージマネージャー、および (オプションで) ローカルコンピューターに Express Application Generator がインストールされています。

Node と npm パッケージマネージャーは、準備されたバイナリーパッケージ、インストーラー、オペレーティングシステムのパッケージマネージャー、またはソースから一緒にインストールされます (次の節を参照)。 Express は、npm によって、個々の Express ウェブアプリケーションの依存関係として (テンプレートエンジン、データベースドライバー、認証ミドルウェア、静的ファイルを提供するためのミドルウェアなどの他のライブラリーと共に) インストールされます。

npm は MVC パターンに従ったスケルトンの Express ウェブアプリケーションを作成するための便利なツールである Express Application Generator を (グローバルに) インストールするためにも使用できます。Express を使用するアプリを作成したり、同じアーキテクチャ上のレイアウトや依存関係を持つ Express アプリを構築したりするためにこのツールを使用する必要はないため、アプリケーションジェネレーターはオプションです。ただし、使い始めるのがはるかに簡単になり、モジュール式のアプリケーション構造が促進されるため、これを使用します。

メモ: 他のウェブフレームワークとは異なり、開発環境には独立した開発用のウェブサーバーは含まれていません。Node/Express では、ウェブアプリケーションが独自のウェブサーバーを作成して実行します。

テキストエディターやコード編集用の IDE、コードの異なるバージョンを安全に管理するための Git などのソース管理マネジメントツールなど、一般的な開発環境の一部である他の周辺ツールもあります。これらの種類のツール (特にテキストエディター) が既にインストールされていると仮定しています。


**自分メモ**  
Express 開発環境には、Node.js と npm が必須で、オプションで Express Application Generator を使って MVC 構造のスケルトンアプリを簡単に作れる。
Express は npm を通じて、テンプレートエンジンやデータベースドライバーなどの依存ライブラリとともにインストールされる。
Node/Express 自体がウェブサーバーを兼ねるため、独立した開発用サーバーは不要。
開発にはテキストエディターや IDE、Git などの一般的なツールも利用される。

開発中は Node/Express 単体で十分。本番環境では nginx や Apache を前段に置くのが一般的

本番環境では本番サーバーで nginx や Apache を使うことは多い  
理由は：
- リバースプロキシとして Node アプリにリクエストを渡す
- ポート80/443で待ち受けて、Node は内部の3000番などで動かす
- 静的ファイルの高速配信
- SSL/TLS（HTTPS）終端
- 負荷分散やキャッシュ

### どのオペレーティングシステムがサポートされていますか？
Node は Windows、macOS、Linux の多くの「フレーバー」、Docker などで実行できます (nodejs のダウンロードページに完全なリストがあります)。ほとんどのパーソナルコンピューターは開発中に Node を実行するのに必要な性能を持っているはずです。Express は Node 環境で実行されるため、Node を実行する任意のプラットフォームで実行できます。

この記事では Windows、macOS、および Ubuntu Linux のセットアップ手順を説明します。

**自分メモ**  
Node.js は Windows・macOS・Linux などほとんどの環境で動くので、Express も同じ環境で動かせる。この記事では、その中でも特に一般的な Windows・macOS・Ubuntu Linux のセットアップ方法を解説する


### どのバージョンの Node/Express を使用すべきか
たくさんの Node のリリースがあります - 新しいリリースにはバグ修正、ECMAScript (JavaScript) 標準のより最新のバージョンのサポート、そして Node API の改良が含まれています。

一般的には最新の LTS (長期サポート) リリースを使用するべきです。比較的最新の機能を持ちながら (そして現在も積極的にメンテナンスされています)、"最新の" リリースより安定しているからです。LTS バージョンに存在しない機能が必要な場合は、最新版リリースを使用してください。

Express は常に最新のバージョンを使うべきです。

データベースやその他の依存関係について
データベースドライバー、テンプレートエンジン、認証エンジンなどのその他の依存関係はアプリケーションの一部であり、npm パッケージマネージャーを使用してアプリケーション環境にインポートされます。それらについては、後のアプリ固有の記事で説明します。

**自分メモ**  
Node は 安定性とサポートの面から最新の LTS（長期サポート）版 を使うのが推奨。
Express は常に 最新バージョン を使用すべき。
データベースドライバーやテンプレートエンジンなどの依存ライブラリは、npm を使ってプロジェクトにインポートする。


# Node のインストール
Express を使用するには、 Nodejs と Node Package Manager (npm) をオペレーティングシステムにインストールする必要があります。 これを簡単にするために、最初に node バージョンマネージャをインストールし、それを使用して最新の LTS(Long Term Supported) バージョンの node と npm をインストールします。

メモ:>https://nodejs.org/en/ で提供されているインストーラーを使って nodejs と npm をインストールすることもできます（「ほとんどのユーザーに推奨」されている LTS ビルドをダウンロードするボタンを選択します）。また、お使いの OS のパッケージマネージャーを使用してインストールする こともできます。 node バージョンマネージャを使用することを強く推奨します。バージョンマネージャを使用することで、 node と npm の具体的なバージョンのインストール、アップグレード、切り替えが簡単になります。

**自分メモ**  
Express を使うには Node.js と npm をインストールする必要がある。
推奨は Node バージョンマネージャー（nvm など）を使う方法 で、これにより Node と npm のバージョン管理や切り替えが簡単になる。
もちろん公式サイトのインストーラーや OS のパッケージマネージャーでもインストール可能だが、バージョン管理の面からバージョンマネージャーが強く推奨される。


### Windows
Windows 用の node バージョン管理ツールは数多くあります。 ここでは、node 開発者の間で高く評価されている nvm-windows を使用します。

nvm-windows/releases ページから任意のインストーラーを使用して最新バージョンをインストールします。 nvm-windows がインストールされたら、コマンドプロンプト（または PowerShell）を開き、以下のコマンドを入力して最新の LTS バージョンの nodejs と npm をダウンロードします。

bash
```
nvm install lts
```
執筆時点での nodejs の LTS バージョンは 20.11.0 です。 下記コマンドで使用する現在のバージョンとして設定することができます。

bash
```
nvm use 20.11.0
```
メモ: 「アクセス拒否」の警告が表示される場合は、管理者権限でこのコマンドをプロンプトで実行する必要があります。

コマンド nvm --help を使用して、利用できるすべてのノードのバージョンやダウンロードした NVM のバージョンの一覧など、他にもコマンドラインオプションを探すことができます。


**自分メモ**  

- 推奨ツール：**nvm-windows**
- 手順：
  1. nvm-windows をインストーラーからインストール
  2. コマンドプロンプトまたは PowerShell を開く
  3. 最新 LTS バージョンの Node.js と npm をインストール
     ```bash
     nvm install lts
     nvm use 20.11.0  # 執筆時点の LTS 例
     ```
  4. 「アクセス拒否」などの警告が出た場合は管理者権限で実行
  5. `nvm --help` で利用可能な Node バージョンやオプションを確認可能
- nvm を使うことで Node と npm のバージョン管理や切り替えが簡単になる


### Ubuntu および macOS
Ubuntu や macOS 用のノードバージョン管理ツールはいくつもあります。 nvmはより人気のあるものの 1 つで、 nvm-windows の元になったバージョンです。 nvm の最新バージョンをインストールする端末の手順については nvm > Install & Update Script を参照してください。

nvm がインストールされたら、端末を開いて以下のコマンドを入力し、最新の LTS バージョンの nodejs と npm をダウンロードしてください。

bash
```
nvm install --lts
```
執筆時点での nodejs の LTS バージョンは 20.11.0 です。 コマンド nvm list はダウンロードしたバージョンと現在のバージョンを設定します。 下記コマンドで特定のバージョンを現在のバージョンとして設定することができます（nvm-windows の場合と同じです）。

bash
```
nvm use 20.11.0
```
他にもコマンドラインオプションを探すには nvm --help コマンドを使用します。 これらは nvm-windows が提供するものと似ているか、同じであることが多いです。

### Nodejs および npm インストールのテスト
特定のノードバージョンを使用するように nvm を設定したら、インストールをテストすることができます。 これを行うための良い方法は、端末やコマンドプロンプトで "version" コマンドを使用し、期待するバージョンの文字列を返すか調べることです。

bash
```
> node -v
v20.11.0
```
Nodejs パッケージマネージャー npm もインストールされているはずで、同じ方法でテストできます。

bash
```
> npm -v
10.2.4
```
もう少し刺激的なテストとして、ブラウザーで正しい URL にアクセスしたときにブラウザーに単純に "Hello World" を出力する、とても基本的な "純粋な Node" サーバーを作成しましょう。

次のテキストを hellonode.js というファイルにコピーします。これは純粋な Node の機能を使用します（Express からは何もしません）。

js
```
//HTTP モジュールを読み込む
const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;
```
//HTTP サーバーを作成し、3000 番ポートでリクエストを待機します。
```
const server = http.createServer((req, res) => {
  //HTTP ステータスとコンテンツタイプを持つ応答 HTTP ヘッダーを設定します。
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

//3000 番ポートでリクエストを待機し、受信したときにログ出力するコールバック関数
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
このコードは "http" モジュールをインポートし、それを使用して 3000 番ポートで HTTP リクエストを待機するサーバーを作成 (createServer()) します。次に、スクリプトはサーバーをテストするために使用できるブラウザー URL についてのメッセージをコンソールに出力します。 createServer() 関数は、HTTP リクエストを受信したときに呼び出されるコールバック関数を引数として取ります。これは HTTP ステータスコード 200 ("OK") とプレーンテキスト "Hello World" のレスポンスを返します。

メモ: このコードが何をしているのか正確に理解できなくても心配しないでください。Express を使い始めたら、コードについて詳しく説明します。

コマンドプロンプトで hellonode.js ファイルと同じディレクトリーに移動し、次のようにスクリプト名とともに node を呼び出してサーバーを起動します。

bash

```
node hellonode.js
```
サーバーが起動すると、サーバーが動作している IP アドレスを示すコンソール出力が表示されます。
```
Server running at http://127.0.0.1:3000/
```
http://127.0.0.1:3000 の URL に移動します。すべてがうまくいったら、ブラウザーは単に文字列 "Hello World" を表示するはずです。

# npm の使用
Node 自体の次に、npm は Node アプリケーションを操作するための最も重要なツールです。 npm は、アプリケーションが開発、テスト、運用に必要なパッケージ（JavaScript ライブラリー）を取得するために使用されます。また、開発プロセスで使用されるテストやツールを実行するために使用されることもあります。

メモ: Node の観点からすると、Express は npm を使用してインストールしてから独自のコードで必要とするもう 1 つのパッケージです。

手動で npm を使用して、必要な各パッケージを別々に取り出すことができます。通常、代わりに package.json というプレーンテキストの定義ファイルを使用して依存関係を管理します。このファイルにはパッケージの名前、バージョン、説明、実行する初期ファイル、プロダクション依存関係、開発依存関係、それが動作可能な Node のバージョンなど、特定の JavaScript "package" に対するすべての依存関係が一覧表示されます。package.json ファイルには、npm がアプリケーションを取得して実行するために必要なものがすべて含まれている必要があります (再利用可能なライブラリーを作成している場合は、この定義を使用してパッケージを npm リポジトリーにアップロードし、他のユーザーが利用できるようにします)。



**自分メモ**  
- Node と npm のバージョン確認でインストールをテスト
- 簡単な HTTP サーバーで Node が正しく動作するか確認
- npm は依存パッケージ管理の中心ツールであり、Express も npm でインストール


### 依存関係の追加
次の手順では npm を使用してパッケージをダウンロードし、それをプロジェクトの依存関係に保存してから、それを Node アプリケーションで要求する方法を示します。

メモ: ここでは Express パッケージを取得してインストールするための手順を示します。後で、このパッケージなどが Express Application Generator を使用してすでにどのように指定されているかを示します。この節は npm がどのように機能するのか、および Application Generator によって何が作成されているのかを理解するのに役立ちます。

まず、新しいアプリケーション用のディレクトリーを作成し、そこに移動します。

bash
```
mkdir myapp
cd myapp
```
アプリケーション用の package.json ファイルを作成するには、npm init コマンドを使用します。このコマンドはアプリケーションの名前とバージョン、初期エントリーポイントファイルの名前（既定では index.js）など、さまざまなことを要求します。今のところ、既定値をそのまま使用します。

bash

```
npm init
```
package.json ファイル (cat package.json) を表示すると、受け入れた既定値が表示され、最後にライセンスが表示されます。

json
```
{
  "name": "myapp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
myapp ディレクトリーに Express をインストールし、それをあなたの package.json ファイルの依存関係リストに保存してください。

bash

```
 npm install express
 ```
package.json の依存関係節が package.json ファイルの最後に表示され、Express が含まれます。

json

```
{
  "name": "myapp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```
Express ライブラリーを使用するには、 require() 関数を index.js ファイルで呼び出し、アプリケーションに含めます。 これで、このファイルを "myapp" アプリケーションディレクトリーのルートに作成し、以下の内容を与えます。

js

```
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
```
このコードは、最小限の "HelloWorld" Express ウェブアプリケーションを示しています。 これは "express" モジュールをインポートし、それを使用して 3000 番ポートで HTTP リクエストを待機するサーバー (app) を作成し、サーバーをテストするために使用できるブラウザー URL を説明するメッセージをコンソールに出力します。 app.get() 関数は、指定された URL パス ('/') で HTTP の GET リクエストにのみ応答します。この場合、関数を呼び出して Hello World! メッセージを送信します。

メモ: `Example app listening on port ${port}!` の逆引用符で、$port の値を文字列に埋め込みます。

コマンドプロンプトでスクリプトを使用して node を呼び出すことでサーバーを起動できます。

bash
```
node index.js
```
以下のようなコンソール出力が表示されます。
```
Example app listening on port 3000
```
URL http://localhost:3000/ に移動します。 すべてがうまくいったら、ブラウザーは単に文字列 "Hello World!" を表示するはずです。


**自分メモ**  
- npm は依存パッケージ管理の中心
- Express も npm で追加して利用
- package.json で依存関係を一元管理


### 開発の依存関係
依存関係が開発中にのみ使用される場合は、代わりに「開発依存関係」として保存する必要があります（パッケージユーザーが本番環境にインストールする必要がないようにするため）。たとえば、一般的な JavaScript Linting ツールの ESLint を使用するには、次のように npm を呼び出します。

bash

```
npm install eslint --save-dev
```
次の項目がアプリケーションの package.json に追加されます。

json

```
  "devDependencies": {
    "eslint": "^7.10.0"
  }
```
メモ: 「リンター」は一連のコーディングのベストプラクティスに準拠しているかどうかを認識して報告するために、ソフトウェアで静的分析を実行するツールです。

### タスクの実行
依存関係の定義と取得に加えて、package.json ファイルに名前付きスクリプトを定義し、npm を呼び出してそれらを run-script コマンドで実行することもできます。このアプローチは、実行中のテストや開発の一部を自動化したり、ツールチェーン (たとえば JavaScript の縮小、画像の縮小、コードの LINT/分析などのツールの実行) を構築したりするためによく使用されます。

メモ: Gulp や Grunt のようなタスクランナーもテストや他の外部ツールを実行するために使うことができます。

たとえば、前の節で指定した eslint 開発依存関係を実行するためのスクリプトを定義するには、次のスクリプトブロックを package.json ファイルに追加します (アプリケーションソースが /src/js フォルダーにあると仮定します)。

json

```
"scripts": {
  // …
  "lint": "eslint src/js"
  // …
}
```
もう少し詳しく説明すると、eslint src/js は、app ディレクトリー内の src/js ディレクトリーに含まれる JavaScript ファイルに対して eslint を実行するために terminal/command 行に入力できるコマンドです。アプリの package.json ファイル内に上記を含めると、このコマンドのショートカット - つまり lint が提供されます。

こうすれば、npm を使って eslint を実行することができます。

bash

```
npm run-script lint
# OR (using the alias)
npm run lint
```
この例は元のコマンドより短く見えないかもしれませんが、複数のコマンドのチェーンを含めて、npm スクリプト内にもっと大きなコマンドを含めることができます。一度にすべてのテストを実行する単一の npm スクリプトを指定できます。

# Express Application Generator のインストール
Express Application Generator ツールは Express アプリケーションの「スケルトン」を生成します。次に示すように、npm を使用してジェネレーターをインストールします。

bash

```
npm install express-generator -g
```
メモ: Ubuntu や macOS では、この行の接頭辞に sudo を付ける必要があるかもしれません。-g フラグを指定すると、ツールをグローバルにインストールして、どこからでも呼び出すことができます。

既定の設定で "helloworld" という名前の Express アプリを作成するには、作成する場所に移動して、図のようにアプリを実行します。

bash

```
express helloworld
```
メモ: 古いバージョン (< 8.2.0) の nodejs を使用していない限り、インストールをスキップしてnpx で express-generator を実行することもできます。 これはインストールしてから express-generator を実行するのと同じ効果がありますが、パッケージをシステムにインストールするわけではありません。

bash

```
npx express-generator helloworld
```
また、使用するテンプレートライブラリーや他にも多くの設定を指定することができます。 すべてのオプションを見るには help コマンドを使用してください。

bash

```
express --help
```
ジェネレーターは、コンソールにビルドの進行状況を表示しながら、現在の場所のサブフォルダーに新しい Express アプリを作成します。 完全に完了すると、ツールは Node 依存関係をインストールしてアプリを始めるには入力する必要があるコマンドを表示します。

新しいアプリには、ルートディレクトリーに package.json ファイルがあります。 これを開くと、Express やテンプレートライブラリー Jade など、インストールされている依存関係を確認できます。

json

```
{
  "name": "helloworld",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "morgan": "~1.9.1"
  }
}
```
次に示すように、npm を使用して helloworld アプリのすべての依存関係をインストールします。

bash

```
cd helloworld
npm install
```
次に、以下のようにアプリを実行します (コマンドは Windows と Linux/macOS で若干異なります)。

bash

```
# Windows のコマンドプロンプトで helloworld を実行
SET DEBUG=helloworld:* & npm start

# Windows の PowerShell で helloworld を実行
SET DEBUG=helloworld:* | npm start

# Linux/macOS で helloworld を実行
DEBUG=helloworld:* npm start
```
DEBUG コマンドは有用なロギングを作成し、その結果、以下に示すような出力が得られます。

bash

```
>SET DEBUG=helloworld:* & npm start

> helloworld@0.0.0 start D:\GitHub\expresstests\helloworld
> node ./bin/www

  helloworld:server Listening on port 3000 +0ms
```
ブラウザーを開いて http://localhost:3000/ に移動し、既定の Express ウェルカムページを表示します。

Express - 生成されたアプリの既定の画面

スケルトンアプリケーションの生成に関する記事にアクセスしたら、生成されたアプリについて詳しく説明します。

# まとめ
これで、Express ウェブアプリケーションを作成するために使用できる Node 開発環境がコンピューター上で稼働しています。また、npm を使用して Express をアプリケーションにインポートする方法、および Express Application Generator ツールを使用してアプリケーションを作成して実行する方法についても説明しました。

次の記事では、この環境と関連ツールを使って完全なウェブアプリケーションを構築するためのチュートリアルを始めます。

# 関連情報
ダウンロード ページ (nodejs.org)
パッケージマネージャを利用した Node.js のインストール (nodejs.org)
Express のインストール (expressjs.com)
Express Application Generator (expressjs.com)
Using Node.js with Windows subsystem for Linux (docs.microsoft.com)