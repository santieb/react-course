export default function loginValidation(values) {
  let errors = {}

  if (!values.email) errors.email = 'El Email es obligatorio'
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) 
    errors.email = 'Email no valido'

  if (!values.password) errors.password = 'La contraseña es obligatoria'
  else if (values.password.length < 6) errors.password = 'La contraseña debe ser de al menos 6 caracteres'

  return errors
}