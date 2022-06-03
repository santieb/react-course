import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { ProjectsProvider } from './context/ProjectsProvider'
import AuthLayout from './layouts/AuthLayout'
import RouteProtected from './layouts/RouteProtected'
import Login from './pages/Login'
import Register from './pages/register'
import Forgotpassword from './pages/Forgotpassword'
import NewPassword from './pages/NewPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import Projects from './pages/Projects'
import NewProject from './pages/NewProject'
import Project from './pages/Project'
import EditProject from './pages/EditProject'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path="register" element={<Register/>}/>
              <Route path="forgot-password" element={<Forgotpassword/>}/>
              <Route path="forgot-password/:token" element={<NewPassword/>}/>
              <Route path="confirm/:id" element={<ConfirmAccount/>}/>
            </Route>
            <Route path="projects" element={<RouteProtected/>}>
              <Route index element={<Projects/>}/>
              <Route  path="create-project" element={<NewProject/>}/>
              <Route  path=":id" element={<Project/>}/>
              <Route  path="edit/:id" element={<EditProject/>}/>        
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
