import { React, useEffect, useContext, useState } from 'react'
import { Link} from 'react-router-dom'
import '../../styles/Header.css'
import { UserContext } from '../UserContext'

export default function Header() {
  const {setUserInfo} = useContext(UserContext);
  const [userName, setUserName] = useState('');

  // useEffect(() => {
  //   fetch('http://localhost:4000/api/auth/profile', {
  //     credentials: 'include',
  //   }).then(response => {
  //     response.json().then(userInfo => {
  //       setUserInfo(userInfo);
  //       setUserName(userInfo.username);
  //     });
  //   });
  // });

  const logoutFunc = async()=>{
    await fetch('http://localhost:4000/api/auth/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  return (
    <div>
      {
        userName ?  
        (
          <div className='login-header'>
            <div>
            {userName}
            </div>
            <div>
              create Password
            </div>
            <div>
              <a href='/' onClick={logoutFunc}>Logout</a>
            </div>
          </div>
        ) 
      :
        (
          <div className='main-header'>
            <div>
            <Link to="/">Password Manager</Link>
            </div>
            <div>
              <Link to="/register">Signup</Link>
            </div>
            <div>
              <Link to="/login">Login</Link>
            </div>
          </div>
        )
      }
      </div>
  )
}
