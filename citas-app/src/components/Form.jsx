import { useState, useEffect } from 'react'
import Error from './Error'

const Form = ({ patients, setPatients, patient, setPatient }) => {
  const [pet, setPet] = useState('')
  const [owner, setOwner] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [symptoms, setSymptoms] = useState('')

  const [error, setError] = useState(false)

  useEffect(() => {
    if (Object.keys(patient).length > 0) {
      const { pet, owner, email, date, symptoms } = patient
      setPet(pet)
      setOwner(owner)
      setEmail(email)
      setDate(date)
      setSymptoms(symptoms)
    }
  }, [patient])

  const generateID = () => {
    const random = Math.random().toString(36)
    const fecha = Date.now().toString(36)
    return fecha + random
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if ([pet, owner, email, date, symptoms].includes('')) return setError(true)
    setError(false)

    const objPatient = { pet, owner, email, date, symptoms }

    if (patient.id) {
      objPatient.id = patient.id

      const updatedPatients = patients.map(patientState =>
         patientState.id === patient.id ? objPatient : patientState)

      setPatients(updatedPatients)
      setPatient({})
    }

    else {
      objPatient.id = generateID()
      setPatients([...patients, objPatient])
    }

    setPet('')
    setOwner('')
    setEmail('')
    setDate('')
    setSymptoms('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade pacientes y
        <span className="text-indigo-600 font-bold"> Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">

        {error && <Error><p>Todos los campos son obligatorios</p></Error>}

        <div className="mb-5">
          <label htmlFor="pet" className="block text-gray-700 uppercase font-bold">Nombre de mascota</label>
          <input
            id="pet"
            type="text"
            placeholder="Nombre de la mascota"
            value={pet}
            onChange={({ target }) => setPet(target.value)}
            className=" p-2 mt-2 border-2 w-full placeholder-gray-400 rounded-md">
          </input>
        </div>

        <div className="mb-5">
          <label htmlFor="owner" className="block text-gray-700 uppercase font-bold">Nombre de propietario</label>
          <input
            id="owner"
            type="text"
            placeholder="Nombre del propietario"
            value={owner}
            onChange={({ target }) => setOwner(target.value)}
            className=" p-2 mt-2 border-2 w-full placeholder-gray-400 rounded-md">
          </input>
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email contacto propietario"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            className=" p-2 mt-2 border-2 w-full placeholder-gray-400 rounded-md">
          </input>
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="block text-gray-700 uppercase font-bold">Alta</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            className=" p-2 mt-2 border-2 w-full placeholder-gray-400 rounded-md">
          </input>
        </div>

        <div className="mb-5">
          <label htmlFor="symptom" className="block text-gray-700 uppercase font-bold">Alta</label>
          <textarea
            id="symptom"
            placeholder="Escribe los sintomas"
            value={symptoms}
            onChange={({ target }) => setSymptoms(target.value)}
            className=" p-2 mt-2 border-2 w-full placeholder-gray-400 rounded-md">
          </textarea>
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 font-bold text-white uppercase hover:bg-indigo-500 cursor-pointer transition-all"
          value={patient.id ? 'Editar paciente' :'Agregar paciente'}>
        </input>
      </form>
    </div>
  )
}

export default Form