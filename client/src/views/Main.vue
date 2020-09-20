<template>
  <div class="container">
    <div class="column is-half is-offset-one-quarter">
      <h1 class="title has-text-centered is-size-1">Expense Tracker</h1>
      <totals title="Balance" :amount="calculateTotal('balance')" class="column is-half is-offset-one-quarter" />
      <div class="columns">
        <div class="column">
          <totals title="Income" :amount="calculateTotal('income')" />
        </div>
        <div class="column">
          <totals title="Expenses" :amount="calculateTotal('expenses')" />
        </div>
      </div>
      <tabs />
      <transaction-history class="column" />
    </div>
  </div>
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
  computed: {
    ...mapGetters({
      transactions: 'transactions/transactions',
    }),
  },
  created() {
    console.log('created');
    this.getTransactions();
    this.getAccounts();
  },
  methods: {
    ...mapActions({
      getTransactions: 'transactions/getTransactions',
      getAccounts: 'transactions/getAccounts',
    }),
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
      switch (type) {
        case 'income':
          total = income;
          break;
        case 'expenses':
          total = expenses;
          break;
        case 'balance':
          total = balance.toFixed(2);
          break;
        default:
          total = 0;
      }
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
