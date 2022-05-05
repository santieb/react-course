import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {

  const location = useLocation()
  const url = location.pathname
  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-blue-900 px-5 py-10">
        <h2 className="text-white text-4xl font-black text center">CRM - Clientes</h2>
        <nav className="mt-10">
          <Link className={`${url === '/clients' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`} to="/clients">Clientes</Link>
          <Link className={`${url === '/clients/news' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`} to="/clients/news">Nuevo cliente</Link>   
        </nav>
      </div>
      <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">
      <Outlet/>
      </div>

    </div>
  )
}

export default Layout