import Layout from '../../components/Layout'
import Image from 'next/Image'
import styles from '../../styles/Guitar.module.css'

const Product = ({ guitar }) => {
  const { name, description, image, price } = guitar[0]

  return (
    <Layout page={`Guitarra ${name}`}>
      <div className={styles.guitar}>
        <Image layout='responsive' width={180} height={350} src={image.url} alt={`Image guitar ${name}`} ></Image>
        <div className={styles.content}>
          <h3 >{name}</h3>
          <p className={styles.description}>{description}</p>
          <p className={styles.price}>${price}</p>

          <form className={styles.form}>
            <label>Cantidad:</label>
            <select>
              <option value="">Seleccione</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <input type="sumbit" value="Agregar al carrito"></input>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query: { url } }) {
  const urlGuitar = `${process.env.API_URL}/guitars?url=${url}`
  const res = await fetch(urlGuitar)
  
  const guitar = await res.json()
  return {
    props: {
      guitar
    }
  }
}

export default Product