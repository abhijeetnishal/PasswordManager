import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "../../UserContext";

export default function Header() {
  const {userInfo, setUserInfo, setIsLoggedIn} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/api/auth/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
    //eslint-disable-next-line
  },[]); 

  function logout() {
    fetch('http://localhost:4000/api/auth/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    
  }

  const username = userInfo?.username;
  //console.log(username);

  return (
    <header>
      <Link to="/create" className="logo">MyPassword</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new password</Link>
            <a href="/" onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}