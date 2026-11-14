import Carousel from 'react-bootstrap/Carousel';
import { getAssetUrl } from '../../utils/assets';
import CollapseCarousel from './CollapseCarousel';

function ImageSorter() {
  return (
    <CollapseCarousel>
      <Carousel.Item>
        <h5>Problem Statement</h5>
        <p>
          How might we sort large amounts of images lying around in our
          laptops/phones?
        </p>
        <div className='ratio ratio-16x9'>
          <video
            src={getAssetUrl('/src/assets/videos/ml-image-sorter.mp4')}
            controls
          />
        </div>
      </Carousel.Item>
    </CollapseCarousel>
  );
}

export default ImageSorter;
