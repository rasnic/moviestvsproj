import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from "@/views/Login";
import EmailLogin from '@/views/EmailLogin';
import Registration from '@/views/Registration';
import fireBaseInstance from "@/middleware/firebase";
import Admin from "@/views/Admin";
import TVByGenre from "@/views/TVByGenre";
import MyItems from "@/views/MyItems";
import Item from "@/views/Item";
import UserPage from "@/views/UserPage";
import MovieByGenre from "@/views/MovieByGenre";
import AllType from "@/views/AllType";
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {authNotRequired: true}
  },
  {
    path: '/emailLogin',
    name: 'EmailLogin',
    component: EmailLogin,
    meta: {authNotRequired: true}
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
    meta: {authNotRequired: true}
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {authNotRequired: false}
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {authNotRequired: false}
  },
  {
    path: '/userPage',
    name: 'UserPage',
    component: UserPage,
    meta: {authNotRequired: false}
  },
  {
    path: '/tvShows/:genre',
    name: 'TVByGenre',
    component: TVByGenre,
    meta: {authNotRequired: false}
  },
  {
    path: '/movies/:genre',
    name: 'MovieByGenre',
    component: MovieByGenre,
    meta: {authNotRequired: false}
  },
  {
    path: '/:type/user/:userId',
    name: 'MyItems',
    component: MyItems,
    meta: {authNotRequired: false}
  },
  {
    path: '/:type/:id',
    name: 'Item',
    component: Item,
    meta: {authNotRequired: false}
  },
  {
    path: '/:type/',
    name: 'AllType',
    component: AllType,
    meta: {authNotRequired: false}
  },
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const user = fireBaseInstance.firebase.auth().currentUser;
  if (user && to.meta.authNotRequired || !user && !to.meta.authNotRequired) {
    let path = !user ? '/' : '/home';
    return next(path);
  }
  next();
});

export default router;
