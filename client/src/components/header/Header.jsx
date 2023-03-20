import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const Header = () => {
  const cookies = new Cookies();
  const cookieValue = cookies.get('myCookie');
  const userName = cookieValue?.username;
  const navigate = useNavigate();

  const logout = () => {
    const fetchData = async () => {
      // get the data from the api
      await fetch('http://localhost:4000/api/auth/logout',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })
    }
    fetchData();
    cookies.remove('myCookie', { path: '/' });

    window.localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      {!userName ? (
        <div>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      ) : (
        <div>
        <Link to="/">Home</Link>
        {userName}
        <button onClick={logout}> Logout </button>
        </div>

      )}
    </div>
  );
};

export default Header;