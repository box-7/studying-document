### Prisma Schema の概要

**Prisma Schema（スキーマ）** は、Prisma ORM の設定を行う中心的なファイルです。  
スキーマは主に次の 3 つの部分で構成されます：

1. **データソース (Data sources)**  
   Prisma ORM が接続するデータソース（例：PostgreSQL データベースなど）の詳細を指定します。

2. **ジェネレーター (Generators)**  
   データモデルに基づいて生成するクライアントを指定します（例：Prisma Client）。

3. **データモデル定義 (Data model definition)**  
   アプリケーションのモデル（データ構造やリレーションの形）を定義します。

通常、これらは `schema.prisma` という 1 つのファイルにまとめられていますが、  
複数の `.prisma` ファイルに分割して整理することも可能です。

各セクションの詳細については、**Prisma Schema API リファレンス** を参照してください。

---

### CLI コマンドと Prisma Schema の関係

Prisma CLI のコマンドは、スキーマから情報を読み取って動作します。たとえば：

- **`prisma generate`**  
  上記すべての情報を読み取り、データソースに対応するクライアントコード（例：Prisma Client）を生成します。

- **`prisma migrate dev`**  
  データソースとデータモデル定義を読み取り、新しいマイグレーションを作成します。

また、スキーマ内で環境変数を使用して、CLI コマンド実行時の設定値を動的に指定することもできます。

---

### 例

以下は Prisma Schema の例です。このスキーマでは次の内容を指定しています：

- データソース（PostgreSQL または MongoDB）  
- ジェネレーター（Prisma Client）  
- 2つのモデル（1つのリレーションを持つ）と1つの列挙型（enum）  
- いくつかのネイティブデータ型属性（例：`@db.VarChar(255)`, `@db.ObjectId`）

このように Prisma Schema は、アプリケーションとデータベース間の構造・接続・生成物を一元的に管理するための中核的な設定ファイルです。

```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  published Boolean  @default(false)
  title     String   @db.VarChar(255)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}

enum Role {
  USER
  ADMIN
}
```
### 構文（Syntax）

Prisma Schema ファイルは **Prisma Schema Language（PSL）** という独自の言語で記述されます。  
詳細や使用例については、以下のページを参照してください：

- データソース（Data sources）  
- ジェネレーター（Generators）  
- データモデル定義（Data model definition）  
- **Prisma Schema API リファレンス**

---

### VS Code での利用

**VS Code 拡張機能** を使うと、PSL の構文ハイライトが利用できます。  
この拡張機能には次のような便利な機能があります：

- Prisma スキーマの自動フォーマット  
- 構文エラーを赤い波線で表示  

👉 エディタで Prisma ORM を快適に使うためのセットアップ方法については、公式ドキュメントを参照してください。

---

### GitHub での利用

GitHub 上でも、PSL の構文ハイライトを有効にすることができます。  
次のいずれかの方法で表示できます：

- ファイル拡張子を `.prisma` にする  
- Markdown 内のコードブロックを次のように指定する：

```prisma
model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  email     String   @unique
  name      String?
}
```
### スキーマから環境変数へアクセスする

Prisma Schema 内では、**環境変数（environment variables）** を使って設定を行うことができます。  
これにより、CLI コマンド実行時や Prisma Client のクエリ実行時に設定を動的に変更できます。

---

### なぜ環境変数を使うのか

スキーマ内に URL やパスワードなどの情報を **直接ハードコーディングすることも可能** ですが、  
これは **セキュリティリスクが高く推奨されません**。

環境変数を利用することで、次のような利点があります：

- **機密情報（例：データベースURL、APIキー）をスキーマ外に保管できる**  
- **環境ごとに設定を切り替えやすくなる**（例：開発・テスト・本番）
- **スキーマの移植性が向上する**

---

### 環境変数の指定方法

環境変数は `env()` 関数を使ってスキーマ内から参照します。

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### `env()` 関数の使用箇所

`env()` 関数は、Prisma Schema の中で次のような場所で利用できます：

- **データソースの URL 設定**
- **ジェネレーターの binaryTargets 設定**

開発中に `.env` ファイルを利用する方法については、**Environment variables** のガイドを参照してください。

---

### コメントの書き方

Prisma Schema Language（PSL）でサポートされているコメントの種類は3つあります：

// コメント：このコメントは読み手の理解を助けるためのもので、スキーマの抽象構文木（AST）には含まれません。

/// コメント：これらのコメントはスキーマの抽象構文木（AST）内に、ASTノードの説明として表示されます。ツールはこれらのコメントを使用して追加情報を提供することができます。すべてのコメントは次に続くノードに関連付けられます。自由に浮いたコメント（free-floating comments）はサポートされず、ASTにも含まれません。

/* ブロックコメント */：これらのコメントも、/// コメントと同様に抽象構文木（AST）内に表示されます。

以下はいくつかの例です：

```prisma
/// This comment will get attached to the `User` node in the AST
model User {
  /// This comment will get attached to the `id` node in the AST
  id     Int   @default(autoincrement())
  // This comment is just for you
  weight Float /// This comment gets attached to the `weight` node
}

// This comment is just for you. It will not
// show up in the AST.

/// This comment will get attached to the
/// Customer node.
model Customer {
  /**
   * ...and so will this comment
   */
}
```

自動フォーマット（Auto formatting）

Prisma ORM は、.prisma ファイルの自動フォーマットをサポートしています。
.prisma ファイルを整形する方法は次の2つです：

- prisma format コマンドを実行する
- Prisma の VS Code 拡張機能をインストールして、VS Code のフォーマットアクションを実行する（手動または保存時）

設定オプションは存在しません。フォーマットルールは固定されており、Go 言語の gofmt に似ています（JavaScript の prettier のようにカスタマイズは不可）。

フォーマットルール
1. 設定ブロックは = 記号で整列される
```
block _ {
  key      = "value"
  key2     = 1
  long_key = true
}
```

2. フィールド定義は、2つ以上のスペースで区切られたカラムに整列される
```
block _ {
  id          String       @id
  first_name  LongNumeric  @default
}
```
3. 空行を挟むと、ブロックの整列とフォーマットルールがリセットされる
```
block _ {
  key   = "value"
  key2  = 1
  key10 = true

  long_key   = true
  long_key_2 = true
}

block _ {
  id  String  @id
              @default

  first_name  LongNumeric  @default
}
```
4. 複数行のフィールド属性も、他の属性と正しく整列される
```
block _ {
  id          String       @id
                           @default
  first_name  LongNumeric  @default
}
```

5. ブロック属性（@@attribute など）はブロックの末尾に配置される
```
block _ {
  key   = "value"

  @@attribute
}
```

