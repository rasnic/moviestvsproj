export default {
    setUserItems: ((state, [items, allItems]) => {
        allItems.pop()
            state.userItems = items
        for (let i = 0; i < allItems.length; i++) {
            if (items.length === 0){
                state.inList[allItems[i].id] = false
            }
            for (let j = 0; j < items.length; j++) {
                if (items[j].id === allItems[i].id){
                    state.inList[allItems[i].id] =true
                    break
                }
                if(j === items.length-1){
                    state.inList[allItems[i].id] = false
                }
            }
        }
    }),

    setMoviesPics: ((state, pics) => state.moviePics = pics),

    setTVPics: ((state, pics) => state.tvPics = pics),

    resetUserItems: ((state) => state.userItems = '')
}