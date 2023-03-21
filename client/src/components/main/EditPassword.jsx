import React, { useState } from 'react'

const EditPassword = (props) => {
  const {item, onClose, editData, updateBtn } = props;

  const [websiteName, setWebsiteName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = ()=>{
    if(websiteName && password){
      updateBtn(true);
      editData({websiteName, password});
    }
    else{
      setMessage('enter all details');
    }
  }

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
          <button onClick={handleSubmit}>Update</button>
          <button onClick={onClose}>Cancel</button>
          <div>{message}</div>
        </div>
    </div>
  )
}

export default EditPassword