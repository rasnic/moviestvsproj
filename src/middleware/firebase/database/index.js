import firebaseInstance from '../';
import database from 'firebase/database';

//gets all of the items of a certain type (tv shows/movies) from the database
function get(options) {
    return firebaseInstance.firebase.database().ref(`admin/db/${options.type}`).once('value')
        .then(res => {
            return setItems(res);
        });
}
//gets all of the items of a certain type in a certain genre
function getGenre(options) {
    return firebaseInstance.firebase.database().ref(`admin/db/${options.type}/genres/${options.genre}`).once('value')
        .then(res => {
            return setItems(res);
        })
}
// function that sets all of the items that the getters use to pull data
function setItems(res, user = undefined) {
    const arr = [];
    const map = res.val();
    if (map) {
        delete map.genres
    }
    for (const key in map) {
        const item = map[key];
        item.id = key;
        const genres = item['genres'].toString()
        item['genres'] = undefined
        item['genres'] = genres
        arr.push(item);
    }
    if (!user && arr['genres']) {
        arr.pop()
    }
    return arr
}
//
function create(options) {
    return firebaseInstance.firebase.database().ref(`admin/db/${options.type}/${options.id}`).set(options.item);
}
// inserts item in a certain genre
function insertByGenre(options) {
    return firebaseInstance.firebase.database().ref(`admin/db/${options.type}/genres/${options.genre}/${options.id}`).set(options.item)
        .catch(error => {

        });
}
// removes item from main database (doesn't deletes it from the users data
function remove(options) {
    return firebaseInstance.firebase.database().ref(`admin/db/${options.type}/${options.id}`).remove();
}
// updates an item
function update(options) {
    return firebaseInstance.firebase.database().ref(`admin/db/${options.type}/${options.id}`).update(options.item);

}
// gets an item
async function getItem(options) {

    return await firebaseInstance.firebase.database().ref(`admin/db/${options.type}/${options.id}`).once('value')
        .then(async res => {
            return await res.val();
        });
}
// adds user
export async function addUser(options) {
    return await firebaseInstance.firebase.database().ref(`users/${options.uid}`).set({
        name: options.name,
        email: options.email
    });
}
// inserts item to user list
export async function insertToList(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.type}/${options.id}`).set(await getItem({
        type: options.type,
        id: options.id
    }));
}
// gets user name with user uid
export async function getUserName(options) {
    return await firebaseInstance.firebase.database().ref(`users/${options.uid}`).once('value')
        .then(res => {
            return res.val().name;
        })
}
// gets user items of a certain type
async function getUserItems(options) {
    return await firebaseInstance.firebase.database().ref(`users/${options.uid}/${options.type}`).once('value')
        .then( res => {
        return setItems(res, true)
        })
}
// gets admin pictures for recommended movies and tv shows
async function getPics(options) {
    let pics = [];
    return await this.getUserItems({uid: 'dsm7CKcNRxQ7MZZOjCfEmSORt653', type: options.type})
        .then((arr) => {
                for (let i = 0; i < arr.length; i++) {
                    pics.push(arr[i].picture)
                }
                return pics
            })
}
// deletes item from user list database
async function deleteFromListDb(options){
    return await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.type}/${options.id}`).remove()
}
// checks if an item is in a user list
async function checkList(options) {
    if ((await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/${options.type}/${options.id}`).once('value')).val() !== null){
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