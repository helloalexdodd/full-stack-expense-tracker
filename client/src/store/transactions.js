import axios from 'axios';
// import { mapGetters } from 'vuex';

export default {
  namespaced: true,
  state: {
    transactions: [],
  },
  getters: {
    transactions(state) {
      return state.transactions;
    },
  },
  mutations: {
    SET_TRANSACTIONS(state, data) {
      state.transactions = [...state.transactions, ...data];
    },
    REMOVE_TRANSACTION(state, index) {
      state.transactions.splice(index, 1);
    },
  },
  actions: {
    async getTransactions({ dispatch }) {
      const { data } = await axios.get('transactions');
      dispatch('setTransactions', data);
      return data;
    },
    async addTransaction({ dispatch }, { transaction, type }) {
      try {
        const newTransaction = transaction;
        newTransaction.type = type;
        const { data } = await axios.post('transactions', newTransaction);
        dispatch('setTransactions', [data]);
        return data;
      } catch (err) {
        return err.response.data.details[0];
      }
    },
    async removeTransaction({ dispatch, state }, transaction) {
      const { data } = await axios.delete(`transactions/${transaction._id}`, transaction);
      const index = state.transactions.map((t) => t.title).indexOf(data.title);
      dispatch('removeTransactions', index);
      return data;
    },
    setTransactions({ commit }, data) {
      commit('SET_TRANSACTIONS', data);
    },
    removeTransactions({ commit }, index) {
      commit('REMOVE_TRANSACTION', index);
    },
  },
};
