import axios from 'axios';

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
      state.transactions = [...data];
    },
    REMOVE_TRANSACTION(state, index) {
      state.transactions.splice(index, 1);
    },
  },
  actions: {
    async getTransactions({ commit }) {
      const { data } = await axios.get('transactions');
      commit('SET_TRANSACTIONS', data);
      return data;
    },
    async addTransaction({ commit }, { transaction, type }) {
      try {
        const newTransaction = transaction;
        newTransaction.type = type;
        const { data } = await axios.post('transactions', newTransaction);
        commit('SET_TRANSACTIONS', [data]);
      } catch (err) {
        return err.response;
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
