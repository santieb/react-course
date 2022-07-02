import { useContext } from 'react'
import Search from './UI/Search'
import Nav from './Layout/Nav'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Button from './UI/Button'
import { FirebaseContext } from '../firebase'

const ContainerHeader = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) { 
    display: flex;
    justify-content: space-between;
  }
`

const Logo = styled.p`
  color: var(--orange);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: 'Roboto Slab', serif;
  margin-right: 2rem;
`

const Header = () => {
  const user = true
  console.log(useContext(FirebaseContext))

  return (
    <header css={css`
      border-bottom: 2px solid #e1e1e1;
      padding: 1rem 0;
    `}>
      <ContainerHeader>
        <div css={css`display: flex;align-items: center;`}>
          <Link href="/">
            <Logo>P</Logo>
          </Link>
          <Search/>
          <Nav/>
        </div>

        <div css={css`display: flex;align-items: center;`}>
          { user ?
            <div css={css`display: flex; align-items: center;`}>
              <p css={css`margin-right: 2rem;`}>Hola {user.displayName}</p>
              <Button onClick={() => firebase.logout()} bgColor='true'>Cerrar sesión</Button>
            </div> 
            : 
            <div css={css`display: flex; align-items: center;`}>
              <Link href="/login">
                <Button bgColor='true'>Login</Button>
              </Link>
              <Link href="/register">
                <Button>Crear Cuenta</Button>
              </Link>
            </div>
          }
        </div>
      </ContainerHeader>
    </header>
  )
}

export default Header