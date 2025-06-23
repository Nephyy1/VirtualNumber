import express from 'express'
import cors from 'cors'
import pkg from '@jkt48/core'

const { jkt48Api } = pkg
const app = express()
const port = 3000
const apiKey = '48-NEPHYY'

app.use(cors())

const fetchData = async (label, fn) => {
  try {
    const data = await fn()
    return [label, data]
  } catch (e) {
    return [label, `Gagal: ${e.message}`]
  }
}

app.get('/', async (req, res) => {
  const tasks = [
    fetchData('members', () => jkt48Api.members(apiKey)),
    fetchData('birthdays', () => jkt48Api.birthday(apiKey)),
    fetchData('events', () => jkt48Api.events(apiKey)),
    fetchData('recent', () => jkt48Api.recent(apiKey)),
    fetchData('live', () => jkt48Api.live(apiKey)),
    fetchData('liveYoutube', () => jkt48Api.liveYoutube(apiKey)),
    fetchData('liveIdn', () => jkt48Api.liveIdn(apiKey)),
    fetchData('liveShowroom', () => jkt48Api.liveShowroom(apiKey)),
    fetchData('youtube', () => jkt48Api.youtube(apiKey)),
    fetchData('news', () => jkt48Api.news(apiKey)),
    fetchData('theater', () => jkt48Api.theater(apiKey)),
    fetchData('replay', () => jkt48Api.replay(apiKey))
  ]

  const entries = await Promise.all(tasks)
  const result = Object.fromEntries(entries)

  res.send(`
    <html>
      <head>
        <title>JKT48 Data</title>
        <style>
          body { font-family: monospace; background: #000; color: #0f0; padding: 1rem; white-space: pre-wrap }
          h1 { color: #FEE356 }
        </style>
      </head>
      <body>
        <h1>JKT48 API Data (Partial if Error)</h1>
        <pre>${JSON.stringify(result, null, 2)}</pre>
      </body>
    </html>
  `)
})

app.listen(port, () => {
  console.log(`✅ Server aktif di http://localhost:${port}`)
})
