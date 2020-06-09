import { useState, useCallback } from 'react'

export const useStorage = () => {
  const [credentials, setCredentials] = useState({})

  const saveCredentials = useCallback((data) => {
    localStorage.setItem('credentials', JSON.stringify(data))
    setCredentials(data)
  }, [])

  return { credentials, saveCredentials }
}