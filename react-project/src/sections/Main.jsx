import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import ToggleButton from 'react-bootstrap/ToggleButton';
import projectData from '../assets/json/projects.json';
import getCarousel from '../components/carousels/getCarousel';
import Project from '../components/Project';

function convertToId(skill) {
  return `toggle-${skill.toLowerCase().replaceAll(' ', '-')}`;
}

function Main() {
  const skills = [
    'Python',
    'JavaScript',
    'React',
    'Flask',
    'OpenAI API',
    'scikit-learn',
    'TensorFlow and Keras',
  ];
  const [toggles, setToggles] = useState(
    Object.fromEntries(skills.map((skill) => [skill, true])),
  );
  const [viewed, setViewed] = useState('');

  return (
    <main>
      <section className='py-5 text-center container'>
        <div className='row py-lg-5'>
          <div className='col-lg-6 col-md-8 mx-auto'>
            <h1 className='fw-light'>Li Jiang Yan (JY)</h1>
            <p className='lead text-body-secondary'>
              An aspiring AI Software Engineer interested in solving real-world
              problems through technology. Passionate about continuous learning,
              especially in AI/ML and software development through coursework
              and hands-on projects.
            </p>
            <p>
              {skills.map((skill) => (
                <ToggleButton
                  key={skill}
                  id={convertToId(skill)}
                  type='checkbox'
                  value={skill}
                  checked={toggles[skill]}
                  onChange={(e) =>
                    setToggles({ ...toggles, [skill]: e.currentTarget.checked })
                  }
                  className='my-2 btn-skill'
                  style={{
                    marginInline: '0.125rem',
                  }}
                >
                  {skill}
                </ToggleButton>
              ))}
              <br />
              <button type='button' className='btn btn-skill my-2' disabled>
                And more underway...
              </button>
            </p>
          </div>
        </div>
      </section>
      <div className='album py-5 bg-body-tertiary'>
        <div className='container'>
          <Row id='projects' className='g-3'>
            {projectData.map((projectObj) => {
              const projectSkills = projectObj.skills;
              const toggledSkills = projectSkills.filter(
                (projectSkill) => toggles[projectSkill],
              );
              if (!(toggledSkills.length > 0)) {
                return null;
              }

              const carouselObject = getCarousel(projectObj.title);
              return (
                <Project
                  key={projectObj.title}
                  object={projectObj}
                  carousel={carouselObject.component}
                  isValidCarousel={carouselObject.isValid}
                  viewed={viewed}
                  setViewed={setViewed}
                ></Project>
              );
            })}
          </Row>
        </div>
      </div>
    </main>
  );
}

export default Main;
