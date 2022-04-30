import Patient from "./Patient"

const PacientList = ({ patients, setPatient, deletePatient }) => {
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">

      {patients && patients.length ? (
        <>
          <h2 className="font-black text-3xl text-center">
            Listado de pacientes
          </h2>
          <p className=" text-xl mt-5 my-10 text-center">
            Admistra tus
            <span className="font-bold text-indigo-600">
              Pacientes y citas
            </span>
          </p>

          {patients.map((patient) => (
            <Patient
              key={patient.id}
              patient={patient}
              setPatient={setPatient}
              deletePatient={deletePatient}
            />
          ))}
        </>
      ) :
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
          <p className=" text-xl mt-5 my-10 text-center">
            Agrega pacientes
            <span className="font-bold text-indigo-600"> Y apareceran en este lugar</span>
          </p>
        </>
      }

    </div>
  )
}

export default PacientList
