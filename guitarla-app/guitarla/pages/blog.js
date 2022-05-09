import Layout from '../components/Layout'
import Article from '../components/Article'
import styles from '../styles/Blog.module.css'

const Blog = ({ blogs }) => {
  return (
    <Layout page='Blog'>
      <main className='contenedor'>
        <h2 className='Heading'>Blog</h2>
        <div className={styles.blog}>
          {blogs.map(blog => (
            <Article 
              key={blog.id} 
              blog={blog}
            />))}
        </div>
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