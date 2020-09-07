<template>
  <form
    @submit.prevent="addTransaction({ transaction, type: 'income' })"
    action="POST"
    class="my-5"
  >
    <legend class="mb-3 py-2">Add new income</legend>
    <b-field label="Title" for="title" :message="titleValidation" :type="titleInvalid">
      <b-input
        v-model="transaction.title"
        @focus="setError({name: 'title', error: ''})"
        @change="setError({name: 'title', error: ''})"
        id="title"
        name="title"
        placeholder="Title"
      ></b-input>
    </b-field>
    <b-field label="Amount" for="amount" :message="amountValidation" :type="amountInvalid">
      <b-input
        v-model="transaction.amount"
        @blur="$emit('convert-to-currency', transaction.amount)"
        @focus="setError({name: 'amount', error: ''})"
        @change="setError({name: 'amount', error: ''})"
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
    <b-field label="Notes" for="notes" :message="notesValidation" :type="notesInvalid">
      <b-input
        v-model="transaction.notes"
        @focus="setError({name: 'notes', error: ''})"
        @change="setError({name: 'notes', error: ''})"
        type="textarea"
        id="notes"
        name="notes"
      ></b-input>
    </b-field>
    <b-button native-type="submit" class="is-success has-text-weight-bold">Submit Income</b-button>
  </form>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

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
      titleInvalid: 'transactions/titleInvalid',
      titleValidation: 'transactions/titleValidation',
      amountInvalid: 'transactions/amountInvalid',
      amountValidation: 'transactions/amountValidation',
      notesInvalid: 'transactions/notesInvalid',
      notesValidation: 'transactions/notesValidation',
    }),
  },
  methods: {
    ...mapActions({
      addTransaction: 'transactions/addTransaction',
    }),
    ...mapMutations({
      setError: 'transactions/SET_ERROR',
    }),
  },
};
</script>
