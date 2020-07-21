const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const http = require('http')
const https = require('https')
const privateKey  = fs.readFileSync('./selfsigned.key', 'utf8')
const certificate = fs.readFileSync('./selfsigned.crt', 'utf8')
const credentials = {key: privateKey, cert: certificate}

const config = require('config')
const PORT = config.get('port') || 5000
const path = require('path')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const WebSocket = require('ws')
const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

let clients = new Set()
let server

app.use(express.json({ extended: true }))
app.use(cors())

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/room', require('./routes/room.routes'))
app.use('/api/message', require('./routes/message.routes'))

// app.get('*', function(req, res) {
//   console.log('get /')
//   res.sendFile(__dirname + '/index.html')
// })

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build', )))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', '/index.html'))
  })
}

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    
    if (process.env.NODE_ENV === 'production') {
      server = await httpsServer.listen(PORT, () => {
        console.log('https server started ...')
      })
    } else {
      server = await httpServer.listen(PORT, () => {
        console.log('http server started ...')
      })
    }

    wss = new WebSocket.Server({ server, path: '/ws' })
    
    wss.on('connection', ws => {
      console.log('websocket app started...')
      ws.isAlive = true
      let client = {}
    
      ws.on('message', message => {
        let data = JSON.parse(message)
        console.log('received: %s', message, data, wss.clients.size)
        if (data.online) {
          // ...add clients to Set
          client.id = data.online
          client.socket = ws
          clients.add(client)
        }
        if (data.from || data.to || data.invite) {
          wss.clients.forEach(client => client.send(message))
        }
      })
    
      ws.on('pong', () => {
        ws.isAlive = true
        // console.log('all clients ...', clients.size)
        console.log('isAlive', ws.isAlive,`${new Date()}`)
        for (let client of clients) {
          let message = JSON.stringify({ online: client.id })
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
      clients.forEach(ws => {
        if (!ws.socket.isAlive) {
          let message = JSON.stringify({ offline: ws.id })
          wss.clients.forEach(client => client.send(message))
          clients.delete(ws)
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