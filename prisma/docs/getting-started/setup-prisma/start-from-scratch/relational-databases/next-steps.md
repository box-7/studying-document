# Prisma ORM とリレーショナルデータベースの次のステップ

Prisma ORM をセットアップし、基本操作を学んだ後に進めるステップをまとめます。自由に試して、Prisma の全体像を知るために Introduction
 も読んでみてください。

### Prisma Client API をさらに探索する

Prisma Client では様々なクエリを送ることができます。
API リファレンスを確認し、既存のデータベースセットアップを使って試してみましょう。

💡 Tip:
エディタのオートコンプリート機能（例: CTRL+SPACE）を使うと、呼び出せる API と引数を簡単に確認できます。

Prisma Client API のさらなる例

Prisma Client では、さまざまなクエリを簡単に送信できます。以下にいくつかの例を示します。

1. "hello" を含む Post レコードをフィルタ
```
const filteredPosts = await prisma.post.findMany({
  where: {
    OR: [
      { title: { contains: 'hello' } },
      { content: { contains: 'hello' } },
    ],
  },
})
```

OR を使って複数条件を指定できます。

contains は部分一致検索です。

2. 新しい Post を作成し、既存の User に接続
```
const post = await prisma.post.create({
  data: {
    title: 'Join us for Prisma Day 2020',
    author: {
      connect: { email: 'alice@prisma.io' },
    },
  },
})
```

connect を使うと既存のリレーションを紐付けられます。

author は User と Post のリレーションフィールドです。

3. Fluent Relations API を使って User の Post を取得
```
const posts = await prisma.profile
  .findUnique({
    where: { id: 1 },
  })
  .user()
  .posts()
```

関係フィールドを順に辿ることで、リレーション先のデータを取得できます。

profile → user → posts のようにチェーン可能です。

4. User レコードを削除
```
const deletedUser = await prisma.user.delete({
  where: { email: 'sarah@prisma.io' },
})
```

delete で特定条件のレコードを削除できます。

削除対象の条件は where で指定します。

これらの例を応用することで、Prisma Client を使った CRUD 操作やリレーション操作を柔軟に行えます。


### Prisma ORM でアプリを構築する

Prisma の公式ブログにはチュートリアルが多数あります。最新の例：

- Next.js でフルスタックアプリを作る

- Remix でフルスタックアプリを作る（動画付き 5 パート）

- NestJS で REST API を作る

###  Prisma Studio でデータを可視化

Prisma Studio はデータベースの可視的エディタです。
```
npx prisma studio
```

PostgreSQL を使っている場合、プロジェクトのコンソール内でも Studio タブから直接利用できます。

### Prisma Optimize でクエリの改善

Prisma Optimize を使うと、データベースクエリの解析・改善提案を得られます。
クエリの効率を上げることで、データベースの負荷を減らし、アプリのレスポンスを改善できます。

### Prisma ORM のサンプルを試す

prisma-examples
 リポジトリには、すぐに動かせるサンプルがあります。

Demo	Stack	Description  
nextjs	Fullstack	シンプルな Next.js アプリ  
nextjs-graphql	Fullstack	GraphQL API を持つ Next.js アプリ  
graphql-nexus	Backend only	@apollo/server ベースの GraphQL サーバ  
express	Backend only	シンプルな REST API（Express.js）  
grpc	Backend only	シンプルな gRPC API  

これらのサンプルを使うことで、Prisma ORM を使ったアプリ構築の実践的なイメージを掴めます。