import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

function MyModal({ show, handleClose, setMessageCallback}) {
  const [website, setWebsite] = useState();
  const [MailBox, setMailbox] = useState();

  const handleWebsiteChange = (e) => {
    setWebsite(e.target.value);
  };

  const handleMailboxChange = (e) => {
    setMailbox(e.target.value);
  };

  const handleSubmit = () => {
    console.log("in handleSubmit")
    axios.post(`/admin/${website}`, {MailBox})
    .then((response) => {
        setMessageCallback(response.data.message);
        alert(response.data.message)
        handleClose()
    })
    .catch((error) => {
        setMessageCallback(error.response.data.error);
        alert(error.response.data.error)
        handleClose()
    })
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Table</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Website"
              value={website}
              onChange={handleWebsiteChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>MailBox</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter MailBox"
              value={MailBox}
              onChange={handleMailboxChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
