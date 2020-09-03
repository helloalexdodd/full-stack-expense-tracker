import Vue from 'vue';
import Buefy from 'buefy';
import axios from 'axios';
import router from '@/router';
import store from '@/store';
import '@/store/subscriber';
import 'buefy/dist/buefy.css';
import '@mdi/font/css/materialdesignicons.css';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Buefy);

Vue.prototype.$http = axios;
const token = localStorage.getItem('x-auth-token');
if (token) Vue.prototype.$http.defaults.headers.common['x-auth-token'] = token;
Vue.prototype.$http.defaults.baseURL = 'http://localhost:5000/v1/';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
