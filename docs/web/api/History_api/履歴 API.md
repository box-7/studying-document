# 履歴 API

履歴 API は、ブラウザーのセッション履歴 (WebExtensions history と混同しないように) へのアクセスをグローバルの `history` オブジェクトを介して提供している。このオブジェクトは、ユーザーの履歴の中を前のページや後のページへ移動したり、履歴スタックの中を操作したりするのに便利なメソッドやプロパティが提供されている。

メモ: この API が利用可能なのはメインスレッド (Window) のみ。Worker や Worklet ではアクセスできない。

---

## 概念と使用方法

### 前のページや次のページへの移動

```js
// 前のページへ戻る（ブラウザの戻るボタンと同じ動作）
history.back();

// 次のページへ進む（ブラウザの進むボタンと同じ動作）
history.forward();
```

履歴内の特定の位置まで移動
```js
// ひとつ前のページへ戻る
history.go(-1);

// ひとつ先のページへ進む
history.go(1);

// 2ページ先に進む
history.go(2);

// 現在のページを再読み込み
history.go(0);
history.go();
```

履歴スタックの数を取得
```js
const numberOfEntries = history.length;
```

インターフェイス
- History  
ブラウザーのセッション履歴を操作できる。

- PopStateEvent  
popstate イベントのインターフェイス。

例: popstate イベントと履歴操作
```js
window.addEventListener("popstate", (event) => {
  alert(
    `location: ${document.location}, state: ${JSON.stringify(event.state)}`
  );
});

history.pushState({ page: 1 }, "title 1", "?page=1");
history.pushState({ page: 2 }, "title 2", "?page=2");
history.replaceState({ page: 3 }, "title 3", "?page=3");

history.back(); // alerts "location: http://example.com/example.html?page=1, state: {"page":1}"
history.back(); // alerts "location: http://example.com/example.html, state: null"
history.go(2);  // alerts "location: http://example.com/example.html?page=3, state: {"page":3}"
```

# 履歴 API: pushState と replaceState

ブラウザの履歴を操作するためのメソッド。ページ遷移せずに URL や状態を変更できる。

---

## history.pushState(state, title, url)

- **新しい履歴エントリを追加**する
- ページはリロードされない
- 「戻る」ボタンで前の状態に戻れる
- 引数:
  1. `state`：任意のオブジェクト（popstate イベントで取得可能）
  2. `title`：タイトル文字列（無視されることが多い）
  3. `url`：同一オリジンの URL

```js
history.pushState({ page: 1 }, "title 1", "?page=1");
history.pushState({ page: 2 }, "title 2", "?page=2");
```

# 履歴 API: replaceState

ブラウザの履歴の**現在のエントリを置き換える**メソッド。ページ遷移せずに URL や状態を変更できる。

---

## history.replaceState(state, title, url)

- **現在の履歴エントリを置き換える**
- ページはリロードされない
- 「戻る」ボタンでは置き換え前の状態には戻れない
- 引数:
  1. `state`：任意のオブジェクト（popstate イベントで取得可能）
  2. `title`：タイトル文字列（ブラウザによって無視されることが多い）
  3. `url`：同一オリジンの URL

```js
// 現在の履歴を置き換える例
history.replaceState({ page: 3 }, "title 3", "?page=3");
```



