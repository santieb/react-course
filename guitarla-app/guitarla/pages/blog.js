import Layout from '../components/Layout'
import BlogList from '../components/BlogList'

const Blog = ({ blogs }) => {
  return (
    <Layout page='Blog'>
      <main className='contenedor'>
        <BlogList blogs={blogs}></BlogList>
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  const url = `${process.env.API_URL}/blogs?_sort=created_at:desc`
  const response = await fetch(url)
  const blogs = await response.json()

  return {
    props: {
      blogs
    }
  }
}

export default Blog