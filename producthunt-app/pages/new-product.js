import { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Form, Field, InputSubmit,  Error } from '../components/UI/Form'
import { css } from '@emotion/react';
import useValidation from '../hooks/useValidation';
import newProductValidation from '../validation/newProductValidation'
import useAuth from '../hooks/useAuth'
import firebase from '../firebase'
import { useRouter } from 'next/router'
import { collection, addDoc } from "firebase/firestore"
const { db } = firebase
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import Error404 from '../components/Layout/404'

const INITIAL_STATE = {
  name: '',
  company: '',
  img: '',
  url: '',
  description: ''
}

const NewProduct = () => {
  const [error, setErrors] = useState(false)
  const [uploading, setUploading] = useState(false);
  const [URLimg, setURLimg] = useState('');

  const router = useRouter()

  const { values, errors, handleSubmit , handleChange, handleBlur } = useValidation(INITIAL_STATE, newProductValidation, createProduct)
  const { name, company, url, description } = values

  const user = useAuth()

  const handleImageUpload = e => {
    // Se obtiene referencia de la ubicación donde se guardará la imagen
    const file = e.target.files[0];
    const imageRef = ref(firebase.storage, 'products/' + file.name);
    // Se inicia la subida
    setUploading(true);
    const uploadTask = uploadBytesResumable(imageRef, file);

    // Registra eventos para cuando detecte un cambio en el estado de la subida
    uploadTask.on('state_changed', 
        // Muestra progreso de la subida
        snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Subiendo imagen: ${progress}% terminado`);
        },
        // En caso de error
        error => {
            setUploading(false);
            console.error(error);
        },
        // Subida finalizada correctamente
        () => {
            setUploading(false);
            getDownloadURL(uploadTask.snapshot.ref).then(url => {
                console.log('Imagen disponible en:', url);
                setURLimg(url);
            });
        }
    );
  };

  async function createProduct()  {
    try {
      if (!user) return router.push('/login')

      const product = {
        name,
        company,
        url,
        description,
        URLimg,
        votes: 0,
        comments: [],
        created: Date.now(),
        creator: {
          id: user.uid,
          name: user.displayName
        },
        haveVoted: []
      }

      await addDoc(collection(db, 'products'), (product))
    } catch (err) {
      setErrors('Error al agregar un producto', err.message)
      console.error(err.message)
    }
  }

  return (
    <Layout>
        {!user ? <Error404/> : 
          <div>
            <h1 css={css` text-align: center; margin-top: 5rem;`}>Nuevo Producto</h1>
          <Form onSubmit={handleSubmit} newProductValidation>
            <fieldset>
              <legend>Informacion General</legend>
              {errors.name && <Error>{errors.name}</Error>}
              <Field>
                <label htmlFor="name">Nombre</label>
                <input 
                  type="text" 
                  id='name' 
                  placeholder="Nombre" 
                  name="name"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>

              {errors.company && <Error>{errors.company}</Error>}
              <Field>
                <label htmlFor="Empresa">Empresa</label>
                <input 
                  type="text" 
                  id='company' 
                  placeholder="Nombre de la Empresa" 
                  name="company"
                  value={company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>

              {errors.image && <Error>{errors.image}</Error>}
              <Field>
                <label htmlFor="image">Imagen del Producto</label>
                <input
                  accept='image/*'
                  type='file'
                  id='image'
                  name="image"
                  onChange={handleImageUpload}
                />
              </Field>

              {errors.url && <Error>{errors.url}</Error>}
              <Field>
                <label htmlFor="url">URL</label>
                <input 
                  type="url" 
                  id='url' 
                  name="url"
                  placeholder="URL de tu producto"
                  value={url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
            </fieldset>

            <fieldset>
              <legend>Sobre tu Producto</legend>
              {errors.description && <Error>{errors.description}</Error>}

              <Field>
                <label htmlFor="description">Descripcion</label>
                <textarea 
                  id='description' 
                  name="description"
                  value={description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
            </fieldset>

            {error && <Error>{error}</Error>}

            <InputSubmit type="submit" value="Crear Producto"/>
          </Form>
          </div>
        }
      </Layout>
  )
}

export default NewProduct