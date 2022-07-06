import { useEffect, useState } from 'react'
import Layout from "../components/Layout/Layout"
import firebase from '../firebase'
import { collection, getDocs } from "firebase/firestore";
import ProductDetails from '../components/Layout/ProductDetails'

export default function popular() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const data = []
      const querySnapshot = await getDocs(collection(firebase.db, "products"));
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id })

        setProducts(data)
      })
    }
    getProducts()
  }, [])

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {products.map(product => <ProductDetails key={product.id} product={product} />)}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}
