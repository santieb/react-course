import { useState, useEffect } from 'react'
import Layout from "../components/Layout"
import Image from "next/Image"
import styles from "../styles/Cart.module.css"

const Cart = ({ cart, updateAmount, deleteProduct }) => {
  const [total, setTotal] =useState()

  useEffect(() => {
    const calculateTotal = cart.reduce((total, product) => total + product.price * product.amount, 0)
    setTotal(calculateTotal)
  }, [cart])

  return (
    <Layout page={'Carrito de Compras'}>
      <h1 className="heading">Carrito</h1>
      <main className={`${styles.content} contenedor`}>
        <div className={styles.cart}>
          <h2>Artículos</h2>
          {cart.length === 0 ? 'Carrito Vacio' : (
            cart.map(product => (
            <div key={product.id} className={styles.product}>
              <div>
                <Image layout="responsive" width={250} height={500} src={product.image} alt={`Image guitar ${product.name}`} />
              </div>
              <div>
                <p className={styles.name}>{product.name}</p>
                <div className={styles.amount}>
                  <p>Cantidad: </p>
                  <select 
                    className={styles.select} 
                    value={product.amount} 
                    onChange={({ target }) => updateAmount({ amount: target.value, id: product.id })}
                  >
                    <option value="">Seleccione</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>

                <p className={styles.price}>$ <span>{product.price}</span></p>
                <p className={styles.subtotal}>Subtotal: $<span>{product.price * product.amount}</span></p>
              </div>
              <button onClick={() => deleteProduct(product.id)} type="button" className={styles.delete}>X</button>
            </div>
            ))
          )}
        </div>
        <div className={styles.resume}>
          {total > 0 ? ( 
            <>
              <h3>Resumen del pedido</h3>
              <p>Total a pagar: ${total}</p>
            </> ) : <p>No hay productos en el carrito</p>
          }
        </div>
      </main>
    </Layout>
  )
}

export default Cart