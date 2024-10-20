import { useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

const useApi = <T>() => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean | null>(null)

  const sendRequest = async (config: AxiosRequestConfig) => {
    setError(null)
    setLoading(true)
    
    try {
      // Simulando delay de api
      setTimeout(async () => {
        const response = await axios(config)
        if (config.method == 'GET') {
          setData(response.data) 
        } else if (response && config.method !== 'GET') {
          // Chamando get pra mostrar dados atualizados na tela
          const responseGet = await axios.get(`${import.meta.env.VITE_API_HOST}/registrations`)
          setData(responseGet.data) 
        }
        setLoading(false)
      }, 2000)
    } catch (err) {
      setLoading(false)
      setError(true)
    }
  }
  return { data, loading, error, sendRequest }
}

export default useApi
