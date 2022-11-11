import React from 'react'

import {Routes, Route } from 'react-router-dom';
//Routes and Route used to routing various pages.

import './App.css';

import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Signup from './Components/Signup'
import Login from './Components/Login'
import PasswordManagerUser from './Components/PasswordManagerUser';
import Footer from './Components/Footer'

const App = () => {
  // eslint-disable-next-line

  return (
    <div>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/passmanageruser' element={<PasswordManagerUser/>} />
          <Route path='/logout' element={<Home/>} />
        </Routes>
      <Footer/>
    </div>
  )
}

export default App

//Main file which contains all components.