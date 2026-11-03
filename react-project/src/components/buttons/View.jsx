import Button from 'react-bootstrap/Button';

function View({ isValidCarousel, setViewed, projectTitle }) {
  if (!isValidCarousel) return null;

  const handleClick = () => {
    setViewed((pViewed) => {
      if (pViewed === projectTitle) {
        return '';
      }

      return projectTitle;
    });
  };

  return (
    <Button
      variant='outline-secondary'
      size='sm'
      type='button'
      onClick={handleClick}
    >
      View
    </Button>
  );
}

export default View;
