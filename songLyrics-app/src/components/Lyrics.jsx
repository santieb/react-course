import useLetters from '../hook/useLetters'

const Lyrics = () => {
  const { lyrics, loading } = useLetters()
  return (
    loading ? 'cargando...' :<div className="letra">{lyrics}</div>
  )
}

export default Lyrics