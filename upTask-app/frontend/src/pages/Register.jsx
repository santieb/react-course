import { useState } from 'react'
import { Link } from "react-router-dom"
import Alert from '../components/Alert'
import axios from 'axios'

const Register = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [alert, setAlert] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    if ([name, email, password, repeatPassword].includes('')) 
      return setAlert({ msg: 'Todos los campos son obligatorios', error: true})

    if(password !== repeatPassword)
      return setAlert({ msg: 'Las contraseñas no coinciden', error: true})

    if(password.length < 6)
      return setAlert({ msg: 'La contraseña es muy corta, agrega minimo 6 caracteres', error: true})

    setAlert('')

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/users/register`
      const { data } = await axios.post(url,{ name, password, email })
      setAlert({ msg: data.msg, error: false })

      setName('')
      setEmail('')
      setPassword('')
      setRepeatPassword('')
    } catch(err) {
      setAlert({ msg: err.response.data.msg, error: true })
    }
  }

  const { msg } = alert

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta y administra tus
        <span className="text-slate-700"> proyectos</span>
      </h1>

      {msg && <Alert alert={alert}/>}

      <form 
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
      <div className="my-5">
          <label htmlFor="name" className="uppercase text-gray-600 block text-xl font-bold">
            Nombre
          </label>
          <input 
            type='text'
            placeholder='Tu Nombre'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            id="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
            ></input>
        </div>

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

        <div className="my-5">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">
            Repetir contraseña
          </label>
          <input 
            type='password'
            placeholder='Repite tu password'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            id="password2"
            value={repeatPassword}
            onChange={({ target }) => setRepeatPassword(target.value)}
            ></input>
        </div>

        <input type="submit" value="Crear cuenta" className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded mb-5 hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to="/" className="block text-center my-5 text-slate-500 uppercase text-sm">
        ¿Ya tienes una cuenta? Iniciar sesion</Link>

        <Link to="/forgot-password" className="block text-center my-5 text-slate-500 uppercase text-sm">
        Olvide mi contraseña</Link>
      </nav>
    </>
  )
}

export default Register