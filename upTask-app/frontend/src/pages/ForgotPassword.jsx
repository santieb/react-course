import { useState } from 'react'
import { Link } from "react-router-dom"
import clientAxios from '../config/clientAxios'
import Alert from '../components/Alert'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    if (!email || email.length < 6) 
      return setAlert({ msg: 'El email es obligatorio', error: true })

    setAlert('')

    try {
      const url = `/users/forgot-password`
      const { data } = await clientAxios.post(url, { email })

      setAlert({ msg: data.msg, error: false })

      setEmail('')
    } catch (err) {
      setAlert({ msg: err.response.data.msg, error: true })
    }
  }

  const { msg } = alert

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recupera tu acceso y no pierdas tus
        <span className="text-slate-700"> proyectos</span>
      </h1>

      {msg && <Alert alert={alert}/>}
      
      <form 
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg p-10"
      >
        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">
            Email
          </label>
          <input 
            type='email'
            placeholder='Email de registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            id="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>

        <input type="submit" value="Enviar instrucciones" className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded mb-5 hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to="/" className="block text-center my-5 text-slate-500 uppercase text-sm">
        ¿Ya tienes una cuenta? Iniciar sesion</Link>

        <Link to="/register" className="block text-center my-5 text-slate-500 uppercase text-sm">
        ¿No tienes una cuenta? Registrate</Link>
      </nav>
    </>
  )
}

export default ForgotPassword