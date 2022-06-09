import React from 'react'
import NewBudget from './NewBudget'
import BudgetControl from './BudgetControl'

const Header = ({ budget, setBudget, isBudgetValid, setIsBudgetValid, expenses, setExpenses }) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>

      { isBudgetValid ? 
        <BudgetControl 
          expenses={expenses} 
          budget={budget} 
          setBudget={setBudget} 
          setExpenses={setExpenses} 
          setIsBudgetValid={setIsBudgetValid}
        /> :
        <NewBudget
          budget={budget}
          setBudget={setBudget}
          setIsBudgetValid={setIsBudgetValid}
        />
      }
    </header>
  )
}

export default Header