import React, { useState, useEffect } from 'react';
import axios from "axios"

const Table = () => {
  const [updatedData, setUpdatedData] = useState([]);

  useEffect(()=>{
    axios.get("/check-links/get-links/")
  .then(result => setUpdatedData(result.data))
  .catch(err => console.log(err))
  },[])

  

  console.log(updatedData)

  const handleDelete = (rowId) => {
    
    const updatedRows = updatedData.filter((row) => row.websiteRow._id !== rowId);
    setUpdatedData(updatedRows);
  };

  const handleUpdate = (rowId) => {
   
  };

  return (
    <div>
      <h1 className="m-4 text-center">Check Old Links</h1>
        <div>
        {Object.entries(updatedData).map(([key, value]) => (
  <div key={key} className='p-5'>
    <h2 className="text-center">{key}</h2>
    <div className="table-responsive" style={{ textAlign: 'center' }}>
      <table className="table table-bordered" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={{ width: '10%' }}>Mailbox</th>
            <th style={{ width: '10%' }}>Email</th>
            <th style={{ width: '10%' }}>DF</th>
            <th style={{ width: '10%' }}>Topic</th>
            <th style={{ width: '10%' }}>LTE</th>
            <th style={{ width: '10%' }}>AnchorText</th>
            <th style={{ width: '10%' }}>PublishedLink</th>
            <th style={{ width: '10%' }}>Status</th>
            <th style={{ width: '10%' }}>New AnchorText</th>
            <th style={{ width: '10%' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {value.map((row) => (
            <tr key={row._id}>
              <td style={{ width: '10%' }}>{row.websiteRow.Mailbox}</td>
              <td style={{ width: '10%' }}>{row.websiteRow.Email}</td>
              <td style={{ width: '10%' }}>{row.websiteRow.DF}</td>
              <td style={{ width: '10%' }}>{row.websiteRow.Topic}</td>
              <td style={{ width: '10%' }}>{row.websiteRow.LTE}</td>
              <td style={{ width: '10%' }}>{row.websiteRow.AnchorText}</td>
              <td style={{ width: '10%' }}>{row.websiteRow.PublishedLink}</td>
              <td style={{ width: '10%' }}>{row.websiteRow.Status}</td>
              <td style={{ width: '10%' }}>{row.newAnchor}</td>
              <td style={{ width: '10%' }}>
                {row.newAnchor ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleUpdate(row.websiteRow._id)}
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
                  onClick={() => handleDelete(row.websiteRow._id)}
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
    </div>
  );
};

export default Table