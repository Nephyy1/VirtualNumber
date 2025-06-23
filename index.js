import express from 'express'
import cors from 'cors'
import pkg from '@jkt48/core'

const { jkt48Api } = pkg
const app = express()
const port = 3000
const apiKey = '48-NEPHYY'

app.use(cors())

app.get('/', async (req, res) => {
  try {
    const [
      members,
      birthdays,
      events,
      recent,
      live,
      liveYoutube,
      liveIdn,
      liveShowroom,
      youtube,
      news,
      theater,
      replay
    ] = await Promise.all([
      jkt48Api.members(apiKey),
      jkt48Api.birthday(apiKey),
      jkt48Api.events(apiKey),
      jkt48Api.recent(apiKey),
      jkt48Api.live(apiKey),
      jkt48Api.liveYoutube(apiKey),
      jkt48Api.liveIdn(apiKey),
      jkt48Api.liveShowroom(apiKey),
      jkt48Api.youtube(apiKey),
      jkt48Api.news(apiKey),
      jkt48Api.theater(apiKey),
      jkt48Api.replay(apiKey)
    ])

    const data = {
      members,
      birthdays,
      events,
      recent,
      live,
      liveYoutube,
      liveIdn,
      liveShowroom,
      youtube,
      news,
      theater,
      replay
    }

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
          <h1>JKT48 API Data</h1>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        </body>
      </html>
    `)
  } catch (err) {
    res.status(500).send('Gagal memuat data: ' + err.message)
  }
})

app.listen(port, () => {
  console.log(`✅ Server aktif di http://localhost:${port}`)
})
