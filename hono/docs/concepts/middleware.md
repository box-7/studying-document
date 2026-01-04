# Middleware（ミドルウェア）

**Middleware（ミドルウェア）** は、`Handler` の前後で実行される処理であり、  
`Request` や `Response` を扱います。  
構造的には、**タマネギのように層を重ねる仕組み** になっています。

---

## 🧩 例：レスポンスタイムを計測するミドルウェア

次のようにして、レスポンスヘッダーに `"X-Response-Time"` を追加する  
ミドルウェアを定義できます。

```ts
app.use(async (c, next) => {
  const start = performance.now()
  await next()
  const end = performance.now()
  c.res.headers.set('X-Response-Time', `${end - start}`)
})
```

💡 ポイント
- app.use() を使うことで、簡単に独自のカスタムミドルウェアを作成できる

- next() は、次のミドルウェアやハンドラを呼び出すための関数

- Hono 組み込みのミドルウェアや、サードパーティ製のミドルウェアも利用可能



# ミドルウェアと app.use() の解説

## 1. ミドルウェアとは？

### 概要
- **Handler（実際の処理）の前後で動作する関数** のこと  
- 主に **Request（リクエスト）や Response（レスポンス）に処理を追加** するために使われる  
- Web 開発では「**タマネギ構造**」のように、層を重ねて順番に処理されるのが特徴

### イメージ
```
Request → [Middleware1] → [Middleware2] → Handler → [Middleware2後処理] → [Middleware1後処理] → Response
```

- 上から順に実行され、`next()` を呼ぶと次の層に処理が渡る  
- 処理が終わると、下から上に戻って後処理が行われる  

---

## 2. app.use() とは？

- Hono で **ミドルウェアを登録するための関数**  
- 全てのルートに共通で適用される

```ts
app.use(async (c, next) => {
  // 前処理: リクエスト到着時に実行
  await next()  // 次のミドルウェアや Handler に処理を渡す
  // 後処理: Handler 処理後に実行
})
```

### ポイント
c → Context（Request や Response にアクセスできるオブジェクト）

next() → 次のミドルウェアやハンドラーを呼ぶ関数

app.use() に渡した関数は 全てのリクエストで呼ばれる

### まとめ
ミドルウェア = リクエスト/レスポンスを処理する「前処理・後処理」の関数

app.use() = ミドルウェアを Hono アプリに登録する方法

タマネギ構造により、複数のミドルウェアを順番に重ねて適用可能