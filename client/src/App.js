import LandingPage from './components/main/LandingPage'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import MyPasswords from './components/main/MyPasswords'
import SinglePassword from './components/main/SinglePassword'
import CreatePassword from './components/main/CreatePassword'
import ProfileScreen from './components/main/ProfileScreen'

import { useState } from "react"
import { BrowserRouter as Router ,Routes, Route } from "react-router-dom";

function App() {
  const [search, setSearch] = useState("");

  return(
      <Router>
        <Header setSearch={(s) => setSearch(s)} />
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route
          path="/mypasswords"
          component={({ history }) => (
            <MyPasswords search={search} history={history} />
          )}/>
          <Route path="/password/:id" element={<SinglePassword/>} />
          <Route path="/createpassword" element={<CreatePassword/>} />;
          <Route path="/profile" element={<ProfileScreen/>} />
        </Routes>
        <Footer/>
    </Router>
  )
};

export default App;