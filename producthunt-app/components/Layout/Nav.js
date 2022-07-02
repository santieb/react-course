import { useContext } from 'react';
import Link from 'next/link'
import styled from '@emotion/styled'
import FirebaseContext from '../../firebase'

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

  return (
    <Navigation>
      <Link href="/">Inicio</Link>
      <Link href="/popular">Populares</Link>
    </Navigation>
  )
}

export default Nav