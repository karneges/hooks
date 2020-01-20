import { useState, useEffect } from "react"
import Axios from "axios"
import useLocalStorage from "./useLocalStorage"

const useFetch = (url) => {
  const baseUrl = 'https://conduit.productionready.io/api'
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState({})
  const [token] = useLocalStorage('token')

  const doFetch = (options = {}) => {
    setOptions(options)
    setIsLoading(true)
  }
  useEffect(() => {
    console.log(`Fetch`);
    
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : ''
        }
      }
    }
    if (!isLoading) {
      return
    }
    Axios(`${baseUrl}${url}`, requestOptions)
      .then((res) => {
        setIsLoading(false)
        setResponse(res.data)
      }).catch((error) => {
        setIsLoading(false)
        setError(error.response.data)
      })
  }, [isLoading, url, options,token])

  return [{ isLoading, response, error }, doFetch]
}

export default useFetch;