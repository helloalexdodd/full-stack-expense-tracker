<template>
  <form
    @submit.prevent="addTransaction({ transaction, type: 'income' })"
    action="POST"
    class="my-5"
  >
    <legend class="mb-3 py-2">Add new income</legend>
    <b-field label="Title" for="title">
      <b-input v-model="transaction.title" id="title" name="title" placeholder="Title"></b-input>
    </b-field>
    <b-field label="Amount" for="amount">
      <b-input
        v-model="transaction.amount"
        @blur="$emit('convert-to-currency', transaction.amount)"
        controls-position="compact"
        icon="currency-usd"
        type="is-success"
        expanded
        id="amount"
        name="amount"
        placeholder="Amount"
        min="0.01"
      ></b-input>
    </b-field>
    <b-field label="Notes" for="notes">
      <b-input v-model="transaction.notes" type="textarea" id="notes" name="notes"></b-input>
    </b-field>
    <b-button native-type="submit" class="is-success has-text-weight-bold">Submit Income</b-button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Expenses',
  data: () => ({
    transaction: {
      title: '',
      amount: '',
      notes: '',
    },
  }),
  computed: {
    ...mapGetters({
      transactions: 'transactions/transactions',
    }),
  },
  methods: {
    ...mapActions({
      addTransaction: 'transactions/addTransaction',
    }),
  },
};
</script>
