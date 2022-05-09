import Image from 'next/Image'
import Layout from '../../components/Layout'
import { formatDate } from '../../helpers/index'
import styles from '../../styles/Article.module.css'

const ArticleBlog = ({ blog }) => {
  const { title, content, image, published_at, id } = blog

  return (
    <Layout page={title}>
      <main className='contenedor'>
        <h1 className='heading'>{title}</h1>
        <article className={styles.article}>
          <Image layout='responsive' width={800} height={600}
            src={image.url} alt={`Imagen blog ${title}`} />
          <div className={styles.content}>
            <p className={styles.date}>{formatDate(published_at)}</p>
            <p className={styles.text}>{content}</p>
          </div>
        </article>
      </main>

    </Layout>
  )
}



export async function getStaticPaths () {
  const url = `${process.env.API_URL}/blogs`
  const res = await fetch(url)
  const blogs = await res.json()

  const paths = blogs.map(blog => ({
    params: { url: blog.url}
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps ({params: { url }}) {
  const urlBlog = `${process.env.API_URL}/blogs?url=${url}`
  const res = await fetch(urlBlog)
  const blog = await res.json()

  return {
    props: {
      blog: blog[0]
    }
  }
}

/* ServerSide
export async function getServerSideProps ({query: { id }}) {
  const url = `${process.env.API_URL}/blogs/${id}`
  console.log(url)
  const res = await fetch(url)
  const blog = await res.json()

  return {
    props: {
      blog
    }
  }
}
*/



export default ArticleBlog