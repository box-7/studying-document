

# server.ts
// routesを定義する
const routes = app.post('/api/users', (c) => {
  return c.json({
    message: `young man is 20 years old`
  })
})

// routesの型を取り、exportしておく
export type AppType = typeof routes

# server.ts
import { z } from 'zod'

// ...

const schema = z.object({
  name: z.string(),
  age: z.number()
})


# server.tsx
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

# server.ts
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




# client.mts
import type { AppType } from './server'
import { hc } from 'hono/client'

const client = hc<AppType>('/')
const res = await client.api.users.$post()

if (res.ok) {
  const data = await res.json()
  console.log(data.message)
}

const res = await client.api.users.$post({
  'json': {
    'name': 'young man',
    'age': 20
  }
})


# client.mts
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


# client.tsx
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




