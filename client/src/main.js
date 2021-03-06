import Vue from 'vue';
import Buefy from 'buefy';
import axios from 'axios';
import router from '@/router';
import store from '@/store';
import '@/store/subscriber';
import 'buefy/dist/buefy.css';
import '@mdi/font/css/materialdesignicons.css';
import mailgo from 'mailgo';
import titleMixin from '@/mixins/titleMixin';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.mixin(titleMixin);
Vue.use(Buefy);

mailgo();

Vue.prototype.$http = axios;
const token = localStorage.getItem('x-auth-token');
if (token) Vue.prototype.$http.defaults.headers.common['x-auth-token'] = token;
// Vue.prototype.$http.defaults.baseURL = 'http://localhost:5000/v1/';
Vue.prototype.$http.defaults.baseURL = 'https://full-stack-expense-tracker.herokuapp.com/v1/';

new Vue({
  router,
  store,
  strict: process.env.NODE_ENV !== 'production',
  render: (h) => h(App),
}).$mount('#app');
