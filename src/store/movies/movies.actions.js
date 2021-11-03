import database from "../../middleware/firebase/database";


export default {
    getMovies: async ({commit}) => {
        let movies = await database.get({entity: 'movies'});
        commit('setMovies', movies)
        return movies
    },
    deleteMovie: async ({state, commit}) => {
        await database.remove({entity: 'movies', id: state.editedMovieId});
        const movieId = state.editedMovieId;
        commit('resetEditedMovieId')
        commit('deleteMovie', movieId)
    },
    updateMovie: async ({state, commit}) => {
        const movie = {}
        Object.assign(movie, state.editedMovie)
        movie.id = state.editedMovieId
        await database.update({entity: 'movies', id: movie.id, item: movie})
        commit('resetEditedMovie')
        commit('resetEditedMovieId')
        commit('editMovie', movie)
    },
    insertMovie: async ({state, commit}) => {
        const movie = {}
        Object.assign(movie, state.editedMovie)
        movie.id = state.editedMovieId;
        await database.create({entity: 'movies', item: movie, id:state.editedMovie.id})
        commit('resetEditedMovie')
        commit('insertMovie', movie)

    },

    setEditMovieById: async ({state, commit}) => {
        let movie = {}
        if (state.movies.length && state.movies.find(item => item.id === state.editedMovieId)) {
            movie = state.movies.find(item => item.id === state.editedMovieId)
        } else {
            movie = await database.getItem({entity: 'movies', id: state.editedMovieId})
        }
        commit('setEditedMovie', movie)
    },
    getMovie: async ({state, commit}) => {
        const movie = await database.getItem({entity: 'movies', id: state.showedMovieId});
        commit('setMovie', movie)
    return movie
    },

}