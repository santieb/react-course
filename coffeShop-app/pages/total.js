import { useEffect } from 'react'
import Layout from '../layout/Layout'
import useQuiosco from '../hooks/useQuiosco'
import { formatMoney } from '../helpers'

export default function Total() {
  const { handleSubmitOrder, order, name, setName, total } = useQuiosco()

  const comprobateOrder = () => order.length === 0 || !name || name.length < 3

  useEffect(() => {
    console.log(order)
    comprobateOrder()
  }, [order, comprobateOrder])

  return (
    <Layout page='Total y Confirma tu Pedido'>
      <h1 className='text-4xl font-black'>Total y Confirmar Pedido</h1>
      <p className='text-2xl my-10'>Confirma tu Pedido a Continuacion</p>
    
      <form onSubmit={handleSubmitOrder}>
        <div>
          <label htmlFor='name' className='block uppercase text-slate-800 font-bold text-xl'>Nombre</label>
          <input 
            id='name' 
            type='text' 
            className='bg-gray-200 w-full mt-3 lg:w-1/3 p-2 rounded-md'
            value={name}
            onChange={({ target }) => setName(target.value)}/>
        </div>

        <div className='mt-10'>
          <p className='text-2xl'>
            Total a Pagar: {''} 
            <span className='font-bold'>{formatMoney(total)}</span>
          </p>
        </div>

        <div className='mt-5'>
          <input type='submit' className={`${comprobateOrder() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800 pointer'} text-center w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white`} value='Confirmar Pedido'/>
        </div>
      </form>
    </Layout>
  )
}