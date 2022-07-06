import { useState} from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Router from 'next/dist/client/router'

const InputText = styled.input`
  border: 1px solid #e1e1e1;
  padding: 1rem;
  min-width: 300px;
`

const InputSubmit = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 4rem;
  background-image: url('/static/img/buscar.png');
  background-repeat: no-repeat;
  position: absolute;
  right: 1rem;
  top: 1px;
  background-color: white;
  border: none;
  text-indent: -9999px;

  &:hover { 
    cursor: pointer;
  }
`

const Search = () => {
  const [search, setSearch] = useState('')

  const searchProduct = e => {
    e.preventDefault()

    if (search.trim() === '') return

    Router.push({
      pathname: '/search',
      query:{'q': search}
    })
  }

  return (
    <form onSubmit={searchProduct} css={css`position: relative;`}>
      <InputText 
        type="text"
        placeholder="Buscar Productos"
        onChange={({ target }) => setSearch(target.value)}
      />
      <InputSubmit type="submit">Buscar</InputSubmit>
    </form>
  )
}

export default Search