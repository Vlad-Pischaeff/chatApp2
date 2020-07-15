import { useEffect, useRef, useCallback, useState } from 'react'
const protocolPrefix = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
let {host} = window.location
const url = `${protocolPrefix}//${host}/ws`
// let webSocket = new WebSocket(url)

export default function useWebsocket() {
  const socketRef = useRef()
  const isReady = useRef()  
  const [ socketMessage, setSocketMessage ] = useState({})
  const [webSocket, setWebsocket] = useState()

  useEffect(() => {
    let socket = new WebSocket(url)
    setWebsocket(socket)
  }, [])

  useEffect(() => {
    if (webSocket !== undefined) {
      webSocket.onopen = handleOpen
      webSocket.onclose = handleClose
      webSocket.onmessage = handleReceiveMessage
      socketRef.current = webSocket
      isReady.current = true
      console.log('Websocket initialisation ... isReady =', isReady, webSocket )
    }
  }, [webSocket])

  const handleOpen = () => {
    console.log("Websocket opened ...")
    let message = { client: 'new' }
    socketRef.current.send(JSON.stringify(message))
  }

  const handleClose = () => {
    console.log("Websocket closed ...")
    let socket = new WebSocket(url)
    setWebsocket(socket)
    console.log("Websocket new connection ...")
    isReady.current = true
  }

  const socketSendMessage = useCallback(
    message => {
      isReady.current && socketRef.current.send(JSON.stringify(message))
    },
    [socketRef]
  )
 
  const handleReceiveMessage = messageObject => {
    const message = JSON.parse(messageObject.data)
    setSocketMessage(message)
    console.log('Websocket.hook received message ...', message)
  }

  // function waitForOpenSocket(socket) {
  //   return new Promise((resolve, _reject) => {
  //     while (socket.readyState !== socket.OPEN) { /* no-op */ }
  //     return resolve()
  //   })
  // }
  
  // async function sendMessage(socket, msg) {
  //   await waitForOpenSocket(socket)
  //   socket.send(msg)
  // }
  
  return {socketRef, socketMessage, socketSendMessage}
}