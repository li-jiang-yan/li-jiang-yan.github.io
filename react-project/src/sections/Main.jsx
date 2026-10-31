import { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';

function convertToId(skill) {
  return `toggle-${skill.toLowerCase().replaceAll(' ', '-')}`;
}

function Main() {
  const skills = [
    'Python',
    'JavaScript',
    'Flask',
    'scikit-learn',
    'TensorFlow and Keras',
  ];
  const [toggles, setToggles] = useState(
    Object.fromEntries(skills.map((skill) => [skill, true])),
  );

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
          <div id='projects'></div>
        </div>
      </div>
    </main>
  );
}

export default Main;
