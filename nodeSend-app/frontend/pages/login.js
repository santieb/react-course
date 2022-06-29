import { useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import authContext from '../context/auth/authContext'
import Alert from '../components/Alert'
import { useRouter } from 'next/router'

const login = () => {
  const AuthContext = useContext(authContext)
  const { message, authenticated, userLogin } = AuthContext
  
  const router = useRouter()

  useEffect(() => {
    if (authenticated) {
      router.push('/')
    }
  }, [authenticated])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('El email no es valido').required('El email es obligatorio'),
      password: Yup.string().required('La contraseña es obligatoria'),
    }),
    onSubmit: values => {
      userLogin(values)
    }
  })

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-20">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Iniciar sesión</h2>
        {message && <Alert/>}
      </div>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form onSubmit={formik.handleSubmit} className="bg-white rounded shadow-lg px-8 pt-6 pb-5">
            {formik.touched.name && formik.errors.name ? 
              <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.name}</p>
              </div> : null}

            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-5" htmlFor="email">Email</label>
              <input 
                type="email" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id='email'
                placeholder="Email de Usuario"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.email && formik.errors.email ? 
              <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.email}</p>
              </div> : null}

            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-5" htmlFor="password">Contraseña</label>
              <input 
                type="password" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-"
                id='password'
                placeholder="Contraseña de Usuario"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.password && formik.errors.password ? 
              <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.password}</p>
              </div> : null}
            <input value='Iniciar sesión' type="submit" className="bg-red-500 hover:bg-gray-900 w-full p-2 cursor-pointer text-white uppercase font-bold"/>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default login