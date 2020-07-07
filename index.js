const express = require('express')
const app = express()

const config = require('config')
const PORT = config.get('port') || 5000
const path = require('path')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const WebSocket = require('ws')

let clients = new Set()

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/room', require('./routes/room.routes'))
app.use('/api/message', require('./routes/message.routes'))

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
    const server = await app.listen(PORT, () => {
      console.log(`server started on port ${PORT}...`)
    })

    const wss = new WebSocket.Server({ server, path: '/ws' })

    wss.on('connection', ws => {
      console.log('websocket app started...')
      ws.isAlive = true
      let client = {}
    
      ws.on('message', message => {
        let data = JSON.parse(message)
        console.log('received: %s', message, data)
        if (data.online) {
          // ...add clients to Set
          client.id = data.online
          client.socket = ws
          clients.add(client)
          
          for(let client of clients) {
            client.socket.send(message)
          }
        }
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





