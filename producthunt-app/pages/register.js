import { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Form, Field, InputSubmit,  Error } from '../components/UI/Form'
import { css } from '@emotion/react';
import useValidation from '../hooks/useValidation';
import registerValidation from '../validation/registerValidation.js'
import firebase from '../firebase'
import { useRouter } from 'next/router'

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
}

const Register = () => {
  const [error, setErrors] = useState(false)

  const router = useRouter()

  const { values, errors, handleSubmit , handleChange, handleBlur } = useValidation(INITIAL_STATE, registerValidation, register)

  const { name, email, password } = values

  async function register()  {
    try {
      await firebase.register(name, email, password)
      router.push('/')
    } catch (err) {
      setErrors(err.message)
    }
  }

  return (
    <Layout>
        <h1 css={css` text-align: center; margin-top: 5rem;`}>Crear cuenta</h1>
        <Form onSubmit={handleSubmit} registerValidation>

          {errors.name && <Error>{errors.name}</Error>}
          <Field>
            <label htmlFor="name">Nombre</label>
            <input 
              type="text" 
              id='name' 
              placeholder="Tu Nombre" 
              name="name"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>

          {errors.email && <Error>{errors.email}</Error>}

          <Field>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id='email' 
              placeholder="Tu Email" 
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>

          {errors.password && <Error>{errors.password}</Error>}

          <Field>
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id='password' 
              placeholder="Tu Contraseña" 
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>

          {error && <Error>{error}</Error>}

          <InputSubmit type="submit" value="Crear Cuenta"/>
        </Form>
    </Layout>
  )
}

export default Register