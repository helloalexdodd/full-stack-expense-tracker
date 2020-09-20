import axios from 'axios';

export default {
  namespaced: true,
  state: {
    transactions: [],
    transaction: {
      account: '',
      description: '',
      amount: '',
      notes: '',
    },
    accounts: [],
    accountInvalid: '',
    accountValidation: '',
    descriptionInvalid: '',
    descriptionValidation: '',
    amountInvalid: '',
    amountValidation: '',
    notesInvalid: '',
    notesValidation: '',
  },
  getters: {
    transactions(state) {
      return state.transactions;
    },
    transaction(state) {
      return state.transaction;
    },
    account(state) {
      return state.transaction.account;
    },
    description(state) {
      return state.transaction.description;
    },
    amount(state) {
      return state.transaction.amount;
    },
    notes(state) {
      return state.transaction.notes;
    },
    accounts(state) {
      return state.accounts;
    },
    accountInvalid(state) {
      return state.accountInvalid;
    },
    accountValidation(state) {
      return state.accountValidation;
    },
    descriptionInvalid(state) {
      return state.descriptionInvalid;
    },
    descriptionValidation(state) {
      return state.descriptionValidation;
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
        state.transactions = [...data, ...state.transactions];
      } else {
        state.transactions = [];
      }
    },
    RESET_TRANSACTION(state) {
      state.transaction = {
        account: null,
        description: '',
        amount: '',
        notes: '',
      };
    },
    REMOVE_TRANSACTION(state, index) {
      state.transactions.splice(index, 1);
    },
    SET_TRANSACTION_ACCOUNT(state, account) {
      state.transaction.account = account;
    },
    SET_TRANSACTION_DESCRIPTION(state, description) {
      state.transaction.description = description;
    },
    SET_TRANSACTION_AMOUNT(state, amount) {
      state.transaction.amount = amount;
    },
    SET_TRANSACTION_NOTES(state, notes) {
      state.transaction.notes = notes;
    },
    SET_ACCOUNTS(state, account) {
      if (account.length) {
        state.accounts = [...state.accounts, ...account];
      } else {
        state.accounts = [];
      }
    },
    REMOVE_ACCOUNT(state, index) {
      state.accounts.splice(index, 1);
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
      state.accountInvalid = '';
      state.accountValidation = '';
      state.descriptionInvalid = '';
      state.descriptionValidation = '';
      state.amountInvalid = '';
      state.amountValidation = '';
      state.notesInvalid = '';
      state.notesValidation = '';
    },
  },
  actions: {
    async getTransactions({ commit }) {
      const { data } = await axios.get('transactions');
      commit('SET_TRANSACTIONS', data);
      return data;
    },
    async addTransaction({ commit, dispatch, state }, { type, id }) {
      try {
        const newTransaction = {
          ...state.transaction,
          type,
          user: id,
          account: state.transaction.account._id || state.transaction.account.id,
        };
        const { data } = await axios.post('transactions', newTransaction);
        commit('SET_TRANSACTIONS', [data]);
        commit('RESET_TRANSACTION');
        commit('RESET_ERRORS');
      } catch (err) {
        const error = err.response.data.details[0];
        dispatch('handleErrors', error);
      }
    },
    async editTransaction(_, transaction) {
      try {
        const newTransaction = {
          account: transaction.account._id,
          description: transaction.description,
          amount: transaction.amount,
          notes: transaction.notes,
          type: transaction.type,
          user: transaction.user,
        };
        const { data } = await axios.put(`transactions/${transaction._id}`, newTransaction);
        return data;
      } catch (err) {
        return err.response;
      }
    },
    async removeTransaction({ commit, state }, id) {
      try {
        const { data } = await axios.delete(`transactions/${id}`);
        const index = state.transactions.map((t) => t._id).indexOf(data._id);
        if (index >= 0) commit('REMOVE_TRANSACTION', index);
        return data;
      } catch (err) {
        return err.response;
      }
    },
    async getAccounts({ commit }) {
      try {
        const { data } = await axios.get('accounts');
        commit('SET_ACCOUNTS', data);
        return data;
      } catch (err) {
        return err.response;
      }
    },
    async addAccount({ commit }, newAccount) {
      try {
        const { data } = await axios.post('accounts', { name: newAccount });
        commit('SET_ACCOUNTS', [{ name: data.name, id: data._id }]);
        return data;
      } catch (err) {
        return err.response;
      }
    },
    async removeAccount({ commit, dispatch, state }, account) {
      try {
        const { data } = await axios.delete(`accounts/${account._id}`);
        const index = state.accounts.map((a) => a.id || a._id).indexOf(data._id);
        if (index >= 0) {
          state.transaction.account = null;
          commit('REMOVE_ACCOUNT', index);
        }
        return data;
      } catch (err) {
        dispatch('handleErrors', err.response.data);
        return err.response;
      }
    },
    handleErrors({ commit }, error) {
      const { message } = error;
      if (message.includes('account')) {
        commit('SET_ERROR', { name: 'account', error });
      }
      if (message.includes('description')) {
        commit('SET_ERROR', { name: 'description', error });
      }
      if (message.includes('amount')) {
        commit('SET_ERROR', { name: 'amount', error });
      }
      if (message.includes('notes')) {
        commit('SET_ERROR', { name: 'notes', error });
      }
      return message;
    },
    convertToCurrency(_, amount) {
      if (amount) {
        const currency = new Intl.NumberFormat('en-CA', {
          style: 'currency',
          currency: 'CAD',
        })
          .format(amount)
          .substring(1)
          .split('')
          .filter((char) => char !== ',')
          .join('');
        if (!Number.isNaN(Number(currency))) return Number(currency).toFixed(2);
        return '0.00';
      }
      return 0;
    },
  },
};
