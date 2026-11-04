import Carousel from 'react-bootstrap/Carousel';
import { getAssetUrl } from '../../utils/assets';
import CollapseCarousel from './CollapseCarousel';

function IntelligentJobSearchTool() {
  return (
    <CollapseCarousel>
      <Carousel.Item>
        <h5>Problem Statement</h5>
        <p>
          How might we save time and energy finding jobs and tailoring job
          resumes?
        </p>
        <div className='ratio ratio-16x9'>
          <video
            src={getAssetUrl('/src/assets/videos/ai-job-search-solution.mp4')}
            controls
          />
        </div>
      </Carousel.Item>
    </CollapseCarousel>
  );
}

export default IntelligentJobSearchTool;
