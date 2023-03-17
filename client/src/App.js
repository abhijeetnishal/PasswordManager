import Register from './components/auth/Register'
import Login from './components/auth/Login'
import CreatePassword from './components/main/CreatePassword'
import PasswordPage from './components/main/PasswordPage'
import EditPassword from './components/main/EditPassword'
import Footer from './components/footer/Footer'
import LandingPage from './components/main/LandingPage'
import { Routes, Route } from "react-router-dom"
import Header from './components/header/Header'
import ProtectedRoute from './ProtectedRoute'

function App() {
  return(
      <>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/create" element={<ProtectedRoute> <CreatePassword /> </ProtectedRoute> }/>
          <Route path="/post/:id" element={<PasswordPage />} />
          <Route path="/edit/:id" element={<EditPassword />} />
        </Routes>
        <Footer/>
      </>
  )
};

export default App;