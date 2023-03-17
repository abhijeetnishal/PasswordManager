import React from 'react'
import { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../UserContext'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [btnClick, setBtnClick] = useState(false);
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo, setIsLoggedIn} = useContext(UserContext);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:4000/api/auth/login',{
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
        //console.log(userInfo);
        
        setUserInfo(userInfo);
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);

        const token = localStorage.getItem('authToken');
        localStorage.setItem('token', token);

        setMessage(userInfo.username);

        setRedirect(true);
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
    setMessage('please enter all details')
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
    return <Navigate to={'/create'} />
  }
  
  return (
    <div>
      <div>Login</div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} /> <br />
        <label htmlFor="password">Password</label>
        <input type="email" value={password} onChange={(e)=>setPassword(e.target.value)} /> <br />
      </div>
      {
        (validateEmail(email) && password) ? (
          <button type='submit' onClick={handleSubmit} >Login</button>
        ) : 
        (<div> {
            !email || !password ? (
              <button type='submit' onClick={emptyFieldFunc} >Login</button>
              ) : ( 
                <div>
                  {
                    !validateEmail(email) ? 
                    (<button type='submit' onClick={invalidEmail} >Login</button>):(
                      <div> </div>  
                    )
                  }
                </div>
              )
          }
        </div>)
        }
        <div>
          {
            btnClick?
            (<div>
              {message}
            </div>):
            (<div>
            </div>)
          }
          </div>
    </div>
  )
}

export default Login