import React from 'react'

const DeleteConfirmation = (props) => {

    const {item, onConfirm, onClose} = props;

  return (
    <div className="dialog-container">
      <div className="dialog">
        <div className="dialog-message">
          Are you sure you want to delete {item} Password
        </div>
        <div className="dialog-buttons">
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmation