import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteProductAction, getProductUpdate } from '../actions/productActions'
import Swal from 'sweetalert2'

const Product = ({ product })  => {
  const { name, price, id } = product
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDeleteProduct = id => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: "Un producto que se elimina nno se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductAction(id))
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  const redirectEdit = () => {
    dispatch(getProductUpdate(product))
    navigate(`/products/edit/${id}`)
  }

  return (
    <tr>
      <td>{name}</td>
      <td><span className="font-weight-bold">${price}</span></td>
      <td className="acciones">
        <button onClick={() => redirectEdit()} className="btn btn-primary mr-2">
          Editar
        </button>
        <button onClick={() => handleDeleteProduct(id)}type="button" className="btn btn-danger">
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default Product