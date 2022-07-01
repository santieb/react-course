import { useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import authContext from '../context/auth/authContext'
import Link from 'next/link'
import DropZone from '../components/DropZone'
import appContext from '../context/app/appContext'
import Alert from '../components/Alert'

export default function Home() {
  const AuthContext = useContext(authContext)
  const { userAuth } = AuthContext

  const AppContext = useContext(appContext)
  const { url, messageArchive } = AppContext

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) userAuth()
  }, [])

  return (
    <Layout>
      {url ? 
        <>
          <p className="text-center mt-10">
            <span className="font-bold text-red-700 text-3xl uppercase">Tu URL es: </span> 
            {`${process.env.frontendUrl}/links/${url}`}
          </p>
          <button
            onClick={() => navigator.clipboard.writeText(`${process.env.frontendUrl}/links/${url}`) }
            type="submit" 
            className="bg-red-500 hover:bg-gray-900 w-full p-2 cursor-pointer mt-10 text-white uppercase font-bold">
            Copiar Enlace
          </button>
        </>
        : 
        <div className="md:4/5 xl:w-3/5 mx-auto mb-32">
          {messageArchive && <Alert/>}
          <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
            <DropZone/>
            <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
              <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Compartir archivos de forma sencilla y privada</h2>
              <p className="text-lg leading-loose">
                <span className="text-red-500 font-bold">ReactNodeSend </span>
                Te permite compartir archivos con cifrado de extremo a extremo y un arhivo que es eliminado despues de ser descargado. Asi que puedes mantener lo que compartes en privado y asegurarte de que tus cosas no permanezcan en linea para siempre.
              </p>
              <Link href="/register">
                <a className="text-red-500 font-bold text-lg hover:text-red-700">Crea una cuenta para mayores beneficios</a>
              </Link>
            </div>
          </div>
        </div>
      }
    </Layout>
  )
}
