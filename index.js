const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const config = require('config')
const http = require('http')
const https = require('https')
const WebSocket = require('ws')
const path = require('path')
const mongoose = require('mongoose')

const privateKey  = fs.readFileSync('./keys/privkey.pem', 'utf8')
const certificate = fs.readFileSync('./keys/cert.pem', 'utf8')
const credentials = {key: privateKey, cert: certificate}

const PORT = config.get('port') || 5000
const MONGO_URL = config.get('mongoUrl')

const isProduction = process.env.NODE_ENV === 'production'
                      ? true
                      : false
const Server = isProduction
                ? https.createServer(credentials, app)
                : http.createServer(app)

const clients = new Set()

app.use(express.json({ extended: true }))
app.use(cors())

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/room', require('./routes/room.routes'))
app.use('/api/message', require('./routes/message.routes'))
app.use('/api/notification', require('./routes/notification.routes'))

if (isProduction) {
  app.use('/', express.static(path.join(__dirname, 'client', 'build', )))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const start = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    const server = await Server.listen(PORT, () => {
        console.log('http/https server started ...')
    })

    wss = new WebSocket.Server({ server, path: '/ws' })
    
    wss.on('connection', ws => {
      console.log('websocket app started...')
      ws.isAlive = true
      let client = {}
    
      ws.on('message', message => {
        try {
          let data = JSON.parse(message)
          console.log('received: %s', data, wss.clients.size)
          if (data.action === 'online') {
            if (data.state) {
              // ...add clients to Set
              client.id = data.id
              client.socket = ws
              clients.add(client)
            } else {
              ws.isAlive = false
            }
          } else {
            wss.clients.forEach(client => client.send(message))
          }
        } catch(e) {
          console.log('Received unrecognized message ... ', message)
        }
      })
    
      ws.on('pong', () => {
        ws.isAlive = true
        // console.log('all clients ...', clients.size)
        console.log('isAlive', ws.isAlive,`${new Date()}`)
        for (let client of clients) {
          let message = JSON.stringify({ action: 'online', state: true, id: client.id })
          wss.clients.forEach(client => client.send(message))
        }
      })
    })
    
    //...preserve constant clients connections...
    // setInterval(() => {
    //   wss.clients.forEach(ws => {
    //     if (!ws.isAlive) return ws.terminate()
    //     ws.isAlive = false
    //     ws.ping()
    //   })
    // }, 10000)

    setInterval(() => {
      // console.log('set interval...', clients)
      clients.forEach(ws => {
        console.log('Is Web Socket Alive ...', ws.socket.isAlive)
        if (!ws.socket.isAlive) {
          let message = JSON.stringify({ action: 'online', state: false, id: ws.id })
          clients.delete(ws)
          wss.clients.forEach(client => client.send(message))
          return ws.socket.terminate()
        }
        ws.socket.isAlive = false
        ws.socket.ping()
      })
    }, 10000)

  } catch (e) {
    console.log('Server error', e)
    process.exit(1)
  }
}

start()