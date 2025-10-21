
# What is Prisma ORM?（Prisma ORM とは？）
Prisma / docs  
https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma

Prisma ORM は、オープンソースの次世代 ORM（Object Relational Mapper）です。
以下の主要なコンポーネントで構成されています。

- Prisma Client：Node.js と TypeScript 向けの、自動生成される型安全なクエリビルダー
- Prisma Migrate：データベースマイグレーションシステム
- Prisma Studio：データベース内のデータを閲覧・編集できる GUI ツール


### Prisma スキーマで設定する3つの要素

1. **Data source（データソース）**  
   環境変数を使ってデータベース接続を指定します。  
   例：`url = env("DATABASE_URL")`

2. **Generator（ジェネレーター）**  
   Prisma Client を生成する設定を指定します。  
   例：`provider = "prisma-client-js"`

3. **Data model（データモデル）**  
   アプリケーションで使用するモデル（テーブルやコレクション）を定義します。

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  Int?
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}
```

### Prisma Client の生成
```bash
npm install prisma --save-dev
npm install @prisma/client
```

```bash
npx prisma generate
```

### データモデル変更後の Prisma Client 再生成

データモデルを変更した後は、以下のコマンドを実行して Prisma Client を手動で再生成し、  
`node_modules/.prisma/client` 内のコードを最新状態に保ちます。

```bash
npx prisma generate
```


```ts
// モジュールのインポート方法
// ES Modules を使用する場合
import { PrismaClient } from '@prisma/client'

// ES Modulesではなく、CommonJS を使用する場合
const { PrismaClient } = require('@prisma/client')

// Prisma Client のインスタンス化
const prisma = new PrismaClient()
```

# Prisma Migrate でデータベースの変更をデプロイする
Prisma / docs  
https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-database-changes-with-prisma-migrate

ステージング、テスト、本番環境に保留中のマイグレーションを適用するには、CI/CD パイプラインの一部として `migrate deploy` コマンドを実行します。

```bash
npx prisma migrate deploy
```

# Prisma Migrate の始め方
Prisma / docs  
https://www.prisma.io/docs/orm/prisma-migrate/getting-started


### 1. 最初のマイグレーションを作成する
```
prisma migrate dev --name init
```

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


# Managing Prisma ORM environment variables and settings
https://www.prisma.io/docs/orm/more/development-environment/environment-variables

### .env ファイルの使用

warning
.env ファイルをバージョン管理にコミットしないでください！

Prisma CLI は .env ファイルを以下の順で探します：

- プロジェクトのルートフォルダ (./.env)
- --schema で指定したスキーマと同じフォルダ
- package.json の "prisma": {"schema": "/path/to/schema.prisma"} から指定されたフォルダ
- ./prisma フォルダ

もしステップ1に .env が存在し、ステップ2～4 に衝突する変数がある場合、CLI はエラーを出します。
例: 2つの異なる .env に DATABASE_URL がある場合

Error: There is a conflict between env vars in .env and prisma/.env
Conflicting env vars: DATABASE_URL

### .env ファイルの展開（変数の参照）

dotenv-expand 形式で変数展開が可能です：

.env  
DATABASE_URL=postgresql://test:test@localhost:5432/test
DATABASE_URL_WITH_SCHEMA=${DATABASE_URL}?schema=public


# TypeScript と PostgreSQL でデータベースに接続する
Prisma / docs  
https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgresql

データベースに接続するには、Prisma スキーマの datasource ブロック内の url フィールドに、データベース接続 URL を設定する必要があります。
```
prisma/schema.prisma
datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}
```
この場合、URL は環境変数を通じて設定されます。環境変数は .env ファイルに定義します。

```
.env
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```




