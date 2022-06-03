import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import clientAxios from '../config/clientAxios'
import Alert from  '../components/Alert'

const NewPassword = () => {
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})
  const [tokenValidated, setTokenValidated] = useState(false)
  const [passwordModified, setPasswordModified] = useState(false)

  const params = useParams()
  const { token } = params

  useEffect(() => {
    const tokenVerify = async () => {
      try {
        const url = `/users/forgot-password/${token}`
        await clientAxios(url)

        setTokenValidated(true)
      } catch (err) {
        setAlert({ msg: err.response.data.msg, error: true })
      }
    }
    tokenVerify()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    if (password.length <6)
      return setAlert({ msg: 'La contraseña es muy corta, agrega minimo 6 caracteres', error: true})

    try {
      const url = `/users/forgot-password/${token}`
      const { data } = await clientAxios.post(url, { password })

      setAlert({ msg: data.msg, error: false })
      setPasswordModified(true)
    } catch (err) {
      setAlert({ msg: err.response.data.msg, error: true })
    }
  }

  const { msg } = alert

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu contraseña y no pierdas acceso a  tus
        <span className="text-slate-700"> proyectos</span>
      </h1>

      {msg && <Alert alert={alert}/>}

      {tokenValidated && (
        <form 
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label htmlFor="newPassword" className="uppercase text-gray-600 block text-xl font-bold">
              Nueva contraseña
            </label>
            <input 
              type='password'
              placeholder='Escribe tu nueva contraseña'
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
              id="newPassword"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              ></input>
          </div>
          <input type="submit" value="Guardar nueva contraseña" className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded mb-5 hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
        </form>
      )}

      {passwordModified && (
        <Link to="/" className="block text-center my-5 text-slate-500 uppercase text-sm">
          Iniciar sesion
        </Link>
      )}
    </>
  )
}

export default NewPassword