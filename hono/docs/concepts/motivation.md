# Philosophy（哲学）

このセクションでは、Hono のコンセプト、つまりその「哲学」について説明します。

## Motivation（動機）

## 背景
サーバーを用意せずに動かせる JavaScript / TypeScript 実行環境

最初に、私は **Cloudflare Workers 上で動く Web アプリケーションを作りたい** と思いました。  
しかし、Cloudflare Workers 上で動作する良いフレームワークが存在しなかったため、  
自分で **Hono** を作り始めました。

---

## 主なサービスと分類

| サービス | 分類 | 一言 |
|----------|------|------|
| Cloudflare Workers | Edge Functions | 世界中で即時実行 |
| AWS Lambda | Serverless Functions | リージョン単位で実行 |
| Firebase Cloud Functions | Serverless Functions | GCPリージョンで実行 |

---

## 典型構成
```
[ ブラウザ ]
|
| ① HTML / JS / CSS
v
Firebase Hosting（静的配信）
|
| ② fetch / axios
v
Cloud Functions / Lambda / API
|
v
DB（Firestore / RDB / etc）
```

- ① ブラウザから静的コンテンツを取得  
- ② API に対して fetch や axios でリクエスト  
- DB からデータを取得してアプリケーションで利用

---

私たちは、Hono が「**Web 標準のための標準（Standard for Web Standards）**」  
になり得ると信じています。


