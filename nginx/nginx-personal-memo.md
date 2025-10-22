# プロジェクト確認
### インストールコマンド
EC2のルートでNginxをインストール
```
$ sudo yum install nginx -y
```

### 実行コマンド
EC2のルートで各コマンドを実行
```
# Nginx 起動
sudo systemctl start nginx

# Nginx 停止
sudo systemctl stop nginx

# 再起動（設定反映にも使える）
sudo systemctl restart nginx

# 設定ファイルの文法チェック
sudo nginx -t

# Nginx 設定の再読み込み（停止せず反映）
sudo systemctl reload nginx

# ステータス確認
sudo systemctl status nginx

# 自動起動を有効化
sudo systemctl enable nginx

# 自動起動を無効化
sudo systemctl disable nginx
```

Nginx にはインストール時に デフォルト設定ファイル が入っている  
/etc/nginx/nginx.conf  
/etc/nginx/mime.types  // MIMEタイプごとのマッピングが全部書かれているファイル
ほとんどの設定は 既存テンプレートをコピーして変更 することが多い  

### プロジェクト構成
```
/home/ec2-user/ts-study-record/   ← React のコード
/etc/nginx/nginx.conf              ← nginx の設定ファイル
```


### プロジェクトのetc/nginx/nginx.conf 設定
```
// nginxユーザを設定
user nginx;
//  利用可能なCPUコア数に応じてワーカープロセス数を自動設定する
worker_processes auto;
// エラーログを /var/log/nginx/error.log に「notice」レベルで出力する
error_log /var/log/nginx/error.log notice;
// NginxのプロセスID（PID）ファイルを /run/nginx.pid に保存する
pid /run/nginx.pid;

// 配下の .conf ファイル（動的モジュール設定）を読み込む / 存在しなくても可
include /usr/share/nginx/modules/*.conf;

// Nginxの各ワーカーが同時に1024接続まで処理できるようにする設定
events {
        worker_connections 1024;
}

http {
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

        log_format  main  '$remote_addr - $remote_user [$time_local] "$request"'
                        '$status $body_bytes_sent "$http_referer" '
                        '"$http_user_agent" "$http_x_forwarded_for"';

        // access_log：アクセスログの出力先とフォーマットを指定
        // /var/log/nginx/access.log：ログファイルの保存場所
        // main：log_format で定義したフォーマット名
        access_log  /var/log/nginx/access.log  main;

        // 静的ファイルの送信を最適化し、効率的にファイルを配信する設定
        sendfile            on;
        // TCPパケットの送信タイミングを最適化し、レスポンスのパフォーマンスを向上させる設定
        tcp_nopush          on;
        // クライアントとのKeep-Alive接続のタイムアウト時間（秒）。長めにすると再接続の負荷が減る
        keepalive_timeout   65;
        // MIMEタイプのハッシュテーブルの最大サイズ。多くの拡張子に対応できるようにする設定
        types_hash_max_size 4096;

        // include /etc/nginx/mime.types; : 拡張子ごとのMIMEタイプ定義ファイルを読み込む設定
        include             /etc/nginx/mime.types;
        // default_type application/octet-stream; : MIMEタイプが不明な場合のデフォルト値（バイナリデータとして扱う）
        default_type        application/octet-stream;

        // /etc/nginx/conf.d/ ディレクトリ配下のすべての .conf 設定ファイルを読み込む設定
        include /etc/nginx/conf.d/*.conf;

        // serverブロック（HTTP用）: 80番ポートで待ち受け、sample-web.comへのアクセスをHTTPSへリダイレクトする設定
        server {
                listen 80;
                server_name sample-web.com www.sample-web.com;

                # HTTPからHTTPSへリダイレクト（任意）
                // 301 は「恒久的なリダイレクト（Moved Permanently）」のステータスコード
                // $host はリクエストされたホスト名（例: sample-web.com）
                // $request_uri はリクエストされたパスやクエリ（例: /index.html?foo=bar）
                return 301 https://$host$request_uri;
        }

        # HTTPS (443) の www をリダイレクト
        server {
                listen 443 ssl;
                server_name www.sample-web.com;

                ssl_certificate /etc/letsencrypt/live/sample-web.com/fullchain.pem;
                ssl_certificate_key /etc/letsencrypt/live/sample-web.com/privkey.pem;

                return 301 https://sample-web.com$request_uri;
        }

        // serverブロック（HTTPS用）: 443番ポートで待ち受け、sample-web.comへのHTTPSアクセスを処理する設定
        server {
                listen 443 ssl;
                server_name sample-web.com www.sample-web.com;

                // Let's Encryptで取得したSSL証明書と秘密鍵のパスを指定
                ssl_certificate /etc/letsencrypt/live/sample-web.com/fullchain.pem;
                ssl_certificate_key /etc/letsencrypt/live/sample-web.com/privkey.pem;

                // フロントエンドの静的ファイル（ビルド成果物）を公開するディレクトリ
                root /home/ec2-user/ts-study-record-aws/frontend/dist;
                index index.html;

                // location /records: /records へのリクエストをバックエンドAPI（localhost:4000）へリバースプロキシする設定
                location /records {
                        // リクエストをバックエンドサーバー（Node.jsなど）に転送
                        // backend/server.ts
                        // → Nginx が「受け取り役」で、Nginx 自身が バックエンドサーバーにリクエストを代理送信
                        proxy_pass http://localhost:4000;
                        // 元のホスト名をバックエンドに渡す
                        proxy_set_header Host $host;
                        // クライアントのIPアドレスをバックエンドに渡す
                        proxy_set_header X-Real-IP $remote_addr;
                        // プロキシ経由時の元のIPアドレスを渡す
                        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                        // リクエストのプロトコル（http/https）を渡す
                        proxy_set_header X-Forwarded-Proto $scheme;
                }

                // location /: フロントエンドのSPA（Reactなど）用のルーティング設定
                location / {
                        // ファイルがなければ index.html を返す（SPA対応）
                        try_files $uri $uri/ /index.html;
                }
        }
}
```

#  ドキュメント確認
###  server
https://nginx.org/en/docs/http/ngx_http_core_module.html#server


**自分メモ**  
```
Nginxの「Context（コンテキスト）」とは「その設定ディレクティブ（命令）」をどこに書けるかを示す
```

```
構文:    server { ... }
デフォルト:    —
コンテキスト:    http
```
仮想サーバーの設定を指定します。IPベース（IPアドレスに基づく）と名前ベース（「Host」リクエストヘッダーフィールドに基づく）の仮想サーバーの明確な区別はありません。  
代わりに、listenディレクティブでサーバーが接続を受け付けるべきすべてのアドレスとポートを記述し、server_nameディレクティブですべてのサーバー名を列挙します。  
設定例は「nginxのリクエスト処理方法」ドキュメントに記載されています。  

```
構文:    server_name name ...;
デフォルト:    server_name 「」;
コンテキスト:    server
```
仮想サーバーの名前を設定します。例:
```
server {
// wwwあり、なし両方の設定を記載可能
    server_name example.com www.example.com;
}
```
最初に指定された名前がプライマリサーバー名となります。

サーバー名には、名前の最初または最後の部分を置き換えるアスタリスク（「*」）を含めることができます：
```
server {
    server_name example.com *.example.com www.example.*;
}
```
このような名前はワイルドカード名と呼ばれます。

上記の最初の2つの名前は1つに組み合わせることができます：
```
server {
    server_name .example.com;
}
```

サーバー名に正規表現を使用することも可能です。名前をチルダ（「~」）で開始します：
```
server {
    server_name www.example.com ~^www\d+\.example\.com$;
}
```
正規表現にはキャプチャ (0.7.40) を含めることができ、後で他のディレクティブで使用できます:
```
server {
    server_name ~^(www\.)?(.+)$;

    location / {
        root /sites/$2;
    }
}

server {
    server_name _;

    location / {
        root /sites/default;
    }
}
```  
正規表現内の名前付きキャプチャは変数を生成し（0.8.25）、後続のディレクティブで使用可能:
```
server {
    server_name ~^(www\.)?(?<domain>.+)$;

    location / {
        root /sites/$domain;
    }
}

server {
    server_name _;

    location / {
        root /sites/default;
    }
}
```
ディレクティブのパラメータを「$hostname」(0.9.4)に設定すると、マシンのホスト名が挿入されます。

###  location
https://nginx.org/en/docs/http/ngx_http_core_module.html#location
```
構文:    location [ = | ~ | ~* | ^~ ] uri { ... }
location @name { ... }
デフォルト:    —
コンテキスト:    server, location
```
マッチングは正規化されたURIに対して行われ、その前に「%XX」形式でエンコードされたテキストのデコード、「.」および「..」という相対パスコンポーネントへの参照の解決、および隣接する2つ以上のスラッシュを単一のスラッシュに圧縮する処理が適用されます。

ロケーションは、プレフィックス文字列または正規表現で定義できます。  
正規表現は、先頭に「~*」修飾子（大文字小文字を区別しないマッチング）または「~」修飾子（大文字小文字を区別するマッチング）を付けて指定します。  
特定のリクエストに一致するロケーションを見つけるため、nginx はまずプレフィックス文字列を使用して定義されたロケーション（プレフィックスロケーション）をチェックします。  
その中で、最も長い一致するプレフィックスを持つロケーションが選択され、記憶されます。  
次に、設定ファイル内の出現順に正規表現をチェックします。  
正規表現の検索は最初の一致で終了し、対応する設定が使用されます。  
正規表現との一致が見つからない場合、先に記憶されたプレフィックスロケーションの設定が使用されます。  

locationブロックは、以下で述べる例外を除き、ネストできます。

macOS や Cygwin などの大文字小文字を区別しないオペレーティングシステムでは、プレフィックス文字列との一致は大文字小文字を無視します (0.7.7)。  
ただし、比較は 1 バイトロケールに限定されます。  

正規表現にはキャプチャを含めることができ (0.7.40)、後で他のディレクティブで使用できます。  

最も長い一致するプレフィックスロケーションに「^~」修飾子が付いている場合、正規表現はチェックされません。

また、「=」修飾子を使用すると、URIとロケーションの完全一致を定義できます。  
完全一致が見つかった場合、検索は終了します。  
例えば、「/」リクエストが頻繁に発生する場合、「location = /」を定義すると、最初の比較直後に検索が終了するため、これらのリクエストの処理が高速化されます。  
このようなロケーションには、当然ながらネストされたロケーションを含めることはできません。


バージョン0.7.1から0.8.41では、「=」および「^~」修飾子なしの前置詞ロケーションにリクエストが一致した場合も検索が終了し、正規表現はチェックされませんでした。

上記の動作を例で説明します：
```
location = / {
    [ configuration A ]
}

location / {
    [ configuration B ]
}

location /documents/ {
    [ configuration C ]
}

location ^~ /images/ {
    [ configuration D ]
}

location ~* \.(gif|jpg|jpeg)$ {
    [ configuration E ]
}
```
「/」リクエストは設定Aに、「/index.html」リクエストは設定Bに、「/documents/document.html」リクエストは設定Cに、「/images/1.gif」リクエストは設定Dに、「/documents/1.jpg」リクエストは設定Eにそれぞれ一致します。

**自分メモ**
```
/documents/index.htmlでアクセスした場合、/documents/ で始まるため「最も長くマッチする prefix」 は /documents/のcになり、Bではない
```

「@」プレフィックスは名前付きロケーションを定義します。  
この種のロケーションは通常のリクエスト処理には使用されず、リクエストのリダイレクトに使用されます。  
ネストすることはできず、ネストされたロケーションを含むこともできません。

```
スラッシュ文字で終わるプレフィックス文字列でロケーションが定義され、リクエストが proxy_pass、fastcgi_pass、uwsgi_pass、scgi_pass、memcached_pass、または grpc_pass のいずれかで処理される場合、特別な処理が行われます。  
この文字列とURIが一致する（末尾のスラッシュを除く）リクエストに対しては、スラッシュを付加したURIへの301ステータスコードの永続リダイレクトが返されます。  
これを望まない場合、URIとロケーションの完全一致を以下のように定義できます：
```
```
location /user/ {
    proxy_pass http://user.example.com;
}

location = /user {
    proxy_pass http://login.example.com;
}
```

### root
https://nginx.org/en/docs/http/ngx_http_core_module.html#root
```
構文:    root path;
デフォルト:    root html;
コンテキスト:    http, server, location, if in location
```
リクエストのルートディレクトリを設定します。例えば、以下の設定では
```
location /i/ {
    root /data/w3;
}
```
「/i/top.gif」リクエストに対して /data/w3/i/top.gif ファイルが返されます。

パス値には、$document_root および $realpath_root を除く変数を含めることができます。

ファイルへのパスは、root ディレクティブの値に URI を追加するだけで構築されます。URI を変更する必要がある場合は、alias ディレクティブを使用してください。



### index
Module ngx_http_index_module
https://nginx.org/en/docs/http/ngx_http_index_module.html#index

ngx_http_index_module モジュールは、スラッシュ文字（『/』）で終わるリクエストを処理します。このようなリクエストは、ngx_http_autoindex_module モジュールおよび ngx_http_random_index_module モジュールでも処理できます。

設定例
```
location / {
    index index.$geo.html index.html;
}
```
ディレクティブ
```
構文:    index ファイル ...;
デフォルト:    index index.html;
コンテキスト:    http, server, location
```
インデックスとして使用されるファイルを定義します。ファイル名には変数を含めることができます。ファイルは指定された順序でチェックされます。リストの最後の要素は絶対パスを持つファイルでも構いません。例:
```
index index.$geo.html index.0.html /index.html;
```
インデックスファイルの使用は内部リダイレクトを引き起こし、リクエストが別の場所で処理される可能性がある点に注意してください。例えば、以下の設定の場合：
```
location = / {
    index index.html;
}

location / {
    ...
}
```
「/」リクエストは実際には2番目のlocationで「/index.html」として処理されます。

### try_files
**自分メモ**  
| 順番 | 試す対象 | 意味 |
|------|-----------|------|
| ① | `$uri` | リクエストされたそのままのパスに対応するファイルを探す |
| ② | `$uri/` | そのパスのディレクトリ（末尾にスラッシュがある）を探す |
| ③ | `/index.html` | どちらも無ければ、`index.html` を返す（SPAのルーティング用） |

| 状況 | 動作 |
|------|------|
| 画像やCSS、JSなど、実際に存在するファイル | そのまま返す |
| React/VueなどのSPAで定義された仮想ルート（例: `/about`, `/user/1`） | `index.html` にフォールバックして、クライアント側ルーティングへ |

---

```
構文:    try_files ファイル ... uri;
try_files ファイル ... =コード;
デフォルト:    —
コンテキスト:    server, location
```
指定された順序でファイルの存在を確認し、最初に見つかったファイルをリクエスト処理に使用します。  
処理は現在のコンテキストで実行されます。  
ファイルへのパスは、root および alias ディレクティブに従ってファイルパラメータから構築されます。  
名前の末尾にスラッシュを指定することでディレクトリの存在を確認できます（例: 「$uri/」）。  
いずれのファイルも見つからない場合、最後のパラメータで指定された URI への内部リダイレクトが行われます。  

例:
```
location /images/ {
    try_files $uri /images/default.gif;
}

location = /images/default.gif {
    expires 30s;
}
```
最後のパラメータは、以下の例に示すように名前付きロケーションを指すこともできます。バージョン0.7.51以降では、最後のパラメータはコードにもできます：
```
location / {
    try_files $uri $uri/index.html $uri.html =404;
}
```

Mongrel プロキシの例:
```
location / {
    try_files /system/maintenance.html
              $uri $uri/index.html $uri.html
              @mongrel;
}

location @mongrel {
    proxy_pass http://mongrel;
}
```
Drupal/FastCGI用例:
```
location / {
    try_files $uri $uri/ @drupal;
}

location ~ \.php$ {
    try_files $uri @drupal;

    fastcgi_pass ...;

    fastcgi_param SCRIPT_FILENAME /path/to$fastcgi_script_name;
    fastcgi_param SCRIPT_NAME     $fastcgi_script_name;
    fastcgi_param QUERY_STRING    $args;

    ... その他の fastcgi_param
}

location @drupal {
    fastcgi_pass ...;

    fastcgi_param SCRIPT_FILENAME /path/to/index.php;
    fastcgi_param SCRIPT_NAME     /index.php;
    fastcgi_param QUERY_STRING    q=$uri&$args;

    ... その他の fastcgi_param
}
```
以下の例では、
```
location / {
    try_files $uri $uri/ @drupal;
}
```
try_filesディレクティブは以下と同等です
```
location / {
    error_page 404 = @drupal;
    log_not_found off;
}
```
また、
```
location ~ \.php$ {
    try_files $uri @drupal;

    fastcgi_pass ...;

    fastcgi_param SCRIPT_FILENAME /path/to$fastcgi_script_name;

    ...
}
```
では、try_files は FastCGI サーバーにリクエストを渡す前に PHP ファイルの存在を確認します。
```
WordPressとJoomlaの例:

location / {
    try_files $uri $uri/ @wordpress;
}

location ~ \.php$ {
    try_files $uri @wordpress;

    fastcgi_pass ...;

    fastcgi_param SCRIPT_FILENAME /path/to$fastcgi_script_name;
    ... その他の fastcgi_param
}

location @wordpress {
    fastcgi_pass ...;

    fastcgi_param SCRIPT_FILENAME /path/to/index.php;
    ... その他の fastcgi_param
}
```

### proxy_pass
https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass

```
構文:    proxy_pass URL;
デフォルト:    —
コンテキスト:    location, if in location, limit_except
```
プロキシサーバーのプロトコルとアドレス、およびロケーションをマッピングするオプションのURIを設定します。  
プロトコルとして「http」または「https」を指定できます。  
アドレスはドメイン名またはIPアドレスで指定でき、オプションでポートを指定可能:  

```
proxy_pass http://localhost:8000/uri/;
```
または「unix」の後にコロンで囲んだUNIXドメインソケットパスとして指定:
```
proxy_pass http://unix:/tmp/backend.socket:/uri/;
```

ドメイン名が複数のアドレスに解決される場合、それら全てがラウンドロビン方式で使用されます。さらに、アドレスをサーバーグループとして指定することも可能です。

パラメータ値には変数を含めることができます。この場合、アドレスがドメイン名で指定されると、その名前は記述されたサーバーグループ内で検索され、見つからない場合はリゾルバを使用して決定されます。

リクエスト URI は以下のようにサーバーに渡されます：

proxy_pass ディレクティブに URI が指定されている場合、リクエストがサーバーに渡されると、正規化されたリクエスト URI のロケーションに一致する部分が、ディレクティブで指定された URI に置換されます：
```
location /name/ {
    proxy_pass http://127.0.0.1/remote/;
}
```
URIを指定せずにproxy_passを指定した場合、リクエストURIはクライアントが送信した元の形式のままサーバーに渡されるか、変更されたURIを処理する際には正規化された完全なリクエストURIが渡されます：
```
location /some/path/ {
    proxy_pass http://127.0.0.1;
}
```
バージョン 1.1.12 以前では、URI を指定せずに proxy_pass を指定した場合、変更後の URI ではなく元のリクエスト URI が渡される場合がありました。

リクエスト URI の置換対象部分が特定できない場合があります:

正規表現を使用して location を指定した場合、および名前付きロケーション内で指定した場合。
これらのケースでは、URI を指定せずに proxy_pass を指定する必要があります。

プロキシ先ロケーション内で rewrite ディレクティブにより URI が変更され、この設定がリクエスト処理にそのまま使用される場合 (break):
```
location /name/ {
    rewrite    /name/([^/]+) /users?name=$1 break;
    proxy_pass http://127.0.0.1;
}
```
この場合、ディレクティブで指定された URI は無視され、変更後の完全なリクエスト URI がサーバーに渡されます。

proxy_pass で変数が使用される場合:
```
location /name/ {
    proxy_pass http://127.0.0.1$request_uri;
}
```
この場合、ディレクティブで URI が指定されていると、元のリクエスト URI を置き換えてそのままサーバーに渡されます。

WebSocketプロキシングには特別な設定が必要であり、バージョン1.3.13以降でサポートされています。
```
構文:    proxy_pass_header field;
デフォルト:    —
コンテキスト:    http, server, location
```
プロキシ経由のサーバーからクライアントへ、通常は無効なヘッダーフィールドを渡すことを許可します。
```
構文:    proxy_pass_request_body on | off;
デフォルト:    
proxy_pass_request_body on;
コンテキスト:    http, server, location
```
元のリクエストボディをプロキシサーバーに渡すかどうかを示します。
```
location /x-accel-redirect-here/ {
    proxy_method GET;
    proxy_pass_request_body off;
    proxy_set_header Content-Length 「」;

    proxy_pass ...
}
```
proxy_set_header および proxy_pass_request_headers ディレクティブも参照してください。

```
構文:    proxy_pass_request_headers on | off;
デフォルト:    
proxy_pass_request_headers on;
コンテキスト:    http, server, location
```
元のリクエストのヘッダーフィールドをプロキシ先サーバーに渡すかどうかを示します。
```
location /x-accel-redirect-here/ {
    proxy_method GET;
    proxy_pass_request_headers off;
    proxy_pass_request_body off;

    proxy_pass ...
}
```
proxy_set_header および proxy_pass_request_body ディレクティブも参照してください。
```
構文:    proxy_pass_trailers on | off;
デフォルト:    
proxy_pass_trailers off;
コンテキスト:    http, server, location
```
このディレクティブはバージョン 1.27.2 で登場しました。

プロキシ経由のサーバーからクライアントへのトレーラーフィールドの転送を許可します。


HTTP/1.1 のトレーラーセクションが明示的に有効化されます。
```
location / {
    proxy_http_version 1.1;
    proxy_set_header Connection 「te」;
    proxy_set_header TE 「trailers」;
    proxy_pass_trailers on;

    proxy_pass ...
}
```


