import { 
  REGISTER_SUCESS,
  REGISTER_ERROR,
  RESET_ALERT,
  LOGIN_ERROR,
  LOGIN_SUCESS,
  USER_AUTH,
  LOGOUT
} from "../../types"

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCESS:
    case REGISTER_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        message: action.payload,
      }
    case LOGIN_SUCESS:
      localStorage.setItem('token', action.payload)
      return {
        ...state,
        token: action.payload,
        authenticated: true
      }
    case USER_AUTH:
      return {
        ...state,
        user: action.payload,
        authenticated: true
      }
    case RESET_ALERT:
      return {
        ...state,
        message: null,
      }
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        user: null,
        token: null,
        authenticated: null
      }
    default: 
      return state
  }
}