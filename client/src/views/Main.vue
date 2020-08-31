<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered is-size-1">Expense Tracker</h1>
      <div class="column is-half is-offset-one-quarter">
        <totals
          title="Balance"
          :amount="calculateTotal('balance')"
          class="column is-half is-offset-one-quarter"
        />
        <div class="columns">
          <div class="column">
            <totals title="Income" :amount="calculateTotal('income')" />
          </div>
          <div class="column">
            <totals title="Expenses" :amount="calculateTotal('expenses')" />
          </div>
        </div>
        <tabs
          :transactions="this.transactions"
          :transaction="this.transaction"
          @add-transaction="addTransaction"
        />
        <transaction-history
          class="column"
          :transactions="this.transactions"
          @remove-transaction="removeTransaction"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Totals from '@/components/Totals.vue';
import Tabs from '@/components/Tabs.vue';
import TransactionHistory from '@/components/TransactionHistory.vue';

export default {
  name: 'App',
  components: {
    Totals,
    Tabs,
    TransactionHistory,
  },
  data: () => ({
    transaction: {
      title: 'Test',
      amount: '22',
      notes: 'Test Note',
      type: '',
    },
  }),
  computed: {
    ...mapGetters({
      transactions: 'transactions/transactions',
    }),
  },
  async mounted() {
    this.getTransactions();
  },
  methods: {
    ...mapActions({
      getTransactions: 'transactions/getTransactions',
      addTransactionState: 'transactions/addTransaction',
      removeTransactionState: 'transactions/removeTransaction',
    }),
    async addTransaction(type) {
      try {
        const data = await this.addTransactionState({ transaction: this.transaction, type });
        console.log('data', data);
        const error = data.message;
        if (error?.includes('username')) {
          this.usernameInvalid = 'is-danger';
          this.usernameValidation = error;
        }
        if (error?.includes('email')) {
          this.emailInvalid = 'is-danger';
          this.emailValidation = error;
        }
        if (error?.includes('password')) {
          this.passwordInvalid = 'is-danger';
          this.passwordValidation = error;
        } else {
          this.transaction.title = '';
          this.transaction.amount = '';
          this.transaction.notes = '';
          this.transaction.type = '';
        }
      } catch (err) {
        console.log(err);
      }
    },
    async removeTransaction(transaction) {
      try {
        await this.removeTransactionState(transaction);
      } catch (err) {
        console.log(err);
      }
    },
    getTotal(type) {
      return this.transactions
        .reduce((acc, cur) => {
          /* eslint-disable-next-line no-param-reassign */
          if (cur.type === type) acc += cur.amount;
          return acc;
        }, 0)
        .toFixed(2);
    },
    calculateTotal(type) {
      const income = this.getTotal('income');
      const expenses = this.getTotal('expense');
      const balance = income - expenses;
      let total;
      if (type === 'income') total = income;
      if (type === 'expenses') total = expenses;
      if (type === 'balance') total = balance.toFixed(2);
      return `$${total}`;
    },
  },
};
</script>

<style>
legend,
.legend,
h4 {
  border-bottom: 1px solid lightgray;
}
</style>
