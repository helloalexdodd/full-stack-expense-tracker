import Vue from 'vue';
import Buefy from 'buefy';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import 'buefy/dist/buefy.css';

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
