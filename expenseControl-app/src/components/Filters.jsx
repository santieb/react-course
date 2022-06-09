import { useState, useEffect } from 'react'

const Filters = ({ filter, setFilter }) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <select onChange={({target}) => setFilter(target.value)} value={filter}>
            <option value=''>-- Todas las Categorias --</option>
            <option value='Ahorro'>Ahorro</option>
            <option value='Comida'>Comida</option>
            <option value='Casa'>Casa</option>
            <option value='Gastos Varios'>Gastos Varios</option>
            <option value='Ocio'>Ocio</option>            
            <option value='Salud'>Salud</option>
            <option value='Suscripciones'>Suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  )
}

export default Filters