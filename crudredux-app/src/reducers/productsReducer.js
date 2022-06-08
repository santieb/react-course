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
  UPDATE_PRODUCT_SUCESS,
  UPDATE_PRODUCT_ERROR
} from '../types/index'

const initialState = {
  products: [],
  loading: false,
  error: null,
  deleteProduct: null,
  editProduct: null
}

const productsReducer =  (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
    case ADD_PRODUCT: 
      return {
        ...state,
        loading: true
      }

    case ADD_PRODUCT_SUCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload]
      }

    case GET_PRODUCTS_ERROR:
    case ADD_PRODUCT_ERROR:
    case DELETE_PRODUCT_ERROR:
    case UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case GET_PRODUCTS_SUCESS:
      return {
        ...state,
        loading: false,
        error: false,
        products: [action.payload]
      }

    case DELETE_PRODUCT: 
      return {
        ...state,
        deleteProduct: [action.payload]
      }

      case DELETE_PRODUCT_SUCESS: 
      return {
        ...state,
        products: state.products.filter(product => product.id !== state.deleteProduct),
        deleteProduct: null
      }

      case GET_UPDATE_PRODUCT:
        return {
          ...state,
          editProduct: action.payload
        }
      
      case UPDATE_PRODUCT_SUCESS:
        return {
          ...state,
          editProduct: null,
          products: state.products.map(product => product.id === action.payload.id ? product = action.payload : product)
        }

    default: 
      return state
  }
}

export default productsReducer
