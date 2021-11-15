export default {
    // sets user items to state
    setUserItems: ((state, [items, allItems,type]) => {
        allItems.pop()
            state.userItems[type] = items
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
// sets admin items picture in state
    setPics: ((state, [pics,type]) => state.pics[type] = pics),
// resets user items
    resetUserItems: ((state, type) => state.userItems[type] = '')
}