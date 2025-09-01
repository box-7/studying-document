
# DOM の紹介
[MDN: DOM の紹介](https://developer.mozilla.org/ja/docs/Web/API/Document_Object_Model/Introduction)


### 概要
ドキュメントオブジェクトモデル (Document Object Model, DOM) は、ウェブ文書のコンテンツと構造をオブジェクトとして表現する仕組み。  
DOM を使うと、プログラムから文書構造やスタイル、内容を変更できる。文書はノードとオブジェクトで表現され、プログラミング言語をページに接続できる。



### 特徴
- ウェブページはブラウザーで表示する場合も HTML ソースで表示する場合も、同じ文書を DOM で操作できる  
- DOM はウェブページの完全なオブジェクト指向表現  
- DOM にはすべてのプロパティ、メソッド、イベントがオブジェクトとしてまとめられている  
  - 例: `document` オブジェクト、`HTMLTableElement` など  



### 例

```js
const paragraphs = document.querySelectorAll("p");
// paragraphs[0] は最初の <p> 要素
// paragraphs[1] は 2 番目の <p> 要素
alert(paragraphs[0].nodeName);
```
<br>

# DOM と JavaScript

- DOM はプログラミング言語ではないが、JavaScript からウェブページや HTML/SVG 文書の要素にアクセスするための API
- 文書内のすべての要素（文書全体、`head`、表、セルのテキストなど）は DOM の一部として表現される
- JavaScript を通して DOM の要素にアクセス・操作できる



### ポイント

- DOM は JavaScript 言語の一部ではなく、Web API の 1 つ
- Node.js のような他の環境では DOM API は提供されない
- DOM は言語非依存で設計されており、どの言語からでも操作可能
  - ほとんどのウェブ開発者は JavaScript を使用


### DOM へのアクセス

- DOM を使うのに特別なものは不要
- ブラウザーで実行される JavaScript スクリプトから直接 API にアクセスできる
- `document` や `window` オブジェクトを通じて、文書や要素を操作できる
- コンソールへのメッセージ表示のような簡単な操作でも DOM プログラミングの開始になる



### 簡単な例（console.log）

```html
<html lang="en">
  <head>
    <script>
      // この関数は文書が読み込まれた時に実行される
      window.onload = () => {
        // 空の HTML ページに 2 つの要素を作成
        const heading = document.createElement("h1");
        const headingText = document.createTextNode("Big Head!");
        heading.appendChild(headingText);
        document.body.appendChild(heading);
      };
    </script>
  </head>
  <body></body>
</html>
```
<br>

# 基本的なデータ型

- DOM コードの多くは HTML 文書の操作が中心  
- DOM 内のノードを「要素」と呼ぶことが多いが、すべてのノードが要素ではない



### データ型と説明

| データ型 (インターフェイス) | 説明 |
|----------------------------|------|
| `Document` | `document` 型のオブジェクト。要素の `ownerDocument` 属性などで取得されるルートの document オブジェクト |
| `Node` | 文書内のすべてのオブジェクトはノード。HTML 文書では要素ノード、テキストノード、属性ノードなどがある |
| `Element` | `node` を基にした要素。`document.createElement()` で生成され、DOM の Element インターフェイスと Node インターフェイスを実装。HTML 文書ではさらに `HTMLElement` や特定要素向けのインターフェイス（例: `HTMLTableElement`）で拡張 |
| `NodeList` | 要素の配列。`document.querySelectorAll()` などで取得。項目の取得方法: `list.item(1)` または `list[1]` |
| `Attr` | 属性ノード。`createAttribute()` などで取得される特別なオブジェクト。要素のような DOM ノードだが使用頻度は少ない |
| `NamedNodeMap` | 名前または添字でアクセス可能な配列のようなオブジェクト。順序は保証されず、`item()` メソッドで列挙や追加・削除が可能 |


### 用語の注意

- `Attr` ノードを単に attribute と呼ぶことがある  
- DOM ノードの配列を `nodeList` と呼ぶことがある

### DOM のノード構造例

HTML:

```html
<p>Hello, <b>world</b>!</p>
```

### DOM 階層の例

| ノード       | タイプ    | 説明                           |
|-------------|----------|--------------------------------|
| `p`         | Element  | `<p>` 要素ノード               |
| `"Hello, "` | Text     | `<p>` の子テキストノード（末端） |
| `b`         | Element  | `<b>` 要素ノード               |
| `"world"`   | Text     | `<b>` の子テキストノード（末端） |
| `"!"`       | Text     | `<p>` の子テキストノード（末端） |

- Element ノードは他のノードを子に持てる  
- 末端のノード（葉ノード）はほとんど Text ノードになる  
- テキストコンテンツは Element の子として Text ノードに格納される





# DOM インターフェイス

- DOM 階層構造を操作するオブジェクトとインターフェイスを紹介
- HTML 要素のプロパティは複数のインターフェイスに分かれていることがある
  - 例: `<form>` 要素には `name` が `HTMLFormElement` に、`className` が `HTMLElement` にある

### HTML 要素のプロパティが複数のインターフェイスに分かれている例

```html
<!-- 例 -->
<form id="myForm" name="loginForm" class="form-style"></form>

<script>
const form = document.getElementById("myForm");

// HTMLFormElement インターフェイスのプロパティ
console.log(form.name); // "loginForm"

// HTMLElement インターフェイスのプロパティ
console.log(form.className); // "form-style"
</script>
```


### インターフェイスとオブジェクトの関係

- 多くのオブジェクトは複数のインターフェイスを継承
- 例: `table` オブジェクト
  - `HTMLTableElement` インターフェイス: `createCaption()` や `insertRow()` などのメソッドを持つ
  - `Element` インターフェイス: DOM の要素としての基本的機能
  - `Node` インターフェイス: ノードツリー内の基本ノード機能

- 実際には、これらのインターフェイスを交互に自然に使うことが多い


### 例

```js
const table = document.getElementById("table");

// Node/Element インターフェイス
const tableAttrs = table.attributes;
for (let i = 0; i < tableAttrs.length; i++) {
  // HTMLTableElement インターフェイス: border 属性
  if (tableAttrs[i].nodeName.toLowerCase() === "border") {
    table.border = "1";
  }
}

// HTMLTableElement インターフェイス: summary 属性
table.summary = "note: increased border";
```



## DOM の中で核となるインターフェイス

- DOM で最もよく使われるインターフェイスと関数・属性を列挙
- 目的は API の詳細説明ではなく、よく使われるものをざっと示すこと
- よく使うオブジェクト
  - `window` : ブラウザー全体を表現
  - `document` : 文書のルート

- `Element` は `Node` を継承しており、多くの関数や属性を提供  
- さらに特定の要素は独自のインターフェイスを持つ場合がある（例: `<table>` の `HTMLTableElement`）



### よく使われる DOM API 一覧

- **要素 (Element)**  
  表示上の HTML タグや `<textarea>`、`<div>` などの DOM ノードのことを指す。

| オブジェクト | メソッド / プロパティ | 説明 |
|--------------|--------------------|------|
| `document` | `querySelector()` | CSS セレクターで最初の要素 (Element) を取得 |
| `document` | `querySelectorAll()` | CSS セレクターで一致するすべての要素 (Element) を取得 |
| `document` | `createElement()` | 新しい要素ノード (Element) を作成 |
| `Element` | `innerHTML` | 要素の HTML コンテンツを取得・設定 |
| `Element` | `setAttribute()` | 要素の属性を設定 |
| `Element` | `getAttribute()` | 要素の属性を取得 |
| `EventTarget` | `addEventListener()` | イベントリスナーを追加 |
| `HTMLElement` | `style` | 要素のスタイルを操作 |
| `Node` | `appendChild()` | 子ノードを追加 (Element も Node の一種) |
| `window` | `onload` | ページ読み込み時の処理を設定 |
| `window` | `scrollTo()` | ページを指定位置までスクロール |

<br>

# DOM 例集

### 1. テキストコンテンツの設定

### 概要
- `<div>` 内に `<textarea>` と 2 つの `<button>` がある
- 1つ目のボタンで `<textarea>` にテキストを設定
- 2つ目のボタンでテキストを消去
- 使用 API:
  - `Document.querySelector()` で要素にアクセス
  - `EventTarget.addEventListener()` でクリックを待ち受け
  - `Node.textContent` でテキストを設定・消去

### HTML
```html
<!-- html -->
<div class="container">
  <textarea class="story"></textarea>
  <button id="set-text" type="button">テキストコンテンツを設定</button>
  <button id="clear-text" type="button">テキストコンテンツを消去</button>
</div>
```
```css
/* css */
.container {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
}

button {
  width: 200px;
}
```

```js
// js
const story = document.body.querySelector(".story");

const setText = document.body.querySelector("#set-text");
setText.addEventListener("click", () => {
  story.textContent = "暗くて嵐のような夜でした...";
});

const clearText = document.body.querySelector("#clear-text");
clearText.addEventListener("click", () => {
  story.textContent = "";
});
```

### `<textarea class="story"></textarea>` の DOM 構造

- `story` は **Element (`HTMLTextAreaElement`)**
  - DOM の **Element ノード** として存在
  - `textContent` や `value` を持つ

- `story.textContent` の値 `"暗くて嵐のような夜でした..."` は **Text ノード**
  - Element の子ノードとして扱われる
  - Node の型は **Text**


### 2. 子要素の追加・除去

### 概要
- `<div>` 内に親 `<div>` と 2 つの `<button>` がある
- 1つ目のボタンで子要素を追加
- 2つ目のボタンで子要素を除去

### 使用 API
- `Document.querySelector()` で要素にアクセス
- `EventTarget.addEventListener()` でクリックを待ち受け
- `Document.createElement()` で要素作成
- `Node.appendChild()` で子要素追加
- `Node.removeChild()` で子要素除去

```html
<!-- html -->
<div class="container">
  <div class="parent">親</div>
  <button id="add-child" type="button">子を追加</button>
  <button id="remove-child" type="button">子を除去</button>
</div>
```

```css
/* css */
.container {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
}

button {
  width: 100px;
}

div.parent {
  border: 1px solid black;
  padding: 5px;
  width: 100px;
  height: 100px;
}

div.child {
  border: 1px solid red;
  margin: 10px;
  padding: 5px;
  width: 80px;
  height: 60px;
  box-sizing: border-box;
}
```

```js
// js
const parent = document.body.querySelector(".parent");

const addChild = document.body.querySelector("#add-child");
addChild.addEventListener("click", () => {
  // テキストノード「親」の他に、まだ子ノードがない場合のみ、
  // 子ノードを追加します。
  if (parent.childNodes.length > 1) {
    return;
  }
  const child = document.createElement("div");
  child.classList.add("child");
  child.textContent = "子";
  parent.appendChild(child);
});

const removeChild = document.body.querySelector("#remove-child");
removeChild.addEventListener("click", () => {
  const child = document.body.querySelector(".child");
  parent.removeChild(child);
});
```




