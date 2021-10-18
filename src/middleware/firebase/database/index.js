import firebaseInstance from '../';
import database from 'firebase/database';

function get(options) {
    return firebaseInstance.firebase.database().ref(`admin/db/${options.entity}`).once('value')
        .then(res => {
            const arr = [];
            const map = res.val();
            for (const key in map) {
                const item = map[key];
                item.id = key;
                arr.push(item);
            }
            return arr;
        });
}

function create(options) {
    return firebaseInstance.firebase.database().ref(`admin/db/${options.entity}/${options.id}`).set(options.item);
}

function remove(options) {
    return firebaseInstance.firebase.database().ref(`admin/db/${options.entity}/${options.id}`).remove();
}

function update(options) {
    return firebaseInstance.firebase.database().ref(`admin/db/${options.entity}/${options.id}`).update(options.item);

}
function getItem(options) {
    return firebaseInstance.firebase.database().ref(`admin/db/${options.entity}/${options.id}`).once('value')
        .then(res => {
            return  res.val();
        });
}

function createUser(options) {
    return firebaseInstance.firebase.database().ref(`users/${options.name}`).set(options.user);
}

function removeUser(options) {
    return firebaseInstance.firebase.database().ref(`users/${options.name}`).remove();
}

function updateUser(options) {
    return firebaseInstance.firebase.database().ref(`users/${options.name}`).update(options.user);

}


export default {
    get,
    create,
    remove,
    update,
    getItem,
    createUser,
    removeUser,
    updateUser
};