export default {

    setMovies: ((state, movies) => state.movies = movies),

    setEditedMovieId: ((state, id) => state.editedMovieId = id),

    setEditedMovie: ((state, movie) => state.editedMovie = movie),

    resetEditedMovieId: ((state) => state.editedMovieId = ''),

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

    editMovie: ((state, movie)=>{
        const index = state.movies.findIndex(p=> p.id === movie.id)
        state.movies.splice(index, 1, movie)
    }),
    deleteMovie: ((state, movieId) =>{
        const index = state.movies.findIndex(p=> p.id === movieId)
        state.movies.splice(index,1)
    }),
    insertMovie: ((state, movie)=>{
        state.movies.push(movie)
    }),
    checkMovie: ((state , movieId)=>{
        return state.movies.findIndex(p=> p.id === movieId)
    })
}