# Request: credentials プロパティ

`credentials` は Request インターフェイスの読み取り専用プロパティで、`Request()` コンストラクターの `credentials` オプションで指定された値を反映する。  
このプロパティは、ブラウザーがリクエストに資格情報を送信するかどうか、また `Set-Cookie` レスポンスヘッダーを尊重するかどうかを決定する。

資格情報とは、クッキー、TLS クライアント証明書、ユーザー名とパスワードを格納する認証ヘッダーなど。

---

## 値の種類

| 値 | 説明 |
|-----|------|
| `omit` | リクエストに資格情報を送信せず、レスポンスにも資格情報を含めない。 |
| `same-origin` | 同一オリジンのリクエストにのみ資格情報を送信し、レスポンスに含める。 |
| `include` | オリジン間のリクエストでも常に資格情報を含める。 |

---

## 例

```js
// スクリプトと同じディレクトリーの画像ファイルに対して Request を生成
const request = new Request("flowers.jpg");
const credentials = request.credentials; // 既定では "same-origin" を返す
```


