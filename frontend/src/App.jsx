import { useState } from 'react'
import {Navigate, Route, Routes} from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Home from "./pages/Home"
import AuthLayout from './layouts/AuthLayout'
import ProtectedRoutes from "./components/ProtectedRoutes"
import './App.css'

function App() {

  return (
    <div>
    <Routes>

      <Route path="/" element={<Navigate to="/signup" replace />}/>

      <Route element={<AuthLayout/>}>
        <Route path="/signup" element={<Signup />}/>

        <Route path="/signin" element={<Signin />}/>
      </Route>

      <Route path='/home' element={<ProtectedRoutes>
        <Home/>
      </ProtectedRoutes>}/>
      
      </Routes>
    </div>
  )
}

export default App
