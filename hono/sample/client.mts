import type { AppType } from './server'
import { hc } from 'hono/client'

// const client = hc<AppType>('/')
const client = hc<AppType>('http://localhost:3000')
const res = await client.api.users.$post({
  json: {
    name: 'young man',
    age: 20
  }
})

if (res.ok) {
  const data = await res.json()
  console.log(data.message)
}
