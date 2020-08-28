import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/views/Main.vue';
import SignUp from '@/views/SignUp.vue';
import LogIn from '@/views/LogIn.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
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
];

const router = new VueRouter({
  routes,
});

export default router;
