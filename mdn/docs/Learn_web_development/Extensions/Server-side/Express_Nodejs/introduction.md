# Express/Node の紹介
[Express/Node の紹介](https://developer.mozilla.org/ja/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/Introduction)


# Node.jsの紹介

Node.jsはオープンソースでクロスプラットフォームなJavaScript実行環境。サーバーサイドのツールやアプリをJavaScriptで作れる。ブラウザー向けのAPIは省略されていて、HTTPやファイルシステムなどOSのAPIが使える。

## Node.jsのメリット

- パフォーマンスが高く、スループットやスケーラビリティに優れる。リアルタイムアプリにも強い。
- サーバーもクライアントもJavaScriptで書けるので、言語の切り替えが不要。
- JavaScriptは比較的新しい言語で、設計がモダン。他の言語（PythonやPHPなど）よりもメリットが多い。CoffeeScriptやTypeScriptなどもJavaScriptに変換できる。
- npmで大量の再利用可能なパッケージが使える。依存関係の解決も簡単で、ビルドツールの自動化にも使える。
- Windows、macOS、Linuxなど多くのOSで動く。多くのホスティングサービスがNode.js対応。
- 活発なコミュニティがあり、情報やサポートが豊富。
- NodeのHTTPパッケージで簡単にウェブサーバーが作れる。

# Hello Node.js

次の例では、http://127.0.0.1:8000/ であらゆるHTTPリクエストを待ち受けるウェブサーバーを作成する。リクエストが来ると "Hello World" という文字列でレスポンスする。

1. 端末を開く
2. プログラムを保存するフォルダー（例: test-node）を作成し、移動する  
   `cd test-node`
3. hello.js というファイルを作成し、以下のコードを貼り付ける
4. ファイルを保存したフォルダーで次のコマンドを実行  
`node hello.js`
5. ブラウザーで http://localhost:8000 にアクセスすると "Hello World" と表示される

````js
// HTTP モジュールの読み込み
const http = require("http");

const hostname = "127.0.0.1";
const port = 8000;

// HTTP サーバーを作成
const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World\n");
});

// サーバーにアクセスするための URL を出力
server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
````

# ウェブフレームワーク

- Node.jsだけでは、以下のような機能は直接サポートされていない
  - GETやPOSTなどのHTTPメソッドごとに処理を分ける
  - URLごとにリクエストを個別に処理する
  - 静的ファイルの提供
  - テンプレートを使った動的レスポンス生成
- これらを自分で実装するのは手間がかかる
- ウェブフレームワークを使えば、こうした機能を簡単に追加できて、車輪の再発明を避けられる


# Express の紹介

Expressは最も一般的なNodeウェブフレームワークで、多くの他のNodeフレームワークの基礎にもなっている。主な特徴は以下の通り。

- 異なるURLパス（ルート）やHTTPメソッドごとにリクエストハンドラーを作成できる
- テンプレートエンジンと統合し、データを挿入してレスポンスを生成できる
- ポート番号やテンプレートの場所など、ウェブアプリの設定値を柔軟に指定できる
- リクエスト処理の途中で「ミドルウェア」を追加できる

Express自体はシンプルだが、Cookieやセッション、ユーザーログイン、URL引数、POSTデータ、セキュリティヘッダーなど、ほぼすべてのウェブ開発課題に対応するミドルウェアパッケージが豊富にある。公式やサードパーティのミドルウェアリストも公開されている。

柔軟性が高い分、適切なミドルウェア選びやアプリの構造化は難しいこともある。ネット上のサンプルは最適でない場合も多いので注意が必要。

# Node と Express の歴史

- Node.jsは2009年にLinux向けに最初にリリースされた
- npmパッケージマネージャは2010年に登場
- ネイティブWindowsサポートは2012年に追加された
- 詳しく知りたい場合はWikipediaを参照

- Expressは2010年11月に最初にリリースされた
- 現在のAPIのメジャーバージョンは4
- 最新の変更点は更新履歴、詳細なリリースノートはGitHubで確認できる


# Node と Express の普及

- ウェブフレームワークの普及は、メンテナンス状況やドキュメント、アドオンライブラリ、サポート体制などのリソースが充実しているかの指標になる
- サーバーサイドフレームワークの正確な普及率はすぐに分からないが、GitHubのスター数やStackOverflowの質問数などから人気を推測できる
- NodeとExpressは非常に人気があり、進化し続けている
- 困ったときに助けを得やすく、学べば仕事に活かせるチャンスも多い
- Expressは有名企業でも使われていて、コードベースに貢献する人やサポートを提供する人も多い
- 無料・有料問わずサポートが充実しているため、Expressは一般的なフレームワークと言える


# Express の「指図しない」設計

- ウェブフレームワークには「指図をしたがる」ものと「指図をしない」ものがある
  - 指図をしたがるフレームワークは、特定のタスクに「正しい方法」があり、素早い開発やドキュメントが充実しているが、柔軟性は低い
  - 指図をしないフレームワークは、コンポーネントの選択や構成に制約が少なく、開発者が自由に組み合わせられる

- Expressは「指図をしない」フレームワーク
  - 好きなミドルウェアを好きな順番で挿し込める
  - ファイル数やディレクトリ構造も自由に決められる
  - 選択肢が多すぎて迷うこともある

# Express コードの概要

- 従来のデータ駆動型ウェブサイトでは、ウェブアプリはブラウザーなどのクライアントからのHTTPリクエストを待機し、URLパターンやPOST/GETデータに基づいて必要な処理を行う
- 必要に応じてデータベースから情報を読み書きしたり、他のタスクを実行できる
- アプリはレスポンスとしてHTMLを返し、テンプレートのプレースホルダにデータを挿入して動的なページを生成することが多い

- Expressは、特定のHTTPメソッド（GET, POSTなど）とURLパターン（ルート）ごとに呼び出す関数を指定できる
- どのテンプレートエンジン（view）を使うかも指定できる
- テンプレートエンジンを使う場合は、レスポンスをレンダリングするテンプレートファイルを用意する
- ExpressミドルウェアでCookie、セッション、ユーザー認証、POST/GET引数などの機能を追加できる
- Nodeがサポートするデータベースを利用可能（Express自体はデータベース機能を定義しない）

次のセクションでは、ExpressやNodeのコード例でよく使われるパターンを紹介する

# Express の Hello World 例
Expressの標準的なHello Worldコードは以下の通り

```js
const express = require("express");
const app = express();
const port = 3000;

app.get("/", function (req, res) {
// クライアント（ブラウザー）へのレスポンス
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
```

- 最初の2行でexpressモジュールをインポートし、Expressアプリケーションを作成する（このオブジェクトは慣例的にappと呼ぶ）
- appオブジェクトには、ルーティング、ミドルウェア設定、ビューのレンダリング、テンプレートエンジン登録、アプリ設定変更などのメソッドがある
- サーバーが稼働しているとき、ブラウザーで`localhost:3000`にアクセスすると"Hello World!"が表示される
- `app.get()`は、'/'パスへのHTTP GETリクエストが来たときにコールバック関数を呼び出す
  -   コールバック関数はリクエストとレスポンスオブジェクトを受け取り、`res.send()`で"Hello World!"を返す
- `app.listen()`で3000番ポートでサーバーを起動し、コンソールにログを出力する


# モジュールのインポートと作成

- Node.jsでは、require()関数を使ってJavaScriptライブラリやファイル（モジュール）をインポートできる
- Express自体もモジュールで、`const express = require("express");` のようにインポートする
- Expressアプリケーションは `const app = express();` で作成する
- ミドルウェアやデータベースライブラリも同様にrequire()でインポートできる

- 独自のモジュールも作成でき、コードを部品ごとに分けて管理しやすくできる
- モジュールを使うことで名前空間の管理がしやすくなり、単一ファイルのアプリより保守性が高まる

- オブジェクトや関数をモジュール外部で使えるようにするには、exportsオブジェクトにプロパティとして追加する

```js
// square.js
exports.area = function (width) {
  return width * width;
};
exports.perimeter = function (width) {
  return 4 * width;
};
```

- インポート側では require() でファイル名（拡張子なし）を指定し、エクスポートされたメソッドを使う

```js
const square = require("./square");
console.log(`The area of a square with a width of 4 is ${square.area(4)}`);
```

- 複数のプロパティをまとめてエクスポートしたい場合は、module.exportsにオブジェクトを割り当てる

```js
module.exports = {
  area(width) {
    return width * width;
  },
  perimeter(width) {
    return 4 * width;
  },
};
```

- exportsはmodule.exportsのショートカットで、同じオブジェクトを参照している
- 詳しくはNode公式ドキュメント「モジュール」参照

# 非同期 API の使用

- JavaScriptでは、処理に時間がかかる操作に非同期APIがよく使われる
- 同期APIは、各操作が完了してから次の操作を開始する  
  例:  
  ```js
  console.log("First");
  console.log("Second");
  // 出力: First, Second
  ```
- 非同期APIは、操作開始後すぐに戻り、完了時に追加の処理を行う  
  例:  
  ```js
  setTimeout(function () {
    console.log("First");
  }, 3000);
  console.log("Second");
  // 出力: Second, First
  ```

- Nodeはシングルスレッドのイベント駆動型実行環境なので、ノンブロッキングな非同期APIの利用が重要
- シングルスレッドでは、同期メソッドがあると他のリクエストもブロックされてしまう

- 非同期APIの完了通知にはコールバック関数を使うのが一般的
- コールバックが多くなると「コールバック地獄」になることがある
- この問題は、asyncモジュールやPromise、async/awaitなどで解決できる
- Nodeにはコールバック→Promise変換用の`utils.promisify`もある

- Node/Expressの慣習として「エラー優先コールバック」を使う  
  コールバックの最初の引数はエラー、後続は成功データ

# ルートハンドラーの作成

- Hello World Expressの例では、サイトルート ('/') へのHTTP GETリクエストに対してルートハンドラー関数を定義している

```js
app.get("/", function (req, res) {
  res.send("Hello World!");
});
```

- コールバック関数はリクエスト(req)とレスポンス(res)オブジェクトを引数に取る
- `res.send()`で文字列を返すほか、`res.json()`でJSON、`res.sendFile()`でファイルなども返せる
- コールバック関数の引数名は自由だが、最初がリクエスト、2番目がレスポンス

- Expressアプリケーションオブジェクトには、他のHTTPメソッド（post, put, deleteなど）用のルートハンドラーも定義できる
- `app.all()`は全てのHTTPメソッドに応答するルートハンドラーを定義する

```js
app.all("/secret", function (req, res, next) {
  console.log("Accessing the secret section…");
  next(); // 次のハンドラーに制御を渡す
});
```

- ルートではURLパターンを照合し、値を抽出してリクエストオブジェクトの属性として利用できる
- 共通のルートプレフィックスでルートハンドラーをまとめたい場合は、express.Routerオブジェクトを使う

```js
// wiki.js
const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("Wiki home page");
});

router.get("/about", function (req, res) {
  res.send("About this wiki");
});

module.exports = router;
```

- メインアプリファイルでルーターをuse()で追加することで、`/wiki/`や`/wiki/about/`でアクセスできる

```js
const wiki = require("./wiki.js");
app.use("/wiki", wiki);
```

- ルートやRouterの詳細は「ルートとコントローラ」セクション参照



# ミドルウェアの使用

- ミドルウェアは静的ファイルの提供、エラー処理、HTTPレスポンスの圧縮などExpressアプリで広く使われる
- ルート関数はレスポンスを返してリクエスト-レスポンスサイクルを終了するが、ミドルウェアはリクエストやレスポンスに操作を加え、next()で次の処理に渡すことが多い
- ミドルウェアの呼び出し順は開発者が決める。順序が重要な場合もある（例：セッションミドルウェアはcookieミドルウェアの後）

- Cookie操作、セッション、認証、POST/JSONデータの取得、ロギングなどは多くのアプリでサードパーティ製ミドルウェアを使う
- サードパーティミドルウェアはnpmでインストールし、app.use()で追加する

```bash
npm install morgan
```

```js
const express = require("express");
const logger = require("morgan");
const app = express();
app.use(logger("dev"));
```

- ミドルウェアやルーティング機能は宣言順に呼ばれる。多くの場合、ミドルウェアはルート設定前に追加する

- 独自のミドルウェアも作成できる。ミドルウェア関数は(req, res, next)の3つの引数を持つ

```js
const express = require("express");
const app = express();

// ミドルウェア関数の例
const a_middleware_function = function (req, res, next) {
  // Perform some operations
  next(); // next() を呼ぶことで Express はチェイン中の次のミドルウェア関数を呼びます。

// すべてのルートと述語に対して use() で関数を追加します。
app.use(a_middleware_function);

// 指定ルートに対して use() でミドルウェア関数を追加します。
app.use("/someroute", a_middleware_function);

// 指定の HTTP 述語とルートに対してミドルウェア関数を追加します。
app.get("/", a_middleware_function);

app.listen(3000);
```

- ミドルウェア関数はnext()を呼ばないとリクエストが中断される
- ミドルウェアの使い方や作成方法はExpress公式資料が参考になる

# 静的ファイルの提供

- express.staticミドルウェアを使うと、画像・CSS・JavaScriptなどの静的ファイルを配信できる
- 例えば、アプリと同じ階層にある'public'ディレクトリから静的ファイルを提供するには

```js
app.use(express.static("public"));
```

- publicディレクトリ内のファイルは、ベースURL＋ファイル名でアクセスできる  
  例:  
  - http://localhost:3000/images/dog.jpg  
  - http://localhost:3000/css/style.css  
  - http://localhost:3000/js/app.js  
  - http://localhost:3000/about.html

- static()は複数回呼び出して複数ディレクトリを扱える。ファイルが見つからない場合は次のミドルウェアに渡される

```js
app.use(express.static("public"));
app.use(express.static("media"));
```

- 静的URLの仮想プレフィックスも設定できる

```js
app.use("/media", express.static("public"));
```

- これでpublicディレクトリのファイルを`/media`パスでアクセス可能  
  例:  
  - http://localhost:3000/media/images/dog.jpg  
  - http://localhost:3000/media/video/cat.mp4  
  - http://localhost:3000/media/cry.mp3

- 詳しくはExpress公式資料「静的ファイルの提供」を参照

# エラーの処理

- エラーは4つの引数（err, req, res, next）を持つ特別なミドルウェア関数で処理する

```js
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
```

- エラーハンドラは他のapp.use()やルーティングの後、リクエスト処理の最後に追加する必要がある
- Expressにはデフォルトのエラーハンドラーがあり、未処理のエラーはこれで処理される
- next()にエラーを渡し、独自のエラーハンドラーで処理しなかった場合は、組み込みエラーハンドラーがスタックトレース付きでクライアントに返す
- スタックトレースは本番環境では表示されない（NODE_ENVを'production'に設定）
- HTTP 404などのステータスコードはエラーとして扱われないので、必要なら独自ミドルウェアで処理する
- 詳しくはExpress公式資料「エラー処理」を参照

# データベースの使用

- ExpressアプリはNodeがサポートする任意のデータベースを利用できる（Express自体はデータベース管理の機能や要件を定義しない）
- PostgreSQL、MySQL、Redis、SQLite、MongoDBなど多くの選択肢がある
- 使いたいデータベースのドライバはnpmでインストールする  
  例:  
  ```bash
  npm install mongodb
  ```
- データベースはローカルでもクラウドでも利用可能
- Expressコードではドライバを使い、接続・CRUD操作を行う

MongoDBの例（バージョン2系）:
```js
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/animals", (err, db) => {
  if (err) throw err;
  db.collection("mammals")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      console.log(result);
    });
});
```

MongoDBの例（バージョン3系以上）:
```js
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/animals", (err, client) => {
  if (err) throw err;
  const db = client.db("animals");
  db.collection("mammals")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      console.log(result);
      client.close();
    });
});
```

- ORM（Object Relational Mapper）を使ってデータベースにアクセスする方法もある
  - データを「オブジェクト」や「モデル」として定義し、ORMがデータベース形式にマッピングする
  - JavaScriptオブジェクトの観点で考えられ、データ検証やチェックがしやすい

- 詳しくはExpress公式資料「データベース統合」を参照  


# データのレンダリング（ビュー）

- テンプレートエンジン（ビューエンジン）を使うと、テンプレート内のプレースホルダにデータを埋め込んでHTMLなどの出力文書を生成できる
- Expressは複数のテンプレートエンジンに対応している（Jade、Moustache、Dustなど）

- アプリ設定でテンプレートエンジンとテンプレートディレクトリを指定する  
  ※テンプレートエンジンのパッケージもnpmでインストールが必要

```js
const express = require("express");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "views")); // テンプレートディレクトリ
app.set("view engine", "some_template_engine_name"); // 使用するテンプレートエンジン
```

- ルートハンドラーで`res.render()`を使い、テンプレートファイルと埋め込むデータを指定してHTMLを生成・送信する

```js
app.get("/", function (req, res) {
  res.render("index", { title: "About dogs", message: "Dogs rock!" });
});
```

- テンプレートの書き方はエンジンごとに異なる
- 詳しくはExpress公式資料「テンプレートエンジンの使用」を参照


# ファイル構造

- Expressは構造や使うコンポーネントについて何も決めていない
- ルート、ビュー、静的ファイル、その他のロジックは、好きなディレクトリ構造・好きな数のファイルで管理できる
- アプリ全体を1ファイルにまとめることも可能だが、通常は機能ごと（例：アカウント管理、ブログ、掲示板など）やアーキテクチャごと（MVCならモデル・ビュー・コントローラーなど）に分割する
- 後のトピックで、Express Application Generatorを使って拡張しやすいモジュール式アプリケーションスケルトンの作成方法を紹介する

# まとめ

- Express/Nodeの基本を学び、主な利点やアプリケーションの主要部分（ルート、ミドルウェア、エラー処理、テンプレート）の概要を理解できた
- Expressは「指図しない」フレームワークなので、構造や使うライブラリは自分で自由に選べる
- Expressは軽量で、サードパーティライブラリや機能を組み合わせることで可能性が広がる
- 次の記事ではNode開発環境のセットアップ方法を紹介し、実際にExpressコードを動かしてみる
