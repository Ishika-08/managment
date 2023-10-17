import {useState} from "react"
import CreateTableModal from "./components/createTableModal"
import {Link, useNavigate} from "react-router-dom"

const Admin = ()=>{
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate()

    const navigateToHome = () => {
      navigate("/Home")
    };

    const handleShow = () => {
      setShow(true);
    };
  
    const handleClose = () => {
      setShow(false);
    };
    return(
        <>
        <button className="btn m-3" onClick={navigateToHome}>
              <i className="fas fa-arrow-left"></i> Back to Home
            </button>
            <h2 className="m-3 text-center">{message}</h2>

            <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row justify-content-center">
                <tr>
                <button className="w-100 btn btn-primary btn-lg mb-4" onClick = {() => handleShow()}>Create Table</button>
                </tr>
                <tr>
                <Link to="/Admin/AddData/" className="w-100 btn btn-secondary btn-lg mb-4">Add Data to table</Link>
                </tr>
                {/* <tr>
                <Link to="/GP" className="w-100 btn btn-success btn-lg mb-4">Work on GP</Link>
                </tr>
                <tr>
                <Link to="/Admin" className="w-100 btn btn-warning btn-lg">Admin</Link>
                </tr> */}
            </div>

            <CreateTableModal 
            show={show} 
            handleClose={handleClose} 
            setMessageCallback={setMessage}
            />
        </div>
        </>
    )
}

export default Admin