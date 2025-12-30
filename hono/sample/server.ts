import { z } from 'zod'
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'

const app = new Hono()

const schema = z.object({
  id: z.string()
})

const routes = app.get('/api/users/:id', zValidator('param', schema), (c) => {
  const { id } = c.req.valid('param')

  // 仮のユーザーデータ
  const user = { id, name: 'Taro' }

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

export type AppType = typeof routes
export default app
