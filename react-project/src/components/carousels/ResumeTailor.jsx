import Carousel from 'react-bootstrap/Carousel';
import CollapseCarousel from './CollapseCarousel';

function ResumeTailor() {
  return (
    <CollapseCarousel>
      <Carousel.Item>
        <h5>Problem Statement</h5>
        <p>
          How might we save time and energy tailoring resumes that match job
          description requirements?
        </p>
        <div className='ratio ratio-16x9'>
          <video src='/src/assets/videos/resume-tailor.mp4' controls />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <h5>Job Description Analyzer</h5>
        <p>
          Identifies the top 10 most common words/phrases that might reflect the
          job poster's core priorities.
        </p>
        <img
          src='/src/assets/images/resume-tailor-01.png'
          className='img-fluid'
        />
      </Carousel.Item>
      <Carousel.Item>
        <h5>Job Description-Resume Summary Similarity Measure</h5>
        <p>
          Measures the similarity between the job description and resume summary
          to write summaries that align closer with job description
          requirements.
        </p>
        <img
          src='/src/assets/images/resume-tailor-02.png'
          className='img-fluid'
        />
      </Carousel.Item>
      <Carousel.Item>
        <h5>Bulletpoint Relevance Measure</h5>
        <p>
          Shows the similarity between bulletpoints and the job description to
          identity points to prioritize through inclusion/reorganization.
        </p>
        <img
          src='/src/assets/images/resume-tailor-03.png'
          className='img-fluid'
        />
      </Carousel.Item>
      <Carousel.Item>
        <h5>Skill Count Measure</h5>
        <p>
          Counts the occurrence of master resume skills mentioned by the job
          poster to identity skills to prioritize through
          inclusion/reorganization.
        </p>
        <img
          src='/src/assets/images/resume-tailor-04.png'
          className='img-fluid'
        />
      </Carousel.Item>
      <Carousel.Item>
        <h5>Word Export</h5>
        <p>
          Exports fully formatted resume edited through the tool, giving users
          the flexibility to make further edits in a Word processor if needed.
        </p>
        <img
          src='/src/assets/images/resume-tailor-05.png'
          className='img-fluid'
        />
      </Carousel.Item>
    </CollapseCarousel>
  );
}

export default ResumeTailor;
