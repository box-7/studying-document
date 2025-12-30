import { render } from 'hono/jsx/dom'
import { useEffect, useState } from 'hono/jsx'
import { hc } from 'hono/client'
import { AppType } from './server'

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
