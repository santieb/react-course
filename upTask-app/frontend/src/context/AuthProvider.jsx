import { useState, createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import clientAxios from '../config/clientAxios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const authUser = async () => {        
      const token = localStorage.getItem('token')

      if (!token) return setLoading(false)

      const config = { 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const url = 'users/profile'
        const { data } = await clientAxios(url, config)
        setAuth(data)

      } catch (e) {
        setAuth({})
      } finally {
        setLoading(false)
      }
    }
    authUser()
  }, [])


  return (
    <AuthContext.Provider 
      value={{ 
        setAuth,
        auth,
        loading,
        setLoading
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }

export default AuthContext