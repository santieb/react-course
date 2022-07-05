import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from '../../firebase'
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import Error404 from '../../components/Layout/404'
import Layout from '../../components/Layout/Layout'
import { css } from '@emotion/react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { es } from 'date-fns/locale'
import styled from '@emotion/styled'
import { Field, InputSubmit } from '../../components/UI/Form'
import Button from '../../components/UI/Button';

const Container = styled.div`
  max-width: 1200px;
  width: 95%;
  padding: 5rem 0;
  margin: 0 auto;
`

const ContainerProduct = styled.div`
    @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`

const ProductCreator = styled.div`
    padding: .5rem 2rem;
    background-color: #da552f;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`

const Product = () => {
  const [product, setProduct] = useState({})
  const [error, setError] = useState(false)
  const [queryDatabase, setQueryDatabase] = useState(true);

  const router = useRouter()
  const { query: { id }} = router

  useEffect(() => {
    if(id && queryDatabase) {
      const docRef = doc(firebase.db, `products/${id}`)

      const getProduct = async () => {
      const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()

          setQueryDatabase(false)
          setProduct(data)
        } else {
          setError(true)
          setQueryDatabase(false)
        }
      }
      getProduct()
    }
  }, [id])

  if (Object.keys(product).length === 0) return 'Cargando...'

  const { comments, created, description, name, url, company, URLimg, votes  } = product

  return (
    <Layout>
      { error && <Error404/>}

      <div className="contenedor">
        <h1 css={css`text-align: center; margin-top: 5rem;`}>
          {name}
        </h1>

        <ContainerProduct>
          <div>
            <p>Publicado hace {formatDistanceToNow(new Date(created), { locale: es })}</p>
            <img src={URLimg}/>
            <p>{description}</p>

            <h2>Agrega tu comentario</h2>
            <form>
              <Field>
                <input
                  type="text"
                  name="mesagge"
                />  
                <InputSubmit type="submit" value='Agregar comentario'/>
              </Field>

              <h2 css={css`margin: 2rem 0;`}>Comentarios</h2>
              {comments.map(comment =>
                <li>
                  <p>{comment.userName}</p>
                </li>
              )}
            </form>
          </div>

          <aside>
            <Button
              target="_blank"
              bgColor="true"
              href={url}>
              Visitar URL
            </Button>

            <div css={css`margin-top: 5rem;`}>
              <p css={css`text-align: center;`}>{votes} Votos</p>
              <Button>Votar</Button>
            </div>
          </aside>
        </ContainerProduct>
      </div>
    </Layout>
  )
}

export default Product