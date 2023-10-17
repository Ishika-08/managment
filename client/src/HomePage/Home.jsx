import {Link} from 'react-router-dom'
import Login from "./Modal/LoginModal"
import { useState } from 'react';


const Home = ()=>{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

    const handleAdminLogin = ()=>{
        handleShow()
    }


    return(
        <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row justify-content-center">
                <tr>
                <Link to="/pitch" className="w-100 btn btn-primary btn-lg mb-4">Pitching</Link>
                </tr>
                <tr>
                <Link to="/checkLinks" className="w-100 btn btn-secondary btn-lg mb-4">Check Old Links</Link>
                </tr>
                <tr>
                <Link to="/GP" className="w-100 btn btn-success btn-lg mb-4">Work on GP</Link>
                </tr>
                <tr>
                <button className="w-100 btn btn-warning btn-lg mb-4" onClick={handleAdminLogin}>Admin</button>
                {/* <Link to="/Admin" className="w-100 btn btn-warning btn-lg">Admin</Link> */}
                </tr>
            </div>
        </div>
        <Login
            show={show}
            onClose ={handleClose}
        />
        </>
      
    )
}

export default Home