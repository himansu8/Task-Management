import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Header from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { AuthContext } from './context/AuthContext';
function App() {
  
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext)

    if (!user) {
      return <Navigate to='/login' />
    }
    return children;
  }
  return (
    <BrowserRouter>

      
      <Routes>
        <Route path='/' element={<><ProtectedRoute> <Header  /> <Home  /> </ProtectedRoute></>} />
        <Route path='/login' element={<Login   />} />
        <Route path='/signup' element={<Signup/>} />
        {/* <Route path='/profile' element={<Profile user={user} isAuthenticated={isAuthenticated} />} /> */}
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
