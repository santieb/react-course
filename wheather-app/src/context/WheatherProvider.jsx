import { useState, createContext } from 'react'
import axios from 'axios'

const WheatherContext = createContext()

const WheatherProvider = ({ children }) => {
  const [search, setSearch] = useState({
    country: '',
    city: ''
  })
  const [res, setRes] = useState({})
  const [loading, setLoading] = useState(false)
  const [noResult, setNoResult] = useState('')

  const searchData = ({ target }) => setSearch({...search, [target.name]: target.value})

  const getData = async (search) => {
    try {
      setRes({})
      setNoResult(false)
      setLoading(true)
      const { country, city } = search
      const appId = import.meta.env.VITE_API_KEY

      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${appId}`
      
      const { data } = await axios(url)
      const { lat, lon } = data[0]

      const urlWheather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
      const { data: wheather } = await axios(urlWheather)

      setRes(wheather)
    } catch (err) {
      setNoResult('No hay resultados')
    } finally {
      setLoading(false)
    }
  }

  return (
    <WheatherContext.Provider 
      value={{
        search,
        searchData,
        getData,
        res,
        loading,
        noResult
      }}>
      {children}
    </WheatherContext.Provider>
  )
}

export {
  WheatherProvider
}

export default WheatherContext