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
// app.fire() // または app.listen({ port: 3000 })
app.listen({ port: 3000 })
