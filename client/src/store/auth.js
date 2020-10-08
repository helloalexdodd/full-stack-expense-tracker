import axios from 'axios';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('x-auth-token') || '',
    user: JSON.parse(localStorage.getItem('user')) || {},
    usernameInvalid: '',
    usernameValidation: '',
    passwordInvalid: '',
    passwordValidation: '',
    emailInvalid: '',
    emailValidation: '',
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
    SET_ERROR(state, { name, error }) {
      if (error.message) {
        state[`${name}Invalid`] = 'is-danger';
        state[`${name}Validation`] = error.message;
      } else {
        state[`${name}Invalid`] = '';
        state[`${name}Validation`] = '';
      }
    },
    RESET_ERRORS(state) {
      state.usernameInvalid = '';
      state.usernameValidation = '';
      state.emailInvalid = '';
      state.emailValidation = '';
      state.passwordInvalid = '';
      state.passwordValidation = '';
    },
  },
  actions: {
    async signIn({ commit }, credentials) {
      try {
        const { data } = await axios.post('users/login', credentials);
        const { token, user } = data;
        commit('SET_TOKEN', token);
        commit('SET_USER', user);
        return data;
      } catch (err) {
        if (err.response) return { data: err.response.data.message };
        return err.response;
      }
    },
    async registerUser({ commit, dispatch }, credentials) {
      try {
        commit('RESET_ERRORS');
        const { data } = await axios.post('users/register', credentials);
        const { token, user } = data;
        commit('SET_TOKEN', token);
        commit('SET_USER', user);
        console.log(data);
        return data;
      } catch (err) {
        console.log(err.response.data.details[0]);
        const error = err.response.data.details[0];
        dispatch('handleErrors', error);
        dispatch('signOut');
        return error;
      }
    },
    handleErrors({ commit }, error) {
      const { message } = error;
      if (message.includes('username')) {
        commit('SET_ERROR', { name: 'username', error });
      }
      if (message.includes('email')) {
        commit('SET_ERROR', { name: 'email', error });
      }
      if (message.includes('password')) {
        commit('SET_ERROR', { name: 'password', error });
      }
      return message;
    },
    signOut({ commit }) {
      commit('SET_TOKEN', '');
      commit('SET_USER', {});
      commit('transactions/SET_TRANSACTIONS', [], { root: true });
      commit('transactions/SET_ACCOUNTS', [], { root: true });
    },
    async forgotPassword(_, email) {
      try {
        const { data } = await axios.post('users/forgot_password', { email });
        return data;
      } catch (err) {
        return err;
      }
    },
    async approveResetPassword(_, token) {
      try {
        const response = await axios.get(`users/reset_password?token=${token}`);
        return response;
      } catch (err) {
        return err;
      }
    },
    async resetPassword(_, { token, password }) {
      try {
        const response = await axios.put(`users/reset_password?token=${token}`, { password });
        return response;
      } catch (err) {
        return err.response;
      }
    },
  },
};
