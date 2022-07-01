import { useContext } from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import authContext from '../context/auth/authContext'
import Alert from '../components/Alert'

const register = () => {
  const AuthContext = useContext(authContext)
  const { message ,userRegister } = AuthContext

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es obligatorio'),
      email: Yup.string().email('El email no es valido').required('El email es obligatorio'),
      password: Yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe contener al menos 6 caracteres'),
    }),
    onSubmit: values => {
      userRegister(values)
    }
  })

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-20">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Crear Cuenta</h2>
        {message && <Alert/>}
      </div>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form onSubmit={formik.handleSubmit} className="bg-white rounded shadow-lg px-8 pt-6 pb-5">
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-5" htmlFor="name">Nombre</label>
              <input 
                type="text" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id='name'
                placeholder="Nombre de Usuario"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

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

            {formik.touched.email && formik.errors.email ? 
              <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.email}</p>
              </div> : null}
            </div>

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
            <input value='Crear Cuenta' type="submit" className="bg-red-500 hover:bg-gray-900 w-full p-2 cursor-pointer text-white uppercase font-bold"/>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default register