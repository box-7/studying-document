# 再起動戦略（Restart strategies）

PM2でアプリケーションを起動すると、アプリは自動的に再起動されます。対象は以下の場合です：

- アプリがクラッシュしたとき
- Node.jsのイベントループが空になったとき
- アプリが終了したとき
- さらに、追加の再起動戦略も設定可能です：
- CRON指定で再起動
- ファイル変更時に再起動
- メモリ使用量が閾値を超えたときに再起動
- 起動や自動再起動に遅延を設定
- 自動再起動を無効化（通常はクラッシュや終了時に自動再起動される）
- 再起動間隔を指数関数的に増加させる

# CRON再起動
CLIで指定する場合
```
$ pm2 start app.js --cron-restart="0 0 * * *"
# または再起動時
$ pm2 restart app --cron-restart="0 0 * * *"
```
設定ファイルで指定する場合
```
module.exports = {
  apps : [{
    name: 'Business News Watcher',
    script: 'app.js',
    instances: 1,
    cron_restart: '0 0 * * *',
    env: { NODE_ENV: 'development' },
    env_production: { NODE_ENV: 'production' }
  }]
}
```

CRON再起動を無効化する場合：
```
pm2 restart app --cron-restart 0
```
# ファイル変更時の再起動（Watch）

PM2はアプリディレクトリやサブディレクトリ内のファイル変更時に自動で再起動できます。

CLIで指定
```
$ pm2 start app.js --watch
```

注意：--watch で起動した場合、停止してもファイル変更時に再起動されます

完全に監視を無効にするには：
```
pm2 stop app --watch
# または再起動時に toggle
pm2 restart app --watch
```
設定ファイルで指定
```
module.exports = {
  script: "app.js",
  watch: true
}
```

監視対象フォルダ、無視フォルダ、監視間隔も指定可能：
```
module.exports = {
  script: "app.js",
  watch: ["server", "client"],       // 監視フォルダ
  watch_delay: 1000,                 // 監視間隔（ms）
  ignore_watch: ["node_modules", "client/img"]  // 無視フォルダ
}
```
# メモリ使用量による再起動

メモリ閾値を超えた場合、PM2は自動で再起動します

内部ワーカーは30秒ごとにメモリチェックするため、再起動まで少し時間がかかる場合があります

CLIで指定
```
$ pm2 start api.js --max-memory-restart 300M
```
設定ファイルで指定
```
module.exports = {
  script: 'api.js',
  max_memory_restart: '300M'
}
```

単位は K（KB）、M（MB）、G（GB）で指定可能

# 再起動遅延（Restart Delay）

自動再起動時に遅延を入れることも可能

CLIで指定
```
$ pm2 start app.js --restart-delay=3000
```
設定ファイルで指定
```
module.exports = {
  script: 'app.js',
  restart_delay: 3000
}
```
# 自動再起動無効化（No Auto Restart）

1回限りのスクリプトを実行したい場合などに有効

CLIで指定
```
$ pm2 start app.js --no-autorestart
```
設定ファイルで指定
```
module.exports = {
  script: 'app.js',
  autorestart: false
}
```
  
# 特定の終了コードで再起動をスキップ

通常は失敗（非ゼロ終了コード）で再起動

正常終了（0終了コード）の場合は再起動したくない場合は、stop_exit_codes を指定

CLIで指定
```
$ pm2 start app.js --stop-exit-codes 0
```
設定ファイルで指定
```
module.exports = [{
  script: 'app.js',
  stop_exit_codes: [0]
}]
```
指数関数的バックオフ再起動（Exponential Backoff Restart Delay）

例：データベースが落ちた場合など、アプリを無限に再起動させると負荷がかかる

このオプションを使うと、再起動間隔が 徐々に増加 する

CLIで指定
```
$ pm2 start app.js --exp-backoff-restart-delay=100
```
設定ファイルで指定
```
module.exports = {
  script: 'app.js',
  exp_backoff_restart_delay: 100
}
```

# アプリがクラッシュすると、再起動までの時間が指数関数的に増加します

例：ログでの表示
```
PM2      | App [throw:0] will restart in 100ms
PM2      | App [throw:0] exited with code [1] via signal [SIGINT]
PM2      | App [throw:0] will restart in 150ms
PM2      | App [throw:0] exited with code [1] via signal [SIGINT]
PM2      | App [throw:0] will restart in 225ms
```

最大再起動間隔は 15,000ms

安定して30秒以上再起動が発生しなかった場合、再起動間隔は自動で0msにリセットされます

💡 まとめ：

PM2では 多彩な再起動戦略 を設定できる

ファイル変更、メモリ閾値、CRON、指数バックオフなど、状況に応じてアプリを安定稼働させられる