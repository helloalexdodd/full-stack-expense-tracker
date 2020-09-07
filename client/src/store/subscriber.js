import Vue from 'vue';
import store from '@/store';

export default store.subscribe(({ type, payload }) => {
  switch (type) {
    case 'auth/SET_TOKEN':
      if (payload) {
        Vue.prototype.$http.defaults.headers.common['x-auth-token'] = payload;
        localStorage.setItem('x-auth-token', payload);
      } else {
        Vue.prototype.$http.defaults.headers.common['x-auth-token'] = '';
        localStorage.removeItem('x-auth-token');
      }
      break;
    case 'auth/SET_USER':
      if (payload) {
        const user = { _id: payload._id, email: payload.email, username: payload.username };
        Vue.prototype.$http.defaults.headers.common.user = JSON.stringify(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        Vue.prototype.$http.defaults.headers.common.user = '';
        localStorage.removeItem('user');
      }
      break;
    default:
  }
});
