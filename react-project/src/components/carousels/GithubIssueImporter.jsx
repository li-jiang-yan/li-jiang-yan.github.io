import Carousel from 'react-bootstrap/Carousel';
import { getAssetUrl } from '../../utils/assets';
import CollapseCarousel from './CollapseCarousel';

function GithubIssueImporter() {
  return (
    <CollapseCarousel>
      <Carousel.Item>
        <h5>Problem Statement</h5>
        <p>
          How might we save time and energy creating issues on GitHub
          repositories?
        </p>
        <div className='ratio ratio-16x9'>
          <video
            src={getAssetUrl('/src/assets/videos/github-issue-importer.mp4')}
            controls
          />
        </div>
      </Carousel.Item>
    </CollapseCarousel>
  );
}

export default GithubIssueImporter;
