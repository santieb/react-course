import { useState, useEffect } from 'react'
import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'
import { formatMoney } from '../helpers'

const ProductModal = () => {
  const { product, handleChangeModal, handleAddOrder, order } = useQuiosco()
  const [amount, setAmount] = useState(1)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    if (order.some(orderState => orderState.id === product.id)) {
      const updateProduct = order.find(orderState => orderState.id === product.id) 
      setUpdate(true)
      setAmount(updateProduct.amount)
    }
  }, [product, order])

  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3">
        <Image width={300} height={400} src={`/assets/img/${product.image}.jpg`} alt={`${product.name} image`} />
      </div>
      <div className="md:w-2/3">
        <div className="flex justify-end">
          <button onClick={handleChangeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <h1 className="text-3xl font-bold mt-5">{product.name}</h1>
        <p className="mt-5 font-0black text-5xl text-amber-500">{formatMoney(product.price)}</p>
        
        <div className='flex gap-4 mt-5'>
          <button type="button" onClick={() => {
              if(amount <= 1) return
              setAmount(amount-1)}
            }>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
            <p className='text-xl'>
              {amount}
            </p>
          <button onClick={() => {
            if(amount >= 5) return
            setAmount(amount+1)}
          }>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <button onClick={() => handleAddOrder({ ...product, amount })} type="button" className="rounded bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase">
          {update ? 'Guardar cambios' : 'Añadir al pedido'}
        </button>
      </div>
    </div>
  )
}

export default ProductModal