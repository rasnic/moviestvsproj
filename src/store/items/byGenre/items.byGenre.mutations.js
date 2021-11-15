export default {
    // resets edited item in state
    resetEditedItem: ((state, type) => {
        if (type === 'movie') {
            state.editedItem[type] = {
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
        }
    }),
    // sets edited item id in state
    setEditedItemIdByGenre: ((state, [id,type]) =>  state.editedItemId[type] = id),
// sets edited item in state
    setEditedItemByGenre: ((state, [item, type]) => state.editedItem[type] = item),
// inserts item to genre list state
    insertItemByGenre: ((state, [item, genre, type]) =>{
        if (!state.items[type][genre]){
            state.items[type][genre] = []
        }
        state.items[type][genre].push(item)
    }),
    //sets items in state
    setItemsByGenre: ((state, [items, type]) => state.arrItems[type] = items)
}