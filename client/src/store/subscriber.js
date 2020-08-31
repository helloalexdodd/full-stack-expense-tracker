import Vue from 'vue';
import store from '@/store';

store.subscribe((mutation) => {
  switch (mutation.type) {
    case 'auth/SET_TOKEN':
      console.log('mutation', mutation);
      if (mutation.payload) {
        Vue.prototype.$http.defaults.headers.common['x-auth-token'] = mutation.payload;
        localStorage.setItem('x-auth-token', mutation.payload);
      } else {
        Vue.prototype.$http.defaults.headers.common['x-auth-token'] = '';
        localStorage.removeItem('x-auth-token');
      }
      break;
    case 'auth/SET_USER':
      console.log('mutation', mutation);
      if (mutation.payload) {
        Vue.prototype.$http.defaults.headers.common.user = JSON.stringify(mutation.payload);
        localStorage.setItem('user', JSON.stringify(mutation.payload));
      } else {
        Vue.prototype.$http.defaults.headers.common.user = '';
        localStorage.removeItem('user');
      }
      break;
    default:
      Vue.prototype.$http.defaults.headers.common['x-auth-token'] = '';
      Vue.prototype.$http.defaults.headers.common.user = '';
  }
});
