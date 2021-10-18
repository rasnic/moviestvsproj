import database from "../../middleware/firebase/database";

export default {
    deleteUser: async ({state, commit}) => {
        await database.removeUser({ name: state.editedUserName});
        const userName = state.editedUserName;
        commit('resetEditedUserName')
        commit('deleteUser', userName)
    },
    updateUser: async ({state, commit}) => {
        const user = {}
        Object.assign(user, state.editedMovie)
        user.name = state.editedUserName
        await database.updateUser({ name: user.name, user: user})
        commit('resetEditedUser')
        commit('resetEditedUserName')
        commit('editUser', user)
    },
    insertUser: async ({state, commit}) => {
        const user = {}
        Object.assign(user, state.editedUser)
        debugger
        await database.createUser({ user: user, name: state.editedUser.name})
        commit('resetEditedUser')
        commit('insertUser', user)

    },
}