import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {Toaster} from "react-hot-toast"
import {BrowserRouter} from "react-router-dom"
import {AuthProvider} from "./context/AuthContext"

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
     
      <AuthProvider>
        <App />
      </AuthProvider>

      <Toaster position='top-right'/>
    </BrowserRouter>

  </StrictMode>,
)
