import { useState } from 'react'
import { Button, Form, Row, Col, Alert } from 'react-bootstrap'
import useCategory from '../hooks/useCategory'
import useBeberages from '../hooks/useBeberages'

const FormBeverages = () => {
  const [search, setSearch] = useState({
    name: '',
    category: ''
  })
  const [alert, setAlert] = useState('')

  const { categories } = useCategory()
  const { getBeberages } = useBeberages()

  const handleSubmit = e => {
    e.preventDefault()

    if (Object.values(search).includes('')) return setAlert('Todos los campos son obligatorios')

    setAlert('')
    getBeberages(search)
  }

  return (
    <Form onSubmit={handleSubmit}>
      {alert && <Alert variant="danger" className="text-center">{alert}</Alert>}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Nombre de Bebida</Form.Label>
            <Form.Control
              id="name"
              type="text"
              placeholder="Ej: Tequila, Vodka, etc"
              name="name"
              value={search.name}
              onChange={({ target }) => setSearch({
                ...search, 
                [target.name] : target.value
              })}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
        <Form.Group className="mb-3">
            <Form.Label htmlFor="category">Categoria de bebida</Form.Label>
            <Form.Select
              id="category"
              name="category"
              value={search.category}
              onChange={({ target }) => setSearch({
                ...search, 
                [target.name] : target.value
              })}
            >
              <option>- Seleciona una Categoria -</option>
              {categories.map(category => (
                <option 
                  key={category.strCategory}
                  value={category.strCategory}>
                  {category.strCategory}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="justify-content-end">
        <Col md={3}>
          <Button type="submit" variant="danger" className="text-uppercase w-100">
              Buscar Bebidas
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default FormBeverages