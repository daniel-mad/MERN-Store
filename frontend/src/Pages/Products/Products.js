import { useEffect, useState } from 'react';
import './Products.css';
import { getStore } from '../../utils/getStore';
import { Accordion, Form, Button, Container, Card } from 'react-bootstrap';

const Products = () => {
  const [store, setStore] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const newStore = await getStore();

        setStore(newStore);
        setProducts(newStore.products);
      } catch (error) {
        setStore({});
      }
    }

    fetchData();
  }, []);
  const { brands, categories, colors, productfits, sizes } = store;

  return (
    <Container id="product-main">
      <aside id="product-aside">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Brands</Accordion.Header>
            <Accordion.Body>
              {brands?.map(brand => {
                return <Form.Check key={brand._id} label={brand.name} />;
              })}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Categories</Accordion.Header>
            <Accordion.Body>
              {categories?.map(cat => {
                return <Form.Check key={cat._id} label={cat.name} />;
              })}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Colors</Accordion.Header>
            <Accordion.Body>
              {colors?.map(color => {
                return <Form.Check key={color._id} label={color.name} />;
              })}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Product Fit</Accordion.Header>
            <Accordion.Body>
              {productfits?.map(productfit => {
                return (
                  <Form.Check key={productfit._id} label={productfit.name} />
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Sizes</Accordion.Header>
            <Accordion.Body>
              {sizes?.map(size => {
                return <Form.Check key={size._id} label={size.name} />;
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="d-grid gap-2">
          <Button>Search</Button>
        </div>
      </aside>
      <div id="products">
        {products?.map(product => {
          return (
            <Card key={product._id} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.price} $</Card.Text>
                <Button>Add to cart</Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </Container>
  );
};

export default Products;
