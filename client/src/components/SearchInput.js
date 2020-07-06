import React, { useState, useContext, useRef } from 'react'
import { Input, InputGroup, Icon } from 'rsuite'
import { useAuth } from '../hooks/auth.hook'
import { useHttp } from '../hooks/http.hook'
import { context } from '../context/context'
import { Link, useLocation } from 'react-router-dom'

const styles = { search: { width: '15rem', margin: '0 1rem' }, }

export default function SearchInput () {
  let location = useLocation()
  
  const search = useAuth('search', false)
  const { request, loading, error, header } = useHttp()
  const { activeKey } = useContext(context)
  const [result, setResult] = useState([])
  const searchRef = useRef()

  const handleClick = async () => {
    const API = (activeKey === 'conversations') ? '/api/auth/search' : '/api/room/search'
    const body = { 'search': search.value }
    const data = await request(API, 'POST', body, header)
    // console.log(`${API} search result ...`, data)
    setResult(data)
    searchRef.current.click()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleClick()
  }

  return (

    <InputGroup size='md' style={styles.search} >
      <Input placeholder='search' onKeyPress={handleKeyPress} {...search} />
      <InputGroup.Addon>
        <Icon icon="search" onClick={handleClick} />
      </InputGroup.Addon>
      <Link to={{ pathname: '/search', state: {background: location, result} }} ref={searchRef} />
    </InputGroup>
  )
}