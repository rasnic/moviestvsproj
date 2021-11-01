export default {
    resetEditedMovie: ((state) => {
        state.editedMovie ={
            name: '',
            id: '',
            releaseDate: '',
            movieLength: '',
            languages: [],
            trailer: '',
            ranking: '',
            genres: [],
            overview:'',
            picture: ''
        };
        delete state.editedMovieId
    }),

    setEditedMovieIdByGenre: ((state, id) => state.editedMovieId = id),

    setEditedMovieByGenre: ((state, movie) => state.editedMovie = movie),

    insertMovieByGenre: ((state, [movie, genre])=>{
        debugger
        if(!state.movies[genre]){
            state.movies[genre] = [];
        }
        state.movies[genre].push(movie)
    }),
    setMoviesByGenre: ((state, movies) => state.arrMov = movies),
}