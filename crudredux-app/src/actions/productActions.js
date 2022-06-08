import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCESS,
  ADD_PRODUCT_ERROR,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCESS,
  GET_PRODUCTS_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCESS,
  DELETE_PRODUCT_ERROR,
  GET_UPDATE_PRODUCT,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCESS,
  UPDATE_PRODUCT_ERROR
} from '../types/index'

import clientAxios from '../config/axios'
import Swal from 'sweetalert2'

export const addNewProductAction = product => {
  return async (dispatch) => {
    dispatch(addProduct())

    try {
      await clientAxios.post('/products', product)
      dispatch(addProductSuccess(product))

      Swal.fire(
        'Producto Creado',
        'El producto se ha creado correctamente',
        'success'
      )
    } catch (err) {
      dispatch(addProductError(true))

      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Hubo un error, intentalo de nuevo'
      })
    }
  }
}

const addProduct = () => ({
  type: ADD_PRODUCT,
})

const addProductSuccess = product => ({
  type: ADD_PRODUCT_SUCESS,
  payload: product
})

const addProductError = status => ({
  type: ADD_PRODUCT_ERROR,
  payload: status
})

export const getProductsAction = () => {
  return async (dispatch) => {
    dispatch(getProducts())

    try {
      const { data } = await clientAxios.get('/products')
      dispatch(getProductsSucess(data))
    } catch (err) {
      dispatch(getProductsError())
    }
  }
}

const getProducts = () => ({
  type: GET_PRODUCTS,
})

const getProductsSucess = products => ({
  type: GET_PRODUCTS_SUCESS,
  payload: products
})

const getProductsError = () => ({
  type: GET_PRODUCTS_ERROR,
  payload: true
})

export const deleteProductAction = id => {
  return async (dispatch) => {
    dispatch(deleteProduct(id))

    try {
      await clientAxios.delete(`/products/${id}`)
      dispatch(deleteProductSucess())

      Swal.fire(
        'Producto Eliminado',
        'El producto se ha eliminado correctamente',
        'success'
      )
    } catch (err) {
      dispatch(deleteProductError())
    }
  }
}

const deleteProduct = id => ({
  type: DELETE_PRODUCT,
  payload: id
})

const deleteProductSucess = () => ({
  type: DELETE_PRODUCT_SUCESS,
})

const deleteProductError = () => ({
  type: DELETE_PRODUCT_ERROR,
  payload: true
})

export const getProductUpdate = product => {
  return (dispatch) => {
    dispatch(getProductAction(product))
  }
}

export const updateProductAction = product => {
  return async (dispatch) => {
    dispatch(updateProduct())
    try {
      await clientAxios.put(`/products/${product.id}`, product)
      dispatch(updateProductSucess(product))
    } catch (err) {
      dispatch(updateProductError())  
    }
  }
}

const getProductAction = product => ({
  type: GET_UPDATE_PRODUCT,
  payload: product
})

const updateProduct = () => ({
  type: UPDATE_PRODUCT,
})

const updateProductSucess = product => ({
  type: UPDATE_PRODUCT_SUCESS,
  payload: product
})

const updateProductError = () => ({
  type: UPDATE_PRODUCT_ERROR,
  payload: true
})