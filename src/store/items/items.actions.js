import database from "../../middleware/firebase/database";

export default {
    // gets item for the item display and sets it in state
    getItemForSet: async ({state, commit}, type) =>{
        let cut = type.substring(0,type.length-1)
        const item = await database.getItem({type, id:state.showedItemId[cut]});
        commit('setItem', [item, cut])
        return item
    },
    // gets items and sets them in state
    getItems: async ({commit}, type) =>{
        const items = await database.get({type});
        commit('setItems', [items, type])
        return items
    },
    // gets admin items and sets them in state
    getAdminItems: async ({commit}, type) =>{
        const items = await database.getAdminItems({type});
        commit('setAdminItems', [items, type])
        return items
    },
    // deletes item from db and from state
    deleteItemFromDB: async ({state, commit}, type) => {
        await database.remove({type, id: state.editedItemId[type]});
        const itemId = state.editedItemId[type];
        commit('resetEditedItemId', type)
        commit('deleteItem', [itemId, type])
    },
    // updates item in database and in state
    updateItem: async ({state,commit}, type) =>{
        const item = {}
        Object.assign(item, state.editedItem[type])
        item.id = state.editedItemId[type]
        await database.update({type, id: item.id, item})
        commit('resetEditedItem', type)
        commit('resetEditedItemId', type)
        commit('editItem', [item, type])
    },
    // inserts item to database and to state
    insertItem: async ({state, commit}, type) =>{
        const item = {}
        Object.assign(item, state.editedItem[type])
        item.id = state.editedItemId[type]
        await database.create({type, item, id: item.id})
        commit('resetEditedItem', type)
        commit('insertItem', [item, type])
    },
    // sets edit item by it's id and sets it in state
    setEditItemById: async ({state,commit}, type) =>{
        let item = {}
        if(state.items[type].length && state.items[type].find(itemCheck => itemCheck.id === state.editedItemId)){
            item = state.items[type].find(itemCheck => itemCheck.id === state.editedItemId)
        }
        else{
            item = await database.getItem({type, id: state.editedItemId[type]})
        }
        commit('setEditedItem', [item, type])
    }
}