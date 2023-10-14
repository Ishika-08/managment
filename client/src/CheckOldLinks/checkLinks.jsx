import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./checkLinks.css"
import {Modal, Button} from 'react-bootstrap';
import NoteModal from './components//NoteModal'; 
import DeleteModal from "./components/DeleteModal"
import { useNavigate } from 'react-router-dom';

const Table = () => {
  const [updatedData, setUpdatedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAnchorValue, setNewAnchorValue] = useState('');
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedCheckLId, setSelectedCheckLId] = useState(null);
  const [updateWebsiteId, setUpdateWebsiteId] = useState()
  const [selectedKey, setSelectedKey] = useState(null); // State to track the selected key
  const [selectedTable, setSelectedTable] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [noteAdded, setNoteAdded] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);

  // Use useEffect to trigger handleNavbar when noteAdded changes
  useEffect(() => {
    if (noteAdded || !isDeleteModalOpen || !isModalOpen) {
      console.log("trigerred")
      handleNavbar(selectedKey, selectedTable);
      setNoteAdded(false); 
    }
  }, [noteAdded, selectedKey, selectedTable, isDeleteModalOpen, isModalOpen]);


  //used to handle deleting row
  const handleDelete = (row) => {
    setDeleteRow(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    axios.delete("/check-links/delete/" + deleteRow._id, {})
      .then((result)=>{
        console.log(result)
      })
      .catch(err =>{
        console.log(err)
      }) 


    //to delete from website table
    axios.delete(`/check-links/delete/table/${selectedTable}`, {
      data: {
        id: deleteRow.websiteRow._id, 
      }})
    .then(res => {
      console.log(res.data)
    })
    .catch(err => console.log(err))

    setIsDeleteModalOpen(false)
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };


//used for notemodal
  const handleShowModal = (rowId, checkLId) => {
    setSelectedRowId(rowId);
    setSelectedCheckLId(checkLId);
    setShowModal(true);
  };
  
  
  const handleCloseModal = () => {
    setShowModal(false);    
  };


  

  const website = {
    CT: "CTModel",
    H4: "H4Model",
    Can: "CanModel",
    TH: "THModel",
    TPlus: "TPlusModel",
    FAO: "FAOModel",
    FP: "FPModel",
    SC: "SCModel",
    TW: "TWModel",
    VE: "VEModel"
  };


  const handleNavbar = (model, key) =>{
    setSelectedKey(model)
    setSelectedTable(key)
        axios
            .get(`/check-links/get-links/${model}`)
            .then((result) => {setUpdatedData(result.data)
            console.log(result.data)})
            .catch((err) => console.log(err));
  }
  
 

  //used for update modal
  const handleUpdate = (rowId,websiteId) => {
    setUpdateWebsiteId(websiteId)
    setSelectedRowId(rowId);
    setIsModalOpen(true);
  };

  const handleModalInputChange = (e) => {
    setNewAnchorValue(e.target.value);
  };

  const handleModalEnterClick = () => {
    axios.put(`/check-links/update/${selectedTable}/${selectedRowId}`, {newAnchorValue, updateWebsiteId})
    .then(result => {
      setIsModalOpen(false)
      setSelectedRowId(null);
      setNewAnchorValue('');
    })
    .catch(err => console.log(err))
  };

  //used to navigate to home page
  const navigate = useNavigate()
  const navigateToHome = () => {
    navigate("/")
  };

  return (
    <div>
    <button className="btn m-3" onClick={navigateToHome}>
              <i className="fas fa-arrow-left"></i> Back to Home
    </button>


    <div>
    <div>
      <nav className="navbar d-flex justify-content-center align-items-center">
          <div className="button-wrapper"> 
            {Object.keys(website).map((key) => (
              <button
                key={key}
                className={`button ${selectedKey === key ? 'button-primary' : 'button-secondary'}`}
                onClick={() => handleNavbar(website[key], key)}
              >
                {key}
              </button>
            ))}
          </div>
      </nav>
    </div>


      
        {(<div>      
          <div key={selectedKey} className="p-5">
            <h2 className="text-center" style={{ backgroundColor: '#F0F0F0', color: '#333', padding: '10px 0', margin: '0', fontSize: '20px', width: '100%', textAlign: 'center' }}>
              {selectedTable}
            </h2>
            <div className="table-responsive" style={{ textAlign: 'center', overflowX: 'auto' }}>
              <table className="table table-bordered" style={{ width: '100%', tableLayout: 'fixed' }}>
                <colgroup>
                  <col style={{ width: '9%' }} />
                  <col style={{ width: '9%' }} />
                  <col style={{ width: '9%' }} />
                  <col style={{ width: '9%' }} />
                  <col style={{ width: '9%' }} />
                  <col style={{ width: '9%' }} />
                  <col style={{ width: '9%' }} />
                  <col style={{ width: '9%' }} />
                  <col style={{ width: '9%' }} />
                  <col style={{ width: '9%' }} />
                  <col style={{ width: '9%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>Mailbox</th>
                    <th>Email</th>
                    <th>DF</th>
                    <th>Topic</th>
                    <th>LTE</th>
                    <th>AnchorText</th>
                    <th>PublishedLink</th>
                    <th>Status</th>
                    <th>New AnchorText</th>
                    <th>Note</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedData.map((row) => (
                    <tr key={row._id}>
                      <td>{row.websiteRow.Mailbox}</td>
                      <td>{row.websiteRow.Email}</td>
                      <td>{row.websiteRow.DF}</td>
                      <td>{row.websiteRow.Topic}</td>
                      <td>
                        {row.websiteRow.LTE ? (
                          <a href={row.websiteRow.LTE} target="_blank" rel="noopener noreferrer">
                            {row.websiteRow.LTE}
                          </a>
                        ) : (
                          'N/A' 
                        )}
                      </td>
                      <td>
                        {row.websiteRow.AnchorText}
                      </td>
                      <td>
                        <a href={row.websiteRow.PublishedLink} target="_blank" rel="noopener noreferrer">
                          {row.websiteRow.PublishedLink}
                        </a>
                      </td>
                      <td>{row.websiteRow.Status}</td>
                      <td>{row.newAnchor}</td>
                      <td>
                      {row.websiteRow.Note !== undefined && (
                        <div>
                          {row.websiteRow.Note}
                        </div>
                      )}
                      <Button variant="primary" onClick={() => handleShowModal(row.websiteRow._id, row._id)}>
                        Add note
                      </Button>
                      </td>
                      <td>
                        {row.newAnchor ? (
                          <button
                            className="btn btn-primary"
                            onClick={() => handleUpdate(row._id, row.websiteRow._id, selectedKey)}
                          >
                            Update
                          </button>
                        ) : (
                          <button className="btn btn-secondary" disabled>
                            Update
                          </button>
                        )}
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(row)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>)}
      </div>

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Update Anchor Text</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="New Anchor Text"
            value={newAnchorValue}
            className="form-control"
            onChange={handleModalInputChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalEnterClick}>
            Enter
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Render the BootstrapModal component */}
      <NoteModal 
      show={showModal} 
      onClose={handleCloseModal} 
      id={selectedRowId} 
      table={selectedTable} 
      checkLId={selectedCheckLId}
      onNoteAdded={() => setNoteAdded(true)}
      />

    <DeleteModal
        show={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleConfirmDelete}
      />
      </div>

      

  );
}

export default Table;

