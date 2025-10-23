### Certbotとは（要約）

無料のオープンソースツール

ウェブサイトに Let's Encrypt のSSL証明書を自動適用し、HTTPS化する

**EFF（Electronic Frontier Foundation）**が開発（サンフランシスコの非営利団体）

| 条件 | 内容 |
|------|------|
| コマンドラインが使える | SSHでサーバーにログインできる |
| 既にHTTPサイトがある（推奨） | ポート80でアクセス可能な状態 |
| ポート80が開放されている | ファイアウォールでブロックされていない |
| 自分でサーバー管理している | VPS / 専用サーバー / クラウドで運用 |
| sudo 権限を持っている | Webサーバー設定反映に必要 |

※HTTPサイトがなくても DNS検証で対応可能

### 主な機能

- SSL証明書の 取得・設定・自動更新（60日ごと）
- Webサーバー（Nginx / Apache）との統合

### 設定方法

自分の環境に合った手順が Certbot 公式で案内される
→ https://certbot.eff.org/

### 役割イメージ
[Certbot] -> Let's Encryptから証明書取得
        -> サーバー設定自動で実行
        -> 定期更新も自動で処理

### 目的
- ウェブの暗号化を広げ、安全で検閲されないインターネットを実現
- EFFのインターネット自由化活動の一部

### 📌 結論
-自分で管理しているサーバーにHTTPSを導入するなら最強のツール
- ただし、管理されているレンタルサーバーなら不要なこともある

---

###  Certbot を使うために必要なもの

1. **操作できるパソコン**
   - コマンドライン（黒い画面）を使うため

2. **コマンドライン操作ができること**
   - SSHでサーバーへ接続して操作する必要あり

3. **HTTPで公開されているウェブサイト（推奨）**
   - http://ドメイン でアクセス可能な状態
   - 証明書の取得・更新が容易になる

4. **ウェブブラウザ**
   - HTTPサイトが表示できればOK


### 🔍 用語の説明

| 用語 | 意味 |
|------|------|
| **コマンドライン** | 文字入力でコンピュータを操作する画面（SSH利用） |
| **HTTP** | 暗号化なしの通信方式（ポート80） |
| **HTTPS** | 暗号化された通信方式（証明書が必要） |


---

### まとめ

--- 

> **SSHで操作できるオンラインのHTTPサイトがあるサーバー**  
> → Certbot で HTTPS化できる 

Certbot 使用手順（Nginx 編）

1️⃣ Certbot の準備

snap でインストールした certbot をコマンドとして使えるようにする：
```
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

2️⃣ 証明書の取得・設定方法を選ぶ
 One-step：証明書取得 & Nginx 自動設定

Certbot が Nginx の設定を自動編集し HTTPS を有効化：
```
sudo certbot --nginx
```
手動設定：証明書のみ取得

自分で Nginx 設定を編集したい場合：
```
sudo certbot certonly --nginx
```

※ 後で server ブロックに証明書パスを手動で追記する必要あり

3️⃣ 自動更新の確認

Certbot の自動更新機能（cron または systemd）が動作するか検証：
```
sudo certbot renew --dry-run
```

更新処理は次のいずれかで管理されています：
```
/etc/crontab/
/etc/cron.*/*

systemctl list-timers
```

4️⃣ HTTPS 動作確認

ブラウザで次へアクセス：
```
https://yourwebsite.com/
```
ロックアイコンが表示されること

証明書が有効期限内であること

### まとめ
```
やりたいこと	コマンド
自動設定で一発HTTPS化	sudo certbot --nginx
証明書だけ取得	sudo certbot certonly --nginx
自動更新テスト	sudo certbot renew --dry-run
```








