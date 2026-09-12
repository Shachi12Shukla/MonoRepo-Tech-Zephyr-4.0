import { useState } from 'react'
import {Navigate, Route, Routes} from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Home from "./pages/Home"
import Quest from "./pages/Quest"
import AuthLayout from './layouts/AuthLayout'
import AppLayout from "./layouts/AppLayout"
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

      <Route  element={<ProtectedRoutes> <AppLayout/> </ProtectedRoutes>} >

        <Route path='/home' element={<Home/>}/>

        <Route path='/quests' element={<Quest/>}/>

        <Route path='/character' element={<h1>Character</h1>}/>

        <Route path='/inventory' element={<h1>Inventory</h1>}/>

        <Route path='/shop' element={<h1>Shop</h1>}/>

        <Route path='/history' element={<h1>History</h1>}/>

      </Route>
      
      </Routes>
    </div>
  )
}

export default App
