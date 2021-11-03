export default {
    resetEditedTVshow: ((state) => {
        state.editedTV = {
            name: '',
            id: '',
            first_air_date: '',
            number_of_seasons: '',
            number_of_episodes: '',
            episode_run_time: '',
            languages: '',
            vote_average: '',
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