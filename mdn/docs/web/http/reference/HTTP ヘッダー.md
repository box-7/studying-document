
# HTTP ヘッダーまとめ（よく使う）

## 1. 基本リクエスト/レスポンス
- **Host**: バーチャルホスト指定
- **User-Agent**: ブラウザやクライアント情報
- **Accept / Accept-Encoding / Accept-Language**: レスポンス形式や圧縮方式の希望
- **Content-Type / Content-Length**: 本文の種類とサイズ
- **Cookie / Set-Cookie**: セッション管理
- **Authorization / WWW-Authenticate**: 認証

## 2. キャッシュ・条件付きリクエスト
- **Cache-Control / Expires / Age**
- **ETag / If-None-Match / If-Modified-Since**
- **Vary**

## 3. 接続管理
- **Connection / Keep-Alive**

## 4. CORS / セキュリティ
- **Origin / Access-Control-Allow-Origin**
- **Strict-Transport-Security (HSTS)**
- **X-Content-Type-Options / X-Frame-Options / CSP**

## 5. ダウンロード / 範囲取得
- **Content-Disposition / Accept-Ranges / Range / Content-Range**

## 6. その他重要ヘッダー
- **Location**（リダイレクト）
- **Referer / Referrer-Policy**
- **Forwarded / Via**（プロキシ情報）  
  

---

# HTTP ヘッダーまとめ

HTTP ヘッダーは、リクエストやレスポンスに追加情報を渡すために使う。

- **HTTP/1.x**  
  - ヘッダー名は大文字小文字を区別しない  
  - `名前: 値` の形式（例: `Allow: POST`）

- **HTTP/2 以降**  
  - ヘッダー名は小文字で表示される（例: `accept: */*`）  
  - 特殊な擬似ヘッダーは `:status: 200` のようにコロンから始まる  

- **独自ヘッダー**  
  - 以前は `X-` プレフィックスを付けていたが、RFC 6648 で非推奨  
  - 標準のヘッダーは IANA レジストリに登録されている  

---

## ヘッダーの分類（コンテキスト別）

- **リクエストヘッダー**  
  リソースやクライアントに関する情報を持つ  

- **レスポンスヘッダー**  
  レスポンスに関する追加情報（サーバー情報やリダイレクト先など）  

- **表現ヘッダー**  
  本体の内容に関する情報（MIMEタイプ、圧縮方式など）  

- **ペイロードヘッダー**  
  コンテンツの長さや転送エンコード方式など、本体の内容とは独立した情報  


## ヘッダーの分類（プロキシ視点）

- **エンドツーエンドヘッダー**  
  - 最終的な宛先（サーバーやクライアント）まで届ける必要がある  
  - プロキシは変更せず再送  
  - キャッシュにも保存される  

- **ホップバイホップヘッダー**  
  - 単一の接続でのみ有効  
  - プロキシが再送したりキャッシュしてはいけない  
  - `Connection` ヘッダーで指定されるものがこれに該当

# HTTP 認証関連ヘッダーまとめ

- **WWW-Authenticate**  
  リソースへアクセスするために使うべき認証方法をサーバーが示す  

- **Authorization**  
  クライアントがサーバーに送る認証情報（ユーザー資格情報）  

- **Proxy-Authenticate**  
  プロキシー経由でリソースにアクセスする際、使用すべき認証方法を示す  

- **Proxy-Authorization**  
  クライアントがプロキシーに送る認証情報（ユーザー資格情報）


# HTTP キャッシュ関連ヘッダーまとめ

- **Age**  
  オブジェクトがプロキシーキャッシュに存在している時間を秒数で表す  

- **Cache-Control**  
  キャッシュの動作を制御するディレクティブ（リクエスト/レスポンス両方で使用）  

- **Clear-Site-Data**  
  サイトに関連するデータ（クッキー、ストレージ、キャッシュなど）を消去する  

- **Expires**  
  レスポンスが有効でなくなる日時を指定する  

- **No-Vary-Search** *(実験的)*  
  URL のクエリ引数がキャッシュ照合にどう影響するかをルールで指定  
  → クエリが違う同じ URL を別キャッシュ項目とするかを決定  

# HTTP 条件付きリクエスト関連ヘッダーまとめ

- **Last-Modified**  
  リソースが最後に変更された日時  
  - 精度は低めだが計算が容易  
  - `If-Modified-Since` / `If-Unmodified-Since` で利用  

- **ETag**  
  リソースのバージョンを一意に識別する文字列  
  - `If-Match` / `If-None-Match` で利用  

- **If-Match**  
  保存されたリソースの ETag が一致する場合にのみリクエストを適用する  

- **If-None-Match**  
  保存されたリソースの ETag が一致しない場合にのみリクエストを適用する  
  - キャッシュ更新や、既存リソースがある場合の新規アップロード防止に利用  

- **If-Modified-Since**  
  リソースが指定日時より後に変更されている場合のみ転送を要求  
  - 主にキャッシュが期限切れのときに利用  

- **If-Unmodified-Since**  
  リソースが指定日時より後に変更されていない場合のみ転送を要求  
  - 楽観的ロックや部分更新の一貫性保証に利用  

- **Vary**  
  キャッシュ利用時に、どのリクエストヘッダーを比較するかを指定  
  - 例: `Vary: Accept-Encoding` → 圧縮方式ごとにキャッシュを区別  

# HTTP 接続管理関連ヘッダーまとめ

- **Connection**  
  転送完了後にネットワーク接続を維持するかどうかを制御  
  - `Connection: keep-alive` → 接続を継続  
  - `Connection: close` → 転送後に接続を切断  

- **Keep-Alive**  
  持続的なコネクションの詳細を制御  
  - 例: `Keep-Alive: timeout=5, max=1000`  
    - `timeout` → 接続維持の秒数  
    - `max` → 再利用できるリクエスト数の上限  

# HTTP ヘッダーまとめ：コンテンツネゴシエーション / 制御 / クッキー

## コンテンツネゴシエーション
クライアントが希望するレスポンスの形式をサーバーに伝える仕組み。

- **Accept**  
  サーバーに返してほしいデータの種類を通知  
  - 例: `Accept: text/html, application/json`

- **Accept-Encoding**  
  サーバーが使えるエンコード（圧縮方式など）を通知  
  - 例: `Accept-Encoding: gzip, deflate, br`

- **Accept-Language**  
  希望する言語を通知（ヒント程度、必ずしも強制ではない）  
  - 例: `Accept-Language: ja, en-US;q=0.9`

- **Accept-Patch**  
  サーバーが **PATCH** リクエストで理解できるメディア型を通知  
  - レスポンスヘッダーで使われる  

- **Accept-Post**  
  サーバーが **POST** リクエストで理解できるメディア型を通知  
  - レスポンスヘッダーで使われる  


## 制御系ヘッダー
- **Expect**  
  サーバーが実行すべき処理への期待を示す  
  - 例: `Expect: 100-continue`

- **Max-Forwards**  
  **TRACE** リクエストで、反映されるまでに許される最大ホップ数を指定  


## クッキー関連
- **Cookie**  
  過去にサーバーから `Set-Cookie` で送られ、保存されているクッキーを送信  

- **Set-Cookie**  
  サーバーからクライアントへクッキーを送信  
  - 例: `Set-Cookie: sessionId=abc123; HttpOnly; Secure`


## CORS 関連
オリジン間でリソースを共有する仕組みを制御するヘッダー。

- **Access-Control-Allow-Credentials**  
  `credentials` フラグが `true` のときにレスポンスを開示してよいかを示す  
  - 例: `Access-Control-Allow-Credentials: true`

- **Access-Control-Allow-Headers**  
  プリフライトレスポンスで、実際のリクエストに使用できるヘッダーを指定  

- **Access-Control-Allow-Methods**  
  プリフライトレスポンスで、利用可能な HTTP メソッドを指定  

- **Access-Control-Allow-Origin**  
  レスポンスをどのオリジンに共有できるかを指定  
  - 例: `Access-Control-Allow-Origin: *`

- **Access-Control-Expose-Headers**  
  クライアントに開示できるレスポンスヘッダーを指定  

- **Access-Control-Max-Age**  
  プリフライトレスポンスをキャッシュできる時間（秒）を指定  

- **Access-Control-Request-Headers**  
  プリフライトリクエストで、実際に使いたいヘッダーを通知  

- **Access-Control-Request-Method**  
  プリフライトリクエストで、実際に使いたい HTTP メソッドを通知  

- **Origin**  
  リクエストがどのオリジンから来たかを示す  

- **Timing-Allow-Origin**  
  リソースタイミング API でアクセスできるオリジンを指定  


## ダウンロード関連
- **Content-Disposition**  
  レスポンスを **ブラウザ内で表示するか**、**ダウンロードさせるか** を指定  
  - 例:  
    - `Content-Disposition: inline`（ブラウザ表示）  
    - `Content-Disposition: attachment; filename="file.txt"`（ダウンロード）


## インテグリティダイジェスト
コンテンツの改ざん検出や完全性保証のためのヘッダー。

- **Content-Digest (Experimental)**  
  `Content-Encoding` / `Content-Range` を考慮して、メッセージ本体のバイト列のダイジェストを提供  

- **Repr-Digest (Experimental)**  
  転送前のリソース表現のダイジェストを提供  
  - `Content-Encoding` / `Content-Range` は考慮しない  

- **Want-Content-Digest (Experimental)**  
  `Content-Digest` をサーバーに要求するウィッシュヘッダー  

- **Want-Repr-Digest (Experimental)**  
  `Repr-Digest` をサーバーに要求するウィッシュヘッダー  


## 整合性ポリシー
サブリソース整合性 (SRI) を強制・監視するためのヘッダー。

- **Integrity-Policy**  
  UA（ブラウザ）が読み込むリソースに **整合性保証** を必須化する  

- **Integrity-Policy-Report-Only**  
  整合性ポリシー違反を **レポートのみ** 行い、実際にはブロックしない  


## メッセージ本体の情報
レスポンスの本文に関するメタ情報。

- **Content-Length**  
  本文のサイズをバイト数で指定  

- **Content-Type**  
  本文の MIME タイプを指定  
  - 例: `text/html`, `application/json`

- **Content-Encoding**  
  本文に適用された圧縮アルゴリズムを指定  
  - 例: `gzip`, `br`

- **Content-Language**  
  本文が意図する言語を指定  
  - 例: `ja`, `en`

- **Content-Location**  
  レスポンスデータの代替 URI を指定  



## 環境設定
リクエストやレスポンスの動作をクライアントが希望として伝える。

- **Prefer**  
  サーバーに希望する動作を伝える  
  - 例: `return=minimal`（最小限のレスポンス）, `respond-async`（非同期処理）  

- **Preference-Applied**  
  サーバーが実際に適用した環境設定をレスポンスで通知  


## プロキシー
プロキシー経由の通信経路に関する情報。

- **Forwarded**  
  プロキシー経由で失われたり変更されたクライアント側の情報を伝える  

- **Via**  
  リクエストやレスポンスが経由したプロキシーを列挙  


## 範囲付きリクエスト
リソースの一部だけを取得するための仕組み。動画再生や大きなファイルの再開ダウンロードに使われる。

- **Accept-Ranges**  
  サーバーが範囲リクエストに対応しているか、対応しているなら単位を示す (`bytes` など)  

- **Range**  
  クライアントが要求する範囲を指定  

- **If-Range**  
  特定の ETag / 日時が一致する場合に限って範囲リクエストを有効化  
  - 異なるバージョンからの混在取得を防ぐ  

- **Content-Range**  
  部分レスポンスが全体のどの位置に対応するかを示す  


## リダイレクト
クライアントに別の URL への遷移を指示。

- **Location**  
  リダイレクト先の URL を指定  

- **Refresh**  
  ページの自動リロードやリダイレクトを指定  
  - HTML の `<meta http-equiv="refresh">` と同


## リクエストコンテキスト
クライアントがサーバーに自分の情報や状況を伝えるために使用するヘッダー。

- **From**: リクエストを送っている人間のメールアドレス（ほぼ使われない）
- **Host**: サーバーのドメイン名とポート番号（バーチャルホスト向け）
- **Referer**: 現在のページへリンクしていた前のページの URL
- **Referrer-Policy**: Referer ヘッダーで送る情報の範囲を制御
- **User-Agent**: ブラウザや OS の種類、バージョンを示す文字列

## レスポンスコンテキスト
サーバーがクライアントにリソースの状態や情報を返すためのヘッダー。

- **Allow**: サポートする HTTP メソッド一覧
- **Server**: サーバーソフトウェアの情報

## セキュリティ
ブラウザに対してセキュリティ上の振る舞いを指示するヘッダー。

- **COEP**: サーバーが指定された文書の埋め込み方針を宣言
- **COOP**: 他ドメインがウィンドウを開いたり制御するのを防ぐ
- **CORP**: 他ドメインからリソースを読み取れないようにする
- **CSP / CSP-Report-Only**: 読み込めるリソースを制御（XSS対策）
- **Expect-CT**: 証明書の透過性をチェック（非推奨）
- **Permissions-Policy**: iframe 内で使用できるブラウザ機能を制御
- **Reporting-Endpoints**: CSP違反などのレポート送信先を指定
- **Strict-Transport-Security (HSTS)**: HTTPS を強制
- **Upgrade-Insecure-Requests**: http リソースを https に自動アップグレード
- **X-Content-Type-Options**: MIMEスニッフィングを防止（nosniff）
- **X-Frame-Options**: ページの iframe 埋め込みを制御（クリックジャッキング対策）
- **X-Permitted-Cross-Domain-Policies**: Flash/Adobe用クロスドメイン制御（レガシー）
- **X-Powered-By**: サーバーやフレームワーク情報（セキュリティ的に出さない方が良い）
- **X-XSS-Protection**: ブラウザ組み込みの XSS フィルタ（非推奨）



## メタデータ読み取りリクエストヘッダー
リクエスト元やリソース利用のコンテキスト情報をサーバーに提供し、許可判断やレスポンス制御に利用される。

- **Sec-Fetch-Site**: リクエスト元と宛先のオリジン関係（cross-site, same-origin, same-site, none）
- **Sec-Fetch-Mode**: リクエストモード（cors, navigate, nested-navigate, no-cors, same-origin, websocket）
- **Sec-Fetch-User**: ユーザー操作によるナビゲーションか（?0=偽, ?1=真）
- **Sec-Fetch-Dest**: リクエストの宛先（audio, audioworklet, document, embed, empty, font, image, manifest, object, paintworklet, report, script, serviceworker, sharedworker, style, track, video, worker, xslt）

### 関連ヘッダー（メタデータ提供）
- **Sec-Purpose**: リクエスト目的（例: prefetch → 将来のナビゲーション用に先読み）
- **Service-Worker-Navigation-Preload**: サービスワーカー起動中に fetch() で先制的リクエストする際に使用

## サーバー送信イベント
ブラウザーが警告やエラーレポートを送信する際に使うサーバーエンドポイント指定。

- **Reporting-Endpoints**: レポート API 送信先を指定
- **Report-To**（非推奨・非標準）: 同上

## 転送エンコーディング
ユーザーへのエンティティ転送方法を制御。

- **Transfer-Encoding**: 転送エンコード形式を指定
- **TE**: ユーザーエージェントが受け入れる転送エンコード形式
- **Trailer**: chunked メッセージの終端に追加フィールドを付与可能


## WebSocket ヘッダー
WebSocket ハンドシェイクや通信で使われるヘッダー。

- **Sec-WebSocket-Accept**: サーバーが WebSocket 接続アップグレードを許可
- **Sec-WebSocket-Extensions**: クライアントの対応拡張機能（リクエスト） / サーバー選択済拡張機能（レスポンス）
- **Sec-WebSocket-Key**: クライアントが接続の意図を示すキー（リクエスト）
- **Sec-WebSocket-Protocol**: クライアントのサブプロトコル推奨順（リクエスト） / サーバー選択サブプロトコル（レスポンス）
- **Sec-WebSocket-Version**: クライアントの WebSocket プロトコルバージョン（リクエスト） / サーバー非対応時に対応バージョンを通知（レスポンス）

## その他ヘッダー

- **Alt-Svc**: 代替サービスのリスト
- **Alt-Used**: 現在使用中の代替サービス
- **Date**: メッセージ発信日時
- **Link**: HTTP でのリンクを表す（HTML <link> と同じ意味）
- **Retry-After**: 次回リクエストまでの待機時間
- **Server-Timing**: レスポンスサイクルの指標・説明
- **Service-Worker**: サービスワーカースクリプトのフェッチに含む情報
- **Service-Worker-Allowed**: パス制限除去用サービスワーカーヘッダー
- **SourceMap**: デバッガー用、元コードへのリンク
- **Upgrade**: 既存接続を別プロトコルにアップグレード（例: HTTP → WebSocket）
- **Priority**: リソースリクエストの優先度ヒント





