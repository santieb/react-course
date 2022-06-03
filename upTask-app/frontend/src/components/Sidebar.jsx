import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Sidebar = () => {
  const { auth } = useAuth()

  return (
    <aside className='md:w-80 lg:w-96 p-5 py-10'>
      <p className='text-xl font-bold'>Hola: {auth.user.name}</p>
      <Link to="create-project" className="bg-sky-600 w-full p-3 text-white uppercase font-bold block text-center rounded-lg mt-5">
        Nuevo Proyecto
      </Link>
    </aside>
  )
}

export default Sidebar