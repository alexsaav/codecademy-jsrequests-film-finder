//TMDB API
const tmdbKey = 'insert tmdb key';
// API’s base URL
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

//POPULATE DROP-DOWN MENU WITH GENRES 
const getGenres = async () => {
    const genreRequestEndpoint = '/genre/movie/list';
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if(response.ok) {
            const jsonResponse = await response.json();
            const genres = jsonResponse.genres;
            return genres;
        }
    } catch (error) {
        console.log(error);
    }
};

//GET A RANDOM MOVIE
const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const discoverMovieEndpoint = '/discover/movie';
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        
        if(response.ok) {
            const jsonResponse = await response.json();
            const movies = jsonResponse.results;
            return movies;
        }
    } catch (error) {
        console.log(error);
    }
};

const getMovieCast = async (movie) => {
    const movieId = movie.id;
    const castEndPoint = `/movie/${movieId}/credits`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${castEndPoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if(response.ok) {
            const castInfo = await response.json();
            console.log(castInfo)
            return castInfo;
        }
    } catch (error) {
        console.log(error);
    }
};

//GET MOVIE INFO
const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const movieEndPoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${movieEndPoint}·${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if(response.ok) {
            const movieInfo = await response.json();
            
            return movieInfo;
        }
    } catch (error) {
        console.log(error);
    }
};

//DISPLAY MOVIE
const showRandomMovie = async () => {
    const movieInfo = document.getElementById('movieInfo');
    if (movieInfo.childNodes.length > 0) {
        clearCurrentMovie();
    };
    const movies = await getMovies();
    const randomMovie = getRandomMovie(movies);
    const info = await getMovieInfo(randomMovie);
    const castInfo = await getMovieCast(info);
    displayMovie(info, castInfo);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
