import { useState, useContext } from 'react'
import appContext from '../context/app/appContext'

const Form = () => {
  const [hasPassword, setHasPassword] = useState(false)
  
  const AppContext = useContext(appContext)
  const { addPassword, addDownloads } = AppContext

  return (
    <div className="w-full mt-20">
      <div>
        <label className="text-lg text-gray-800">Eliminar tras</label>
        <select onChange={({ target }) => addDownloads(parseInt(target.value))} className="appearance-none w-full mt-2 bg-white border0gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline focus:border-gray-500">
          <option value="" selected disabled>-- Seleccione --</option>
          <option value="1">1 Descarga</option>
          <option value="5">5 Descargas</option>
          <option value="10">10 Descargas</option>
          <option value="20">20 Descargas</option>
        </select>
      </div>
      <div className='mt-4'>
        <div className='flex justify-between items-center'>
          <label className="text-lg text-gray-800 mr-2">Proteger con Contraseña</label>
          <input onChange={() => setHasPassword(!hasPassword)} type="checkbox"/>
        </div>
        {hasPassword ? 
          <input
            onChange={({ target }) => addPassword(target.value)}
            type="password" 
            className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8"
        /> : ''
        }
      </div>
    </div>
  )
}

export default Form