import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

const getCliente = () => {
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
    loading ? <Spinner/> :
     Object.keys(client).length === 0 ? 
     <p>No hay resultados</p> : (
      <div>
        <h1 className="font-black text-4xl text-blue-900">Ver cliente</h1>
        <p className="mt-3">Informacion del cliente</p>

        <p className="text-4xl text-gray-600 mt-10">
          <span className="text-gray-800 uppercase font-bold">Cliente:</span> {client.name}
        </p>

        <p className="text-2xl text-gray-600 mt-4">
          <span className="text-gray-800 uppercase font-bold">Email:</span> {client.name}
        </p>

        {client.phone && (
          <p className="text-2xl text-gray-600 mt-4">
            <span className="text-gray-800 uppercase font-bold">Telefono:</span> {client.phone}
          </p>
        )}

        <p className="text-2xl text-gray-600 mt-4">
          <span className="text-gray-800 uppercase font-bold">Empresa:</span> {client.company}
        </p>
        {client.notes && (
          <p className="text-2xl text-gray-600 mt-4">
            <span className="text-gray-800 uppercase font-bold">Notas:</span> {client.notes}
          </p>
        )}
      </div>
    )
  )
}

export default getCliente