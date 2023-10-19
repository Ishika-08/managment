import {useState} from "react"
import {Link, useNavigate} from "react-router-dom"

const Admin = ()=>{
    const navigate = useNavigate()

    const navigateToHome = () => {
      navigate("/Home")
    };

   
    return(
        <>
        <button className="btn m-3" onClick={navigateToHome}>
              <i className="fas fa-arrow-left"></i> Back to Home
            </button>
            <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row justify-content-center">
                <tr>
                <Link to="/admin/show_websites/" className="w-100 btn btn-success btn-lg mb-4">Show Websites</Link>
                </tr>
                <tr>
                <Link to="/Admin/AddData/" className="w-100 btn btn-secondary btn-lg mb-4">Add Data to table</Link>
                </tr>
            </div>

        
        </div>
        </>
    )
}

export default Admin