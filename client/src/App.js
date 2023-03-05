import LandingPage from './components/main/LandingPage'
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'
import Footer from './components/footer/Footer'
import HomePage from './components/main/HomePage';

import { BrowserRouter as Router ,Routes, Route } from "react-router-dom";
import { UserContextProvider } from './components/UserContext';

function App() {
  return(
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
        <Footer/>
    </Router>
    </UserContextProvider>
  )
};

export default App;