# TypeScript と PostgreSQL で Prisma Migrate を使用する
Prisma / docs  
https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgresql

### データベーススキーマの作成

このガイドでは、Prisma Migrate を使ってデータベースにテーブルを作成します。
prisma/schema.prisma に次のデータモデルを追加してください。

```
// prisma/schema.prisma
model Post {
        id Int @id @default(autoincrement())
        createdAt DateTime @default(now())
        updatedAt DateTime @updatedAt
        title String @db.VarChar(255)
        content String?
        published Boolean @default(false)
        author User @relation(fields: [authorId], references: [id])
        authorId Int
}

model Profile {
        id Int @id @default(autoincrement())
        bio String?
        user User @relation(fields: [userId], references: [id])
        userId Int @unique
}

model User {
        id Int @id @default(autoincrement())
        email String @unique
        name String?
        posts Post[]
        profile Profile?
}
```
データモデルをデータベースにマッピングする

次の Prisma Migrate CLI コマンドを使用して、データベーススキーマに反映させます。
```
npx prisma migrate dev --name init
```

このコマンドは以下の処理を行います：

- このマイグレーション用の新しい SQL マイグレーションファイルを作成

- SQL マイグレーションファイルをデータベースに適用

注意
prisma migrate dev 実行後、内部で generate が自動的に呼ばれます。
スキーマに prisma-client-js ジェネレーターが定義されている場合、@prisma/client がインストールされていなければ自動でインストールされます。

これで Prisma Migrate を使って、データベースに 3 つのテーブルが作成されました 🚀


