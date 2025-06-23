import express from 'express'
import cors from 'cors'
import pkg from '@jkt48/core'

const { jkt48Api } = pkg
const app = express()
const port = process.env.PORT || 3000
const apiKey = '48-NEPHYY'

app.use(cors())

app.get('/all', async (req, res) => {
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

    res.json({
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
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(port, () => {
  console.log(`✅ Server jalan di http://localhost:${port}/all`)
})
