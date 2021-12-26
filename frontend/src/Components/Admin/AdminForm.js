import { useState } from 'react';
import { Col, FloatingLabel, Form, Button, Row, Table } from 'react-bootstrap';
import ItemModal from '../ItemModal';

const AdminForm = ({ items, deleteItem, editItem, addItem }) => {
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState('');
  const [itemId, setItemId] = useState('');

  const closeModal = () => {
    setShowModal(false);
  };

  const setItemValue = (name, id) => {
    setValue(name);
    setItemId(id);
    setShowModal(true);
  };

  const resetValue = () => setValue('');

  return (
    <>
      {showModal ? (
        <ItemModal
          showModal={showModal}
          item={value}
          itemId={itemId}
          closeModal={closeModal}
          editItem={editItem}
          resetValue={resetValue}
        />
      ) : (
        <div>
          {' '}
          <Form
            style={{ marginTop: '2.5rem' }}
            onSubmit={e => {
              e.preventDefault();
              addItem(value);
              setValue('');
            }}
          >
            <Row>
              <Col xs={8}>
                <FloatingLabel label="Add" className="mb-3">
                  <Form.Control
                    type="text"
                    onChange={e => setValue(e.target.value)}
                    value={value}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <Button type="submit">Add</Button>
              </Col>
            </Row>
          </Form>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items?.map(item => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>
                    <Button
                      variant="success"
                      className="float-end mx-3"
                      onClick={() => {
                        setItemValue(item.name, item._id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="float-end"
                      onClick={() => {
                        deleteItem(item._id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default AdminForm;
