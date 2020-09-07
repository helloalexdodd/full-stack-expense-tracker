<template>
  <div>
    <h2 class="legend my-3 py-2">Transaction History</h2>
    <p v-if="!transactions.length">Enter a transaction to add it to your history!</p>
    <div
      v-for="transaction in transactions"
      :key="transaction._id"
      :class="transaction.type"
      class="box"
    >
      <div class="columns">
        <div @click="showDetails(transaction)" class="column">
          <h3 class="has-text-weight-bold">{{ transaction.title }}</h3>
        </div>
        <div @click="showDetails(transaction)" class="column">
          <p class="has-text-right">${{ transaction.amount.toFixed(2) }}</p>
        </div>
        <div class="buttons">
          <b-button
            @click="removeTransaction(transaction._id)"
            type="is-danger"
            icon-right="delete"
          />
        </div>
      </div>
      <div v-if="transaction.showDetails" class="column is-full">
        <div class="columns">
          <h4 class="column">Notes</h4>
          <h4 class="column has-text-right">
            {{
            formatDate(transaction)
            }}
          </h4>
        </div>
        <p>{{ transaction.notes }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      transactions: 'transactions/transactions',
    }),
  },
  methods: {
    ...mapActions({ removeTransaction: 'transactions/removeTransaction' }),
    showDetails(transaction) {
      transaction.showDetails = !transaction.showDetails;
    },
    formatDate(transaction) {
      return new Date(transaction.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
};
</script>

<style scoped>
.box.income {
  border-left: 5px solid #3ec46d;
}

.box.expense {
  border-left: 5px solid #f03a5f;
}

.box {
  cursor: pointer;
}
</style>
