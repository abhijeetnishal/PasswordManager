import React from 'react'
import { useState} from 'react'
import { Navigate } from 'react-router-dom'
import { Cookies } from "react-cookie"
import '../../styles/Register.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //eslint-disable-next-line
  const cookies = new Cookies();

  const [btnClick, setBtnClick] = useState(false);
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState('');

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch('https://passwordmanager-nbfr.onrender.com/api/auth/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      }),
      credentials: 'include',
    })

    if(response.ok) {
      await response.json().then(userInfo => {
        cookies.set('myCookie', userInfo, { path: '/' }); 
        const cookieValue = cookies.get('myCookie');

        window.localStorage.setItem("userID", userInfo.id);

        setMessage(userInfo.username);

        setRedirect(true);

        setUserId(cookieValue.id)
        setBtnClick(true);
      });
    }
    else{
      const data = await response.json();
      setBtnClick(true);
      setMessage(data.message);
    }
  }

  const emptyFieldFunc = ()=>{
    setBtnClick(true);
    setMessage('Please enter all details')
  }

  const validateEmail = (email)=> {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const invalidEmail = ()=>{
    setBtnClick(true);
    setMessage('Invalid email');
  }

  if(redirect){
    return <Navigate to={`/view/${userId}`} />
  }
  
  return (
      <div className='container'>
      <div className="login form">
      <header>Login</header>
      <form>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
        <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" />
      </form>
      <div>
      {
        (validateEmail(email) && password) ? (
          <input type='button' className='button' onClick={handleSubmit} value='Login' />
        ) : 
        (<div> {
            !email || !password ? (
              <input type='button' className='button' onClick={emptyFieldFunc} value='Login' />
              ) : ( 
                <div>
                  {
                    !validateEmail(email) ? 
                    (<input type='button' className='button' onClick={invalidEmail} value='Login' />):(
                      <div> </div>  
                    )
                  }
                </div>
              )
          }
        </div>)
        }
        <div className='messageDiv'>
          {
            btnClick?
            (<div className='message'>
              {message}
            </div>):
            (<div>
            </div>)
          }
        </div>
      </div>
      <div className="signup">
        <span className="signup">Don't have an account?
         <a href='/register' >Register</a>
        </span>
      </div>
      </div>
      </div>
  )
}

export default Login