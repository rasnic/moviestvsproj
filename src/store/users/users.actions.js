import database from "../../middleware/firebase/database";

export default {
    addToList: async ({commit}, [id, type]) => {
        await database.insertToList({entity: type, id});
    },
    deleteFromList: async ({commit}, [id, type]) => {
        const allItems = await database.get({entity: type})
        await database.deleteFromListDb({entity: type, id})
            .then(async ()=>{
                const items = await database.getUserItems({entity: type, uid: window.user.uid});
                commit('resetUserItems')
                commit('setUserItems', [items, allItems])
            })
    },
    getMyItems: async ({commit}, type) => {
        const allItems = await database.get({entity: type})
        const items = await database.getUserItems({entity: type, uid: window.user.uid});
        commit('resetUserItems')
        commit('setUserItems', [items, allItems])
        return items

    },
    getMoviesPicture: async ({commit}) => {
        const moviePics = await database.getPics({entity: 'movies'});
        console.log(moviePics)
        commit('setMoviesPics', moviePics)
    },
    getTVsPicture: async ({commit}) => {
        const tvPics = await database.getPics({entity: 'tvShows'});
        console.log(tvPics)
        commit('setTVPics', tvPics)
    },
    checkList: async ({commit}, [id, type]) => {
        return await database.checkList({entity: type, id})
    }
}