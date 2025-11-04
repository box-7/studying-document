# 🚀 Getting Started（はじめに）

**Hono** の導入はとても簡単です。  
プロジェクトのセットアップ、ローカル開発、デプロイまで**数分で完了**します。  
しかも、同じコードがあらゆるランタイム（環境）で動作します。  
ここでは Hono の基本的な使い方を紹介します。

---

## 🧩 スターターテンプレートの利用

Hono には、各プラットフォーム向けの**スターターテンプレート**が用意されています。  
以下のコマンドでプロジェクトを作成します。

`npm create hono@latest my-app`

実行するとテンプレート選択のプロンプトが表示されます。  
たとえば **Cloudflare Workers** 用のテンプレートを選択します。

```
? Which template do you want to use?
　aws-lambda
　bun
　cloudflare-pages
👉 cloudflare-workers
　deno
　fastly
　nextjs
　nodejs
　vercel
```


テンプレートが `my-app` フォルダに作成されるので、ディレクトリに移動して依存関係をインストールします。
```
cd my-app
npm i
```

その後、ローカルサーバーを起動します。
```
npm run dev
```

---

## 👋 Hello World

Cloudflare Workersの開発ツール「Wrangler」、Deno、Bunなどを使用すれば、トランスパイルを意識せずにTypeScriptでコードを書くことができます。

src/index.tsでHonoを使った最初のアプリケーションを作成しましょう。以下の例はHonoのスターターアプリケーションです。

import文と最終的なexport default部分はランタイムによって異なる場合がありますが、アプリケーションコード全体はどの環境でも同じコードを実行します。

```
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app

```

サーバーを起動し、ブラウザで  
**http://localhost:8787** にアクセスすると動作を確認できます。
```
npm run dev
```
---

## 📦 JSON を返す

JSON を返すのも簡単です。  
次の例では `/api/hello` に GET リクエストが来たときに JSON を返します。
```
app.get('/api/hello', (c) => {
  return c.json({
    ok: true,
    message: 'Hello Hono!',
  })
})
```
---

## 🔍 Request と Response の操作

パスパラメータ、クエリ文字列、レスポンスヘッダーなども簡単に扱えます。
```
app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  return c.text(`You want to see ${page} of ${id}`)
})
```
また、`POST` / `PUT` / `DELETE` などのリクエストも簡単に処理できます。
```
app.post('/posts', (c) => c.text('Created!', 201))
app.delete('/posts/:id', (c) =>
  c.text(`${c.req.param('id')} is deleted!`)
)
```
---

## 🧱 HTML を返す

HTML も簡単に返せます。  
`html()` ヘルパーや **JSX 構文**を使用できます。  
JSX を使う場合は、ファイル名を `src/index.tsx` に変更し、環境ごとの設定を行います。

次のように JSX を使った例です。
```
const View = () => {
  return (
    <html>
      <body>
        <h1>Hello Hono!</h1>
      </body>
    </html>
  )
}

app.get('/page', (c) => {
  return c.html(<View />)
})
```
---

## 🪶 生の Response を返す

ネイティブの `Response` オブジェクトを直接返すことも可能です。
```
app.get('/', () => {
  return new Response('Good morning!')
})
```

---

## 🧩 Middleware の利用

ミドルウェアを使うことで、認証などの処理を簡潔に追加できます。  
たとえば Basic 認証を追加するには次のようにします。
```
import { basicAuth } from 'hono/basic-auth'

// ...

app.use(
  '/admin/*',
  basicAuth({
    username: 'admin',
    password: 'secret',
  })
)

app.get('/admin', (c) => {
  return c.text('You are authorized!')
})
```

Hono には以下のような**便利な組み込みミドルウェア**があります。

- Bearer 認証  
- JWT 認証  
- CORS 対応  
- ETag 生成  

また、**GraphQL サーバーや Firebase 認証**など、  
外部ライブラリを利用した**サードパーティ製ミドルウェア**も利用可能です。  
もちろん、自作ミドルウェアも簡単に追加できます。

---

## 🔌 アダプタ（Adapter）

環境固有の機能（静的ファイル配信や WebSocket など）を扱うために、  
Hono は**アダプタ**を提供しています。

たとえば、Cloudflare Workers で WebSocket を扱う場合は次のようにします。
```
import { upgradeWebSocket } from 'hono/cloudflare-workers'

app.get(
  '/ws',
  upgradeWebSocket((c) => {
    // ...
  })
)
```
---

## 🧭 次のステップ

Hono のコードはほとんどのプラットフォームで共通に動作しますが、  
環境ごとの設定やデプロイ手順には違いがあります。  
使用するプラットフォーム（Cloudflare、Bun、Deno など）に応じたガイドを確認しましょう。

---

🕓 **最終更新日:** 2025/10/29 15:46  
📘 **編集:** Edit this page on GitHub