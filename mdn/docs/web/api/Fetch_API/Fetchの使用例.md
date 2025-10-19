# フェッチ API の使用

[MDN: フェッチ API の使用](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch)

フェッチ API は、HTTP リクエストを行い、レスポンスを処理するための JavaScript インターフェイスを提供する。

フェッチは XMLHttpRequest の現代の置き換え。  
コールバックを使う XMLHttpRequest とは異なり、フェッチはプロミスベースで、サービスワーカーやオリジン間リソース共有 (CORS) のような現代ウェブ機能と統合されている。

フェッチ API では、`fetch()` を呼び出してリクエストを行う。これはウィンドウとワーカーの両方のコンテキストでグローバル関数として利用できる。このコンテキストには Request オブジェクトか、フェッチする URL を格納した文字列、およびリクエストを構成するオプション引数を渡す。

ウェブワーカー (Web Worker) とは、ウェブアプリケーションにおけるスクリプトの処理をメインとは別のスレッドに移し、バックグラウンドでの実行を可能にする仕組みのことです。時間のかかる処理を別のスレッドに移すことが出来るため、 UI を担当するメインスレッドの処理を中断・遅延させずに実行できるという利点があります。
https://developer.mozilla.org/ja/docs/Web/API/Web_Workers_API


`fetch()` は Promise を返す。このプロミスはサーバーのレスポンスを表す Response オブジェクトで履行される。レスポンスに対して適切なメソッドを呼び出すと、リクエストのステータスを調べたり、レスポンス本体をテキストや JSON など様々な形式で取り出せる。

---

## 基本例: JSON データ取得
```js
async function getData() {
  const url = "https://example.org/products.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`レスポンスステータス: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}
```

URL を格納した文字列を宣言し、fetch() を呼び出して余計なオプションなしで URL を渡す。

fetch() は何かエラーがあるとプロミスを拒否するが、サーバーが 404 のようなエラーステータスで応答した場合は拒否しない。そのためレスポンスのステータスも調べて、OK でない場合はエラーを throw する。

レスポンスが OK なら `Response.json()` を呼び出してレスポンス本体を JSON として取得。その値の一つをログ出力。

`fetch()` 自体と同様に、`response.json()` も非同期であることに注意。


## リクエストを行う

リクエストを行うには、`fetch()` を呼び出して次のものを渡す。

- フェッチするリソースの定義。これは以下のいずれか。
  - URL を格納した文字列
  - URL のインスタンスなどのオブジェクト（URL を格納した文字列を生成する文字列化子のあるもの）
  - Request のインスタンス
- オプションとして、リクエストを構成するためのオプションを含むオブジェクト

この節ではよく使用するオプションを紹介。すべてのオプションは fetch() リファレンスページを参照。

---

### メソッドの設定

既定では `fetch()` は GET リクエストを行うが、`method` オプションを使用すれば別のリクエストメソッドを使用できる。

```js
const response = await fetch("https://example.org/post", {
  method: "POST",
  // ...
});
```

`mode` オプションが `no-cors` に設定されている場合、`method` は GET、POST、HEAD のいずれかでなければならない。  
※ `no-cors` CORS（Cross-Origin Resource Sharing）を使わないリクエスト

## 本体の設定

リクエスト本体はリクエストの内容。クライアントがサーバーに送るもの。  
GET リクエストでは本体を含められないが、POST や PUT のようにコンテンツを送信する場合に使える。  
例えばファイルをアップロードしたい場合、POST リクエストの本体にファイルを含めることができる。

本体は `body` オプションとして渡す。

```js
const response = await fetch("https://example.org/post", {
  body: JSON.stringify({ username: "example" }),
  // ...
});
```

本体は以下の型のインスタンスとして指定可能。

- 文字列
- ArrayBuffer
- TypedArray
- DataView
- Blob
- File
- URLSearchParams
- FormData

リクエスト本体はストリームなので、作成すると読み込まれ、2 回作成できないことに注意。

ストリーム = データを順番に流し読みする仕組み

```js
const request = new Request("https://example.org/post", {
  method: "POST",
  body: JSON.stringify({ username: "example" }),
});

const response1 = await fetch(request);
console.log(response1.status);

// 例外が発生: "Body has already been consumed."
const response2 = await fetch(request);
console.log(response2.status);
```

リクエストを送信する前に複製を作成する必要がある。

```js
const request1 = new Request("https://example.org/post", {
  method: "POST",
  body: JSON.stringify({ username: "example" }),
});

const request2 = request1.clone();

const response1 = await fetch(request1);
console.log(response1.status);

const response2 = await fetch(request2);
console.log(response2.status);
```
詳しくはロックされ妨害されたストリームを参照。

## ヘッダーの設定

リクエストヘッダーはサーバーに情報を与える。  
例えば `Content-Type` ヘッダーは、リクエスト本体の形式をサーバーに指示する。  
多くのヘッダーはブラウザーが自動設定し、スクリプトで変更できないもの（禁止リクエストヘッダー）がある。

ヘッダーは `headers` オプションに割り当てる。

```js
const response = await fetch("https://example.org/post", {
  headers: {
    "Content-Type": "application/json",
  },
  // .,.
});
```

または `Headers` オブジェクトを作成し、`Headers.append()` で追加して `headers` に渡すことも可能。

```js
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const response = await fetch("https://example.org/post", {
  headers: myHeaders,
  // .,.
});
```

`mode` オプションが `no-cors` の場合、設定できるヘッダーは CORS セーフリストのものに制限される。


## POST リクエストを行う

`method`、`body`、`headers` オプションを組み合わせて POST リクエストを作れる。
```js
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const response = await fetch("https://example.org/post", {
  method: "POST",
  body: JSON.stringify({ username: "example" }),
  headers: myHeaders,
});
```

## オリジン間リクエストを行う

オリジン間のリクエストが可能かどうかは `mode` オプションで決まる。値は `cors`、`no-cors`、`same-origin` のいずれか。

- 既定は `cors`。オリジンをまたぐ場合は CORS が使われる。
  - 単純リクエストの場合：リクエストは送信されるが、サーバーは正しい `Access-Control-Allow-Origin` ヘッダーで応答する必要あり。
  - 単純でないリクエストの場合：ブラウザーはプリフライトリクエストを送信し、サーバーが適切に応答しなければ本リクエストは送信されない。

- `same-origin` にするとオリジン間リクエストは禁止。
- `no-cors` にすると、リクエストは単純リクエストにならず、設定できるヘッダーは制限され、メソッドは GET、HEAD、POST に限定される。

## 資格情報を含める

資格情報とはクッキー、TLS クライアント証明書、またはユーザー名とパスワードを格納した認証ヘッダーのこと。

ブラウザーが資格情報を送信するかどうか、また Set-Cookie レスポンスヘッダーを尊重するかどうかは `credentials` オプションで制御する。

- `omit`: リクエストに資格情報を送信せず、レスポンスに資格情報を含めない。  
- `same-origin`（既定値）: 同一オリジンのリクエストにのみ資格情報を送信・含める。  
- `include`: オリジンをまたいでも常に資格情報を含める。  

注意点：
- クッキーの SameSite が `Strict` または `Lax` の場合、`include` でもサイトをまたいで送信されないことがある。
- `include` でオリジンをまたぐ場合、サーバー側が `Access-Control-Allow-Credentials` ヘッダーで同意し、`Access-Control-Allow-Origin` でクライアントのオリジンを明示的に指定する必要がある（`*` は不可）。

挙動のまとめ：
- 単純リクエストの場合：資格情報と共に送信され、サーバーが正しい CORS ヘッダーを返せばレスポンスも資格情報を含む。
- 単純でないリクエストの場合：ブラウザーは資格情報なしでプリフライトリクエストを送り、サーバーが正しい CORS ヘッダーを返すと、本リクエストとレスポンスに資格情報が含まれる。


## Request オブジェクトの作成

`Request()` コンストラクターは `fetch()` と同じ引数を取る。  
これにより、オプションを `fetch()` に直接渡す代わりに、`Request()` コンストラクターでオプションを設定したオブジェクトを `fetch()` に渡せる。

通常の fetch() で POST リクエスト

```js
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const response = await fetch("https://example.org/post", {
  method: "POST",
  body: JSON.stringify({ username: "example" }),
  headers: myHeaders,
});
```

Request オブジェクトを作成して fetch() に渡す場合
```js
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const myRequest = new Request("https://example.org/post", {
  method: "POST",
  body: JSON.stringify({ username: "example" }),
  headers: myHeaders,
});

const response = await fetch(myRequest);
```

既存の Request を基に新しい Request を作成

2つ目の引数を使用することで、既存の Request から一部のプロパティを変更した新しいリクエストを作成できる。
```js
async function post(request) {
  try {
    const response = await fetch(request);
    const result = await response.json();
    console.log("成功:", result);
  } catch (error) {
    console.error("エラー:", error);
  }
}

const request1 = new Request("https://example.org/post", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ username: "example1" }),
});

const request2 = new Request(request1, {
  body: JSON.stringify({ username: "example2" }),
});

post(request1);
post(request2);
markdown
```

## リクエストの中止

リクエストを中止するには `AbortController` を作成し、`signal` をリクエストに割り当てる。  
中止するには `abort()` メソッドを呼ぶ。`fetch()` は AbortError でプロミスを拒否する。

### ボタンで fetch を開始・中止する例

```js
const controller = new AbortController();

const fetchButton = document.querySelector("#fetch");
fetchButton.addEventListener("click", async () => {
  try {
    console.log("フェッチを開始");
    const response = await fetch("https://example.org/get", {
      signal: controller.signal,
    });
    console.log(`レスポンス: ${response.status}`);
  } catch (e) {
    console.error(`エラー: ${e}`);
  }
});

const cancelButton = document.querySelector("#cancel");
cancelButton.addEventListener("click", () => {
  controller.abort();
  console.log("フェッチを中止");
});
```

fetch 履行後にレスポンス本体読み込み前に中止する場合
```js
async function get() {
  const controller = new AbortController();
  const request = new Request("https://example.org/get", {
    signal: controller.signal,
  });

  const response = await fetch(request);
  controller.abort();
  // 次の行で AbortError が発生
  const text = await response.text();
  console.log(text);
}
```


## レスポンスの処理

ブラウザーがサーバーからレスポンスステータスとヘッダーを受け取るとすぐに、fetch() が返すプロミスは Response オブジェクトで履行される。

### レスポンスステータスのチェック

fetch() が返すプロミスはネットワークエラーなどで拒否されるが、サーバーが 404 のようなエラーで応答しても履行される。  
そのため、レスポンス本体を読み込む前にステータスを確認する必要がある。

```js
async function getData() {
  const url = "https://example.org/products.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`レスポンスステータス: ${response.status}`);
    }
    // ...
  } catch (error) {
    console.error(error.message);
  }
}
```


## レスポンスのステータスと型

- `Response.status` はステータスコードを数値で返す  
- `Response.ok` は 200 番台なら `true` を返す  

### レスポンス型のチェック

レスポンスには `type` プロパティがあり、以下のいずれかになる:

- `basic`: 同一オリジンリクエスト  
- `cors`: オリジン間 CORS リクエスト  
- `opaque`: no-cors モードでの単純オリジン間リクエスト  
- `opaqueredirect`: redirect オプションが `manual` の場合でサーバーがリダイレクトステータスを返した  

型による挙動:
- 基本レスポンス: 禁止レスポンスヘッダーを除外  
- CORS レスポンス: CORS セーフリストレスポンスヘッダーのみ含む  
- 不透明レスポンス・不透明リダイレクト: `status` が 0、ヘッダーリストは空、本体は `null`


## レスポンスヘッダーのチェック

レスポンスにも `headers` オブジェクト (`Headers`) があり、レスポンス型に基づく除外に従って、スクリプトに公開されるレスポンスヘッダーが格納される。  

一般的な用途は、本体を読む前にコンテンツ型を調べること。

```js
async function fetchJSON(request) {
  try {
    const response = await fetch(request);
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("残念、受信したのは JSON ではなかった！");
    }
    // それ以外の場合、本体を JSON として読み取れる
  } catch (error) {
    console.error("エラー:", error);
  }
}
```

## レスポンス本体の読み取り

`Response` インターフェイスには、本体のコンテンツ全体を様々な形式で取得するためのメソッドがある。

- `Response.arrayBuffer()`
- `Response.blob()`
- `Response.formData()`
- `Response.json()`
- `Response.text()`

これらはすべて非同期メソッドで、本体のコンテンツで履行される Promise を返す。

### 例: 画像を Blob として読み込み、オブジェクト URL を作成

```js
const image = document.querySelector("img");
const url = "flowers.jpg";

// blob
// Binary Large OBject 
//「ファイルのようなバイナリデータをブラウザ内で扱うためのオブジェクト」

async function setImage() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`レスポンスステータス: ${response.status}`);
    }
    const blob = await response.blob();
    const objectURL = URL.createObjectURL(blob);
    image.src = objectURL;
  } catch (e) {
    console.error(e);
  }
}
```

## レスポンス本体のストリーミング

リクエスト本体とレスポンス本体は `ReadableStream` オブジェクトであり、常にストリーミングで読み込まれる。  
これはメモリー効率が良く、`json()` などのメソッドを呼ぶ前にブラウザーが全体をメモリーにバッファリングする必要がない。

ストリーミングを使うと、大きなコンテンツを受信しながら逐次処理できる。

### 例: ファイル全体を受信して処理

```js
const url = "https://www.example.org/a-large-file.txt";

async function fetchText(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`レスポンスステータス: ${response.status}`);
    }

    const text = await response.text();
    console.log(text);
  } catch (e) {
    console.error(e);
  }
}
```

例: レスポンスをストリーミングで処理
```js
const url = "https://www.example.org/a-large-file.txt";

async function fetchTextAsStream(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`レスポンスステータス: ${response.status}`);
    }

    const stream = response.body.pipeThrough(new TextDecoderStream());
    for await (const value of stream) {
      console.log(value);
    }
  } catch (e) {
    console.error(e);
  }
}
```
## テキストファイルを 1 行ずつ処理する

テキストリソースを取得し、ストリーミングしながら **行ごとに処理する** 方法。  
正規表現を使って行末を検出し、UTF-8 テキストとして扱う。

### コード例

```js
async function* makeTextFileLineIterator(fileURL) {
  const response = await fetch(fileURL);
  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

  let { value: chunk, done: readerDone } = await reader.read();
  chunk = chunk || "";

  const newline = /\r?\n/gm;
  let startIndex = 0;
  let result;

  while (true) {
    const result = newline.exec(chunk);
    if (!result) {
      if (readerDone) break;
      const remainder = chunk.substr(startIndex);
      ({ value: chunk, done: readerDone } = await reader.read());
      chunk = remainder + (chunk || "");
      startIndex = newline.lastIndex = 0;
      continue;
    }
    yield chunk.substring(startIndex, result.index);
    startIndex = newline.lastIndex;
  }

  if (startIndex < chunk.length) {
    // 最後の行が改行で終わらなかった場合
    yield chunk.substring(startIndex);
  }
}

async function run(urlOfFile) {
  for await (const line of makeTextFileLineIterator(urlOfFile)) {
    processLine(line);
  }
}

function processLine(line) {
  console.log(line);
}

run("https://www.example.org/a-large-file.txt");
```

## ロックされ妨害されたストリーム

リクエスト本体やレスポンス本体はストリームなので、以下の制約がある:

- `ReadableStream.getReader()` を使ってリーダーを接続すると、**そのストリームはロックされる** → 他から読めない  
- 一度でも本体を読み取ると、**ストリームは消費され妨害される** → 再び読むことはできない  
- → 同じレスポンス本体を **複数回読み取ることはできない**

### 例: 2回読むとエラー

```js
async function getData() {
  const url = "https://example.org/products.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`レスポンスステータス: ${response.status}`);
    }

    const json1 = await response.json();
    const json2 = await response.json(); // ここで例外発生
  } catch (error) {
    console.error(error.message);
  }
}
```

対策: Response.clone() を使う
```js
async function getData() {
  const url = "https://example.org/products.json";
  try {
    const response1 = await fetch(url);
    if (!response1.ok) {
      throw new Error(`レスポンスステータス: ${response1.status}`);
    }

    const response2 = response1.clone();

    const json1 = await response1.json();
    const json2 = await response2.json(); // OK
  } catch (error) {
    console.error(error.message);
  }
}
```

サービスワーカーの例 (キャッシュ + レスポンス返却)  
レスポンスを複製して
元のレスポンスをアプリに返す  
複製したレスポンスをキャッシュする
というパターンがよく使われる。
```js
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open("MyCache_1");
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  if (precachedResources.includes(url.pathname)) {
    event.respondWith(cacheFirst(event.request));
  }
});
```


