import Form from "./Form"
import Result from "./Result"
import useWheather from "../hooks/useWheather"
import Spinner from "./Spinner"

const WheatherApp = () => {
  const { res, noResult, loading } = useWheather()

  return (
    <main className="dos-columnas">
      <Form/>
      
      {loading ? <Spinner/> :
       res?.name ? <Result/> :
       noResult ? <p>{noResult}</p> : 
       <p>El clima se va mostrar aquí</p>}

      
    </main>
  )
}

export default WheatherApp