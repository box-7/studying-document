# Hono Getting Started の見方・意味まとめ

## 結論

Hono の **Getting Started** に並んでいる環境一覧は、

> **「Hono をどの実行環境（ランタイム）で動かすか」ごとの導入方法・最小構成**

を示しています。

**環境ごとに別の Hono があるわけではなく、Hono 本体は共通**です。

---

## Hono の前提思想

Hono は **Web 標準 API（Fetch / Request / Response）だけ** を使って設計されています。

そのため、

- Node.js 専用
- Cloudflare 専用

といった制限がなく、

👉 **Web 標準 API をサポートするあらゆるランタイムで動作**します。

---

## Getting Started に環境が多い理由

Hono が動作する「実行環境（ランタイム）」が非常に多いため、
それぞれに合わせた **起動方法・エントリーポイント** が用意されています。

---

## 環境の分類

### Edge / Serverless 系

| 環境 | 説明 |
|---|---|
| Cloudflare Workers | 世界中の Edge で即時実行 |
| Cloudflare Pages | Workers + 静的ホスティング |
| Vercel | Edge / Serverless |
| Netlify | Serverless / Edge |
| Lambda@Edge | AWS Edge |
| Fastly Compute | Edge |
| Service Worker | ブラウザ内で実行 |

---

### クラウド・サーバーレス

| 環境 | 説明 |
|---|---|
| AWS Lambda | サーバーレス関数 |
| Azure Functions | サーバーレス関数 |
| Google Cloud Run | コンテナ実行 |
| Supabase Functions | Deno ベース |
| Ali Function Compute | Alibaba Cloud |

---

### JavaScript ランタイム

| 環境 | 説明 |
|---|---|
| Node.js | 従来型サーバー |
| Deno | Web 標準ネイティブ |
| Bun | 高速 JavaScript ランタイム |

---

### WebAssembly

| 環境 | 説明 |
|---|---|
| WebAssembly | WASI 経由で実行 |

---

## Getting Started に書かれている内容

各環境ごとに以下が説明されています。

- Hono のインストール方法
- エントリーポイントの書き方
- その環境特有の adapter（接着コード）

例：Cloudflare Workers

```ts
export default {
  fetch(request: Request) {
    return new Response('Hello Hono')
  },
}
```
例：Node.js

```
import { serve } from '@hono/node-server'
import app from './app'

serve(app)
```
例：Next.js（Edge Runtime）
```
export const runtime = 'edge'
export default app
```

## 重要なポイント（Hono の考え方）

### フレームワークは環境ごとに分かれていない

- **Cloudflare 用の Hono**
- **Node.js 用の Hono**

といった別物のフレームワークが存在するわけではありません。

👉 **Hono 本体は常に同じ**です。

---

### 環境ごとに違うのは「起動方法」だけ

| 共通で使えるもの | 環境ごとに異なるもの |
|---|---|
| ルーティング | エントリーポイント |
| ミドルウェア | デプロイ設定 |
| RPC | adapter（`serve` / `handle` など） |

アプリのロジック自体は共通で、  
**実行・デプロイ方法だけが環境に依存**します。

---

## 実務での使い分け例

| やりたいこと | 選ぶ環境 |
|---|---|
| 世界中で超低レイテンシ | Cloudflare Workers |
| 通常の API サーバー | Node.js / Bun |
| Next.js と統合 | Next.js（Edge） |
| Supabase と一体化 | Supabase Functions |
| 学習・検証 | Deno / Bun |

---

## まとめ

- Getting Started の一覧 = **Hono が対応しているランタイム一覧**
- Hono は **Web 標準ベース**のため移植性が高い
- 環境ごとに違うのは **起動・デプロイ方法のみ**
- アプリ本体（ルーティング・ミドルウェア・RPC）は **どの環境でも共通で使える**



