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

function getGenre(options) {
    return firebaseInstance.firebase.database().ref(`admin/db/${options.entity}/genres/${options.genre}`).once('value')
        .then(res => {
            const arr = [];
            const map = res.val();
            for (const key in map) {
                const item = map[key];
                item.id = key;
                arr.push(item);
            }
            return arr;
        })
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
        .then(res => {
            const arr = [];
            const map = res.val();
            for (const key in map) {
                const item = map[key];
                item.id = key;
                arr.push(item);
            }
            return arr;
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
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.entity}/${options.id}`).remove()
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
    deleteFromListDb
};