export default {
    resetEditedTVshow: ((state) => {
        state.editedTV = {
            name: '',
            id: '',
            releaseDate: '',
            seasons: '',
            episodes: '',
            episodeLength: '',
            languages: '',
            ranking: '',
            trailer: '',
            overview: '',
            genres: '',
            picture:''
        }
        delete state.editedTVId
    }),
    setEditedTVshowIdByGenre: ((state, id) => state.editedTVId = id),

    setEditedTVshowByGenre: ((state, tvShow) => state.editedTV = tvShow),

    insertTVshowByGenre: ((state, [tvShow, genre])=>{
        if(!state.tvShows[genre]){
            state.tvShows[genre] = [];
        }
        state.tvShows[genre].push(tvShow)
    }),
    setTVshowsByGenre: ((state, tvShows) => state.arrTV = tvShows),

}