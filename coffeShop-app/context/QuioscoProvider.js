import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { toast }  from 'react-toastify'
import { useRouter } from 'next/router'

const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({})
  const [product, setProduct] = useState({})
  const [modal, setModal] = useState(false)
  const [order, setOrder] = useState([])
  const [name, setName] = useState('')
  const [total, setTotal] = useState(0)

  const router = useRouter()

  const getCategories = async () => {
    const { data } = await axios('/api/categories')
    setCategories(data)
  }

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    setSelectedCategory(categories[0])
  }, [categories])

  const handleClickCategory = id => {
    const category = categories.filter(categor => categor.id === id)[0]
    setSelectedCategory(category)
    router.push('/')
  }

  const handleSetProduct = product => setProduct(product)

  const handleChangeModal = () => setModal(!modal)

  const handleAddOrder = ({ categoryId, ...product }) => {
    if (order.some(productState => productState.id === product.id)) {
      const orderUpdated = order.map(productState => productState.id === product.id ? product : productState)
      setOrder(orderUpdated)
      toast.success(`${product.name} Guardado Correctamente`)
    } else {
      setOrder([...order, product])
      toast.success(`${product.name} Agregado al Pedido`)
    }

    handleChangeModal()
  }

  const handleUpdateAmount = id => {
    const updateProduct = order.filter(product => product.id === id)

    setProduct(updateProduct[0])
    handleChangeModal()
  }

  const handleDeleteProduct = id => {
    const orderUpdated = order.filter(product => product.id !== id)
    setOrder(orderUpdated)
  }

  const handleSubmitOrder = async  e => {
    e.preventDefault()

    try {
      await axios.post('/api/orders', {
        name,
        order,
        total,
        date: Date.now().toString()
      })

      toast.success(`Pedido Realizado Correctamente`)

      setSelectedCategory([0])
      setOrder([])
      setName('')
      setTotal(0)

      setTimeout(() => router.push('/'), 3000)
    } catch (err) {
      toast.error(`Error al crear el Pedido`)
    } finally {}
  }

  useEffect(() => {
    const newTotal = order.reduce((total, product) => product.price * product.amount + total, 0) 
    setTotal(newTotal)
  }, [order])

  return (
    <QuioscoContext.Provider value={{
      categories,
      handleClickCategory,
      selectedCategory,
      handleSetProduct,
      handleChangeModal,
      product,
      modal,
      handleAddOrder,
      order,
      handleUpdateAmount,
      handleDeleteProduct,
      name,
      setName,
      handleSubmitOrder,
      total
    }}>
      {children}
    </QuioscoContext.Provider>
  )
}

export { QuioscoProvider }

export default QuioscoContext