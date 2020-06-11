import { useEffect, useRef, useCallback } from 'react'
const protocolPrefix = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
let {host} = window.location
const url = `${protocolPrefix}//${host}/ws`

export default function useWebsocket() {
  const socketRef = useRef()

  useEffect(() => {
    const webSocket = new WebSocket(url)
    webSocket.onopen = handleOpen
    webSocket.onclose = handleClose
    webSocket.onmessage = handleReceiveMessage
    socketRef.current = webSocket
  }, [])

  const handleOpen = () => {
    console.log("Websocket opened ...")
    socketRef.current.send('client connected ...')
  }

  const handleClose = () => {
    console.log("Websocket closed ...");
  }

  const sendMessage = useCallback(
    message => {
      socketRef.current.send(JSON.stringify(message));
    },
    [socketRef]
  )

  const handleReceiveMessage = messageObject => {
    const message = JSON.parse(messageObject.data);
    switch (message.type) {
      case 'value1': sendMessage(message)
      case 'value2': sendMessage(message)
      case 'value3': sendMessage(message)
      default: sendMessage(message)
    }
  }

  return {socketRef, sendMessage}
}