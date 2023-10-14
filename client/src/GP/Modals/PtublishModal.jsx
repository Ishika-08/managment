import { useState, useEffect } from "react";
import axios from "axios"; 
import {Modal, Button} from "react-bootstrap"

const Publish = ({show, onClose, id , site}) => {
  const [formData, setFormData] = useState({
    MailBox: "",
    LTE: "",
    AnchorText: "",
    PublishLink: "",
    DF: "",
    Email: "",
  });


  const table = site?.toUpperCase();
  console.log(table)

  useEffect(() => {
    axios.get(`/content/update/${id}`)
      .then(result => {
        setFormData(prev => ({
            ...prev,
            MailBox: result.data.Mailboxes || "",
            Email: result.data.Email || "",
          Title: result.data.Title || "",
          Site: result.data.Site || "",
        }))
        console.log(result.data)
      })
      .catch(err => console.log(err));

  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/content/add/${table}`, formData)
      .then((result) => {
        onClose()
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Modal show={show} onHide={onClose} >
        <Modal.Header closeButton>
          <Modal.Title>Publish</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            {Object.keys(formData).map((key) => (

              <div className="mb-2" key={key}>
              <label htmlFor={key}>{key}</label>
              {key === "DF" ? (
                <select
                  name={key}
                  className="form-control"
                  onChange={handleChange}
                  value={formData[key]}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              ) : (
                <input
                  type="text"
                  name={key}
                  placeholder={`Enter ${key}`}
                  className="form-control"
                  onChange={handleChange}
                  value={formData[key]}
                />
              )}
            </div>

            ))}
            </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="success" onClick={handleSubmit}>Publish</Button>
        </Modal.Footer>
      </Modal>     
    </>
  );
};

export default Publish;
