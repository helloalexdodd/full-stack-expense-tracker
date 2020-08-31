import axios from 'axios';
// import { mapGetters } from 'vuex';

export default {
  namespaced: true,
  state: {
    transactions: [],
  },
  getters: {},
  mutations: {
    SET_TRANSACTIONS() {
      //
    },
  },
  actions: {
    async getTransactions() {
      console.log('axios.defaults.headers.common', axios.defaults.headers.common);
      const { data } = await axios('transactions');
      console.log({ data });
      return data;
    },
  },
};
