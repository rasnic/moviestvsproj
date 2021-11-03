import database from "../../middleware/firebase/database";


export default {
    getTVshow: async ({state, commit}) => {
        const tvShow = await database.getItem({entity: 'tvShows', id: state.showedTVId});
        commit('setTVshow', tvShow)
        return tvShow
    },
    getTVshows: async ({commit}) => {
        const tvShows = await database.get({entity: 'tvShows'});
        commit('setTVshows', tvShows)
        return tvShows
    },
    deleteTVshow: async ({state, commit}) => {
        await database.remove({entity: 'tvShows', id: state.editedTVshowId});
        const tvShowId = state.editedTVshowId;
        commit('resetEditedTVshowId')
        commit('deleteTVshow', tvShowId)
    },
    updateTVshow: async ({state, commit}) => {
        const tvShow = {}
        Object.assign(tvShow, state.editedTVshow)
        tvShow.id = state.editedTVshowId
        await database.update({entity: 'tvShows', id: tvShow.id, item: tvShow})
        commit('resetEditedTVshow')
        commit('resetEditedTVshowId')
        commit('editTVshow', tvShow)
    },
    insertTVshow: async ({state, commit}) => {
        const tvShow = {}
        Object.assign(tvShow, state.editedTVshow)
        tvShow.id = state.editedTVshowId;
        await database.create({entity: 'tvShows', item: tvShow, id:state.editedTVshow.id})
        commit('resetEditedTVshow')
        commit('insertTVshow', tvShow)

    },
    setEditTVshowById: async ({state, commit}) => {
        let tvShow = {}
        if (state.tvShows.length && state.tvShows.find(item => item.id === state.editedTVshowId)) {
            tvShow = state.tvShows.find(item => item.id === state.editedTVshowId)
        } else {
            tvShow = await database.getItem({entity: 'tvShows', id: state.editedTVshowId})
        }
        commit('setEditedTVshow', tvShow)
    },

}