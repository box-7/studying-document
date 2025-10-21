
# TypeScript と PostgreSQL で Prisma Client をインストールする
Prisma / docs  
https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/install-prisma-client-typescript-postgresql
Prisma Client のインストールと生成

Prisma Client を使い始めるには、まず @prisma/client パッケージをインストールします。
```
npm install @prisma/client
```

次に、prisma generate を実行します。これは Prisma スキーマを読み込み、Prisma Client を生成します。
```
npx prisma generate
```

これで @prisma/client から PrismaClient コンストラクタをインポートして、データベースにクエリを送信するインスタンスを作成できるようになります。

### 知っておくと良いこと

prisma generate を実行すると、Prisma スキーマファイルに基づいた TypeScript の型やメソッド、クエリなどのコードが生成されます。
そのため、Prisma スキーマに変更を加えた場合は、Prisma Client を更新する必要があります。更新するには再度 prisma generate コマンドを実行します。

### Prisma Client を更新するタイミング

Prisma スキーマを更新したら、データベーススキーマも更新する必要があります。方法は以下の 2 つです：
```
npx prisma migrate dev
```

- 目的: Prisma スキーマの変更に基づいて、新しいマイグレーションを生成・適用する。
変更履歴を保持するため、マイグレーションファイルを作成する。

- 利用シーン: 本番環境やチーム開発でデータベース変更履歴を管理したいとき。

- 利点: データ整合性を考慮したマイグレーション適用チェックも行われる。
```
npx prisma db push
```

- 目的: 現在の Prisma スキーマをデータベースに直接反映する。
マイグレーションファイルは作成されない。

- 利用シーン: 開発段階で素早くデータベーススキーマを Prisma スキーマに同期したいとき。

- 注意: 既存のテーブルやカラムに影響する変更はデータを上書きする可能性があるため、プロトタイプや初期開発向け。

どちらのコマンドも内部で prisma generate を実行するため、Prisma Client は自動で最新状態に更新されます。
