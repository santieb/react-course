import Header from "./components/Header"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Products from './components/Products'
import NewProduct from './components/NewProduct'
import EditProduct from './components/EditProduct'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
      <Header/>
      
      <div className="container mt-5">
        <Routes>
          <Route exact path="/" element={<Products/>}/>
          <Route exact path="/products/new" element={<NewProduct/>}/>
          <Route exact path="/products/edit/:id" element={<EditProduct/>}/>
        </Routes>
      </div>
    </Provider>
    </BrowserRouter>
)}

export default App
