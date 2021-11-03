import database from "../../middleware/firebase/database";

export default {
    addToList: async ({commit},[id,type]) =>{
       await database.insertToList({entity: type, id});
    },
    deleteFromList: async ({commit},[id,type]) =>{
        if (type === 'movies') {
            const movies = await database.deleteFromListDb({entity: type, id})
            commit('setUserMovies', movies)
        }
        else{
            const tvShows = await database.deleteFromListDb({entity: type, id})
            commit('setUserTVshows', tvShows)
        }
    },
    getMyItems: async ({commit},type) => {
        if (type === 'movies') {
            const movies = await database.getUserItems({entity: type, uid: window.user.uid});
            commit('setUserMovies', movies)
            return movies
        }
        else {
            const tvShows = await database.getUserItems({entity: type, uid: window.user.uid});
            commit('setUserTVshows', tvShows)
            return tvShows
        }
    },
    getMoviesPicture: async ({commit}) =>{
        const moviePics =  await database.getPics({entity: 'movies'});
        console.log(moviePics)
        commit('setMoviesPics', moviePics)
    },
    getTVsPicture: async ({commit}) =>{
        const tvPics =  await database.getPics({entity: 'tvShows'});
        console.log(tvPics)
        commit('setTVPics', tvPics)
    }
}