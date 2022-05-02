import Main from "./components/Main"
import { LettersProvider } from "./context/LettersProvider"

const App = () => {

  return (
  <LettersProvider>
    <Main/>
  </LettersProvider>
  )
}

export default App
