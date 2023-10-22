import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';


function InputField({ label, type, placeholder, value, onChange, options}) {
  if (options) {
    return (
      <div className='mb-2'>
        <label htmlFor=''>{label}</label>
        <select
          className='form-control'
          value={value}
          onChange={onChange}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  } else {
    return (
      <div className='mb-2'>
        <label htmlFor=''>{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          className='form-control'
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}

function Update({ show, handleClose, id, handleUpdateSuccess }) {
  const [formData, setFormData] = useState({});
  const [site, setSite] = useState([]);
  const [Mailbox, setMailbox] = useState([])

  useEffect(() => {
    axios.get('/content/update/' + id)
      .then(result => {
        console.log(result.data);
        setFormData(result.data);
      })
      .catch(err => console.log(err));

      axios.get("/admin/websites/")
      .then((result) =>{
        const Mailbox = result.data.map((entry) => entry.MailBox);
        const websites = result.data.map((entry) => entry.Website);
        setSite([" ", ...websites]);
        setMailbox([" ", ...Mailbox]);
      })
      .catch(err => {
        console.log(err)
      })
  }, [id]);

  const handleChange = (fieldName, fieldValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue,
    }));
  };

  const handleSubmit = () => {
    axios.put('/content/update/contents/' + id, formData)
      .then((result) => {
        console.log(result.data)
        handleUpdateSuccess(id);
        handleClose()
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
              <InputField
                label='Mailboxes'
                type='text'
                placeholder='Enter Mailbox'
                value={formData.Mailboxes || ""}
                onChange={(e) => handleChange('Mailboxes', e.target.value)}
                options={Mailbox}
              />

              <InputField
                label='Docs URL'
                type='text'
                placeholder='Enter Docs URL'
                value={formData.DocsURL || ""}
                onChange={(e) => handleChange('DocsURL', e.target.value)}
              />

              <InputField
                label='Title'
                type='text'
                placeholder='Enter Title'
                value={formData.Title || ""}
                onChange={(e) => handleChange('Title', e.target.value)}
              />

              <InputField
                label='Email ID'
                type='email'
                placeholder='Enter Email'
                value={formData.Email || ""}
                onChange={(e) => handleChange('Email', e.target.value)}
              />

              <InputField
                label='Status'
                type='text'
                placeholder='Enter Status'
                value={formData.Status || ""}
                onChange={(e) => handleChange('Status', e.target.value)}
                options={[" ", "sent", "pending", "Link Added"]}
              />

              <InputField
                label='Site'
                value={formData.Site || ""}
                onChange={(e) => handleChange('Site', e.target.value)}
                options={site}
              />

              <InputField
                label='Requirements'
                type='text'
                placeholder='Enter Requirements'
                value={formData.Requirements || ""}
                onChange={(e) => handleChange('Requirements', e.target.value)}
              />

              <InputField
                label='DF'
                value={formData.DF || ""}
                onChange={(e) => handleChange('DF', e.target.value)}
                options={[" ","yes", "no"]}
              />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Update;
