import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

const PasswordPage = () => {
    //eslint-disable-next-line
    const [cookies, setCookies] = useCookies(["access_token"]);
    const [data, setData] = useState(null);

    const userId = cookies.access_token.id;

    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
            // get the data from the api
            const response = await fetch(`http://localhost:4000/passwords/all/${userId}`);
            // convert the data to json
            const data = await response.json();
            setData(data);

            console.log(data);
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
                <ul>
                    {data.map((mainData) => (
                    <li key={mainData._id}>
                        <div>
                        <h2>{mainData.websiteName}</h2>
                        <h2>{mainData.password}</h2>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PasswordPage