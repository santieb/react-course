import { Col, Card, Button } from  'react-bootstrap'
import useBeberages from '../hooks/useBeberages'

const Drink = ({ drink }) => {

  const { handleModal, handleDrinkId } = useBeberages()

  return (
    <Col md={6} lg={4}>
      <Card className="mb-4">
        <Card.Img 
          variant="top"
          src={drink.strDrinkThumb}
          alt={`${drink} image`} 
        />
      <Card.Body>
        <Card.Title>{drink.strDrink}</Card.Title>
        <Card.Text>{drink.strDrink}</Card.Text>
        
        <Button 
          variant="warning" 
          className="w-100 
          text-uppercase mt-2"
          onClick={() => {
            handleModal()
            handleDrinkId(drink.idDrink)
          }}>
          Ver Receta
        </Button>
      </Card.Body>
      </Card>
    </Col>
  )
}

export default Drink