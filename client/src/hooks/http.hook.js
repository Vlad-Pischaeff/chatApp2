import { useState, useCallback, useContext } from 'react'
import { context } from '../context/context'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { credentials } = useContext(context)
  const header = Object.keys(credentials).length !== 0 
    ? { 'Content-Type': 'application/json', Authorization: credentials.token }
    : { 'Content-Type': 'application/json' }

  const request = useCallback( 
    async (url, method = 'GET', body = null, headers = header) => {
      setLoading(true)
      try {
        if (body) {
          body = JSON.stringify(body)
        }

        const response = await fetch(url, {method, body, headers})
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Can not fetch data...')
        }
        setLoading(false)
        return data
      } catch (e) {
        setLoading(false)
        setError(e)
        throw e
      }
  }, [])

  return { request, loading, error, header }
}