# Quickstart with Prisma Postgres
Prisma / docs  
https://www.prisma.io/docs/getting-started/quickstart-prismaPostgres

## Prisma Postgres

このクイックスタートガイドでは、Prisma ORM と Prisma Postgres データベースを使った TypeScript プロジェクトのゼロからの始め方を学びます。以下のワークフローをカバーしています：

- Prisma Postgres データベースの作成
- スキーママイグレーションとクエリ（Prisma ORM 経由）
- コネクションプーリングとキャッシュ（Prisma Accelerate 経由）

> **Note:** 他の ORM やデータベースライブラリ（Drizzle ORM、TypeORM、Kysely など）と Prisma Postgres を使いたい場合も、この手順に従えます。

## Prerequisites

このチュートリアルを完了するには、以下が必要です：

- Prisma Data Platform (PDP) アカウント
- Node.js がインストールされた環境（サポートされているバージョンはシステム要件を参照）

---

## 1. Prisma Postgres データベースを Platform Console でセットアップ

以下の手順で Prisma Postgres データベースを作成します：

1. Prisma Data Platform にログインし、Console を開きます。
2. 任意のワークスペースで **New project** ボタンをクリックします。
3. **Name** フィールドにプロジェクト名を入力（例：`hello-ppg`）。
4. **Prisma Postgres** セクションで **Get started** ボタンをクリックします。
5. **Region** ドロップダウンで、現在地に最も近いリージョンを選択（例：US East (N. Virginia)）。
6. **Create project** ボタンをクリックします。
7. データベースのステータスが **PROVISIONING** から **CONNECTED** に変わるまで数秒待ちます。
8. 緑色の **CONNECTED** ラベルが表示されたら、データベースの準備完了です！

---

## 2. サンプルのダウンロードと依存関係のインストール

1. Console に表示される `try-prisma` コマンドをコピーし、ターミナルに貼り付けて実行します。

```bash
npx try-prisma@latest \
  --template databases/prisma-postgres \
  --name hello-prisma \
  --install npm
```


2. コマンドが終了したら、プロジェクトディレクトリに移動します：
```
cd hello-prisma
```


## 3. データベース接続 URL の設定

データベースへの接続は、`.env` ファイル内の環境変数で設定します。

1. まず、既存の `.env.example` ファイルの名前を `.env` に変更します：

```bash
mv .env.example .env
```
次に、Platform Console のプロジェクト環境で Set up database access セクションからデータベース認証情報を取得し、DATABASE_URL 環境変数をコピーして .env ファイルに貼り付けます。

参考として、.env ファイルは以下のようになります：

.env
```
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=ey...."
```

## 4. データベーステーブルの作成（スキーママイグレーション）

次に、データベース内にテーブルを作成する必要があります。Prisma CLI を使ってスキーママイグレーションを作成・実行するには、以下のコマンドを実行します：

```bash
npx prisma migrate dev --name init
```
これにより、Prisma スキーマで定義された User と Post モデルがデータベースにマッピングされます。
また、実行された SQL マイグレーションを確認したり、作成されたテーブルは新しく作成された prisma/migrations ディレクトリ内で確認できます。

## 5. Prisma ORM でクエリを実行
src/queries.ts スクリプトには、データベースへの CRUD クエリがいくつか含まれています。
ターミナルで以下のコマンドを実行してスクリプトを実行できます：


```bash
npm run queries
```
スクリプトが完了したら、ターミナルのログを確認するか、Prisma Studio を使ってデータベース内に作成されたレコードを確認できます：

```bash
npx prisma studio
```

## 6. Prisma Accelerate でキャッシュを試す

`src/caching.ts` スクリプトには、Prisma Accelerate を使ってデータベースクエリをキャッシュするサンプルクエリが含まれています。  
このスクリプトでは、Stale-While-Revalidate (SWR) と Time-To-Live (TTL) を使ったキャッシュ処理を行います。実行は以下のコマンドです：

```bash
npm run caching
```
クエリ実行にかかった時間に注目してください。例えば：

graphql
```
The query took 2009.2467149999998ms.
```
次に、もう一度スクリプトを実行します：

bash
```
npm run caching
```
すると、クエリ実行にかかる時間が大幅に短くなっていることが確認できます。例えば：

graphql
```
The query took 300.5655280000001ms.
```

## 7. 次のステップ

このクイックスタートガイドでは、プレーンな TypeScript プロジェクトで Prisma ORM を使い始める方法を学びました。  
さらに Prisma Client API を探索して、例えば `findMany` クエリにフィルタリング、ソート、ページネーションを追加したり、`update` や `delete` などの操作を試したりすることもできます。

### Prisma Studio でデータを探索する

Prisma ORM には、データベース内のデータを表示・編集できる GUI が組み込まれています。  
以下のコマンドで Prisma Studio を開くことができます：

```bash
npx prisma studio
```

Prisma Postgres を使用している場合、プロジェクトの Console 内で Studio タブを選択することで、Prisma Studio を直接利用できます。

### Next.js でフルスタックアプリを作成する

Prisma Postgres をフルスタックアプリで使う方法を学べます：

- Next.js 15 でフルスタックアプリを構築
- Next.js 15 のサンプルアプリ（認証機能付き）

### Prisma ORM のサンプルを確認する

GitHub 上の `prisma-examples` リポジトリには、Prisma ORM をさまざまなライブラリと組み合わせた例があります。  
リポジトリには Express、NestJS、GraphQL の例や、Next.js や Vue.js を使ったフルスタック例など、多数のサンプルがあります。

これらの例はデフォルトで SQLite を使用していますが、各プロジェクトの README に従えば、数ステップで Prisma Postgres に切り替えることができます。

### Prisma コミュニティとつながる

Prisma の学習を続けるために、活発なコミュニティとつながりましょう：

- X（旧 Twitter）でアナウンス、ライブイベント、便利なヒントをフォロー
- Discord に参加して質問したり、コミュニティと交流
- YouTube でチュートリアル、デモ、ストリームを購読
- GitHub でリポジトリにスターをつけたり、Issue を報告したり、貢献する

Prisma コミュニティへの参加は大歓迎です！あなたの関与を心からお待ちしています。

