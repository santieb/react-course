import { useState, useEffect } from 'react'
import Error from './Error'
import styled from '@emotion/styled'
import useSelectCoins from '../hooks/useSelectetCoins'
import { coins } from '../data/coins'

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: .3s ease;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`

const Form = ({ setCoins }) => {
  const [ cryptos, setCryptos ] = useState([])
  const [ error, setError ] = useState(false)

  const [ coin, SelectCoins ] = useSelectCoins('Elige tu moneda', coins)
  const [ crypto, SelectCrypto ] = useSelectCoins('Elige tu criptomoneda', cryptos)

  useEffect (() => {
    const getData = async () => {
      const url='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
      const res = await fetch(url)
      const { Data } = await res.json()

      const cryptos = Data.map( crypto => {
        const object = { 
          id: crypto.CoinInfo.Name, 
          name: crypto.CoinInfo.FullName  
        }
        return object
      })
      setCryptos(cryptos)
    }
    getData()
  },[])

  const handleSubmit = () => {
    event.preventDefault()

    if (!crypto || !coin) return setError(true)

    setError(false)
    setCoins([ coin, crypto ])
  }

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectCoins/>
        <SelectCrypto/>
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  )
}

export default Form