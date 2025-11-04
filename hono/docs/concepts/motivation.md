# Philosophy（哲学）

このセクションでは、Hono のコンセプト、つまりその「哲学」について説明します。

## Motivation（動機）

最初に、私は **Cloudflare Workers 上で動く Web アプリケーションを作りたい** と思いました。  
しかし、Cloudflare Workers 上で動作する良いフレームワークが存在しなかったのです。  
そこで、自分で Hono を作り始めました。

Trie 木を使ったルーターを実装してみる良い機会だと思っていたところ、  
友人が「**超高速な正規表現ルーター（RegExpRouter）**」を持って現れました。  
さらに、別の友人が **Basic 認証のミドルウェア** を作ってくれました。

Hono は **Web 標準 API（Fetch API, Request, Response など）** のみを使用しているため、  
**Deno** や **Bun** 上でも動作させることができました。  

「Bun に Express はあるの？」と聞かれたとき、  
私たちはこう答えることができます。  
> 「いや、Hono があるよ。」  
（もっとも、今では Express も Bun 上で動作しますが。）

さらに、GraphQL サーバー、Firebase 認証、Sentry ミドルウェアなどを作る仲間もいます。  
Node.js 用のアダプターもあり、**Hono のエコシステムは広がり続けています。**

---

つまり、  
> Hono はとてつもなく速く、  
> たくさんのことを可能にし、  
> そしてどこでも動く。  

私たちは、Hono が「**Web 標準のための標準（Standard for Web Standards）**」  
になり得ると信じています。


