function Main() {
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
              <button
                type='button'
                className='btn btn-skill active my-2'
                data-bs-toggle='button'
                aria-pressed='true'
              >
                Python
              </button>
              <button
                type='button'
                className='btn btn-skill active my-2'
                data-bs-toggle='button'
                aria-pressed='true'
              >
                JavaScript
              </button>
              <button
                type='button'
                className='btn btn-skill active my-2'
                data-bs-toggle='button'
                aria-pressed='true'
              >
                Flask
              </button>
              <button
                type='button'
                className='btn btn-skill active my-2'
                data-bs-toggle='button'
                aria-pressed='true'
              >
                scikit-learn
              </button>
              <button
                type='button'
                className='btn btn-skill active my-2'
                data-bs-toggle='button'
                aria-pressed='true'
              >
                TensorFlow and Keras
              </button>
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
