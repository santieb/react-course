import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProductAction } from '../actions/productActions'
import { useNavigate } from 'react-router-dom'

const EditProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [product, setProduct] = useState({ 
    name: '',
    price: ''
  })

  const editProduct = useSelector(state => state.products.editProduct)

  useEffect(() => { 
    setProduct(editProduct)
  }, [editProduct])

  const { name, price } = product

  const onChangeForm = e => {
    e.preventDefault()
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(updateProductAction(product))

    navigate('/')
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name='name'
                  value={name}
                  onChange={onChangeForm}
                />
              </div>

              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name='price'
                  value={price}
                  onChange={onChangeForm}
                />
              </div>

              <button type="submit" className="btn btn-primary font-weught-bold text-uppercase d-block w-100">
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProduct