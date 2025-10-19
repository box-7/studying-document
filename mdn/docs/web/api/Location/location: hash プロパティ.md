# location.hash プロパティ

`hash` は `Location` インターフェイスのプロパティで、'#' に URL のフラグメント識別子が続く文字列。  
ページ上の ID で、URL がターゲットにしようとしているもの。  

フラグメントは URL デコードされない。  
URL にフラグメント識別子がない場合、このプロパティは空文字列 `""` になる。

## 値
文字列

## 例
```html
<a id="myAnchor" href="/ja/docs/Location.href#Examples">Examples</a>
<script>
  const anchor = document.getElementById("myAnchor");
  console.log(anchor.hash); // '#Examples' を返す
</script>
```
