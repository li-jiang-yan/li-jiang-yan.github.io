import Carousel from 'react-bootstrap/Carousel';
import CollapseCarousel from './CollapseCarousel';

function LinkedinWordTokenAnalyzer() {
  return (
    <CollapseCarousel>
      <Carousel.Item>
        <h5>Problem Statement</h5>
        <p>
          How might we objectively find out what are the most in-demand skills
          for a particular career/industry?
        </p>
        <img
          src='/src/assets/images/linkedin-jd-word-token-analyzer_sklearn.png'
          className='img-fluid'
        />
      </Carousel.Item>
    </CollapseCarousel>
  );
}

export default LinkedinWordTokenAnalyzer;
