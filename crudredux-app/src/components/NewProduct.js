import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addNewProductAction } from '../actions/productActions'
import { showAlert, hideAlertAction } from '../actions/alertActions'

const NewProduct = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  const dispatch= useDispatch()

  const navigate = useNavigate()

  const loading = useSelector(state => state.products.loading)
  const error = useSelector(state => state.products.error)
  const alert = useSelector(state => state.alert.alert)

  const addProduct = product => dispatch(addNewProductAction(product))
  
  const handleSubmit = e => {
    e.preventDefault()

    if (name.trim === '' || price <= 0) {
      const alert = {
        msg: 'Ambos campos son obligatorios',
        class: 'alert alert-danger text-center text-uppercase p3'
      }

      return dispatch(showAlert(alert))
    }

    dispatch(hideAlertAction())
    addProduct({
      name,
      price
    })

    navigate('/')
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>

            {alert ? <p className={alert.class}>{alert.msg}</p> : null}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name='name'
                  value={name}
                  onChange={({ target }) => setName(target.value)}
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
                  onChange={({ target }) => setPrice(Number(target.value))}
                />
              </div>

              <button type="submit" className="btn btn-primary font-weught-bold text-uppercase d-block w-100">
                Agregar
              </button>
            </form>
            { loading ? <p>Cargando...</p> : null }
            { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProduct