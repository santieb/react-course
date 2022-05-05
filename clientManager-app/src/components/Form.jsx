import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Alert from './Alert'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'

const Formm = ({ client={}, loading=false }) => {
  const navigate = useNavigate()

  const clientSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'El nombre es muy corto')
      .max(20, 'El nombre es muy largo')
      .required('El nombre del cliente es obligatorio'),
    company: Yup.string()
      .required('El nombre de la empresa es obligatorio'),
    email: Yup.string()
      .email('Email no valido')
      .required('El email es obligatorio'),
    phone: Yup.number().typeError('Número no valido')
      .integer('Número no valido') 
      .positive('Número no valido')
  })

  const handleSubmit = async (values) => {
    try {
      if (client.id) {
        const url = `http://localhost:4000/clients/${client.id}`
        await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
      }

      else {
        const url = 'http://localhost:4000/clients'
        await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
      }

      navigate('/clients')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    loading ? <Spinner/> : (
      <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
          {client.name ? 'Editar cliente': 'Agregar cliente'}
        </h1>

        <Formik
          onSubmit={async (values, { resetForm }) => {
            await handleSubmit(values)
            resetForm()
          }}
          initialValues={{
            name: client?.name ?? '',
            company: client?.company ?? '',
            email: client?.email ?? '',
            phone: client?.phone ?? '',
            notes: client?.notes ?? ''
          }}
          enableReinitialize={true}
          validationSchema={clientSchema}
        >
          {({ errors, touched }) => (
            <Form className="mt-10">
              <div className="mb-4">
                <label htmlFor="name" className="text-gray-800">Nombre:</label>
                <Field
                  id="name"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del Cliente"
                  name="name" />

                {errors.name && touched.name ? (
                  <Alert>{errors.name}</Alert>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="company" className="text-gray-800">Empresa:</label>
                <Field
                  id="company"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del Cliente"
                  name="company" />

                {errors.company && touched.company ? (
                  <Alert>{errors.company}</Alert>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="text-gray-800">Email:</label>
                <Field
                  type="email"
                  id="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Email del Cliente"
                  name="email" />

                {errors.email && touched.email ? (
                  <Alert>{errors.email}</Alert>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="text-gray-800">Teléfono:</label>
                <Field
                  type="tel"
                  id="phone"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Teléfono del Cliente"
                  name="phone" />

                {errors.phone && touched.phone ? (
                  <Alert>{errors.phone}</Alert>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="notes" className="text-gray-800">Notas:</label>
                <Field
                  as="textarea"
                  id="notes"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  placeholder="Notas del Cliente"
                  name="notes" />
              </div>

              <input
                type="submit"
                value={client.name ? 'Editar cliente': 'Agregar cliente'}
                className="mt-5 w-full bg-blue-800 text-white p-3 uppercase font-bold text-lg" />
            </Form>
          )}
        </Formik>

      </div>
    )
  )
}

export default Formm