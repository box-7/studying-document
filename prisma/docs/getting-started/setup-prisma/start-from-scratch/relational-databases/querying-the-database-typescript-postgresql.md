# TypeScript と PostgreSQL で Prisma Client を使ってデータベースを操作する
Prisma / dpcs  
https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/querying-the-database-typescript-postgresql

### Prisma Client で最初のクエリを書く

Prisma Client を生成したら、データベースからデータを読み書きするクエリを書けるようになります。
ここでは Node.js スクリプトを使って Prisma Client の基本的な機能を試してみます。

index.ts を作成

新しいファイル index.ts を作成し、以下のコードを追加します。
```
import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // Prisma Client のクエリをここに書きます
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

**自分メモ**
自分のプロジェクトは以下でPrismaClientを呼んでいる
```
// backend/src/db.ts
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

export default prisma;
```

コードの各部分の簡単な説明：

- PrismaClient を生成先のフォルダからインポート

- PrismaClient をインスタンス化

- データベースにクエリを送信する main 関数を async で定義

- main 関数を呼び出す

- スクリプト終了時にデータベース接続をクローズ

### User レコードを取得するクエリを追加
```
async function main() {
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}
```

実行コマンド：
```
npx tsx index.ts
```

まだデータベースに User がない場合、空配列が出力されます。
```
[]
```

データをデータベースに書き込む

findMany はデータベースから読み取るだけでした。
次に、新しい User、Post、Profile レコードを作成するクエリを追加します。
```
async function main() {
  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: { title: 'Hello World' },
      },
      profile: {
        create: { bio: 'I like turtles' },
      },
    },
  })

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  console.dir(allUsers, { depth: null })
}
```

ポイント：

- include オプションでリレーション（posts と profile）も取得

- ネストした書き込みクエリで User と Post、Profile を同時に作成

- リレーションは Post.author ↔ User.posts、Profile.user ↔ User.profile で接続

実行コマンド：
```
npx tsx index.ts
```

出力例：
```
[
  {
    email: 'alice@prisma.io',
    id: 1,
    name: 'Alice',
    posts: [
      {
        content: null,
        createdAt: 2020-03-21T16:45:01.246Z,
        updatedAt: 2020-03-21T16:45:01.246Z,
        id: 1,
        published: false,
        title: 'Hello World',
        authorId: 1,
      }
    ],
    profile: {
      bio: 'I like turtles',
      id: 1,
      userId: 1,
    }
  }
]
```

allUsers は Prisma Client の型定義により型付けされています：
```
const allUsers: (User & {
  posts: Post[]
})[]
```
Post レコードを更新する

作成した Post を "公開" するために update クエリを使います。
```
async function main() {
  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  })
  console.log(post)
}
```

実行：
```
npx tsx index.ts
```

出力例：
```
{
  id: 1,
  title: 'Hello World',
  content: null,
  published: true,
  authorId: 1
}
```

Post レコードの published が true に更新されました。

これで Prisma Client を使って、TypeScript から PostgreSQL にデータを書き込む・読み込む基本操作ができました 🚀



