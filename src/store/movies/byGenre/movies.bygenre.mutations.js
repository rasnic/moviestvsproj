export default {
    resetEditedMovie: ((state) => {
        state.editedMovie ={
            title: '',
            id: '',
            release_date: '',
            runtime: '',
            languages: [],
            trailer: '',
            vote_average: '',
            genres: [],
            overview:'',
            picture: ''
        };
        delete state.editedMovieId
    }),

    setEditedMovieIdByGenre: ((state, id) => state.editedMovieId = id),

    setEditedMovieByGenre: ((state, movie) => state.editedMovie = movie),

    insertMovieByGenre: ((state, [movie, genre])=>{
        if(!state.movies[genre]){
            state.movies[genre] = [];
        }
        state.movies[genre].push(movie)
    }),
    setMoviesByGenre: ((state, movies) => state.arrMov = movies),
}