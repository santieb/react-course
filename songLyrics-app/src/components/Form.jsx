import { useState } from 'react'
import useLetters from '../hook/useLetters'

const Form = () => {
  const { setAlert, searchLetters } = useLetters()

  const [search, setSearch] = useState({
    artist: '',
    song: ''
  })

  const handleSubmit = e => {
    e.preventDefault()

    if(Object.values(search).includes('')) return setAlert('Coloca un nombre de artista y una canción')

    searchLetters(search)
  }


  return (
    <form onSubmit={handleSubmit}>
      <legend>Busca por Artista y Canción</legend>

      <div className="form-grid">
        <div>
          <label>Artista</label>
          <input 
            type="text"
            name="artist"
            placeholder="Nombre del Artista"
            value={search.artist}
            onChange={({ target}) => setSearch({
              ...search,
              [target.name] : target.value
            })}
            >
          </input>
        </div>
        <div>
          <label>Canción</label>
          <input 
            type="text"
            name="song"
            placeholder="Nombre de la Canción"
            value={search.song}
            onChange={({ target}) => setSearch({
              ...search,
              [target.name] : target.value
            })}
            >
          </input>
        </div>
        <input type="submit" value="Buscar" />
      </div>
    </form>
  )
}

export default Form