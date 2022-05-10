import { useState, useEffect } from 'react'
import '../styles/normalize.css'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const cartLocalStorage = JSON.parse(localStorage.getItem('cart')) ?? []
    setCart(cartLocalStorage)
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    const productExists = cart.some(item => item.id === product.id)
    if (productExists) {
      const newCart = cart.map(item => {
        if (item.id === product.id) {
          item.amount = product.amount
        }
        return item
      })
      setCart(newCart)
    }

    else setCart([...cart, product])
  }

  const updateAmount = (product) => {
    const newCart = cart.map(item => {
      if (item.id === product.id) {
        item.amount = product.amount
      }
      return item
    })
    setCart(newCart)
  }

  const deleteProduct = (id) => {
    const newCart = cart.filter(item => item.id !== id)
    setCart(newCart)
  }

  return <Component
    {...pageProps} 
    cart={cart} 
    addToCart={addToCart}
    updateAmount={updateAmount}
    deleteProduct={deleteProduct}
   />
}

export default MyApp