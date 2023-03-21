import React, { useState } from 'react'

const EditPassword = (props) => {
  const {item, onClose, onConfirm} = props;

  const [websiteName, setWebsiteName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
        <div>
          Enter the {item} data to update
        </div>
        <div>
            <input type="text" value={websiteName} onChange={(e)=>setWebsiteName(e.target.value)} placeholder='enter website name' />
        </div>  
        <div>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter password' />
        </div>      
        <div>
          {
            
          }
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
    </div>
  )
}

export default EditPassword