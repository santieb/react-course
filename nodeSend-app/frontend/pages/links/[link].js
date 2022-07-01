import Layout from "../../components/Layout"
import axiosClient from "../../config/axios"
import { useState, useContext } from 'react'
import appContext from '../../context/app/appContext'
import Alert from "../../components/Alert"

export async function getServerSideProps({ params }) {
  const { link } = params
  const res = await axiosClient.get(`/api/links/${link}`)

  return {
    props: { 
      link: res.data
    }
  }
}

export async function getServerSidePaths() {
  const links = await axiosClient.get('/api/links')

  return {
      paths: links.data.links.map((link)=> ({
          params: { link: link.url }
      })),
      fallback: false
  }
}

const Link = ({ link }) => {
  const AppContext = useContext(appContext)
  const { showAlert, messageArchive } = AppContext
  
  const [hasPassword, setHasPassword] = useState(link.password)
  const [password, setPassword] = useState('')

  const verifyPassword = async e => {
    e.preventDefault()
  
    const data = { password }

    try {
      const res = await axiosClient.post(`/api/links/${link.archive}`, data)
      setHasPassword(res.data.password)
    } catch (err) {
      showAlert(err.response.data.msg)
    }
  }

  return (
    <Layout>
      {hasPassword ? 
        <>
          <p className="text-center">Este enlace esta protegido por una contraseña, colocalo a continuación</p>
          
          {messageArchive && <Alert/>}
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <form onSubmit={e => verifyPassword(e)} className="bg-white rounded shadow-lg px-8 pt-6 pb-5">
                <div className="mb-4">
                  <label className="block text-black text-sm font-bold mb-5" htmlFor="pasword">Password</label>
                  <input 
                    type="password" 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id='password'
                    placeholder="Password del Enlace"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </div> 
                <input value='Validar contraseña' type="submit" className="bg-red-500 hover:bg-gray-900 w-full p-2 cursor-pointer text-white uppercase font-bold"/>
              </form>
            </div>
          </div>
        </>
        : 
        <>
          <h1 className='text-4xl text-center text-gray-700'>Descarga tu archivo:</h1>
          <div className='flex items-center justify-center mt-10'>
            <a 
              href={`${process.env.backendUrl}/api/archives/${link.archive}`} 
              className='bg-red-500 text-vcenter px-10 py-3 font-bold uppercase rounded text-white cursor-pointer'>
              Aquí
            </a>
          </div>
        </> 
      }
    </Layout>
  )
}

export default Link