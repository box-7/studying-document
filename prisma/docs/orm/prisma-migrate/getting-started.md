# Prisma Migrate の始め方

このページでは、Prisma Migrate を使って開発環境でスキーマをマイグレーションする方法を説明します。

## Prisma Migrate をゼロから始める

開発環境で Prisma Migrate を始めるには、まず Prisma スキーマを作成します：


### 1. Create a Prisma schema:
```
schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int    @id @default(autoincrement())
  name  String
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  published Boolean @default(true)
  authorId  Int
  author    User    @relation(fields: [authorId], references: [id])
}
```


ヒント

スキーマ内でネイティブ型マッピング属性を使用して、作成するデータベース型を正確に指定できます（例：String は varchar(100) や text にマップ可能）。

最初のマイグレーションを作成する
```
prisma migrate dev --name init
```

CLI 結果例：
省略

```
migrations/
  └─ 20210313140442_init/
    └─ migration.sql
```

これで Prisma スキーマとデータベーススキーマが同期され、マイグレーション履歴が初期化されます。

### 2. スキーマに追加のフィールドを加える
```
model User {
  id       Int    @id @default(autoincrement())
  jobTitle String
  name     String
  posts    Post[]
}
```
### 3. 2回目のマイグレーションを作成する
```
prisma migrate dev --name added_job_title
```

Prisma スキーマは再びデータベーススキーマと同期され、マイグレーション履歴には2つのマイグレーションが含まれています：

```
migrations/
  └─ 20210313140442_init/
    └─ migration.sql
  └─ 20210313140442_added_job_title/
    └─ migration.sql
```

これで、マイグレーション履歴をソース管理でき、テスト環境や本番環境への変更適用に使用できます。  

# 既存プロジェクトに Prisma Migrate を追加する手順
既存のプロジェクトに Prisma Migrate を追加する際の手順は以下の通りです：

- データベースをイントロスペクトして Prisma スキーマを更新する
- ベースラインマイグレーションを作成する
- Prisma スキーマ言語でサポートされていない機能に対処するためにスキーマやマイグレーションを更新する
- ベースラインマイグレーションを適用する
- マイグレーション履歴と Prisma スキーマをコミットする


### Prisma スキーマの作成または更新のためのインスペクション

Prisma スキーマがデータベーススキーマと同期していることを確認します。  
以前のバージョンの Prisma Migrate を使用している場合は、すでに同期されているはずです。

データベースをインスペクトして Prisma スキーマを最新の状態にするには、次のコマンドを実行します：

```bash
prisma db pull
```



### ベースラインマイグレーションの作成

ベースラインとは、既存のデータベースに対してマイグレーション履歴を初期化するプロセスです。  

ベースラインを行う対象のデータベースは以下の条件を満たします：

- Prisma Migrate を使用する前から存在している
- データを維持する必要がある（例：本番環境）、そのためデータベースをリセットできない

ベースラインを作成すると、Prisma Migrate は「すでに1つ以上のマイグレーションが適用されている」と仮定します。  
これにより、既存のテーブルやフィールドを作成しようとする際に生成されたマイグレーションが失敗するのを防ぐことができます。

#### ベースラインマイグレーションの作成手順

1. `prisma/migrations` フォルダがある場合は、削除、移動、名前変更、またはアーカイブします。
2. 以下のコマンドを実行して、希望する名前でマイグレーションディレクトリを作成します。  
   この例では、マイグレーション名として `0_init` を使用します。

```bash
mkdir -p prisma/migrations/0_init
```

> **注意**  
> `0_` は重要です。Prisma Migrate はマイグレーションを辞書順（lexicographic order）で適用するためです。  
> 現在のタイムスタンプなど、別の値を使用することもできます。

マイグレーションを生成し、ファイルに保存するには `prisma migrate diff` を使用します：

```bash
npx prisma migrate diff \
--from-empty \
--to-schema-datamodel prisma/schema.prisma \
--script > prisma/migrations/0_init/migration.sql
```

### Prisma Schema Language でサポートされていない機能への対応

既存のデータベースにあるサポートされていない機能を含める場合、初期マイグレーションの SQL を置き換えるか修正する必要があります。

1. **初期マイグレーションで生成された `migration.sql` ファイルを開く**  
2. **生成された SQL を修正する**  
   例：
   - 変更が小さい場合は、生成されたマイグレーションに追加のカスタム SQL を追記できます。  
     以下の例では部分インデックスを作成しています：
     ```sql
     /* Generated migration SQL */
     CREATE UNIQUE INDEX tests_success_constraint ON posts (subject, target)
       WHERE success;
     ```
   - 変更が大きい場合は、データベースダンプ（`mysqldump` や `pg_dump`）の結果でマイグレーションファイル全体を置き換える方が簡単です。  
     `pg_dump` を使用する場合は、以下のコマンドで `search_path` を更新する必要があります：
     ```sql
     SELECT pg_catalog.set_config('search_path', '', false);
     ```
     これを行わないと、以下のエラーが発生します：
     ```
     The underlying table for model '_prisma_migrations' does not exist.
     ```

> **注意**  
> すべてのテーブルを一度に作成する場合、テーブルの順序が重要です。外部キーは同じステップで作成されるためです。  
> そのため、テーブルの順序を入れ替えるか、制約の作成をすべてのテーブル作成後に最後のステップで行うことで、`can't create constraint` エラーを回避できます。

### 初期マイグレーションの適用

初期マイグレーションを適用するには、以下の手順を行います。

1. **データベースに対して次のコマンドを実行**  
```bash
npx prisma migrate resolve --applied 0_init
```
データベーススキーマを確認
マイグレーションが期待通りの状態になっているか確認します（例：本番データベースのスキーマと比較）。

これで、新しいマイグレーション履歴とデータベーススキーマが Prisma スキーマと同期されます。

### マイグレーション履歴と Prisma スキーマのコミット

以下の内容をソース管理にコミットします：

- マイグレーション履歴フォルダ全体
- `schema.prisma` ファイル

#### さらに学ぶ
- 本番環境へのマイグレーション適用については、Deploying database changes with Prisma Migrate ガイドを参照してください。
- 本番環境でのマイグレーション失敗のデバッグや解決方法については、Production Troubleshooting ガイドを参照してください。  
  使用可能なコマンド例：`prisma migrate diff`、`prisma db execute`、`prisma migrate resolve`

