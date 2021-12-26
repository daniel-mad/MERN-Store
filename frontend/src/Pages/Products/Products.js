import { useEffect, useState } from 'react';
import './Products.css';
import { getStore } from '../../utils/getStore';
import { Accordion, Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';

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

  const handleSearch = async () => {
    const search = ['product_fit', 'size', 'color', 'category', 'brand'];
    const brands_checkbox = Array.from(
      document.querySelectorAll("input[name='brand']:checked")
    );

    const brand_search = brands_checkbox
      .map(e => e.nextSibling.innerText)
      .join(',');

    const categories_checkbox = Array.from(
      document.querySelectorAll("input[name='category']:checked")
    );

    const category_search = categories_checkbox
      .map(e => e.nextSibling.innerText)
      .join(',');

    const color_checkbox = Array.from(
      document.querySelectorAll("input[name='color']:checked")
    );

    const color_search = color_checkbox
      .map(e => e.nextSibling.innerText)
      .join(',');

    const productFit_checkbox = Array.from(
      document.querySelectorAll("input[name='productFit']:checked")
    );

    const product_fit_search = productFit_checkbox
      .map(e => e.nextSibling.innerText)
      .join(',');

    const size_checkbox = Array.from(
      document.querySelectorAll("input[name='size']:checked")
    );

    const size_search = size_checkbox
      .map(e => e.nextSibling.innerText)
      .join(',');

    let url = 'products/search?';
    if (brand_search) url += `brand=${brand_search}&&`;
    if (category_search) url += `category=${category_search}&&`;
    if (color_search) url += `color=${color_search}&&`;
    if (product_fit_search) url += `product_fit=${product_fit_search}&&`;
    if (size_search) url += `size=${size_search}&&`;

    if (
      brand_search ||
      category_search ||
      color_search ||
      product_fit_search ||
      size_search
    )
      url = url.slice(0, -2);
    try {
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container id="product-main">
      <aside id="product-aside">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Brands</Accordion.Header>
            <Accordion.Body>
              {brands?.map(brand => {
                return (
                  <Form.Check key={brand._id} name="brand" label={brand.name} />
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Categories</Accordion.Header>
            <Accordion.Body>
              {categories?.map(cat => {
                return (
                  <Form.Check key={cat._id} name="category" label={cat.name} />
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Colors</Accordion.Header>
            <Accordion.Body>
              {colors?.map(color => {
                return (
                  <Form.Check key={color._id} name="color" label={color.name} />
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Product Fit</Accordion.Header>
            <Accordion.Body>
              {productfits?.map(productfit => {
                return (
                  <Form.Check
                    key={productfit._id}
                    name="productFit"
                    label={productfit.name}
                  />
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Sizes</Accordion.Header>
            <Accordion.Body>
              {sizes?.map(size => {
                return (
                  <Form.Check key={size._id} name="size" label={size.name} />
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="d-grid gap-2">
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </aside>
      {products.length == 0 && (
        <div className="w-100" style={{ marginTop: '2.5rem' }}>
          <h1 className="text-center">We couldn't find any matching...</h1>
        </div>
      )}
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
