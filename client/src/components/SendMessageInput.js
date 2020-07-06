import React, { useState, useContext, useEffect } from 'react'
import { Input, InputGroup, Icon } from 'rsuite'
import { useAuth } from '../hooks/auth.hook'
import { useHttp } from '../hooks/http.hook'
import { context } from '../context/context'

const styles = { search: { width: '25rem', margin: '0 1rem' }, }

export default function SendMessageInput () {
  
  const message = useAuth('message', false)
  const { request, loading, error, header } = useHttp()
  const { activeKey, items, itemIndex, credentials, setMessages } = useContext(context)
  const [result, setResult] = useState([])
  const [disabled, setDisabled] = useState(true)
  // let from = credentials.userId
  let to = itemIndex === undefined ? null : items[itemIndex]._id

  useEffect(() => {
    itemIndex !== undefined 
    ? setDisabled(false)
    : setDisabled(true)
  }, [itemIndex])

  const handleClick = async () => {
    const API = '/api/message/new'
    const text = message.value
    const body = { to, text }
    const data = await request(API, 'PUT', body, header)
    console.log('search result ... ', data)
    // getUserMessages()
    message.onFocus()
  }

  // const getUserMessages = async () => {
  //   const API = `/api/message/user/${to}`
  //   const data = await request(API, 'GET', null, header)
  //   console.log('get messages result ...', data)
  //   setMessages(data)
  // }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleClick()
  }
  // console.log(`input values ${from} .. ${to}`)
  return (

    <InputGroup size='md' style={styles.search} >
      <Input placeholder='message ...' onKeyPress={handleKeyPress} {...message} disabled={disabled} />
      <InputGroup.Addon>
        <Icon icon="send" onClick={handleClick} />
      </InputGroup.Addon>
    </InputGroup>
  )
}