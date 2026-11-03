import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import GitHub from './buttons/GitHub';
import View from './buttons/View';
import Thumbnail from './Thumbnail';

function Project({ object, carousel, isValidCarousel, viewed, setViewed }) {
  const open = viewed === object.title;

  return (
    <>
      <Col>
        <Card>
          <Thumbnail src={object.thumbnail} />
          <Card.Body>
            <Card.Title>{object.title}</Card.Title>
            <Card.Text>{object.text}</Card.Text>
            <div className='d-flex justify-content-between align-items-center'>
              <ButtonGroup>
                <View
                  isValidCarousel={isValidCarousel}
                  setViewed={setViewed}
                  projectTitle={object.title}
                />
                <GitHub href={object.link} />
              </ButtonGroup>
              <small className='text-body-secondary text-end'>
                {object.skills.join(', ')}
              </small>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Collapse in={open} className='project-collapse'>
        <Col xs={12}>
          <Card>
            <Card.Body>{carousel}</Card.Body>
          </Card>
        </Col>
      </Collapse>
    </>
  );
}

export default Project;
