import { useState } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);
  const imagesPath = process.env.PUBLIC_URL + '/assets/images';

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          style={{ height: '70vh' }}
          className="d-block w-100"
          src={`${imagesPath}/caru-1.jpg`}
          alt="First slide"
        />
        <Carousel.Caption>
          <Button style={{ marginBottom: '10rem' }}>
            <Link to="/products">Shop</Link>
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: '70vh' }}
          className="d-block w-100"
          src={`${imagesPath}/caru-2.jpg`}
          alt="Second slide"
        />
        <Carousel.Caption>
          <Button style={{ marginBottom: '10rem' }}>
            <Link to="/products">Shop</Link>
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: '70vh' }}
          className="d-block w-100"
          src={`${imagesPath}/caru-3.jpg`}
          alt="Third slide"
        />
        <Carousel.Caption>
          <Button style={{ marginBottom: '10rem' }}>
            <Link to="/products">Shop</Link>
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ControlledCarousel;
