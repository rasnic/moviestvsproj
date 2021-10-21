import database from "../../middleware/firebase/database";

export default {
    getMyMovies: async ({commit}) => {
        debugger
        const movies = await database.getUserItems({entity: 'movies', uid: window.user.uid});
        commit('setUserMovies', movies)
    },
    getMyTVshows: async ({commit}) => {
        const tvShows = await database.getUserItems({entity: 'tvShows', uid: window.user.uid});
        commit('setUserTVshows', tvShows)
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