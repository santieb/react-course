import Link from 'next/Link'
import Image from 'next/image'
import styles from '../styles/Header.module.css'
import { useRouter } from 'next/router'

const Header = ({ guitar }) => {
  const router = useRouter()
  return (
    <header className={styles.header}>
      <div className="contenedor">
        <div className={styles.bar}>
          <Link href="/">
            <a>
              <Image width={400} height={100} src="/img/logo.svg" alt="logo" ></Image>
            </a>
          </Link>
          <nav className={styles.nav}>
            <Link href="/">Inicio</Link>
            <Link href="/aboutus">Nosotros</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/store">Tienda</Link>
            <Link href="/cart">
              <a>
                <Image layout="fixed" width={30} height={25} src="/img/carrito.png" alt="cart" ></Image>
              </a>
            </Link>
          </nav>
        </div>

        {guitar && (
          <div className={styles.model}>
            <h2>Modelo {guitar.name}</h2>
            <p>{guitar.description}</p>
            <p className={styles.price}>${guitar.price}</p>
            <Link href={`/guitars/${guitar.url}`}>
              <a className={styles.link}>
                Ver Producto
              </a>
            </Link>
          </div>
        )}
      </div>

      {router.pathname === '/' && (
        <div className={styles.guitar}>
        <Image layout='fixed' width={500} height={1200} src={'/img/header_guitarra.png'} alt='header guitarra'/>
        </div>
      )}
    </header>
  )
}

export default Header