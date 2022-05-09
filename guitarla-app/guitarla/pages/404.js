import Link from 'next/link'
import styles from '../styles/NotFound.module.css'

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1 className="heading">Página no encontrada</h1>
      <Link href="/">Volver al inicio</Link>
    </div>
  )
}

export default NotFound