import Head from 'next/head'
import Image from 'next/image'
import { PrismaClient } from '@prisma/client'
import Layout from '../layout/Layout'
import useQuiosco from '../hooks/useQuiosco'
import Product from '../components/Product'

export default function Home() {
  const { selectedCategory } = useQuiosco()
  return (
    <Layout page={`${selectedCategory?.name}`}>
      <h1 className="text-4xl font-black">{selectedCategory?.name}</h1>
      <p className='text-2xl mt-10'>
        Elige y personaliza tu pedido a continuacion
      </p>
    <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
      {selectedCategory?.products?.map(product => <Product key={product.id} product={product}/>)}
      </div>
    </Layout>
  )
}