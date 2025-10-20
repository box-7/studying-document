# Prisma Migrate でデータベースの変更をデプロイする
Prisma / docs  
https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-database-changes-with-prisma-migrate

ステージング、テスト、本番環境に保留中のマイグレーションを適用するには、CI/CD パイプラインの一部として `migrate deploy` コマンドを実行します。

```bash
npx prisma migrate deploy
```

> **注意**
> このガイドは MongoDB には適用されません。  
> MongoDB の場合は `migrate deploy` の代わりに `db push` を使用します。

`prisma migrate deploy` をいつ実行するかはプラットフォームによって異なります。  
例えば、Heroku の簡略化されたワークフローは以下の通りです：

- `./prisma/migrations` フォルダをソース管理下に置く
- リリースフェーズで `prisma migrate deploy` を実行する

理想的には、`migrate deploy` は自動化された CI/CD パイプラインの一部として実行されるべきです。  
ローカル環境で本番データベースに変更をデプロイするためにこのコマンドを実行することは一般的に推奨されません（例：一時的に `DATABASE_URL` 環境変数を変更する場合など）。  
また、本番用データベース URL をローカルに保存するのも推奨されません。

**注意事項**  
`prisma migrate deploy` を実行するには、通常 `devDependencies` に追加されている `prisma` 依存関係へのアクセスが必要です。  
Vercel のような一部のプラットフォームでは、ビルド時に開発依存関係を削除するため、このコマンドを実行できない場合があります。  
この問題は、`prisma` を `dependencies` に移動して本番依存関係にすることで回避できます。



## GitHub Actions を使ったデータベース変更のデプロイ

CI/CD の一環として、`prisma migrate deploy` をパイプライン内で実行し、保留中のマイグレーションを本番データベースに適用できます。

以下は、マイグレーションをデータベースに対して実行する GitHub Actions の例です：


```deploy.yml
name: Deploy
on:
  push:
    paths:
      - prisma/migrations/**
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm install
      - name: Apply all pending migrations to the database
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

この例で強調されている行は、`prisma/migrations` ディレクトリに変更があった場合のみこのアクションが実行されることを示しています。そのため、`npx prisma migrate deploy` はマイグレーションが更新された場合にのみ実行されます。

また、`DATABASE_URL` 変数をリポジトリのシークレットとして設定し、接続文字列にクォートを付けないようにしてください。




