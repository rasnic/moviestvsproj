import database from "@/middleware/firebase/database";

export default {
    // gets items by genre and sets them in state
    getItemsByGenre: async ({commit, state}, [type,genre]) => {
        const items = await database.getGenre({ type,genre})
        commit('setItemsByGenre', [items, genre])
        return items
    },
    // inserts item by genre and sets it to state
    insertItemByGenre: async ({state, commit}, type) => {
        const item = {}
        Object.assign(item, state.editedItem[type])
        item.id = state.editedItemId[type]
        for (let i = 0; i < item.genres.length; i++) {
            await database.insertByGenre({type, item, id: state.editedItem[type].id, genre: item.genres[i]})
            commit('insertItemByGenre', [item, item.genres[i],type])
        }
        commit('resetEditedItem', type)
    }
}