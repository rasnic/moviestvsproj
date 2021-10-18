import state from './movie.state'
import mutations from './movie.mutations'
import actions from './movie.actions'
import getters from './movie.getters'

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}