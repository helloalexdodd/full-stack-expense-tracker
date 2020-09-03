import axios from 'axios';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('x-auth-token') || '',
    user: {},
  },
  getters: {
    authenticated(state) {
      return state.token && state.user;
    },
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, data) {
      state.user = data;
    },
  },
  actions: {
    async signIn({ commit, dispatch }, credentials) {
      try {
        const { data } = await axios.post('users/login', credentials);
        const { token, user } = data;
        if (token) {
          commit('SET_TOKEN', token);
        }
        commit('SET_USER', user);
        return data;
      } catch (err) {
        dispatch('signOut');
        return err.response;
      }
    },
    async registerUser({ commit, dispatch }, credentials) {
      try {
        const { data } = await axios.post('users/register', credentials);
        const { token, user } = data;
        if (token) {
          commit('SET_TOKEN', token);
        }
        commit('SET_USER', user);

        return data;
      } catch (err) {
        dispatch('signOut');
        return err.response;
      }
    },
    signOut({ commit }) {
      commit('SET_TOKEN', '');
      commit('SET_USER', {});
    },
  },
};
