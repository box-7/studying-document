# Routers（ルーター）

Honoにおいて、ルーターは最も重要な機能の一つです。  
Hono は5つのルーターを持ちます。

RegExpRouter
TrieRouter
SmartRouter
LinearRouter
PatternRouter

---

## SmartRouter

**SmartRouter** は複数のルーターを利用する際に便利な仕組みで、登録されているルーターから最適なものを自動で選択します。
Honoのデフォルト設定では、SmartRouterが `RegExpRouter` と `TrieRouter` を組み合わせて使用しています。

```ts
// Honoコア内部の設定例
readonly defaultRouter: Router = new SmartRouter({
  routers: [new RegExpRouter(), new TrieRouter()],
})
```