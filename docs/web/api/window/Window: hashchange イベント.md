# Window: hashchange イベント

`hashchange` イベントは、URL のフラグメント識別子（URL の `#` 記号で始まる部分）が変化したときに発生する。

- バブリング: あり  
- キャンセル: 不可  
- インターフェイス: `HashChangeEvent`  
- イベントハンドラープロパティ: `onhashchange`

## 例

addEventListener を使う場合
```js
window.addEventListener(
  "hashchange",
  function () {
    console.log("The hash has changed!");
  },
  false,
);
```

onhashchange イベントハンドラープロパティを使う場合
```js
function locationHashChanged() {
  if (location.hash === "#cool-feature") {
    console.log("You're visiting a cool feature!");
  }
}

window.onhashchange = locationHashChanged;
```