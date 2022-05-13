import { Fragment } from 'react'
import Error  from './Error'
import useQuoter from '../hooks/useQuoter'
import { MARCAS, YEARS, PLANS } from '../constants/index'

const Form = () => {
  const { data, handleChangeData, error, setError, quoteInsurance } = useQuoter()
  const {marca, year} = data
  
  const handleSubmit = e => {
    e.preventDefault()
    if (Object.values(data).includes('')) return setError('Todos los campos son obligatorios')
    setError('')
    quoteInsurance()
  }

  return (
    <>
      {error && <Error/>}    
      <form onSubmit={handleSubmit}>
        <div className="my-5">
          <label className="block mb-3 font-bold text-gray-400 uppercase">
            Marca
          </label>
          <select
            name="marca"
            className="w-full p-3 bg-white border border-gray-200"
            onChange={({ target }) => handleChangeData(target)}
            value={marca}>
            <option value="">Selecciona una Marca</option>
            {MARCAS.map(marca => (
              <option key={marca.id} value={marca.id}>{marca.name}</option>
            ))}
          </select>
        </div>

        <div className="my-5">
          <label className="block mb-3 font-bold text-gray-400 uppercase">
            Año
          </label>
          <select
            name="year"
            className="w-full p-3 bg-white border border-gray-200"
            onChange={({ target }) => handleChangeData(target)}
            value={year}>
            <option value="">Selecciona un Año</option>
            {YEARS.map(year => (
              <option key={year}value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="my-5">
          <label className="block mb-3 font-bold text-gray-400 uppercase">
            Elige un Plan
          </label>
          <div className="flex gap-3 items-center">
            {PLANS.map(plan => 
              <Fragment key={plan.id}>
                  <label>{plan.name}</label>
                <input 
                  type="radio" 
                  name="plan" 
                  value={plan.id}
                  onChange={({ target }) => handleChangeData(target)}>
                </input>
              </Fragment>
            )}
          </div>
        </div>
        
        <input value="Cotizar" type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white cursor-pointer p-3 uppercase font-bold"></input>
      </form>
    </>
  )
}

export default Form