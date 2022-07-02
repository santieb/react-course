import { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Form, Field, InputSubmit,  Error } from '../components/UI/Form'
import { css } from '@emotion/react';
import useValidation from '../hooks/useValidation';
import loginValidation from '../validation/loginValidation'
import firebase from '../firebase'
import { useRouter } from 'next/router'

const INITIAL_STATE = {
  email: '',
  password: ''
}

const Login = () => {
  const [error, setErrors] = useState(false)

  const router = useRouter()

  const { values, errors, handleSubmit , handleChange, handleBlur } = useValidation(INITIAL_STATE, loginValidation, login)

  const { email, password } = values

  async function login()  {
    try {
      await firebase.login(email, password)
      
      router.push('/')
    } catch (err) {
      setErrors(err.message)
    }
  }

  return (
    <Layout>
        <h1 css={css` text-align: center; margin-top: 5rem;`}>Iniciar Sesión</h1>
        <Form onSubmit={handleSubmit} loginValidation>

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

          {errors.name && <Error>{errors.password}</Error>}

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
          <InputSubmit type="submit" value="Iniciar Sesión"/>
        </Form>
    </Layout>
  )
}

export default Login