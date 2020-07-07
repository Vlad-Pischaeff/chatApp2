import { useEffect, useRef, useCallback, useState } from 'react'
const protocolPrefix = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
let {host} = window.location
const url = `${protocolPrefix}//${host}/ws`
let socketReady = false

export default function useWebsocket() {
  const socketRef = useRef()
  // const [ socketReady, setSocketReady ] = useState(false)

  useEffect(() => {
    const webSocket = new WebSocket(url)
    webSocket.onopen = handleOpen
    webSocket.onclose = handleClose
    webSocket.onmessage = handleReceiveMessage
    socketRef.current = webSocket
  }, [])

  const handleOpen = () => {
    console.log("Websocket opened ...")
    socketReady = true
    let message = { 'client': 'connected' }
    socketRef.current.send(JSON.stringify(message))
  }

  const handleClose = () => {
    console.log("Websocket closed ...")
  }

  const socketSendMessage = useCallback(
    message => {
      console.log('socketReady ...', socketReady)
      socketReady && socketRef.current.send(JSON.stringify(message))
    },
    [socketRef]
  )
 
  const handleReceiveMessage = messageObject => {
    const message = JSON.parse(messageObject.data)
    console.log('web socket message ...', messageObject.data, message)
    switch (message) {
      case 'value1': 
        socketSendMessage(message)
        break
      case 'value2': 
        socketSendMessage(message)
        break
      case 'value3': 
        socketSendMessage(message)
        break
      default: 
        console.log('socket message from server ...', message)
    }
  }

  return {socketRef, socketSendMessage}
}