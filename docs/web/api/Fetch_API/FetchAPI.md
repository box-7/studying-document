# フェッチ API

[MDN: フェッチ API](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API)

Baseline Widely available *  
メモ: この機能はウェブワーカー内で利用可能  
Web Worker = JavaScript をブラウザの 別スレッド で動かす仕組み

- **Baseline Widely available**
  - 主要なブラウザで幅広く使える機能という目安  
  - Chrome / Edge / Firefox / Safari / Node.js などで安定して実装されている  
  - 「Baseline 2023」や「Not yet widely available」と書かれていれば、まだ対応していないブラウザがある  

- **ウェブワーカー内で利用可能**
  - この API は通常の `window` (メインスレッド) だけでなく **Web Worker 内でも使える**  
  - 例: `fetch()` / `Headers` / `Response` / `Request` などは Worker 内でも動作  
  - UI スレッドをブロックせず、バックグラウンド処理として利用できる  



フェッチ API は（ネットワーク越しの通信を含む）リソース取得のためのインターフェイスを提供する。XMLHttpRequest より強力で柔軟。

---

## 概念と使用方法

フェッチ API は Request と Response オブジェクト（ネットワークリクエストに関係するもの）と、CORS や HTTP の Origin ヘッダーの概念を使う。

リクエストを行いリソースを読み取るには fetch() を使う。Window と Worker コンテキストの両方でグローバルメソッドとして使える。

fetch() は必須引数 1 つ（取得したいリソースのパス）を取り、Promise を返す。サーバーが HTTP エラーを返しても Response に解決される。第 2 引数は任意で init オプションオブジェクトを渡せる。

Response を受け取ると、コンテンツ本体と処理方法を定義する多数のメソッドを使える。

Request() と Response() を直接作成できるが、FetchEvent.respondWith() の結果として取得する方が望ましい。

詳しい利用方法は「フェッチの使用」を参照。

---

## Fetch インターフェイス

- **fetch()**  
  リソース取得に使う  
 ```js
  fetch("/example")

- **Headers**  
  リクエストとレスポンスのヘッダーを表す  
const headers = new Headers();

- **Request**  
  リソースリクエストを表す  
const req = new Request("/example");

- **Response**  
  リクエストに対するレスポンスを表す  
const res = new Response("Hello World");  

- **fetch() 基本例**  
fetch("/path/to/resource")
fetch("/path/to/resource").then(response => response.text())
```



