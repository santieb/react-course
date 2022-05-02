import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Form from './components/Form'
import Response from './components/Response'
import Spinner from './components/Spinner'

import img from './images/crypto.png'

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Img = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

const App = () => {
  const [ res, setRes ] = useState({})
  const [ coins, setCoins ] = useState([])
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      setRes({})

      const [ coin, crypto ] = coins
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${coin}`
      const res = await fetch(url)
      const data = await res.json()

      setRes(data.DISPLAY[crypto][coin])
      setLoading(false)
    }

    if(coins.length > 0) {
      setRes(getData())
    }
    
  },[coins])

  return (
    <Container>
      <Img src={img} alt="Crypto"></Img>
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Form setCoins={setCoins}/>
        
        {loading && <Spinner/>}
        {res.PRICE && <Response res={res}/>}
      </div>
    </Container>
  )
}

export default App
