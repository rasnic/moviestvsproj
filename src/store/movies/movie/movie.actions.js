import database from "../../../middleware/firebase/database";

export default {
    getMovie: async ({state, commit}) => {
        const movie = await database.getItem({entity: 'movies', id: state.showedMovieId});
        commit('setTVshow', movie)

    },
}