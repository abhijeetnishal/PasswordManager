import React from 'react'
import { useState} from 'react'
import { Navigate } from 'react-router-dom'
import { Cookies } from "react-cookie"

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
    return <Navigate to={`/view/${userId}`} />
  }
  
  return (
    <div>
      <div>Login</div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} /> <br />
        <label htmlFor="password">Password</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} /> <br />
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
                    (<button type='submit' onClick={invalidEmail}>Login</button>):(
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