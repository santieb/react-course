import Link from 'next/link'
import styled from '@emotion/styled'
import useAuth from '../../hooks/useAuth'

const Navigation = styled.nav`
  padding-left: 2rem;

  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gray2);
    font-family: 'PT Sans', sans-serif;

    &:last-of-type {
      margin-right: 0;
    }
  }
`

const Nav = () => {
  const user = useAuth()

  return (
    <Navigation>
      <Link href="/">Inicio</Link>
      <Link href="/popular">Populares</Link>
      {user && <Link href='/new-product'>Nuevo Producto</Link>}
    </Navigation>
  )
}

export default Nav