import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from "axios"

function BootstrapModal({ show, onClose, id, table, checkLId, onNoteAdded }) {
  const [noteText, setNoteText] = useState(''); 

  const handleClose = () => {
    onClose()
  };

  const handleAddNote = () => {
    console.log('Note text:', noteText,id,table);
    axios.put(`/content/update/${table}`, {_id: id, Note: noteText, checkLId: checkLId})
    .then((result)=>{
     console.log("updated")
     onNoteAdded()
    })
    .catch(err =>{
      console.log(err)
    })
    onClose();

   
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="noteInput">Note:</label>
          <input
            type="text"
            className="form-control"
            id="noteInput"
            placeholder="Enter your note here"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAddNote}>
          ADD
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BootstrapModal;
