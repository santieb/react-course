import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProductsAction } from '../actions/productActions'
import Product from './Product'

const Products = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getProducts = () => dispatch(getProductsAction())
    getProducts()
    // eslint-disable-next-line
  }, [])

  const products = useSelector(state => state.products.products)
  const error = useSelector(state => state.products.error)
  const loading = useSelector(state => state.products.loading)

  return (
    <>
      <h2 className="text-center my-5">Listado de Productos</h2>

      { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">
        Hubo un error</p> : null }

      { loading ? <p className="text-center">Cargando</p> : null }

      <table className="table table-striped table-bordered table-hover">
        <thead className="bg-primary thead-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          { products.length === 0 ? 		
            <tr><td colSpan='3'>No hay productos</td></tr> : (
            products[0].map(product => (
              <Product
                key={product.id}
                product={product}/>
              ))
            )
          }
        </tbody>
      </table>
    </>
  )
}

export default Products