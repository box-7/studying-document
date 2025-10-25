https://github.com/appleboy/ssh-action?utm_source=chatgpt.com

# 📖 はじめに
**SSH for GitHub Actions** は、CI/CD ワークフロー内でリモート SSH コマンドを簡単かつ安全に実行するための強力な GitHub Action です。  
Golang と `drone-ssh` で構築されており、マルチホスト、プロキシ、高度な認証を含む幅広い SSH シナリオをサポートします。

## ssh ワークフロー
メインブランチのテスト

---

# 🧩 基本概念と入力パラメータ
このアクションは豊富な設定オプションにより柔軟な SSH コマンド実行を提供します。  
詳細は `action.yml` を参照してください。

---

## 🔌 接続設定
これらのパラメータはアクションのリモートホスト接続方法を制御します。

| パラメータ              | 説明                                        | デフォルト |
|------------------------|-------------------------------------------|-----------|
| host                   | SSHホストアドレス                            |           |
| port                   | SSHポート番号                                | 22        |
| username               | SSHユーザー名                                |           |
| password               | SSHパスワード                                |           |
| protocol               | SSHプロトコルバージョン (tcp, tcp4, tcp6)   | tcp       |
| sync                   | 複数ホスト指定時の同期実行                  | false     |
| timeout                | ホストへのSSH接続タイムアウト               | 30秒      |
| key                    | SSH秘密鍵の内容 (例: `~/.ssh/id_rsa` の生データ) |           |
| key_path               | SSH秘密鍵のパス                              |           |
| passphrase             | SSH秘密鍵のパスフレーズ                      |           |
| フィンガープリント     | ホスト公開鍵のSHA256フィンガープリント      |           |
| use_insecure_cipher    | 追加の（セキュリティの低い）暗号方式を許可する | false     |
| 暗号方式                | 許可される暗号アルゴリズム。指定がない場合は適切なデフォルトを使用 |           |

---

## 🛠️ SSHコマンド設定
これらのパラメータは、リモートホストで実行されるコマンドと関連する動作を制御します。

| パラメータ            | 説明                                                 | デフォルト |
|----------------------|----------------------------------------------------|-----------|
| script               | リモートで実行するコマンド                            |           |
| script_path          | リモートで実行するコマンドを含むリポジトリ内のファイルへのパス |           |
| envs                 | シェルスクリプトに渡す環境変数                        |           |
| envs_format          | 環境変数転送の柔軟な設定                              |           |
| allenvs              | GITHUB_ および INPUT_ プレフィックス付きの全環境変数をスクリプトに渡す | false     |
| command_timeout      | SSHコマンド実行のタイムアウト                         | 10m       |
| debug                | デバッグモードを有効化                                | false     |
| request_pty          | サーバーから疑似端末を要求                            | false     |
| curl_insecure        | 証明書なしでSSLサイトへのcurl接続を許可                 | false     |
| version              | drone-sshバイナリバージョン。指定しない場合、最新版が使用されます |           |

---

## 🌐 プロキシ設定
これらのパラメータは、ターゲットホストへの接続にプロキシ（ジャンプホスト）を使用するかどうかを制御します。

| パラメータ               | 説明                                        | デフォルト |
|-------------------------|-------------------------------------------|-----------|
| proxy_host              | SSHプロキシホスト                            |           |
| proxy_port              | SSHプロキシポート                            | 22        |
| proxy_username          | SSHプロキシユーザー名                        |           |
| proxy_password          | SSHプロキシパスワード                        |           |
| proxy_passphrase        | SSHプロキシ鍵パスフレーズ                     |           |
| proxy_protocol          | SSHプロキシプロトコルバージョン              | tcp       |
| proxy_timeout           | プロキシホストへのSSH接続タイムアウト        | 30秒      |
| proxy_key               | SSHプロキシ秘密鍵の内容                       |           |
| proxy_key_path          | SSHプロキシ秘密鍵のパス                        |           |
| proxy_fingerprint       | プロキシホスト公開鍵のSHA256フィンガープリント |           |
| proxy_cipher            | プロキシで許可される暗号アルゴリズム          |           |
| proxy_use_insecure_cipher | プロキシで安全でない暗号の使用を許可           | false     |

> 注: 削除された `script_stop` オプションを模倣するには、シェルスクリプトの先頭に `set -e` を追加してください。

---

## ⚡ クイックスタート
最小限の設定でワークフロー内でリモート SSH コマンドを実行:

```yaml
name: リモート SSH コマンド
on: [push]

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: パスワードを使用したリモートSSHコマンドの実行
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.HOST }}
          username: linuxserver.io
          password: ${{ secrets.PASSWORD }}
          port: ${{ secrets.PORT }}
          script: whoami
```
```
Output:
markdown
コードをコピーする
======CMD======
whoami
======END======
linuxserver.io
===============================================
✅ すべてのホストでコマンドを正常に実行しました。
===============================================
```




