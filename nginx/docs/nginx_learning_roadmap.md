# Nginx 学習ロードマップ（公式ドキュメント）

## 1. 基礎と概要
まず Nginx の全体像を理解します。

- [Introduction](https://nginx.org/en/docs/)  
  Nginx の概要、用途、基本概念
- [Beginner’s Guide](https://nginx.org/en/docs/beginners_guide.html)  
  Webサーバーとしての基本的な使い方  
  設定ファイル構造 (`nginx.conf`) の理解  
  静的ファイル配信と簡単なリバースプロキシ

---

## 2. 基本設定と管理
日常的に Nginx を操作するための章です。

- [Admin’s Guide](https://docs.nginx.com/nginx/admin-guide/basic-functionality/runtime-control/#control-nginx)  
  プロセス管理やログ取得  
  サーバーの起動・停止・再読み込み方法  
  コマンドラインでの制御方法 (`nginx -s reload` など)
- [Logging / ngx_http_log_module](https://nginx.org/en/docs/http/ngx_http_log_module.html)  
  アクセスログ・エラーログの設定  
  デバッグや運用で必要

---

## 3. HTTP の基本設定
Web サーバーとして最低限知っておくべき内容です。

- [ngx_http_core_module](https://nginx.org/en/docs/http/ngx_http_core_module.html)  
  `server` / `location` / `root` / `index` などの基本ディレクティブ
- [Using nginx as HTTP load balancer](https://nginx.org/en/docs/http/load_balancing.html)  
  リバースプロキシ、バックエンド転送、簡単な負荷分散
- [Configuring HTTPS servers / ngx_http_ssl_module](https://nginx.org/en/docs/http/ngx_http_ssl_module.html)  
  SSL/TLS の設定（HTTPS化）

```
Nginx の公式ドキュメントには、
server ブロックの書き方
listen, server_name, ssl_certificate, location, proxy_pass などのディレクティブの意味
リダイレクトの方法（return 301 …）
try_files の使い方
はすべて説明されています。

例えば公式: Nginx Documentation: Module ngx_http_core_module

server / location / root / index / try_files / proxy_pass の説明があります

※URLが別のものの場合あり
```


---

## 4. 応用・必要に応じて
学習段階では後回しでもよい内容です。

- [Connection processing methods](https://nginx.org/en/docs/)  
  Nginx の処理方式（イベント駆動型、マルチプロセス）  
- [Scripting with njs](https://nginx.org/en/docs/njs/)  
  Nginx 上で簡単なスクリプトを実行する場合  
- [Modules reference](https://nginx.org/en/docs/modules.html)  
  必要なモジュールだけ参照  
- How-To / Development  
  特定の環境や開発に応じて

---

## 学習の優先順位まとめ
1. Introduction  
2. Beginner’s Guide  
3. Admin’s Guide & Controlling nginx  
4. ngx_http_core_module + 静的ファイル・リバースプロキシ  
5. HTTPS / SSL  
6. ログ・デバッグ  
7. Load Balancing（応用）

