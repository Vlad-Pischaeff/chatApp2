import { useCallback, useState } from 'react'

export const useHover = () => {
  const [ hover, setHover ] = useState(false)

  const onMouseEnter = useCallback((e) => (console.log('element',e), setHover(true)), [])

  const onMouseLeave = useCallback(() => setHover(false), [])

  return { hover, onMouseEnter, onMouseLeave }
}
