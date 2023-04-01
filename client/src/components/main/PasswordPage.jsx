import React, { useEffect, useState } from 'react'
import DeleteConfirmation from './DeleteConfirmation';
import { Cookies } from 'react-cookie'
import '../../styles/PasswordPage.css'
import EditPassword from './EditPassword';
import commonWebsiteSymbolImg from '../../assets/commonWebsiteSymbol.png' 
import decryptBtnImg from '../../assets/decryptBtn.png'
import editBtnImg from '../../assets/editBtnImg.png'
import deleteBtn from '../../assets/deleteBtnblue.png'

const PasswordPage = () => {
    const cookies = new Cookies();
    const cookieValue = cookies.get('myCookie');
    
    const [data, setData] = useState(null);
    const [decryptedPassword, setDecryptedPassword] = useState(null);

    const [showBtn, setShowBtn] = useState(false);

    const [showPopUpDelete, setShowPopUpDelete] = useState(false);
    const [showPopUpEdit, setShowPopUpEdit] = useState(false);

    const [deleteId, setDeleteId] = useState(null);
    const [editId, setEditId] = useState(null);
    
    const [updateData, setUpdateData] = useState({websiteName:'', password:''});
    const [updateBtnClick, setUpdateBtnClick] = useState(false);

    const [dataLength, setDataLength] = useState(0);

    const userId = cookieValue.id;

    useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
        // get the data from the api
        const response = await fetch(`https://passwordmanager-nbfr.onrender.com/passwords/all/${userId}`);
        // convert the data to json
        const data = await response.json();
        setData(data);
        setDataLength(data.length);
        //console.log(data);
    }
    
    // call the function
    fetchData()
        // make sure to catch any error
        .catch(console.error);
    //eslint-disable-next-line
    }, [])

    async function decrypt(passwordId){
        showHidebtn();
        const response = await fetch(`https://passwordmanager-nbfr.onrender.com/passwords/specific/${passwordId}`,{
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

    function showHidebtn(){
        setShowBtn(!showBtn);
    }

    async function handleConfirmationDelete(passwordId){
        const response = await fetch(`https://passwordmanager-nbfr.onrender.com/passwords/${passwordId}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            });

        response.json().then(data => ({
            data: data,
            status: response.status
        })
        ).then(res => {
            //console.log(res.status, res.data);
            window.location.reload(false);
        })
    }

    useEffect(() => {
        setUpdateData(updateData);
        //console.log(updateData);

        const websiteName = updateData.websiteName;
        const password = updateData.password;
        if(websiteName!=='' && password!=='' && updateBtnClick){
            //console.log(updateData);
            const fetchData = async () => {
                // get the data from the api
                const response = await fetch(`https://passwordmanager-nbfr.onrender.com/passwords/${editId}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        websiteName,
                        password
                    }),
                    credentials: 'include',
                });
                response.json().then(data => ({
                    data: data,
                })
                ).then(res => {
                    //console.log(res.data);
                    window.location.reload(false);
                })
            }
            
            // call the function
            fetchData()
            // make sure to catch any error
            .catch(console.error);
        }
        //eslint-disable-next-line
      }, [updateData]);

    return (
        <div className='main-container'>
            <div className='headingContainer'>
                <div className='yourSavedPasswordText'>
                    Your Saved Passwords
                </div>
                <button className='addNewPassword'>
                    <div className='addNewText'>+Add New</div>
                </button>
            </div>
            
            <div className='sub-main-container'>
                {
                (dataLength) ? 
                    (data.map((mainData, index) => (
                        <div className='singlePasswordContainer' key={index}>
                            <div className='namePasswordDecryptContainer'>
                                <img className='commonWebsiteImg' src={commonWebsiteSymbolImg} alt="" />
                                <div className='namePasswordContainer'>
                                    <div className='subWebsiteNameContainer'>
                                        {mainData.websiteName}
                                    </div>
                                    <div className='subPasswordContainer'>
                                        Password: {(showBtn && decryptedPassword && decryptedPassword.id===mainData._id) ? decryptedPassword.decryptedPassword : '***********'}
                                    </div>
                                </div>
                                <button className='decryptBtn' onClick={()=> decrypt(mainData._id)}>
                                    <img className='decryptBtnImg' src={decryptBtnImg} alt="" />
                                </button>
                            </div>
                            <div className='editDeleteContainer'>
                                <div className='editContainer'>
                                    <button className='editSubContainer' onClick={()=>handleEditClick(mainData._id)}>
                                        <img className='editImg' src={editBtnImg} alt="" />
                                        <div className='editText'>Edit</div>
                                    </button>
                                    {
                                        (showPopUpEdit && editId===mainData._id) && (
                                            <EditPassword
                                                item = {mainData.websiteName}
                                                onClose={handleCloseDialogEdit}
                                                editData = {setUpdateData}
                                                updateBtn = {setUpdateBtnClick}
                                            />
                                        )
                                    }
                                </div>
                                <div className='deleteContainer'>
                                    <button className='deleteSubContainer' onClick={()=>handleDeleteClick(mainData._id)}>
                                        <img className='deleteImg' src={deleteBtn} alt="" />
                                        <div className='deleteTextBtn'>Delete</div>
                                    </button> 
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
                            </div>
                        </div>
                    ))
                    ) : 
                    (
                        <div>
                            You haven't saved any password.
                        </div>       
                    )
                }
            </div>
        </div>
    )
}

export default PasswordPage