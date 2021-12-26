import { useState, useEffect } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import AdminForm from '../../Components/Admin/AdminForm';
import { getStore } from '../../utils/getStore';
import ProductForm from '../../Components/Admin/ProductForm';
import axios from 'axios';
import Alert from '../../Components/Alert';

const Admin = () => {
  const [store, setStore] = useState({});
  const [current, setCurrent] = useState([]);
  const [currentName, setCurrentName] = useState('brands');
  const [isProducts, setIsProducts] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const newStore = await getStore();

        setStore(newStore);
        setCurrent(newStore.brands);
      } catch (error) {
        setStore({});
      }
    }

    fetchData();
  }, []);

  // const { brands, categories, colors, productfits, sizes, products } = store;
  const changeCurrent = (name, items) => {
    if (name !== 'products') {
      setIsProducts(false);
      setCurrent(items);
      setCurrentName(name);
    } else {
      setIsProducts(true);
    }
  };

  const createListGroup = () => {
    let arr = [];
    for (const [key, value] of Object.entries(store)) {
      arr.push(
        <ListGroup.Item action onClick={() => changeCurrent(key, value)}>
          {key[0].toUpperCase() + key.slice(1)}
        </ListGroup.Item>
      );
    }
    return arr;
  };

  const setAlert = () => {
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 2000);
  };

  const deleteItem = async id => {
    try {
      const url = `/${currentName}/${id}`;
      const res = await axios.delete(url);
      setAlert();
      setAlertSeverity('success');
      setAlertMessage(`${res.data.name} successfully deleted.`);
      const newStore = await getStore();
      setStore(newStore);
      for (const [key, val] of Object.entries(newStore)) {
        if (key === currentName) setCurrent(val);
      }
    } catch (error) {
      console.log(error);
      setAlert();
      setAlertSeverity('danger');
      setAlertMessage(error);
    }
  };

  const editItem = async (id, value) => {
    const url = `/${currentName}/${id}`;
    try {
      const found = current.find(
        c => c.name.toLowerCase() === value.toLowerCase()
      );
      if (found || !value) {
        setAlert();
        setAlertSeverity('danger');
        setAlertMessage('Item cannot be edited, Please check item name.');
        return;
      }
      const res = await axios.put(url, { name: value });
      setAlert();
      setAlertSeverity('success');
      setAlertMessage(`${res.data.name} successfully edited.`);
      const newStore = await getStore();
      setStore(newStore);
      for (const [key, val] of Object.entries(newStore)) {
        if (key === currentName) setCurrent(val);
      }
    } catch (error) {
      console.log(error);
      setAlert();
      setAlertSeverity('danger');
      setAlertMessage(error);
    }
  };

  const addItem = async name => {
    const url = `/${currentName}`;
    try {
      const found = current.find(
        c => c.name.toLowerCase() === name.toLowerCase()
      );
      if (found || !name) {
        setAlert();
        setAlertSeverity('danger');
        setAlertMessage('Item cannot be added, Please check item name.');
        return;
      }
      const res = await axios.post(url, { name });
      setAlert();
      setAlertSeverity('success');
      setAlertMessage(`${res.data.name} successfully added.`);
      const newStore = await getStore();
      setStore(newStore);
      for (const [key, val] of Object.entries(newStore)) {
        if (key === currentName) setCurrent(val);
      }
    } catch (error) {
      console.log(error);
      setAlert();
      setAlertSeverity('danger');
      setAlertMessage(error);
    }
  };
  const addProduct = async product => {
    const url = `/products`;
    try {
      const found = store.products.find(
        c => c.product_id.toLowerCase() === product.product_id.toLowerCase()
      );
      if (found || product.price <= 0) {
        setAlert();
        setAlertSeverity('danger');
        setAlertMessage('Product cannot be added, Please check product id.');
        return;
      }
      const res = await axios.post(url, product);
      setAlert();
      setAlertSeverity('success');
      setAlertMessage(`${res.data.name} successfully added.`);
      const newStore = await getStore();
      setStore(newStore);
    } catch (error) {
      console.log(error);
      setAlert();
      setAlertSeverity('danger');
      setAlertMessage(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={3}>
          <ListGroup style={{ marginTop: '2.5rem' }}>
            {createListGroup()}
          </ListGroup>
        </Col>
        <Col>
          {isAlert && <Alert variant={alertSeverity} message={alertMessage} />}
          {isProducts ? (
            <ProductForm store={store} addProduct={addProduct} />
          ) : (
            <AdminForm
              items={current}
              deleteItem={deleteItem}
              editItem={editItem}
              addItem={addItem}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
