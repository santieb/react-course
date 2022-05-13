import { QuoterProvider } from "./context/QuoterProvider"
import InsuranceApp from "./components/InsuranceApp"

const App = () => {
  return (
    <QuoterProvider>
      <InsuranceApp/>
    </QuoterProvider>
  )
}

export default App
