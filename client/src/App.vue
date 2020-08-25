<template>
  <main>
    <section class="section">
      <div class="container">
        <h1 class="title has-text-centered">Expense Tracker</h1>
        <div class="columns is-centered">
          <div class="column is-half">
            <legend class="my-3 py-2">Transaction History</legend>
            <div v-for="transaction in transactions" :key="transaction._id" class="box">
              <div class="columns">
                <div class="column">
                  <h3 class="has-text-weight-bold">{{ transaction.title }}</h3>
                </div>
                <div class="column">
                  <p class="has-text-right">{{ transaction.amount }}</p>
                </div>
                <div class="buttons">
                  <b-button
                    @click="removeTransaction(transaction)"
                    type="is-danger"
                    icon-right="delete"
                  />
                </div>
              </div>
            </div>
            <form @submit.prevent="addTransaction" action="POST" class="my-5">
              <legend class="mb-3 py-2">Add a new transaction</legend>
              <b-field label="Title" for="title">
                <b-input
                  v-model="transaction.title"
                  id="title"
                  name="title"
                  placeholder="title"
                ></b-input>
              </b-field>
              <b-field label="Amount" for="amount">
                <b-input
                  v-model="transaction.amount"
                  type="number"
                  id="amount"
                  name="amount"
                  min="2"
                  placeholder="Amount"
                ></b-input>
              </b-field>
              <b-field label="Notes" for="notes">
                <b-input
                  v-model="transaction.notes"
                  type="textarea"
                  id="notes"
                  name="notes"
                ></b-input>
              </b-field>
              <b-button native-type="submit" class="is-success">
                Submit Transaction
              </b-button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
const API_URL = 'http://localhost:5000/v1/transactions';

export default {
  name: 'App',
  components: {},
  data: () => ({
    transactions: [],
    transaction: {
      title: '',
      amount: 0,
      notes: '',
    },
  }),
  async mounted() {
    const response = await fetch(API_URL);
    const transactions = await response.json();
    this.transactions = transactions;
  },
  methods: {
    async addTransaction() {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify(this.transaction),
          headers: {
            'content-type': 'application/json',
          },
        });
        const transaction = await response.json();
        this.transactions.push(transaction);
        this.transaction.title = '';
        this.transaction.amount = '';
        this.transaction.notes = '';
      } catch (err) {
        console.log(err);
      }
    },
    async removeTransaction(transaction) {
      try {
        const response = await fetch(`${API_URL}/${transaction._id}`, {
          method: 'DELETE',
          body: JSON.stringify(this.transaction),
          headers: {
            'content-type': 'application/json',
          },
        });
        const result = await response.json();
        console.log(result);
        const index = this.transactions.map((t) => t.title).indexOf(result.title);
        console.log(index);
        console.log(this.transactions);
        this.transactions.splice(index, 1);
        console.log(this.transactions);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
legend {
  border-bottom: 1px solid lightgray;
}
</style>
