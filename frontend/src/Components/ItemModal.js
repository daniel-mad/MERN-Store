import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const ItemModal = ({
  showModal,
  item,
  closeModal,
  itemId,
  editItem,
  resetValue,
}) => {
  const [show, setShow] = useState(showModal);
  const [value, setValue] = useState(item);

  const handleClose = () => {
    setShow(false);
    closeModal();
    resetValue();
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            onChange={e => setValue(e.target.value)}
            value={value}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              editItem(itemId, value);
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ItemModal;
