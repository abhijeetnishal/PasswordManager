import React,{useState} from 'react'
import axios from "axios";

import './Signup.css'

const Signup = () => {
  //Set initial states for username, email, password, and register.
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Signup, setSignup] = useState(false);
  //Set a name and value attribute for the username, email and password input fields:
  //Add onChange={(e) => setEmail(e.target.value)} to the username, email and password input fields respectively:
  //Add onSubmit={(e)=>handleSubmit(e)} and onClick={(e)=>handleSubmit(e)} to the form and button
    const handleSubmit = (e) => {
      // prevent the form from refreshing the whole page
      e.preventDefault();
      //In the handleSubmit function, build the configuration needed for axios to 
      //successfully connect the frontend to the backend.
      const configuration = {
        method: "post",
        url: "http://localhost:4000/signup",
        data: {
          username,
          email,
          password,
        },
      };
      //Having the configurations set up, make the call. The API call is just a one-line statement:
      //make a api call
      axios(configuration)
      .then((result)=>{
        setSignup(true);
        console.log(result);})
      .catch((error)=>{
        error = new Error();
        console.log(error);})
    }
  return (
    <div className='signup'>
      <div class='bold-line'></div>
        <div class='container'>
          <div class='window'>
            <div class='overlay'></div>
            <div class='content'>
              <div class='welcome'>Hello There!</div>
              <div class='subtitle'>We're almost done. Before using our services you need to create an account.</div>
              <div class='input-fields'>
                <input type='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' class='input-line full-width'></input>
                <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' class='input-line full-width'></input>
                <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' class='input-line full-width'></input>
              </div>
              <div class='spacing'>or continue with <span class='highlight'>Facebook</span></div>
              <div><button class='ghost-round full-width' onClick={(e) => handleSubmit(e)}>Create Account</button></div>
              <div>
                {/* display success message */}
                {Signup ? (
                  <p className="text-success">You Are Registered Successfully</p>
                ) : (
                  <p className="text-danger">You Are Not Registered</p>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Signup