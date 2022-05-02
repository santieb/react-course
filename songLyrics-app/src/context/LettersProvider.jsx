import { useState, createContext } from 'react'
import axios from 'axios'

const LettersContext = createContext()

const LettersProvider = ({ children }) => {
  const [alert, setAlert] = useState('')
  const [lyrics, setLyrics] = useState('')
  const [loading, setLoading] = useState(false)

  const searchLetters = async (search) => {
    try{
      setLoading(true)
      const { artist, song } = search
      const url = `https://api.lyrics.ovh/v1/${artist}/${song}`
      const { data } = await axios(url)
      setLyrics(data.lyrics)
      setAlert('')
    } catch(err) {
      setAlert('Canción no encontrada')
    }
    setLoading(false)
  }

  return (
    <LettersContext.Provider 
    value={{
      alert,
      setAlert,
      lyrics,
      loading,
      searchLetters
    }}
    >
      {children}
    </LettersContext.Provider>
  )
}

export {
  LettersProvider
}

export default LettersContext