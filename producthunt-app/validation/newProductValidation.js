export default function newProductValidation(values) {
  let errors = {}

  if (!values.name) {
    errors.name = 'El nombre es obligatorio'
  }

  if (!values.company) {
    errors.company = 'El nombre empresa es obligatoria'
  }

  if (!values.url) {
    errors.url = 'La URL del producto es obligatoria'
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = 'La URL no es valida'
  }

  if (!values.description) {
    errors.description = 'La description del producto es obligatoria'
  }

  return errors
}