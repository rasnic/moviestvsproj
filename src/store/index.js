import Vue from "vue";
import Vuex from "vuex";
import movies from "./movies";
import tvShows from "./tvShows";
import users from "./users";
import tvShow from "./tvShows/tvShow"
import movie from './movies/movie'
import moviesGenre from './movies/byGenre'
import tvShowsGenre from './tvShows/byGenre'
Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    movies, tvShows, users, tvShow, movie, moviesGenre , tvShowsGenre
  }
});