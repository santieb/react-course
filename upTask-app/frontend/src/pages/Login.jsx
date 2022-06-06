import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Alert from '../components/Alert'
import clientAxios from '../config/clientAxios'
import useAuth from '../hooks/useAuth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})

  const { setAuth } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    if([email, password].includes('')) 
      return setAlert({ msg: 'Todos los campos con obligatorios', error: true})

    try {
      const url = '/users/login'

      const { data } = await clientAxios.post(url, { email, password })

      setAlert({})
      localStorage.setItem('token', data.token)
      setAuth(data)

      navigate('/projects')
    } catch (err) {
      setAlert({ msg: err.response.data.msg, error: true })
    }
  }

  const { msg } = alert

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Inicia Sesión y administra tus 
        <span className="text-slate-700"> proyectos</span>
      </h1>

      {msg && <Alert alert={alert}/>}

      <form 
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
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
            value={password}
            onChange={({ target }) => setPassword(target.value)}
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