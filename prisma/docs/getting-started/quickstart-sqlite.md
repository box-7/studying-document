# SQLite でのクイックスタート

## SQLite
このクイックスタートガイドでは、**TypeScript プロジェクト** と **ローカル SQLite データベースファイル** を使って、Prisma ORM をゼロから始める方法を学びます。  
データモデリング、マイグレーション、データベースクエリの実行までをカバーします。

> PostgreSQL、MySQL、MongoDB など他のデータベースを使う場合はこちらをご覧ください：
>
> - [Start with Prisma ORM from scratch](#)
> - [Add Prisma ORM to an existing project](#)

## 前提条件
マシンに **Node.js** がインストールされている必要があります（公式サポートされているバージョンについてはシステム要件を参照）。

---

### 1. TypeScript プロジェクトの作成と Prisma ORM のセットアップ

まずプロジェクトディレクトリを作成し、移動します：

```bash
mkdir hello-prisma
cd hello-prisma
```
次に npm を使って TypeScript プロジェクトを初期化します：

```bash
npm init -y
npm install typescript tsx @types/node --save-dev
```
これにより、TypeScript アプリ用の初期設定が入った package.json が作成されます。

他のパッケージマネージャを使った Prisma のインストール方法は、インストール手順を参照してください。

TypeScript を初期化します：

```bash
npx tsc --init
```
次に、Prisma CLI を開発依存としてインストールします：

```bash
npm install prisma --save-dev
```
最後に、Prisma CLI の init コマンドで Prisma ORM をセットアップします：

```bash
npx prisma init --datasource-provider sqlite --output ../generated/prisma
```

**自分メモ**
- 自分のプロジェクトでは以下コマンドで実施
- npx prisma generate --schema=prisma/sqlite/schema.sqlite.prisma


これにより、prisma ディレクトリが作成され、schema.prisma ファイルが生成され、SQLite がデータベースとして設定されます。
これで、データのモデリングとテーブル作成の準備が整いました。

### 2. Prisma スキーマでデータをモデリングする
Prisma スキーマは、直感的にデータをモデリングできます。
以下のモデルを schema.prisma ファイルに追加します：

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```
Prisma スキーマのモデルには主に二つの目的があります：

- データベース上のテーブルを表す
- 生成される Prisma Client API の基盤となる



次のセクションで、Prisma Migrate を使ってモデルをデータベーステーブルにマッピングします。

### 3. Prisma Migrate でデータベーステーブルを作成する
この時点で Prisma スキーマはありますが、データベースはまだありません。
以下のコマンドを実行して SQLite データベースと、モデルに対応する User と Post テーブルを作成します：

```bash
npx prisma migrate dev --name init
```
**自分メモ**
- 自分のプロジェクトでは以下コマンドで実施
- // マイグレーションを作成・適用するとき（履歴を残す）
- npx prisma migrate dev --schema=prisma/sqlite/schema.sqlite.prisma --name init

このコマンドで行われること：

prisma/migrations ディレクトリに新しい SQL マイグレーションファイルを作成  
SQL マイグレーションファイルをデータベースに適用  
prisma generate が裏で実行され、@prisma/client がインストールされ、モデルに基づいた Prisma Client API が生成  
また、SQLite データベースファイルが存在しない場合は、.env に定義された環境変数に基づき、prisma/dev.db として作成されます。  

これで、データベースとテーブルの準備が整いました。  
次はデータの読み書きを行うクエリの実行方法を学びます！  

### 4. Prisma Client を使ってデータベースにクエリを送信する
まずは @prisma/client パッケージをインストールします：

```bash
npm install @prisma/client
```
インストール時に prisma generate が自動実行され、Prisma スキーマに基づいた Prisma Client が生成されます。

データベースにクエリを送信するには、TypeScript ファイルを作成して Prisma Client を実行します。
例えば script.ts ファイルを作成します：

```bash
touch script.ts
```
以下のボイラープレートコードを貼り付けます：

```ts
import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // ここに Prisma Client クエリを記述
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

### 4.1. 新しい User レコードを作成する
次に、データベースに新しい User レコードを作成してコンソールに出力します：

```ts
import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  })
  console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```
スクリプトを実行します：

```bash
npx tsx script.ts
```

CLI 出力例：

```json
{ "id": 1, "email": "alice@prisma.io", "name": "Alice" }
```
### 4.2. すべての User レコードを取得する
findMany クエリを使って、全 User レコードを取得します：

```ts
import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany()
  console.log(users)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```
スクリプトを再実行：

```bash
npx tsx script.ts
```
CLI 出力例：

```json
[{ "id": 1, "email": "alice@prisma.io", "name": "Alice" }]
```
findMany は配列で返すため、1件でも角括弧で囲まれています。

### 4.3. リレーションを使ったクエリ
ユーザーと投稿を ネストした書き込みクエリ で作成し、include オプションでリレーションを取得します：

```ts
import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@prisma.io',
      posts: {
        create: [
          { title: 'Hello World', published: true },
          { title: 'My second post', content: 'This is still a draft' }
        ],
      },
    },
  })
  console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```
スクリプトを再実行：

```bash
npx tsx script.ts
```
デフォルトでは、結果オブジェクトに スカラーフィールドのみ が返されます。
Post レコードも取得する場合は、include オプションを使用：

```ts
const usersWithPosts = await prisma.user.findMany({
  include: { posts: true },
})
console.dir(usersWithPosts, { depth: null })
```

CLI 出力例：

```json
[
  { "id": 1, "email": "alice@prisma.io", "name": "Alice", "posts": [] },
  {
    "id": 2,
    "email": "bob@prisma.io",
    "name": "Bob",
    "posts": [
      { "id": 1, "title": "Hello World", "content": null, "published": true, "authorId": 2 },
      { "id": 2, "title": "My second post", "content": "This is still a draft", "published": false, "authorId": 2 }
    ]
  }
]
```

### 5. 次のステップ
findMany にフィルターやソート、ページネーションを追加

update や delete クエリの操作を試す

Prisma Studio でデータを GUI で確認・編集：

```bash
npx prisma studio
```
他のデータベース（PostgreSQL、MySQL、MongoDB など）で Prisma ORM を使用する場合：

Start with Prisma ORM from scratch  
Add Prisma ORM to an existing project  
Prisma Optimize でクエリの分析・改善  
Prisma Accelerate で接続プーリングとグローバルキャッシュを利用して高速化  
GitHub の prisma-examples を参考に、Express、Next.js、Vue.js などとの統合例を確認  

コミュニティとリソース  
X（旧 Twitter）で最新情報やイベントをフォロー  
Discord で質問・相談  
YouTube でチュートリアル・デモ  
GitHub でスター、Issue 提出、コントリビュート  