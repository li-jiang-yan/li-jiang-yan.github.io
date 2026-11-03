import Carousel from 'react-bootstrap/Carousel';
import { getAssetUrl } from '../../utils/assets';
import CollapseCarousel from './CollapseCarousel';

function LinkedinJobFinder() {
  return (
    <CollapseCarousel>
      <Carousel.Item>
        <h5>Problem Statement</h5>
        <p>
          How might we save time and energy finding jobs that match our current
          skills and aspirations?
        </p>
        <div className='ratio ratio-16x9'>
          <video
            src={getAssetUrl(
              '/src/assets/videos/advanced-linkedin-job-search-engine.mp4',
            )}
            controls
          />
        </div>
      </Carousel.Item>
    </CollapseCarousel>
  );
}

export default LinkedinJobFinder;
