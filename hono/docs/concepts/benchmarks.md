# Benchmarks（ベンチマーク）

ベンチマークはあくまで指標の一つに過ぎませんが、私たちにとって非常に重要なものです。

---

## Routers（ルーターの比較）

Honoチームでは、複数のJavaScriptルーターの速度を比較しました。  
たとえば、`find-my-way` は Fastify 内部で使用される非常に高速なルーターとして知られています。

比較対象としたルーターは以下の通りです。

- @medley/router  
- find-my-way  
- koa-tree-router  
- trek-router  
- express（ハンドリングを含む）  
- koa-router  

---

## テスト設定

まず、現実のWebアプリケーションでよく見られるようなルートを各ルーターに登録しました。

登録したルート一覧は以下の通りです。

- `GET /user`  
- `GET /user/comments`  
- `GET /user/avatar`  
- `GET /user/lookup/username/:username`  
- `GET /user/lookup/email/:address`  
- `GET /event/:id`  
- `GET /event/:id/comments`  
- `POST /event/:id/comment`  
- `GET /map/:location/events`  
- `GET /status`  
- `GET /very/deeply/nested/route/hello/there`  
- `GET /static/*`

次に、以下のようなエンドポイントに対してリクエストを送信しました。

- **short static**: `GET /user`  
- **static with same radix**: `GET /user/comments`  
- **dynamic route**: `GET /user/lookup/username/hey`  
- **mixed static dynamic**: `GET /event/abcd1234/comments`  
- **post**: `POST /event/abcd1234/comment`  
- **long static**: `GET /very/deeply/nested/route/hello/there`  
- **wildcard**: `GET /static/index.html`

---

## Node.js上での結果

Node.js 環境でのベンチマーク結果は以下の通りです（スクリーンショット参照）。  
※ここでは省略。

---

## Bun上での結果

Bun 環境でのベンチマーク結果も同様に測定しました（スクリーンショット参照）。  
※ここでは省略。

---

## Cloudflare Workersでの結果

Cloudflare Workers 環境では、Honoが他のルーターと比較して最も高速でした。

**テスト環境:**  
- Machine: Apple MacBook Pro（M1 Pro, 32 GiB）  
- Scripts: `benchmarks/handle-event`

**結果:**

| フレームワーク | 処理速度（ops/sec） | 誤差 |
|----------------|------------------|------|
| **Hono** | 402,820 | ±4.78% (80 runs) |
| itty-router | 212,598 | ±3.11% (87 runs) |
| sunder | 297,036 | ±4.76% (77 runs) |
| worktop | 197,345 | ±2.40% (88 runs) |

最も速いのは **Hono** ✨  
実行時間: 約28秒

---

## Denoでの結果

Deno 環境でも、Honoは他のフレームワークと比較して最速でした。

**テスト環境:**
- Machine: Apple MacBook Pro（M1 Pro, 32 GiB）
- Deno v1.22.0  
- コマンド:  
  bombardier --fasthttp -d 10s -c 100 'http://localhost:8000/user/lookup/username/foo'  

**結果:**

| フレームワーク | バージョン | Requests/sec |
|----------------|------------|---------------|
| **Hono** | 3.0.0 | **136,112** |
| Fast | 4.0.0-beta.1 | 103,214 |
| Megalo | 0.3.0 | 64,597 |
| Faster | 5.7 | 54,801 |
| oak | 10.5.1 | 43,326 |
| opine | 2.2.0 | 30,700 |

さらに、`denosaurs/bench` における別のベンチマーク結果でも同様の傾向が確認されました。

---

## Bunでの結果

Bun 環境においても、Honoは最速クラスのフレームワークの一つでした。  
詳細は以下のリポジトリを参照してください。

🔗 [SaltyAom/bun-http-framework-benchmark](https://github.com/SaltyAom/bun-http-framework-benchmark)

---

📘 [Edit this page on GitHub](#)  
🕓 最終更新日: 2025/10/29 15:46

