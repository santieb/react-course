import { useState, useEffect } from 'react'

const useValidation = (initialState, validation, fn) => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [submitForm, setSubmitForm] = useState(false)

  useEffect(() => {
    if (submitForm) {
      const noErrors = Object.keys(errors).length === 0
      if (noErrors) fn()

      setSubmitForm(false)
    }
  }, [errors])

  const handleChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const validationErrors = validation(values)

    setErrors(validationErrors)
    setSubmitForm(true)
  }

  const handleBlur = () => {
    const validationErrors = validation(values)
    setErrors(validationErrors)
  }

  return {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur
  }
}

export default useValidation