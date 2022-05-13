import WheatherApp from './components/WheatherApp';
import { WheatherProvider } from './context/WheatherProvider'

const App = () => {

  return (
    <WheatherProvider>
      <header>
        <h1>Buscador de Clima</h1>
      </header>
      <WheatherApp/>
    </WheatherProvider>
  )
}

export default App
