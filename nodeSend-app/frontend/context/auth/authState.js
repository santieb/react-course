import { useReducer } from 'react'
import authContext from "./authContext"
import authReducer from "./authReducer"
import { 
  REGISTER_SUCESS,
  REGISTER_ERROR,
  RESET_ALERT,
  LOGIN_ERROR,
  LOGIN_SUCESS,
  USER_AUTH,
  LOGOUT
} from '../../types'

import axiosClient from '../../config/axios'
import tokenAuth  from '../../config/tokenAuth'

const AuthState = ({ children }) => {
  const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
    authenticated: null,
    user: null,
    message: null
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  const userAuth = async () => {
    const token = localStorage.getItem('token')
    if (token) tokenAuth(token)

    try {
      const res = await axiosClient.get('api/auth')

      dispatch({
        type: USER_AUTH,
        payload: res.data.user
      })
    } catch (err) {
      dispatch({
        type: LOGIN_ERROR,
        payload: err.response.data.msg
      })
    }
  }

  const userRegister = async data => {
    try {
      const res = await axiosClient.post('api/users/register', data)
      
      dispatch({
        type: REGISTER_SUCESS,
        payload: res.data.msg
      })
    } catch (err) {
      dispatch({
        type: REGISTER_ERROR,
        payload: err.response.data.msg
      })
    } finally {
      setTimeout(() => {
        dispatch({
          type: RESET_ALERT,
        })
      }, 3000)
    }
  }

  const userLogin = async data => {
    try {
      const res = await axiosClient.post('api/auth/login', data)

      dispatch({
        type: LOGIN_SUCESS,
        payload: res.data.token
      })
    } catch (err) {
      dispatch({
        type: LOGIN_ERROR,
        payload: err.response.data.msg
      })
    } finally {
      setTimeout(() => {
        dispatch({
          type: RESET_ALERT,
        })
      }, 3000)
    }
  }

  const logout = () => {
    dispatch({
      type: LOGOUT
    })
  }

  return (
    <authContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        userAuth,
        userRegister,
        userLogin,
        logout
      }}
      >
      {children}
    </authContext.Provider>
  )
}

export default AuthState