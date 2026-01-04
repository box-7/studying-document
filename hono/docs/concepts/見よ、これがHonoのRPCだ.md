見よ、これが Hono の RPC だ
https://zenn.dev/yusukebe/articles/a00721f8b3b92e

## RPC（Remote Procedure Call）とは

遠隔手続き呼び出し

---

**RPC（Remote Procedure Call）とは？**

「遠隔手続き呼び出し」とも呼ばれ、ネットワーク越しに別のサーバー上の関数やメソッドを、
まるで自分のプログラム内の関数を呼ぶような感覚で実行できる仕組みです。

- 離れたサーバー上の処理を、ローカルの関数呼び出しのように簡単に実行できる
- 通信の詳細（HTTP リクエストやレスポンスなど）を意識せず、関数を呼ぶだけで結果が返る
- 例：クライアントから `getUser()` を呼び出すと、サーバー側で処理され、その結果が返ってくる

## Hono RPC はどんなものか

- Web API の仕様（特にインプット・アウトプット）をサーバーとクライアント間で共有できる
- OpenAPI や gRPC で実現したかった「型安全な API 設計・通信」を TypeScript だけで実現できる
- サーバーもクライアントも TypeScript で書くことが前提
- 同種のものに tRPC があるが、Hono RPC は「普通の REST API を書く」だけで型安全な RPC が使える
- クライアントは fetch のラッパーで、標準的な Response オブジェクトを扱う
- 型安全を提供し、エディタの補完が強力に効く





---






> **OpenAPI とは？**
> REST API の仕様（エンドポイント、リクエスト・レスポンスの型など）を YAML や JSON で記述し、API ドキュメントやクライアント・サーバーのコード生成などに活用できる標準仕様です。

> **gRPC とは？**
> Google が開発した RPC フレームワークで、Protocol Buffers という IDL（インターフェース定義言語）を使って API の型やサービスを定義し、多言語間で型安全な通信ができる仕組みです。

> **tRPC とは？**
> TypeScript だけで型安全な API を実現できるフレームワークです。サーバーとクライアントの型を共有し、API の呼び出しやレスポンスの型チェック・補完が自動で効くのが特徴です。OpenAPI や gRPC のような IDL やコード生成を使わず、TypeScript の型推論をそのまま活用します。

### RPC を使うメリット

- クライアントとサーバー間のやりとりが「関数呼び出し」のようにシンプルになる
- TypeScript の型共有により、API の呼び出しミスや型の不一致を防げる
- REST API のようにエンドポイントやリクエスト形式を意識せず、直感的に開発できる

### サーバー

- まずサーバーサイドでAPI（ユーザー情報を扱うエンドポイント）を作成する
- 受け取りたいデータ（name: string型、age: number型）をZodでスキーマ定義する
- リクエストのJSONボディを検証するため、jsonを指定してバリデータミドルウェアにスキーマを渡す
- ハンドラ内でc.req.valid()を使い、検証済みの値を型付きで取得する
- c.json()でstring型のmessageを返却する

> **Zod とは？**
> TypeScript/JavaScript で使えるスキーマベースのバリデーションライブラリです。
> 「スキーマベースのバリデーションライブラリ」とは、「データの形（スキーマ）をあらかじめ決めておき、その形に合っているかどうかを自動でチェックしてくれる仕組みを持つライブラリ」
> 型安全にデータの検証や変換ができ、TypeScript の型推論と連携して、入力値のチェックや API の型定義などに広く利用されています。


### クライアント

- クライアント側では、サーバーからexportされたAppType型をimportする
- hc関数にAppTypeをジェネリクスとして渡し、クライアントオブジェクトを作成する
- APIのエンドポイントやメソッド情報がclient.api.users.$postのように補完される
- クライアントが送るべきボディ（JSON形式、nameとage）が型として表現される
- resは標準のResponseオブジェクト
- res.json()で取得したJSONオブジェクトにも型がつき、string型のmessageを持つことが分かる

「ジェネリクス」とは、「型をパラメータとして受け取る仕組み」のことです。
関数やクラス、インターフェースなどで「どんな型でも使える汎用的な処理」を書くために使います。
使う側が型を指定できるので、型安全かつ再利用性の高いコードが書けます。


# RPCを作る
より詳しくRPCの作り方を見ていきましょう。

### 普通のREST APIを書く
HonoのRPCは「普通の」REST APIを書けばそれだけでRPCに対応します。
まず超簡単なAPIを作ってみます。
以下は/api/usersでPOSTリクエストを受け取り、message型をキーにとる値を含んだJSONレスポンスを返しています。

サーバー
```server.ts
// Zodでバリデートする

import { z } from 'zod'

const schema = z.object({
  name: z.string(),
  age: z.number()
})

const routes = app.post('/api/users', (c) => {
  return c.json({
    message: `young man is 20 years old`
  })
})

// routesの型を取り、exportしておく
export type AppType = typeof routes
```


### hcでクライアントを作る

```client.mts
import type { AppType } from './server'
import { hc } from 'hono/client'

const client = hc<AppType>('/')

// クライアントからデータを送る
const res = await client.api.users.$post({
  'json': {
    'name': 'young man',
    'age': 20
  }
})

if (res.ok) {
  const data = await res.json()
  console.log(data.message)
}
```


### ステータスコードでの分岐
```server.ts
const schema = z.object({
  id: z.string()
})

const routes = app.get('/api/users/:id', zValidator('param', schema), (c) => {
  const { id } = c.req.valid('param')

  const user = findUser(id)

  if (!user) {
    return c.json(
      {
        error: 'not found'
      },
      404
    )
  }

  return c.json(
    {
      user
    },
    200
  )
})
```

```client.mts
const res = await client.api.users[':id'].$get({
  param: {
    id: '123'
  }
})

if (res.ok) {
  const data200 = await res.json()
  console.log(`Get User: ${data200.user.name}`)
}

if (res.status === 404) {
  const data404 = await res.json()
  console.log(`Error: ${data404.error}`)
}
```


### 利用シーン

```server.tsx
import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const app = new Hono()

app.get('/', (c) => {
  return c.html(
    <html>
      <head>
        <script type="module" src="/src/client.tsx"></script>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  )
})

const schema = z.object({
  name: z.string(),
  age: z.number()
})

const routes = app.post('/api/users', zValidator('json', schema), (c) => {
  const data = c.req.valid('json')
  return c.json({
    message: `${data.name} is ${data.age.toString()} years old`
  })
})

export type AppType = typeof routes

export default app
```

```client.tsx
import { render } from 'hono/jsx/dom'
import { useEffect, useState } from 'hono/jsx'
import { hc } from 'hono/client'
import { AppType } from '.'

function App() {
  const [message, setMessage] = useState('')

  const client = hc<AppType>('/')

  const fetchApi = async () => {
    const res = await client.api.users.$post({
      json: {
        name: 'young man',
        age: 20
      }
    })
    const data = await res.json()
    setMessage(data.message)
  }

  useEffect(() => {
    fetchApi()
  }, [])

  return <p>{message}</p>
}

const domNode = document.getElementById('root')!
render(<App />, domNode)
```



---

#### 具体例（Hono RPC の場合）

**REST API の場合**

```ts
// クライアント側
fetch("/api/user/123", { method: "GET" })
  .then((res) => res.json())
  .then((data) => console.log(data));
```

**RPC の場合**

```ts
// クライアント側
const user = await rpc.getUser({ id: 123 });
console.log(user);
```

> REST ではエンドポイントや HTTP メソッドを意識する必要があるが、
> RPC では「関数呼び出し」のようにシンプルに扱える。

#### CRUD 操作の具体例（Hono RPC の場合）

**REST API の場合**

```ts
// Create（作成）
fetch("/api/user", { method: "POST", body: JSON.stringify({ name: "Taro" }) });

// Read（取得）
fetch("/api/user/123", { method: "GET" });

// Update（更新）
fetch("/api/user/123", {
  method: "PUT",
  body: JSON.stringify({ name: "Jiro" }),
});

// Delete（削除）
fetch("/api/user/123", { method: "DELETE" });
```

**RPC の場合**

```ts
// Create（作成）
await rpc.createUser({ name: "Taro" });

// Read（取得）
const user = await rpc.getUser({ id: 123 });

// Update（更新）
await rpc.updateUser({ id: 123, name: "Jiro" });

// Delete（削除）
await rpc.deleteUser({ id: 123 });
```

> CRUD 操作も関数呼び出しのようにシンプルに記述できるのが RPC の特徴です。

---

### gRPC の具体例（Protocol Buffers 定義と呼び出し）

**1. API 仕様（.proto ファイル）**

```proto
syntax = "proto3";

service UserService {
  rpc GetUser (GetUserRequest) returns (UserResponse);
}

message GetUserRequest {
  int32 id = 1;
}

message UserResponse {
  int32 id = 1;
  string name = 2;
}
```

**2. サーバー・クライアントで型と API が自動生成される**

**3. クライアント側の呼び出し例（TypeScript/Node.js）**

```ts
const user = await userService.getUser({ id: 123 });
console.log(user.name);
```

---

### tRPC の具体例（TypeScript のみで型安全な API）

**1. サーバー側（ルーター定義）**

```ts
// server.ts
import { initTRPC } from "@trpc/server";
const t = initTRPC.create();

export const appRouter = t.router({
  getUser: t.procedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return { id: input.id, name: "Taro" };
    }),
});
export type AppRouter = typeof appRouter;
```

**2. クライアント側の呼び出し例**

```ts
// client.ts
const user = await trpc.getUser.query({ id: 123 });
console.log(user.name);
```

> gRPC は多言語・IDL ベース、tRPC は TypeScript のみ・型推論がそのまま効くのが特徴です。

## ジェネリクス（Generics）とは

- 型をパラメータとして受け取る仕組み
- 関数やクラス、インターフェースなどで「どんな型でも使える汎用的な処理」を書くために使う
- 使う側が型を指定できるので、型安全かつ再利用性の高いコードが書ける

### 例（TypeScript）

```ts
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(123); // Tがnumberになる
const str = identity<string>("hello"); // Tがstringになる
```

> ジェネリクスを使うことで、型ごとに同じような関数を何度も書かずに済みます。

### やっていること

普通の REST API を書く
型を作って共有する
Zod でバリデートする

```ts
// server.ts

import { z } from "zod";

// routesを定義する
const routes = app.post("/api/users", (c) => {
  return c.json({
    message: `young man is 20 years old`,
  });
});

// routesの型を取り、exportしておく
export type AppType = typeof routes;

const schema = z.object({
  name: z.string(),
  age: z.number(),
});
```

### mts

「.mts」は、TypeScript の「ES Modules（ECMAScript Modules）」形式のファイル拡張子です。
.ts … 通常の TypeScript ファイル（CommonJS/ESM どちらでも可）
.mts … TypeScript で「ESM（import/export）」専用であることを明示する拡張子

#### hc とは？

- `hc`は Hono 公式が提供する「型安全な API クライアントを生成するための関数」です。
- サーバー側で export した型（例: `AppType`）を使い、クライアント側で型安全に API を呼び出せる fetch ラッパーを作ります。
- `hc<AppType>('/')` のように使うことで、API の型補完や型チェックが効くクライアントが自動で生成されます。

> Hono の RPC 機能のコアとなる仕組みで、tRPC のクライアント生成に近いイメージです。

## レスポンスの扱い方（Hono RPC）

- クライアントで受け取る `res` は Web 標準の `Response` オブジェクト
- そのため、`res.ok` で成功判定ができる
- `res.json()` で取得した値には、サーバーで定義した型が自動的に付与される
- 例：サーバーから `string` 型の `message` フィールドが返る場合、クライアントでも `data.message` は `string` 型になる

```ts
// client.mts
import type { AppType } from "./server";
import { hc } from "hono/client";

const client = hc<AppType>("/");
const res = await client.api.users.$post();
if (res.ok) {
  const data = await res.json();
  // data.message は string 型として補完される
  console.log(data.message);
}

// Zodでバリデートする
const res = await client.api.users.$post({
  json: {
    name: "young man",
    age: 20,
  },
});
```

> 型安全なレスポンス処理ができ、エディタ補完も効くのが特徴です。

### 他のバリデータを使う

先ほどはバリデータに Zod を使いましたが、どんなバリデータでも使えます。特に以下のものは Hono のミドルウェアが提供されているのですぐ使えます。

Valibot
Typia
TypeBox
ArkType

### ステータスコードでの分岐

```ts
// server.ts
const schema = z.object({
  id: z.string(),
});

const routes = app.get("/api/users/:id", zValidator("param", schema), (c) => {
  const { id } = c.req.valid("param");

  const user = findUser(id);

  if (!user) {
    return c.json(
      {
        error: "not found",
      },
      404
    );
  }

  return c.json(
    {
      user,
    },
    200
  );
});
```

```ts
// client.mts
const res = await client.api.users[":id"].$get({
  param: {
    id: "123",
  },
});

if (res.ok) {
  const data200 = await res.json();
  console.log(`Get User: ${data200.user.name}`);
}

if (res.status === 404) {
  const data404 = await res.json();
  console.log(`Error: ${data404.error}`);
}
```
