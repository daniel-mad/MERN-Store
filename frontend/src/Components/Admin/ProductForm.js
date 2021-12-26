import { useState } from 'react';
import { Form, Row, Button, Col } from 'react-bootstrap';

const ProductForm = ({ store, addProduct }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(null);
  const [brand, setBrand] = useState(null);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [category, setCategory] = useState(null);
  const [productFit, setProductFit] = useState(null);
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    const product = {
      product_id: id,
      name,
      image,
      price,
      color,
      size,
      brand,
      category,
      product_fit: productFit,
    };

    addProduct(product);

    setId('');
    setName('');
    setImage('');
    setPrice('');
    setBrand('');
    setColor('');
    setSize('');
    setCategory('');
    setProductFit('');
  };

  const { brands, categories, colors, productfits, sizes, products } = store;
  return (
    <Form
      style={{ marginTop: '2.5rem' }}
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Form.Group as={Row} className="mb-3" controlId="formProductId">
        <Form.Label column sm="2">
          Product ID:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            required
            type="text"
            placeholder="Product ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a product id.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formProductName">
        <Form.Label column sm="2">
          Product Name:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            required
            type="text"
            placeholder="Product name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a product name.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formProductUrl">
        <Form.Label column sm="2">
          Image Url:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            required
            type="text"
            placeholder="Image url"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a product image url.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formProductPrice">
        <Form.Label column sm="2">
          Price:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            required
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a product price.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formProductBrand">
        <Form.Label column sm="2">
          Brand:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            required
            as="select"
            className="form-select"
            value={brand}
            onChange={e => setBrand(e.target.value)}
          >
            <option></option>
            {brands.map(x => (
              <option key={x._id} value={x._id}>
                {x.name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select a product brand.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formProductColor">
        <Form.Label column sm="2">
          Color:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            required
            as="select"
            className="form-select"
            value={color}
            onChange={e => setColor(e.target.value)}
          >
            <option></option>
            {colors.map(x => (
              <option key={x._id} value={x._id}>
                {x.name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select a product color.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formProductSize">
        <Form.Label column sm="2">
          Size:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            required
            as="select"
            className="form-select"
            value={size}
            onChange={e => setSize(e.target.value)}
          >
            <option></option>
            {sizes.map(x => (
              <option key={x._id} value={x._id}>
                {x.name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select a product color.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formProductCategory">
        <Form.Label column sm="2">
          Category:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            required
            as="select"
            className="form-select"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option></option>
            {categories.map(x => (
              <option key={x._id} value={x._id}>
                {x.name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select a product category.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formProductProductFit">
        <Form.Label column sm="2">
          Product Fit:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            required
            as="select"
            className="form-select"
            value={productFit}
            onChange={e => setProductFit(e.target.value)}
          >
            <option></option>
            {productfits.map(x => (
              <option key={x._id} value={x._id}>
                {x.name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select a product fit.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default ProductForm;
