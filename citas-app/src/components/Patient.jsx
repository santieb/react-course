const Patient = ({ patient, setPatient, deletePatient }) => {
  const { pet, owner, email, date, symptoms, id } = patient

  const handleDelete = () => {
    const response = confirm('deseas eliminar el paciente?')
    if (response) deletePatient(id)
  }

  return (
    <div className="bg-white my-10 mx-5 shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold mn-2 text-gray-700 uppercase">
        Nombre:
        <span className="font-normal normal-case">{pet}</span>
      </p>

      <p className="font-bold mn-2 text-gray-700 uppercase">
        Propietario:
        <span className="font-normal normal-case">{owner}</span>
      </p>

      <p className="font-bold mn-2 text-gray-700 uppercase">
        Email:
        <span className="font-normal normal-case">{email}</span>
      </p>

      <p className="font-bold mn-2 text-gray-700 uppercase">
        Alta:
        <span className="font-normal normal-case">{date}</span>
      </p>

      <p className="font-bold mn-2 text-gray-700 uppercase">
        Sintomas:
        <span className="font-normal normal-case mt-5">
          {symptoms}
        </span>
      </p>

      <div className="flex justify-between mt-5">
        <button
          type="button"
          onClick={() => setPatient(patient)}
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-400 text-white font-bold upercase rounded-lg">
          Editar
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-400 text-white font-bold upercase rounded-lg">
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default Patient
