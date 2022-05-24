import { Link } from "react-router-dom"

const Login = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Inicia Sesión y administra tus 
        <span className="text-slate-700"> proyectos</span></h1>
      <form className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">
            Email
          </label>
          <input 
            type='email'
            placeholder='Email de registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            id="email"
            ></input>
        </div>

        <div className="my-5">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">
            Contraseña
          </label>
          <input 
            type='password'
            placeholder='Contraseña'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            id="password"
            ></input>
        </div>

        <input type="submit" value="Iniciar Sesión" className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded mb-5 hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to="/register" className="block text-center my-5 text-slate-500 uppercase text-sm">
        ¿No tienes una cuenta? Registrate</Link>

        <Link to="/forgot-password" className="block text-center my-5 text-slate-500 uppercase text-sm">
        Olvide mi contraseña</Link>
      </nav>
    </>
  )
}

export default Login