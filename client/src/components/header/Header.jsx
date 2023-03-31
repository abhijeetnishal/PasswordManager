import React from "react";
import headerLock from '../../assets/lockHeader.png'
import profilePhoto from '../../assets/user-profile.png'
import '../../styles/Header.css'
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
      await fetch('https://passwordmanager-nbfr.onrender.com/api/auth/logout',{
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
        <div className="noAuthNavbar">
          <img className="headerLock" src={headerLock} alt="" />
          <Link className="keySafeIcon" to="/">Key Safe</Link>
          <div className="headerLoginBtn">
            <Link className="headerLoginIcon" to="/login">Login</Link>
          </div>
        </div>
      ) : (
        <div className="noAuthNavbar">
          <img className="headerLock" src={headerLock} alt="" />
          <Link className="keySafeIcon" to="/">Key Safe</Link>
          <img className="profilePhoto" src={profilePhoto} alt="" />
           <div className="userName"> {userName} </div>
            <div className="headerLoginBtn">
              <Link to='/' className="headerLogoutIcon" onClick={logout}>Logout</Link>
            </div>
        </div>
      )}
    </div>
  );
};

export default Header;