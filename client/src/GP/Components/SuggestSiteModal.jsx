import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const WebsiteModal = ({ websitesFound, website, handleSelect, show, onHide}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Website Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table-light table-bordered mb-0">
          <thead>
            <tr>
              <th scope="col">Website Name</th>
              <th scope="col">Presence</th>
              <th scope="col">Select</th>
            </tr>
          </thead>
          <tbody>
            {website.map((websiteName, index) => {
              const isPresent = websitesFound.includes(websiteName);
              const textColorClass = isPresent ? 'text-success' : 'text-danger';

              return (
                <tr key={index}>
                  <td>{websiteName}</td>
                  <td className={textColorClass}>{isPresent ? 'Present' : 'Not Present'}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleSelect(websiteName);
                      }}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WebsiteModal;
