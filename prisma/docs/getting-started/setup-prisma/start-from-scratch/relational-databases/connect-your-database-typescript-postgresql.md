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
注意
.env ファイルは .gitignore に追加して、環境変数を誤ってコミットしないようにしましょう。

次に、接続 URL を自分のデータベースに合わせて調整します。

PostgreSQL の接続 URL の形式

接続 URL の形式は使用するデータベースによって異なります。PostgreSQL の場合は次のようになります（大文字の部分は各自の情報に置き換えます）：
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```

各パラメータの説明は以下の通りです：

- USER: データベースユーザー名

- PASSWORD: データベースユーザーのパスワード

- HOST: ホスト名（ローカル環境では localhost）

- PORT: データベースサーバーのポート（PostgreSQL は通常 5432）

- DATABASE: データベース名

- SCHEMA: データベース内のスキーマ名

もし schema パラメータが分からない場合、省略可能です。その場合はデフォルトで public スキーマが使用されます。

例：Heroku 上の PostgreSQL

Heroku にホストされた PostgreSQL の接続 URL は次のようになります：
```
.env
DATABASE_URL="postgresql://opnmyfngbknppm:XXX@ec2-46-137-91-216.eu-west-1.compute.amazonaws.com:5432/d50rgmkqi2ipus?schema=hello-prisma"
```
例：macOS でローカル PostgreSQL を使用する場合

ローカル環境では、ユーザー名・パスワード・データベース名は通常 OS のユーザー名と同じになります。例えばユーザー名が janedoe の場合：
```
.env
DATABASE_URL="postgresql://janedoe:janedoe@localhost:5432/janedoe?schema=hello-prisma"
```