import axios from 'axios';

export default {
  namespaced: true,
  state: {
    transactions: [],
    titleInvalid: '',
    titleValidation: '',
    amountInvalid: '',
    amountValidation: '',
    notesInvalid: '',
    notesValidation: '',
  },
  getters: {
    transactions(state) {
      return state.transactions;
    },
    titleInvalid(state) {
      return state.titleInvalid;
    },
    titleValidation(state) {
      return state.titleValidation;
    },
    amountInvalid(state) {
      return state.amountInvalid;
    },
    amountValidation(state) {
      return state.amountValidation;
    },
    notesInvalid(state) {
      return state.notesInvalid;
    },
    notesValidation(state) {
      return state.notesValidation;
    },
  },
  mutations: {
    SET_TRANSACTIONS(state, data) {
      if (data.length) {
        state.transactions = [...state.transactions, ...data];
      } else {
        state.transactions = [];
      }
    },
    REMOVE_TRANSACTION(state, index) {
      state.transactions.splice(index, 1);
    },
    SET_ERROR(state, { name, error }) {
      if (error.message) {
        state[`${name}Invalid`] = 'is-danger';
        state[`${name}Validation`] = error.message;
      } else {
        state[`${name}Invalid`] = error;
        state[`${name}Validation`] = error.message;
      }
    },
  },
  actions: {
    async getTransactions({ commit }) {
      const { data } = await axios.get('transactions');
      commit('SET_TRANSACTIONS', data);
      return data;
    },
    async addTransaction({ commit, dispatch }, { transaction, type }) {
      try {
        const newTransaction = transaction;
        newTransaction.type = type;
        const { data } = await axios.post('transactions', newTransaction);
        transaction.title = '';
        transaction.amount = '';
        transaction.notes = '';
        commit('SET_TRANSACTIONS', [data]);
      } catch (err) {
        const error = err.response.data.details[0];
        dispatch('handleErrors', error);
      }
    },
    handleErrors({ commit }, error) {
      const { message } = error;
      if (message.includes('title')) {
        commit('SET_ERROR', { name: 'title', error });
      }
      if (message.includes('amount')) {
        commit('SET_ERROR', { name: 'amount', error });
      }
      if (message.includes('notes')) {
        commit('SET_ERROR', { name: 'notes', error });
      }
    },
    async removeTransaction({ commit, state }, id) {
      try {
        const { data } = await axios.delete(`transactions/${id}`);
        const index = state.transactions.map((t) => t._id).indexOf(data._id);
        if (index >= 0) commit('REMOVE_TRANSACTION', index);
      } catch (err) {
        return err.response;
      }
    },
  },
};
