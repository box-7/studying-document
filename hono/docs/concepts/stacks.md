# 🧱 Hono Stacks（ホノ・スタック）

**Hono** は「簡単なことを簡単に、難しいことも簡単に」できるフレームワークです。  
単に JSON を返すだけでなく、REST API サーバーやクライアントを含む  
**フルスタックアプリケーションの構築**にも適しています。

---

## ⚡ RPC（リモートプロシージャコール）

Hono の RPC 機能を使うと、コードをほとんど変更せずに API 仕様を共有できます。  
`hc` によって生成されるクライアントは、API 仕様を読み取り、**型安全にエンドポイントへアクセス**します。

### Hono Stack を構成する主なライブラリ

- **Hono**：API サーバー  
- **Zod**：バリデーションライブラリ  
- **Zod Validator Middleware**：Zod 用ミドルウェア  
- **hc**：HTTP クライアント  

これらを組み合わせたものが **Hono Stack** です。  
ここでは、API サーバーとクライアントの実装を見ていきます。

---

## 🚀 API の作成

まず、GET リクエストを受け取り JSON を返すエンドポイントを定義します。
```
import { Hono } from 'hono'

const app = new Hono()

app.get('/hello', (c) => {
  return c.json({
    message: `Hello!`,
  })
})
```
---

## ✅ Zod によるバリデーション

クエリパラメータの値を **Zod** を使って検証します。  
```
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

app.get(
  '/hello',
  zValidator(
    'query',
    z.object({
      name: z.string(),
    })
  ),
  (c) => {
    const { name } = c.req.valid('query')
    return c.json({
      message: `Hello! ${name}`,
    })
  }
)
```

---

## 🔗 型の共有

エンドポイントの仕様を共有するために、型をエクスポートします。

⚠️ **注意**  
RPC がルートを正しく推論するためには、  
メソッドをチェーンし、エンドポイントまたはアプリの型を**変数から推論**させる必要があります。
```
const route = app.get(
  '/hello',
  zValidator(
    'query',
    z.object({
      name: z.string(),
    })
  ),
  (c) => {
    const { name } = c.req.valid('query')
    return c.json({
      message: `Hello! ${name}`,
    })
  }
)

export type AppType = typeof route
```
---

## 💬 クライアントの実装

次にクライアント側です。  
`AppType` をジェネリクスとして渡してクライアントを生成すると、  
エンドポイントパスやリクエスト型が**補完される**ようになります。
```
import { AppType } from './server'
import { hc } from 'hono/client'

const client = hc<AppType>('/api')
const res = await client.hello.$get({
  query: {
    name: 'Hono',
  },
})
```
レスポンスは Fetch API と互換性がありますが、`json()` で取得するデータには**型が付きます**。
```
const data = await res.json()
console.log(`${data.message}`)
```
これにより、サーバー側の変更をクライアント側でも自動的に把握できるようになります。

---

## ⚛️ React との統合例

Cloudflare Pages 上で、React を用いたアプリケーションを作成することもできます。

### 📡 API サーバー（functions/api/[[route]].ts）
```
// functions/api/[[route]].ts
import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const app = new Hono()

const schema = z.object({
  id: z.string(),
  title: z.string(),
})

type Todo = z.infer<typeof schema>

const todos: Todo[] = []

const route = app
  .post('/todo', zValidator('form', schema), (c) => {
    const todo = c.req.valid('form')
    todos.push(todo)
    return c.json({
      message: 'created!',
    })
  })
  .get((c) => {
    return c.json({
      todos,
    })
  })

export type AppType = typeof route

export const onRequest = handle(app, '/api')
```
---

### 💻 クライアント（React + React Query）

React 側では、`@tanstack/react-query` と Hono クライアントを組み合わせます。
```
// src/App.tsx
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AppType } from '../functions/api/[[route]]'
import { hc, InferResponseType, InferRequestType } from 'hono/client'

const queryClient = new QueryClient()
const client = hc<AppType>('/api')

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

const Todos = () => {
  const query = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await client.todo.$get()
      return await res.json()
    },
  })

  const $post = client.todo.$post

  const mutation = useMutation<
    InferResponseType<typeof $post>,
    Error,
    InferRequestType<typeof $post>['form']
  >({
    mutationFn: async (todo) => {
      const res = await $post({
        form: todo,
      })
      return await res.json()
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return (
    <div>
      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now().toString(),
            title: 'Write code',
          })
        }}
      >
        Add Todo
      </button>

      <ul>
        {query.data?.todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}
```
---

🕓 **最終更新日:** 2025/10/29 15:46  
📘 **編集:** Edit this page on GitHub
