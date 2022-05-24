const NewPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu contraseña y no pierdas acceso a  tus
        <span className="text-slate-700"> proyectos</span></h1>
      <form className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label htmlFor="newPassword" className="uppercase text-gray-600 block text-xl font-bold">
            Nueva contraseña
          </label>
          <input 
            type='password'
            placeholder='Escribe tu nueva contraseña'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            id="newPassword"
            ></input>
        </div>
        <input type="submit" value="Guardar nueva contraseña" className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded mb-5 hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
      </form>
    </>
  )
}

export default NewPassword