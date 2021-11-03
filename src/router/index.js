import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from "@/views/Login";
import EmailLogin from '@/views/EmailLogin';
import Registration from '@/views/Registration';
import fireBaseInstance from "@/middleware/firebase";
import Admin from "@/views/Admin";
import Item from "@/views/Item";
import UserItems from "@/views/UserItems";
import AllItems from "@/views/AllItems";
import TVshowTableViewer from "@/components/TVshowTableViewer";
import MoviesTableViewer from "@/components/MoviesTableViewer";
import UserAcc from "@/views/UserAcc";
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
    path: '/user/home/:user',
    name: 'UserAcc',
    component: UserAcc,
    meta: {authNotRequired: false}
  },
  {
    path: `/tvShows/:genre`,
    name: 'TVshowByGenre',
    component: TVshowTableViewer,
    meta: {authNotRequired: false}
  },
  {
    path: '/movies/:genre',
    name: 'MovieByGenre',
    component: MoviesTableViewer,
    meta: {authNotRequired: false}
  },
  {
    path: '/user/:userId/:type',
    name: 'UserItems',
    component: UserItems,
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
    name: 'AllItems',
    component: AllItems,
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
