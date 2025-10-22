# モジュール ngx_http_log_module
ngx_http_log_module モジュールは、指定された形式でリクエストログを書き込みます。

リクエストは、処理が終了するロケーションのコンテキストでログに記録されます。リクエスト処理中に内部リダイレクトが発生した場合、元のロケーションとは異なる場合があります。

# 設定例
```
// フォーマット定義
log_format compression 『$remote_addr - $remote_user [$time_local] 』
                       『「$request」 $status $bytes_sent 』
                       『「$http_referer」 「$http_user_agent」 「$gzip_ratio」』;

// フォーマットを使用してログ出力
access_log /spool/logs/nginx-access.log compression buffer=32k;
```

---
**自分メモ**  
| 項目 | 内容 |
|------|------|
| **log_format compression ...** | "compression" という名前のログフォーマットを定義 |
| **compression**  | gzip圧縮ではなく「ログフォーマット名」 |
| **$gzip_ratio** | gzip圧縮の圧縮率（圧縮が有効な場合のみ値が出る） |
| **access_log ... compression** | そのログフォーマットを使用してログを出力 |
| **buffer=32k** | ログ出力をバッファして効率化（32KB単位で書き出す） |

```
// my-code.example
// アクセスログの出力フォーマットを定義
- `$remote_addr` : クライアントのIPアドレス
- `$remote_user` : 認証ユーザー名（なければ `-`）
- `$time_local` : ログ記録時のローカル時刻
- `$request` : リクエスト内容（例: GET /index.html HTTP/1.1）
- `$status` : HTTPステータスコード
- `$body_bytes_sent` : 送信したレスポンスボディのバイト数
- `$http_referer` : リファラー（参照元URL）
- `$http_user_agent` : ユーザーエージェント（ブラウザ情報）
- `$http_x_forwarded_for` : プロキシ経由時の元のIPアドレス

log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                '$status $body_bytes_sent "$http_referer" '
                '"$http_user_agent" "$http_x_forwarded_for"';

// access_log：アクセスログの出力先とフォーマットを指定
// /var/log/nginx/access.log：ログファイルの保存場所
// main：log_format で定義したフォーマット名
access_log  /var/log/nginx/access.log  main;
```
→ログ内容  
IP - ユーザー名 [日時] "リクエスト" ステータス バイト数 "リファラー" "ユーザーエージェント" "X-Forwarded-For"

```
xxx.yyy.xxx.yyy - - [22/Oct/2025:02:44:02 +0000] "GET //web/wp-includes/wlwmanifest.xml HTTP/1.1" 200 464 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36" "-"
```

| 項目 | 値 | 説明 |
|------|------|------|
| `$remote_addr` | xxx.yyy.xxx.yyy | アクセス元 |
| `$remote_user` | - | 認証ユーザーなし |
| `$time_local` | [22/Oct/2025:02:44:02 +0000] | ログ記録時刻（UTC） |
| `$request` | GET //web/wp-includes/wlwmanifest.xml HTTP/1.1 | リクエスト内容（WordPress探索） |
| `$status` | 200 | Nginxが返したステータスコード |
| `$body_bytes_sent` | 464 | 応答ボディのバイト数 |
| `$http_referer` | - | 参照元なし（bot直打ち） |
| `$http_user_agent` | Mozilla/5.0... | Chromeを装ったbot |
| `$http_x_forwarded_for` | - | プロキシ経由情報なし |

---

# ディレクティブ
```
構文:    access_log path [format [buffer=size] [gzip[=level]] [flush=time] [if=condition]];
access_log off;
デフォルト:    access_log logs/access.log combined;
コンテキスト:    http, server, location, if in location, limit_except
```
バッファ付きログ書き込みのパス、フォーマット、設定を指定します。  
同一設定レベルで複数のログを指定可能です。  
syslogへの記録は、最初のパラメータに「syslog:」プレフィックスを指定することで設定できます。  
特殊値offは、現在のレベルにおける全てのaccess_logディレクティブを無効化します。  
フォーマットが指定されていない場合、事前定義の「combined」フォーマットが使用されます。  

```
buffer または gzip (1.3.10, 1.2.7) パラメータのいずれかを使用すると、ログへの書き込みはバッファリングされます。
```
バッファサイズは、ディスクファイルへのアトミック書き込みサイズを超えてはなりません。FreeBSD ではこのサイズは制限されません。

バッファリングが有効な場合、データは次の場合にファイルに書き込まれます:

- 次のログ行がバッファに収まらない場合;  
- バッファされたデータがフラッシュパラメータで指定された時間より古い場合（1.3.10, 1.2.7）；  
- ワーカープロセスがログファイルを再オープンするかシャットダウンするとき。  

```
gzipパラメータが使用されている場合、バッファされたデータはファイルへの書き込み前に圧縮されます。
圧縮レベルは1（最速、圧縮率低）から9（最遅、最高圧縮率）で設定可能。
デフォルトではバッファサイズは64Kバイト、圧縮レベルは1に設定される。
データはアトミックブロック単位で圧縮されるため、ログファイルはいつでも「zcat」で展開または読み取り可能。
```
例:
```
access_log /path/to/log.gz combined gzip flush=5m;
```
```
gzip圧縮を機能させるには、nginxをzlibライブラリでビルドする必要があります。
```
ファイルパスには変数を含めることができます（0.7.6以降）、ただしそのようなログには以下の制約があります：

- ワーカープロセスが使用する認証情報を持つユーザーは、そのようなログが存在するディレクトリにファイルを作成する権限を持つ必要があります
- バッファリング書き込みは機能しません
- ログ書き込みごとにファイルが開かれ閉じられます ただし、頻繁に使用されるファイルの記述子はキャッシュに保存できるため、open_log_file_cacheディレクティブのvalidパラメータで指定された期間中は、古いファイルへの書き込みが継続されます。
- 各ログ書き込み時、リクエストのルートディレクトリの存在がチェックされ、存在しない場合はログが作成されません。したがって、rootとaccess_logを同じ設定レベルで指定することが推奨されます：
```
server {
    root       /spool/vhost/data/$host;
    access_log /spool/vhost/logs/$host;
    ...
```

if パラメータ (1.7.0) は条件付きロギングを有効にします。条件が「0」または空文字列と評価された場合、リクエストはログに記録されません。次の例では、応答コード 2xx および 3xx のリクエストはログに記録されません:
```
map $status $loggable {
    ~^[23]  0;
    default 1;
}

access_log /path/to/access.log combined if=$loggable;
```
```
構文:    log_format name [escape=default|json|none] string ...;
デフォルト:    
log_format combined 「...」;
コンテキスト:    http
```
ログ形式を指定します。

escape パラメータ (1.11.8) により、変数内の文字エスケープを json または default に設定できます。デフォルトでは default エスケープが使用されます。none 値 (1.13.10) はエスケープを無効にします。

デフォルトエスケープでは、文字「"」、「\」、および値が32未満（0.7.0）または126以上（1.1.6）の文字は「\xXX」としてエスケープされます。変数値が見つからない場合、ハイフン（「-」）が記録されます。

jsonエスケープでは、JSON文字列で許可されていない全文字がエスケープされます：文字「「」と「\」は「\」」と「\\」に、値が32未満の文字は「\n」「\r」「\t」「\b」「\f」または「\u00XX」にエスケープされます。

ログ形式には、共通変数とログ書き込み時にのみ存在する変数を含めることができます：

- $bytes_sent
クライアントに送信されたバイト数

- $connection
接続シリアル番号

- $connection_requests
接続経由で現在発行されたリクエスト数 (1.1.18)

- $msec
ログ書き込み時の時間（ミリ秒単位の精度で秒単位）

- $pipe
リクエストがパイプライン処理された場合は「p」、それ以外は「.」

- $request_length
リクエストの長さ（リクエスト行、ヘッダー、リクエスト本文を含む）

- $request_time
ミリ秒単位の精度を持つリクエスト処理時間（秒単位）。クライアントからの最初のバイト読み取りから、クライアントへの最後のバイト送信後のログ書き込みまでの経過時間

- $status
レスポンスステータス

- $time_iso8601
ISO 8601標準形式のローカル時間

- $time_local
Common Log Format形式のローカル時間

最新のnginxバージョンでは、変数$status (1.3.2, 1.2.2)、$bytes_sent (1.3.8, 1.2.5)、$connection (1.3.8, 1.2.5)、$connection_requests (1.3.8, 1.2.5)、$msec (1.3.9, 1.2.6)、$request_time (1.3.9, 1.2.6)、$pipe (1.3.12, 1.2.7)、$request_length (1.3.12, 1.2.7)、$time_iso8601 (1.3.12, 1.2.7)、および $time_local (1.3.12, 1.2.7) も共通変数として利用可能です。

クライアントに送信されるヘッダー行には「sent_http_」という接頭辞が付きます。例: $sent_http_content_range。

設定には常に事前定義された「combined」形式が含まれます：
```
log_format combined 『$remote_addr - $remote_user [$time_local] 』
                    『「$request」 $status $body_bytes_sent 』
                    『「$http_referer」 「$http_user_agent」』;
```
```
構文:    open_log_file_cache max=N [inactive=時間] [min_uses=N] [valid=時間];
open_log_file_cache off;
デフォルト:    open_log_file_cache off;
コンテキスト:    http, server, location
```
変数を含む名前を持つ頻繁に使用されるログのファイル記述子を格納するキャッシュを定義します。このディレクティブには以下のパラメータがあります:

- max
キャッシュ内の記述子の最大数を設定します。キャッシュが満杯になると、最近使用されていない記述子（LRU）が閉じられます。
- inactive
この時間内にアクセスがなかった場合、キャッシュされた記述子を閉じるまでの時間を設定します。デフォルトは10秒です。
- min_uses
inactiveパラメータで定義された時間内に、記述子をキャッシュ内で開いたままにするための最小ファイル使用回数を設定します。デフォルトは1回です。
- valid
ファイルが同じ名前で存在しているかを確認すべき間隔を設定します。デフォルトは60秒です。
- off
キャッシュ機能を無効にします。

使用例:
```
open_log_file_cache max=1000 inactive=20s valid=1m min_uses=2;
```


















