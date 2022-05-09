import Article from './Article'
import styles from '../styles/Blog.module.css'

const BlogList = ({ blogs }) => {
  return (
    <>        
      <h2 className='Heading'>Blog</h2>
      <div className={styles.blog}>
        {blogs.map(blog => (
          <Article 
            key={blog.id} 
            blog={blog}
          />))}
      </div>
    </>
  )
}

export default BlogList