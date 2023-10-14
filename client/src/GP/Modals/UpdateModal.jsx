import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';

function InputField({ label, type, placeholder, value, onChange }) {
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

function Update({show, handleClose, id}) { 
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get('/content/update/' + id)
      .then(result => {
        console.log(result.data);
        setFormData(result.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (fieldName, fieldValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue,
    }));
  };

  const handleSubmit = () => {
    axios.put('/content/update/contents/' + id, formData)
      .then( (result) =>{
        console.log(result.data)
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
              placeholder='Enter Name'
              value={formData.Mailboxes || ""}
              onChange={(e) => handleChange('Mailboxes', e.target.value)}
              name='Mailboxes'
            />

            <InputField
              label='Docs URL'
              type='text'
              placeholder='Enter Name'
              value={formData.DocsURL || ""}
              onChange={(e) => handleChange('DocsURL', e.target.value)}
              name='DocsURL'
            />

            <InputField
              label='Title'
              type='text'
              placeholder='Enter Name'
              value={formData.Title || ""}
              onChange={(e) => handleChange('Title', e.target.value)}
              name='Title'
            />

            <InputField
              label='Email ID'
              type='email'
              placeholder='Enter Name'
              value={formData.Email || ""}
              onChange={(e) => handleChange('Email', e.target.value)}
              name='Email'
            />

            <InputField
              label='Status'
              type='text'
              placeholder='Enter Name'
              value={formData.Status || ""}
              onChange={(e) => handleChange('Status', e.target.value)}
              name='Status'
            />

            <InputField
              label='Site'
              type='text'
              placeholder='Enter Name'
              value={formData.Site || ""}
              onChange={(e) => handleChange('Site', e.target.value)}
              name='Site'
            />

            <InputField
              label='Requirements'
              type='text'
              placeholder='Enter Name'
              value={formData.Requirements || ""}
              onChange={(e) => handleChange('Requirements', e.target.value)}
              name='Requirements'
            />

            <InputField
              label='DF'
              type='text'
              placeholder='Enter Name'
              value={formData.DF || ""}
              onChange={(e) => handleChange('DF', e.target.value)}
              name='DF'
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

