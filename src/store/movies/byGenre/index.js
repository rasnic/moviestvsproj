import state from './movies.bygenre.state'
import mutations from './movies.bygenre.mutations'
import actions from './movies.bygenre.actions'
import getters from './movies.bygenre.getters'

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}