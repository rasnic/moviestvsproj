import firebaseInstance from '../';
import database from 'firebase/database';

function get(options) {
    return firebaseInstance.firebase.database().ref(`admin/db/${options.entity}`).once('value')
        .then(res => {
            return setItems(res);
        });
}

function getGenre(options) {
    return firebaseInstance.firebase.database().ref(`admin/db/${options.entity}/genres/${options.genre}`).once('value')
        .then(res => {
            return setItems(res);
        })
}
function setItems(res, user = undefined) {
    const arr = [];
    const map = res.val();
    delete map.genres
    for (const key in map) {
        const item = map[key];
        item.id = key;
        const genres = item['genres'].toString()
        item['genres'] = undefined
        item['genres'] = genres
        arr.push(item);
    }
    if (!user) {
        arr.pop()
    }
    return arr
}

function create(options) {
    return firebaseInstance.firebase.database().ref(`admin/db/${options.entity}/${options.id}`).set(options.item);
}

function insertByGenre(options) {
    return firebaseInstance.firebase.database().ref(`admin/db/${options.entity}/genres/${options.genre}/${options.id}`).set(options.item);
}

function remove(options) {
    return firebaseInstance.firebase.database().ref(`admin/db/${options.entity}/${options.id}`).remove();
}

function update(options) {
    return firebaseInstance.firebase.database().ref(`admin/db/${options.entity}/${options.id}`).update(options.item);

}

async function getItem(options) {

    return await firebaseInstance.firebase.database().ref(`admin/db/${options.entity}/${options.id}`).once('value')
        .then(async res => {
            return await res.val();
        });
}

export async function addUser(options) {
    return await firebaseInstance.firebase.database().ref(`users/${options.uid}`).set({
        name: options.name,
        email: options.email
    });
}

export async function insertToList(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.entity}/${options.id}`).set(await getItem({
        entity: options.entity,
        id: options.id
    }));
}

export async function getUserName(options) {
    return await firebaseInstance.firebase.database().ref(`users/${options.uid}/name`).once('value')
        .then(res => {
            return res.val();
        })
}

async function getUserItems(options) {
    return await firebaseInstance.firebase.database().ref(`users/${options.uid}/${options.entity}`).once('value')
        .then( res => {
        return setItems(res, true)
        })
}

async function getPics(options) {
    let pics = [];
    return await this.getUserItems({uid: 'dsm7CKcNRxQ7MZZOjCfEmSORt653', entity: options.entity})
        .then((arr) => {
                for (let i = 0; i < arr.length; i++) {
                    pics.push(arr[i].picture)
                }
                return pics
            })
}
async function deleteFromListDb(options){
    return await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.entity}/${options.id}`).remove()
}

async function checkList(options) {
    if ((await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.entity}/${options.id}`).once('value')).val() !== null){
        return true
    }
    return false
}
export default {
    get,
    create,
    remove,
    update,
    getItem,
    addUser,
    insertByGenre,
    getGenre,
    getUserItems,
    getPics,
    insertToList,
    deleteFromListDb,
    checkList
};