### 自己補正するコンポーネント: レンダリング中に状態更新する公式テクニックの解釈  
https://zenn.dev/uhyo/articles/state-update-while-rendering

### ダメな例
```
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // 🔴 Avoid: Adjusting state on prop change in an Effect
  useEffect(() => {
    setSelection(null);
  }, [items]);
  // ...
}
```

### 良い例
```
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // Better: Adjust the state while rendering
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setSelection(null);
  }
  // ...
}
```
# prevItemsを用いた選択状態リセットの仕組み

### 概要
このコードでは、`prevItems`というステートを用意して**前回の `items` の値**を保持しています。  
レンダリング時に `items` と `prevItems` を比較し、内容が異なる場合に `setSelection(null)` を呼び出して選択状態をリセットします。

これにより、**`items` が変わったときに選択状態をリセットする**という仕様を実現しつつ、  
`useEffect` を使用せずに実装が可能となっています。

### 処理のポイント
- **`prevItems` ステート**：前回の `items` の値を保持するために使用  
- **比較ロジック**：レンダリング中に `items` と `prevItems` を比較  
- **リセット条件**：値が異なる場合、`setSelection(null)` を実行  

### レンダリング中のステート更新について
ここでの重要な点は、`setSelection` の呼び出しが **レンダリング中に行われている** ということです。

- 「レンダリング中」とは、**イベントハンドラや `useEffect` 内ではなく、コンポーネント関数本体の実行中**を指します。  
- コンポーネント関数の中で、**返り値（JSX）を返すまでの処理**が「レンダリング中」に該当します。

### メリット
- `useEffect` を使わずに状態リセットを実現できる  
- `items` の変更検知が明示的で、挙動が分かりやすい  


# なぜuseEffectでは良くないのか

### 1. useEffectの本来の目的ではない
`useEffect` は「コンポーネントが存在することによる副作用（サブスクリプション、DOM操作、API通信など）」を扱うためのフックです。  
一方、「`items` の変化を検知して処理を行う」という用途は、副作用ではなく**レンダリングロジックの一部**であり、本来の目的から外れます。  
そのため、このような場合に `useEffect` を使うのは、Reactの**宣言的な設計思想**に反します。

### 2. パフォーマンスとUIの一貫性の問題
`useEffect` はレンダリング後に実行されるため、`items` が変化した直後に  
「新しい `items`」と「古い `selection`」が一時的に共存する状態が発生します。  
これにより、ユーザーが一瞬だけ不整合な画面を目にする可能性があります。  
`useLayoutEffect` なら即時に実行できますが、パフォーマンス面で不利です。

### 結論
`items` の変更に応じて即座に状態をリセットしたい場合は、  
**レンダリング中に比較して更新する方法**のほうが、  
宣言的でありつつパフォーマンス面でも優れています。


# コンポーネントが存在することによる副作用とは

### 副作用（Side Effect）とは
「副作用」とは、**コンポーネントの表示や状態とは直接関係ない処理**のことを指します。  
Reactのレンダリングは「入力（props, state） → 出力（JSX）」という**純粋な関数的処理**が基本ですが、  
それ以外の外部とのやり取り（＝純粋でない処理）が「副作用」です。

### コンポーネントが存在することによる副作用の例
コンポーネントが「画面に存在する間だけ実行される処理」を `useEffect` で書くのが正しい使い方です。  
代表的な例として以下のようなものがあります。

- **サブスクリプション（購読）**  
  WebSocket や Firebase など、リアルタイムデータの**購読（subscribe）**を開始する処理。  
  → コンポーネントがマウントされたときに購読を開始し、アンマウント時に解除する。  
```tsx
  useEffect(() => {
    const unsubscribe = subscribeToChatRoom(id);
    return () => unsubscribe();
  }, [id]);
```
API通信
コンポーネントが表示されたときにデータを取得する。

```
useEffect(() => {
  fetchUserData();
}, []);
```

DOM操作
外部ライブラリを使ってDOMにアクセスしたり、スクロール位置を変更したりする。

```
useEffect(() => {
  document.title = "Hello!";
}, []);
```

### まとめ
つまり、useEffect は「コンポーネントの存在が外部の世界に影響を与える処理」を書く場所です。  
一方、「items が変わったら選択状態をリセットしたい」というのは、  
UIの状態管理ロジックであり、副作用ではないため、useEffect を使うのは適切ではありません。



# 「コンポーネントの表示や状態とは直接関係ない処理」とは

### 意味
Reactのコンポーネントは、**入力（propsやstate）から出力（JSX）を返す純粋な関数**として設計されています。  
つまり、同じ入力なら常に同じ出力になるのが理想です。  

しかし、外部とやり取りするような処理（例：データ取得、ログ出力、DOM操作など）は、  
**その関数の入力や出力以外の場所に影響を与える**ため、  
「コンポーネントの表示や状態とは直接関係ない処理」＝**副作用（side effect）**と呼ばれます。

### 具体例

#### 関係ある処理（＝純粋）
```tsx
function Greeting({ name }: { name: string }) {
  return <p>Hello, {name}!</p>;
}
```
propsが変われば表示が変わるだけ。  
外部には何の影響も与えない。  
Reactが想定する「純粋なコンポーネント」。  
関係ない処理（＝副作用）

```tsx
function Greeting({ name }: { name: string }) {
  console.log("Greeting rendered!"); // ログ出力
  fetch(`/api/hello?name=${name}`);   // ネットワーク通信
  return <p>Hello, {name}!</p>;
}
```
console.log や fetch は、画面表示とは無関係。  
外部（コンソール、サーバー）に影響を与える。  
Reactのレンダリング結果（JSX）とは直接関係がない。  

### まとめ
「コンポーネントの表示や状態とは直接関係ない処理」とは、レンダリングの結果（画面表示）に直接関与しない処理  
Reactの外側（ブラウザ・サーバー・外部APIなど）に影響を与える処理を指します。  
これらは副作用（side effect）であり、Reactでは useEffect に書くのが基本です。