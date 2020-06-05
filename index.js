const express = require('express')
const app = express()

const config = require('config')
const PORT = config.get('port') || 5000
const path = require('path')
const mongoose = require('mongoose')
const WebSocket = require('ws')

let clients = new Set()

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))

// app.get('/', function(req,res) {
//   res.sendFile(__dirname + '/index.html')
// })

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    const server = app.listen(PORT, () => {
      console.log(`server started on port ${PORT}...`)
    })

    const wss = new WebSocket.Server({ server, path: '/ws' })

    wss.on('connection', ws => {
      console.log('websocket app started...')
      ws.isAlive = true
      // ...add clients to Set
      let client = {}
      client.socket = ws
      clients.add(client)
    
      ws.on('message', message => {
        console.log('received: %s', message)
      })
    
      ws.on('pong', () => {
        ws.isAlive = true
        console.log('isAlive', ws.isAlive,`${new Date()}`)
      })
    })
    
    //...preserve constant clients connections...
    setInterval(() => {
      wss.clients.forEach(ws => {
        if (!ws.isAlive) return ws.terminate()
        ws.isAlive = false
        ws.ping()
      })
    }, 10000)

  } catch (e) {
    console.log('Server error', e)
    process.exit(1)
  }
}

start()





