import Register from './components/auth/Register'
import Login from './components/auth/Login'
import CreatePassword from './components/main/CreatePassword'
import PasswordPage from './components/main/PasswordPage'
import LandingPage from './components/main/LandingPage'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import Header from './components/header/Header'
import ErrorPage from './components/errorPage/ErrorPage'
import ProtectedRoute from './ProtectedRoute'
import React from 'react'

function App() {
  return(
      <React.Fragment>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/create" element={<ProtectedRoute> <CreatePassword /> </ProtectedRoute>}/>
          <Route path="/view/:id" element={<ProtectedRoute> <PasswordPage /> </ProtectedRoute>} />
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
      </React.Fragment>
  )
};

export default App;