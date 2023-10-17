import {useState} from "react";
import "./CSS/LoginForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const LoginForm = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);

    axios.get(`/signup/${email}/${password}/`)
    .then(result => {
      console.log(result.data.message)
      setMessage(result.data.message);
      if(result.data.message === true){
        navigate("/Home");
      }
    })
    .catch(err => console.log(err))
  };

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
              <h2 className="mb-4">Sign in</h2>
              <div className="text-center mb-3 pt-2">
            <h3 className="text-danger">{message}</h3>
          </div>
              <div className="form-outline mb-4">
              <label className="form-label mb-1" htmlFor="form3Example3">
                User Id
              </label>
              <input
                type="text"
                id="form3Example3"
                className="form-control form-control-lg"
                placeholder="Enter User Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-outline mb-3">
              <label className="form-label mb-1" htmlFor="form3Example4">
                Password
              </label>
              <input
                type="password"
                id="form3Example4"
                className="form-control form-control-lg"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button 
                  type="button" 
                  className="btn btn-primary btn-lg" 
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} 
                  onClick={handleLogin}>
                  Login
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
