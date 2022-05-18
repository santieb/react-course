import { Container } from 'react-bootstrap'
import { CategoryProvider } from './context/CategoryProvider'
import { BeberagesProvider } from './context/BeberagesProvider'
import FormBeverages from './components/FormBeverages'
import DrinkList from './components/DrinkList'
import DrinkModal from './components/DrinkModal'

const App = () => {
  return (
    <CategoryProvider>
      <BeberagesProvider>
        <header className="py-5">
          <h1> Buscador de Bebidas</h1>
        </header>

        <Container className="mt-5">
          <FormBeverages/>
          <DrinkList/>
          <DrinkModal/>
        </Container>
      </BeberagesProvider>
    </CategoryProvider>
  )
}

export default App
