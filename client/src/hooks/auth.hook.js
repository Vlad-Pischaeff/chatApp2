import { useState, useEffect, useCallback } from 'react'

export const useAuth = (item, save) => {
  const [value, setValue] = useState(localStorage.getItem(item) || '')

  useEffect(() => {
    (save) && localStorage.setItem(item, value)
  }, [save])

  const handlerOnChange = useCallback(e => setValue(e), [])

  const handlerOnFocus = useCallback(() => setValue(''), [])

  // console.log('auth hook ...', value)

  return {
    value, setValue,
    onChange: handlerOnChange,
    onFocus: handlerOnFocus
  }
}