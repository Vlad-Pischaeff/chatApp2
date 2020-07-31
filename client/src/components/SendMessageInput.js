import React, { useState, useContext, useEffect } from 'react'
import { Input, InputGroup, Icon } from 'rsuite'
import { useAuth } from '../hooks/auth.hook'
import { useHttp } from '../hooks/http.hook'
import { context, useGlobalCredentialsContext, useGlobalWebsocketContext } from '../context/context'

const styles = { search: { width: '25rem', margin: '0 1rem' }, }

export default function SendMessageInput () {
  
  const message = useAuth('message', false)
  const { credentials } = useGlobalCredentialsContext()
  const { socketSendMessage } = useGlobalWebsocketContext()
  const { request } = useHttp()
  const { items, itemIndex, activeKey } = useContext(context)
  const [ disabled, setDisabled ] = useState(true)
  let from = credentials.userId
  let to = items[itemIndex] === undefined ? null : items[itemIndex]._id

  useEffect(() => {
    itemIndex !== undefined 
      ? setDisabled(false)
      : setDisabled(true)
  }, [itemIndex])

  const handleClick = async () => {
    const API = '/api/message/new'
    const text = message.value
    const body = { to, text }
    await request(API, 'PUT', body)
    message.onFocus()
    let msg = activeKey === 'conversations' 
      ? { 'fromuser': from, 'to': to }
      : { 'from': from, 'toroom': to }
    socketSendMessage(msg)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleClick()
  }

  return (

    <InputGroup size='md' style={styles.search} >
      <Input placeholder='message ...' onKeyPress={handleKeyPress} {...message} disabled={disabled} />
      <InputGroup.Addon>
        <Icon icon="send" onClick={handleClick} />
      </InputGroup.Addon>
    </InputGroup>
  )
}