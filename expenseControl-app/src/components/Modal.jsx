import { useState, useEffect } from 'react'
import Message from './Message'
import closeBtn from '../img/cerrar.svg'

const Modal = ({ setModal, animateModal, setAnimateModal, saveExpense, updateBudget, setUpdateBudget }) => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const [date, setDate] = useState('')  
  const [id, setId] = useState('')

  useEffect(() => {
    if (!updateBudget) return

      setName(updateBudget.name)
      setAmount(updateBudget.amount)
      setCategory(updateBudget.category)
      setId(updateBudget.id)
      setDate(updateBudget.date)
  }, [])

  const hideModal = () => {
    setAnimateModal(false)
    setUpdateBudget({})

    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!name || amount < 1 || !category)  {
      setMessage('Todos los campos son obligatorios')

      setTimeout(() => {
        setMessage('')
      }, 3000)
      return
    }

    saveExpense({ name, amount, category, id, date })
  }

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={closeBtn} alt="Close" onClick={hideModal}/>
      </div>

      <form onSubmit={handleSubmit} className={`formulario ${animateModal ? 'animar' : 'cerrar'}`}>
        <legend>{updateBudget.name ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>\

        {message && <Message message={message} type="error"/>}

        <div className='campo'>
          <label htmlFor='name'>Nombre Gasto</label>
          <input 
            type='text' 
            id='name' 
            placeholder='Añade el Nombre del Gasto'
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor='amount'>Cantidad</label>
          <input 
            type='number' 
            id='amount' 
            placeholder='Añade la cantidad del gasto'
            value={amount}
            onChange={({ target }) => setAmount(target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor='amount'>Categoria</label>
          <select id='category'
            value={category}
            onChange={({ target }) => setCategory(target.value)}
          >
            <option value=''>--Seleccione--</option>
            <option value='Ahorro'>Ahorro</option>
            <option value='Comida'>Comida</option>
            <option value='Casa'>Casa</option>
            <option value='Gastos Varios'>Gastos Varios</option>
            <option value='Ocio'>Ocio</option>            
            <option value='Salud'>Salud</option>
            <option value='Suscripciones'>Suscripciones</option>
          </select>
        </div>

        <input type="submit" value={updateBudget.name ? 'Guardar Cambios' : 'Añadir Gasto'}/>
      </form>
    </div>
  )
}

export default Modal