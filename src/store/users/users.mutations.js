export default {
    setUserMovies: ((state, movies) => state.userMovies = movies),

    setUserTVshows: ((state, tvShows) => state.userTvShows = tvShows),

    setMoviesPics: ((state, pics) => state.moviePics = pics),

    setTVPics: ((state, pics) => state.tvPics = pics)
}