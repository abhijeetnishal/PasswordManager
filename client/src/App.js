import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import LandingPage from './components/main/LandingPage';
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'

function App() {
  return (
    <div className="App">
       <Header/>
        <SignUp/>
        <Login/>
        <LandingPage/>
       <Footer/>
    </div>
  );
}

export default App;