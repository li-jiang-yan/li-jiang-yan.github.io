function Header() {
  return (
    <header data-bs-theme='dark'>
      <div class='collapse text-bg-dark' id='navbarHeader'>
        <div class='container'>
          <div class='row'>
            <div class='col-sm-8 col-md-7 py-4'>
              <h4>About</h4>
              <p class='text-body-secondary'>
                An aspiring AI Software Engineer interested in solving
                real-world problems through technology. Passionate about
                continuous learning, especially in AI/ML and software
                development through coursework and hands-on projects.
              </p>
            </div>
            <div class='col-sm-4 offset-md-1 py-4'>
              <h4>Contact</h4>
              <ul class='list-unstyled'>
                <li>
                  <a
                    href='https://www.linkedin.com/in/li-jiang-yan/'
                    class='text-white'
                  >
                    Connect on LinkedIn
                  </a>
                </li>
                <li>
                  Email me at <img src='/assets/images/email.png' />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class='navbar navbar-dark bg-dark shadow-sm'>
        <div class='container'>
          <a href='#' class='navbar-brand d-flex align-items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='none'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='1'
              aria-hidden='true'
              class='bi bi-code-slash me-2'
              viewBox='0 0 16 16'
            >
              <path d='M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0'></path>
            </svg>
            <strong>Li Jiang Yan (JY)</strong>
          </a>
          <button
            class='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarHeader'
            aria-controls='navbarHeader'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span class='navbar-toggler-icon'></span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
