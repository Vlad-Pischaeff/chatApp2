import { useEffect, useRef, useCallback, useState } from 'react'
const protocolPrefix = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
let {host} = window.location
const url = `${protocolPrefix}//${host}/ws`
let webSocket = new WebSocket(url)

export default function useWebsocket() {
  const socketRef = useRef()
  const [ socketMessage, setSocketMessage ] = useState({})
  let isReady = false

  useEffect(() => {
    webSocket.onopen = handleOpen
    webSocket.onclose = handleClose
    webSocket.onmessage = handleReceiveMessage
    socketRef.current = webSocket
    isReady = true
    console.log('socket initialisation ...', isReady )
  }, [])

  const handleOpen = () => {
    console.log("Websocket opened ...")
    let message = { client: 'new' }
    socketRef.current.send(JSON.stringify(message))
  }

  const handleClose = () => {
    console.log("Websocket closed ...")
    isReady = false
  }

  const socketSendMessage = useCallback(
    message => {
      isReady && socketRef.current.send(JSON.stringify(message))
    },
    [socketRef]
  )
 
  const handleReceiveMessage = messageObject => {
    const message = JSON.parse(messageObject.data)
    setSocketMessage(message)
    console.log('received message ...', message)
  }

  return {socketRef, socketMessage, socketSendMessage}
}