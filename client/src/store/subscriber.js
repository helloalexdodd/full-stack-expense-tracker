import Vue from 'vue';
import store from '@/store';

export default store.subscribe((mutation) => {
  console.log(mutation);
  switch (mutation.type) {
    case 'auth/SET_TOKEN':
      if (mutation.payload) {
        Vue.prototype.$http.defaults.headers.common['x-auth-token'] = mutation.payload;
        localStorage.setItem('x-auth-token', mutation.payload);
      } else {
        Vue.prototype.$http.defaults.headers.common['x-auth-token'] = '';
        localStorage.removeItem('x-auth-token');
      }
      break;
    case 'auth/SET_USER':
      if (mutation.payload) {
        const { payload } = mutation;
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
