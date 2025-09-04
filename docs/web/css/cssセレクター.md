# CSS セレクター

CSSセレクターモジュールは、要素を選ぶパターンを定義して、それに対応するCSSルールを適用する仕組み。  
セレクターは60種類以上あり、結合子は5種類。さらに擬似クラスや擬似要素もある。

CSSでは、セレクターを使ってスタイルを当てたい要素を指定する。  
JavaScriptでも同じセレクターを使い、DOMノードをNodeListとして取得できる。

セレクターは、HTML要素の種類や属性、状態、DOM内の位置などをもとにターゲットを絞れる。  
結合子を使うと、他の要素との関係を考慮してより正確に選択できる。

# 結合子とセパレーター

# 結合子とセパレーター

```css
/* + : 次兄弟結合子
   直前の要素の「すぐ後ろにある兄弟要素」を選択 */
h1 + p { margin-top: 0; }

/* > : 子結合子
   直下の子要素のみを選択 */
div > p { color: blue; }

/* ~ : 後続兄弟結合子
   同じ親を持つ後にあるすべての兄弟要素を選択 */
h1 ~ p { color: green; }

/* " " : 子孫結合子（スペース）
   指定要素のすべての子孫を選択（直下でなくてもOK） */
div p { font-size: 14px; }

/* | : 名前空間セパレーター
   XMLやSVGで名前空間付き要素を選択 */
svg|circle { fill: red; }

/* , : セレクターリスト
   複数のセレクターをまとめて指定（論理OR） */
h1, h2, h3 { margin-bottom: 10px; }

/* || : 列結合子（CSSセレクターモジュールで導入）
   水平方向に隣接する列を選択する新しい結合子
   現時点では対応ブラウザなし */
table||tr { border: 1px solid; }
```  

# CSS セレクターまとめ

```css
/* 擬似クラスの例 */
a:active { color: red; }               /* クリック中のリンク */
a:any-link { text-decoration: underline; } /* すべてのリンク */
input:checked { background: yellow; }  /* チェック済みのチェックボックス/ラジオ */
input:disabled { opacity: 0.5; }       /* 無効化されたフォーム */
p:first-child { font-weight: bold; }   /* 親の最初の子 */

input[type="text"] { border: 1px solid #ccc; } /* 属性セレクター */
.highlight { background: yellow; }            /* クラスセレクター */
#main { padding: 20px; }                      /* IDセレクター */
p { line-height: 1.5; }                       /* 要素型セレクター */
* { margin: 0; padding: 0; }                  /* 全称セレクター */

/* 他の擬似クラスの書き方例 */

/* :default          デフォルト状態のフォーム要素 */
/* :defined          カスタム要素が定義済み */
/* :dir(ltr|rtl)     文字方向（左→右 / 右→左） */
/* :empty            子要素がない要素 */
/* :enabled          有効なフォーム要素 */
/* :first-of-type    同じタグの最初の要素 */
/* :focus            フォーカス中の要素 */
/* :focus-visible    キーボードでフォーカスされた要素 */
/* :focus-within     子要素がフォーカスされている親 */
/* :fullscreen       全画面表示中の要素 */
/* :future           未来の時刻に関連するコンテンツ */
/* :has()            子要素に条件がある親を選択 */
/* :hover            マウスオーバー中の要素 */
/* :in-range         入力が指定範囲内 */
/* :indeterminate    チェックボックスが不定状態 */
/* :invalid          フォーム入力が無効 */
/* :is()             複数のセレクターのいずれかにマッチ */
/* :lang()           特定の言語の要素 */
/* :last-child       親の最後の子 */
/* :last-of-type     同じタグの最後の要素 */
/* :link             未訪問のリンク */
/* :matches()        旧式、:is() の別名 */
/* :modal            モーダルダイアログ */
/* :muted            ミュート状態のメディア */
/* :not()            指定したセレクター以外 */
/* :nth-child(n)     親の n 番目の子 */
/* :nth-of-type(n)   同じタグの n 番目の要素 */
/* :nth-last-child(n)  最後から数えて n 番目の子 */
/* :nth-last-of-type(n) 同じタグの最後から数えて n 番目 */
/* :only-child       唯一の子 */
/* :only-of-type     同じタグの唯一の子 */
/* :open             details タグが開いている */
/* :optional         任意入力のフォーム */
/* :out-of-range     範囲外の入力 */
/* :past             過去のコンテンツ */
/* :paused           再生停止中のメディア */
/* :picture-in-picture PiP 表示中 */
/* :placeholder-shown プレースホルダが表示されている */
/* :playing          再生中のメディア */
/* :popover-open     ポップオーバーが開いている */
/* :read-only        読み取り専用要素 */
/* :read-write       編集可能要素 */
/* :required         必須フォーム */
/* :root             HTML のルート要素 */
/* :scope            現在のコンテキスト要素 */
/* :seeking          再生位置を変更中のメディア */
/* :stalled          メディアロードが停止中 */
/* :target           URL フラグメントにマッチする要素 */
/* :user-invalid     ユーザー入力が無効 */
/* :user-valid       ユーザー入力が有効 */
/* :valid            フォームが有効 */
/* :visited          訪問済みリンク */
/* :volume-locked    音量固定のメディア */
/* :where()          :is() と似ているが優先度ゼロ */
/* :-webkit-         WebKit 専用擬似クラス */
/* :blank            空の要素（ブラウザ未対応） */
/* :current          現在のアイテム（ブラウザ未対応） */
/* :local-link       ローカルリンク（ブラウザ未対応） */
/* :target-within    子要素にターゲットを含む要素（ブラウザ未対応） */
```

# CSS セレクター用語集

```css
/* 擬似クラス
   要素の状態や特定条件にマッチするセレクター */
:active, :hover, :focus

/* 関数記法の擬似クラス
   括弧付きで条件を指定する擬似クラス */
:nth-child(n), :not(selector), :is(selector)

/* 結合子
   複数の要素の関係性を指定して選択 */
+      /* 次兄弟結合子 */
>      /* 子結合子 */
~      /* 後続兄弟結合子 */
" "    /* 子孫結合子 */
||     /* 列結合子（未対応） */

/* 単純セレクター
   タグ名・クラス・ID・属性など、1つの条件で要素を選択 */
div, .class-name, #id-name, [type="text"]

/* 複合セレクター
   単純セレクターを組み合わせて1つの要素を特定 */
div.class-name, input[type="checkbox"]:checked

/* 複雑セレクター
   複合セレクターと結合子を組み合わせて階層・関係を指定 */
div > p:first-child, ul li:nth-of-type(2)

/* 関連セレクター
   要素同士の関係性に基づくセレクターの総称
   例: 結合子や子孫選択など */
h1 + p, div > span

/* 詳細度 (Specificity)
   どのCSSルールが優先されるかを決める指標
   IDセレクター > クラス/属性 > 要素名 */
```

# CSS セレクターガイド

```css
/* =========================
   CSS セレクターと結合子
   ========================= */
/* CSS セレクターと CSS 擬似モジュールで定義されている
   単純セレクターや結合子の概要 */

/* =========================
   CSS セレクターの構造
   ========================= */
/* 単純なセレクターから寛容な相対セレクターリストまでの構造解説
   単純セレクター、複合セレクター、複雑セレクターの理解に役立つ */

/* =========================
   擬似クラス
   ========================= */
/* 文書ツリーには含まれない状態情報に基づき要素を選択するセレクター
   CSSモジュールやHTMLで定義されている */

/* =========================
   :target 擬似クラスの利用
   ========================= */
/* URL のフラグメント識別子をターゲット要素にスタイル設定 */
#section1:target { background: yellow; }

/* =========================
   プライバシーと :visited セレクター
   ========================= */
/* ユーザーのプライバシー保護のため、:visited で設定できるスタイルに制限あり */
a:visited { color: purple; } /* 一部のスタイルのみ反映可 */

/* =========================
   CSS の構成要素: CSS セレクター
   ========================= */
/* 要素型、クラス、ID、属性セレクター、擬似クラス/擬似要素、結合子など */

/* =========================
   学習: UI 擬似クラス
   ========================= */
/* フォーム要素などの状態に応じてスタイルを設定可能 */
input:invalid { border-color: red; }
input:valid { border-color: green; }

/* =========================
   セレクターを使用した DOM 要素の特定
   ========================= */
/* JavaScript の querySelector/querySelectorAll で使用可能 */
const header = document.querySelector("header");   /* 単一要素 */
const items = document.querySelectorAll(".item"); /* 複数要素 */
```

















