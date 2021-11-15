import Vue from "vue";
import Vuex from "vuex";

import users from "./users";
import items from './items'
import itemsGenre from './items/byGenre'
Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
     users, items, itemsGenre
  }
});