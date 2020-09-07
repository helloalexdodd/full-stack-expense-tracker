import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/views/Main.vue';
import SignUp from '@/views/SignUp.vue';
import LogIn from '@/views/LogIn.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) return next('/login');
      return next();
    },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
