import { useState, useCallback } from 'react'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback( 
    async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
      setLoading(true)
      try {
        if (body) {
          body = JSON.stringify(body)
        }
        // console.log('fetch', url, body, headers)
        const response = await fetch(url, {method, body, headers})
        // console.log('response', response)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Can not fetch data...')
        }
        setLoading(false)
        return data
      } catch (e) {
        setLoading(false)
        // console.log('error', e)
        setError(e)
        throw e
      }
  }, [])

  return { request, loading, error }
}