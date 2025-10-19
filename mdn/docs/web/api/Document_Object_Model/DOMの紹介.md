
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


## メモ: DOM は JavaScript 言語の一部ではなく、Web API の 1 つ

### 代表的な Web API
Web API (Application Programming Interface) は、ブラウザが提供している JavaScript から使える機能のセット のこと。

- **DOM API**  
  - `document.querySelector()` や `element.addEventListener()`  
  - HTML や要素を操作する

- **Fetch API**  
  - `fetch("https://example.com")`  
  - ネットワーク通信をする

- **Canvas API**  
  - 2D/3D グラフィックを描画する

- **Web Storage API**  
  - `localStorage` / `sessionStorage`  
  - ブラウザにデータを保存する

- **Geolocation API**  
  - 位置情報を取得する (`navigator.geolocation.getCurrentPosition()`)

- **Web Audio API**  
  - 音声の生成や分析をする

---

### DOM へのアクセス
- DOM を使うのに特別なものは不要
- ブラウザーで実行される JavaScript スクリプトから直接 API にアクセスできる
- `document` や `window` オブジェクトを通じて、文書や要素を操作できる
- コンソールへのメッセージ表示のような簡単な操作でも DOM プログラミングの開始になる

---

## メモ：documentとwindowの違い

### window
- ブラウザのウィンドウ全体を表すグローバルオブジェクト。
- ブラウザのサイズ、URL、タイマー機能（setTimeout）、ポップアップ（alert）などを管理する。
- JavaScriptが実行される環境そのもので、`window.`を省略して呼び出すことが多い。

### document
- window内に読み込まれたHTML文書を表すオブジェクト。
- HTML要素の取得、操作、作成、削除など、ページの内容を直接いじるためのもの。
- DOM (Document Object Model) を通じてHTML要素にアクセスする。
- `document`は`window`オブジェクトのプロパティの一つ。

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

---

# 基本的なデータ型
- DOM コードの多くは HTML 文書の操作が中心  
- DOM 内のノードを「要素」と呼ぶことが多いが、すべてのノードが要素ではない

### データ型と説明
| データ型 (インターフェイス) | 説明 |
|----------------------------|------|
| `Document` | `document` 型のオブジェクト。要素の `ownerDocument` 属性などで取得されるルートの document オブジェクト |
| `Node` | 文書内のすべてのオブジェクトはノード。HTML 文書では要素ノード、テキストノード、属性ノードなどがある**タグ要素以外の、テキスト、コメントなど含む** |
| `Element` | `node` を基にした要素。**タグ要素のみ。** `document.createElement()` で生成され、DOM の Element インターフェイスと Node インターフェイスを実装。HTML 文書ではさらに `HTMLElement` や特定要素向けのインターフェイス（例: `HTMLTableElement`）で拡張 |
| `NodeList` | 要素の配列。`document.querySelectorAll()` などで取得。項目の取得方法: `list.item(1)` または `list[1]` |
| `Attr` | 属性ノード。`createAttribute()` などで取得される特別なオブジェクト。要素のような DOM ノードだが使用頻度は少ない |
| `NamedNodeMap` | 名前または添字でアクセス可能な配列のようなオブジェクト。順序は保証されず、`item()` メソッドで列挙や追加・削除が可能 |

### 例: `<div class="test">`
```
<div class="test">
<!-- <div> は Element ノード
class="test" は Element の属性 (Attr) -->
```

# DOM におけるノードの種類（主なもの）

- **ドキュメントノード**: `document` オブジェクトそのもの。ツリーの最上位にあるルート。

- **要素ノード**: `<html>`, `<body>`, `<div>` などのタグ要素。

- **テキストノード**: 要素の中の文字列。例: `<p>Hello</p>` の `"Hello"`。

- **属性ノード**: 要素の属性。例: `<img src="a.png">` の `src="a.png"`。  
Attr  
href="https://example.com" → 属性ノード  
class="link" → 属性ノード

- **コメントノード**: `<!-- comment -->`。


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
  - `HTMLTableElement` インターフェイス:  
   `createCaption()` や `insertRow()` などのメソッドを持つ
  - `Element` インターフェイス: DOM の要素としての基本的機能
  - `Node` インターフェイス: ノードツリー内の基本ノード機能

- 実際には、これらのインターフェイスを交互に自然に使うことが多い

メモ:  
インターフェイス = 機能の設計図  
オブジェクト = 実際にその設計図を持っている存在

### 例
```js
const table = document.getElementById("table");

// table.attributes は Node/Element インターフェイスで提供される機能
// → このインターフェイスで全ての属性を取得してループできる
const tableAttrs = table.attributes;
for (let i = 0; i < tableAttrs.length; i++) {
  // 各属性ノード (Attr) の名前をチェック
  // "border" 属性を見つけたら HTMLTableElement インターフェイスのプロパティに値をセット
  if (tableAttrs[i].nodeName.toLowerCase() === "border") {
    table.border = "1"; // テーブル固有の操作（HTMLTableElement の機能）
  }
}

// HTMLTableElement インターフェイスのプロパティを直接セット
table.summary = "note: increased border"; // table 要素にサマリー情報を追加
```

---

# メモ: DOM: attributes とは

## attributes の概要
- `attributes` は、DOM の **全ての属性ノード (Attr)** を格納している  
  **`NamedNodeMap`** という特殊なコレクション。
- 配列のようにインデックスでアクセスできるが、  
  実際には配列ではなく `NamedNodeMap` オブジェクト。

## 例

### HTML
```html
<table border="0" width="100"></table>
```
JavaScript
```js
const table = document.querySelector("table");
console.log(table.attributes);
```
結果  
border="0", width="100" などの属性が入った NamedNodeMap を取得できる。  
中身はそれぞれ Attr ノード で、次のようなプロパティを持つ:  
nodeName : 属性名（例: "border", "width"）  
nodeValue: 属性値（例: "0", "100"）

---

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


### メモ: HTML要素と対応するDOMインターフェイス

DOM では、HTML の各要素ごとに対応するインターフェイスが用意されている。  
`HTMLTextAreaElement` は `<textarea>` 専用ですが、他の要素にも同じように専用のインターフェイスがある。

| HTML要素 | インターフェイス | 備考 |
|----------|----------------|------|
| `<div>` | `HTMLDivElement` | 汎用ブロック要素 |
| `<span>` | `HTMLSpanElement` | インライン要素 |
| `<img>` | `HTMLImageElement` | 画像専用 |
| `<a>` | `HTMLAnchorElement` | ハイパーリンク専用 |
| `<h1>`〜`<h6>` | `HTMLHeadingElement` | 見出し用 |
| `<p>` | `HTMLParagraphElement` | 段落 |
| `<ul>` / `<ol>` | `HTMLUListElement` / `HTMLOListElement` | リスト |
| `<li>` | `HTMLLIElement` | リスト項目 |
| `<form>` | `HTMLFormElement` | フォーム |
| `<input>` | `HTMLInputElement` | 入力欄 |
| `<button>` | `HTMLButtonElement` | ボタン |
| `<textarea>` | `HTMLTextAreaElement` | 複数行入力欄 |
| `<table>` | `HTMLTableElement` | テーブル |
| `<tr>` / `<td>` / `<th>` | `HTMLTableRowElement` / `HTMLTableCellElement` | テーブル行・セル |
| `<script>` | `HTMLScriptElement` | スクリプトタグ |
| `<link>` | `HTMLLinkElement` | CSSなどの外部リンク |


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



インターフェイス = 型のようなもの  
型（type）: 「この変数がどんな値を持つか」を表す概念  
インターフェイス（interface）: 「このオブジェクトが持つ機能（メソッドやプロパティ）の設計図」  

違い：  
型: 値の種類（文字列、数値、配列など）を示す  
インターフェイス: 「このオブジェクトはどんな機能を持つか」を示す  












