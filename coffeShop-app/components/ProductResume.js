import Image from "next/image"
import { formatMoney } from '../helpers'
import useQuiosco from '../hooks/useQuiosco'

const ProductResume = ({ product }) => {
  const { name, image, price, amount, id } = product

  const { handleUpdateAmount, handleDeleteProduct } = useQuiosco()
  
  return (
    <div className="shadow p-5 flex gap-10 items-center">
      <div className="md:w-1/6">
        <Image src={`/assets/img/${image}.jpg`} alt={`${name} image`} width={300} height={400} />
      </div>

      <div className="md:w-4/6">
        <p className='text-3xl font-bold'>{name}</p>
        <p className='text-xl font-bold mt-2'>Cantidad:{amount}</p>
        <p className='text-xl font-bold mt-2 text-amber-500'>Precio: {formatMoney(price)}</p>
        <p className='text-sm text-gray-700 mt-2'>Subtotal: {formatMoney(price * amount)}</p>
      </div>

      <div>
        <button onClick={() => handleUpdateAmount(id)} type='button' className='bg-sky-700 flex gap-2 px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full lg:w-full'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>  
          Editar
        </button>
        <button onClick={() => handleDeleteProduct(id)} type='button' className='bg-red-700 gap-2 flex mt-5 px-3 py-2 text-white rounded-md font-bold uppercase shadow-md w-full lg:w-full'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default ProductResume