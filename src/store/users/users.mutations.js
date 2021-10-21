export default {
    setUserMovies: ((state, movies) => state.movies = movies),

    setUserTVshows: ((state, tvShows) => state.tvShows = tvShows),

    setMoviesPics: ((state, pics) => state.moviePics = pics),

    setTVPics: ((state, pics) => state.tvPics = pics)
}