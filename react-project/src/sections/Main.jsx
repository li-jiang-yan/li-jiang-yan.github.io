function Main() {
  return (
    <main>
      <section class='py-5 text-center container'>
        <div class='row py-lg-5'>
          <div class='col-lg-6 col-md-8 mx-auto'>
            <h1 class='fw-light'>Li Jiang Yan (JY)</h1>
            <p class='lead text-body-secondary'>
              An aspiring AI Software Engineer interested in solving real-world
              problems through technology. Passionate about continuous learning,
              especially in AI/ML and software development through coursework
              and hands-on projects.
            </p>
            <p>
              <button
                type='button'
                class='btn btn-skill active my-2'
                data-bs-toggle='button'
                aria-pressed='true'
              >
                Python
              </button>
              <button
                type='button'
                class='btn btn-skill active my-2'
                data-bs-toggle='button'
                aria-pressed='true'
              >
                JavaScript
              </button>
              <button
                type='button'
                class='btn btn-skill active my-2'
                data-bs-toggle='button'
                aria-pressed='true'
              >
                Flask
              </button>
              <button
                type='button'
                class='btn btn-skill active my-2'
                data-bs-toggle='button'
                aria-pressed='true'
              >
                scikit-learn
              </button>
              <button
                type='button'
                class='btn btn-skill active my-2'
                data-bs-toggle='button'
                aria-pressed='true'
              >
                TensorFlow and Keras
              </button>
              <br />
              <button type='button' class='btn btn-skill my-2' disabled>
                And more underway...
              </button>
            </p>
          </div>
        </div>
      </section>
      <div class='album py-5 bg-body-tertiary'>
        <div class='container'>
          <div id='projects'></div>
        </div>
      </div>
    </main>
  );
}

export default Main;
