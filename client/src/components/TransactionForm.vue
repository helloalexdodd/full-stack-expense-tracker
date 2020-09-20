<template>
  <div>
    <form action="POST" class="my-5" @submit.prevent="addNewTransaction()">
      <legend class="mb-3 py-2">Add new {{ transactionType }}</legend>
      <transaction-form-account />
      <transaction-form-description />
      <transaction-form-amount />
      <transaction-form-notes />
      <b-button native-type="submit" class="is-success has-text-weight-bold mt-3">
        Submit {{ transactionType.replace(/^\w/, (char) => char.toUpperCase()) }}
      </b-button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import {
  TransactionFormAccount,
  TransactionFormAmount,
  TransactionFormDescription,
  TransactionFormNotes,
} from '@/components/TransactionForm/index';

export default {
  name: 'TransactionForm',
  components: {
    TransactionFormAccount,
    TransactionFormAmount,
    TransactionFormDescription,
    TransactionFormNotes,
  },
  props: {
    transactionType: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
  methods: {
    ...mapActions({
      addTransaction: 'transactions/addTransaction',
    }),
    addNewTransaction() {
      const { addTransaction, transactionType } = this;
      addTransaction({ type: transactionType, id: this.user._id });
    },
  },
};
</script>
