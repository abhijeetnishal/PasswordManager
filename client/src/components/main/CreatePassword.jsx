import React, { useState } from 'react'

const CreatePassword = () => {
    const [websiteName, setWebsiteName] = useState('');
    const [password, setPassword] = useState('');
    const [btnClick, setBtnClick] =useState(false);
    const [message, setMessage] = useState('');

    const createNewPassword = async(e)=>{
        e.preventDefault();
        setBtnClick(true);
        const response = await fetch('http://localhost:4000/passwords/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            websiteName,
            password
        }),
        credentials: 'include',
        })

        if(response.ok) {
            setMessage('Password Saved');
        }
    }

    const emptyField = ()=>{
        setBtnClick(true);
        setMessage('Enter all values');
    }
    
    return (
        <div>
            <div>Create Password </div>
            <input type="text" name="websitename" value={websiteName} placeholder='websitename' onChange={(e)=>setWebsiteName(e.target.value)} />    
            <input type="password" name="password" value={password} placeholder='password' onChange={(e)=>setPassword(e.target.value)} /> 
            {
                (websiteName && password) ? 
                (<button onClick={createNewPassword}>Save Password</button>) :
                (
                <div>
                    <button onClick={emptyField}>Save Password</button>;
                </div>
                )
            }
            <div>
                {
                btnClick ? 
                ({message}) :
                (<div></div>)
                }
            </div>
        </div>
    )
}

export default CreatePassword