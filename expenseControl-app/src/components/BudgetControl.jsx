import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'

const BudgetControl = ({ budget, setBudget,expenses, setExpenses, setIsBudgetValid }) => {
  const [percentage, setPercentage]  = useState(0)
  const [available, setAvailable] = useState(0)
  const [spent, setSpent] = useState(0)  

  useEffect(() => {
    const totalSpent = expenses.reduce((total, expense) => Number(expense.amount) + total, 0)
    const totalAvailable = budget - totalSpent
    const newPercentage = ((( budget - totalAvailable ) / budget ) * 100).toFixed(2)

    setSpent(totalSpent)
    setAvailable(totalAvailable)

    setTimeout(() => {
      setPercentage(newPercentage)
    }, 1000)
  }, [expenses])

  const formatAmount = amount => 
    amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })

  const handleReset = () => {
    const response = confirm('¿Estas seguro de reiniciar la app?')
  
    if (response) {
      setBudget(0)
      setExpenses([])
      setIsBudgetValid(false)
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
       <CircularProgressbar 
          value={percentage}
          styles={buildStyles({
            pathColor: percentage > 100 ? '#dc2626' : '#3b82f6',
            trailColor: '#f5f5f5',
            textColor: percentage > 100 ? '#dc2626' : '#3b82f6'
          })}
          text={`${percentage}% Gastado`}>

       </CircularProgressbar>

      <div className="contenido-presupuesto">
        <button onClick={handleReset} className="reset-app" type="button">
          Resetar App
        </button>
        <p>
          <span>Presupesto: </span>
          {formatAmount(budget)}
        </p>

        <p className={`${available < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span>
          {formatAmount(available)}
        </p>

        <p>
          <span>Gastado: </span>
          {formatAmount(spent)}
        </p>
      </div>
    </div>
  )
}

export default BudgetControl