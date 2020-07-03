import React, { useState, useContext } from 'react'
import { Input, InputGroup, Icon } from 'rsuite'
import { useAuth } from '../hooks/auth.hook'
import { useHttp } from '../hooks/http.hook'
import { context } from '../context/context'

const styles = { search: { width: '25rem', margin: '0 1rem' }, }

export default function SendMessageInput () {
  
  const search = useAuth('search', false)
  const { request, loading, error, header } = useHttp()
  const { activeKey } = useContext(context)
  const [result, setResult] = useState([])

  const handleClick = async () => {
    // const API = (activeKey === 'conversations') ? '/api/auth/search' : '/api/room/search'
    // const body = { 'search': search.value }
    // const data = await request(API, 'POST', body, header)
    console.log(` search result ...`)
    // setResult(data)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleClick()
  }

  return (

    <InputGroup size='md' style={styles.search} >
      <Input placeholder='message ...' onKeyPress={handleKeyPress} {...search} />
      <InputGroup.Addon>
        <Icon icon="send" onClick={handleClick} />
      </InputGroup.Addon>
    </InputGroup>
  )
}