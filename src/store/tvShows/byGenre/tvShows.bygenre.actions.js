import database from "@/middleware/firebase/database";

export default {
    getTVshows: async ({commit},genre) => {
        const tvShows = await database.getGenre({entity: 'tvShows', genre:genre});
        commit('setTVshowsByGenre', tvShows)
    },
    insertTVshowByGenre: async ({state, commit}) => {
        const tvShow = {}
        Object.assign(tvShow, state.editedTV)
        tvShow.id = state.editedTVId;
        for (let i = 0; i < tvShow.genres.length; i++) {
            await database.insertByGenre({entity: 'tvShows', item: tvShow, id:state.editedTV.id, genre: tvShow.genres[i]})
            commit('insertTVshowByGenre', [tvShow, tvShow.genres[i]])
        }
        commit('resetEditedTVshow')
    },

}