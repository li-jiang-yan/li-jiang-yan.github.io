import { Children, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const mod = (n, m) => ((n % m) + m) % m;

const ControlPrev = ({ count, index, setIndex }) => {
  if (count > 1) {
    return (
      <Col xs='auto'>
        <Button
          variant=''
          className='carousel-control-prev'
          onClick={() => setIndex(mod(index - 1, count))}
        >
          <span className='carousel-control-prev-icon' aria-hidden='true' />
          <span className='visually-hidden'>Prev</span>
        </Button>
      </Col>
    );
  }

  return null;
};

const ControlNext = ({ count, index, setIndex }) => {
  if (count > 1) {
    return (
      <Col xs='auto'>
        <Button
          variant=''
          className='carousel-control-next'
          onClick={() => setIndex(mod(index + 1, count))}
        >
          <span className='carousel-control-next-icon' aria-hidden='true' />
          <span className='visually-hidden'>Next</span>
        </Button>
      </Col>
    );
  }

  return null;
};

function CollapseCarousel({ children }) {
  const count = Children.count(children);
  const [index, setIndex] = useState(0);

  return (
    <Row className='align-items-center'>
      <ControlPrev count={count} index={index} setIndex={setIndex} />
      <Col>
        <Carousel
          controls={false}
          indicators={false}
          activeIndex={index}
          interval={null}
        >
          {children}
        </Carousel>
      </Col>
      <ControlNext count={count} index={index} setIndex={setIndex} />
    </Row>
  );
}

export default CollapseCarousel;
