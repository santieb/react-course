import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Register from './pages/register'
import Forgotpassword from './pages/Forgotpassword'
import NewPassword from './pages/NewPassword'
import ConfirmAccount from './pages/ConfirmAccount'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout/>}>
          <Route index element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="forgot-password" element={<Forgotpassword/>}/>
          <Route path="forgot-password/:token" element={<NewPassword/>}/>
          <Route path="confirm/:id" element={<ConfirmAccount/>}/>
        </Route>

        <Route path="/">

        </Route>
        <Route path="/">

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
