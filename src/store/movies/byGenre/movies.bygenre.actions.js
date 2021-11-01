import database from "@/middleware/firebase/database";

export default {
    getMovies: async ({commit}, genre) => {
        const movies = await database.getGenre({entity: 'movies', genre:genre});
        commit('setMoviesByGenre', movies)
    },
    insertMovieByGenre: async ({state, commit}) => {
        const movie = {}
        Object.assign(movie, state.editedMovie)
        movie.id = state.editedMovieId;
        for (let i = 0; i < movie.genres.length; i++) {
            await database.insertByGenre({entity: 'movies', item: movie, id:state.editedMovie.id, genre: movie.genres[i]})
            commit('insertMovieByGenre', [movie, movie.genres[i]])
        }
        commit('resetEditedMovie')
    },
}