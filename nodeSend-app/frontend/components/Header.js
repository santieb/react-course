import { useContext, useEffect } from 'react'
import Link from 'next/link'
import authContext from '../context/auth/authContext'

const Header = () => {
  const AuthContext = useContext(authContext)
  const { userAuth, user, logout } = AuthContext

  useEffect(() => {
    userAuth()
  }, [])

  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
      <Link href='/'>
        <img className='w-64 md:mb-0 cursor-pointer' src='logo.svg'/>
      </Link>
      
      <div>
        { user ? 
        <div className='flex items-center'>
          <p className='mr-2'> Hola {user.name}</p> 
          <button onClick={() => logout()} type='button' className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Cerrrar sesion</button> 
        </div>: 
        <>
          <Link href='/login'>
            <a className='bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2'>Iniciar Sesión</a>
          </Link>
          <Link href='register'>
            <a className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'>Crear cuenta</a>
          </Link>
        </>}
      </div>
    </header>
  )
}

export default Header