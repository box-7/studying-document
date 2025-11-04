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

