import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import Alert from '../components/Alert'

const FormProject = () => {
  const [id, setId] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [client, setClient] = useState('')

  const params = useParams()

  const { showAlert, alert, submitProject, project } = useProjects()

  useEffect(() => {
    if (params.id && project.name) {
      setId(project._id)
      setName(project.name)
      setDescription(project.description)
      setDeliveryDate(project.deliveryDate.split('T')[0])
      setClient(project.client)
    }
    
  }, [params])

  const handleSubmit = async e => {
    e.preventDefault()

    if ([name, description, deliveryDate, client].includes('')) 
      return showAlert({ msg: 'Todos los campos son obligatorios', error: true })

    await submitProject({ id, name, description, deliveryDate, client})

    setId(null)
    setName('')
    setDescription('')
    setDeliveryDate('')
    setClient('')
  }

  const { msg } = alert

  return (
    <form 
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}>

      {msg && <Alert alert={alert}/>}

      <div className="mb-5">
        <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="name">
          Nombre Proyecto
        </label>
        <input 
          className="border w-full p-2 mt-2 placeholder-gray-400"
          type="text"
          id='name'
          placeholder='Nombre del proyecto'
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>

      <div className="mb-5">
        <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="description">
          Descripción
        </label>
        <input 
          className="border w-full p-2 mt-2 placeholder-gray-400"
          id='description'
          placeholder='Description del proyecto'
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
      </div>

      <div className="mb-5">
        <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="delivery-date">
          Fecha de entrega
        </label>
        <input 
          className="border w-full p-2 mt-2 placeholder-gray-400"
          type="date"
          id='delivery-date'
          value={deliveryDate}
          onChange={({ target }) => setDeliveryDate(target.value)}
        />
      </div>

      <div className="mb-5">
        <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="client">
          Nombre del CLiente
        </label>
        <input 
          className="border w-full p-2 mt-2 placeholder-gray-400"
          type="text"
          id='client'
          placeholder='Nombre del cliente'
          value={client}
          onChange={({ target }) => setClient(target.value)}
        />
      </div>

      <input type="submit" value={id ? 'Actualizar proyecto' : 'Crear proyecto'} className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"/>
    </form>
  )
}

export default FormProject