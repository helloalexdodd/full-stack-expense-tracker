<template>
  <form @submit.prevent="$emit('add-transaction')" action="POST" class="my-5">
    <legend class="mb-3 py-2">Add a new expense</legend>
    <b-field label="Title" for="title">
      <b-input v-model="transaction.title" id="title" name="title" placeholder="Title"></b-input>
    </b-field>
    <b-field label="Amount" for="amount">
      <b-input
        v-model="transaction.amount"
        @blur="$emit('convert-to-currency', transaction.amout)"
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
    <b-button native-type="submit" class="is-success">
      Submit Expense
    </b-button>
  </form>
</template>

<script>
export default {
  name: 'Expenses',
  props: {
    transactions: {
      type: Array,
    },
    transaction: {
      type: Object,
    },
  },
};
</script>

<style scoped></style>
