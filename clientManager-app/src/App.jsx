import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import NewClient from './pages/NewClient'
import UpdateClient from './pages/UpdateClient'
import GetClient from './pages/GetClient'

const App = () => {

  return (
      <BrowserRouter>
        <Routes>

          <Route path="/clients" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="news" element={<NewClient/>}/>
            <Route path="update/:id" element={<UpdateClient/>}/>
            <Route path=":id" element={<GetClient/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
  )
}

export default App
