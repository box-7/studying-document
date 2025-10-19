# Response

[MDN: Response](https://developer.mozilla.org/ja/docs/Web/API/Response)

**Baseline: Widely available**  

Response は Fetch API のインターフェイスで、リクエストのレスポンスを表す。

Response オブジェクトは `Response()` コンストラクターで生成できるが、  
通常は他の API 操作の結果として返される Response オブジェクトに出会うことが多い。  
例えば、サービスワーカーの `FetchEvent.respondWith` や、単純な `fetch()` など。

# Response コンストラクターとインスタンスプロパティ

## コンストラクター

### `Response()`
新しい Response オブジェクトを返す。

---

## Response インスタンスプロパティ

| プロパティ | 説明 |
|------------|------|
| `Response.body` | 読取専用。本文のコンテンツの ReadableStream。 |
| `Response.bodyUsed` | 読取専用。本文がレスポンスで使用されたかどうかの論理値。 |
| `Response.headers` | 読取専用。レスポンスに関連する Headers オブジェクト。 |
| `Response.ok` | 読取専用。ステータスが 200–299 の範囲かどうかの論理値。 |
| `Response.redirected` | 読取専用。レスポンスがリダイレクト結果かどうか。 |
| `Response.status` | 読取専用。このレスポンスのステータスコード（成功なら 200）。 |
| `Response.statusText` | 読取専用。ステータスコードに対応するステータスメッセージ（例: 200 → OK）。 |
| `Response.type` | 読取専用。レスポンスの種類（例: basic, cors）。 |
| `Response.url` | 読取専用。レスポンスの URL。 |

## Response 静的メソッド

| メソッド | 説明 |
|-----------|------|
| `Response.error()` | ネットワークエラーに関連付けられた新しい Response を返す。 |
| `Response.redirect()` | 指定した URL で新しい Response を返す。 |
| `Response.json()` | 指定した JSON データを返す新しい Response を生成。 |

## Response インスタンスメソッド

| メソッド | 説明 |
|-----------|------|
| `Response.arrayBuffer()` | レスポンス本体を ArrayBuffer で取得する Promise を返す。 |
| `Response.blob()` | レスポンス本体を Blob で取得する Promise を返す。 |
| `Response.bytes()` | レスポンス本体を Uint8Array で取得する Promise を返す。 |
| `Response.clone()` | Response オブジェクトを複製する。 |
| `Response.formData()` | レスポンス本体を FormData で取得する Promise を返す。 |
| `Response.json()` | レスポンス本体を JSON として解釈して取得する Promise を返す。 |
| `Response.text()` | レスポンス本体をテキストとして取得する Promise を返す。 |


## 画像の取得 (Fetch API)

単純な `fetch()` を使って画像を取得し、`<img>` タグに表示する例。  
`fetch()` は Promise を返し、取得したリソースは Response オブジェクトで解決される。

画像を扱う場合、レスポンスに正しい MIME タイプを与えるために `Response.blob()` を使う。

```js
const image = document.querySelector(".my-image");

fetch("flowers.jpg")
// Promise を返す
// 解決されると Blob オブジェクト になる
// Blob は バイナリデータ（画像・動画・音声など）を扱うオブジェクト
  .then((response) => response.blob())
  .then((blob) => {
    const objectURL = URL.createObjectURL(blob);
    image.src = objectURL;
  });
```









