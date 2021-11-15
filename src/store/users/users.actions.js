import database from "../../middleware/firebase/database";

export default {
    // adds item to user list
    addToList: async ({commit}, [id, type]) => {
        await database.insertToList({type, id});
    },
    // deletes item from user list and delete it from state
    deleteFromList: async ({commit}, [id, type]) => {
        const allItems = await database.get({type})
        await database.deleteFromListDb({ type, id})
            .then(async ()=>{
                const items = await database.getUserItems({type, uid: window.user.uid});
                commit('resetUserItems', type)
                commit('setUserItems', [items, allItems,type])
            })
    },
    // gets user items and set them in state
    getMyItems: async ({commit}, type) => {
        const allItems = await database.get({type})
        const items = await database.getUserItems({ type, uid: window.user.uid});
        commit('resetUserItems',type)
        commit('setUserItems', [items, allItems,type])
        return items
    },
    // gets pictures of admins list and sets them in state
    getPicture: async ({commit}, type) => {
        const pics = await database.getPics({type});
        commit('setPics', [pics,type])
    },
// checks if an item is in a user list
    checkList: async ({commit}, [id, type]) => {
        return await database.checkList({type, id})
    }
}