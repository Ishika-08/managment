import React, { useEffect, useState } from "react";
import axios from "axios"
import CreateTableModal from "./components/createTableModal"
import { useNavigate } from "react-router-dom";


const TableComponent = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("")
  const [show, setShow] = useState(false);
  const navigate= useNavigate()


  useEffect(()=>{
    axios.get("/admin/websites/")
    .then((result) =>{
        console.log(result.data)
      setData(result.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [message])

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = (id) => {
    console.log("in handleDelete" + id)
    axios.delete(`/admin//delete/${id}`)
    .then(result =>{
        setMessage(result.data.message)
    })
    .catch((err) =>{
        console.log(err)
    }
    )
  };

  const navigateToHome = () =>{
    navigate("/Admin")
  }

  return (
    <div>
    <button className="btn m-5" onClick={navigateToHome}>
              <i className="fas fa-arrow-left"></i> Back to Home
    </button>

    <h1 className="text-center m-3">Website Table Management</h1>
    <button className="btn btn-primary btn-lg mx-5 my-3" onClick={() => handleShow()}>
          Create Table
     </button>
      <section className="w-50 intro m-5">

        <div className="table-responsive" style={{ textAlign: 'center', overflowX: 'auto' }}>
          <h2 className="text-success my-3">{message}</h2>
          <table className="table table-bordered" style={{ width: '100%', tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '30%' }} />
              <col style={{ width: '30%' }} />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="col-1">
                  <h3>Table Name</h3>
                </th>
                <th scope="col" className="col-1">
                  <h3>Action</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((value, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <h5>{value.Website}</h5>
                    </td>
                    <td>
                      <button className="btn btn-lg btn-danger" onClick={() => handleDelete(value.Website)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <CreateTableModal show={show} handleClose={handleClose} setMessageCallback={setMessage} />
      </section>
      </div>
  );
};

export default TableComponent;
