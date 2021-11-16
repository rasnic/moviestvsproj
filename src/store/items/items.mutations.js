export default {
// sets item in state
    setItem: ((state, [item, type]) => state.showedItem[type] = item),
// sets the showed item id in state
    setShowedItemId: ((state, [id, type]) => state.showedItemId[type] = id),
// sets items in state
    setItems: ((state, [items, type]) => state.items[type] = items),
// sets items in state
    setAdminItems: ((state, [items, type]) => state.adminItems[type] = items),
// sets edited item id in state
    setEditedItemId: ((state, [id, type]) => state.editedItemId[type] = id),
// sets edited item in state
    setEditedItem: ((state, [item,type]) => state.editedItem[type] = item),
// resets edited item id in state
    resetEditedItemId: ((state, type) => state.editedItemId[type] = ''),
// reset edited item in state
    resetEditedItem: ((state, type) =>{
        if (type === 'movie'){
            state.editedItem[type] ={
                title: '',
                id: '',
                release_date: '',
                runtime: '',
                languages: [],
                trailer: '',
                vote_average: '',
                genres: [],
                overview:'',
                picture: ''
            }
        }
        else{
            state.editedItem[type] = {
                name: '',
                id: '',
                first_air_date: '',
                number_of_seasons: '',
                number_of_episodes: '',
                episode_run_time: '',
                languages: '',
                vote_average: '',
                trailer: '',
                overview: '',
                genres: '',
                picture:''
            }
            delete state.editedItemId[type]
        }
    }),
// changes item in state
    editItem: ((state, [item, type]) => {
        const index = state.items[type].findIndex(p => p.id === item.id)
        state.items[type].splice(index, 1 ,item)
    }),
// deletes item from state
    deleteItem: ((state, [id, type]) => {
        const index = state.items[type].findIndex(p=> p.id === id)
        state.items[type].splice(index,1)
    }),
    // inserts item to state
    insertItem:((state, [item,type]) =>{
        state.items[type].push(item)
}),
    //checks if an item is in state
    checkItem:((state,[id,type]) =>{
        return state.items[type].findIndex(p => p.id === id)
    })

}