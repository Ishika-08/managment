import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteModal = ({ show, onClose, onDelete }) => {
    if (!show) return null;

    const handleConfirmDelete = () => {
        onDelete();
      };

    return (
        <>
        <Modal show={show} onHide={onClose} animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
          <Button variant="primary" onClick={onClose}>
            Cancel
          </Button>
            </Modal.Footer>
        </Modal>
        </>
  );
}

export default DeleteModal;

