import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Sidebar = () => {
  const { auth } = useAuth()

  return (
    <aside className='md:w-1/3 lg:w-1/5 xl:w-1/6 p-5 py-10'>
      <p className='text-xl font-bold'>Hola: {auth.user.name}</p>
      <Link to="create-project" className="bg-sky-600 w-full p-3 text-white uppercase font-bold block text-center rounded-lg mt-5">
        Nuevo Proyecto
      </Link>
    </aside>
  )
}

export default Sidebar