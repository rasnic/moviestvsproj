import database from "../../../middleware/firebase/database";

export default {
    getTVshow: async ({state, commit}) => {
        const tvShow = await database.getItem({entity: 'tvShows', id: state.showedTVId});
        commit('setTVshow', tvShow)

    },
}