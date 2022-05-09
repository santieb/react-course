import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '../helpers'
import styles from '../styles/Article.module.css'

const Article = ({ blog }) => {
  const { title, resume, content, image, published_at, id, url } = blog

  return (
    <article>
      <Image priority="true" layaout='responsive' width={800} height={600} alt={`image blog ${title}`} src={image.url}/>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p className={styles.date}>{formatDate(published_at)}</p>
        <p clasName={styles.resume}>{resume}</p>
        <Link href={`/blog/${url}`}>
          <a className={styles.link}>
            Leer más 
          </a>
        </Link>
      </div>
    </article>
  )
}

export default Article