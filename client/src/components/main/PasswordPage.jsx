import React, { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'

const PasswordPage = () => {
    const cookies = new Cookies();
    const cookieValue = cookies.get('myCookie');
    const [data, setData] = useState(null);
    const [decryptedPassword, setDecryptedPassword] = useState(null);
    //const [showBtn, setShowBtn] = useState(true);

    const userId = cookieValue.id;

    useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
        // get the data from the api
        const response = await fetch(`http://localhost:4000/passwords/all/${userId}`);
        // convert the data to json
        const data = await response.json();
        setData(data);
    }
    
    // call the function
    fetchData()
        // make sure to catch any error
        .catch(console.error);
        //eslint-disable-next-line
    }, [])
     

    return (
        <div>
            <div>My Passwords</div>
            <div>
                {
                data ? (
                data.map((mainData, index) => (
                    <div key={index}>
                        <div>
                        <div>Website Name: {mainData.websiteName}</div>
                        <div>
                        {decryptedPassword && decryptedPassword.websiteName===mainData.websiteName ? decryptedPassword.decryptedPassword : '***********'}
                        </div>
                        <button onClick={
                            async ()=>{
                                //setShowBtn(false);
                                const response = await fetch(`http://localhost:4000/passwords/specific/${mainData._id}`,{
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    credentials: 'include',
                                });

                                const passwordData = await response.json();
                                //console.log(passwordData);
                                setDecryptedPassword(passwordData);
                            }
                            }>  Decrypt
                        </button>
                        </div>
                    </div>
                ))) : 
                (
                    <div>
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default PasswordPage