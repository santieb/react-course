import Expense from './Expense'

const ExpenseList = ({ expenses, setUpdateBudget, deleteExpense, filter, filterExpenses }) => {
  return (
    <div className="listado-gastos contenedor">
        {filter ? (
          <>
            <h2>{filterExpenses.length ? 'Gastos' : 'No Hay Gastos aún'}</h2>
            {filterExpenses.map(expense => 
              <Expense key={expense.id}
                expense={expense} 
                setUpdateBudget={setUpdateBudget} 
                deleteExpense={deleteExpense} 
            />)}
          </>  
        ) : (
          <>
            <h2>{expenses.length ? 'Gastos' : 'No Hay Gastos aún'}</h2>
            {expenses.map(expense => 
              <Expense key={expense.id}
                expense={expense} 
                setUpdateBudget={setUpdateBudget} 
                deleteExpense={deleteExpense} 
            />)}
          </> 
        )}
    </div>
  )
}

export default ExpenseList