
🚀 Hono を使うとどうなるか

同じ処理を Hono で書くとこうです👇
```
import { Hono } from 'hono'

const app = new Hono()

app.get('/hello', (c) => c.text('Hello World'))
app.get('/users', (c) => c.json([{ id: 1, name: 'Tori' }]))

export default app
```

- URLごとに .get(), .post() などで簡単にルートを定義できる
- c.text(), c.json() でレスポンスをシンプルに記述できる
- Middleware（認証・ログ・CORS対応など）を柔軟に追加できる
- Deno / Bun / Cloudflare / Node.js など、どの環境でも同じコードで動作する

Web標準（生のFetch API）だけで作る場合
```
export default {
  async fetch(request) {
    const url = new URL(request.url)

    if (url.pathname === '/hello') {
      return new Response('Hello World')
    } else if (url.pathname === '/users') {
      return new Response(JSON.stringify([{ id: 1, name: 'Tori' }]), {
        headers: { 'Content-Type': 'application/json' },
      })
    } else {
      return new Response('Not Found', { status: 404 })
    }
  },
}
```


# Web Standards（ウェブ標準）

Hono は **Fetch API** をはじめとする **Web 標準（Web Standards）** のみを利用しています。  
これらはもともと `fetch()` 関数で使われていたもので、HTTP リクエストやレスポンスを扱うための基本的なオブジェクト群です。

代表的な Web 標準オブジェクトとしては、以下のものがあります。

- **Request**
- **Response**
- **URL**
- **URLSearchParams**
- **Headers**

---

## 例：「Hello World」を返すサーバー

以下のコードは、Cloudflare Workers や Bun 上で動作する「Hello World」サーバーの例です。

このサンプルコードは Web 標準のみを使用しています。

```javascript
export default {
  async fetch() {
    return new Response('Hello World')
  },
}
```
このように、Web 標準だけで構築されたコードは、環境に依存せず動作します。

## 対応ランタイム

Hono は Web 標準をベースにしているため、Web 標準をサポートするあらゆるランタイムで動作します。  
さらに **Node.js 用のアダプタ** も用意されています。

### Hono が動作する主なランタイム

- Cloudflare Workers（workerd）  
- Deno  
- Bun  
- Fastly Compute  
- AWS Lambda  
- Node.js  
- Vercel（edge-light）  
- Netlify（その他プラットフォームも対応）

同じコードがすべての環境で動作します。

自分メモ
```
ランタイム（runtime） は、
プログラムを 実際に動かすための実行環境 のこと
```
---

## Web 標準化への取り組み

Cloudflare Workers、Deno、Shopify などの企業は、  
**WinterCG（Winter Community Group）** を立ち上げ、  
Web 標準を基盤にした **Web 相互運用性（web-interoperability）** の実現を議論しています。

Hono もこの流れに沿って開発されており、  
**“Web 標準のスタンダード”** となることを目指しています。

---

📘 **Edit this page on GitHub**  
🕓 **最終更新日:** 2025/10/29 15:46
