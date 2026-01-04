# Web 標準と Hono

Hono は **Fetch API のような Web 標準のみ** を使用して構築されています。  
Web 標準 API は、HTTP リクエストを処理する基本的なオブジェクトで構成されており、主に以下のものがあります。

- `Request` / `Response`  
- `URL`  
- `URLSearchParams`  
- `Headers`  

---

## Web 標準上での動作

Cloudflare Workers、Deno、Bun などは **Web 標準 API 上に構築** されています。  

たとえば、"Hello World" を返すサーバーは以下のように書くことができます（Cloudflare Workers / Bun で動作）。

```ts
export default {
  async fetch() {
    return new Response('Hello World')
  },
}
```

# Hono の特徴

- Hono は **Web 標準 API のみ** を使用しているため、Web 標準をサポートするあらゆるランタイムで動作します。  
- Node.js など従来のサーバー環境でも動作可能です。

### Hono が動作する主なランタイム
- Cloudflare Workers (workerd)  
- Deno  
- Bun  
- Fastly Compute  
- AWS Lambda  
- Node.js  
- Vercel (edge-light)  
- WebAssembly (w/ WebAssembly System Interface (WASI) via wasi:http)  

---

ランタイム（runtime）:
プログラムを実際に動かすための実行環境 のこと
