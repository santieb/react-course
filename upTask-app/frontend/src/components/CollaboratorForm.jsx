import { useState } from 'react'
import Alert from './Alert'
import useProjects from '../hooks/useProjects'

const CollaboratorForm = () => {
  const [email, setEmail] = useState('')

  const { submitCollaborator, showAlert, alert } = useProjects()

  const handleSubmit = e => {
    e.preventDefault()

    if (!email) return showAlert({ msg: 'El email es obligatorio', error: true })

    submitCollaborator(email)
  }

  const { msg } = alert

  return (
    <form onSubmit={handleSubmit} className="bg-white py-10 px-5 w-full md:1/2 rounded-lg shadow">
      {msg && <Alert alert={alert}/>}
      <div className="mb-5">
        <label htmlFor="name" className="text-gray-700 uppercase font-bold text-sm">
          Email Colaborador
        </label>
        <input 
          type="email" 
          id='email'
          placeholder="Email del Usuario"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={email}
          onChange={({target}) => setEmail(target.value)}
        />
      </div>
      <input value={'Buscar colaborador'} type="submit" className="p-3 bg-sky-600 hover:bg-sky-700 w-full cursor-pointer upercase font-bold rounded transition-colors text-white text-sm"/> 
    </form>

  )
}

export default CollaboratorForm