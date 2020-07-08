import { useState, useEffect, useCallback } from 'react'

export const useAuth = (item, save) => {
  const [value, setValue] = useState(localStorage.getItem(item) || '')

  useEffect(() => {
    (save) && localStorage.setItem(item, value)
  }, [save])

  const handlerOnChange = useCallback(e => setValue(e), [])

  const handlerOnFocus = useCallback(() => setValue(''), [])

  return {
    value, 
    onChange: handlerOnChange,
    onFocus: handlerOnFocus
  }
}