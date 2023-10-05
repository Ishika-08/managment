import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; 

const Table = () => {
  const [updatedData, setUpdatedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAnchorValue, setNewAnchorValue] = useState('');
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [updateWebsiteId, setUpdateWebsiteId] = useState()
  const [table, setTable] = useState()

  //to get all the data from checklinks table
  useEffect(() => {
    if (!isModalOpen) {
      // Modal is closed, fetch updated data
      axios
        .get('/check-links/get-links/')
        .then((result) => setUpdatedData(result.data))
        .catch((err) => console.log(err));
    }
  }, [isModalOpen]);

  const handleDelete = (rowId) => {
    axios.delete("/check-links/delete/" + rowId, {})
    .then(()=>{
      const updatedDataCopy = { ...updatedData }; // Create a copy of the original object

    for (const key in updatedDataCopy) {
      if (updatedDataCopy.hasOwnProperty(key)) {
        const updatedRows = updatedDataCopy[key].map((rowData) => {
          if (rowData._id !== rowId) {
            return rowData;
          }
          return null;
        });
    
        // Filter out null values to remove the row with matching rowId
        const filteredRows = updatedRows.filter((rowData) => rowData !== null);
    
        // Update the updatedDataCopy object with the filtered array
        updatedDataCopy[key] = filteredRows;
      }
      }
      setUpdatedData(updatedDataCopy);
    })    
  };

  
  const handleUpdate = (rowId,websiteId,tableName) => {
    setUpdateWebsiteId(websiteId)
    setTable(tableName)
    setSelectedRowId(rowId);
    setIsModalOpen(true);
  };

  const handleModalInputChange = (e) => {
    setNewAnchorValue(e.target.value);
  };

  const handleModalEnterClick = () => {
    axios.put(`/check-links/update/${table}/${updateWebsiteId}`, {newAnchorValue})
    .then(result => console.log(result))
    .catch(err => console.log(err))


    axios
      .put(`/check-links/update-anchor/${selectedRowId}`, {
        newAnchorValue
      })
      .then(() => {
        setIsModalOpen(false);
        setSelectedRowId(null);
        setNewAnchorValue('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className="m-4 text-center">Check Old Links</h1>
      <div>
        {Object.entries(updatedData).map(([key, value]) => (
          <div key={key} className="p-5">
            <h2 className="text-center">{key}</h2>
            <div className="table-responsive" style={{ textAlign: 'center' }}>
              <table className="table table-bordered" style={{ maxWidth: '100%' }}>
              <thead>
                  <tr>
                    <th style={{ maxWidth: '10%' }}>Mailbox</th>
                    <th style={{ maxWidth: '10%' }}>Email</th>
                    <th style={{ maxWidth: '10%' }}>DF</th>
                    <th style={{ maxWidth: '10%' }}>Topic</th>
                    <th style={{ maxWidth: '10%' }}>LTE</th>
                    <th style={{ maxWidth: '10%' }}>AnchorText</th>
                    <th style={{ maxWidth: '10%' }}>PublishedLink</th>
                    <th style={{ maxWidth: '10%' }}>Status</th>
                    <th style={{ maxWidth: '10%' }}>New AnchorText</th>
                    <th style={{ maxWidth: '10%' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {value.map((row) => (
                    <tr key={row._id}>
                      <td style={{ maxWidth: '10%', wordWrap: 'break-word' }}>{row.websiteRow.Mailbox}</td>
                      <td style={{ maxWidth: '10%', wordWrap: 'break-word' }}>{row.websiteRow.Email}</td>
                      <td style={{ maxWidth: '10%', wordWrap: 'break-word' }}>{row.websiteRow.DF}</td>
                      <td style={{ maxWidth: '10%', wordWrap: 'break-word' }}>{row.websiteRow.Topic}</td>
                      <td style={{ maxWidth: '10%', wordWrap: 'break-word' }}>{row.websiteRow.LTE}</td>
                      <td style={{ maxWidth: '10%', wordWrap: 'break-word' }}>{row.websiteRow.AnchorText}</td>
                      <td style={{ maxWidth: '10%', wordWrap: 'break-word' }}>{row.websiteRow.PublishedLink}</td>
                      <td style={{ maxWidth: '10%', wordWrap: 'break-word' }}>{row.websiteRow.Status}</td>
                      <td style={{ maxWidth: '10%', wordWrap: 'break-word' }}>{row.newAnchor}</td>
                      <td style={{ maxWidth: '10%', wordWrap: 'break-word' }}>
                        {row.newAnchor ? (
                          <button
                            className="btn btn-primary"
                            onClick={() => handleUpdate(row._id, row.websiteRow._id, key)}
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
                          onClick={() => handleDelete(row._id)}
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
        ))}
      </div>

      {/* Modal Dialog */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Update Anchor Text"
      >
        <h2>Update Anchor Text</h2>
        <input
          type="text"
          placeholder="New Anchor Text"
          value={newAnchorValue}
          onChange={handleModalInputChange}
        />
        <button onClick={handleModalEnterClick}>Enter</button>
      </Modal>
    </div>
  );
};

export default Table;
