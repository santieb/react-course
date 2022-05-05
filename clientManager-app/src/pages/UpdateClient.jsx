import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Form from "../components/Form"
import Alert from '../components/Alert'

const UpdateClient = () => {
  const [client, setClient] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    const getClient = async () => {
      try {
        const url = `http://localhost:4000/clients/${id}`
        const res = await fetch(url)
        const data = await res.json()
        setClient(data)

      } catch (e) {
        console.log(e)
      }

      setLoading(!loading)
    }
    getClient()
  }, [])

  return (
    <>        
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Utiliza este formulario para editar los datos de un cliente</p>
      {client?.name ? ( 
      <Form
        client={client}
        loading={loading}
      />) : <Alert>Cliente id no valido</Alert>}
    </>
  )
}

export default UpdateClient