# Set-Cookie ヘッダーの概要
[Set-Cookie 
](https://developer.mozilla.org/ja/docs/Web/HTTP/Reference/Headers/Set-Cookie)

- **役割**  
  `Set-Cookie` は HTTP のレスポンスヘッダーで、サーバーからユーザーエージェント（ブラウザー）へクッキーを送信するために使う。  
  ユーザーエージェントは後でサーバーにクッキーを送り返せる。

- **複数のクッキー**  
  複数のクッキーを送信する場合、レスポンス内で `Set-Cookie` ヘッダーを複数回使用する。

- **注意点**  
  - ブラウザーはフロントエンド JavaScript から `Set-Cookie` ヘッダーにアクセスできない。  
    → Fetch 仕様で `Set-Cookie` は「禁止レスポンスヘッダー名」とされているため。
  - Fetch API や XMLHttpRequest で CORS を使用する場合、リクエストに **資格情報がないと** `Set-Cookie` ヘッダーは無視される。  
    → 資格情報の設定方法は Fetch API / XMLHttpRequest のドキュメントを参照。

- **ヘッダー種別**  
  | 項目 | 値 |
  |------|------|
  | ヘッダー種別 | レスポンスヘッダー |
  | 禁止リクエストヘッダー | いいえ |
  | 禁止レスポンスヘッダー名 | はい |

- **参考**  
  詳細は [HTTP クッキーのガイド](https://developer.mozilla.org/ja/docs/Web/HTTP/Cookies) を参照。


# Set-Cookie の構文

- **基本形式**
```http
Set-Cookie: <cookie-name>=<cookie-value>
オプション付き

http
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>
Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly
Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<number>
Set-Cookie: <cookie-name>=<cookie-value>; Partitioned
Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value>
Set-Cookie: <cookie-name>=<cookie-value>; Secure
Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Strict
Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Lax
Set-Cookie: <cookie-name>=<cookie-value>; SameSite=None; Secure
複数ディレクティブの組み合わせ例

http
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly
```

# Cookie の属性まとめ

## 基本形式
```
<cookie-name>=<cookie-value>
```

- クッキーの名前と値を定義する
- `<cookie-name>`：US-ASCII 文字のみ（制御文字・区切り文字は不可）
- `<cookie-value>`：任意で二重引用符で囲める、特定の制御文字を除くUS-ASCII文字
- パーセントエンコーディング可能（RFCで必須ではない）

### 特殊な名前
- `__Secure-`：Secure 属性必須、HTTPS ページのみ
- `__Host-`：Secure 必須、Domain 指定不可、Path=/ 必須、安全なオリジンのみ

---

## Domain=<domain-value>（省略可）
- クッキー送信対象のホストを指定
- 指定なし → 現在のホストのみ
- ドメインを指定 → そのドメインとサブドメインに送信
- 複数のドメインは指定不可

## Expires=<date>（省略可）
- クッキーの有効期限を示す日時
- 指定なし → セッションクッキー（ブラウザ終了で削除）
- 多くのブラウザではセッション復元機能で復元される場合あり
- 有効期限はクライアント側の時刻で評価

## HttpOnly（省略可）
- JavaScript からアクセス不可（Document.cookieなど）
- サーバーリクエストでは送信される
- XSS攻撃の軽減に有効

## Max-Age=<number>（省略可）
- クッキーの寿命（秒単位）
- 0 または負 → 即時削除
- Expires と併用 → Max-Age 優先

## Partitioned（省略可）
- 分割ストレージで保存（CHIPS）
- Secure 属性も必須

## Path=<path-value>（省略可）
- リクエスト URL に含まれる必要のあるパス
- サブディレクトリも一致
- 例: Path=/docs → /docs, /docs/, /docs/Web/ は送信、/docsets, /fr/docs は送信されない

## SameSite=<samesite-value>（省略可）
- クロスサイトリクエストでの送信制御（CSRF対策）
- 値：
  - `Strict`：同一サイトのリクエストのみ送信
  - `Lax`：リンク遷移など特定条件下で送信（デフォルト）
  - `None`：同一サイト・クロスサイトの両方で送信（Secure 必須）
- Secure 属性なしで None 設定するとブラウザによりブロックされる可能性あり

## Secure（省略可）
- HTTPS 通信時のみサーバーに送信
- HTTP サイトでは設定不可（Chrome 52+, Firefox 52+）
- JavaScript からのアクセスは HttpOnly が無い場合は可能
- 機密情報を完全に守れるわけではない



# Cookie の例まとめ

## セッションクッキー
- クライアント終了で削除
- `Expires` や `Max-Age` が指定されていない場合に作成される

```http
Set-Cookie: sessionId=38afes7a8
```
## 永続的クッキー
特定の日付 (Expires) または期間 (Max-Age) 後に削除
クライアント終了では削除されない

```http
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT
Set-Cookie: id=a3fWa; Max-Age=2592000
```
## 不正なドメイン
オリジンサーバーを含まないドメインは拒否される

提供するドメインのサブドメインへのクッキーも拒否される

```http
Set-Cookie: qwerty=219ffwef9w0f; Domain=some-company.co.uk
Set-Cookie: sessionId=e8bb43229de9; Domain=foo.example.com
```

## クッキーの接頭辞
__Secure- または __Host- は HTTPS かつ Secure が必須
__Host- は / パス必須、Domain 指定不可

```http
// 正しい例
Set-Cookie: __Secure-ID=123; Secure; Domain=example.com
Set-Cookie: __Host-ID=123; Secure; Path=/

// 誤った例
Set-Cookie: __Secure-id=1          // Secure 無し → 拒否
Set-Cookie: __Host-id=1; Secure    // Path=/ 無し → 拒否
Set-Cookie: __Host-id=1; Secure; Path=/; Domain=example.com // Domain 指定 → 拒否
```

## 分離されたクッキー (Partitioned)
Secure が必須
ホスト名にバインドされ、Domain にバインドされないよう __Host- 接頭辞推奨

```http
Set-Cookie: __Host-example=34d8g; SameSite=None; Secure; Path=/; Partitioned;
```



















