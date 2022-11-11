import React, {useState} from 'react'
import axios from 'axios';

import './Login.css'

const Login = () => {
  //Set initial states for email, password, and login like this:
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Login, setLogin] = useState(false);
  //Set a name and value attribute for the username, email and password input fields:
  //Add onChange={(e) => setEmail(e.target.value)} to the username, email and password input fields respectively:
  //Add onSubmit={(e)=>handleSubmit(e)} and onClick={(e)=>handleSubmit(e)} to the form and button
  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // set configurations
    const configuration = {
      method: "post",
      url: "http://localhost:4000/login",
      data: {
        email,
        password,
      },
    };
    // make the API call
    axios(configuration)
    .then((result) => {
      setLogin(true);
      console.log(result);
    })
    .catch((error) => {
      error = new Error();
      console.log(error);
    });
  }
  return (
    <div className='login'>
      <div class='bold-line'></div>
        <div class='container'>
          <div class='window'>
            <div class='overlay'></div>
            <div class='content'>
              <div class='welcome'>Hello There!</div>
              <div class='subtitle'>We're almost done. Before using our services you need to Login.</div>
              <div class='input-fields'>
                <input type='email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' class='input-line full-width'></input>
                <input type='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' class='input-line full-width'></input>
              </div>
              <div class='spacing'>or continue with <span class='highlight'>Facebook</span></div>
              <div><button class='ghost-round full-width' onClick={(e)=>handleSubmit(e)}>Login</button></div>
              <div>
                {/* display success message */}
                {Login ? (
                    <h3>Logged in successfully</h3>
                  ) : (
                    <h3>Not Logged in</h3>
                  )}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Login