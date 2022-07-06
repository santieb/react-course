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
import useAuth from '../../hooks/useAuth'

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
  const [comment, setComment] = useState({})

  const router = useRouter()
  const { query: { id }} = router
  
  const user = useAuth()

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
  }, [id, product])

  if (Object.keys(product).length === 0 && !error) return 'Cargando...'

  const { haveVoted, comments, created, description, name, url, company, URLimg, votes, creator  } = product

  const voteProduct = async () => {
    if (!user) return router.push('/login')

    if (haveVoted.includes(user.uid)) return

    const voted = [...product.haveVoted, user.uid]

    const total = product.votes +1

    const docRef = doc(firebase.db, `products/${id}`);
    await updateDoc(docRef, {
        votes: total,
        haveVoted: voted
    });

    setProduct({...product, votes:total})
    setQueryDatabase(true)
  }

  const changeComment = ({ target }) => {
    setComment({
      ...comment,
      [target.name]: target.value
    })
  }

  const isCreator = id => {
    if(product.creator.id === id) return true
  }

  const addComment = async e => {
    e.preventDefault()

    if (!user) return router.push('/login')
    comment.userId = user.uid
    comment.userName = user.displayName

    const newComments = [...product.comments, comment]
  
    const docRef = doc(firebase.db, `products/${id}`);

    await updateDoc(docRef, {
        comments: newComments
    })

    setProduct({...product, comments: newComments})
    setQueryDatabase(true)
  }

  const canDelete = () =>{
    if(!user) return false

    if (product.creator.id === user.uid) return true
  }

  const deleteProduct = async()=> {
    try {
        if(!user) return router.push('/login')

        if(product.creator.id !== user.uid) return router.push('/login')

        const docRef = doc(firebase.db, `products/${id}`)
        await deleteDoc(docRef)

        router.push('/')
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <Layout>
      { error ? <Error404/> : 
        <div className="contenedor">
          <h1 css={css`text-align: center; margin-top: 5rem;`}>
            {name}
          </h1>
    
          <ContainerProduct>
            <div>
              <p>Publicado hace {formatDistanceToNow(new Date(created), { locale: es })}</p>
              <p>Por: {creator.name} de {company}</p>
              <img src={URLimg}/>
              <p>{description}</p>
    
            { user && 
            <div>
              <h2>Agrega tu comentario</h2>
              <form onSubmit={addComment}>
                <Field>
                  <input
                    type="text"
                    name="mesagge"
                    onChange={changeComment}
                    />  
                  <InputSubmit type="submit" value='Agregar comentario'/>
                </Field>
              </form>       
            </div>
            }
    
            <h2 css={css`margin: 2rem 0;`}>Comentarios</h2>
            {comments.length === 0 ? 'No hay comentarios' :
              <ul>
                {comments.map((comment, i) =>
                <li key={`$comment.userId-${i}`} css={css`border: 1px solid #e1e1e1; padding: 2rem;`}>
                  <p>{comment.mesagge}</p>
                  <p css={css`font-weight: bold;`}>Escrito por 
                    <span>{' '}{comment.userName}</span>
                  </p>
                  {isCreator(comment.userId) && <ProductCreator>Es Creador</ProductCreator>}
                </li>
                )}
              </ul>
            }
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
                { user && <Button onClick={voteProduct}>Votar</Button>}
              </div>
            </aside>
          </ContainerProduct>
          
          {canDelete() && <Button onClick={deleteProduct}>Eliminar Producto</Button>}
        </div>
      }
    </Layout>
  )
}

export default Product