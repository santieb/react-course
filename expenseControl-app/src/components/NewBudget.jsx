import { useState } from "react"
import Message from "./Message"

const NewBudget = ({ budget, setBudget, setIsBudgetValid }) => {
  const [message, setMessage] = useState('')

  const handleBudget = e => {
    e.preventDefault()

    if (!budget || budget < 0) return setMessage('No es un presupuesto valido')

    setMessage('')
    setIsBudgetValid(true)
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handleBudget} className="formulario">
        <div className="campo">
          <label>Definir Presupuesto</label>
          <input 
            className="nuevo-presupuesto" 
            type='number' 
            value={budget}
            onChange={({ target }) => setBudget(Number(target.value))}
          />
        </div>

        <input type="submit" value="Añadir"/>

        {message && <Message message={message} type="error" />}
      </form>
    </div>
  )
}

export default NewBudget