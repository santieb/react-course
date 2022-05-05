import { useState, useEffect } from 'react'
import Client from '../components/Client'

const Home = () => {
  const [clients, setClients] = useState([])

  useEffect(() => {
    const getClients = async () => {
      try {
        const url = 'http://localhost:4000/clients'
        const res = await fetch(url)
        const data = await res.json()
        setClients(data)
      }
      catch (e) {
        console.log(e)
      }
    }
    getClients()
  }, [])

  const handleDelete = async id => {
    try{
      const bool = confirm('Deseas eliminar este cliente?')
      if (bool) {
        const url = `http://localhost:4000/clients/${id}`
        const res = await fetch(url, {
          method: 'DELETE'
        })
        await res.json()

        const newClients = clients.filter(client => client.id !== id)
        setClients(newClients)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      <table className="w-full my-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (<Client key={client.id} handleDelete={handleDelete} client={client}/>))}
        </tbody>
      </table>
    </>
  )
}

export default Home