import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Header = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const username = cookies.access_token?.username;

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">
      {!cookies.access_token ? (
        <div>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      ) : (
        <div>
        <Link to="/">Home</Link>

        {username}
        <button onClick={logout}> Logout </button>
        </div>

      )}
    </div>
  );
};

export default Header;