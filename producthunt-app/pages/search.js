import { useState, useEffect } from 'react'
import firebase from '../firebase'
import Layout from '../components/Layout/Layout'
import { useRouter } from 'next/router'
import ProductDetails from '../components/Layout/ProductDetails'
import { collection, getDocs } from "firebase/firestore"

const Search = () => {
  const router = useRouter()
  const { query: { q }} = router
  const [products, setProducts] = useState([])
  const [res, setRes] = useState([])

  useEffect(() => {
    const getProducts = async() => {
      const data = []
      const querySnapshot = await getDocs(collection(firebase.db, "products"))
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id })
        
        setProducts(data)
      })
    }
    getProducts()
  }, [])

  useEffect(() => {
    console.log(q)
    const search = q.toLowerCase()
    const filter = products.filter(product => {
      return (
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      )
   })

   setRes(filter)
  }, [q, products]) 

  return (
    <Layout>
      <div className="listado-productos">
        <div className="contenedor">
          <ul className="bg-white">
            {res.map(product => <ProductDetails key={product.id} product={product} />)}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default Search