import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { getAssetUrl } from '../utils/assets';

function Header() {
  return (
    <header data-bs-theme='dark'>
      <Navbar variant='dark' expand='false' bg='dark' className='shadow-sm'>
        <Navbar.Collapse className='text-bg-dark' id='navbarHeader'>
          <div className='container'>
            <div className='row'>
              <div className='col-sm-8 col-md-7 py-4'>
                <h4>About</h4>
                <p className='text-body-secondary'>
                  An aspiring AI Software Engineer interested in solving
                  real-world problems through technology. Passionate about
                  continuous learning, especially in AI/ML and software
                  development through coursework and hands-on projects.
                </p>
              </div>
              <div className='col-sm-4 offset-md-1 py-4'>
                <h4>Contact</h4>
                <ul className='list-unstyled'>
                  <li>
                    <a
                      href='https://www.linkedin.com/in/li-jiang-yan/'
                      className='text-white'
                    >
                      Connect on LinkedIn
                    </a>
                  </li>
                  <li>
                    Email me at&nbsp;
                    <img src={getAssetUrl('/src/assets/images/email.png')} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Navbar.Collapse>
        <Container>
          <Navbar.Brand href='#' className='d-flex align-items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1'
              aria-hidden='true'
              className='bi bi-code-slash me-2'
              viewBox='0 0 16 16'
            >
              <path d='M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0'></path>
            </svg>
            <strong>Li Jiang Yan (JY)</strong>
          </Navbar.Brand>
          <Navbar.Toggle
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarHeader'
            aria-controls='navbarHeader'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </Navbar.Toggle>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
