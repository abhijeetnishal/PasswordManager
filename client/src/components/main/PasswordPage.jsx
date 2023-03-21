import React, { useEffect, useState } from 'react'
import DeleteConfirmation from './DeleteConfirmation';
import { Cookies } from 'react-cookie'
import EditPassword from './EditPassword';

const PasswordPage = () => {
    const cookies = new Cookies();
    const cookieValue = cookies.get('myCookie');
    const [data, setData] = useState(null);
    const [decryptedPassword, setDecryptedPassword] = useState(null);
    //const [showBtn, setShowBtn] = useState(true);
    const [showPopUpDelete, setShowPopUpDelete] = useState(false);
    const [showPopUpEdit, setShowPopUpEdit] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [editId, setEditId] = useState(null);

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

    async function decrypt(passwordId){
        //setShowBtn(false);
        const response = await fetch(`http://localhost:4000/passwords/specific/${passwordId}`,{
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
     
    function handleDeleteClick(passwordId){
        setShowPopUpDelete(true);
        setDeleteId(passwordId);
    }

    function handleEditClick(passwordId){
        setShowPopUpEdit(true);
        setEditId(passwordId);
    }

    function handleCloseDialogDelete(){
        setShowPopUpDelete(false);
    }

    function handleCloseDialogEdit(){
        setShowPopUpEdit(false);
    }

    async function handleConfirmationDelete(passwordId){
        const response = await fetch(`http://localhost:4000/passwords/${passwordId}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const passwordData = response.json();
        console.log(passwordData);
        window.location.reload(false);
    }

    async function handleConfirmationEdit(passwordId){

    }

    return (
        <div>
            <div>My Passwords</div>
            <div>
                {
                data ? (
                data.map((mainData, index) => (
                    <div key={index}>
                        <div>
                            <div>
                                <button onClick={()=>handleEditClick(mainData._id)}>Edit</button>
                                {
                                    (showPopUpEdit && editId===mainData._id) && (
                                        <EditPassword
                                            item = {mainData.websiteName}
                                            onClose={handleCloseDialogEdit}
                                            onConfirm={()=>handleConfirmationEdit(mainData._id)}
                                        />
                                    )
                                }
                            </div>
                            <div>
                            <button onClick={()=>handleDeleteClick(mainData._id)}>Delete</button>
                            {
                                (showPopUpDelete && deleteId===mainData._id) && (
                                    <DeleteConfirmation
                                        item={mainData.websiteName}
                                        onClose={handleCloseDialogDelete}
                                        onConfirm={()=>handleConfirmationDelete(mainData._id)}
                                    />
                                )
                            }
                            </div>
                            <div>Website Name: {mainData.websiteName}</div>
                            <div>
                            {decryptedPassword && decryptedPassword.id===mainData._id ? decryptedPassword.decryptedPassword : '***********'}
                            </div>
                            <button onClick={()=> decrypt(mainData._id) }>  Decrypt
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