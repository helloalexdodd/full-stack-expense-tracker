<template>
  <div>
    <!-- <Nav /> -->
    <main>
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
    </main>
  </div>
</template>

<script>
// import Nav from '@/components/Nav.vue';
import Totals from '@/components/Totals.vue';
import Tabs from '@/components/Tabs.vue';
import TransactionHistory from '@/components/TransactionHistory.vue';

import { getTransactions, addTransaction, removeTransaction } from '@/lib/API';

export default {
  name: 'App',
  components: {
    // Nav,
    Totals,
    Tabs,
    TransactionHistory,
  },
  data: () => ({
    transactions: [],
    transaction: {
      title: '',
      amount: '',
      notes: '',
      type: '',
    },
  }),
  async mounted() {
    const transactions = await getTransactions();
    this.transactions = transactions;
  },
  methods: {
    async addTransaction(type) {
      try {
        const transaction = await addTransaction(this.transaction, type);
        this.transactions.push(transaction);
        this.transaction.title = '';
        this.transaction.amount = '';
        this.transaction.notes = '';
        this.transaction.type = '';
      } catch (err) {
        console.log(err);
      }
    },
    async removeTransaction(transaction) {
      try {
        const result = await removeTransaction(transaction);
        const index = this.transactions.map((t) => t.title).indexOf(result.title);
        this.transactions.splice(index, 1);
      } catch (err) {
        console.log(err);
      }
    },
    /* eslint-disable no-param-reassign */
    getTotal(type) {
      return this.transactions
        .reduce((acc, cur) => {
          if (cur.type === type) acc += cur.amount;
          return acc;
        }, 0)
        .toFixed(2);
    },
    /* eslint-disable no-param-reassign */
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
