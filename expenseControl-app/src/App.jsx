import { useState, useEffect } from 'react'
import Header from './components/Header'
import ExpenseList from './components/ExpenseList'
import Modal from './components/Modal'
import Filters from './components/Filters'
import newExpenseIcon from './img/nuevo-gasto.svg'
import { generateID } from './helpers'

function App() {
  const [budget, setBudget] = useState(
    localStorage.getItem('presupuesto') ?? 0
  )

  const [isBudgetValid, setIsBudgetValid] = useState(false)

  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)

  const [expenses, setExpenses] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [updateBudget, setUpdateBudget] = useState({})

  const [filter, setFilter] = useState('')
  const [filterExpenses, setFilterExpenses] = useState([])

  useEffect(() => {
    if (Object.keys(updateBudget).length > 0) {
      setModal(true)
  
      setTimeout(() => {
        setAnimateModal(true)
      }, 500)
    }
  }, [updateBudget])

  useEffect(() => {
    localStorage.setItem('presupuesto', budget ?? 0)
  }, [budget])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(expenses) ?? [])
  }, [expenses])

  useEffect(() => {
    const budgetLocalStorage = Number(localStorage.getItem('presupuesto')) ?? 0
    if (budgetLocalStorage > 0) setIsBudgetValid(true)
  }, [])

  useEffect(() => {
    if (filter) {
      const expensesFiltered = expenses.filter(expense => expense.category === filter)
      setFilterExpenses(expensesFiltered)
    }
  }, [filter])

  const handleNewExpense = () => {
    setModal(true)
    setUpdateBudget({})

    setTimeout(() => {
      setAnimateModal(true)
    }, 500)
  }

  const saveExpense = expense => {
    if (expense.id) {
      const expensesUpdated = expenses.map(expenseState => expense.id === expenseState.id ? expense : expenseState)
      setExpenses(expensesUpdated)
    } else {
      expense.id = generateID()
      expense.date = Date.now()
      setExpenses([...expenses, expense])
    }

    setAnimateModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  const deleteExpense = id => {
    const expensesUpdated = expenses.filter(expenseState => expenseState.id !== id)
    setExpenses(expensesUpdated)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        budget={budget}
        setBudget={setBudget}
        isBudgetValid={isBudgetValid}
        setIsBudgetValid={setIsBudgetValid}
        expenses={expenses}
        setExpenses={setExpenses}
      />

      {isBudgetValid &&
        <>
          <main>
            <Filters filter={filter} setFilter={setFilter}/>
            <ExpenseList expenses={expenses} setUpdateBudget={setUpdateBudget} deleteExpense={deleteExpense} filter={filter} filterExpenses={filterExpenses}/>
          </main>
          <div className="nuevo-gasto">
            <img 
              src={newExpenseIcon} 
              alt='nuevo gasto icono'
              onClick={handleNewExpense}  
            />
          </div> 
        </>
      }

      {modal && <Modal
        setModal={setModal}
        animateModal={animateModal}
        setAnimateModal={setAnimateModal}
        saveExpense={saveExpense}
        updateBudget={updateBudget}
        setUpdateBudget={setUpdateBudget}
      />}
    </div>
  )
}

export default App
