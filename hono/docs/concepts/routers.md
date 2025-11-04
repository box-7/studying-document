# Routers（ルーター）

Honoにおいて、ルーターは最も重要な機能の一つです。  
Honoには、以下の5種類のルーターがあります。

---

## RegExpRouter

**RegExpRouter** は、JavaScriptの世界で最も高速なルーターです。

名前に「RegExp」とありますが、`path-to-regexp` のようなExpress系の実装ではありません。  
多くのルーターが線形ループで全ルートを走査するのに対し、HonoのRegExpRouterは **「すべてのルートパターンを1つの巨大な正規表現に変換」** して、一度のマッチングで結果を取得します。

このため、Radix Treeのような木構造を使うアルゴリズムよりも、ほとんどのケースで高速に動作します。

ただし、RegExpRouterはすべてのルーティングパターンに対応しているわけではないため、以下の他のルーターと組み合わせて使用されることが多いです。

---

## TrieRouter

**TrieRouter** は Trie木（トライ木）アルゴリズムを用いたルーターです。  
線形ループを使用しない点ではRegExpRouterと同様です。

RegExpRouterほど高速ではありませんが、Expressのルーターよりは大幅に速く、**すべてのルーティングパターンをサポート** しています。

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