import React, { useState } from 'react'

const CreatePassword = () => {
    const [websiteName, setWebsiteName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <div>Create Password</div> 
            <input type="text" name="websitename" value={websiteName} placeholder='websitename' onChange={(e)=>setWebsiteName(e.target.value)} />    
            <input type="password" name="password" value={password} placeholder='password' onChange={(e)=>setPassword(e.target.value)} /> 
            <button>Save Password</button>
        </div>
    )
}

export default CreatePassword