import Vue from 'vue'
import app from './App.vue'
import router from './router'
import store from './store'
import iconSet from 'quasar/icon-set/fontawesome-v5'
import './quasar'

import firebaseInstance from './middleware/firebase'
Vue.use(iconSet)
Vue.config.productionTip = false

firebaseInstance.firebase.auth().onAuthStateChanged((user) => {
  window.user = user;
  new Vue({
    router,
    store,
    render: h => h(app)
  }).$mount('#app')
})