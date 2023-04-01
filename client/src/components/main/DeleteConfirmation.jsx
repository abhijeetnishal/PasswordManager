import '../../styles/DeleteConfirmation.css'
import deleteBtn from '../../assets/delete-btn.png'

const DeleteConfirmation = (props) => {

  const {passwordId ,item , onClose} = props;

  async function handleConfirmationDelete(){
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

  return (
    <div onClick={onClose} className='deletOverlay'>
      <div onClick={(e) => {e.stopPropagation();}} className='deleteModalContainer'>
            <div className="deleteConfirmation">
              Are you sure you want to delete {item} Data?
            </div>
            <div className='deleteConfirmationMessage'>
              Once you delete we will not be able to undo it. Delete only if you are sure about it.
            </div>
            <div className="deleteBtnContainer">
              <button className='closeBtn' onClick={onClose}>Cancel</button> 
              <button className='deleteBtn' onClick={handleConfirmationDelete}>
                <img className='deleteBtnImg' src={deleteBtn} alt="" />
                <div className='deleteText'>Delete</div>
              </button>
            </div>
      </div>
    </div>
  )
}

export default DeleteConfirmation