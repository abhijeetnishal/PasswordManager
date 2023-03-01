import React from 'react'
import { useState } from 'react';
import '../../styles/SignUp.css'

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [btnClick, setBtnClick] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleSubmit = async(e)=>{
    setBtnClick(true);
    e.preventDefault();
    const response = await fetch('http://localhost:4000/api/auth/signup',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName,
        email,
        password
      })
    })
    const data = await response.json();
    setMessage(data.message);
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

  return (
    <div>
      <div className='signup'> 
      <div>Signup</div>
        <label htmlFor="username" >Username:</label>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} /> <br />
        <label htmlFor="email">Email:</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} /> <br />
        <label htmlFor="password">Password:</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} /> <br />
        {
        (userName && validateEmail(email) && password) ? (
          <button type='submit' onClick={handleSubmit} >Signup</button>
        ) : (<div> {
            !userName || !email || !password ? (
              <button type='submit' onClick={emptyFieldFunc} >Signup</button>
              ) : ( 
                <div>
                  {
                    !validateEmail(email) ? 
                    (<button type='submit' onClick={invalidEmail} >Signup</button>):(
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
    </div>
  )
}

export default SignUp