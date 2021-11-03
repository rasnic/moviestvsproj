export default {

    setTVshow: ((state, tvShow) => state.showedTV = tvShow),

    setShowedTVshowId: ((state, id) => state.showedTVId = id),

    setTVshows: ((state, tvShows) => state.tvShows = tvShows),

    setEditedTVshowId: ((state, id) => state.editedTVshowId = id),

    setEditedTVshow: ((state, tvShow) => state.editedTVshow = tvShow),

    resetEditedTVshowId: ((state) => state.editedTVshowId = ''),

    resetEditedTVshow: ((state) => {
            state.editedTVshow = {
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
        delete state.editedTVshowId
    }),

    editTVshow: ((state, tvShow)=>{
        const index = state.tvShows.findIndex(p=> p.id === tvShow.id)
        state.tvShows.splice(index, 1, tvShow)
    }),
    deleteTVshow: ((state, tvShowId) =>{
        const index = state.tvShows.findIndex(p=> p.id === tvShowId)
        state.tvShows.splice(index,1)
    }),
    insertTVshow: ((state, tvShow)=>{
        state.tvShows.push(tvShow)
    }),
    checkTVshow: ((state , tvShowId)=>{
        return state.tvShows.findIndex(p=> p.id === tvShowId)
    })
}