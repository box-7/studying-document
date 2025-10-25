GitHub Actions　のワークフロー構文  
https://docs.github.com/ja/actions/reference/workflows-and-actions/workflow-syntax

# GitHub Actions ワークフロー構文まとめ

## 1. ワークフローとは
- 自動化プロセスの単位
- 1つ以上の **ジョブ** で構成
- 設定は YAML ファイル (`.github/workflows/*.yml`) で定義

---

## 2. 基本構造

```yaml
name: ワークフロー名  # 任意
on: [push, pull_request]  # トリガー
jobs:
  job_id:
    name: ジョブ名  # 任意
    runs-on: ubuntu-latest  # ジョブ実行環境
    steps:
      - name: ステップ名
        uses: actions/checkout@v5  # アクションを使用
        run: echo "Hello World"    # シェルコマンド
```
3. トリガー (on)
イベント指定でワークフローを起動

例:

yaml
```
on:
  push:
    branches: [main]
  pull_request:
    types: [opened, reopened]
  schedule:  # cron 形式
    - cron: '0 8 * * *'
```
4. ジョブ (jobs)
ワークフロー内で実行される単位

job_id で識別

順序や依存関係を設定可能

yaml
```
jobs:
  build:
    runs-on: ubuntu-latest
  deploy:
    needs: build  # build が成功してから実行
```
5. ステップ (steps)
ジョブ内で順次実行される処理

run でシェルコマンド実行

uses で既存のアクション利用

環境変数や出力変数を設定可能

yaml
```
steps:
  - name: Checkout repository
    uses: actions/checkout@v5
  - name: Run script
    run: echo "Hello World"
    env:
      MY_VAR: value
```

6. その他の機能
マトリックス戦略: 複数 OS / バージョンでのテスト

条件付き実行 (if): ジョブやステップの実行条件

依存関係 (needs): ジョブの順序制御

環境 (env): グローバルやジョブ単位で変数定義

シークレット (secrets): APIキーなど安全に管理

7. 参考
公式ドキュメント: ワークフロー構文
