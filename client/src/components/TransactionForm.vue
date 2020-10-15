<template>
  <div>
    <form action="POST" class="my-5" @submit.prevent="addNewTransaction()">
      <legend :class="`mb-3 py-2 ${transactionType}`">Add new {{ transactionType }}</legend>
      <transaction-form-account />
      <transaction-form-description />
      <transaction-form-amount />
      <transaction-form-notes />
      <b-button native-type="submit" :loading="loading" class="is-success has-text-weight-bold mt-3">
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
  data: () => ({
    loading: false,
  }),
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
    async addNewTransaction() {
      const { addTransaction, transactionType, user } = this;
      this.loading = true;
      await addTransaction({ type: transactionType, id: user._id });
      this.loading = false;
    },
  },
};
</script>
<style scoped>
legend.income {
  border-bottom: 2px solid #3ec46d;
}

legend.expense {
  border-bottom: 2px solid #f03a5f;
}
</style>
