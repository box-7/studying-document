# HTTP Cookie の使用

[HTTP Cookie の使用
](https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/Cookies)


Cookie（ウェブ Cookie、ブラウザー Cookie）は、サーバーがユーザーのブラウザーに送る小さなデータ。  
ブラウザーはこれを保存・作成・変更し、同じサーバーにリクエストする時に送り返す。  
これによりウェブアプリは状態を記憶できる（HTTP は基本ステートレス）。

---

## In this article

- Cookie の用途  
- Cookie の作成、削除、更新  
- セキュリティ  
- プライバシーとトラッキング  
- 関連情報

## Cookie の用途

サーバーは Cookie を使って、同じブラウザー/ユーザーからのリクエストかどうかを判別する。  
その上で、必要に応じて個人設定されたレスポンスや共通のレスポンスを返す。

### 基本的なログインシステムの流れ

1. ユーザーがフォーム送信などでログイン情報をサーバーに送信  
2. 認証が成功すると、サーバーはログイン状態を示す **セッションID** を含む Cookie を返す  
3. 後日、ユーザーが同じサイトの別ページへ移動すると、ブラウザーはその Cookie（セッションID）をリクエストと一緒に送信  
4. サーバーはセッションIDを確認  
   - 有効 → 個人設定されたページを返す  
   - 無効 → Cookie を削除し、一般ページまたは「アクセス拒否」などを返す

![alt text](https://developer.mozilla.org/shared-assets/images/diagrams/http/cookies/cookie-basic-example.png)


# Cookie の用途とストレージとの違い

## Cookie の主な用途
- **セッション管理**  
  ログイン状態、ショッピングカート、セッションIDの保持など。  

- **パーソナライズ**  
  表示言語、UIテーマ、ユーザーごとの設定。  

- **トラッキング**  
  ユーザーの行動分析や広告のパーソナライズ。  

---

## Cookie をストレージに使う問題点
- サイズ制限: 1つあたり最大 **4KB**  
- 件数制限: ドメインごとに数百件まで（ブラウザ依存）  
- 毎回リクエストに送信されるため通信が重くなる  

---

## 他のストレージ API
- **Web Storage API (localStorage / sessionStorage)**  
  - サーバーには送信されない  
  - 5MB以上保存可能  
  - UI設定や軽いデータ保存向き  

- **IndexedDB**  
  - 大量・構造化データを保存可能  
  - JSONや画像、動画も扱える  
  - オフラインアプリに最適  

---

## まとめ
- ログインやセッション管理 → **Cookie**  
- UI設定やキャッシュ → **localStorage / sessionStorage**  
- 複雑・大量データ → **IndexedDB**

# Cookie の作成・送信

- サーバーは HTTP レスポンスで `Set-Cookie` ヘッダーを送信してブラウザーに Cookie を設定させる
- 1つのレスポンスで複数の Cookie を設定可能（ヘッダーを複数行送る）
- ブラウザーは受信後、次回リクエスト時に保存した Cookie を送信

## 例: 複数 Cookie の設定と送信

```http
# レスポンスで Cookie を設定
HTTP/2.0 200 OK
Content-Type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry

# 次回リクエストで Cookie を送信
GET /sample_page.html HTTP/2.0
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```


# Cookie の削除・持続時間

Cookie は `Expires` または `Max-Age` 属性で有効期限を指定できる  
期限を過ぎるとブラウザーは自動で削除し、リクエストに送信されなくなる

## 永続的 Cookie

- `Expires` 属性で指定された日時後に削除
Set-Cookie: id=a3fWa; Expires=Thu, 31 Oct 2021 07:28:00 GMT;


- `Max-Age` 属性で指定した秒数後に削除
Set-Cookie: id=a3fWa; Max-Age=2592000

- `Expires` と `Max-Age` 両方設定されている場合、`Max-Age` が優先される

## セッション Cookie

- `Expires` や `Max-Age` がない Cookie
- ブラウザーセッション終了時に削除される
- ブラウザーによっては再起動時に復元される場合もある

## セキュリティメモ

- 認証サイトではセッション Cookie を再生成して再送信することで、セッション固定攻撃を防げる
- 「ゾンビ Cookie」は削除後に再生成される Cookie 技術で、プライバシーや法規制に違反する可能性がある



# Cookie の値の更新

## サーバー側での更新
HTTP 経由で Cookie を更新するには、既存の Cookie 名と新しい値を `Set-Cookie` ヘッダーで送信する

Set-Cookie: id=new-value

用途例: ユーザーの環境設定変更など、クライアント側データに反映させたい場合  
（ウェブストレージ API を使う方法もある）

## JavaScript での更新
ブラウザーでは `Document.cookie` または Cookie Store API を使って Cookie を作成・更新できる  
```
document.cookie = "yummy_cookie=choco";
document.cookie = "tasty_cookie=strawberry";

console.log(document.cookie);
// 出力: "yummy_cookie=choco; tasty_cookie=strawberry"

document.cookie = "yummy_cookie=blueberry";

console.log(document.cookie);
// 出力: "tasty_cookie=strawberry; yummy_cookie=blueberry"
```

### セキュリティ上の注意
- fetch() や XMLHttpRequest でリクエスト開始時に Cookie ヘッダーを書き換えることはできない
- HttpOnly 属性がついた Cookie は JavaScript から変更不可
- Cookie を安全に扱うには、サーバー側での更新やセキュリティ設定を優先する

# Cookie のセキュリティ

## Cookie のリスク
- Cookie は既定でエンドユーザーが閲覧・変更可能
- 悪意あるユーザーがセッションIDを盗むと、他人になりすましてログインできる
- 潜在的影響は、アプリ動作異常から銀行口座などの不正操作まで幅広い

## Cookie の保護方法

### 1. Secure 属性
- HTTPS 上のみ Cookie を送信
- HTTP では送信されず、中間者攻撃から保護
- ただしクライアントのハードディスクからのアクセスは防げない
```
Set-Cookie: id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure
```

### 2. HttpOnly 属性
- JavaScript の `Document.cookie` からアクセス不可
- サーバーにのみ送信
- サーバー側セッション Cookie に推奨
- XSS 攻撃の緩和に役立つ
```
Set-Cookie: id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; HttpOnly
```

### 注意点
- 機密情報を直接 Cookie に保存するよりも、サーバー側で照合する不透明な識別子や
  JSON Web Tokens の使用を検討するとより安全

# Cookie の送信先と制御

## Domain 属性
- Cookie を送信可能なサーバーを指定
- サブドメインでも利用可能
- 指定なしの場合、設定したサーバーでのみ利用可能
- サーバーは自分のドメインまたは親ドメインにのみ設定可能
```
Set-Cookie: id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly; Domain=mozilla.org
```


## Path 属性
- Cookie を送信するリクエストの URL パスを指定
- ディレクトリ階層も一致する
- サブディレクトリのみ一致
```
Set-Cookie: id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly; Path=/docs
```

```
一致するパス例:
/docs
/docs/
/docs/Web/
/docs/Web/HTTP

一致しないパス例:
/
/docsets
/fr/docs
```


## SameSite 属性
- サードパーティ Cookie の送信制御
- 値:
  - **Strict**: 発行元サイトからのリクエストのみ送信
  - **Lax**: 発行元サイトへのナビゲーション時も送信
  - **None**: サイト間リクエストでも送信（Secure 必須）
```
Set-Cookie: cart=110045_77895_53420; SameSite=Strict
Set-Cookie: affiliate=e4rt45dw; SameSite=Lax
Set-Cookie: widget_session=7yjgj57e4n3d; SameSite=None; Secure; HttpOnly
```


- 設定がない場合、既定で Lax 扱い

## Cookie の接頭辞
- **__Host-**: Secure, Path=/, Domain 指定なし、オリジン安全な場合のみ受理
- **__Secure-**: Secure, 安全なオリジンから送信される場合のみ受理
- 適合しない場合、ブラウザーは拒否
- セッション固定攻撃への防御に有効

- アプリは完全な Cookie 名（接頭辞含む）をチェックする必要がある

# プライバシーとトラッキング
```
- サードパーティ Cookie は、<iframe> などで埋め込まれた外部コンテンツによって設定される
- 正当な用途:
  - ユーザープロファイル情報の共有
  - 広告表示回数のカウント
  - 異なるドメインにわたる分析情報の集合

- 悪用される場合:
  - 複数サイトで同じブラウザーから送信された Cookie に基づきユーザーの閲覧履歴や習慣を追跡
  - 例: あるサイトで検索した製品情報が、別サイトでも広告として表示される

- ブラウザーの対応:
  - サードパーティ Cookie を既定でブロック、または制限を強化する方向
  - 設定や拡張機能でトラッキング Cookie をブロック可能

- 開発者への注意:
  - サードパーティ Cookie に依存すると、機能が意図通り動かない場合がある
  - 依存を減らす方法を検討する必要あり

- 参考:
  - サードパーティ Cookie の詳細、課題、代替策は関連記事参照
  - プライバシー全般はプライバシーのランディングページを参照
```

# Cookie に関する法規制

## 主な規制
- **EU 一般データ保護規則 (GDPR)**
- **EU ePrivacy 指令**
- **カリフォルニア州消費者プライバシー法 (CCPA)**
  - 総収入 2,500 万ドルを超える事業体に適用

> これらの規制は対象地域のユーザーがアクセスする全世界のサイトに影響するため、国際的な広がりがある

## 規制の主な要件
- Cookie の使用をユーザーに通知する
- ユーザーが一部または全ての Cookie をオプトアウトできるようにする
- ユーザーが Cookie を受け取らなくても、サービスの大部分を利用できるようにする

## 注意
- 地域ごとに他の規制が存在する可能性あり
- 規制の理解と遵守は運営者の責任
- 「Cookie 禁止」コードを提供する企業もあり、規制遵守に役立つ




