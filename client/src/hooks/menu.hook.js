import { useState } from 'react'

export const useMenu = () => {
  const [menu, setMenu] = useState('')

  return { menu, setMenu }
}