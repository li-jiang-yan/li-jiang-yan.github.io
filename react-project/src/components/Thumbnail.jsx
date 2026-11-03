import { getAssetUrl } from '../utils/assets';

function Thumbnail({ src }) {
  if (src.startsWith('/src/assets/videos/')) {
    return (
      <video
        src={getAssetUrl(src)}
        className='object-fit-contain'
        height='225'
        autoPlay
      />
    );
  }

  if (src.startsWith('/src/assets/images/')) {
    return (
      <img src={getAssetUrl(src)} className='object-fit-contain' height='225' />
    );
  }

  return (
    <svg
      aria-label='Placeholder: Thumbnail'
      className='bd-placeholder-img card-img-top'
      height='225'
      preserveAspectRatio='xMidYMid slice'
      role='img'
      width='100%'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>Placeholder</title>
      <rect width='100%' height='100%' fill='#55595c'></rect>
      <text x='50%' y='50%' fill='#eceeef' dy='.3em'>
        Thumbnail
      </text>
    </svg>
  );
}

export default Thumbnail;
