import Layout from '../components/Layout'
import List from '../components/List'

const Store = ({ guitars}) => {
  return (
    <Layout page='Tienda Virtual'>
      <div className='contenedor'>
      <h1 className="heading">Nuestra Colección</h1>
      <List guitars={guitars}/>
      </div>
    </Layout>
  )
}

export async function getServerSideProps () {
  const url = `${process.env.API_URL}/guitars?_sort=price:desc`
  const res = await fetch(url)
  const guitars = await res.json()
  return {
    props: {
      guitars
    }
  }
}

export default Store


