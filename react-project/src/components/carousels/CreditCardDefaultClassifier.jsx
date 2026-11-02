import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CollapseCarousel from './CollapseCarousel';

function CreditCardDefaultClassifier() {
  const [status, setStatus] = useState(-2);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <CollapseCarousel>
      <Carousel.Item>
        <div className='mb-3'>
          <h5>Visualizable Models</h5>
          <Form.Group as={Row}>
            <Form.Label column xs='auto'>
              Repayment status 2 months ago:
            </Form.Label>
            <Col xs='auto'>
              <Form.Control
                id='credit-card-default-classification_various-status'
                type='number'
                min={-2}
                max={8}
                value={status}
                onChange={handleStatusChange}
              />
            </Col>
          </Form.Group>
          <div style={{ backgroundColor: 'white' }} className='p-3'>
            <canvas id='credit-card-default-classification_various-models' />
          </div>
          <script
            type='module'
            src='/src/assets/js/credit-card-default-classification_various.js'
          />
        </div>
      </Carousel.Item>
      <Carousel.Item></Carousel.Item>
    </CollapseCarousel>
  );
}

export default CreditCardDefaultClassifier;
