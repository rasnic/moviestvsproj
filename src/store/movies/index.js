import state from './movies.state'
import mutations from './movies.mutations'
import actions from './movies.actions'
import getters from './movies.getters'

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}