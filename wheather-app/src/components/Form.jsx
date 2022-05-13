import { useState } from 'react'
import useWheather from '../hooks/useWheather'

const Form = () => {
  const [alert, setAlert] = useState('')
  const { search, searchData, getData } = useWheather()
  const { country, city } = searchData

  const handleSubmit = (e) => {
    e.preventDefault()

    if (Object.values(search).includes('')) return setAlert('Todos los campos son obligatorios')

    getData(search)
    setAlert('')
  }

  return (
    <div className="contenedor">
      {alert && <p>{alert}</p>}
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="city">Ciudad</label>
          <input 
            id="city" 
            name="city"
            onChange={searchData}
            value={city}/>
        </div>

        <div className="campo">
          <label htmlFor="country">País</label>
          <select 
            id="country" 
            name="country"
            onChange={searchData}
            value={country}>
            <option value="">Seleccione un país</option>
            <option value="US">Estados Unidos</option>
            <option value="AR">Argentina</option>
            <option value="MX">Mexico</option>
            <option value="CO">Colombia</option>
            <option value="ES">España</option>
          </select>
        </div>

        <button type="submit">Consultar Clima</button>
      </form>
    </div>
  )
}

export default Form