const global = {
  currentPage: window.location.pathname,
}

async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular')
  console.log(results)
  results.forEach((movie) => {
    const div = document.createElement('div')
    div.classList.add('card')

    div.innerHTML = `
    <a href="movie-deatils.html?id=${movie.id}">
      ${
        movie.poster_path
          ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="movie-title">`
          : `<img src="../images/no-image.jpg" class="card-img-top" alt="${movie.title}">`
      }
    </a>
    <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
            <small class="text-muted">release: ${movie.release_date}</small>
        </p>
    </div>`
    document.querySelector('#popular-movies').appendChild(div)
  })
}

//Fetch Data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = '02612e7718e87ae931ad313a94941d1e'
  const API_URL = 'https://api.themoviedb.org/3/'

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  )

  const data = await response.json()
  return data
}

function highlightActiveLink() {
  const link = document.querySelectorAll('.nav-link')
  link.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active')
    }
  })
}

//init app
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies()
      break
    case '/shows.html':
      console.log('shows')
      break
    case '/movies-details.html':
      console.log('movie details')
      break
    case '/movies-details.html':
      console.log('show deatils')
      break
    case '/search.html':
      console.log('search')
      break
  }
  highlightActiveLink()
}

document.addEventListener('DOMContentLoaded', init)
