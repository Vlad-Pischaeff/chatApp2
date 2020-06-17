import React, { useState, useContext, useEffect } from 'react'
import { Input, InputGroup, Icon } from 'rsuite'
import { useAuth } from '../hooks/auth.hook'
import { useHttp } from '../hooks/http.hook'
import { context } from '../context/context'

const styles = { search: { width: '97%', margin: '3px' }, }

export default function SearchInput ({ activeKey }) {
  const search = useAuth('search', false)
  const { request, loading, error } = useHttp()
  const { headers } = useContext(context)
  const [result, setResult] = useState([])
  const [disabledSearch, setDisabledSearch] = useState(false)

  useEffect(() => {
    activeKey === 'privatechat' ? setDisabledSearch(true) : setDisabledSearch(false)
  }, [activeKey])

  const handleClick = async () => {
    const API = (activeKey === 'conversations') ? '/api/auth/search' : '/api/room/search'
    const body = { 'search': search.value }
    const data = await request(API, 'POST', body, headers)
    console.log('search value ...', data)
    setResult(data)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleClick()
  }

  return (
    <InputGroup size='md' style={styles.search} disabled={disabledSearch} >
      <Input placeholder='search' onKeyPress={handleKeyPress} {...search} />
      <InputGroup.Addon>
        <Icon icon="search" onClick={handleClick} />
      </InputGroup.Addon>
    </InputGroup>
  )
}