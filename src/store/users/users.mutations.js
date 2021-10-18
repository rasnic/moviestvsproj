export default {
    setUsers: ((state, users) => state.users = users),
    setEditedUser: ((state, user) => state.editedUser = user),
    setEditedUserName: ((state, name) => state.editedUserName = name),
    resetEditedUserName: ((state) => state.editedUserName = ''),
    resetEditedUser: ((state) => {
        state.editedUser = {
            name: '',
            displayName: '',
            email: '',
            uid: ''
        }
        delete state.editedUserName
    }),
    editUser: ((state, user) => {
        const index = state.movies.findIndex(p => p.name === user.name)
        state.users.splice(index, 1, user)
    }),
    deleteUser: ((state, username) => {
        const index = state.users.findIndex(p => p.name === username)
        state.users.splice(index, 1)
    }),
    insertUser: ((state, user) => {
        state.users.push(user)
    }),
    checkUser: ((state, username) => {
        return state.users.findIndex(p => p.name === username)
    })
}