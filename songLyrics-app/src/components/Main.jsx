import Form from "./Form"
import Alert from "./Alert"
import Lyrics from "./Lyrics"
import useLetters from '../hook/useLetters'


const Main = () => {
  const { alert, lyrics, loading } = useLetters()

  return (
    <>
      <header>Búsqueda de letras de canciones</header>
      <Form/>

      <main>
        {alert ? <Alert>{alert}</Alert> :
         lyrics ? <Lyrics/> :
         loading ? 'cargando...' :
         <p className="text-center">Busca letras de tus artistas favoritos</p>}
      </main>  
    </>
  )
}

export default Main