import styled from '@emotion/styled'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { es } from 'date-fns/locale'
import Link from 'next/link'

const Img = styled.img`
  width: 200px;
`

const Article = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
`

const Description = styled.div`
  flex: 0 1 600 px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`

const Title = styled.a`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;

  :hover {
    cursor: pointer;
  }
`

const DescriptionText = styled.p`
  font-size: 1.6rem;
  color: #888;
  margin: 0;
`

const Comments = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  
  div {
    display: flex;
    align-items: center;
    border: 1px solid #e1e1e1;
    padding: .3rem 1rem;
    margin-right: 2rem;
  }

  img {
    width: 2rem;
    margin-right: 2rem;
  }

  p {
    font-size: 1.6rem;
    margin-right: 1rem;
    font-weight: 700;

    &:last-of-type {
      margin: 0;
    }
  }
`

const Votes = styled.div`
  flex: 0 1 auto;
  text-align: center;
  border: 1px solid #e1e1e1;
  padding: 1rem 3rem;

  div {
    font-size: 2rem;
  }

  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`

const ProductDetails = ({ product }) => {
  const { id, comments, created, description, name, URLimg, votes  } = product

  return (
    <Article>
      <Description>
        <div>
          <Img src={URLimg}/>
        </div>
        <div>
          <Link href='/products/[id]' as={`products/${id}`}>
            <Title>{name}</Title>
          </Link>
          <DescriptionText>{description}</DescriptionText>

          <Comments>
            <div>
              <img src='/static/img/comentario.png'/>
              <p>{comments.length} Comentarios </p>
            </div>
          </Comments>

          <p>Publicado hace {formatDistanceToNow(new Date(created), { locale: es })}</p>
        </div>
      </Description>
      <Votes>
        <div>
          <div> &#9650; </div>
          <p>{votes}</p>
        </div>
      </Votes>
    </Article>
  )
}

export default ProductDetails