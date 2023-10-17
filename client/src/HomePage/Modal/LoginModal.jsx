import {Button, Form, Modal} from "react-bootstrap"
import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"

function LogIn({show, onClose}) {

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Admin Id:", adminId);
    console.log("Password:", password);

    axios.get(`/signup/admin/${adminId}/${password}/`)
    .then(result => {
      console.log(result.data.message)
      setMessage(result.data.message);
      if(result.data.message === true){
        navigate("/Admin");
      }
    })
    .catch(err => console.log(err))
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <h3 className="text-danger mb-3 text-center">{message}</h3>
        <div className="col-md-9 col-lg-6 col-xl-5 m-4">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Admin id</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Admin Id"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

          </Form>

        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={handleLogin}>
        Login
      </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogIn;
