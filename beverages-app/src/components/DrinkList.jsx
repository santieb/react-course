import { Row } from  'react-bootstrap'
import useBeberages from '../hooks/useBeberages'
import Drink from './Drink'

const DrinkList= () => {
  const { drinks } = useBeberages()

  return (
    <Row className="mt-5">
      {drinks.map(drink => (<Drink key={drink.idDrink} drink={drink}/>))}
    </Row>
  )
}

export default DrinkList